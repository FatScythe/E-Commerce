import { useState } from "react";
import { toast } from "react-toastify";

const Step2 = ({ product, setProduct }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    data.append("folder", "Ayeti-Adorn/products");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      if (!response.ok) {
        toast.error("Something went wrong : ) Unable to upload");
        return;
      }

      setUrl(res.secure_url);

      setProduct({ ...product, image: res.secure_url });
      setLoading(false);
      toast.success("Product Image Uploaded");
    } catch (error) {
      toast.error("Error, unable to upload!");
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
  };

  return (
    <div id='step-2' className='h-full sm:px-8 md:px-16 sm:py-8'>
      <div>
        <header className='border-dashed border-2 border-gray-400 py-3 flex flex-col justify-center items-center'>
          <p className='mb-3 font-semibold text-gray-900 flex flex-wrap justify-center'>
            <span>Click on Upload a File</span>&nbsp;
          </p>
          <input
            id='hidden-input'
            type='file'
            className='hidden'
            onChange={handleImageChange}
            accept='image/*'
          />
          <label htmlFor='hidden-input' className='cursor-pointer'>
            <div className='mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none'>
              Upload a file
            </div>
          </label>

          <div className='flex justify-center items-center mt-5 mx-3 max-w-xs'>
            {preview && <img src={preview} alt='preview' />}
          </div>
        </header>
        <div className='flex justify-end pb-8 pt-6 gap-4'>
          <button
            onClick={uploadImage}
            className='rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed'
            disabled={!image}
          >
            Upload now
          </button>
          <button
            onClick={handleResetClick}
            className='rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none'
          >
            Reset
          </button>
        </div>
        {loading ? (
          <div className='flex items-center justify-center gap-2'>
            <div className='border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6'></div>
            <span>Processing...</span>
          </div>
        ) : (
          url && (
            <div className='pb-8 pt-4'>
              <img
                className='object-cover w-full'
                src={url}
                alt={product.name}
              />
            </div>
          )
        )}

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
            disabled={loading}
            onClick={() => setProduct({ ...product, step: product.step + 1 })}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
