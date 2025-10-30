import React from "react";
import Header from "../Shared/Header";
import { Link, useLocation, useNavigate } from "react-router";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import { Copy } from "lucide-react";

const Support = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;
  const pageName = location.state?.name;

  const { t } = useTranslation();

  // ✅ WhatsApp open function
  const handleWhatsAppClick = (number) => {
    // Convert BD number -> international format (remove first 0, add 88)
    const formatted = `880${number.slice(1)}`;
    const url = `https://wa.me/${formatted}`;
    window.open(url, "_blank");
  };

  const Code = "01968340274";
  const handleCopy = () => {
    navigator.clipboard
      .writeText(Code)
      .then(() => {
        console.log("Copied code!");
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "This number copied to clipboard",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy the Number",
        });
      });
  };

  const CodeNumber = "01932901038";
  const handleCopyNumber = () => {
    navigator.clipboard
      .writeText(CodeNumber)
      .then(() => {
        console.log("Copied code!");
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "This number copied to clipboard",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy the Number",
        });
      });
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-[#ff9100] w-full h-20 flex items-center gap-4 px-4 shadow-sm">
        <Link
          to={"/"}
          className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
        >
          ←
        </Link>
        <h1 className="text-white font-bold text-lg">{t("support")}</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col rounded-t-[50px] items-center justify-center min-h-screen bg-white px-4">
        <div className="bg-white m-4 p-4 rounded-2xl shadow">
          <p className="text-gray-800 leading-relaxed">
            লাইফ চেঞ্জ বিজনেসে প্ল্যাটফর্ম আপনাকে স্বাগতম। আমাদের প্রতিটি
            সাফল্যের পেছনে রয়েছে সদস্যদের দৃঢ় আস্থা এবং সময়মতো পাওয়া সহায়তা। এই
            আস্থাকে অটুট রাখতে লাইফ চেঞ্জ বিজনেস প্ল্যাটফর্ম কোম্পানি গড়ে তুলেছে
            একটি নির্ভরযোগ্য, দ্রুত সাড়া প্রদানকারী ও কার্যকর সাপোর্ট সেন্টার,
            যেখানে আপনি পেতে পারেন আপনার যেকোনো সমস্যার সুস্পষ্ট ও নির্ভুল
            সমাধান।
            <br />
            <br />
            🔵ভেরিফিকেশন সাপোর্ট যেমন: একাউন্ট ভেরিফিকেশন জটিলতা সমস্যা।
            <br />
            <span className="py-2 font-semibold text-gray-700 flex items-center gap-2">
              যোগাযোগ করুন: 01968340274
              <Copy
                onClick={handleCopy}
                className="size-4 ml-2 cursor-pointer text-green-600 transition"
              />
              <button
                onClick={() => handleWhatsAppClick("01968340274")}
                className="text-green-600 hover:text-green-700 text-xl"
                title="WhatsApp এ চ্যাট করুন"
              >
                <FaWhatsapp />
              </button>
            </span>
            যেভাবে মেসেজ করবেন.↓↓↓ পেমেন্টের স্ক্রিনশট/পেমেন্ট
            নাম্বার/ট্রানজেকশন আইডি/একাউন্টের রেফার কোড দিয়ে “হায়" বা "হেলো" না
            বলে সরাসরি সমস্যাটি লিখে অথবা ভয়েস করে পাঠান।
            <br />
            <br />
            🟡টেকনিক্যাল সাপোর্ট. যেমন: রিসেলিং ও প্রোডাক্ট সাপোর্ট/টিম ও
            ম্যানেজমেন্ট সংক্রান্ত সাপোর্ট/লগইন সমস্যা, পাসওয়ার্ড ভুলে যাওয়া, এড
            দেখতে সমস্যা, মার্কেটিং ইত্যাদির জন্য...
            <br />
            <span className="py-2 font-semibold text-gray-700 flex items-center gap-2">
              যোগাযোগ করুন: 01932901038
              <Copy
                onClick={handleCopyNumber}
                className="size-4 ml-2 cursor-pointer text-green-600 transition"
              />
              <button
                onClick={() => handleWhatsAppClick("01932901038")}
                className="text-green-600 hover:text-green-700 text-xl"
                title="WhatsApp এ চ্যাট করুন"
              >
                <FaWhatsapp />
              </button>
            </span>
            সরাসরি সমস্যাটি পরিষ্কারভাবে লিখে অথবা ভয়েস মেসেজ করুন।
            <br />
            <br />
            🟢গুরুত্বপূর্ণ নির্দেশনা: ভদ্রতা বজায় রেখে, সরাসরি সমস্যাটি লিখে
            অথবা ভয়েস মেসেজ করুন। নির্ধারিত সময়ের মধ্যে মেসেজ করলে দ্রুত
            রিপ্লাই ও সমাধান প্রদান করা হয়।
            <br />
            <br />
            <span className="font-semibold text-gray-800">
              🕐 সাপোর্ট সময়সূচি:
            </span>{" "}
            প্রতিদিন সকাল ১০:০০ টা থেকে রাত ১১:০০ টা পর্যন্ত
            <br />
            <br />
            আপনার ব্যবসা সফল হোক, এই কামনায় - <b>লাইফ চেঞ্জ ম্যানেজমেন্ট টিম</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
