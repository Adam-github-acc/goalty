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

async function getLocationInfo (latitude, longitude) {
  if (!await requestPermissions()) throw new Error('Location access was denied!');
  const reversedGeocode = await Location.reverseGeocodeAsync({latitude, longitude});
  const { city, region, country } = reversedGeocode[0];
  return { city, region, country };
}

export async function getFormattedLocationInfo (latitude, longitude) {
  const locationInfo = await getLocationInfo(latitude, longitude);
  return [locationInfo.city, locationInfo.region, locationInfo.country].filter((el) => el !== null).join(', ');
}

export function getLocationFromCompany (company) {
  return {
    latitude: Number(company.location.split(',')[0].trim()),
    longitude: Number(company.location.split(',')[1].trim()),
  }
}