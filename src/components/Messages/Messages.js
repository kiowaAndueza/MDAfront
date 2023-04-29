import Swal from "sweetalert2";

export const successfulMessage = (title) => {
    const dialog = Swal.fire({
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
    })
    return dialog;
}