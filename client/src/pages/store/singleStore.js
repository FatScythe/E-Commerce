import { useParams } from "react-router-dom";

// Hooks
import useFetch from "../../hooks/useFetch";
// Utils
import url from "../../utils/url";
const SingleStore = () => {
  const { id } = useParams();
  const { data, pending, error } = useFetch(url + "/api/v1/stores/" + id);

  console.log(data);
  return <div>SingleStore {id}</div>;
};

export default SingleStore;
