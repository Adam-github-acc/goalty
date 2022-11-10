import { StyleSheet, View, Text, ScrollView } from "react-native";
import useDarkMode from "../../hooks/useDarkMode";
import { fonts } from "../../utils/enums";
import PrimaryButton from "./PrimaryButton";

export default function UiCard ({title, description, buttonText, link}) {
  const { surfaceColor, color, secondaryText } = useDarkMode();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: surfaceColor,
      padding: 15,
      width: '95%',
      marginLeft: 10,
      borderRadius: 10,
      marginBottom: 20,
    },
    title: {
      color,
      fontSize: fonts.card.title.size,
      fontWeight: fonts.card.title.weight
    },
    description: {
      color: secondaryText,
      fontSize: fonts.card.description.size,
      marginBottom: 10
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <PrimaryButton>{buttonText}</PrimaryButton>
    </View>
  )
}