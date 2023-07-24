import { useRef, useState } from "react";
import { toast } from "react-toastify";

const Step2 = ({ product, setProduct }) => {
  const [value, setValue] = useState({ loading: false, fileLink: "" });
  const productImage = useRef(null);

  const handleProductImage = async (e) => {
    setValue({ ...value, loading: true });

    const formData = new FormData();
    let imageFile;
    if (!e.target.files && !e.target.files[0]) {
      toast.error("No image selected");
      return;
    }
    productImage.current.setAttribute(
      "src",
      URL.createObjectURL(e.target.files[0])
    );

    imageFile = e.target.files[0];

    if (!imageFile.type.startsWith("image")) {
      setValue({ ...value, loading: false });
      toast.error("Please provide only image");
      return;
    }
    if (imageFile.size > 5242880) {
      setValue({ ...value, loading: false });
      toast.error("Image Size must be less than 5MB");
      return;
    }

    formData.append("file", imageFile);
    formData.append("upload_preset", process.env.REACT_APP_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    formData.append("folder", "Ayeti-Adorn/products");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setValue({ ...value, loading: false });
        toast.error("Something went wrong :) couldn't upload image ");
        return;
      }

      setValue({ ...value, fileLink: data.public_id, loading: false });
      console.log("public id", data.public_id);
      setProduct({ ...product, step: 2, image: value.fileLink });
      imageFile = undefined;
    } catch (error) {
      console.log("in catch");
      toast.error("Unable to upload");
      setValue({ ...value, loading: false });
      console.error(error);
    }
  };

  return (
    <div>
      <form className='sm:w-9/12 mx-auto'>
        <div className=''>
          <label
            htmlFor='product-price'
            className='text-base sm:text-xl text-gray-800 block mb-10'
          >
            Product Image
          </label>
          <img
            className='w-60 h-40 object-cover mb-2'
            ref={productImage}
            src='#'
            alt={product.name}
          />
          <input
            onChange={(e) => handleProductImage(e)}
            type='file'
            accept='image/*'
            className=''
          />
        </div>

        <p>{value.fileLink}</p>

        <div className='my-6 flex justify-between items-center'>
          <button
            type='button'
            className='w-fit rounded-md bg-secondary px-6 py-2 text-black focus:bg-gray-600 focus:outline-none first-letter:uppercase'
            onClick={() => setProduct({ ...product, step: product.step - 1 })}
          >
            prev
          </button>
          <button
            type='button'
            className='w-fit rounded-md bg-secondary px-6 py-2 text-black focus:bg-gray-600 focus:outline-none first-letter:uppercase'
            disabled={value.loading}
            onClick={() => setProduct({ ...product, step: product.step - 1 })}
          >
            next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
