import React from "react";
import { Statistic } from "antd";
import "./CovidAlto.scss";
import { AlertOutlined } from "@ant-design/icons";

export default function CovidAlto(props) {
    const { totalCo } = props;
  return (
    <div className="site-card-wrapper">
      <Statistic
        title="Usuario con temperatura muy alta"
        value={totalCo}
        prefix={<AlertOutlined />}
      />
    </div>
  );
}
