import React, { useState } from "react";
import {
  Row,
  Form,
  Input,
  Button,
  Select,
  notification,
  Checkbox,
  Radio,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import jwt from "jwt-decode";
import moment from "moment";
import { getAccessTokenApi } from "../../../api/auth";
import { addAgregarCovidApi } from "../../../api/covid";
import "./EditCovid.scss";

export default function CovidUser() {
  const [covidData, setCovidData] = useState({});
  const [checkData, setCheckData] = useState({});
  const [acepto, setAcepto] = useState("desabled");

  //comprovamos que los campos esten llenos
  function check(val) {
    let hu = [];
    hu.push(val);
    setCheckData(hu);
  }
  //comprovamos los datos esten llenos
  const processCovid = (e) => {
    e.preventDefault();

    const {
      sede,
      diagnosticoCovid,
      diasCovid,
      sospecha,
      fiebreDias,
      respiratoriosDias,
      sospechosoContagiado,
      sospechosoFamiliar,
      temperatura,
      fechaUpdate,
    } = covidData;

    if (
      !sede ||
      !diagnosticoCovid ||
      !diasCovid ||
      !sospecha ||
      !fiebreDias ||
      !respiratoriosDias ||
      !sospechosoContagiado ||
      !sospechosoFamiliar ||
      !temperatura
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      covidData.sintomas = JSON.stringify(checkData);
      covidData.fecha = moment(fechaUpdate);
      addCovid();
    }
  };

  //creamos una nueva funcion crear covid
  const addCovid = () => {
    try {
      var usuario = localStorage.getItem("accessToken");
      var use = jwt(usuario);
    } catch (error) {
      notification["error"]({
        message: "Error al extraer datos de localStored.",
      });
    }

    const token = getAccessTokenApi();
    //creamos funcion para crear registro

    addAgregarCovidApi(token, covidData, use.id)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        setCovidData({});
        window.location.href = "/admin/coviduser";
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  return (
    <div className="covid">
      <EditCovidAdd
        covidData={covidData}
        setCovidData={setCovidData}
        processCovid={processCovid}
        setAcepto={setAcepto}
        acepto={acepto}
        check={check}
      />
    </div>
  );
}

function EditCovidAdd(props) {
  const { Option } = Select;
  const {
    covidData,
    setCovidData,
    processCovid,
    check,
    acepto,
    setAcepto,
  } = props;

  const options = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];
  const optionsdos = [
    { label: "Molestias y dolores", value: "Molestias y dolores" },
    { label: "Dolor de garganta", value: "Dolor de garganta" },
    { label: "Diarrea", value: "Diarrea" },
    { label: "Conjuntivitis", value: "Conjuntivitis" },
    { label: "Dolor de cabeza", value: "Dolor de cabeza" },
    {
      label: "Pérdida del sentido del olfato o del gusto",
      value: "Pérdida del sentido del olfato o del gusto",
    },
    {
      label:
        "Erupciones cutáneas o pérdida de color en los dedos de las manos o de los pies",
      value:
        "Erupciones cutáneas o pérdida de color en los dedos de las manos o de los pies",
    },
    { label: "Ninguna de las anteriores", value: "Ninguna de las anteriores" },
  ];

  return (
    <Form className="form-add" onSubmit={processCovid}>
      <h1 style={{ marginLeft: "30%" }}>
        Formulario Registro Sintomas de Covid
      </h1>
      <h3 style={{ textAlign: "justify" }}>
        Autorizo a la Corporación Universitaria del Huila - CORHUILA el
        tratamiento de mis datos personales, incluyendo los de salud que son
        sensibles, con la finalidad de desarrollar acciones de promoción,
        prevención, tratamiento para la gestión de riesgo en salud y/o frente a
        la propagación, contagio y control de COVID-19, acorde con lo normado
        por el Ministerio de Salud y Protección Social y las demás autoridades
        competentes, y para las demás finalidades que se encuentran establecidas
        en la política de privacidad que puede ser consultada en la página web
        https://www.corhuila.edu.co, donde además se encuentran los canales de
        contacto, y la forma de ejercer mis derechos a revocar la autorización,
        conocer, actualizar, rectificar y suprimir mi información.Se entiende
        por tratamiento de datos, la facultad que tendrá la Corporación
        Universitaria del Huila - CORHUILA de almacenar, compartir, utilizar,
        procesar, recolectar, divulgar, transferir, transmitir, información
        relacionada con el estado de salud, en cumplimiento de las disposiciones
        legales.De igual manera informo que, en caso de llegar a ingresar a
        alguna las sedes de la institución durante el periodo de la emergencia
        sanitaria, lo haré de manera voluntaria y bajo mi responsabilidad,
        comprometiéndome a cumplir con los protocolos de bioseguridad
        establecidos por CORHUILA.
        <Checkbox onClick={() => setAcepto(!acepto)}>Acepto</Checkbox>
      </h3>
      <Row gutter={24} className="datos">
        <Select
          style={{ width: "100%" }}
          disabled={acepto}
          placeholder="Sede"
          onChange={(e) =>
            setCovidData({
              ...covidData,
              sede: e,
            })
          }
          value={covidData.sede}
        >
          <Option value="prado alto">Sede Prado Alto</Option>
          <Option value="quirinal">Sede Quirinal</Option>
          <Option value="pitalito">Sede Pitalito</Option>
          <Option value="palermo">Sede Palermo</Option>
          <Option value="rivera">Sede Rivera</Option>
          <Option value="casa">Trabajo en casa</Option>
        </Select>
      </Row>
      <Row gutter={24}>
        <h3>
          ¿Ha tenido alguno de los siguientes enunciados? Ha sido diagnosticado
          con Covid-19?
        </h3>
      </Row>
      <Row>
        <Radio.Group
          disabled={acepto}
          options={options}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              diagnosticoCovid: e.target.value,
            })
          }
          value={covidData.diagnosticoCovid}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h3>
          Si tuvo Covid 19 y esta en proceso de recuperación ¿Cuantos días han
          pasado desde que cumplió su proceso de cuarentena ?
        </h3>
        <Input
          style={{ width: "100%" }}
          disabled={acepto}
          placeholder="Dias con Covid-19"
          value={covidData.diasCovid}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              diasCovid: e.target.value,
            })
          }
        />
      </Row>
      <Row gutter={24} className="dato1">
        <h3>
          Ha tenido alguna sospecha de estar contagiado o con sintomatologia de
          Covid-19?
        </h3>
      </Row>
      <Row>
        <Radio.Group
          disabled={acepto}
          options={options}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              sospecha: e.target.value,
            })
          }
          value={covidData.sospecha}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h3>Tiene o ha tenido fiebre los últimos 14 días?</h3>
      </Row>

      <Radio.Group
        disabled={acepto}
        options={options}
        onChange={(e) =>
          setCovidData({
            ...covidData,
            fiebreDias: e.target.value,
          })
        }
        value={covidData.fiebreDias}
      ></Radio.Group>
      <Row gutter={24}>
        <h3>Ha tenido problemas respiratorios en los últimos 14 días?</h3>
      </Row>
      <Row>
        <Radio.Group
          disabled={acepto}
          options={options}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              respiratoriosDias: e.target.value,
            })
          }
          value={covidData.respiratoriosDias}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h3>
          En los últimos 14 días, usted ha presentado alguno de estos síntomas?
        </h3>
        <Checkbox.Group
          options={optionsdos}
          disabled={acepto}
          defaultValue={[""]}
          onChange={check}
        >
          Molestias y dolores
        </Checkbox.Group>
      </Row>
      <Row gutter={24}>
      </Row>
      <Row gutter={24}>
        <h3>
          En los últimos 14 días, usted o algún miembro de su grupo familiar,
          social o laboral ha tenido contacto con alguien diagnosticado con
          Covid-19?
        </h3>
        <Radio.Group
          options={options}
          disabled={acepto}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              sospechosoFamiliar: e.target.value,
            })
          }
          value={covidData.sospechosoFamiliar}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h2>Temperatura °C</h2>
        <Input
          style={{ width: "100%" }}
          disabled={acepto}
          placeholder="Temperatura"
          value={covidData.temperatura}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              temperatura: e.target.value,
            })
          }
        />
      </Row>
      <Button
        type="primary"
        htmlType="submit"
        className="boton"
        style={({ width: "100" }, { marginTop: "10px" })}
        onClick={processCovid}
      >
        Crear Registro de Covid-19
      </Button>
    </Form>
  );
}
