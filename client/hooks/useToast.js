import { BaseToast, ErrorToast } from "react-native-toast-message"
import useDarkMode from "./useDarkMode"
import { colors } from "../utils/enums";

export default function useToast () {
  const { color, surfaceColor } = useDarkMode();
  const sharedStyles = {
    container: {
      backgroundColor: surfaceColor,
      borderLeftWidth: 0,
      borderBottomWidth: 5,
      borderBottomColor: {success: colors.global.primary.default, error: 'red'}
    },
    text1: {
      fontSize: 18,
      color
    },
    text2: {
      fontSize: 16,
      color
    }
  }

  const config = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{...sharedStyles.container, borderBottomWidth: 5, borderBottomColor: sharedStyles.container.borderBottomColor.success}}
        text1Style={sharedStyles.text1}
        text2Style={sharedStyles.text2}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{...sharedStyles.container, borderBottomColor: sharedStyles.container.borderBottomColor.error}}
        text1Style={sharedStyles.text1}
        text2Style={sharedStyles.text2}
      />
    ),
  }

  return { config }
}