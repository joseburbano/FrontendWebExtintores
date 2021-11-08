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
} from "antd";
import { LinkOutlined, SmileOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  addExtintorApi,
  updateExtintorApi,
  uploadImagenApi,
} from "../../../../api/extintor";
import NoAvatar from "../../../../assets/img/PNG/no-extintor.png";
import "./AddEditExtintorForm.scss";

//funcion principal
export default function AddEditExtintorForm(props) {
  const { setIsVisibleModal, setReloadExtintor, extintor } = props;
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [extintorData, setExtintorData] = useState({});
  useEffect(() => {
    if (extintor) {
      setExtintorData(extintor);
    } else {
      setExtintorData({});
    }
  }, [extintor]);
  //comprovamos los datos esten llenos
  const processExtintor = (e) => {
    e.preventDefault();

    const {
      placa,
      tipoExt,
      tamanio,
      sede,
      ubicacionBloque,
      ubicacionPiso,
      danoFisico,
      estadoPlaca,
      estadoSello,
      fechaRecarga,
      fechaVencimiento,
      estado,
      observaciones,
    } = extintorData;

    if (
      !placa ||
      !tipoExt ||
      !tamanio ||
      !sede ||
      !ubicacionBloque ||
      !ubicacionPiso ||
      !danoFisico ||
      !fechaRecarga ||
      !estadoPlaca ||
      !estadoSello ||
      !fechaVencimiento ||
      !observaciones ||
      !estado
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (!extintor) {
        extintorData.fechaUpdate = new moment().toISOString();
        addExtin();
      } else {
        extintorData.fechaUpdate = new moment().toISOString();
        updateExtintor();
      }
    }
  };

  //creamos una nueva funcion crear extintor
  const addExtin = () => {
    try {
      var usuario = localStorage.getItem("accessToken");
      var use = jwt(usuario);
    } catch (error) {
      console.log("Error al extraer datos de localStored");
    }

    const token = getAccessTokenApi();

    var {
      user: { id },
    } = use;

    addExtintorApi(token, extintorData, id)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        setIsVisibleModal(false);
        setReloadExtintor(true);
        setExtintorData({});
        subirfoto(response.iduser);
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  function subirfoto(gh) {
    const token = getAccessTokenApi();
    if (avatarUrl) {
      uploadImagenApi(token, avatar.file, gh).then((response) => {
        notification["success"]({
          message: response.avatarName,
        });
      });
    } else {
      notification["error"]({
        message: "Error del servidor.",
      });
    }
  }

  //funcion para actualizar extintor
  const updateExtintor = () => {
    const token = getAccessTokenApi();
    updateExtintorApi(token, extintorData._id, extintorData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        setIsVisibleModal(false);
        setReloadExtintor(true);
        subirfotoUpda(extintorData._id);
        setExtintorData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  function subirfotoUpda(ghf) {
    const token = getAccessTokenApi();
    if (avatarUrl) {
      uploadImagenApi(token, avatar.file, ghf).then((response) => {
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

  return (
    <div className="extintor">
      <Imagen
        avatar={avatar}
        setAvatar={setAvatar}
        extintorData={extintorData}
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
      />
      <AddEditForm
        extintorData={extintorData}
        setExtintorData={setExtintorData}
        extintor={extintor}
        processExtintor={processExtintor}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar],
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

function AddEditForm(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const { extintorData, setExtintorData, extintor, processExtintor } = props;
  return (
    <Form className="form-add" onSubmit={processExtintor}>
      <Row gutter={24} className="datos">
        <Col span={8}>
          <Input
            style={{ width: "100%" }}
            placeholder="Numero de Placa"
            value={extintorData.placa}
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                placa: e.target.value,
              })
            }
          />
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Tipo de Extintor"
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                tipoExt: e,
              })
            }
            value={extintorData.tipoExt}
          >
            <Option value="abc">ABC</Option>
            <Option value="agua">Agua</Option>
            <Option value="co2">CO2</Option>
            <Option value="solkaflan">Solkaflan</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Tamaño Extintor"
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                tamanio: e,
              })
            }
            value={extintorData.tamanio}
          >
            <Option value="5 libras">5 Libras</Option>
            <Option value="10 libras">10 Libras</Option>
            <Option value="20 libras">20 Libras</Option>
            <Option value="30 libras">30 Libras</Option>
            <Option value="2,5 galones">2,5 Galones</Option>
            <Option value="3700 gramos">3700 Gramos</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={24} className="dato1">
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Sede Ubicación"
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                sede: e,
              })
            }
            value={extintorData.sede}
          >
            <Option value="prado alto">Prado Alto</Option>
            <Option value="quirinal">Quirinal</Option>
            <Option value="pitalito">Pitalito</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Ubicación Bloque"
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                ubicacionBloque: e,
              })
            }
            value={extintorData.ubicacionBloque}
          >
            <Option value="a">A</Option>
            <Option value="b">B</Option>
            <Option value="c">C</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Ubicación Piso"
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                ubicacionPiso: e,
              })
            }
            value={extintorData.ubicacionPiso}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Estado de los sellos"
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                estadoSello: e,
              })
            }
            value={extintorData.estadoSello}
          >
            <Option value="buen estado">Buen estado</Option>
            <Option value="mal estado">Mal estado</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Estado de la placa"
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                estadoPlaca: e,
              })
            }
            value={extintorData.estadoPlaca}
          >
            <Option value="buen estado">Buen estado</Option>
            <Option value="mal estado">Mal estado</Option>
            <Option value="mal estado, despegada">Mal estado, despegada</Option>
            <Option value="no tiene placa">No tiene placa</Option>
            <Option value="no tiene placa, nuevo">No tiene placa, nuevo</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="Estado"
            onChange={(e) =>
              setExtintorData({
                ...extintorData,
                estado: e,
              })
            }
            value={extintorData.estado}
          >
            <Option value="bueno">Bueno</Option>
            <Option value="medio">Medio</Option>
            <Option value="malo">Malo</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={24} className="fechas">
        <Col span={12}>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            prefix={<LinkOutlined />}
            placeholder="Fecha de recarga"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            value={
              extintorData.fechaRecarga && moment(extintorData.fechaRecarga)
            }
            onChange={(e, value) =>
              setExtintorData({
                ...extintorData,
                fechaRecarga: moment(
                  value,
                  "DD/MM/YYYY HH:mm:ss",
                ).toISOString(),
              })
            }
          />
        </Col>
        <Col span={12}>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            prefix={<LinkOutlined />}
            placeholder="Fecha de vencimiento"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            value={
              extintorData.fechaVencimiento &&
              moment(extintorData.fechaVencimiento)
            }
            onChange={(e, value) =>
              setExtintorData({
                ...extintorData,
                fechaVencimiento: moment(
                  value,
                  "DD/MM/YYYY HH:mm:ss",
                ).toISOString(),
              })
            }
          />
        </Col>
      </Row>
      <div className="titulo">
        <h3>DAÑOS FISICOS DEL EXTINTOR</h3>
      </div>
      <div className="escrito">
        <TextArea
          maxLength={1000}
          style={{ marginTop: "10px" }}
          placeholder="Daños fisicos del extintor"
          value={extintorData.danoFisico}
          onChange={(e) =>
            setExtintorData({
              ...extintorData,
              danoFisico: e.target.value,
            })
          }
        />
        <h3>OBSERVACIONES</h3>
      </div>
      <div className="escrito">
        <TextArea
          maxLength={1000}
          style={{ marginTop: "10px" }}
          placeholder="Observaciones"
          value={extintorData.observaciones}
          onChange={(e) =>
            setExtintorData({
              ...extintorData,
              observaciones: e.target.value,
            })
          }
        />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="boton"
        onClick={processExtintor}
      >
        {extintor ? "Actualizar Extintor" : "Crear Extintor"}
      </Button>
    </Form>
  );
}
