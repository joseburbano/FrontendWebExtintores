import React from "react";
import { Statistic } from "antd";
import "./TotalCovid.scss";
import { BugOutlined } from "@ant-design/icons";

export default function TotalCovid(props) {
  const { totalCovid } = props;
  return (
    <div className="site-card-wrapper">
      <Statistic
        title="Total de registros de Covid"
        value={totalCovid}
        prefix={<BugOutlined />}
      />
    </div>
  );
}
