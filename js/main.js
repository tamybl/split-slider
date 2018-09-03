const handleMove = () => {
    // Variables Globales
    const articleWrap = document.getElementById('csl');
    let delta = articleWrap.clientWidth;
    let inicialsize = articleWrap.clientWidth;
    let element = document.getElementById("draggable-handle");
    let image = document.querySelector('#csl .csl_layer.slide-top');
    

    window.addEventListener('resize', function () {
        delta = articleWrap.clientWidth;
        // Evita que al adaptar el tamaño de pantalla, el manejador se salga del contenedor.
        if (delta - 15 <= element.offsetLeft) {
            image.style.width = delta - 15 + "px";
            element.style.left = delta - 15 + "px";
        }
        if (element.offsetLeft <= 15 ) {
            image.style.width = 15 + "px";
            element.style.left =  15 + "px";
        }
    })
    dragElement(element, delta, image);
}

document.addEventListener('DOMContentLoaded', handleMove);


function dragElement(elmnt, delta, image) {
    let [initialPos, finalPos] = [0, 0];
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
        /* Posicion condicional, si la primera es indefinida toma la segunda opcion. La primera corresponde a la posicion en vista en desktop y la segunda dispositivos touch (moviles y tablets)
        */
        let currentPos =  e.clientX || e.touches[0].clientX;
        // calcular la nueva posicion del puntero y de la imagen
        initialPos = finalPos - currentPos;
        finalPos = currentPos;
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
        // document.querySelector('#csl .csl_layer.slide-top').style.width = (image.clientWidth/delta)*100 + "%";
        // document.getElementById("draggable-handle").style.left = (elmnt.offsetLeft/delta)*100 + "%";
        // document.getElementById("draggable-handle").style.transform = "translate(-" + (elmnt.offsetLeft)*100 + ", -50%);";
            // elmnt.style.left = delta - 15 + "px";

    }
}


