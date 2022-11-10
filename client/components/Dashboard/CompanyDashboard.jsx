import GlobalContext from './../../context/GlobalContext';
import { View, Text } from 'react-native';
import { useContext } from 'react';
import array from '../../utils/array';

export default function CompanyDashboard ({ user }) {
  const { companies } = useContext(GlobalContext);

  return (
    <View>
      {companies.length !== 0 && <Text>{array.getRandomItem(companies).name}</Text>}
    </View>
  )
}