import { StyleSheet, View } from "react-native";
import NavbarTitle from "./NavbarTitle";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { TouchableOpacity } from "react-native";
import UiIcon from "../ui/UiIcon";
import { iconSets } from "../../utils/enums";
import { colors } from "../../utils/enums";
import useDarkMode from "../../hooks/useDarkMode";

export default function Navbar ({ onBack }) {
  const { toggleTheme, themeIcon, color, backgroundColor } = useDarkMode();
  const { navTitle } = useContext(GlobalContext);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      justifyContent: 'space-between'
    },
    leftSide: {
      width: '15%',
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    title: {
      width: '60%',
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    rightSide: {
      width: '25%',
      display: 'flex',
      flexDirection: 'row-reverse'
    }
  });

  return (
    <View style={styles.container}>
      {
        onBack && (
          <View style={styles.leftSide}>
            <UiIcon name="arrow-back" size={30} color={color} type={iconSets.materialIcons} />
          </View>
          )
      }

      <View style={styles.title}>
        <NavbarTitle>{ navTitle }</NavbarTitle>
      </View>
      <View style={styles.rightSide}>
        <TouchableOpacity onPress={toggleTheme}>
          <UiIcon name={themeIcon} size={28} color={color} 
          type={iconSets.feather} />
        </TouchableOpacity>
      </View>
    </View>
  );
}