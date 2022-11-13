import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/enums";
import { fonts } from "../../utils/enums";

export default function PrimaryButton ({ children, onClick, disabled }) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: disabled ? colors.global.primary.disabled : colors.global.primary.default,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 10,
    },
    text: {
      color: fonts.button.color,
      fontSize: fonts.button.size,
    }
  })

  const Component = disabled ? View : TouchableOpacity;

  return (
    <Component style={styles.button} onPress={disabled ? null : onClick}>
        <Text style={styles.text}>{ children }</Text>
    </Component>
  )
}