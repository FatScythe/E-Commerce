// Hook
import useSWR from "swr";
// Component
import OrderAccordian from "./OrderAccordian";
import Loader1 from "../../../../component/loaders/loader1";
import Error1 from "../../../../component/loaders/error";
// Utils
import url from "../../../../utils/url";

const Purchased = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    url + "/api/v1/orders/showCurrentUserOrder",
    fetcher
  );

  if (isLoading) {
    return (
      <div>
        <Loader1 />
      </div>
    );
  }

  if (error || (data && data?.msg)) {
    const message = error ? error.message : data.msg;
    return (
      <div>
        <Error1 msg={message} />
      </div>
    );
  }

  const { orders } = data;

  if (!orders.length > 0) {
    return (
      <div className='text-base sm:text-lg mt-10 text-center'>
        You have not purchased anything yet : )
      </div>
    );
  }

  return (
    <>
      {orders.map((order) => {
        return <OrderAccordian key={order._id} order={order} />;
      })}
    </>
  );
};

export default Purchased;
