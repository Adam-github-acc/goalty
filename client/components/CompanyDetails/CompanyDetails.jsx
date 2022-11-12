import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import GlobalContext from "../../context/GlobalContext";
import useDarkMode from "../../hooks/useDarkMode";
import { getLoggedInUser } from "../../utils/auth";
import { fonts } from "../../utils/enums";
import Goal from "../GoalList/Goal";
import GoalList from "../GoalList/GoalList";

export default function CompanyDetails () {
  const { companies, setNavTitle, setGoBack } = useContext(GlobalContext);
  const { id } = useParams();
  const { color, surfaceColor } = useDarkMode();
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState({
    name: '',
    company: '',
  });
  const styles = StyleSheet.create({
    title: {
      fontSize: fonts.companyDetails.title.size,
      fontWeight: fonts.companyDetails.title.weight,
      color,
    },
    subtitle: {
      fontSize: fonts.companyDetails.subtitle.size,
      fontWeight: fonts.companyDetails.subtitle.weight,
      paddingLeft: 10,
      color
    },
    content: {
      fontSize: fonts.companyDetails.content.size,
      paddingLeft: 20,
      marginBottom: 15,
      color
    },
    noGoalsPlaceholder: {
      backgroundColor: surfaceColor,
      padding: 15,
      borderRadius: 10,
    }
  });

  useEffect(() => {
    (async () => setUser(await getLoggedInUser()))();
    setGoBack(true);
    setCompany((prev) => {
      const filteredCompany = companies.find(el => el.id === Number(id));
      if (filteredCompany) {
        setNavTitle('Company: ' + filteredCompany.name);
        return filteredCompany;
      }
    });
  }, [companies]);


  return (
    <ScrollView>
      <Text style={styles.title}>Company details</Text>
      <Text style={styles.subtitle}>Name:</Text>
      <Text style={styles.content}>{company.name}</Text>
      <Text style={styles.subtitle}>Description:</Text>
      <Text style={styles.content}>{company.description}</Text>
      <Text style={styles.subtitle}>City:</Text>
      <Text style={styles.content}>Barcelona</Text>
      {
        company.goals !== undefined && company.goals.length !== 0 ? (
          <>
          <Text style={{...styles.subtitle, marginBottom: 10}}>Goals available:</Text>
          <GoalList>
            {company.goals.map(el => <Goal key={el.id} goal={el} isOwn={user !== null
              && user.company !== undefined && company.user_id === user.id}/>)}
          </GoalList>
          </>
        ) : (
          <View style={styles.noGoalsPlaceholder}>
            <Text style={styles.title}>There are no goals for this company (yet)</Text>
          </View>
        )
      }

    </ScrollView>
  );
}