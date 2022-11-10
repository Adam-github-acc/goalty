import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/enums";
import { fonts } from "../../utils/enums";

export default function PrimaryButton ({ children, onClick, disabled }) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.global.primary.default,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    text: {
      color: fonts.button.color,
      fontSize: fonts.button.size
    }
  })

  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.text}>{ children }</Text>
    </TouchableOpacity>
  )
}