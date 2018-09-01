

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
        // get the mouse cursor position at startup:
        finalPos = e.clientX;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        initialPos = finalPos - e.clientX;
        finalPos = e.clientX;
        image.style.width = (elmnt.offsetLeft - initialPos) + "px";
        elmnt.style.left = (elmnt.offsetLeft - initialPos) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


