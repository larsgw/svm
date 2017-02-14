const {q, r} = require('./math'),
      div = require('./div'),
      {shadow,
       shadowFactor} = require('./shadow'),
      style = require('./css'),
      pos = require('./position')

const pathRegex = /(?!^) ?(?=[A-Za-z])/g,
      coordRegex = /^(.*?[^0-9\-])??(-?\d+(?:\.\d+)?(?:[ ,]-?\d+(?:\.\d+)?)?)$/,
      arcRegex = /^(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?), ?(-?\d+(?:\.\d+)?), ?(-?\d+(?:\.\d+)?), ?(-?\d+(?:\.\d+)?), ?$/

const parseCoord = function (s) {
  const m = s.match(coordRegex)
  
  if (m) {
    let [_, a, b] = m
    b = b.split(' ').map(v => parseInt(v))
    
    return [a, b]
  } else {
    return [, [0, 0]]
  }
}

const plane = {}

plane.A = function ([xN, yN], [xO, yO], {height, color, more}) {
  const match = more.match(arcRegex)
  
  let rX, rY, rot, fL, fS
  
  if (!match) {
    return
  } else {
    [_, rX, rY, rot, fL, fS] = match.map(v => parseInt(v))
  }
  
  const f = x => Math.sqrt(1 / ((q(x) / q(rX)) + (1 / q(rY))))
  
  return ''
}

plane.L = function ([xN, yN], [xO, yO], {height, color}) {
  const x = xN - xO,
        y = yN - yO,
        length = Math.sqrt(q(x) + q(y))
  
  let angle
  
  if (y === 0) {
    angle = x < 0 ? -180 : 0
  } else if (x < 0 && y < 0) {
    angle = -180 + (Math.atan(y / x) * -180 / Math.PI)
  } else {
    angle = Math.atan(y / x) * -180 / Math.PI
  }
  
//   console.log(`LineTo
// OLD ${xO} ${yO}
// NEW ${xN} ${yN}
// DIF ${x } ${y }
// DEG ${angle}
// LEN ${length}
// `)
  
  return div({
    style: style({
      transformOrigin: '0 0',
      transform: pos({x: xO, z: yO, ry: angle}),
      width: `${length}px`,
      height: `${height}px`,
      backgroundColor: shadow(color, shadowFactor(180 - angle))
    })
  })
}

plane.M = () => ''

const moveTo = ([xN, yN], [xO, yO]) => [xO + xN, yO + yN]

const normalizePath = function (path) {
  let norm = '',
      pos = [0, 0],
      
      first = [0, 0]
  
  path.split(pathRegex).forEach(function (s) {
    s = s.split('')
    
    let type = s.shift()
    if (!'lLzZmMhHvVzZ'.match(type)) {
      throw new SyntaxError(`Invalid curve path instruction: "${type}"`)
    }
    
    let [more, coord] = parseCoord(s.join(''))
    
    if ('zZ'.match(type)) {
      coord = first
    } else if ('vV'.match(type)) {
      type = type === 'v' ? 'l' : 'L'
      coord = type == 'l' ? [0, coord[0]] : [pos[0], coord[0]]
    } else if ('hH'.match(type)) {
      type = type === 'h' ? 'l' : 'L'
      coord = type == 'l' ? [coord[0], 0] : [coord[0], pos[1]]
    }
    
    if (type === type.toLowerCase()) {
      pos = coord = moveTo(coord, pos)
    } else {
      pos = coord
    }
    
    if ('zZvVhH'.match(type)) {
      type = 'L'
    }
    
    if ('mM'.match(type)) {
      first = pos
    }
    
    norm += type.toUpperCase()
    norm += more || ''
    norm += coord.join(' ')
    norm += ' '
  })
  
  console.log(path)
  console.log(norm)
  
  return norm.slice(0, -1)
}

const planeCurve = function (path, height, color) {
  path = normalizePath(path)
  
  let result = '',
      pos = [0, 0]
  
  path.split(pathRegex).forEach(function (s) {
    s = s.split('')
    
    const type = s.shift()
    if (!plane.hasOwnProperty(type)) {
      throw new SyntaxError(`Uncaught invalid curve path instruction: "${type}"`)
    }
    
    const [more, coord] = parseCoord(s.join(''))
    result += plane[type](coord, pos, {height, color, more})
    
    pos = coord
  })
  
  return [result]
}

const planeCreator = function (opt) {
  return div({
    role: 'plane',
    dataPlane: 'plane',
    style: style({
      transform: pos(opt),
      width: `${opt.width}px`,
      height: `${opt.height}px`,
      backgroundColor: opt.color
    })
  }, '')
}

const curveCreator = function (opt) {
  const {path, height, color} = opt,
        [curve, position, style] = planeCurve(path, height, color)
  
  return div({
    role: 'plane-curve',
    dataPlane: 'curve',
    style:
      `transform:
        ${pos(position) /* centring     */}
        ${pos(opt)      /* user-defined */}
      ;
      ${style || ''}`
  }, curve)
}

module.exports = {plane: planeCreator, curve: curveCreator}
