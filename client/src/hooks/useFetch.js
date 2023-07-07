import useSWR from "swr";

const useFetch = (url) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(url, fetcher, {
    // refreshInterval: 3000,
  });

  return { data, pending: isLoading, error };
};

export default useFetch;
