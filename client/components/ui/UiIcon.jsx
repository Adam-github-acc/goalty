import { useEffect } from 'react';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MUIIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';


export default function UiIcon ({ name, type, color, size, solid, style }) {
  const iconTypes = {
    fa5: FA5Icon,
    material: MUIIcon,
    feather: FeatherIcon
  };

  const Icon = iconTypes[type];

  return (
    <Icon style={style} name={name} color={color} size={size} solid={solid ? true : false}/>
  )
}