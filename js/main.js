var delta;

const handleMove = () => {
    // contenedor principal
    const articleWrap = document.getElementById('csl');
    delta = articleWrap.clientWidth;
    let element = document.getElementById("draggable-handle");
    let image = document.querySelector('#csl .csl_layer.slide-top');

    window.addEventListener('resize', function () {
        delta = articleWrap.clientWidth;
        console.log(delta);
        // Evita que al adaptar el tamaño de pantalla, el manejador se salga del contenedor.

        if (delta - 15 <= element.offsetLeft) {
            image.style.width = delta - 4 + "px";
            element.style.left = delta - 4 + "px";
        }
        if (element.offsetLeft <= 4 ) {
            image.style.width = 4 + "px";
            element.style.left =  4 + "px";
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
        let currentPos =  e.clientX || e.touches[0].clientX;
        initialPos = finalPos - currentPos;
        finalPos = currentPos;
        image.style.width = (elmnt.offsetLeft - initialPos) + "px";
        elmnt.style.left = (elmnt.offsetLeft - initialPos) + "px";
        console.log(elmnt.offsetLeft);
        // Estableciendo limites del elemento arrastrable
        if (delta - 2 <= elmnt.offsetLeft) {
            image.style.width = delta - 2 + "px";
            elmnt.style.left = delta - 2 + "px";
        }
        if (elmnt.offsetLeft <= 2 ) {
            image.style.width = 2 + "px";
            elmnt.style.left =  2 + "px";
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function check(delta, img) {
            
    }
}
