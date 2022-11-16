import { ActivityIndicator } from "react-native";
import { colors } from "../../utils/enums";

export default function LoadingSpinner () {
  return (
    <ActivityIndicator style={{ transform: [{scaleX: 2}, {scaleY: 2}]}} size="large" color={colors.global.primary.default} />
  )
}