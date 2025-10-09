import { t } from 'i18next';
import { ClockIcon, SparkleIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import Advertisement from '../../components/Advertisement';

const Quizjob = () => {
  const quizJobData = {
    title: "Quiz Job",
    applyDate: "Sep 21, 2025 3:56 PM",
    step: 1,
    progress: 0,
    requirementText: "You need to verify 2 members on your level 1 after applying ads view to start for ads view",
    verificationStatus: "Level 1 Verified: 0",
    buttonText: "Start Earning"
  };
    return (
        <div>
            <div className="bg-[#ff9100] h-20">
                          <div className="flex items-center gap-4">
                            <Link
                            to={"/"}
                            className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
                          >
                            ← 
                          </Link>
                          <h1 className="text-white  font-bold"> {t("QuizJob")}
                  </h1>
                  
                          </div>
                          
                         
                        </div>
            
                   <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-t-[50px] px-6 py-2">
                  
            
                  <section className="wishlist">
                    <div className="container mt-10 w-full mx-auto">
                       {/* Main Content Card Wrapper */}
      <div className="w-full  relative -mt-4 rounded-t-3xl bg-white shadow-2xl overflow-hidden ">
        <div className="p-6 md:p-8">
          
          {/* Apply Date */}
          <p className="text-sm text-gray-500 font-medium mb-6">
            Apply Date: {quizJobData.applyDate}
          </p>

          {/* Step and Progress Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-gray-800">
              <ClockIcon className="h-5 w-5 text-gray-600 mr-2" />
              <span className="font-bold text-lg">Step {quizJobData.step}</span>
            </div>
            <span className="text-lg font-bold text-gray-700">{quizJobData.progress}% Completed</span>
          </div>

          {/* Progress Indicator (Using DaisyUI progress bar class) */}
          {/* Note: Tailwind only is used here as DaisyUI is not assumed to be imported in the React environment, 
              but I'll use a visual simulation of the progress bar look. */}
          <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
            <div 
              className="bg-[#ff9100] h-1 rounded-full transition-all duration-500" 
              style={{ width: `${quizJobData.progress}%` }}
              role="progressbar"
              aria-valuenow={quizJobData.progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          {/* Requirement Section */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 mb-8">
            <div className="flex items-start text-gray-800 mb-3">
              <SparkleIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="font-semibold leading-relaxed">
                {quizJobData.requirementText}
              </p>
            </div>
            
            {/* Level Verification Status */}
            <div className="flex items-center p-3 bg-gray-100 rounded-lg mt-4">
              {/* Status Indicator (Gray circle) */}
              <div className="h-3 w-3 rounded-full bg-gray-400 mr-3"></div>
              <span className="text-gray-700 font-medium">
                {quizJobData.verificationStatus}
              </span>
            </div>
          </div>

        </div>

        {/* Action Button (Fixed to the bottom of the card content for mobile feel) */}
        {/* Use the card-actions class structure from DaisyUI concept */}
        <div className="p-6 md:p-8 pt-0 w-full sticky bottom-0 bg-white">
          <button className="w-full btn bg-[#ff9100] text-white border-0 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-lg shadow-lg py-3 text-lg font-bold transition duration-150 ease-in-out">
            {quizJobData.buttonText}
          </button>
        </div>
      </div>
                    </div>
                  </section>
                  <div>
                    <Advertisement></Advertisement>
                  </div>
                </main>
        </div>
    );
};

export default Quizjob;