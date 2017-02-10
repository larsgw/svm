const div = require('./div'),
      range = require('./range'),
      polygon = require('./polygon'),
      {q, r} = require('./math'),
      shadow = require('./shadow')

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

const parseSides = function (n) {
  const m = global.opt.maxSides
  
  n = parseInt(n)
  n = n > m ? m : (n || m)
  
  return n
}

const faces = ['bottom', 'back', 'front', 'left', 'right', 'top'] //SHADOW
const shape = {}

shape.CUBE = function (opt) {
  return [
    `--cuboid-width:${opt.width || 0}px;
    --cuboid-height:${opt.height || 0}px;
    --cuboid-depth:${opt.depth || 0}px;
    --cuboid-color:${opt.color||''};`,
    faces.map(c => div({
      class: c //SHADOW
    })).join('')
  ]
}

shape.PRISM = function (opt) {
  const sides = parseSides(opt.sides),
        pieceHeight = (6.98 * opt.radius) / sides
  
  return [
    `transform-origin:0 ${.5 * pieceHeight}px;
    --cilinder-components: ${sides};
    --cilinder-color: ${opt.color};
    --cilinder-radius: ${opt.radius}px;
    --cilinder-height: ${opt.height}px;
    `,
    (opt.hollow ? '' : range(2).map(i =>
      div({
        class: `a${i + 1}` //SHADOW
      }, polygon(sides, opt.radius, opt.color))
    ).join('')) +
    range(sides).map(i => div({class: `b${i + 1}`})).join('')
  ]
}

shape.PYRAMID = function (opt) {
  const f = /*global.opt.maxZoom*/1,
        sides = parseSides(opt.sides),
        width = f * opt.radius * Math.tan(Math.PI / sides),
        height = f * Math.sqrt(q(opt.radius) + q(opt.height))
  
  //const a = [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6] //TODO
  
  const result = range(sides).map(v => {
    return div({style:`transform-origin:50% 100%;transform:
        ${/*scale3d(${1 / global.opt.maxZoom},${1 / global.opt.maxZoom},${1 / global.opt.maxZoom})*/''}
        rotateY(${v * 360 / sides}deg)
        translateZ(${opt.radius}px)
        rotateX(${r(Math.atan(opt.radius / opt.height) * 180 / Math.PI)}deg)
      ;
      width:0;height:0;border-style:solid;
      border-width:0 ${r(width)}px ${r(height)}px ${r(width)}px;
      border-color:transparent transparent ${shadow(opt.color, v * .05)} transparent;
    `})
  }).join('')/*+ div({
    style:`transform:
      rotateX(-90deg)
      translate3d(0,-${r(Math.sqrt(q(width) + q(width * 2)))}px,0)
    ;`
  }, polygon(sides, opt.radius, shadow(opt.color, .6)))*/
  
  return ['', result]
}

shape.SPHERE = function (opt) {
  const sides = parseSides(opt.sides),
        pieceHeight = (6.98 * opt.radius) / sides
  
  let result = ''
  
  for (let i = 0; i < sides; i++) {
    result += shapeCreator('PRISM', {
      sides: sides,
      color: opt.color,
      rz: (i / sides) * 360,
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
