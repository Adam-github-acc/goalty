import Toast, { BaseToast } from 'react-native-toast-message';


export function showToast(type, title, description, msShown = 3000, onClick = null, autoHide = true) {
  Toast.show({
    type,
    text1: title,
    text2: description,
    topOffset: 10,
    visibilityTime: msShown,
    onPress: onClick,
    autoHide,
    props: {

    }
  })
}