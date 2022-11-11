import { useCallback, useState } from "react";

export default function useApiCb() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (url, options, cb) => {
    console.log(url);
    setIsLoading(true);
    try {
      const data = await fetch(url, options);
      const jsonData = await data.json();
      setIsLoading(false);
      cb(null, jsonData);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      cb(err);
    }
  });

  return {isLoading, fetchData};
}