import React from "react";


export default function Usu(props) {
  const {use} = props

  let nombre = [];
  nombre.push(use.fullname);

  return (
    <div>
      <Nombre use={nombre[0]} />
    </div>
  );
}
function Nombre(props) {
  const { use } = props;
  return <p>{use}</p>;
}
