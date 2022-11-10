import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CompanyDashboard from "../components/Dashboard/CompanyDashboard";
import useDarkMode from "../hooks/useDarkMode";
import { getToken } from "../utils/auth";
import { api, colors, fonts } from "../utils/enums";
import useApiCb from './../hooks/useApiCb';
import location from "../utils/location";
import UiCard from "../components/ui/UiCard";
import array from "../utils/array";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-native";

export default function Home () {
  const { color } = useDarkMode();
  const { fetchData, isLoading } = useApiCb();
  const [user, setUser] = useState(null);
  const { companies, setNavTitle } = useContext(GlobalContext);
  const [featuredCompany, setFeaturedCompany] = useState(null);
  const navigate = useNavigate();

  const redirToCards = () => {
    setNavTitle('Cards');
    navigate('/mycards');
  }

  const redirToExplore = () => {
    setNavTitle('Explore');
    navigate('/explore');
  }

  useEffect(() => {
    (async () => {
      // console.log(await location.getCity(55.755826, 37.6172999))
      const token = await getToken();
      if (!token) return;
      const url = api.baseUrl + api.v1prefix + api.authPrefix + '/profile';

      fetchData(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }, (err, data) => {
        if (data) setUser(data.data);
      });
    })();
  }, [])

  useEffect(() => {
    companies.length !== 0 && setFeaturedCompany(array.getRandomItem(companies));
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
  })

  return (
    <ScrollView>
      <Text style={styles.title}>
        Welcome{user !== null && ` ${user.first_name} ${user.last_name}`}!
      </Text>
      <Text style={styles.title}>
        Check out our featured company:
      </Text>
      {featuredCompany !== null && <UiCard title={featuredCompany.name} description="Lorem ipsum" buttonText="VISIT" />}
      <Text style={styles.title}>
        Or check all the companies:
      </Text>
      {companies.length !== 0 && companies
        .map(el => <UiCard key={el.id} title={el.name} description="Lorem ipsum" buttonText="VISIT" />)}
      <Text style={styles.title}>
        Still don't know what to do? Check the cards page <Text style={styles.link} onPress={redirToCards}>here</Text>
      </Text>

      <Text style={styles.title}>
        You can also see <Text style={styles.link} onPress={redirToExplore}>what companies are close to you</Text>
      </Text>
    </ScrollView>
  );
}