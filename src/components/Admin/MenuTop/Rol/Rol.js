import React from "react";

export default function Rol(props) {
  const {
    use: {
      user: { rol },
    },
  } = props;

  return (
    <div>
      <Role use={rol} />
    </div>
  );
}
function Role(props) {
  const { use } = props;
  return <p>{use}</p>;
}
