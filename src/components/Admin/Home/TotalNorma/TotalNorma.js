import React from "react";
import { Statistic } from "antd";
import "./TotalNorma.scss";
import { FileProtectOutlined } from "@ant-design/icons";
export default function TotalNorma(props) {
    const { totalnorma } = props;
  return (
    <div className="site-card-wrapper">
      <Statistic
        title="Condiciones por revisar"
        value={totalnorma}
        prefix={<FileProtectOutlined />}
      />
    </div>
  );
}
