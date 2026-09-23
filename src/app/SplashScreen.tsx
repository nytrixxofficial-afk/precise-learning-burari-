"use client";

import Image from "next/image";
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
      <Image
        className="splash-image"
        src="/splash-sachin-gupta.png"
        alt="Sachin Gupta from Precise Learning"
        fill
        priority
        sizes="100vw"
      />
    </div>
  );
}
