const div = require('./div'),
      range = require('./range'),
      {polygon,
       triangle,
       dimensions: polyDim} = require('./polygon'),
      {q, r} = require('./math'),
      {shadow,
       shadowFactor} = require('./shadow'),
      style = require('./css')

const {
  maxShadow,
  maxSides,
  maxZoom
} = global.opt

const parsePositionAttributes = function ({
  x = 0, y = 0, z = 0,
  rx = 0, ry = 0, rz = 0,
  scale = 1
}, height = 0) {
  return `
    transform:
    translateY(-${height}px)
    translate3d(${x}px,${y}px,${z}px)
    rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry}deg)
    scale3d(${scale},${scale},${scale});
  `
}

const parseSides = function (n) {
  n = parseInt(n)
  n = n > maxSides ? maxSides : (n || maxSides)
  
  return n
}

const createCap = function ({width, height, outer}, content, top) {
  height = top ? 0 : height
  
  return div({
    style: style({
      transform:
        `translateX(-${r(width / 2)}px)
        rotateX(-90deg)
        translateZ(${r(height - (width / 2))}px)`,
      height: `${r(width)}px`
    })
  }, content)
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
      class: c //TODO SHADOW
    })).join('')
  ]
}

shape.PRISM = function ({sides, radius, height, color, hollow}) {
  sides = parseSides(sides)
  
  const {angle, total, part} = polyDim(sides, radius, height)
  
  const walls = range(sides).map(v => {
    const wallColor = shadow(color, shadowFactor(v * angle.deg))
    
    return div({
      style: style({
        transformOrigin: '50% 100%',
        transform:
          `rotateY(${v * angle.deg}deg)
          translateZ(${total.inner}px)`,
        left: `-${r(part.width / 2)}px`,
        width: `${r(part.width)}px`,
        height: `${total.height}px`,
        backgroundColor: wallColor
      })
    })
  })
  
  const caps = hollow ? '' :
    createCap(total, polygon(sides, total.outer, shadow(color, 0)), true) +
    createCap(total, polygon(sides, total.outer, shadow(color, maxShadow)), false)
  
  return [
    style({transformOrigin: `0 ${r(.5 * total.height)}px;`}),
    walls.join('') + caps
  ]
}

shape.PYRAMID = function ({sides, radius, height, color, hollow}) {
  sides = parseSides(sides)
  
  const {angle, total, part} = polyDim(sides, radius, height)
  part.height = Math.sqrt(q(total.inner) + q(total.height))
  
  const walls = range(sides).map(v => {
    const wallColor = shadow(color, shadowFactor(v * angle.deg))
    
    return div({
      style: style({
        transformOrigin: '50% 100%',
        transform:
          `rotateY(${v * angle.deg}deg)
          translateZ(${total.inner}px)
          translateY(-${r(part.height - total.height)}px)
          rotateX(${r(Math.atan(total.inner / total.height) * 180 / Math.PI)}deg)`,
        left: `-${r(part.width / 2)}px`,
        width: `${r(part.width)}px`,
        height: `${r(part.height)}px`,
      })
    }, triangle(part.width, part.height, wallColor))
  })
  
  const floor = hollow ? '' :
    createCap(total, polygon(sides, total.outer, shadow(color, maxShadow)), false)
  
  return ['', walls.join('') + floor]
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
  
  return ['', result, 2 * opt.radius]
}

const shapeCreator = function (shapeName, opt) {
  let [style, contents, height] = shape[shapeName](opt)
  
  height = height || opt.height
  
  return div({
    style: parsePositionAttributes(opt, height) + style,
    class: shapeName.toLowerCase(),
    role: 'shape',
    'data-shape': shapeName.toLowerCase()
  }, contents)
}

module.exports = {shape: shapeCreator, parsePositionAttributes}
