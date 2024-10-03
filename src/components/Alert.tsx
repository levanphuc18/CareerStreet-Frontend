// AlertComponent.tsx
// import goodsApiRequest from "@/app/apiRequest/goods";
import Swal from "sweetalert2";

export type OrderItem = {
  serviceName: string;
  quantity: number;
  price: number; // Giá mỗi dịch vụ
  total: number; // Thành tiền từng dịch vụ
};

const AlertComponent = {
  success: (title?: string, text?: string) => {
    Swal.fire({
      title: title || "Success!",
      text: text || "Operation completed successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  },

  error: (title?: string, text?: string) => {
    Swal.fire({
      title: title || "Error!",
      text: text || "Something went wrong.",
      icon: "error",
      confirmButtonText: "OK",
    });
  },

  info: (title?: string, text?: string) => {
    Swal.fire({
      title: title || "Information",
      text: text || "Here is some information.",
      icon: "info",
      confirmButtonText: "OK",
    });
  },

  warning: (title?: string, text?: string) => {
    Swal.fire({
      title: title || "Warning!",
      text: text || "Please be careful.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  },

};

export default AlertComponent;
