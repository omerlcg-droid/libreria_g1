
/* =========================================================
   RYQUICK | JavaScript principal
   Buscador, filtros y funcionalidades de la página
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // 1. Selección de elementos HTML
    // =====================================================

    const formulario = document.querySelector("#formBuscar");
    const buscador = document.querySelector("#buscarLibro");
    const listaLibros = document.querySelector("#listaLibros");

    const libros = [
        ...document.querySelectorAll("#listaLibros .libro-card")
    ];

    const sinResultados = document.querySelector("#sinResultados");
    const contador = document.querySelector("#contadorResultados");

    const categorias = document.querySelectorAll("[data-filtro]");
    const anio = document.querySelector("#anioActual");


    // =====================================================
    // 2. Variables de control
    // =====================================================

    let filtroCategoria = "";


    // =====================================================
    // 3. Actualizar el año del pie de página
    // =====================================================

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }


    // =====================================================
    // 4. Normalizar texto para las búsquedas
    //    Ignora mayúsculas, minúsculas y tildes
    // =====================================================

    function normalizar(texto = "") {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("es")
            .trim();
    }


    // =====================================================
    // 5. Filtrar libros por texto y categoría
    // =====================================================

    function filtrarLibros() {

        const consulta = normalizar(buscador?.value ?? "");

        let visibles = 0;

        libros.forEach((libro) => {

            // Obtener el texto y las categorías del libro.
            const textoLibro = normalizar(
                `${libro.textContent} ${libro.dataset.categoria ?? ""}`
            );

            const categoriasLibro = normalizar(
                libro.dataset.categoria ?? ""
            );

            // Comprobar si coincide con la búsqueda.
            const coincideBusqueda =
                consulta === "" || textoLibro.includes(consulta);

            // Comprobar si coincide con la categoría seleccionada.
            const coincideCategoria =
                filtroCategoria === "" ||
                categoriasLibro.includes(normalizar(filtroCategoria));

            // Mostrar únicamente los libros que coincidan.
            const mostrar = coincideBusqueda && coincideCategoria;

            libro.hidden = !mostrar;

            if (mostrar) {
                visibles++;
            }

        });


        // =================================================
        // 6. Mostrar u ocultar el mensaje sin resultados
        // =================================================

        if (sinResultados) {
            sinResultados.hidden = visibles !== 0;
        }


        // =================================================
        // 7. Actualizar el contador de resultados
        // =================================================

        if (contador) {

            if (visibles === 0) {

                contador.textContent =
                    "No hay libros que coincidan con los filtros actuales.";

            } else if (visibles === 1) {

                contador.textContent = "Se encontró 1 libro.";

            } else {

                contador.textContent =
                    `Se encontraron ${visibles} libros.`;

            }

        }

    }


    // =====================================================
    // 8. Evento del formulario de búsqueda
    // =====================================================

    formulario?.addEventListener("submit", (evento) => {

        // Evitar que la página se recargue.
        evento.preventDefault();

        filtrarLibros();

    });


    // =====================================================
    // 9. Búsqueda en tiempo real
    // =====================================================

    buscador?.addEventListener("input", () => {

        filtrarLibros();

    });


    // =====================================================
    // 10. Filtros por categoría
    // =====================================================

    categorias.forEach((categoria) => {

        categoria.addEventListener("click", () => {

            // Obtener la categoría seleccionada.
            filtroCategoria = categoria.dataset.filtro ?? "";

            // Limpiar el buscador al cambiar de categoría.
            if (buscador) {
                buscador.value = "";
            }

            // Actualizar los resultados.
            filtrarLibros();

        });

    });


    // =====================================================
    // 11. Inicializar el catálogo
    // =====================================================

    filtrarLibros();

});
