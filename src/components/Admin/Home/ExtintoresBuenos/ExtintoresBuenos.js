import React from "react";
import { Statistic } from "antd";
import "./ExtintoresBuenos.scss";
import { CheckOutlined } from '@ant-design/icons';

export default function ExtintoresBuenos(props) {
  const { totalBueno } = props;
  return (
    <div className="site-card-wrapper">
      <Statistic title="Total Extintores Buenos" value={totalBueno} prefix={<CheckOutlined />}/>
    </div>
  );
}
