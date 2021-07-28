import React from "react";
import { Pagination as PaginationAntd } from "antd";
import "./Pagination.scss";
export default function Pagination(props) {
  const { pagina, location, history } = props;

  const currentPage = parseInt(pagina.page);
  const onChangePage = (newPage) => {
    history.push(`${location.pathname}?page=${newPage}`);
  };
  return (
    <PaginationAntd
      total={pagina.total}
      pagesize={pagina.limit}
      onChange={(newPage) => onChangePage(newPage)}
      className="pagination"
      defaultCurrent={currentPage}
    />
  );
}
