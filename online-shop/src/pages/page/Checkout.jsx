import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserAxios from "../../hooks/useUserAxios";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const axiosUser = useUserAxios();

  const [carts, setCarts] = useState([]);
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
    reseller_sell_price: "",
    paymethod: "Cash On",
    quantity: 1,
  });

  // ✅ Fetch checkout data
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const { data } = await axiosSecure.get("/checkout-data");
        if (data.status) {
          setCarts(data.carts || []);
        }
      } catch (err) {
        console.error("Failed to fetch checkout data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutData();
  }, [axiosSecure]);

  // ✅ Prices
  const adminPrice = carts?.product?.source_price || 0;
  const maxPrice = carts?.product?.max_price || 0;

  const resellerProfit = formData.reseller_sell_price
    ? parseFloat(formData.reseller_sell_price) - adminPrice
    : 0;

  const deliveryCharge = 0;
  const total =
    (parseFloat(formData.reseller_sell_price) || 0) * formData.quantity +
    deliveryCharge;

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

  // ✅ Handle qty
  const handleQtyChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      quantity:
        type === "inc" ? prev.quantity + 1 : Math.max(1, prev.quantity - 1),
    }));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      carts,
      total,
    };

    try {
      const res = await axiosSecure.post("/checkout-data", payload);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: t("success"),
          text: res.data.message || t("orderSuccess"),
          confirmButtonColor: "#16a34a",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("oops"),
          text: res.data.message || t("orderFailed"),
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: err.response?.data?.message || t("somethingWrong"),
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="mx-auto min-h-screen shadow-sm max-w-6xl bg-gray-100 rounded-[30px] p-6">
      <div className="container mx-auto">
        <h4 className="text-2xl font-semibold mb-4">{t("checkout")}</h4>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart */}
            {carts.map((cart, i) => (
              <div
                key={i}
                className="bg-white shadow p-5 rounded-2xl space-y-4 border border-gray-100"
              >
                <div className="flex gap-4">
                  <img
                    src={cart.image_url}
                    alt={cart.product?.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-lg">
                      {cart.product?.title}
                    </h5>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => handleQtyChange("dec")}
                        className="btn btn-sm btn-outline"
                      >
                        −
                      </button>
                      <span className="px-3 text-base font-medium">
                        {formData.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange("inc")}
                        className="btn btn-sm btn-outline"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Prices */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 ml-2">
                      {t("resellerSellPrice")} *
                    </label>
                    <input
                      type="number"
                      placeholder={t("resellerSellPrice")}
                      className="input input-bordered w-full"
                      value={formData.reseller_sell_price || ""}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        if (value > maxPrice) {
                          toast.error(`${t("priceExceed")} (${maxPrice}৳)`);
                          return;
                        }
                        setFormData({
                          ...formData,
                          reseller_sell_price: value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 ml-2">
                      {t("resellerProfit")}
                    </label>
                    <input
                      type="number"
                      value={resellerProfit}
                      readOnly
                      className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 ml-2">
                      {t("adminPrice")}
                    </label>
                    <input
                      type="number"
                      value={adminPrice}
                      readOnly
                      className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 ml-2">
                      {t("maxSellPrice")}
                    </label>
                    <input
                      type="number"
                      value={maxPrice}
                      readOnly
                      className="input border-0 w-full font-semibold rounded-2xl bg-[#f6f1f1]"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Customer */}
            <div className="bg-white shadow p-4 rounded-xl space-y-4">
              <h4 className="text-lg font-semibold">{t("customerDetails")}</h4>

              <div>
                <label className="label">{t("customerName")}*</label>
                <input
                  type="text"
                  name="customer_name"
                  className="input input-bordered w-full"
                  value={formData.customer_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label">{t("phone")}*</label>
                <input
                  type="text"
                  name="customer_number"
                  className="input input-bordered w-full"
                  value={formData.customer_number}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select
                    name="district_id"
                    className="select select-bordered w-full"
                    value={formData.district_id}
                    onChange={(e) => {
                      handleChange(e);
                      setDistrictId(e.target.value);
                    }}
                  >
                    <option value="">{t("district")}</option>
                    {districts.map((district) => {
                      // 👇 pick column name dynamically: name_en, name_bn
                      const lang = i18n.language; // "en" or "bn"
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
                  <label className="label">{t("subdistrict")}</label>
                  <select
                    name="upazila_id"
                    className="select select-bordered w-full"
                    value={formData.upazila_id}
                    onChange={handleChange}
                    disabled={!districtId}
                  >
                    <option value="">{t("subdistrict")}</option>
                    {subdistricts.map((sub) => {
                      const lang = i18n.language; // "en" or "bn"
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
                  className="input input-bordered w-full"
                  value={formData.delivery_address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label">{t("instructions")}</label>
                <textarea
                  name="additional_instruction"
                  className="textarea textarea-bordered w-full"
                  value={formData.additional_instruction}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white shadow-lg rounded-xl p-4 space-y-4">
            <h4 className="text-xl font-semibold">{t("orderSummary")}</h4>

            <div className="flex justify-between">
              <span>{t("resellerProfit")}</span>
              <span>{resellerProfit}৳</span>
            </div>
            <div className="flex justify-between">
              <span>{t("deliveryCharge")}</span>
              <span>{deliveryCharge}৳</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>{t("total")}</span>
              <span>{total}৳</span>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="paymethod"
                  value="Cash On"
                  checked={formData.paymethod === "Cash On"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span className="label-text ml-2">{t("cashOnDelivery")}</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              {t("placeOrder")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
