import React from 'react';
// Note: In a real React app, you would define this component and export it.

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto">
        
        {/* Equivalent to row text-center */}
        <div className="flex justify-center items-center w-full">
          <div className="w-full">
            
            {/* Equivalent to pt-4 and content wrapper */}
            <div className="py-6 sm:py-8">
              
              {/* Copyright Text Block */}
              <div className="text-white text-center text-sm md:text-base leading-relaxed">
                <p>
                  {/* The dynamic year is calculated directly in JSX */}
                  Copyright &copy;{currentYear} <span className="font-semibold">www.onlineshop.com</span>
                  
                  {/* Removing the Colorlib link for cleanliness, but showing where credit was */}
                  {/* Original: <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
