import React from "react";
import { Slide, ToastContainer, toast } from "react-toastify";

class AlertUtil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static alert(message, type) {
    console.log("ALERT changement")
    switch (type) {
      case "error":
        console.log("ERROR TOAST")
        toast.error(message, { className: "agiir-component-alert-error" });
        break;
      case "warning":
        toast.warn(message, { className: "agiir-component-alert-warning" });
        break;
      case "success":
        toast.success(message, { className: "agiir-component-alert-success" });
        break;
      case "info":
        toast.info(message, { className: "agiir-component-alert-info" });
        break;
      default:
        toast(message, { className: "agiir-component-alert-default" });
        break;
    }
  }

  render() {
    console.log("RENVOI")
    return (
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        transition={Slide}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    );
  }
}

export default AlertUtil;
