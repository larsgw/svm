const range = require('./range'),
      {pow2: q,
       round2: r,
       trig: g,
       pyth: dist} = require('./math'),
      
      div = require('./div'),
      svg = require('./svg'),
      style = require('./css'),
      pos = require('./position'),
      
      {shadow,
       shadowFactor} = require('./shadow'),
      
      {polygon,
       triangle,
       rectangle,
       trapezoid,
       dimensions: polyDim} = require('./polygon'),
      {plane,
       curve,
       dimensions: pathDim} = require('./planes')

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

const createCap = function ({
  width,
  depth = width,
  height
}, content, top) {
  height = top ? 0 : height
  
  return div({
    style: style({
      transform: 
      pos({
        ry: top ? undefined  : 180,
        scaleX: top ? undefined : -1
      }) +
      pos({
         x: -width / 2,
         y: height - (depth / 2),
        rx: top ? 90         : -90
      }),
      height: `${r(depth)}px`,
    })
  }, content)
}

const shape = {}

shape.CONCAVE = function ({path, height, color}) {
  const walls = curve({path, height, color})
  
  const {width, height: depth} = pathDim(path)
  
  const cap = color => svg({
    width,
    height: depth,
    style: style({
      transform: pos({x: width / 2, y: depth / 2})
    })
  }, {fill: color, d: path})
  
  const caps =
    createCap(
      {width, height, depth},
      cap(shadow(color, 0)),
      true
    ) +
    createCap(
      {width, height, depth},
      cap(shadow(color, maxShadow)),
      false
    )
  
  return [caps + walls, {y: -height, x: -width / 2, z: -depth / 2}, '']
}

shape.CUBE = function ({width, height, depth, color}) {
  width = parseFloat(width)
  height = parseFloat(height)
  depth = parseFloat(depth)
  
//   const outer = dist(width, depth)
  
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
          pos({rx: g.deg(Math.atan2(total.inner, total.height))})
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
  part.height = dist(total.inner, total.height)
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
          pos({rx: g.deg(Math.atan2(total.inner, total.height))})
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
    //TODO upper cap
    createCap(total, polygon(sides, total.outer, shadow(color, maxShadow)), false)
  
  const result = walls.join('') + floor
  
  return [result, {y: -total.height}]
}

shape.SPHERE = function (opt) {
  const sides = parseSides(opt.sides),
        pieceHeight = (6.98 * opt.radius) / sides
  
  let result = ''
  
  for (let i = 0; i < sides / 2; i++) {
    result += shapeCreator('PRISM', {
      sides: sides,
      color: opt.color,
      rz: g.c.deg * i / sides,
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
