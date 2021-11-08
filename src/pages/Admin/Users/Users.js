import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { getRolApi } from "../../../api/roles";
import { notification, Spin } from "antd";

import "./Users.scss";
function User(props) {
  const { location, history } = props;
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [roles, setRoles] = useState(null);
  const [dataPaginateActive, setDataPaginateActive] = useState(null);
  const [dataPaginateInactive, setDataPaginateInactive] = useState(null);

  useEffect(() => {
    const as = getAccessTokenApi();
    getRolApi(as)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setRoles(response.roles);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  }, []);

  const { pageNum = 1 } = queryString.parse(location.search);
  //const {Search} = Input;

  useEffect(() => {
    const token = getAccessTokenApi();
    getUsersActiveApi(token, true, 10, pageNum).then((response) => {
      setUsersActive(response.users);
      setDataPaginateActive(response.total);
    });

    getUsersActiveApi(token, false, 10, pageNum).then((response) => {
      setUsersInactive(response.users);
      setDataPaginateInactive(response.total);
    });
    setReloadUsers(false);
  }, [reloadUsers, pageNum]);

  if (
    !dataPaginateActive ||
    !dataPaginateInactive ||
    !usersActive ||
    !usersInactive
  ) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <div className="users">
      <ListUsers
        roles={roles}
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
        dataPaginateActive={dataPaginateActive}
        dataPaginateInactive={dataPaginateInactive}
        location={location}
        history={history}
      />
    </div>
  );
}

export default withRouter(User);
