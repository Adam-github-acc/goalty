import { useEffect, useState } from "react";

export default function useForm (inputs) {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    for (const input of inputs) setFormValues((prev) => ({
        ...prev,
        [input.label]: ''
      })
    // const obj = {...prev};
    // obj[input.label] = '';
    // return obj
    );
  }, []);

  const updateValue = (label, value) => setFormValues((prev) => ({
    ...prev,
    [label]: value
  }));


  return { formValues, updateValue };
}