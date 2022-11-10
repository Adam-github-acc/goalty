import { useEffect, useState } from "react";

const useInput = (checkValue, checkTime) => {
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [valueInput, setValueInput] = useState('');
    const [isValueValid, setIsValueValid] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    useEffect(() => {
        if (isFirstTime) {
            setIsFirstTime(false);
            return;
        }

        const timer = setTimeout(() => {
            if (valueInput !== '' && checkValue) setIsValueValid(checkValue(valueInput));
        }, checkTime);

        return () => clearTimeout(timer);
    }, [valueInput, checkValue, isFirstTime, checkTime]);

    return {
        valueInput,
        isValueValid,
        setValueInput,
        isFocused,
        handleFocus,
        handleBlur
    }
}

export default useInput;