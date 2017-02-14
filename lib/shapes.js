const div = require('./div'),
      range = require('./range'),
      {polygon,
       triangle,
       rectangle,
       trapezoid,
       dimensions: polyDim} = require('./polygon'),
      {q, r} = require('./math'),
      {shadow,
       shadowFactor} = require('./shadow'),
      style = require('./css'),
      pos = require('./position')

const {
  maxShadow,
  maxSides,
  maxZoom
} = global.opt

const parseSides = function (n) {
  n = parseInt(n)
  n = n > maxSides ? maxSides : (n || maxSides)
  
  return n
}

const createCap = function ({width, height}, content, top) {
  height = top ? 0 : height
  
  return div({
    style: style({
      transform: pos({
         x: -width / 2,
         y: height - (width / 2),
        rx: -90
      }),
      height: `${r(width)}px`
    })
  }, content)
}

const faces = ['bottom', 'back', 'front', 'left', 'right', 'top'] //SHADOW
const shape = {}

shape.CUBE = function ({width, height, depth, color}) {
  width = parseFloat(width)
  height = parseFloat(height)
  depth = parseFloat(depth)
  
  const outer = Math.sqrt(q(width) + q(depth))
  
  const walls = range(4).map(v => {
    const wallColor = shadow(color, shadowFactor(v * 90))
    
    return div({
      style: style({
        transformOrigin: '50% 100%',
        transform: [
          pos({x: -width / 2, ry: v * 90}),
          pos({z: width / 2})
        ],
        width: `${r(width )}px`,
        height:`${r(height)}px`,
        backgroundColor: wallColor
      })
    })
  })
  
  const caps =
    createCap({width, height}, rectangle(width, height, shadow(color, 0)), true) +
    createCap({width, height}, rectangle(width, height, shadow(color, maxShadow)), false)
  
  return [walls.join('') + caps, {y: -height}]
}

shape.PRISM = function ({sides, radius, height, color, hollow}) {
  sides = parseSides(sides)
  
  const {angle, total, part} = polyDim(sides, radius, height)
  
  const walls = range(sides).map(v => {
    const wallColor = shadow(color, shadowFactor(v * angle.deg))
    
    return div({
      style: style({
        transformOrigin: '50% 100%',
        transform: [
          pos({x: -part.width / 2, ry: v * angle.deg}),
          pos({z: total.inner})
        ],
        width: `${r(part .width )}px`,
        height:`${r(total.height)}px`,
        backgroundColor: wallColor
      })
    })
  })
  
  const caps = hollow ? '' :
    createCap(total, polygon(sides, total.outer, shadow(color, 0)), true) +
    createCap(total, polygon(sides, total.outer, shadow(color, maxShadow)), false)
  
  return [
    walls.join('') + caps,
    {y: -total.height},
    style({transformOrigin: `0 ${r(.5 * total.height)}px;`})
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
        transform: [
          pos({x: -part.width / 2, ry: v * angle.deg}),
          pos({y: -part.height + total.height, z: total.inner}),
          pos({rx: Math.atan(total.inner / total.height) * 180 / Math.PI})
        ],
        width: `${r(part.width)}px`,
        height: `${r(part.height)}px`
      })
    }, triangle(part.width, part.height, wallColor))
  })
  
  const floor = hollow ? '' :
    createCap(total, polygon(sides, total.outer, shadow(color, maxShadow)), false)
  
  const result = walls.join('') + floor
  
  return [result, {y: -total.height}]
}

shape.FRUSTUM = function ({
  sides,
  radius,
  height,
  'cap-height': capHeight,
  color,
  hollow
}) {
  sides = parseSides(sides)
  
  const {angle, total, part} = polyDim(sides, radius, height)
  total.capHeight = capHeight
  part.height = Math.sqrt(q(total.inner) + q(total.height))
  part.capHeight = part.height * total.capHeight / total.height
  part.topWidth = part.width * total.capHeight / total.height
  
  const walls = range(sides).map(v => {
    const wallColor = shadow(color, shadowFactor(v * angle.deg))
    
    return div({
      style: style({
        transformOrigin: '50% 100%',
        transform: [
          pos({x: -part.width / 2, ry: v * angle.deg}),
          pos({y: -part.height + total.height, z: total.inner}),
          pos({rx: Math.atan(total.inner / total.height) * 180 / Math.PI})
        ],
        width: `${r(part.width)}px`,
        height: `${r(part.height)}px`
      })
    }, trapezoid(
      part.width, part.topWidth,
      part.capHeight, part.height,
      wallColor
    ))
  })
  
  const floor = hollow ? '' :
    createCap(total, polygon(sides, total.outer, shadow(color, maxShadow)), false)
  
  const result = walls.join('') + floor
  
  return [result, {y: -total.height}]
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
  
  return [result, {y: -2 * opt.radius}]
}

const shapeCreator = function (shapeName, opt) {
  if (!shape.hasOwnProperty(shapeName)) {
    throw new Error(`Invalid shape ${shapeName}`)
  }
  
  let [contents, position, style] = shape[shapeName](opt)
  
  return div({
    role: 'shape',
    dataShape: shapeName.toLowerCase(),
    style: 
      `transform:
        ${pos(position) /* centring     */}
        ${pos(opt)      /* user-defined */}
      ;
      ${style || ''}`
  }, contents)
}

module.exports = {shape: shapeCreator}
