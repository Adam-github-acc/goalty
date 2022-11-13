import { api } from "./enums";
import storage from "./storage";

export async function getToken () {
  return await storage.get('access-token');
}

export async function getLoggedInUser () {
  const url = api.baseUrl + api.v1prefix + api.authPrefix + '/profile';
  const response = await fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + await getToken(),
    }
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}