import { useEffect, useState } from "react";

export default function useTabMenu (onChange) {
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue])

  return {selectedValue, setSelectedValue}
}