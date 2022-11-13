import { useEffect, useState } from "react";

export default function useForm (inputs) {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    for (const input of inputs) setFormValues((prev) => ({
        ...prev,
        [input.label]: ''
      })
    );
  }, []);

  const updateValue = (label, value) => setFormValues((prev) => ({
    ...prev,
    [label]: value.trim()
  }));


  return { formValues, updateValue };
}