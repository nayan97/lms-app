import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AdView() {
  const axios = useAxiosSecure();
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const currentAd = ads[currentAdIndex];

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get("/ads");
        setAds(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ads:", err);
        setLoading(false);
      }
    };
    fetchAds();
  }, [axios]);

  // Countdown logic
  useEffect(() => {
    if (!currentAd) return;

    setButtonDisabled(true);
    setTimeLeft(10);

    let counter = 10;

    const interval = setInterval(() => {
      counter -= 1;
      setTimeLeft(counter);

      if (counter <= 0) {
        clearInterval(interval);
        setButtonDisabled(false);
      }
    }, 1000);

    // Cleanup interval when ad changes or component unmounts
    return () => clearInterval(interval);
  }, [currentAdIndex, currentAd]);

  const handleNextAd = async () => {
    try {
      const res = await axios.post(`/ads/${currentAd.id}/view`);

      await Swal.fire({
        icon: "success",
        title: "Ad Viewed! 🎉",
        text: `You earned $${res.data.reward}`,
        confirmButtonText: "Next Ad",
        confirmButtonColor: "#3085d6",
      });

      if (currentAdIndex < ads.length - 1) {
        setCurrentAdIndex((prev) => prev + 1);
      } else {
        Swal.fire({
          icon: "info",
          title: "All Ads Completed!",
          text: "You have viewed all available ads.",
        });
      }
    } catch (err) {
      console.error("Error submitting ad view:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading ads...</p>
      </div>
    );

  if (ads.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No ads available</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4 bg-gray-50">
      <div className="card bg-white shadow-xl rounded-xl overflow-hidden max-w-5xl w-full">

        {/* Ad iframe */}
        <iframe
          // src={currentAd.icon}
          src={`https://apiv.lifechangebda.com/proxy?url=${encodeURIComponent(currentAd.icon)}`}
          title={currentAd.title}
          className="w-full h-[500px] border-0"
           sandbox="allow-scripts allow-forms allow-popups"
        ></iframe>

        {/* Controls */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center">
          <h3 className="text-lg font-semibold mb-2 sm:mb-0 text-gray-800">
            {currentAd.title}
          </h3>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm min-w-[160px] text-center">
              {buttonDisabled
                ? `Please wait ${timeLeft}s to continue`
                : "You can go next now ✅"}
            </span>

            <button
              onClick={handleNextAd}
              disabled={buttonDisabled}
              className={`px-5 py-2 rounded-lg font-semibold text-white transition-all ${
                buttonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Next Ad
            </button>
          </div>
        </div>

        {/* Progress info */}
        <div className="text-center pb-4 text-gray-500 text-sm">
          Ad {currentAdIndex + 1} of {ads.length}
        </div>
      </div>
    </div>
  );
}


// import { useEffect } from "react";

// export default function AdBanner() {
//   useEffect(() => {
//     // Remove any existing script to prevent duplicates
//     const existing = document.getElementById("revenuecpm-script");
//     if (existing) existing.remove();

//     const script = document.createElement("script");
//     script.id = "revenuecpm-script";
//     script.src = "https://www.revenuecpmgate.com/v0wv4wkd4?key=fe882fe82b4acf385f8137fa12bc51cf";
//     script.async = true;

//     const container = document.getElementById("ad-container");
//     if (container) container.appendChild(script);

//     return () => {
//       // Cleanup on unmount
//       if (container) container.innerHTML = "";
//     };
//   }, []);

//   return (
//     <div id="ad-container" className="w-full h-auto text-center">
//       <p className="text-gray-400 text-sm">Loading ad...</p>
//     </div>
//   );
// }
