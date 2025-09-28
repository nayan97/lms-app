import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserAxios from "../../hooks/useUserAxios";

const Checkout = () => {
  const axiosSecure = useAxiosSecure(); // protected routes
  const axiosUser = useUserAxios(); // public routes

  const [carts, setCarts] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    cell: "",
    email: "",
    district: "",
    subdistrict: "",
    address: "",
    opaddress: "",
    city: "",
    state_text: "",
    zip: "",
    paymethod: "cash",
  });

  // ✅ Fetch checkout data (user carts)
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

  // ✅ Calculate total
  const totalPrice = carts.reduce(
    (sum, cart) => sum + (parseFloat(cart.price) || 0),
    0
  );

  // ✅ Fetch districts on mount
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

  // ✅ Fetch subdistricts when district changes
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

  // ✅ Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      carts,
      total: totalPrice,
    };

    console.log("Checkout Form Submitted:", payload);

    // Example API call for order placement
    // try {
    //   const res = await axiosSecure.post("/place-order", payload);
    //   console.log("Order placed:", res.data);
    // } catch (err) {
    //   console.error("Order failed:", err);
    // }
  };

  if (loading) {
    return <p>Loading checkout...</p>;
  }

  return (
    <main className="mx-auto min-h-screen shadow-sm max-w-6xl bg-gray-100 rounded-[50px] p-6">
      <div className="container mx-auto">
        <h4 className="text-2xl font-semibold mb-4">Billing Details</h4>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">First Name*</label>
                <input
                  type="text"
                  name="fname"
                  className="input input-bordered w-full"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label">Last Name*</label>
                <input
                  type="text"
                  name="lname"
                  className="input input-bordered w-full"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Phone*</label>
                <input
                  type="text"
                  name="cell"
                  className="input input-bordered w-full"
                  value={formData.cell}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="label">Email*</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* District/Subdistrict */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Select District</label>
                <select
                  name="district"
                  className="select select-bordered w-full"
                  value={formData.district}
                  onChange={(e) => {
                    handleChange(e);
                    setDistrictId(e.target.value);
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Select Subdistrict</label>
                <select
                  name="subdistrict"
                  className="select select-bordered w-full"
                  value={formData.subdistrict}
                  onChange={handleChange}
                  disabled={!districtId}
                >
                  <option value="">Select Subdistrict</option>
                  {subdistricts.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="label">Address*</label>
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                className="input input-bordered w-full mb-2"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Other Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="zip"
                placeholder="Postcode / ZIP*"
                className="input input-bordered w-full col-span-2"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white shadow-lg rounded-xl p-4 space-y-4">
            <h4 className="text-xl font-semibold">Your Order</h4>

            {carts.map((cart, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{cart.name}</span>
                <span>${cart.price}</span>
              </div>
            ))}

            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="paymethod"
                  value="cash"
                  checked={formData.paymethod === "cash"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span className="label-text ml-2">Cash On</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
