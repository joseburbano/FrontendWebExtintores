import React from "react";

export default function Rol(props) {
  const { use } = props;

  let rol = [];
  rol.push(use.rol);

  return (
    <div>
      <Role use={rol[0]} />
    </div>
  );
}
function Role(props) {
  const { use } = props;
  return <p>{use}</p>;
}
