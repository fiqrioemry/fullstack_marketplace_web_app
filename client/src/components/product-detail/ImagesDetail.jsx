/* eslint-disable react/prop-types */
import { useState } from "react";

const ImagesDetail = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="col-start-1 col-end-13 md:col-start-1 md:col-end-7">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                selectedImage === img ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Gambar utama */}
        <div className="md:col-span-3">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-auto object-contain rounded shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesDetail;
