
document.querySelectorAll(".tarjeta").forEach((tarjeta) => {
    const botonGiro = tarjeta.querySelector(".btnServicio");
    const botonVolver = tarjeta.querySelector(".btnVolver");
    const reverso = tarjeta.querySelector(".reversoTarjeta");

    function girarTarjeta() {
        const abierta = tarjeta.classList.toggle("abierta");

        botonGiro.setAttribute("aria-expanded", abierta);
        reverso.inert = !abierta;
    }

    botonGiro.addEventListener("click", girarTarjeta);
    botonVolver.addEventListener("click", girarTarjeta);
});
