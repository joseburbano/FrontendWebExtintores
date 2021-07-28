import React from "react";
import { Statistic } from "antd";
import { MinusCircleOutlined } from '@ant-design/icons';
export default function Vencidos(props) {
    const { extintoVencido } = props;
  return (
    <div className="site-card-wrapper">
      <Statistic title="Extintores vencidos" value={extintoVencido} prefix={<MinusCircleOutlined />}/>
    </div>
  );
}
