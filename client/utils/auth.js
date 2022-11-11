import storage from "./storage";

export async function getToken () {
  return await storage.get('access-token');
}

export async function getLoggedInUser () {
  return JSON.parse(await storage.get('user'));
}