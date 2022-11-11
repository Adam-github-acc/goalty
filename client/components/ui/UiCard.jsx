import { StyleSheet, View, Text, ScrollView } from "react-native";
import useDarkMode from "../../hooks/useDarkMode";
import { fonts, iconSets } from "../../utils/enums";
import PrimaryButton from "./PrimaryButton";
import UiIcon from "./UiIcon";

export default function UiCard ({title, description, buttonText, onClickButton, goalCount}) {
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
    firstRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    goalsCount: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color,
      fontSize: fonts.card.title.size,
      fontWeight: fonts.card.title.weight
    },
    goalsText: {
      color,
      fontSize: fonts.card.title.size
    },
    description: {
      color: secondaryText,
      fontSize: fonts.card.description.size,
      marginBottom: 10
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.goalsCount}>
          <Text style={styles.goalsText}>
            {goalCount + ' '}
          </Text>
          <UiIcon name="outlined-flag" type={iconSets.materialIcons} size={22} color={color}/>
        </View>

      </View>
      <Text style={styles.description}>{description}</Text>
      <PrimaryButton onClick={onClickButton}>{buttonText}</PrimaryButton>
    </View>
  )
}