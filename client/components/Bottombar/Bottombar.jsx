import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  }
})

export default function Bottombar ({children}) {
  return (
    <View style={styles.container} >
      {children}
    </View>
  );
}