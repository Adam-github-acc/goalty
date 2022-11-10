import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Form from "../components/Form/Form";
import GlobalContext from "../context/GlobalContext";
import { forms } from "../utils/enums";

export default function MyAccount () {
  const { isAuthenticated } = useContext(GlobalContext);
  const submitHandler = (values) => console.log(values);

  const styles = StyleSheet.create({
    
  })

  return (
    <>
    {
      isAuthenticated ? (
        <View>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Form title="Login" inputs={forms.login} buttonText="Login" onSubmit={submitHandler} />
        </View>
      )
    }
    </>
  );
}