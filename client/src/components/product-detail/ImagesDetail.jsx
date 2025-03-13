/* eslint-disable react/prop-types */
import { useState } from "react";

const ImagesDetail = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="col-start-1 col-end-13 md:col-start-1 md:col-end-7">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="flex flex-row md:flex-col gap-2">
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt="Thumbnail"
                className={`aspect-square object-cover rounded-md cursor-pointer border ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>
        {/* Gambar utama */}
        <div className="col-span-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full aspect-square object-cover border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesDetail;
