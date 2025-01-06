import { useState, useEffect } from "react";

const ProductImages = () => {
  const [thumbnail, setThumbnail] = useState(null);

  const handleImage = (image) => {
    setThumbnail(image);
  };

  useEffect(() => {
    setThumbnail(null);
  }, []);

  return (
    <div className="grid grid-cols-10 gap-2 ">
      <div className="col-span-10 md:col-span-2 flex md:grid grid-rows-4 gap-2">
        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <img
              className="object-cover w-full h-full"
              src="https://images.tokopedia.net/img/cache/900/VqbcmM/2022/5/28/60515223-0b91-417a-85bc-34ad49a4a430.jpg"
              alt=""
            />
          </div>
        ))}
      </div>

      <div className="col-span-10 md:col-span-8">
        <div className="flex justify-center items-center rounded-md ">
          <img
            className="object-cover w-full h-full"
            src="https://images.tokopedia.net/img/cache/900/VqbcmM/2022/5/28/60515223-0b91-417a-85bc-34ad49a4a430.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
