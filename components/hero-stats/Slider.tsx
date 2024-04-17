import React, { useEffect, useRef, useState } from 'react';

const images: { desktop: string, mobile: string }[] = [
  {
    desktop: "https://i.ibb.co/QJbfKTt/20240320-004858-0000.png",
    mobile: "https://i.ibb.co/QJbfKTt/20240320-004858-0000.png"
  },
  {
    desktop: "https://i.ibb.co/5sfrWgv/20240320-004859-0001.png",
    mobile: "https://i.ibb.co/5sfrWgv/20240320-004859-0001.png"
  },
  {
    desktop: "https://i.ibb.co/PCS7NWk/20240320-004859-0002.png",
    mobile: "https://i.ibb.co/PCS7NWk/20240320-004859-0002.png"
  },
  {
    desktop: "https://i.ibb.co/sbFhNS6/20240320-004859-0003.png",
    mobile: "https://i.ibb.co/sbFhNS6/20240320-004859-0003.png"
  },
  {
    desktop: "https://i.ibb.co/sR4qydN/20240320-004859-0004.png",
    mobile: "https://i.ibb.co/sR4qydN/20240320-004859-0004.png"
  },
  {
    desktop: "https://i.ibb.co/TWVq5st/20240320-004859-0005.png",
    mobile: "https://i.ibb.co/TWVq5st/20240320-004859-0005.png"
  },
  {
    desktop: "https://i.ibb.co/XL0X14b/20240320-004859-0006.png",
    mobile: "https://i.ibb.co/XL0X14b/20240320-004859-0006.png"
  },
  {
    desktop: "https://i.ibb.co/3rMLQDF/20240320-004859-0007.png",
    mobile: "https://i.ibb.co/3rMLQDF/20240320-004859-0007.png"
  },
  {
    desktop: "https://i.ibb.co/TPnx2Fj/20240320-004859-0008.png",
    mobile: "https://i.ibb.co/TPnx2Fj/20240320-004859-0008.png"
  },
  {
    desktop: "https://i.ibb.co/v1PTmVR/20240320-004859-0009.png",
    mobile: "https://i.ibb.co/v1PTmVR/20240320-004859-0009.png"
  },
  {
    desktop: "https://i.ibb.co/ZTzDZBJ/20240320-004859-0011.png",
    mobile: "https://i.ibb.co/ZTzDZBJ/20240320-004859-0011.png"
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
