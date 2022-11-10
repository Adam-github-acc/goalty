import { StyleSheet, View, Text, TextInput } from 'react-native';
import useInput from './../../hooks/useInput';
import { colors } from '../../utils/enums';
import useDarkMode from '../../hooks/useDarkMode';

export default function Input ({label, placeholder, isPassword, checkValue, checkTime}) {
    const { valueInput, isValueValid, setValueInput,
      isFocused, handleBlur, handleFocus } = useInput(checkValue, checkTime);
    const { color, inputBg, placeholderColor } = useDarkMode();
    
    const styles = StyleSheet.create({
      container: {
        display: 'flex',
        flexDirection: 'column'
      },
      label: {
        fontSize: 18,
        color
      },
      input: {
        backgroundColor: inputBg,
        color,
        borderBottomWidth: 2,
        borderBottomColor: isFocused ? colors.global.primary.default : color,
        borderRadius: 5,
        padding: 5
      }
    });
    

    const handleChange = (value => setValueInput(value));

    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {label}
        </Text>
        <TextInput placeholderTextColor={placeholderColor} placeholder={placeholder} style={styles.input}
          onFocus={handleFocus} onBlur={handleBlur} value={valueInput}
          onChangeText={(ev) => handleChange(ev.target.value)} />
      </View>
    );
}