import React from "react";
import { Statistic } from "antd";
import "./ExtintoresMalos.scss";
import { CloseOutlined } from '@ant-design/icons';

export default function ExtintoresMalos(props) {
  const { totalExtintorMalo } = props;
  return (
    <div className="site-card-wrapper">
      <Statistic title="Total Extintores malos" value={totalExtintorMalo} prefix={<CloseOutlined />}/>
    </div>
  );
}
