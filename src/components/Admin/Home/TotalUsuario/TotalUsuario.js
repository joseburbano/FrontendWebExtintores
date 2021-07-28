import React from "react";
import { Statistic } from "antd";
import { UserOutlined } from '@ant-design/icons';

export default function TotalUsuario(props) {
  const { totalUser } = props;
  return (
    <div className="site-card-wrapper">
      <Statistic title="Total de Usuario" value={totalUser} prefix={<UserOutlined />}/>
    </div>
  );
}
