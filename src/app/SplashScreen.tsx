"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="splash-screen" role="status" aria-label="Loading Precise Learning">
      <Image
        className="splash-image"
        src="/student-group-landscape.jpg"
        alt="Students learning together at Precise Learning"
        fill
        priority
        sizes="100vw"
      />
      <div className="splash-overlay" />
      <div className="splash-content">
        <Image
          src="/precise-learning-logo.png"
          alt=""
          width={72}
          height={72}
          priority
        />
        <span>PRECISE LEARNING</span>
        <small>BURARI · NEW DELHI</small>
      </div>
    </div>
  );
}
