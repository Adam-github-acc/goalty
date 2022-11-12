import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import GlobalContext from "../../context/GlobalContext";
import useApiCb from "../../hooks/useApiCb";
import useDarkMode from "../../hooks/useDarkMode";
import { api, fonts, forms } from "../../utils/enums";
import Form from "../Form/Form";
import PrimaryButton from "../ui/PrimaryButton";
import UiModal from "../ui/UiModal";
import { NdefTools } from 'react-native-nfc-sdk';

export default function AddGoal () {
  let { goal } = useParams();
  const { backgroundColor, color } = useDarkMode();
  const [goalState, setGoalState] = useState(goal);
  const { fetchData, isLoading } = useApiCb();
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const { setNavTitle } = useContext(GlobalContext);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const [user, setUser] = useState(null)
  const ndef = new NdefTools();

  const styles = StyleSheet.create({
    text: {
      fontSize: fonts.addGoal.text.size,
      fontWeight: fonts.addGoal.text.weight,
      marginBottom: 25,
      color
    },
    modalContent: {
      backgroundColor,
      padding: 20,
      borderRadius: 10
    },
    modalText: {
      textAlign: 'center',
      color,
      marginBottom: 30,
      fontSize: 20
    }
  });

  const handleSubmit = (values) => {
    const url = api.baseUrl + api.v1prefix + api.userPrefix + '/username/' + values.username;
    console.log(url);

    fetchData(url, null, (err, data) => {
      console.log(data);
      if (!err && data.status < 400) {
        console.log(data.id);
        
        addGoalToUser(data.data.id);
      }
    })
  }

  const createCard = async (userId) => {
    toggleModal();
    
  }

  const addGoalToUser = async () => {
    toggleModal();
    try {
      const nfcCard = await ndef.readTag();
      console.log(nfcCard);
    } catch (err) {
      console.log(err);
    }
    toggleModal();
  }

  useEffect(() => {
    setNavTitle('Add user');
    setGoalState(JSON.parse(goal));
  }, []);

  return (
    <>
      <Text style={styles.text}>You are going to add the following goal: "{goalState.name}"</Text>
      {goalState.new === true ? (
        <Form title="Type the user's username to create the card" onSubmit={handleSubmit} inputs={forms.addGoal} />
      ) : (
        <PrimaryButton onClick={toggleModal}>Scan card</PrimaryButton>
      )
      }

      <UiModal isVisible={isModalVisible} onBackButtonPress={toggleModal} onBackdropPress={toggleModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Pass the customer's card through the reader</Text>

            <PrimaryButton title="Close" onClick={addGoalToUser}>Close modal</PrimaryButton>

          </View>
      </UiModal>
    </>
  )
}