import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import useDarkMode from "../hooks/useDarkMode";
import { colors, fonts } from "../utils/enums";
import useApiCb from './../hooks/useApiCb';
import UiCard from "../components/ui/UiCard";
import array from "../utils/array";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-native";
import { getLoggedInUser } from "../utils/auth";
import { getLocationFromCompany } from "../utils/location";
import { getCompanies } from "../utils/apiService";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function Home () {
  const { color } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { setNavTitle, setGoBack } = useContext(GlobalContext);
  const [featuredCompany, setFeaturedCompany] = useState(null);
  const navigate = useNavigate();
  const [ companies, setCompanies ] = useState(undefined);

  const redirToCards = () => {
    setNavTitle('Cards');
    navigate('/mycards');
  }

  const redirToExplore = () => {
    setNavTitle('Explore');
    navigate('/explore');
  }

  const redirToRegister = () => {
    setNavTitle('Account');
    navigate('myaccount');
  }

  useEffect(() => {
    setNavTitle('Home');
    setGoBack(false);
    (async () => {
      setIsLoading(true);
      setCompanies(await getCompanies());
      setUser(await getLoggedInUser() || null);
      setIsLoading(false);
    })();
  }, [])

  useEffect(() => {
    (companies !== undefined && companies.length !== 0) && setFeaturedCompany(array.getRandomItem(companies));
  }, [companies]);

  const styles = StyleSheet.create({
    title: {
      fontSize: fonts.welcomeText.size,
      color,
      fontWeight: fonts.welcomeText.weight,
      marginBottom: 10
    },
    allCompanies: {
      flexDirection: 'column',
      marginBottom: 10
    },
    link: {
      color: colors.global.primary.default
    }
  });

  const render = () => {
    if (isLoading) return (
      <View style={{width: '100%', height: 500, justifyContent: 'center', alignItems: 'center'}}>
        <LoadingSpinner />
      </View>
    );

    if (companies === undefined) return (
        <Text style={styles.title}>
          There are no companies! You can <Text style={styles.link} onPress={redirToRegister}>create one!</Text>
        </Text>
      );

    return (
      <>
      <Text style={styles.title}>
        Welcome{user !== null && ` back ${user.first_name} ${user.last_name}`}!
      </Text>
      <Text style={styles.title}>
        Check out our featured company:
      </Text>
      {featuredCompany !== null && <UiCard
        title={featuredCompany.name}
        description={featuredCompany.description}
        buttonText="VISIT"
        goalCount={featuredCompany.goals.length}
        onClickButton={() => navigate(`/company/${featuredCompany.id}`)}
        latitude={getLocationFromCompany(featuredCompany).latitude}
        longitude={getLocationFromCompany(featuredCompany).longitude}
        />}
      <Text style={styles.title}>
        Or check all the companies:
      </Text>
      {companies.length !== 0 && companies
        .map(el => <UiCard 
          key={el.id}
          title={el.name}
          description={el.description}
          buttonText="VISIT"
          goalCount={el.goals.length}
          onClickButton={() => navigate(`/company/${el.id}`)}
          latitude={getLocationFromCompany(el).latitude}
          longitude={getLocationFromCompany(el).longitude}
          />)}
      <Text style={styles.title}>
        Still don't know what to do? Check the cards page <Text style={styles.link} onPress={redirToCards}>here</Text>
      </Text>

      <Text style={styles.title}>
        You can also see <Text style={styles.link} onPress={redirToExplore}>what companies are close to you</Text>
      </Text>
      </>
    )
  }

  return (
    <ScrollView>
      {render()}
    </ScrollView>
  );
}