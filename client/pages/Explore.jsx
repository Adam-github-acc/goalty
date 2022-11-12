import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import useDarkMode from "../hooks/useDarkMode";
import MapMarker from "../components/Maps/MapMarker";
import UiModal from "../components/ui/UiModal";
import { getCurrentLocation, getLocationFromCompany } from "../utils/location";
import GlobalContext from "../context/GlobalContext";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { useNavigate } from "react-router-native";

export default function Explore () {
  const { mapStyle, color, backgroundColor, secondaryText } = useDarkMode();
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { companies, setNavTitle, setGoBack } = useContext(GlobalContext);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setNavTitle('Explore');
    setGoBack(false);

    (async () => {
      try {
        setLocation(await getCurrentLocation());
      } catch (err) {
        console.log('Location permission denied!');
      }
    })();
  }, []);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    modalContent: {
      backgroundColor,
      padding: 20,
      paddingHorizontal: 50,
      borderRadius: 10
    },
    modalTitle: {
      textAlign: 'center',
      color,
      fontSize: 20,
      marginBottom: 10
    },
    modalDescription: {
      textAlign: 'center',
      color: secondaryText,
      fontSize: 20,
      marginBottom: 25,
    },
    modalTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  });

  const toggleModal = (company) => {
    if (!company.id) {
      setIsModalVisible(!isModalVisible);
      return;
    }
    setModalContent((prev) => {
      setIsModalVisible(!isModalVisible)
      return (
        <>
        <Text style={styles.modalTitle}>Company: {company.name}</Text>
        <Text style={styles.modalDescription}>{company.description}</Text>
        <PrimaryButton onClick={() => navigate('/company/' + company.id)}>Visit</PrimaryButton>
        </>
      )
    });
  }

  return (
  <View style={styles.container}>
    {location !== null &&
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      customMapStyle={mapStyle}
      showsUserLocation={true}
    >
      {companies !== undefined && companies.length !== 0 && companies.map((el) => 
        (
          <MapMarker
            key={el.id}
            latitude={getLocationFromCompany(el).latitude}
            longitude={getLocationFromCompany(el).longitude}
            color="green"
            onPress={toggleModal}
            company={el}
          />
        )
      )}
    </MapView>
    }
    <UiModal isVisible={isModalVisible} onBackButtonPress={toggleModal} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          {modalContent}
        </View>
    </UiModal>
  </View>
    
  );
}