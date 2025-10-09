import React from "react";
import { Link } from "react-router";

const AdsMarketing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#ff9100] w-full py-4 px-4 flex items-center gap-3 text-white">
        <Link
          to="/"
          className="text-2xl font-bold bg-[#ff9100] px-3 py-1 rounded-full shadow"
        >
          ←
        </Link>
        <h1 className="text-2xl font-semibold">অ্যাডস মার্কেটিং</h1>
      </div>
      <div className="bg-[#ff9100]">
         <div className="rounded-t-[50px] py-5 bg-gray-100">
        <div className="bg-white mt-10 shadow-lg mx-4  rounded-2xl overflow-hidden">
        {/* YouTube Video Embed */}
        <div className="relative aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/XXXXXXXXXXX"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Course Description */}
        <div className="p-4 space-y-4 text-gray-800 leading-relaxed text-[16px]">
          <p className="text-red-600 font-semibold text-lg">
            🎯 ফ্রিতে শিখুন Ads Marketing — মোবাইল দিয়েই আয় করুন ১০,০০০ থেকে
            ৫০,০০০ টাকা প্রতি মাসে! 📱💰
          </p>

          <p>
            আপনার হাতেই রয়েছে আপনার সফলতার চাবিকাঠি! শুধু একটি স্মার্টফোন থাকলেই
            এখন শিখতে পারবেন কিভাবে সম্পূর্ণ{" "}
            <strong>ফ্রিতে অ্যাডস মার্কেটিং</strong> করে ইনকাম করবেন! 😮
          </p>

          <ul className="space-y-1">
            <li>✅ কোনো বিনিয়োগ নয়!</li>
            <li>✅ শুধুমাত্র মোবাইল ব্যবহার করে</li>
            <li>✅ Step-by-step ভিডিও টিউটোরিয়াল</li>
            <li>✅ বিগিনার থেকে এক্সপার্ট পর্যন্ত</li>
            <li>✅ ১০০% বাস্তব অভিজ্ঞতার উপর ভিত্তি করে ভিডিও তৈরি</li>
          </ul>

          <p className="font-semibold">
            এই কোর্সটি আপনার জন্য যদি আপনি –
          </p>

          <ul className="space-y-1">
            <li>📌 পাশাপাশিভাবে ইনকাম করতে চান</li>
            <li>📌 ঘরে বসে ফ্রিল্যান্সিং বা পার্ট-টাইম ইনকাম করতে চান</li>
            <li>📌 নিজের ব্যবসা বা প্রোডাক্ট প্রোমোট করতে চান</li>
          </ul>

          <p className="text-green-600 font-semibold">
            👉 এখনই জয়েন করুন আমাদের ফ্রি কোর্সে এবং শুরু করুন আপনার ইনকাম
            যাত্রা আজ থেকেই!
          </p>

          <p>
            📍 নিচে দেওয়া দুটি গ্রুপে জয়েন করে পুরো কোর্সটি এক্সেস করুন 👇
          </p>
        </div>
      </div>

       </div>

      </div>
      
      {/* Content Container */}
      
    </div>
  );
};

export default AdsMarketing;
