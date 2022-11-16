import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigate } from "react-router-native";
import GlobalContext from "../../context/GlobalContext";
import useApiCb from "../../hooks/useApiCb";
import useDarkMode from "../../hooks/useDarkMode";
import { getLoggedInUser, getToken } from "../../utils/auth";
import { api, fonts, toastTypes } from "../../utils/enums";
import storage from "../../utils/storage";
import { showToast } from "../../utils/toast";
import PrimaryButton from "../ui/PrimaryButton";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function UserInfo () {
  const [userState, setUserState] = useState(null);
  const { surfaceColor, color } = useDarkMode();
  const navigate = useNavigate();
  const { fetchData, isLoading } = useApiCb();
  const { setIsAuthenticated } = useContext(GlobalContext);

  const logout = async () => {
    const url = api.baseUrl + api.v1prefix + api.authPrefix + '/logout';
    const token = await getToken();
    const user = await getLoggedInUser();
    fetchData(url, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }, async (err, data) => {
      showToast(toastTypes.success, 'You logged out successfully', `See you soon ${user.first_name} ${user.last_name} 👋`);
      setIsAuthenticated(false);
      await storage.remove('access-token');
      await storage.remove('user');
      navigate('/');
    })
  }

  useEffect(() => {
    (async () => {
      const user = await getLoggedInUser();
      setUserState(user);
    })();
  });

  const styles = StyleSheet.create({
    container: {
      backgroundColor: surfaceColor,
      padding: 15,
      width: '95%',
      marginLeft: 10,
      borderRadius: 10,
      marginBottom: 20,
      marginTop: 15,
    },
    title: {
      color,
      fontSize: fonts.card.title.size,
      fontWeight: fonts.card.title.weight,
      marginBottom: 15
    },
    subtitle: {
      color,
      fontSize: 18,
      marginBottom: 10
    }
  })

  return userState !== null ? (
    <View style={styles.container}>
      <Text style={styles.title}>User info</Text>
      <Text style={styles.subtitle}>Username: {userState.username}</Text>
      <Text style={styles.subtitle}>Full name: {userState.first_name + ' ' + userState.last_name}</Text>
      <Text style={styles.subtitle}>Account type: {userState.role}</Text>
      <PrimaryButton onClick={logout}>Log out</PrimaryButton>
    </View>

  ) : (
    <View style={{width: '100%', height: 500, justifyContent: 'center', alignItems: 'center'}}>
      <LoadingSpinner />
    </View>
  )
}