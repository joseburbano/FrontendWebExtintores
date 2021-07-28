import React from "react";
import { Statistic } from "antd";
import { FireOutlined } from '@ant-design/icons';

export default function TotalExtintor(props) {
  const { totalExtintor } = props;
  return (
    <div className="site-card-border-less-wrapper">
      <Statistic title="Total de Extintores" value={totalExtintor} prefix={<FireOutlined />}/>
    </div>
  );
}
