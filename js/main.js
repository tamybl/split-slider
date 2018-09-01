

const handleMouse = () => {
    // contenedor principal

}
document.addEventListener('DOMContentLoaded', handleMouse);


let articleWrap = document.getElementById('csl');
let limitWidth = articleWrap.clientWidth;

articleWrap.addEventListener('onresize', function () {
    console.log(articleWrap.offsetWidth);
})


dragElement(document.getElementById("draggable-handle"));

function dragElement(elmnt) {
    let [initialPos, finalPos] = [0, 0];
    let image = document.querySelector('#csl .csl_layer.slide-top');
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event; // Eventos para Chrome e IE
        e.preventDefault();
        finalPos = e.clientX;
        document.onmouseup = closeDragElement;
    // Llama a la funcion cuando el mouse se mueve
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calcular la nueva posicion del puntero y de la imagen
        initialPos = finalPos - e.clientX;
        finalPos = e.clientX;
        image.style.width = (elmnt.offsetLeft - initialPos) + "px";
        elmnt.style.left = (elmnt.offsetLeft - initialPos) + "px";
    }

    function closeDragElement() {
        /* Detener el evento cuando el mouse es soltado */
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


