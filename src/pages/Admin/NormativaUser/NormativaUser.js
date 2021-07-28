import React, { useState, useEffect, useCallback } from "react";
import jwt from "jwt-decode";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification,
  Avatar,
  Radio,
} from "antd";
import { useDropzone } from "react-dropzone";
import { getAccessTokenApi } from "../../../api/auth";
import {
  addParticipacionApi,
  uploadImagenApi,
} from "../../../api/participacion";
import moment from "moment";
import NoAvatar from "../../../assets/img/JPG/noNormativa.jpg";
import { LinkOutlined, SmileOutlined } from "@ant-design/icons";
import "./NormativaUser.scss";

const { TextArea } = Input;
export default function NormativaUser() {
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [normativaData, setNormativaData] = useState({});

  //comprovamos los datos esten llenos
  const processNormativa = (e) => {
    e.preventDefault();

    const {
      claseRiesgoLocativo,
      condicionInsegura,
      lugar,
      descripcionNovedad,
      motivoRazon,
      medidasImplementar,
      fecha,
    } = normativaData;

    if (
      !claseRiesgoLocativo ||
      !condicionInsegura ||
      !lugar ||
      !descripcionNovedad ||
      !motivoRazon ||
      !medidasImplementar ||
      !fecha
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      normativaData.fechaUpdate = new moment().toISOString();
      addNormativa();
    }
  };

  const addNormativa = () => {
    try {
      var usuario = localStorage.getItem("accessToken");
      var use = jwt(usuario);
    } catch (error) {
      notification["error"]({
        message: "Error al extraer datos de localStored.",
      });
    }
    const token = getAccessTokenApi();

    addParticipacionApi(token, normativaData, use.id)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        setNormativaData({});
        subirfoto(response.iduser);
        window.location.href = "/admin/coviduser";
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });

    function subirfoto(gh) {
      const token = getAccessTokenApi();
      if (avatarUrl) {
        uploadImagenApi(token, avatar.file, gh).then((response) => {
          notification["success"]({
            message: response.avatarName,
          });
        });
      } else {
        notification["success"]({
          message: "Actualizacion Correcta.",
        });
      }
    }
  };
  return (
    <div className="normativa">
      <Imagen
        avatar={avatar}
        setAvatar={setAvatar}
        normativaData={normativaData}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
      />
      <AddEditForm
        normativaData={normativaData}
        setNormativaData={setNormativaData}
        processNormativa={processNormativa}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
      />
    </div>
  );
}

function Imagen(props) {
  const { avatar, setAvatar, setAvatarUrl, avatarUrl } = props;
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
    <div className="avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function AddEditForm(props) {
  const { Option } = Select;
  const { normativaData, setNormativaData, processNormativa } = props;

  const options = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  return (
    <Form
      className="form-add"
      onSubmit={processNormativa}
      style={{ marginTop: "10px" }}
    >
      <Row gutter={24} className="datos">
        <Col span={24}>
          <Select
            style={{ width: "100%" }}
            placeholder="Tipo de evento"
            onChange={(e) =>
              setNormativaData({
                ...normativaData,
                claseRiesgoLocativo: e,
              })
            }
            value={normativaData.claseRiesgoLocativo}
          >
            <Option value="Incidente">Incidente</Option>
            <Option value="Emergencia">Emergencia</Option>
            <Option value="Comportamental">Comportamental</Option>
            <Option value="Medio Ambiente">Medio Ambiente</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={24} className="dato1">
        <Col span={24}>
          <Select
            style={{ width: "100%" }}
            placeholder="Clasificacion de la falla"
            onChange={(e) =>
              setNormativaData({
                ...normativaData,
                condicionInsegura: e,
              })
            }
            value={normativaData.condicionInsegura}
          >
            <Option value="Salud Enfermedad">Salud Enfermedad</Option>
            <Option value="Lesiones accidentes laborales">
              Lesiones, accidentes laborales
            </Option>
            <Option value="Productos procesos">Productos, procesos</Option>
            <Option value="Activos">Activos</Option>
            <Option value="Equipos y herramientas">
              Equipos y Herramientas
            </Option>
            <Option value="bienes a terceros">Bienes a terceros</Option>
            <Option value="vehiculos">Vehiculos</Option>
            <Option value="contaminacion">Contaminacion</Option>
            <Option value="comunidad">Comunidad</Option>
            <Option value="tiempo">Tiempo</Option>
            <Option value="informacion documentacion">
              Informacion, documentación
            </Option>
            <Option value="imagen de la institucion ">
              Imagen de la institucion
            </Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={24} className="dato2">
        <Col span={12}>
          <h3>Requiere Primeros Auxilios</h3>
          <Radio.Group
            options={options}
            onChange={(e) =>
              setNormativaData({
                ...normativaData,
                primerosAuxilios: e.target.value,
              })
            }
            value={normativaData.primerosAuxilios}
          ></Radio.Group>
        </Col>
        <Col span={12}>
          <h3>Tiene Relacion con el trabajo</h3>
          <Radio.Group
            options={options}
            onChange={(e) =>
              setNormativaData({
                ...normativaData,
                relacionTrabajo: e.target.value,
              })
            }
            value={normativaData.relacionTrabajo}
          ></Radio.Group>
        </Col>
      </Row>
      <Row gutter={24} className="dato2">
        <Col span={12}>
          <Input
            style={{ width: "100%" }}
            placeholder="Lugar donde se presente la novedad"
            value={normativaData.lugar}
            onChange={(e) =>
              setNormativaData({
                ...normativaData,
                lugar: e.target.value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <DatePicker
            style={{ marginTop: "10px" }, { width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            prefix={<LinkOutlined />}
            placeholder="Fecha"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            value={normativaData.fecha && moment(normativaData.fecha)}
            onChange={(e, value) =>
              setNormativaData({
                ...normativaData,
                fecha: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
              })
            }
          />
        </Col>
      </Row>
      <Row gutter={24} className="fechas">
        <Col span={24}>
          <TextArea
            maxLength={500}
            style={{ marginTop: "10px" }}
            placeholder="Descripción de la novedad"
            value={normativaData.descripcionNovedad}
            onChange={(e) =>
              setNormativaData({
                ...normativaData,
                descripcionNovedad: e.target.value,
              })
            }
          />
        </Col>
      </Row>
      <Row gutter={24} className="fechas">
        <Col span={24}>
          <TextArea
            style={{ marginTop: "10px" }}
            maxLength={500}
            placeholder="Describir que recomienda"
            value={normativaData.motivoRazon}
            onChange={(e) =>
              setNormativaData({
                ...normativaData,
                motivoRazon: e.target.value,
              })
            }
          />
        </Col>
      </Row>
      <Row gutter={24} className="fechas">
        <Col span={24}>
          <TextArea
            style={{ marginTop: "10px" }}
            maxLength={500}
            placeholder="Que medida se pueden tomar "
            value={normativaData.medidasImplementar}
            onChange={(e) =>
              setNormativaData({
                ...normativaData,
                medidasImplementar: e.target.value,
              })
            }
          />
        </Col>
      </Row>

      <Button
        type="primary"
        htmlType="submit"
        className="boton"
        onClick={processNormativa}
      >
        Crear Normativa
      </Button>
    </Form>
  );
}
