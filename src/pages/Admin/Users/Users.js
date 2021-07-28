import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { getRolApi } from "../../../api/roles";
import { notification } from "antd";

import "./Users.scss";
function User(props) {
  const { location, history } = props;
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [roles, setRoles] = useState(null);

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

  const { page = 1 } = queryString.parse(location.search);
  //const {Search} = Input;

  useEffect(() => {
    const token = getAccessTokenApi();
    getUsersActiveApi(token, true, 10, page).then((response) => {
      setUsersActive(response.users);
    });
    getUsersActiveApi(token, false, 10, page).then((response) => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [reloadUsers, page]);
  var pagina = usersActive;
  return (
    <div className="users">
      <ListUsers
        roles={roles}
        usersActive={usersActive.docs}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
      <Pagination pagina={pagina} location={location} history={history} />
    </div>
  );
}

export default withRouter(User);
