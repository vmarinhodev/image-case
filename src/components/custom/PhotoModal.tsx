import React from "react";
import Image from "next/image";

interface ImageViewerProps {
  selectedImage: string;
//   onNext: () => void;
//   onPrev: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  selectedImage,
//   onNext,
//   onPrev,
}) => {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <Image
          src={selectedImage}
          alt={selectedImage}
          style={{
            width: 1018,
            maxWidth: "100%",
          }}
          className="py-2"
        />
      </div>
    </div>
  );
};

export default ImageViewer;