import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserAxios from "../../hooks/useUserAxios";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const axiosUser = useUserAxios();

  const [carts, setCarts] = useState([]);
  // const [carts, setCarts] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_number: "",
    district_id: "",
    upazila_id: "",
    delivery_address: "",
    additional_instruction: "",
    paymethod: "Cash On",
    quantity: 1,
  });

  // ✅ Fetch checkout data
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const { data } = await axiosSecure.get("/checkout-data");
        if (data.status) {
          // Add reseller_sell_price field for each cart item
          const updatedCarts = (data.carts || []).map((item) => ({
            ...item,
            reseller_sell_price: item?.product?.price || 0,
          }));
          setCarts(updatedCarts);
        }
      } catch (err) {
        console.error("Failed to fetch checkout data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutData();
  }, [axiosSecure]);

  // ✅ Calculate totals dynamically
  const adminPrice = carts.reduce(
    (sum, item) => sum + (item?.product?.price || 0),
    0
  );
  const maxPrice = carts.reduce(
    (sum, item) => sum + (item.product_qty * item?.product?.max_price || 0),
    0
  );

  console.log(maxPrice);

  const total = carts.reduce(
    (sum, item) => sum + (parseFloat(item.reseller_sell_price) || 0),
    0
  );
  const totalResellerProfit = carts.reduce(
    (sum, item) =>
      sum +
      ((parseFloat(item.reseller_sell_price) || 0) -
        (parseFloat(item.price) || 0)),
    0
  );
  //  (cart.reseller_sell_price || 0) - (cart?.price || 0);
  // ✅ Fetch districts
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const { data } = await axiosUser.get("/districts");
        setDistricts(data.districts || []);
      } catch (err) {
        console.error("Failed to fetch districts:", err);
      }
    };
    fetchDistricts();
  }, [axiosUser]);

  // ✅ Fetch subdistricts
  useEffect(() => {
    if (districtId) {
      const fetchSubdistricts = async () => {
        try {
          const { data } = await axiosUser.get(
            `/districts/${districtId}/subdistricts`
          );
          setSubdistricts(data.subdistricts || []);
        } catch (err) {
          console.error("Failed to fetch subdistricts:", err);
        }
      };
      fetchSubdistricts();
    } else {
      setSubdistricts([]);
    }
  }, [districtId, axiosUser]);

  // ✅ Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle reseller price change for each cart
  const handleResellerPriceChange = (index, value) => {
    const updatedCarts = [...carts];
    const maxP = maxPrice || 0;

    if (value > maxP) {
      toast.error(`${t("priceExceed")} (${maxP}৳)`);
      return;
    }

    updatedCarts[index].reseller_sell_price = value;
    setCarts(updatedCarts);
  };

  // ✅ Handle quantity change
  const handleQtyChange = async (id, actionOrQty) => {
    const currentItem = carts.find((item) => item.id === id);
    if (!currentItem) return;

    const currentQty = Number(currentItem.product_qty) || 1;
    let newQty;
    if (actionOrQty === "inc") newQty = currentQty + 1;
    else if (actionOrQty === "dec") newQty = Math.max(1, currentQty - 1);
    else newQty = Number(actionOrQty) || 1;

    // Optimistic UI update
    setCarts((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, product_qty: newQty } : item
      )
    );

    // Send update request to backend
    try {
      const res = await axiosSecure.put(`/cart/${id}`, {
        qty: newQty, // ✅ matches backend validation
      });

      if (res.data.success) {
        // Update the item with the latest price returned from backend
        const updatedItem = res.data.cartItem;

        setCarts((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );

        Swal.fire({
          icon: "success",
          title: t("qtyUpdated"),
          text: `${t("productQtyUpdated")}`,
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ✅ Fixed Submit
  // ✅ Submit
  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Prepare payload
      const payload = {
        ...formData,
        reseller_sell_price: carts[0]?.reseller_sell_price || 0, // ✅ single number for validation
        carts: carts.map((item) => ({
          product_id: item.product_id,
          reseller_sell_price: item.reseller_sell_price,
          quantity: formData.quantity || item.product_qty,
        })),
        total,
        total_reseller_profit: totalResellerProfit,
      };

      const { data } = await axiosSecure.post("/checkout-data", payload);

      // ✅ success
      if (data.success || data.status) {
        Swal.fire({
          icon: "success",
          title: t("successOrder"),
          text: t("orderSuccess"),
          showConfirmButton: true,
          confirmButtonText: t("ViewAllOrder"),
          confirmButtonColor: "#16a34a",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/order-history";
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("oops"),
          text: data.message || t("orderFailed"),
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.reseller_sell_price?.[0] ||
        err.response?.data?.message ||
        t("somethingWrong");

      Swal.fire({
        icon: "error",
        title: t("error"),
        text: errorMsg,
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="bg-[#ff9100] h-20">
        <div className="flex items-center gap-4">
          <Link
            to={"/shop"}
            className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
          >
            ←
          </Link>
          <h1 className="text-white  font-bold"> {t("Checkout")}</h1>
        </div>
      </div>
      <main className="mx-auto min-h-screen shadow-sm max-w-6xl bg-gray-100 rounded-t-[50px] px-6 pt-2 pb-6">
        <div className="container mx-auto">
          <h4 className="text-2xl font-semibold mb-4 text-center pt-2">
            {t("checkout")}
          </h4>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {carts.map((cart, i) => {
                const resellerProfit =
                  (cart.reseller_sell_price || 0) - (cart?.price || 0);

                return (
                  <div
                    key={i}
                    className="bg-white shadow p-5 rounded-2xl space-y-4 border border-gray-100"
                  >
                    <div className="flex gap-4">
                      <img
                        src={cart.image_url}
                        alt={cart.product_title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-lg">
                          {cart.product_title}
                        </h5>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(cart.id, "dec")}
                            className="btn btn-sm border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-3 text-base font-medium">
                            {cart.product_qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(cart.id, "inc")}
                            className="btn btn-sm border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 ml-2">
                          {t("resellerSellPrice")} *
                        </label>
                        <input
                          type="number"
                          placeholder={t("resellerSellPrice")}
                          className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                          value={cart.reseller_sell_price || ""}
                          onChange={(e) =>
                            handleResellerPriceChange(
                              i,
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 ml-2">
                          {t("resellerProfit")}
                        </label>
                        <input
                          type="text"
                          value={`${resellerProfit} ৳`}
                          readOnly
                          className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 ml-2">
                          {t("adminPrice")}
                        </label>
                        <input
                          type="text"
                          value={`${cart.price || 0} ৳`}
                          readOnly
                          className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 ml-2">
                          {t("maxSellPrice")}
                        </label>
                        <input
                          type="text"
                          value={`${maxPrice || 0} ৳`}
                          readOnly
                          className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                        />
                      </div>

                      {cart.size && (
                        <div>
                          <label className="block text-sm font-medium mb-1 ml-2">
                            {t("size")}
                          </label>
                          <input
                            type="text"
                            value={cart.size}
                            readOnly
                            className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                          />
                        </div>
                      )}

                      {cart.color && (
                        <div>
                          <label className="block text-sm font-medium mb-1 ml-2">
                            {t("color")}
                          </label>
                          <input
                            type="text"
                            value={cart.color}
                            readOnly
                            className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Customer Info */}
              <div className="bg-white shadow p-4 rounded-xl space-y-4">
                <h4 className="text-lg font-semibold text-center">
                  {t("customerDetails")}
                </h4>

                <div>
                  <label className="label">{t("customerName")}*</label>
                  <input
                    type="text"
                    name="customer_name"
                    className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder={t("customerNamePlaceholder")}
                  />
                </div>

                <div>
                  <label className="label">{t("phone")}*</label>
                  <input
                    type="text"
                    name="customer_number"
                    className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                    value={formData.customer_number}
                    onChange={handleChange}
                    placeholder={t("phonePlaceholder")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">{t("district")}</label>
                    <select
                      name="district_id"
                      className="select border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                      value={formData.district_id}
                      onChange={(e) => {
                        handleChange(e);
                        setDistrictId(e.target.value);
                      }}
                    >
                      <option value="">{t("districtPlaceholder")}</option>
                      {districts.map((district) => {
                        const lang = i18n.language;
                        const label =
                          lang === "bn" ? district.bn_name : district.name;
                        return (
                          <option key={district.id} value={district.id}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="label">{t("thana")}</label>
                    <select
                      name="upazila_id"
                      className="select border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                      value={formData.upazila_id}
                      onChange={handleChange}
                      disabled={!districtId}
                    >
                      <option value="">{t("thanaPlaceholder")}</option>
                      {subdistricts.map((sub) => {
                        const lang = i18n.language;
                        const label = lang === "bn" ? sub.bn_name : sub.name;
                        return (
                          <option key={sub.id} value={sub.id}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">{t("address")}*</label>
                  <input
                    type="text"
                    name="delivery_address"
                    className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    placeholder={t("addressPlaceholder")}
                  />
                </div>

                <div>
                  <label className="label">{t("instructions")}</label>
                  <textarea
                    name="additional_instruction"
                    className="textarea border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                    value={formData.additional_instruction}
                    onChange={handleChange}
                    placeholder={t("instructionsPlaceholder")}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-white shadow-lg rounded-xl p-4 pb-4 space-y-4">
              <div className="flex justify-between">
                <span>{t("resellerProfit")}</span>
                <span>{totalResellerProfit}৳</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>{t("total")}</span>
                <span>{total}৳</span>
              </div>

              <button
                type="submit"
                className="btn mb-20 text-white bg-[#ff9100] w-full rounded-2xl"
              >
                {t("placeOrder")}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
