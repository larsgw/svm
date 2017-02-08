const div = require('./div'),
      range = require('./range')

const parsePositionAttributes = function ({
  x = 0, y = 0, z = 0,
  rx = 0, ry = 0, rz = 0,
  scale = 1
}) {
  //TODO base coordinates
  
  return `
    transform:translate3d(${x}px,${y}px,${z}px)
    rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry}deg)
    scale3d(${scale},${scale},${scale});
  `.replace(/\s+/g, ' ')
}

const faces = ['bottom', 'back', 'front', 'left', 'right', 'top']
const shape = {}

shape.CUBE = function (opt) {
  return [
    `--cuboid-width:${opt.width || 0}px;
    --cuboid-height:${opt.height || 0}px;
    --cuboid-depth:${opt.depth || 0}px;
    --cuboid-color:${opt.color||''};`,
    faces.map(c => div({class: c})).join('')
  ]
}

shape.PRISM = function (opt) {
  let i = 0
  
  const max = 12
  opt.sides = opt.sides > max ? max : (opt.sides || max)
  
  const pieceHeight = (6.98 * opt.radius) / opt.sides
  
  return [
    `transform-origin:0 ${.5 * pieceHeight}px;
    --cilinder-components: ${opt.sides};
    --cilinder-color: ${opt.color};
    --cilinder-radius: ${opt.radius}px;
    --cilinder-height: ${opt.height}px;
    `,
    (opt.hollow ? '' : range(2).map(i => div({class: `a${i + 1}`})).join('')) +
    range(opt.sides).map(i => div({class: `b${i + 1}`})).join('')
  ]
}

/*shape.PYRAMID = function (opt) {
  TODO
}*/

shape.SPHERE = function (opt) {
  const max = 12
  opt.sides = opt.sides > max ? max : (opt.sides || max)
  const pieceHeight = (6.98 * opt.radius) / opt.sides
  
  let result = ''
  
  for (let i = 0; i < opt.sides; i++) {
    result += shapeCreator('PRISM', {
      sides: opt.sides,
      color: opt.color,
      rz: (i / opt.sides) * 360,
      y: pieceHeight * -.5,
      radius: opt.radius,
      height: pieceHeight,
      hollow: true
    })
  }
  
  return ['', result]
}

const shapeCreator = function (shapeName, opt) {
  const [style, contents] = shape[shapeName](opt)
  
  return div({
    style: parsePositionAttributes(opt) + style,
    class: shapeName.toLowerCase(),
    role: 'shape',
    'data-shape': shapeName.toLowerCase()
  }, contents)
}

module.exports = {shape: shapeCreator}
