import Modal from 'react-native-modal';
import { StyleSheet, View } from 'react-native';
import useDarkMode from '../../hooks/useDarkMode';

export default function UiModal ({ children, isVisible, onBackButtonPress, onBackdropPress }) {
  const { color } = useDarkMode();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 200
    },
  })

  return (
    <Modal 
      isVisible={isVisible} 
      onBackButtonPress={onBackButtonPress}
      backdropColor={color} onBackdropPress={onBackdropPress}>
        <View style={styles.container}>
          { children }
        </View>


    </Modal>
  );
}