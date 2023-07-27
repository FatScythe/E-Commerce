import useSWR from "swr";

const useFetch = (url, interval = 0) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: interval,
  });

  return { data, pending: isLoading, error };
};

export default useFetch;
