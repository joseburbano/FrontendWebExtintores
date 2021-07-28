import React, { useState, useEffect } from "react";
import { Button, notification, Spin } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import Reporte from "../../../components/Admin/NormaParticipacion/Reporte";
import NormativaCards from "../../../components/Admin/NormaParticipacion/NormativaCards";
import AddEditNormativaForm from "../../../components/Admin/NormaParticipacion/AddEditNormativaForm";
import Pagination from "../../../components/Pagination";
import { getParticipacionApi } from "../../../api/participacion";
import "./NormativaParticipacion.scss";

function NormativaParticipacion(props) {
  const { location, history } = props;
  const [normativa, setNormativa] = useState(null);
  const [reloadNormativa, setReloadNormativa] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  //estado para conocer que item debemos consultar
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getParticipacionApi(10, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setNormativa(response.participantes);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
    setReloadNormativa(false);
  }, [page, reloadNormativa]);

  const addNormativa = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nueva Normativa");
    setModalContent(
      <AddEditNormativaForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadNormativa={setReloadNormativa}
        normativa={null}
      />
    );
  };

  const generateReporte = () => {
    setIsVisibleModal(true);
    setModalTitle("Generar Reporte");
    setModalContent(
      <Reporte
        setIsVisibleModal={setIsVisibleModal}
        setReloadNormativa={setReloadNormativa}
        extintor={null}
      />
    );
  };

  const editNormativa = (gh) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Normativa");
    setModalContent(
      <AddEditNormativaForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadNormativa={setReloadNormativa}
        normativa={gh}
      />
    );
  };


  if (!normativa) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <div className="normativa">
      <div className="botones">
        <Button type="danger" onClick={() => generateReporte()}>
          Reporte Condición
        </Button>
        <Button type="primary" onClick={() => addNormativa()} className="nuevo">
          Nueva Condición
        </Button>
      </div>

      <NormativaCards
        editNormativa={editNormativa}
        normativa={normativa}
        setReloadNormativa={setReloadNormativa}
      />
      <Pagination pagina={normativa} location={location} history={history} />
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

export default withRouter(NormativaParticipacion);
