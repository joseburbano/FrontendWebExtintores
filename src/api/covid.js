import { basePath, version } from "./config";
//consultar a la api

export function getCovidApi(token, page, limit) {
  const url = `${basePath}/${version}/covid/get-covids?pageNum=${page}&pageSize=${limit}`;

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

//buscar en covid
export function getBusquedaCovidApi(token, limit, page) {
  const url = `${basePath}/${version}/covid/get-covids-buscar?limit=${limit}&page=${page}`;

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

export function deleteCovidApi(token, id) {
  const url = `${basePath}/${version}/covid/delete-covid/${id}`;

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

//peticion para agregar registro de covid al backend
export function addAgregarCovidApi(token, covid, id) {
  const url = `${basePath}/${version}/covid/add-covid/${id}`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(covid),
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

//peticion para actuslizar datos de covid
export function updatecovidApi(token, id, data) {
  const url = `${basePath}/${version}/covid/update-covid/${id}`;

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
export function getInfoConvidApi(urlCovid) {
  const url = `${basePath}/${version}/covid/get-covid/${urlCovid}`;

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

//consultar todos los registros de Extintores
export function getCovidInformeApi(token) {
  const url = `${basePath}/${version}/covid/report-covid`;

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

export function getAvatarCovidApi(avatarName) {
  const url = `${basePath}/${version}/covid/get-avatar-covids/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}
