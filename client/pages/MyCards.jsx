import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigate } from "react-router-native";
import Goal from "../components/GoalList/Goal";
import GoalList from "../components/GoalList/GoalList";
import PrimaryButton from "../components/ui/PrimaryButton";
import GlobalContext from "../context/GlobalContext";
import { getLoggedInUser } from "../utils/auth";

export default function MyCards () {
  const [user, setUser] = useState(null);
  const { setNavTitle, setGoBack } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => setUser(await getLoggedInUser() || null))();
    setNavTitle('Cards');
    setGoBack(false);
  }, [])

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    separator: {
      height: 25,
    }
  })

  return (
    <View style={styles.container}>
      {user !== null && ((user.role === 'company' && user.company.goals.length !== 0)
      || (user.role === 'customer' && user.goals.length !== 0)) ? (
        user.role === 'company' ? (
          <>
          <PrimaryButton onClick={() => navigate('/creategoal/' + user.company.id)}>Create loyalty card</PrimaryButton>
          <View style={styles.separator}></View>
          <GoalList>
            {user.company.goals.map((el) => (
              <Goal
                key={el.id}
                goal={el}
                isOwn={true}
                companyName={user.company.name}
              />
            ))}
          </GoalList>
          </>

        ) : (
          <GoalList>
            {user.goals.map((el) => (
              <Goal
                key={el.id}
                goal={el.goal}
                isOwn={false}
                companyName={el.goal.company.name}
                progress={`${el.progress}/${el.goal.goal_reach_value}`}
              />
            ))}
          </GoalList>
        )
      ) : (
        <Text style={styles.title}>You have no loyalty cards (yet)</Text>
      )
      }
    </View>
  );
}