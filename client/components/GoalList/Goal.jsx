import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useDarkMode from "../../hooks/useDarkMode";
import { fonts } from "../../utils/enums";
import PrimaryButton from "../ui/PrimaryButton";
import { useNavigate } from "react-router-native";
import SecondaryButton from "../ui/SecondaryButton";

export default function Goal ({ goal, isOwn, companyName, progress }) {
  const { surfaceColor, secondaryText, color } = useDarkMode();
  const navigate = useNavigate();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      padding: 15,
      backgroundColor: surfaceColor,
      marginBottom: 10,
      borderRadius: 10
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    name: {
      fontSize: fonts.goal.name.size,
      fontWeight: fonts.goal.name.weight,
      color,
      marginBottom: 5,
    },
    description: {
      fontSize: fonts.goal.description.size,
      color: secondaryText,
      marginBottom: 20,
    },
    firstRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })
  return (
    <>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text style={styles.name}>{goal.name}</Text>
          <Text style={styles.name}>{progress}</Text>

        </View>
        <Text style={styles.description}>Company: {companyName}</Text>
        {isOwn && (
          <>
          <View style={styles.buttons}>
            <SecondaryButton onClick={() => navigate('/addgoal/' + JSON.stringify({...goal, new: true}))}>Create card</SecondaryButton>
            <PrimaryButton onClick={() => navigate('/addgoal/' + JSON.stringify(goal))}>Update card</PrimaryButton>
          </View>
          </>
        )}
      </View>
    </>

  );
}