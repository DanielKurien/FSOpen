import React from "react";

const Notification = ({ error, message }) => {
  if (message === null) {
    return null;
  } else if (message !== null && error === true) {
    return <div className="error">{message}</div>;
  } else {
    return <div className="success">{message}</div>;
  }
};

export default Notification;
