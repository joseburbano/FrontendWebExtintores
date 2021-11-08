import { basePath, version } from "./config";
//consultar a la api

export function getParticipacionApi(limit, page) {
  const url = `${basePath}/${version}/participation/get-participation?pageSize=${limit}&pageNum=${page}`;

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

export function deleteParticipacionApi(token, id) {
  const url = `${basePath}/${version}/participation/delete-participation/${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
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

//peticion para agregar extintor al backend
export function addParticipacionApi(token, normativaData, id) {
  const url = `${basePath}/${version}/participation/add-participation/${id}`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(normativaData),
  };

  return fetch(url, params)
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

//peticion para actuslizar
export function updateParticipacionApi(token, id, data) {
  const url = `${basePath}/${version}/participation/update-participation/${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };
  return fetch(url, params)
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
//peticion para ver el contendio de un url
export function getPartiApi(urlNormativa) {
  const url = `${basePath}/${version}/participation/get-participation/${urlNormativa}`;

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

//consultar todos los registros para el informe en excel
export function getNormativaParticipativaApi(token) {
  const url = `${basePath}/${version}/participation/report-participation`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
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

//traer foto
export function getAvatarParticiApi(avatarName) {
  const url = `${basePath}/${version}/participation/get-photo-participation-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}
//traer foto
export function getAvatarPartiApi(avatarName) {
  const url = `${basePath}/${version}/participation/get-photo-share/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

//traer foto user
export function getAvatarParticiUSerApi(avatarName) {
  const url = `${basePath}/${version}/participation/get-photo-participation-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

//para subir imagnes del frontend al servidor
export function uploadImagenApi(token, avatar, userId) {
  const url = `${basePath}/${version}/participation/upload-photo-participation/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
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
