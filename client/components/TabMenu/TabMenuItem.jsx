import { StyleSheet, TouchableOpacity, Text } from "react-native";
import useDarkMode from "../../hooks/useDarkMode";
import { colors, fonts } from "../../utils/enums";

export default function TabMenuItem ({ children, isSelected, isFirst, onClick }) {
  const { color, dividerColor } = useDarkMode();

  const styles = StyleSheet.create({
    container: {
      width: '33%',
      height: '100%',
      borderLeftWidth: isFirst ? 0 : 1,
      borderBottomWidth: 2,
      borderColor: dividerColor,
      borderBottomColor: isSelected ? colors.global.primary.default : undefined,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: isSelected ? colors.global.primary.default : color,
      fontSize: fonts.tabMenuItems.size
    }
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onClick} >
      <Text style={styles.text}>{children.split('_').join(' ')}</Text>
    </TouchableOpacity>
  )
}