const Card = ({ item, order }) => {
  const { name, price, image, color } = item;

  return (
    <div className='flex my-2 justify-between items-center border border-transparent border-t-black border-b-black'>
      <div className='flex justify-between items-center'>
        <img
          src={image}
          alt={name}
          className=' w-10 h-10 sm:w-32 sm:h-32 m-2 rounded-md object-cover'
        />
        <div className='flex flex-col justify-between items-start gap-4 capitalize'>
          <div>
            <h2 className='font-bold text-sm sm:text-normal text-gray-500'>
              {order.status}
            </h2>
            <p className='font-semibold text-sm sm:text-normal bg-emerald-600 px-2 py-1 rounded-xl'>
              {order.payWith}
            </p>
          </div>

          <h4 className='italic font-medium text-sm sm:text-normal'>
            01.07.2023 {order.createdAt}
          </h4>
        </div>
      </div>
      <div className='flex flex-col justify-between items-center gap-5'>
        <h2 className='text-xs sm:text-normal capitalize font-semibold'>
          {name}
        </h2>
        <div className=''>
          <p
            className='w-3 h-3 sm:w-5 sm:h-5 rounded-full mb-2 text-sm sm:text-normal'
            style={{ backgroundColor: color }}
            title='color'
          ></p>
          <p className='text-xs sm:text-normal font-bold'>${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
