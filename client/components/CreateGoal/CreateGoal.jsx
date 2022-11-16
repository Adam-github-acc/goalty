import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import GlobalContext from "../../context/GlobalContext";
import useApiCb from "../../hooks/useApiCb";
import { api, forms, toastTypes } from "../../utils/enums";
import { showToast } from "../../utils/toast";
import Form from "../Form/Form";

export default function CreateGoal () {
  const { companyId } = useParams();
  const { fetchData, isLoading } = useApiCb();
  const { setNavTitle, setGoBack } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    setNavTitle('Create loyalty card');
    setGoBack(true);
  }, [])

  const handleSubmit = (values) => {
    const body = JSON.stringify({...values, company_id: companyId});
    const url = api.baseUrl + api.v1prefix + api.goalPrefix;

    fetchData(url, {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (err, data) => {
      if (!err && data.status === 201) {
        console.log('created!');
        showToast(toastTypes.success, 'Congratulations!', `Your card ${data.data.name} is ready for use!`);
        navigate(-1);
      } else {
        showToast(toastTypes.error, 'Invalid input', 'Check for red form fields')
      }
    })
  }

  return (
    <Form isButtonDisabled={isLoading} inputs={forms.createGoal} buttonText="Create loyalty card" onSubmit={handleSubmit} />
  );
}