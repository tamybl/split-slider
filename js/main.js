var delta;

const handleMove = () => {
    // contenedor principal
    const articleWrap = document.getElementById('csl');
    delta = articleWrap.clientWidth;

    window.addEventListener('resize', function () {
        delta = articleWrap.clientWidth;
        console.log(delta);
        // image.style.width = (elmnt.offsetLeft - initialPos) + "px";
        // elmnt.style.left = (elmnt.offsetLeft - initialPos) + "px";
        // Funcion que adapta la posicion del manejador e imagen de manera proporcional


        // Evita que al adaptar el tamaño de pantalla, el manejador se salga del contenedor.
        if (delta - 15 <= document.getElementById("draggable-handle").offsetLeft) {
            document.querySelector('#csl .csl_layer.slide-top').style.width = delta - 15 + "px";
            document.getElementById("draggable-handle").style.left = delta - 15 + "px";
            // document.onmousemove = null;
        }
        if (document.getElementById("draggable-handle").offsetLeft <= 15 ) {
            document.querySelector('#csl .csl_layer.slide-top').style.width = 15 + "px";
            document.getElementById("draggable-handle").style.left =  15 + "px";
            // document.onmousemove = null;
        }
    })

    dragElement(document.getElementById("draggable-handle"));
}
document.addEventListener('DOMContentLoaded', handleMove);






function dragElement(elmnt) {
    let [initialPos, finalPos] = [0, 0];
    let image = document.querySelector('#csl .csl_layer.slide-top');
    elmnt.onmousedown = dragMouseDown;
    elmnt.addEventListener('touchstart', dragMouseDown, { passive: false });

    function dragMouseDown(e) {
        e = e || window.event; // Eventos para Chrome e IE
        e.preventDefault();
        finalPos = e.clientX;
        document.onmouseup = closeDragElement;
        // Llama a la funcion cuando el mouse se mueve
        document.onmousemove = elementDrag;
        document.addEventListener('touchmove', elementDrag, { passive: false });


    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Posicion en dispositivos mobile
        console.log(e.touches[0].clientX);
        // calcular la nueva posicion del puntero y de la imagen
        initialPos = finalPos - e.clientX;
        finalPos = e.clientX;
        image.style.width = (elmnt.offsetLeft - initialPos) + "px";
        elmnt.style.left = (elmnt.offsetLeft - initialPos) + "px";
        // console.log(finalPos);
        console.log(elmnt.offsetLeft);
        // Estableciendo limites del elemento arrastrable
        if (delta - 15 <= elmnt.offsetLeft) {
            image.style.width = delta - 15 + "px";
            elmnt.style.left = delta - 15 + "px";
            document.onmousemove = null;
        }
        if (elmnt.offsetLeft <= 15 ) {
            image.style.width = 15 + "px";
            elmnt.style.left =  15 + "px";
            document.onmousemove = null;
        }
    }

    function closeDragElement() {
        /* Detener el evento cuando el mouse es soltado */
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


