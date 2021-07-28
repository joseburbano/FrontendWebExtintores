import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/PNG/9.1 no-avatar.png";
import {
  UserOutlined,
  AuditOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import {
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setReloadUsers, roles } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      fullname: user.fullname,
      cedula: user.cedula,
      tipo: user.tipo,
      cargo: user.cargo,
      tel: user.tel,
      email: user.email,
      rol: user.rol,
      avatar: user.avatar,
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
  }, [avatar]);

  const updataUser = (e) => {
    e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "las contraseñas tienen que ser iguales",
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (
      !userUpdate.fullname ||
      !userUpdate.cedula ||
      !userUpdate.tel ||
      !userUpdate.email ||
      !userUpdate.tipo ||
      !userUpdate.cargo
    ) {
      notification["error"]({
        message: "el Nombre, cedula, telefono y email son obligatorios",
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
      });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updataUser={updataUser}
        roles={roles}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);
  
  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updataUser, roles } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmit={updataUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre Completo"
              value={userData.fullname}
              onChange={(e) =>
                setUserData({ ...userData, fullname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<AuditOutlined />}
              placeholder="Cedula"
              value={userData.cedula}
              onChange={(e) =>
                setUserData({ ...userData, cedula: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccionar Usuario"
              value={userData.tipo}
              onChange={(e) => setUserData({ ...userData, tipo: e })}
            >
              <Option value="estudiante">Estudiante</Option>
              <Option value="docente">Docente</Option>
              <Option value="administrativo">Administrativo</Option>
              <Option value="directivo">Directivo</Option>
              <Option value="contratistas">Contratista</Option>
              <Option value="visitante">Visitante</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<SkinOutlined />}
              placeholder="Cargo"
              value={userData.cargo}
              onChange={(e) =>
                setUserData({ ...userData, cargo: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Telefono"
              value={userData.tel}
              onChange={(e) =>
                setUserData({ ...userData, tel: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Select
              placeholder="Seleccionar un Rol"
              value={userData.rol}
              onChange={(e) => setUserData({ ...userData, rol: e })}
              defaultValue={userData.rol}
            >
            {roles.map((rol) => (
              <option value={rol.name}>
                {rol.name}
              </option>
            ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          onClick={updataUser}
          htmlType="submit"
          className="btn-submit"
        >
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
