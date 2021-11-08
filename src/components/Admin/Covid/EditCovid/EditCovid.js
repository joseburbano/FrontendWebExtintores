import React, { useState, useEffect } from "react";
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
import { getAccessTokenApi } from "../../../../api/auth";
import { addAgregarCovidApi, updatecovidApi } from "../../../../api/covid";
import "./EditCovid.scss";
export default function EditCovid(props) {
  const { setReloadCovid, setIsVisibleModal, covid } = props;
  const [covidData, setCovidData] = useState({});
  const [checkData, setCheckData] = useState({});

  useEffect(() => {
    if (covid) {
      setCovidData(covid, checkData);
    } else {
      setCovidData({});
      setCheckData({});
    }
  }, [covid]);

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
      if (!covid) {
        covidData.sintomas = JSON.stringify(checkData);
        covidData.fecha = moment(fechaUpdate);
        addCovid();
      } else {
        covidData.fechaUpdate = moment(fechaUpdate);
        updateCovid();
      }
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

        setIsVisibleModal(false);
        setReloadCovid(true);
        setCovidData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  //funcion para actualizar extintor
  const updateCovid = () => {
    const token = getAccessTokenApi();
    updatecovidApi(token, covidData._id, covidData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        setIsVisibleModal(false);
        setReloadCovid(true);
        setCovidData({});
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
        covid={covid}
        processCovid={processCovid}
        check={check}
      />
    </div>
  );
}

function EditCovidAdd(props) {
  const { Option } = Select;
  const { covidData, setCovidData, covid, processCovid, check } = props;
  const [acepto, setAcepto] = useState("desabled");
  const [autorizo, setAutorizo] = useState("desabled");

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

  const {
    sede,
    diagnosticoCovid,
    diasCovid,
    sospecha,
    fiebreDias,
    respiratoriosDias,
    sospechosoContagiado,
    temperatura,
    sospechosoFamiliar,
  } = covidData;

  return (
    <Form className="form-add" onSubmit={processCovid}>
      <h3>
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
        conocer, actualizar, rectificar y suprimir mi información. Se entiende
        por tratamiento de datos, la facultad que tendrá la Corporación
        Universitaria del Huila - CORHUILA de almacenar, compartir, utilizar,
        procesar, recolectar, divulgar, transferir, transmitir, información
        relacionada con el estado de salud, en cumplimiento de las disposiciones
        legales. De igual manera informo que, en caso de llegar a ingresar a
        alguna las sedes de la institución durante el periodo de la emergencia
        sanitaria, lo haré de manera voluntaria y bajo mi responsabilidad,
        comprometiéndome a cumplir con los protocolos de bioseguridad
        establecidos por CORHUILA.
      </h3>
      <Checkbox onClick={() => setAutorizo(!autorizo)}>AUTORIZO</Checkbox>
      <p></p>
      <h3 style={{ textAlign: "justify" }}>
        1) Cumplir las medidas estipuladas en el Plan de aplicación del
        protocolo de Bioseguridad, de la CORPORACIÓN UNIVERSITARIA DEL HUILA –
        CORHUILA. 2) Autorizar para que me realicen la toma de temperatura al
        ingreso y a la salida, o cuando sea necesario.3) Diligenciar o
        suministrar información clara, veraz y completa sobre mi estado de
        salud, para la prevención y diseminación del COVID-19. 4) Utilizar los
        elementos de protección personal necesarios para la prevención ante el
        COVID-19. 5) Garantizar un distanciamiento de 2 metros entre mis
        compañeros y yo, evitando aglomeraciones. 6) Realizar lavado de manos
        cada 2 horas durante un período de 20 segundos, de acuerdo a cada uno de
        los pasos explicados por el área de Seguridad y Salud en el Trabajo. 7)
        Seguir los protocolos de la manipulación de los equipos y herramientas
        de trabajo, donde se establece la limpieza y desinfección a diario de
        las herramientas, equipos y materiales antes, durante y al final de cada
        uso. 8) No prestar las herramientas y equipos a los compañeros ya que es
        de uso personal. 9) Cumplir con las medidas de higiene respectivo a la
        dotación y a los elementos de protección personal. 10) Realizar la
        debida clasificación de los residuos generados durante la jornada
        laboral. 11) Utilizar vaso individual o termo personal para la
        hidratación. 12) No compartir bebidas, alimentos o prendas de vestir a
        mis compañeros de trabajo. 13) Notificar a los responsables del SG SST,
        en caso de presentar alguna sintomatología del COVID-19 (tos, fiebre
        cuantificada mayor o igual a 38°C, fatiga, dolor de garganta y
        dificultad respiratoria, entre otros síntomas de resfriado). 14)
        Reportar al jefe inmediato y/o al responsable de Seguridad y Salud en el
        trabajo cuando por algún motivo haya tenido contacto con un familiar,
        amigo o conocido que al realizarle la prueba esté haya sido positivo
        para COVID-19. 15) Reportar si algún compañero este incumpliendo con lo
        establecido en el protocolo.
      </h3>
      <Checkbox disabled={autorizo} onClick={() => setAcepto(!acepto)}>
        ME COMPROMETO
      </Checkbox>
      <Row gutter={24} className="datos">
        <Select
          style={{ width: "100%" }}
          placeholder="Sede"
          disabled={acepto}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              sede: e,
            })
          }
          value={sede}
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
        <Radio.Group
          options={options}
          disabled={acepto}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              diagnosticoCovid: e.target.value,
            })
          }
          value={diagnosticoCovid}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h3>
          Si tuvo Covid 19 y esta en proceso de recuperación ¿Cuantos días han
          pasado desde que cumplió su proceso de cuarentena ?
        </h3>
        <Input
          style={{ width: "100%" }}
          placeholder="Dias con Covid-19"
          disabled={acepto}
          value={diasCovid}
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
        <Radio.Group
          options={options}
          disabled={acepto}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              sospecha: e.target.value,
            })
          }
          value={sospecha}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h3>Tiene o ha tenido fiebre los últimos 14 días?</h3>
      </Row>
      <Row gutter={24}>
        <Radio.Group
          options={options}
          disabled={acepto}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              fiebreDias: e.target.value,
            })
          }
          value={fiebreDias}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h3>Ha tenido problemas respiratorios en los últimos 14 días?</h3>
        <Radio.Group
          options={options}
          disabled={acepto}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              respiratoriosDias: e.target.value,
            })
          }
          value={respiratoriosDias}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h3>
          En los últimos 14 días, usted ha presentado alguno de estos síntomas?
        </h3>
        <Checkbox.Group options={optionsdos} disabled={acepto} onChange={check}>
          Molestias y dolores
        </Checkbox.Group>
      </Row>
      <Row gutter={24}>
        <h3>
          En los últimos 14 días, usted o algún miembro de su grupo familiar,
          social o laboral ha tenido contacto con alguien sospechoso de estar
          contagiado con Covid-19?
        </h3>
        <Radio.Group
          options={options}
          disabled={acepto}
          onChange={(e) =>
            setCovidData({
              ...covidData,
              sospechosoContagiado: e.target.value,
            })
          }
          value={sospechosoContagiado}
        ></Radio.Group>
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
          value={sospechosoFamiliar}
        ></Radio.Group>
      </Row>
      <Row gutter={24}>
        <h2>Temperatura °C</h2>
        <Input
          style={{ width: "100%" }}
          placeholder="Temperatura"
          value={temperatura}
          disabled={acepto}
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
        disabled={acepto}
        className="boton"
        style={({ width: "100" }, { marginTop: "10px" })}
        onClick={processCovid}
      >
        {covid
          ? "Actualizar Registro de Covid-19"
          : "Crear Registro de Covid-19"}
      </Button>
    </Form>
  );
}
