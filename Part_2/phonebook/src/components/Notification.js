import React from "react";

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null;
  } else if (successMessage !== null) {
    return <div className="success">{successMessage}</div>;
  }

  return <div className="error">{errorMessage}</div>;
};

export default Notification;
