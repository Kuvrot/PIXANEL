# HTML Code Documentation

The HTML code represents a basic structure of a web page. The following sections and main elements are described:

## Head Section

The `head` section contains metadata and links to external resources required for the page. The included elements are:

- `meta charset`: Defines the character set used in the page.
- `meta viewport`: Specifies how the page should be controlled and scaled on mobile devices.
- `meta description`: Provides a brief description of the page.
- `meta author`: Specifies the author of the page.
- `title`: Defines the title of the page displayed in the browser tab.
- `link rel="icon"`: Specifies the page's icon displayed in the browser tab.
- `link href="css/styles.css"`: Links the `styles.css` CSS file to apply styles to the page.

## Body Section

The `body` section contains the main content of the page. The elements within the `body` are described below:

### Sidebar

The sidebar (`sidebar-wrapper`) contains tools and options for interacting with the page. The included elements are:

- `div.sidebar-heading`: Displays the title of the sidebar.
- `div.list-group.list-group-flush`: Contains a list of tools.
- `a.tool.list-group-item`: Represents a tool with an icon and a name. When clicking the tool, a JavaScript function (`selectTool`) defined in the `scripts.js` file is called.

### Main Content

The main content (`page-content-wrapper`) contains the top navigation bar and the drawing canvas. The included elements are:

- Navigation bar (`navbar bar navbar-expand-lg navbar-dark`): Provides menu options such as "File" and "Help". Some options have dropdown menus.
- Drawing canvas (`div#canvas-container`): Contains two HTML5 canvas elements for drawing.

## External Files and Scripts

- `link href="css/styles.css"`: Links the `styles.css` file to apply custom styles to the page.
- `script src="js/scripts.js"`: Links the `scripts.js` file that contains functions and logic for interacting with the page.

Please note that there are commented parts (`<!-- -->`) in the code. These code snippets may be under development or temporarily deactivated.

# JavaScript Code Documentation

The JavaScript code contains functions and logic to interact with the web page. Below, the main sections and functions of the code are described:

## Global Variables

- `tool`: Indicates the currently selected tool (0 for pencil, 1 for eraser).
- `currentColor`: Stores the currently selected color.
- `canvas` and `ctx`: Represent the main canvas element and its drawing context.
- `gridCanvas` and `gridCtx`: Represent the grid canvas element and its drawing context.
- `PIXEL_SIZE`: Stores the current pixel size.
- `GRID_SIZE`: Stores the grid size.
- `canvasSize`: Stores the total canvas size.
- `canvasSizeInput`: Represents the input element where the canvas size can be changed.
- `currentIndex`: Stores the current index in the history of changes.
- `History`: Array that stores the history of changes in the canvas.
- `Z`: Flag to control the behavior of the "Ctrl + Z" key.
- `canUndo`: Flag to control the ability to undo changes.

## 'DOMContentLoaded' Event

This event is triggered when the DOM has finished loading. Here, references to canvas elements are obtained, event handlers are set up, and initial values are established.

- References to `canvas`, `ctx`, `gridCanvas`, and `gridCtx` are obtained.
- Event handlers are set up for the color input (`colorPicker`) and pixel size input (`pixelWidth`).
- Event handlers are set up for canvas drawing interactions (`canvas.onmousedown`, `canvas.onmousemove`, `canvas.onmouseup`, and `canvas.onmouseleave`).
- The initial canvas size is set, and the grid is drawn.

## `setColorValue` Function

This function is called when the selected color value in `colorPicker` changes. It updates the `currentColor` variable with the selected value.

## `setPixelWidth` Function

This function is called when the pixel size value in `pixelWidth` changes. It updates the `PIXEL_SIZE` variable with the selected value and adjusts the maximum value of the canvas size based on the selected pixel size.

## `draw` Function

This function draws a pixel on the canvas at the specified coordinates based on the selected tool (`tool`).

- If the tool is 0 (pencil), it fills a rectangle on the canvas with the current color at the given coordinates.
- If the tool is 1 (eraser), it clears a rectangle on the canvas at the given coordinates.

## Drawing Interaction Events

These events control the drawing interactions on the canvas:

- `canvas.onmousedown`: Triggered when the mouse button is pressed on the canvas. It initiates the drawing interaction and calls the `motion` function.
- `canvas.onmousemove`: Triggered when the mouse moves within the canvas while the mouse button is held down. It calls the `motion` function to draw at the current coordinates.
- `canvas.onmouseup`: Triggered when the mouse button is released on the canvas. It ends the drawing interaction and saves the current state of the canvas in the history.
- `canvas.onmouseleave`: Triggered when the mouse leaves the canvas area. It ends the drawing interaction.

## `motion` Function

This function draws on the canvas at the current coordinates if the drawing interaction is active.

## `drawGrid` Function

This function draws the grid on the grid canvas (`gridCanvas`).

- It clears the grid canvas.
- It iterates through the grid cells and draws a rectangle in each.

## `resizeCanvas` Function

This function is called when the canvas size value in `canvasSizeInput` changes. It updates the variables related to the canvas size and redraws the grid.

## 'beforeunload' Event

This event is triggered before the user leaves the page. It shows a confirmation message to prevent the user from losing unsaved changes.

## Save and Load Project Functions

- `saveProject`: Saves the current state of the canvas to a JSON file and downloads it.
- `serializeImageData`: Converts the image data into a serializable format.
- `openProject`: Opens a selected JSON file and loads the data into the canvas.
- `createImageDataFromText`: Creates an `ImageData` object from the JSON file data.

## Other Functions and Configurations

- `saveImage`: Saves the current canvas image as a downloadable PNG file.
- `selectTool`: Changes the selected tool and updates the appearance of the tools in the sidebar.
- `undo`: Undoes the last change made to the canvas.
- `newFile`: Reloads the page to start a new file.
