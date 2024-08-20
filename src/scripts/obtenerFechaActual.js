document.addEventListener("DOMContentLoaded", () => {
    const spanFecha = document.querySelector("#fecha");
    const fecha = new Date();
    const anoActual = fecha.getFullYear();
    spanFecha.innerHTML = anoActual.toString();
});
