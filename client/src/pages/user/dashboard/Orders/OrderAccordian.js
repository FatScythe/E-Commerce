import { useState } from "react";
// Component
import Card from "./OrderCard";
const OrderAccordian = ({ order }) => {
  const [isAccOpen, setIsAccOpen] = useState(false);
  return (
    <div
      className='py-2 mx-auto w-full border-gray-400 border-t'
      onClick={() => setIsAccOpen(!isAccOpen)}
    >
      <header className='flex justify-between items-center md:cursor-pointer'>
        <h3 className='font-semibold text-sm sm:text-normal'>
          Order #{order._id}
        </h3>
        <button className='font-bold text-base'>{isAccOpen ? "-" : "+"}</button>
      </header>

      <article
        className={`overflow-hidden first-letter:uppercase lowercase transition-all duration-700 ${
          isAccOpen ? "max-h-full" : "max-h-0"
        }`}
      >
        {order.orderItems.map((item) => {
          return <Card key={item._id} item={item} order={order} />;
        })}
      </article>
    </div>
  );
};

export default OrderAccordian;
