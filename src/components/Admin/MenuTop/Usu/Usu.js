import React from "react";

export default function Usu(props) {
  const {
    use: {
      user: { fullname },
    },
  } = props;
  return (
    <div>
      <Nombre use={fullname} />
    </div>
  );
}
function Nombre(props) {
  const { use } = props;
  return <p>{use}</p>;
}
