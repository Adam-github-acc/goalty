import { StyleSheet, View } from "react-native"

export default function GoalList({ children }) {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15
    }
  })
  return (
    <View style={styles.container}>
      { children }
    </View>
  )
}