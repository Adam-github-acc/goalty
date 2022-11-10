import { useCallback, useState } from "react";

function useApiCb() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (url, options, cb) => {
    setIsLoading(true);
    try {
      const data = await fetch(url, options);
      const jsonData = await data.json();
      setIsLoading(false);
      cb(null, jsonData);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
      cb(err);
    }
  });

  return {isLoading, fetchData};
}

export default useApi;