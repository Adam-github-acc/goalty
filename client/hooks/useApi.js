import { useCallback, useState } from "react";

function useApi() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (url, options) => {
    setIsLoading(true);
    try {
      const data = await fetch(url, options);
      const jsonData = await data.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  });

  return {error, data, isLoading, fetchData};
}

export default useApi;