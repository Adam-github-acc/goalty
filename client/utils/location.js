import * as Location from 'expo-location';

async function requestPermissions () {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentLocation () {
  if (!await requestPermissions()) throw new Error('Location access was denied!');
  const location = await Location.getCurrentPositionAsync();

  if (location !== null) return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}