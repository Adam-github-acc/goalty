import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
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
  const { setNavTitle, setGoBack } = useContext(GlobalContext);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const [user, setUser] = useState(null)
  const ndef = new NdefTools();
  const [modalText, setModalText] = useState('');
  const navigate = useNavigate();

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
        
        createCard(data.data.id);
      }
    })
  }

  const closeModal = () => {
    ndef.cancelRequest();
    toggleModal();
  }

  const createCard = async (userId) => {
    setModalText('Pass the card through the reader to assign it to the user');
    toggleModal();
    try {
      await ndef.writeTag(userId);
      navigate(-1);
    } catch (err) {
      console.log('Error writing card: ', err);
    }
    closeModal();
  }

  const addGoalToUser = async () => {
    setModalText('Pass the card through the reader to update the goal in the user');
    toggleModal();
    try {
      const nfcCard = await ndef.readTag();
      toggleModal();
      const url = api.baseUrl + api.v1prefix + api.userPrefix + '/' 
        + nfcCard.content + api.goalPrefix + '/' + goalState.id;
      fetchData(url, {method: 'POST'}, (err, data) => {
        if (!err && data.status === 200) {
          navigate(-1);
        }
      })
    } catch (err) {
      console.log(err);
    }
    closeModal();
  }

  useEffect(() => {
    setNavTitle('Create / update card');
    setGoBack(true);
    setGoalState(JSON.parse(goal));
  }, []);

  return (
    <>
      <Text style={styles.text}>You are going to add the following goal: "{goalState.name}"</Text>
      {goalState.new === true ? (
        <Form title="Type the user's username to create the card" onSubmit={handleSubmit} inputs={forms.addGoal} />
      ) : (
        <PrimaryButton onClick={addGoalToUser}>Scan card</PrimaryButton>
      )
      }

      <UiModal isVisible={isModalVisible} onBackButtonPress={closeModal} onBackdropPress={closeModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalText}</Text>

            <PrimaryButton onClick={toggleModal}>Close modal</PrimaryButton>

          </View>
      </UiModal>
    </>
  )
}