import { useEffect } from "react";

const AdBanner = ({ client, slot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={client}   // e.g. "ca-pub-1234567890"
      data-ad-slot={slot}       // e.g. "1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdBanner;



