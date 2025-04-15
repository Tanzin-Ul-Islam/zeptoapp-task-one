import Swal from "sweetalert2";

export const confirmationDialog = (options = {}) => {
  const {
    title = "Are you sure?",
    text = "You won't be able to revert this!",
  } = options;

  return Swal.fire({
    title,
    text,
    icon:"warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, proceed!",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "remove",
    },
    ...options,
  });
};
