import { api } from "./enums";

export async function getCompanies () {
  const url = api.baseUrl + api.v1prefix + api.companyPrefix;

  const response = await fetch(url);

  const jsonResponse = await response.json();

  return jsonResponse.data;
}

export async function getCompany (id) {
  const companies = await getCompanies();
  return companies.find(el => el.id === id);
}