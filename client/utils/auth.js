import storage from "./storage";

export async function getToken () {
  return await storage.get('access-token');
}