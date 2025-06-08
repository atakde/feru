import React, { useState, useRef, useEffect } from "react";
import Marker from "./Marker";

const MarkedImage = ({
  initialMarkers,
  imageUrl,
  centerMarker = false,
}) => {
  const [markers, setMarkers] = useState(initialMarkers || []);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);

  useEffect(() => {
    const updateImgSize = () => {
      if (imgRef.current) {
        setImgSize({
          width: imgRef.current.offsetWidth,
          height: imgRef.current.offsetHeight,
        });
      }
    };

    updateImgSize();
    window.addEventListener("resize", updateImgSize);
    return () => window.removeEventListener("resize", updateImgSize);
  }, []);

  return (
    <div className="relative inline-block w-full">
      <img
        src={imageUrl}
        alt="Interactive devices visualization"
        ref={imgRef}
        className="w-full h-auto rounded-lg"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          xPercent={marker.xPercent}
          yPercent={marker.yPercent}
          imgWidth={imgSize.width}
          imgHeight={imgSize.height}
          label={marker.label}
        />
      ))}
      {centerMarker && imgSize.width > 0 && (
        <div
          className="absolute"
          style={{
            top: `${imgSize.height / 2}px`,
            left: `${imgSize.width / 2}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
      )}
    </div>
  );
};

export default MarkedImage;
