import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Form from "../components/Form/Form";
import TabMenu from "../components/TabMenu/TabMenu";
import GlobalContext from "../context/GlobalContext";
import { forms, tabMenus } from "../utils/enums";
import useApiCb from './../hooks/useApiCb';
import { api } from "../utils/enums";
import storage from "../utils/storage";
import { useNavigate } from 'react-router-native';
import { getCurrentLocation } from "../utils/location";
import UserInfo from "../components/UserInfo/UserInfo";

export default function MyAccount () {
  const { isAuthenticated, setIsAuthenticated, refresh, setRefresh } = useContext(GlobalContext);
  const [tab, setTab] = useState('Login');
  const { isLoading, fetchData } = useApiCb();
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    if (tab === 'Login') {
      const url = api.baseUrl + api.v1prefix + api.authPrefix + '/login';
      const { username, password } = values;
      const body = JSON.stringify({ username, password });
      fetchData(url, {
        body,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }, (async (err, data) => {
        if (err) {
          console.log('There was an error during the request');
          return;
        }
        await storage.set('user', JSON.stringify(data.data));
        await storage.set('access-token', data.token);
        setIsAuthenticated(true);
      }));
    } else if (tab === 'Register_as_customer') {
      const url = api.baseUrl + api.v1prefix + api.userPrefix;
      console.log(url);
      const { username, password, first_name, last_name } = values;
      const body = JSON.stringify({ username, password, first_name, last_name, role: 'customer' });
      fetchData(url, {
        body,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }, async (err, data) => {
        await storage.set('user', JSON.stringify(data.data));
        await storage.set('access-token', data.token);
        setIsAuthenticated(true);
      })
    } else {
      try {
        const location = await getCurrentLocation();
        const url = api.baseUrl + api.v1prefix + api.userPrefix;
        console.log(url);
        const { username, password, first_name, last_name } = values;
        const { company_name: name, company_description: description } = values;
        const body = JSON.stringify({ username, password, first_name, last_name, role: 'company' });
        fetchData(url, {
          body,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }, async (err, data) => {
          if (data && data.status === 201) {
            await storage.set('user', JSON.stringify(data.data));
            await storage.set('access-token', data.token);
            setIsAuthenticated(true);
  
            const url = api.baseUrl + api.v1prefix + api.companyPrefix;
            const body = JSON.stringify({ name, description, location: `${location.latitude}, ${location.longitude}`, user_id: data.data.id });
  
            fetchData(url, {
              body,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            }, (err, data) => {
              console.log(data);
              setRefresh(!refresh);
            })
          }
        })
      } catch (err) {
        console.log('location permission denied!');
      }
      
    }
  }

  const renderForm = {
    Login: <Form title="Login" inputs={forms.login} buttonText="Login" onSubmit={submitHandler} />,
    Register_as_customer: <Form title="Register as customer" inputs={forms.register.customer} buttonText="Register" onSubmit={submitHandler} />,
    Register_as_company: <Form title="Register as company" inputs={forms.register.company} buttonText="Register" onSubmit={submitHandler} />,
  }

  const styles = StyleSheet.create({
    
  })

  return (
    <>
    {
      isAuthenticated ? (
        <UserInfo />
      ) : (
        <>
          <TabMenu items={tabMenus.myAccount} onChange={setTab} />
          <ScrollView>
            {
              renderForm[tab]
            }
          </ScrollView>
        </>
      )
    }
    </>
  );
}