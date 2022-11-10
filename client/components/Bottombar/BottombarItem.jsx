import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import GlobalContext from "../../context/GlobalContext";
import useDarkMode from "../../hooks/useDarkMode";
import UiIcon from "../ui/UiIcon";
import { iconSets, colors } from "../../utils/enums";
import { fonts } from "../../utils/enums";

export default function BottombarItem ({icon, text, link}) {
  const { navTitle, setNavTitle } = useContext(GlobalContext);
  const { color } = useDarkMode();
  const navigate = useNavigate();
  const redir = () => {
    setNavTitle(text);
    navigate(`/${link}`);
  };

  const styles = StyleSheet.create({
    container: {
      height: '80%',
      width: '20%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    text: {
      color: text === navTitle ? colors.global.primary.default : color,
      fontFamily: fonts.fontFamily
    }
  });
  

  return (
    <TouchableOpacity onPress={redir} style={styles.container}>
      <UiIcon style={styles.text} name={icon} size={30} type={iconSets.materialIcons} color={color} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}