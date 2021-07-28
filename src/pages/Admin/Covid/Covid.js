import React, { useState, useEffect } from "react";
import { notification, Button, Spin } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import Reporte from "../../../components/Admin/Covid/ReporteCovid";
import ListCovid from "../../../components/Admin/Covid/ListCovid";
import AddEditCovidForm from "../../../components/Admin/Covid/EditCovid";
// import ReporteCovid from "../../../components/Admin/Covid/ReporteCovid";
import Pagination from "../../../components/Pagination";
import { getCovidApi } from "../../../api/covid";
import { getAccessTokenApi } from "../../../api/auth";
import "./Covid.scss";
function Covid(props) {
  //empecemos con los estados
  const { location, history } = props;
  //estado qu eme va contener los datos
  const [covid, setCovid] = useState({});
  //estado para recargar datos
  const [reloadCovid, setReloadCovid] = useState(false);
  //estado para mostrar modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  // Estado para el titulo del modal
  const [modalTitle, setModalTitle] = useState("");
  //estado para el contenido del modal
  const [modalContent, setModalContent] = useState(null);
  //esxtrammos de location la ubicacion del paginate
  const { page = 1 } = queryString.parse(location.search);

  //aca estramos los datos de la api
  useEffect(() => {
    //solicitamos token
    const accessToken = getAccessTokenApi();
    //condicion para saber si estamos buscando en el boton o cargamos por default

    getCovidApi(accessToken, page, 12)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setCovid(response.covis);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
    setReloadCovid(false);
  }, [page, reloadCovid]);
  //boton de busqueda
  //agregar funcion
  const addCovid = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo Registro de Covid-19");
    setModalContent(
      <AddEditCovidForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCovid={setReloadCovid}
        covid={null}
      />
    );
  };

  const editCovid = (unoPor) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Registro de Covid-19");
    setModalContent(
      <AddEditCovidForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCovid={setReloadCovid}
        covid={unoPor}
      />
    );
  };

  const generateReporte = () => {
    setIsVisibleModal(true);
    setModalTitle("Generar Reporte");
    setModalContent(
      <Reporte
        setIsVisibleModal={setIsVisibleModal}
        setReloadCovid={setReloadCovid}
        covid={null}
      />
    );
  };

  //muestra animacion mientras cargan datos
  if (!covid) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <div className="covid">
      <div className="covid_add-covid">
        <Button
          type="danger"
          onClick={() => generateReporte()}
          style={{ marginRight: "70%" }}
        >
          Reporte De Registro Covid-19
        </Button>
        <Button type="primary" onClick={() => addCovid()} className="nuevo">
          Nuevo Registro Covid-19
        </Button>
      </div>

      <ListCovid
        listaCovid={covid.docs}
        setReloadCovid={setReloadCovid}
        editCovid={editCovid}
      />
      <Pagination pagina={covid} location={location} history={history} />
      <Modal
        width="75%"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
export default withRouter(Covid);
