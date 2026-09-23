"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="splash-screen" role="status" aria-label="Loading Precise Learning">
      <div className="splash-word splash-word-top" aria-hidden="true">
        PRECISE
      </div>
      <div className="splash-word splash-word-bottom" aria-hidden="true">
        LEARNING
      </div>
      <div className="splash-content">
        <small>PRECISE LEARNING</small>
        <h1>SACHIN GUPTA</h1>
        <span>BURARI · NEW DELHI</span>
      </div>
    </div>
  );
}
