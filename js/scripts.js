var tool = 0; //Tool that is currently selected
var currentColor = "";

var canvas = null;
var ctx = null;

var gridCanvas = null;
var gridCtx = null;

var PIXEL_SIZE = 32;
var canvasLoaded = false;
var GRID_SIZE = 16; // size of grid
var canvasSize = PIXEL_SIZE * GRID_SIZE; // full size of canvas
var canvasSizeInput = null; //This is the element where the size of the canvas can be changed 

//undo and redo variables 
var currentIndex = -1;
var History = [];
var Z = false;
var canUndo = true;

window.addEventListener('DOMContentLoaded', event => {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    gridCanvas = document.getElementById('gridCanvas');
    gridCtx = gridCanvas.getContext('2d');

    canvasSizeInput = document.getElementById('canvasSize');

    canvasSizeInput.value = 16;

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

    pixelWidth.value = 32;

    function setPixelWidth (){

        PIXEL_SIZE = pixelWidth.value;


        if (PIXEL_SIZE == 16){

            canvasSizeInput.setAttribute("max" , 53);

        }else if (PIXEL_SIZE == 32) {

            canvasSizeInput.setAttribute("max" , 27);


        }

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
        History.push(ctx.getImageData(0 , 0 , canvasSize , canvasSize));
        currentIndex++;
        console.log(History[currentIndex]);
           
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

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    gridCanvas.width = canvasSize;
    gridCanvas.height = canvasSize;

   setTimeout(() => {

    drawGrid();
    
   }, 0);

   function drawGrid(){

    gridCtx.clearRect(0, 0, canvasSize, canvasSize);

    for (let x = 0; x < GRID_SIZE; x++){

        for (let y = 0; y < GRID_SIZE; y++){

            var posX = x * PIXEL_SIZE;
            var posY = y * PIXEL_SIZE;

            gridCtx.lineWidth = 1;
            gridCtx.strokeStyle = "#000";

            gridCtx.strokeRect(posX , posY , PIXEL_SIZE , PIXEL_SIZE);

            }

        }

    }

    // change canvas size

    function resizeCanvas () {

        GRID_SIZE = canvasSizeInput.value;
        canvasSize = PIXEL_SIZE * GRID_SIZE;
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        gridCanvas.width = canvasSize;
        gridCanvas.height = canvasSize;

        drawGrid();

    }

    canvasSizeInput.addEventListener('input' , resizeCanvas);

});





//Undo and redo
document.addEventListener('keydown', function(event) {
 
    if (canUndo && !Z){
        if (event.ctrlKey) {
        
            if (event.key === 'z'){
                Z = true;
                canUndo = false;
                undo();
                
            }
                 
        }
    
    }

  });


  

function undo () {

console.log(currentIndex);

if (!canUndo){

    if (currentIndex > 0) {

        History.pop();
        currentIndex--;
        console.log(currentIndex);
        ctx.putImageData(History[currentIndex] , 0 , 0);

    }else{
        History = [];
        currentIndex = -1;
        ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    }

        Z = false;
        setTimeout(() => {
            canUndo = true;
        }, 10);

}

}


function newFile (){

    location.reload();

}

function saveProject () {

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Convert the image data to a serializable format
    const serializedData = serializeImageData(imageData);
  
    // Convert the serialized data to a JSON string
    const json = JSON.stringify(serializedData);
  
    // Create a Blob from the JSON string
    const blob = new Blob([json], { type: 'application/json' });
  
    // Create a URL from the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'untitledProject.anel';
  
    // Trigger a click event on the link to initiate the download
    link.click();
  
    // Revoke the URL object to release resources
    URL.revokeObjectURL(url);
  }
  
  function serializeImageData(imageData) {
    return {
      width: imageData.width,
      height: imageData.height,
      data: Array.from(imageData.data),
    };
  }


  function openProject() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.anel';
    input.onchange = function () {
      let file = input.files[0];
      let reader = new FileReader();
      reader.onload = function () {
        let fileContents = reader.result;
        let imageData = createImageDataFromText(fileContents);
        ctx.putImageData(imageData, 0, 0);
      };
      reader.readAsText(file);
    };
    input.click();
  }
  
  function createImageDataFromText(text) {
    // Parse the text content and extract the necessary information
    let data = JSON.parse(text);
    let width = data.width;
    let height = data.height;
    let pixelData = data.data;
  
    // Create a new ImageData object with the extracted width and height
    let imageData = ctx.createImageData(width, height);
  
    // Assign the pixel data from the parsed data to the ImageData object
    for (let i = 0; i < pixelData.length; i++) {
      imageData.data[i] = pixelData[i];
    }
  
    return imageData;
  }

function saveImage() {

    // Save the image of the temporal canvas
    let link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'canvas_image.png';
    link.click();
  }

var toolElements = document.getElementsByClassName('tool');

function selectTool (n) {

    toolElements[tool].classList.remove('active');
    tool = n;
    toolElements[tool].classList.add('active');
   
}

selectTool(0);

window.addEventListener('beforeunload', function (e) {
    // Cancel the default event
    e.preventDefault();
  
    // Confirmation message
    const confirmationMessage = 'All unsaved changes will be lost, are you shure?';
  
    // Establish the confirmation message in some browsers
    e.returnValue = confirmationMessage;
  
    // return the confirmation message in modern browsers
    return confirmationMessage;
  });



