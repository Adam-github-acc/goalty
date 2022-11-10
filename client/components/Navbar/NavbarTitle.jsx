import { StyleSheet, Text } from "react-native";
import useDarkMode from "../../hooks/useDarkMode";

export default function NavbarTitle({ children }) {
  const { color } = useDarkMode();

  const styles = StyleSheet.create({
    text: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      paddingLeft: 5,
      color,
      fontFamily: 'Arial'
    }
  });
  return (
    <Text style={styles.text}>{children}</Text>
  );
}