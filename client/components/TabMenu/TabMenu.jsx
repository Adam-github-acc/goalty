import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useTabMenu from "../../hooks/useTabMenu";
import TabMenuItem from "./TabMenuItem";

export default function TabMenu ({items, onChange}) {
  const {selectedValue, setSelectedValue} = useTabMenu(onChange);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 60,
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'relative',
      marginBottom: 10
    }
  });

  useEffect(() => {
    setSelectedValue(items[0]);
  }, [])

  return (
    <View style={styles.container} >
      {
        items.map((el) => <TabMenuItem 
          key={el}
          isFirst={el === items[0]}
          isSelected={selectedValue === el}
          onClick={() => setSelectedValue(el)}>
            {el}
          </TabMenuItem>)
      }
    </View>
  );
}