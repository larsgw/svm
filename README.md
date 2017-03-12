# SVM

SVM is an SVG-like XML-based 3D model format, meant for conversion to HTML+CSS3D models, and, in the future, WebGL.

The first version is still in development. Here are the current features:

* Solids:
  * cubes
  * spheres
  * regular prisms and cylinder approximations (max 20 sides, max configurable)
  * regular pyramids and cone approximations (max 20 sides, max configurable)
  * regular, right [frustums](https://en.wikipedia.org/wiki/Frustum) (max 20 sides, max configurable)
  * irregular concave and convex prisms (based on SVG paths)
* Planes:
  * rectangles
  * curves (based on SVG paths)
* Other:
  * groups with names
* Transformation for each shape, plane or group

To view a compiled file, use the webviewer (only for HTML+CSS3D). **Note: It only works in certain browsers.**

## Getting started
As I said, the first version (not `v1.0` but `v0.1`) is still in development. Documentation will be provided later. For now, I suggest looking at the example input (`*.svm`). The webviewer mentioned above is [`demo.html`](https://larsgw.github.io/svm/demo.html). Camera's and displayed models can be controlled in `svm-example.json`.

### Transformations
For camera's and including models, the following transformation options are available:

Disclaimer: will change in the future

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
* Q: move back to last camera
* Arrow keys: change camera

In the console, there's a short "performance report". If `Total` is above ~450 elements, things may get weird, but that really depends on the computer and browser.

### Updating compiled models
First, install all node dependencies:

    node install

Output is updated with:

    node .

The compiling process is controlled in `.svmconfig`. Structure per line is:

* Optional `#`: comments out line
* Input file: `*.svm`
* Method: Currently only `html`
* Output file: `*.html`

## Examples

* [Example SVM files](https://github.com/larsgw/svm/tree/master/svm)
* [WebViewer source example](https://github.com/larsgw/svm/tree/master/svm-example.json)
* [WebViewer live example](https://larsgw.github.io/svm/demo.html)

## FAQ

### My model isn't compiling. What's the problem?
I don't know. For support, [submit an issue](https://github.com/larsgw/svm/issues/new) with relevant details (e.g. `*.svm` file, error message, Node.js version). 

### My model compiles, but doesn't work. What's the problem?
Probably your browser. Again, the webviewer isn't perfect, but the main problem is probably your browser not supporting the CSS or JS. It really depends on the type of problem you're having. Please [submit an issue](https://github.com/larsgw/svm/issues/new) with relevant details (e.g. browser version, problem, screenshots, error messages).

### Why not use [A-Frame](https://aframe.io/), [xml3d](http://xml3d.org/), etc.?
Those use WebGL, and my main goal is using HTML+CSS3D. This has advantages, like viewing element hierarchy and CSS in common debug environments, selecting text, embedding video's and pages, and not having to learn how to use WebGL.

### Why not compile formats mentioned above into HTML+CSS3D?
Too complicated, ugh.

Longer answer: Now I control the features I need to implement. It's not supposed to be some sort of standard, it's basically a replacement for having to type actual HTML+CSS3D models, which can be cool, but aren't really compatible, and a pain to make by hand.

### What does SVM mean?
Scalable Vector (3D) Models. It says so in the description.

### And that other thing called SVM?
Don't worry about it.

Or, to make a bad pun: I don't give a faq.