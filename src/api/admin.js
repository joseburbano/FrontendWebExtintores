import { basePath, version } from "./config";
//consultar la cantidad de usuarios
export function getCantidadUsersApi( fecha) {

  const url = `${basePath}/${version}/datos-inicio/${fecha}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
