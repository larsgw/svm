# SVM

SVM is an SVG-like XML-based 3d model format, meant for conversion to HTML+CSS3D models, and, in the future, WebGL.

The first version is still in development. Here are the current features:

* Solids:
  * cubes
  * spheres (not optimised yet)
  * regular prisms and cylinder approximations (max 12 sides, configurable)
  * regular pyramids and cone approximations (max 12 sides, configurable)
  * regular, right [frustums](https://en.wikipedia.org/wiki/Frustum) (max 12 sides, configurable)
  * irregular concave and convex prisms (based on SVG paths, in progress)
* Planes:
  * rectangles
  * curves (based on SVG paths, in progress)
* Other:
  * Groups with names
* Transformation for each shape, plane or group

The webviewer (only HTML+CSS3D) has it's flaws:

* The code is messy. This will be fixed after at least all the above features are done
* It only works in certain browsers
* Chrome has graphical issues around 400-500 element faces (not elements)

## Get started
As I said, the first version (not `v1.0` but `v0.1`) is still in development. Documentation will be provided later. For now, I suggest looking at the example input (`*.svm`). The webviewer mentioned above is `/presents/?s=adminAccount&p=test`. Camera's and displayed models can be controlled in `/presents/js/adminaccount.js` (again, hardly readable).

### Transformations
For camera's and including models, the following transformation options are available:

* `x`, `y`, `z` for coordinates (left top)
* `rz`, `rx`, `ry` for rotation across corresponding axes, in this order
* `sc` for scale

For elements in SVM, the following options are available:

* `x`, `y`, `z` for coordinates (usually middle bottom)
* `rz`, `rx`, `ry` for rotation across corresponding axes, in this order
* `scale`, `scaleX`, `scaleY`, `scaleZ` for corresponding scale operations. You can't use any of the axis-specific operations together with the general one (I swear that seemed reasonable at the time)

### Webviewer controls

Disclaimer: will change in the future

* Drag with mouse: rotate static Y and dynamic X axis
* Scroll: zoom; TG: zoom
* WASD: move X and Z axis; RF: move Y axis
* IJKL: rotate static Y and dynamic X axis; ZX: rotate Z axis
* Q: Back to last camera
* 1: Show axes
* 2: Show layer toggle menu
* 3: Re-align bottom camera menu (almost never necessary)

In the console, there's a short "performance report". If `Total` is above ~450 
elements, things may get weird.

### Updating compiled models
First, install all node dependencies:

    node install

Output is updated with `node .`. Process is controlled in `.svmconfig`. 
Structure per line is:

* Optional `#`: comments out line
* Input file: `*.svm`
* Method: Currently only `html`
* Output file: `*.html`

## FAQ

### Why not use [A-Frame](https://aframe.io/), [xml3d](http://xml3d.org/), etc.?
Those use WebGL, and my main goal is using HTML+CSS3D. This has advantages, like viewing element hierarchy and CSS in common debug environments, selecting text, embedding video's and pages, and not having to learn how to use WebGL.

### Why not compile formats mentioned above into HTML+CSS3D?
Too complicated, ugh.

Longer answer: Now I control the features I need to implement. It's not supposed to be some sort of standard, it's basically a replacement for having to type actual HTML+CSS3D models, which can be cool, but aren't really compatible, and a pain to make by hand.