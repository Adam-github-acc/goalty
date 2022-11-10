import { StyleSheet, View } from "react-native"
import useDarkMode from "../../hooks/useDarkMode"

export default function Divider () {
  const { dividerColor } = useDarkMode();

  const styles = StyleSheet.create({
    divider: {
      backgroundColor: dividerColor,
      width: '100%',
      height: '0.25%',
    }
  })
  
  return (
    <View style={styles.divider}></View>
  )
}