import React from 'react';
import shopBanner from "../assets/offer.png"
const Advertisement = () => {
    return (
        <div>
            <div className="px-4">
        <img
          src={shopBanner}
          alt="Ad Banner"
          className="w-full h-30 rounded-xl shadow-md"
        />
      </div>
        </div>
    );
};

export default Advertisement;