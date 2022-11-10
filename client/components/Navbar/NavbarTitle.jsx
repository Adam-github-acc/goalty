import { StyleSheet, Text } from "react-native";
import useDarkMode from "../../hooks/useDarkMode";
import { fonts } from "../../utils/enums";

export default function NavbarTitle({ children }) {
  const { navbar } = fonts;
  const { color } = useDarkMode();

  const styles = StyleSheet.create({
    text: {
      fontSize: navbar.size,
      fontWeight: '700',
      textAlign: 'center',
      paddingLeft: 5,
      color,
      fontFamily: fonts.fontFamily
    }
  });
  return (
    <Text style={styles.text}>{children}</Text>
  );
}