import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function AdCard({ ad, axiosInstance }) {
  // ad: { id, title, icon, landing_url, min_view_seconds, payout_per_view }
  const [session, setSession] = useState(null);
  const [visibleSeconds, setVisibleSeconds] = useState(0);
  const [credited, setCredited] = useState(false);
  const ref = useRef();
  const timerRef = useRef(null);
  const isTabVisible = useRef(true);

  useEffect(() => {
    function handleVisibility() {
      isTabVisible.current = !document.hidden;
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    // create ad session on mount
    async function createSession() {
      const res = await axiosInstance.post(`/api/ads/${ad.id}/create-session`);
      setSession(res.data);
    }
    createSession();
  }, [ad.id, axiosInstance]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !credited) {
          // start timer
          if (!timerRef.current) {
            timerRef.current = setInterval(() => {
              if (isTabVisible.current) {
                setVisibleSeconds(s => s + 1);
              }
            }, 1000);
          }
        } else {
          // stop timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      });
    }, { threshold: 0.6 });

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [credited]);

  useEffect(() => {
    // if reached required seconds -> complete
    if (session && !credited && visibleSeconds >= session.required_seconds) {
      // call backend to complete
      (async () => {
        try {
          const res = await axiosInstance.post('/api/ads/complete', {
            session_token: session.session_token,
            view_seconds: visibleSeconds
          });
          if (res.data.success) {
            setCredited(true);
            // optional: open landing page in new tab
            window.open(ad.landing_url, '_blank');
            alert(`You earned $${res.data.amount}`);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [visibleSeconds, session, credited, ad.landing_url, axiosInstance]);

  return (
    <div ref={ref} className="max-w-lg mx-auto bg-gray-900 text-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <img src={ad.icon} alt={ad.title} className="w-16 h-16 rounded-md" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{ad.title}</h3>
          <div className="text-sm text-gray-300">{ad.category || 'App'}</div>
          <div className="text-yellow-400 mt-1">⭐ {ad.rating || '4.0'}</div>
        </div>
        <div>
          <button
            className="px-4 py-2 rounded-full bg-blue-400 text-black font-semibold"
            onClick={() => window.open(ad.landing_url, '_blank')}
          >
            Install
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-400">
        viewed: {visibleSeconds}s / {session ? session.required_seconds : ad.min_view_seconds}s
        {credited && <span className="ml-2 text-green-400 font-semibold">Credited</span>}
      </div>
    </div>
  );
}
