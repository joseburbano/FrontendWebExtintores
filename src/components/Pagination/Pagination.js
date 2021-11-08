import React from "react";
import { Pagination as PaginationAntd } from "antd";
import "./Pagination.scss";
export default function Pagination(props) {
  const { pagina, location, history } = props;

  const currentPage = parseInt(pagina.pageNum);
  const onChangePage = (newPage) => {
    history.push(`${location.pathname}?pageNum=${newPage}`);
  };
  return (
    <PaginationAntd
      total={pagina.totalPage}
      pagesize={pagina.pageSize}
      onChange={(newPage) => onChangePage(newPage)}
      className="pagination"
      defaultCurrent={currentPage}
    />
  );
}
