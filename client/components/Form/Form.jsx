import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import useForm from "../../hooks/useForm";
import Input from "../ui/Input";
import PrimaryButton from "../ui/PrimaryButton";
import { fonts } from "../../utils/enums";
import useDarkMode from "../../hooks/useDarkMode";

export default function Form ({title, inputs, onSubmit, buttonText }) {
  const { formValues, updateValue } = useForm(inputs);
  const { color } = useDarkMode();

  const styles = StyleSheet.create({
    title: {
      fontSize: fonts.form.title.size,
      fontWeight: fonts.form.title.weight,
      marginBottom: 10,
      color
    },
  });

  return (
    <>
      {title !== undefined && <Text style={styles.title}>{title}</Text>}
      {
        inputs.map((input) => <Input
            key={input.label}
            label={input.label}
            placeholder={input.placeholder}
            checkValue={input.checkValue}
            checkTime={input.checkTime}
            onChange={(label, value) => updateValue(label, value)}
            marginBottom={15}
          />
          )
      }
      <PrimaryButton onClick={() => onSubmit(formValues)}>{buttonText || 'Submit'}</PrimaryButton>
    </>
  )
}