import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import useDarkMode from "../../hooks/useDarkMode";
import { colors } from "../../utils/enums";
import { fonts } from "../../utils/enums";

export default function SecondaryButton ({ children, onClick, disabled }) {
  const { color } = useDarkMode();
  const styles = StyleSheet.create({
    button: {
      borderColor: colors.global.primary.default,
      borderWidth: 2,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    text: {
      color,
      fontSize: fonts.button.size
    }
  })

  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.text}>{ children }</Text>
    </TouchableOpacity>
  )
}