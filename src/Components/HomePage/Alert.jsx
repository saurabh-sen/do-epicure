import React from "react";

function Alert(props) {
  const Capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    props.alertState && (
      <div
        className={`alert alert-${props.alertState.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{Capitalize(props.alertState.type)}</strong>:{" "}
        {props.alertState.msg}
      </div>
    )
  );
}

export default Alert;
