import React from "react";
import { Statistic } from "antd";
import { WarningOutlined } from '@ant-design/icons';

export default function TotalUsuario(props) {
  const { proximoVencer } = props;
  return (
    <div className="site-card-wrapper">
      <Statistic title="Proximos a vencer" value={proximoVencer} prefix={<WarningOutlined />}/>
    </div>
  );
}
