
var tool = 0;
var currentColor = "";
var canvas = null;
var ctx = null;
var gridCanvas = null;
var gridCtx = null;
var PIXEL_SIZE = 32;
var canvasLoaded = false;
var GRID_SIZE = 16; // Tamaño del grid en filas y columnas
var canvasSize = PIXEL_SIZE * GRID_SIZE; // Tamaño total del canvas

window.addEventListener('DOMContentLoaded', event => {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    gridCanvas = document.getElementById('gridCanvas');
    gridCtx = gridCanvas.getContext('2d');

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    //color picker

    var colorPicker = document.getElementById('colorP');
    colorPicker.value = "#0000";

    function setColorValue() {

      currentColor = colorPicker.value;

    }
  
    colorPicker.addEventListener('input', setColorValue);

    //pencil width 
    
    const pixelWidth = document.getElementById('pixelWidth');

    function setPixelWidth (){

        PIXEL_SIZE = pixelWidth.value;

    }
    
    pixelWidth.addEventListener('input' , setPixelWidth);

    //draw

    canvas.style.cursor = "crosshair";

    function draw (x , y){

        if (tool == 0){

            ctx.fillStyle = currentColor;
            ctx.fillRect
            (
                x * PIXEL_SIZE , 
                y * PIXEL_SIZE , 
                PIXEL_SIZE , 
                PIXEL_SIZE
                
            );

        }else if (tool == 1){

            ctx.clearRect
            (
                x * PIXEL_SIZE , 
                y * PIXEL_SIZE , 
                PIXEL_SIZE , 
                PIXEL_SIZE
                
            );

        }
    
    }



    let drawing = false;

    canvas.onmousedown = function (e){

        canvas.onmousemove = motion;
        drawing = true;
        motion(e);

    }

    canvas.onmouseup = function (e) {

        canvas.onmousemove = null;  
        drawing = false;
           
    }

    canvas.onmouseleave = function (e) {

        drawing = false;

    }

    function motion (e){

        if (drawing){

            draw (
                Math.floor((e.clientX - canvas.offsetLeft) / PIXEL_SIZE),
                Math.floor((e.clientY - canvas.offsetTop) / PIXEL_SIZE)
            );

        }
    }

    //canvas.width = canvasSize;
    //canvas.height = canvasSize;

    function drawGrid() {
        ctx.clearRect(0, 0, canvasSize, canvasSize); // Borrar el contenido anterior del canvas

        if (!canvasLoaded) {
            for (var x = 0; x < GRID_SIZE; x++) {
                for (var y = 0; y < GRID_SIZE; y++) {
                var posX = x * PIXEL_SIZE;
                var posY = y * PIXEL_SIZE;

                ctx.strokeStyle = '#000'; // Color del borde
                ctx.lineWidth = 1; // Ancho del borde

                ctx.strokeRect(posX, posY, PIXEL_SIZE, PIXEL_SIZE); // Dibujar un rectángulo en cada posición del grid
                }
            }
        }
    }

    setTimeout(() => {
           
        if (canvasLoaded){

            //drawGrid();
            canvasLoaded = true;

        }

    }, 0);


});


function saveImage() {

  // Guardar la imagen del canvas temporal
  var link = document.createElement('a');
  link.href = tempCanvas.toDataURL();
  link.download = 'canvas_image.png';
  link.click();
  }


function newFile (){

    location.reload();

}

var toolElements = document.getElementsByClassName('tool');

function selectTool (n) {

    tool = n;

    for (let i = 0; i < toolElements.length; i++){

        toolElements[i].classList.remove('active');

    }

    toolElements[n].classList.add('active');
   
}

selectTool(0);

window.addEventListener('beforeunload', function (e) {
    // Cancela el evento predeterminado
    e.preventDefault();
  
    // Mensaje de confirmación
    const confirmationMessage = 'All unsaved changes will be lost, are you shure?';
  
    // Establece el mensaje de confirmación en algunos navegadores
    e.returnValue = confirmationMessage;
  
    // Retorna el mensaje de confirmación en navegadores modernos
    return confirmationMessage;
  });

