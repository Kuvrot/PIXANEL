# Documentación del código HTML

El código HTML es una estructura básica de una página web. A continuación, se describen las secciones y elementos principales:

## Sección Head

La sección `head` contiene metadatos y enlaces a recursos externos necesarios para la página. Los elementos incluidos son:

- `meta charset`: Define el juego de caracteres utilizado en la página.
- `meta viewport`: Especifica cómo se debe controlar y ajustar la escala de la página en dispositivos móviles.
- `meta description`: Proporciona una descripción breve de la página.
- `meta author`: Especifica el autor de la página.
- `title`: Define el título de la página que se muestra en la pestaña del navegador.
- `link rel="icon"`: Especifica el icono de la página que se muestra en la pestaña del navegador.
- `link href="css/styles.css"`: Enlaza el archivo CSS `styles.css` para aplicar estilos a la página.

## Sección Body

La sección `body` contiene el contenido principal de la página. A continuación, se describen los elementos dentro del `body`:

### Sidebar

La barra lateral (`sidebar-wrapper`) contiene herramientas y opciones para interactuar con la página. Los elementos incluidos son:

- `div.sidebar-heading`: Muestra el título de la barra lateral.
- `div.list-group.list-group-flush`: Contiene una lista de herramientas.
- `a.tool.list-group-item`: Representa una herramienta con un ícono y un nombre. Al hacer clic en la herramienta, se llama a una función JavaScript (`selectTool`) definida en el archivo `scripts.js`.

### Contenido principal

El contenido principal (`page-content-wrapper`) contiene la barra de navegación superior y el lienzo de dibujo. Los elementos incluidos son:

- Barra de navegación (`navbar bar navbar-expand-lg navbar-dark`): Proporciona opciones de menú como "File" y "Help". Algunas opciones tienen menús desplegables.
- Lienzo de dibujo (`div#canvas-container`): Contiene dos elementos de lienzo HTML5 (`canvas`) para dibujar.

## Archivos externos y scripts

- `link href="css/styles.css"`: Enlaza el archivo CSS `styles.css` para aplicar estilos personalizados a la página.
- `script src="js/scripts.js"`: Enlaza el archivo JavaScript `scripts.js` que contiene funciones y lógica para interactuar con la página.

Es importante tener en cuenta que hay partes del código que están comentadas (`<!-- -->`). Estos fragmentos de código pueden estar en desarrollo o haber sido desactivados temporalmente.



# Documentación del código JavaScript

El código JavaScript contiene funciones y lógica para interactuar con la página web. A continuación, se describen las principales secciones y funciones del código:

## Variables globales

- `tool`: Indica la herramienta seleccionada actualmente (0 para lápiz, 1 para borrador).
- `currentColor`: Almacena el color seleccionado actualmente.
- `canvas` y `ctx`: Representan el elemento de lienzo principal y su contexto de dibujo.
- `gridCanvas` y `gridCtx`: Representan el elemento de lienzo de la cuadrícula y su contexto de dibujo.
- `PIXEL_SIZE`: Almacena el tamaño actual de los píxeles.
- `GRID_SIZE`: Almacena el tamaño de la cuadrícula.
- `canvasSize`: Almacena el tamaño total del lienzo.
- `canvasSizeInput`: Representa el elemento de entrada donde se puede cambiar el tamaño del lienzo.
- `currentIndex`: Almacena el índice actual en el historial de cambios.
- `History`: Array que almacena el historial de cambios en el lienzo.
- `Z`: Bandera para controlar el comportamiento de la tecla "Ctrl + Z".
- `canUndo`: Bandera para controlar la capacidad de deshacer los cambios.

## Evento 'DOMContentLoaded'

Este evento se dispara cuando el DOM ha terminado de cargar. Aquí se obtienen las referencias a los elementos de lienzo, se configuran los controladores de eventos y se establecen los valores iniciales.

- Se obtienen las referencias a `canvas`, `ctx`, `gridCanvas` y `gridCtx`.
- Se configuran los controladores de eventos para los elementos de entrada de color (`colorPicker`) y tamaño de píxel (`pixelWidth`).
- Se configuran los controladores de eventos para las interacciones de dibujo en el lienzo (`canvas.onmousedown`, `canvas.onmousemove`, `canvas.onmouseup` y `canvas.onmouseleave`).
- Se establece el tamaño inicial del lienzo y se dibuja la cuadrícula.

## Función `setColorValue`

Esta función se llama cuando se cambia el valor del color seleccionado en `colorPicker`. Actualiza la variable `currentColor` con el valor seleccionado.

## Función `setPixelWidth`

Esta función se llama cuando se cambia el valor del tamaño de píxel en `pixelWidth`. Actualiza la variable `PIXEL_SIZE` con el valor seleccionado y ajusta el valor máximo del tamaño del lienzo según el tamaño de píxel seleccionado.

## Función `draw`

Esta función dibuja un píxel en las coordenadas especificadas en el lienzo según la herramienta seleccionada (`tool`).

- Si la herramienta es 0 (lápiz), se rellena un rectángulo en el lienzo con el color actual en las coordenadas dadas.
- Si la herramienta es 1 (borrador), se borra un rectángulo en el lienzo en las coordenadas dadas.

## Eventos de interacción de dibujo

Estos eventos controlan las interacciones de dibujo en el lienzo:

- `canvas.onmousedown`: Se activa cuando se presiona el botón del mouse en el lienzo. Inicia la interacción de dibujo y llama a la función `motion`.
- `canvas.onmousemove`: Se activa cuando se mueve el mouse dentro del lienzo mientras se mantiene presionado el botón del mouse. Llama a la función `motion` para dibujar en las coordenadas actuales.
- `canvas.onmouseup`: Se activa cuando se suelta el botón del mouse en el lienzo. Finaliza la interacción de dibujo y guarda el estado actual del lienzo en el historial.
- `canvas.onmouseleave`: Se activa cuando el mouse sale del área del lienzo. Finaliza la interacción de dibujo.

## Función `motion`

Esta función dibuja en el lienzo en las coordenadas actuales si la interacción de dibujo está activa.

## Función `drawGrid`

Esta función dibuja la cuadrícula en el lienzo de la cuadrícula (`gridCanvas`).

- Borra el lienzo de la cuadrícula.
- Recorre las celdas de la cuadrícula y dibuja un rectángulo en cada una.

## Función `resizeCanvas`

Esta función se llama cuando se cambia el valor del tamaño del lienzo en `canvasSizeInput`. Actualiza las variables relacionadas con el tamaño del lienzo y vuelve a dibujar la cuadrícula.

## Evento 'beforeunload'

Este evento se dispara antes de que el usuario abandone la página. Se muestra un mensaje de confirmación para evitar que el usuario pierda cambios no guardados.

## Funciones para guardar y cargar proyectos

- `saveProject`: Guarda el estado actual del lienzo en un archivo JSON y lo descarga.
- `serializeImageData`: Convierte los datos de imagen en un formato serializable.
- `openProject`: Abre un archivo JSON seleccionado por el usuario y carga los datos en el lienzo.
- `createImageDataFromText`: Crea un objeto `ImageData` a partir de los datos del archivo JSON.

## Otras funciones y configuraciones

- `saveImage`: Guarda la imagen actual del lienzo como un archivo PNG descargable.
- `selectTool`: Cambia la herramienta seleccionada y actualiza la apariencia de las herramientas en la barra lateral.
- `undo`: Deshace el último cambio realizado en el lienzo.
- `newFile`: Recarga la página para comenzar un nuevo archivo.
