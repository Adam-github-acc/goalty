import Navbar from '../Navbar/Navbar';
import Divider from './../ui/Divider';
import Home from '../../pages/Home';
import MyCards from './../../pages/MyCards'
import Bottombar from './../Bottombar/Bottombar';
import BottombarItem from './../Bottombar/BottombarItem';
import Explore from './../../pages/Explore';
import MyAccount from './../../pages/MyAccount';
import { Route, Routes } from 'react-router-native';
import { StyleSheet, View, ScrollView } from 'react-native';
import useDarkMode from '../../hooks/useDarkMode';
import CompanyDetails from '../CompanyDetails/CompanyDetails';
import AddGoal from '../AddGoal/AddGoal';
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import CreateGoal from '../CreateGoal/CreateGoal';
import Toast from 'react-native-toast-message';
import useToast from '../../hooks/useToast';

export default function Layout () {
  const { backgroundColor, color } = useDarkMode();
  const { navTitle } = useContext(GlobalContext);
  const { config } = useToast();

  const styles = StyleSheet.create({
    layout: {
      backgroundColor,
      height: '100%',
    },
    pages: {
      padding: navTitle === 'Explore' ? 0 : 15,
      paddingTop: navTitle === 'Account' || navTitle === 'Explore' ? 0 : 15,
      paddingBottom: 0
    },
    navbar: {
      height: '10%',
    },
    content: {
      height: '80%',
    },
    bottombar: {
      height: '10%',
    },
  });

  return (
    <>
      <View style={styles.layout}>
        <View style={styles.navbar}>
          <Navbar />
        </View>
        <Divider />
        <ScrollView style={styles.pages} contentContainerStyle={{flex: 1}}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/mycards" element={<MyCards />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route path="/addgoal/:goal" element={<AddGoal />} />
            <Route path="/creategoal/:companyId" element={<CreateGoal />} />
          </Routes>
        </ScrollView>
        <Divider />
        <Bottombar>
          <BottombarItem icon="home" text="Home" link="/" />
          <BottombarItem icon="redeem" text="Cards" link="mycards" />
          <BottombarItem icon="explore" text="Explore" link="explore" />
          <BottombarItem
            icon="person"
            text="Account"
            link="myaccount"
          />
        </Bottombar>
      </View>
      <Toast config={config} />
    </>
  );
}