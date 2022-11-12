// WHEN CLICKED SHOW CARD WITH COMPANY PIC HEADER, TITLE AND CLOSE AND "SEE" BUTTONS
import { useState } from "react";
import { Marker } from "react-native-maps";

export default function MapMarker ({ latitude, longitude, color, company, onPress }) {

  return (
    <Marker coordinate={{latitude, longitude}} pinColor={color} onPress={() => onPress(company)} />
  );
}