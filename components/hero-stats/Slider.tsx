import React, { useEffect, useRef, useState } from 'react';

const images: { desktop: string, mobile: string }[] = [
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/0.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/0.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/1.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/1.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/2.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/2.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/3.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/3.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/4.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/4.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/5.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/5.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/6.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/6.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/7.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/7.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/8.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/8.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/9.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/9.png"
  },
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/10.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/10.png"
  }
];
const delay = 4000;

function isMobileDevice() {
  return window.innerWidth <= 720;
}

export const Slider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, idx) => (
          <div
            className="slide"
            key={idx}
            style={{ backgroundImage: `url(${isMobileDevice() ? image.mobile : image.desktop})` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
