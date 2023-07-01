import Swal from "sweetalert2";

export const showToast = (icon, message) =>
  Swal.fire({
    position: "center",
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });

export const showError = (icon, message) =>
  Swal.fire({
    icon: icon,
    title: "Oops...",
    text: message,
  });
