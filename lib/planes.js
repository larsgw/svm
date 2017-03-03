const range = require('./range'),
      {pow2: q,
       round2: r,
       bezier: b,
       trig: g,
       pyth: dist} = require('./math'),
      
      div = require('./div'),
      style = require('./css'),
      pos = require('./position'),
      
      {shadow,
       shadowFactor} = require('./shadow')

const pathRegex = /(?!^)\s*(?=[A-Za-z])/g,
      delRegex = ///(?:(?:\s|\s*,\s*|^)(-?(?:\d+\.\d+|\d+|\.\d+|\d+\.))|((?:-\.|-|\.)\d+))/g
      /(?!^)(?:(?:\s|\s*,\s*)(?=[0-9-])|(?=-))/g

//BEGIN TEST
//TEST
const pathRegexNorm = /(?!^) (?=[A-Za-z])/g
const fs = require('fs')
const zoom = 1
function logNorm (path, result) {
  const p1 = path.split(pathRegex), 
        p2 = result.split(pathRegexNorm)
  
  let points = ''
  
  const rows = p1.map((v1, i) => {
    const v2 = (p2[i]||'').split(pathRegex),
          [x, y] = parseCoord(v2.slice().pop().slice(1)).slice(-2)
    
    points += 
      `<circle r="2" cx="${x * zoom}" cy="${y * zoom}"/>
      <text font-size="10" x="${x * zoom + 4}" y="${y * zoom + 10}">${i + 1}</text>`
    
    return `<tr>
      <td>${i + 1}</td>
      <td>${v1}</td>
      <td>${v2.join(' ')}</td>
    </tr>`
  })
  
  fs.appendFileSync('normalizePath.log.html',            
    `<section>
      <table>${rows.join('')}</table>
      
      <svg width="300" height="300" viewbox="0 0 200 300">${points}
        <path
          style="transform:scale(${zoom});stroke-width:${1/zoom}"
        fill="transparent" stroke="black" d="${path}"></path>
      </svg>
      <svg width="300" height="300" viewbox="0 0 200 300">
        <path
          style="transform:scale(${zoom});stroke-width:${1/zoom}"
        fill="transparent" stroke="black"d="${result}"></path>
      </svg>
    </section>`//
  )
}
fs.writeFileSync('normalizePath.log.html',`<style>
section{margin-bottom:15px}
section>*{display:inline-block;vertical-align:top}
table{border-collapse:collapse}td{border:1px solid;padding:5px}
</style>`)//
//END TEST

const ellipseRadius = function ([rx, ry], a) {
  const d = dist(rx * Math.sin(a), ry * Math.cos(a))
  
  return rx * ry / d
}

const reflectPoint = ([xA, yA], [xB, yB]) => [2 * xB - xA, 2 * yB - yA]
const rotatePoint = function ([xA, yA], a) {
  const b = Math.atan2(yA, xA) - a,
        d = dist(xA, yA)
  
  const xB = Math.cos(b) * d,
        yB = Math.sin(b) * d
  
  return [xB, yB]
}

const getPolyLine = function (r, rot, arc, neg, [xB, yB], [xA, yA], [xM, yM]) {
  const dxA = xA - xM,
        dyA = yA - yM,
        dxB = xB - xM,
        dyB = yB - yM
  
  const aA = Math.atan2(dyA, dxA),
        aB = Math.atan2(dyB, dxB),
        a = arc ? (neg ? -1 : 1) * (g.c.tau - Math.abs(aB - aA)) : aB - aA
  
  const n = global.opt.maxSides,
        step = a / n
  
  const points = range(n).map((v) => {
    const b = aA + (v + 1) * step,
          d = ellipseRadius(r, b - rot)
    
    const x = xM + Math.cos(b) * d,
          y = yM + Math.sin(b) * d
    
    return [x, y]
  })
  
  return [[xA, yA]].concat(points)
}

const calculateCenter = function ([rx, ry], rot, arc, neg, B, A) {
  const [xA, yA] = rotatePoint(A, rot),
        [xB, yB] = rotatePoint(B, rot)
  
  const dx = xB - xA,
        dy = yB - yA,
        R  = ry / rx
  
  const dxR= dx * R,
        dR = dist(dxR, dy),
        rR = Math.sqrt(q(ry) - q(dR / 2))
  
  const a  = Math.atan2(dxR, dy) + g.c.pi * !neg
  
  const xM = (xA + xB) / 2 - Math.cos(a) * rR / R,
        yM = (yA + yB) / 2 + Math.sin(a) * rR
  
  return rotatePoint([xM, yM], -rot)
}

const parseCoord = function (s) {
  return s.split(delRegex).map(parseFloat)
  //console.log(`"${s}"`,s.split(delRegex).filter(v => !!v))
  //return s.split(delRegex).filter(v => !!v).map(parseFloat)
}

const plane = {}

plane.L = function ([xN, yN], [xO, yO], {height, color}) {
  const x = xN - xO,
        y = yN - yO
  
  const length = dist(x, y),
        angle = g.deg(Math.atan2(-y, x))
  
  return div({
    style: style({
      transformOrigin: '0 0',
      transform: pos({x: xO, z: yO, ry: angle}),
      width: `${length}px`,
      height: `${height}px`,
      backgroundColor: shadow(color, shadowFactor(g.c.deg / 2 - angle))
    })
  })
}

plane.C = function (N, O, {height, color, more}) {
  const accuracy = global.opt.maxSides - 1,
        points = [O, more.slice(0, 2), more.slice(2, 4), N]
        polyLine = range(accuracy).map((i) => b(i / accuracy, points))
  
  polyLine.push(N)
  
  const curve = polyLine.map((c, i, a) => plane.L(c, a[--i] || O, {height, color}))
  
  return div({}, curve.join(''))
}

plane.Q = function (N, O, {height, color, more}) {
  const accuracy = global.opt.maxSides - 1,
        points = [O, more, N]
        polyLine = range(accuracy).map((i) => b(i / accuracy, points))
  
  polyLine.push(N)
  
  const curve = polyLine.map((c, i, a) => plane.L(c, a[--i] || O, {height, color}))
  
  return div({}, curve.join(''))
}

plane.A = function (N, O, {height, color, more}) {
  const [rX, rY, rot, fL, fS] = more
  
  const [xM, yM] = calculateCenter([rX, rY], g.rad(rot), fL, fS, N, O),
        polyLine = getPolyLine([rX, rY], g.rad(rot), fL, fS, N, O, [xM, yM]).slice(1)
  
  const arc = polyLine.map((c, i, a) => plane.L(c, a[--i] || O, {height, color}))
  
  return div({}, arc.join(''))
}

plane.M = () => ''

const moveTo = ([xN, yN], [xO, yO]) => [xO + xN, yO + yN]

const parseCommand = function (type, args, {oldPos, firstPos, bezier}) {
  const out = {
    type
  }
  
  switch (type) {
    case 'a': {
      out.arg = args.slice(0, 5)
      out.pos = moveTo(args.slice(5, 7), oldPos)
    } break
    case 'A': {
      out.arg = args.slice(0, 5)
      out.pos = args.slice(5, 7)
    } break
    
    case 'c': {
      out.arg = [].concat(
                  moveTo(args.slice(0, 2), oldPos),
                  bezier.cubic = moveTo(args.slice(2, 4), oldPos)
                )
      out.pos = moveTo(args.slice(4, 6), oldPos)
    } break
    case 'C': {
      out.arg = [].concat(
                  args.slice(0, 2),
                  bezier.cubic = args.slice(2, 4)
                )
      out.pos = args.slice(4, 6)
    } break
    
    case 'h': {
      out.pos = moveTo([args[0], 0], oldPos)
    } break
    case 'H': {
      out.pos = [args[0], oldPos[1]]
    } break
    
    case 'l': {
      out.pos = moveTo(args, oldPos)
    } break
    case 'L': {
      out.pos = args
    } break
    
    case 'm': {
      out.pos = firstPos = moveTo(args, oldPos)
    } break
    case 'M': {
      out.pos = firstPos = args
    } break
    
    case 'q': {
      out.arg = bezier.quadratic = moveTo(args.slice(0, 2), oldPos)
      out.pos = moveTo(args.slice(2, 4), oldPos)
    } break
    case 'Q': {
      out.arg = bezier.quadratic = args.slice(0, 2)
      out.pos = args.slice(2, 4)
    } break
    
    case 's': {
      out.arg = [].concat(
                  reflectPoint(bezier.cubic || oldPos, oldPos),
                  bezier.cubic = moveTo(args.slice(0, 2), oldPos)
                )
      out.pos = moveTo(args.slice(2, 4), oldPos)
    } break
    case 'S': {
      out.arg = [].concat(
                  reflectPoint(bezier.cubic || oldPos, oldPos),
                  bezier.cubic = args.slice(0, 2)
                )
      out.pos = args.slice(2, 4)
    } break
    
    case 't': {
      out.arg = bezier.quadratic = reflectPoint(bezier.quadratic || oldPos, oldPos)
      out.pos = moveTo(args, oldPos)
    } break
    case 'T': {
      out.arg = bezier.quadratic = reflectPoint(bezier.quadratic || oldPos, oldPos)
      out.pos = args
    } break
    
    case 'v': {
      out.pos = moveTo([0, args[0]], oldPos)
    } break
    case 'V': {
      out.pos = [oldPos[0], args[0]]
    } break
    
    case 'z':
    case 'Z': {
      out.pos = firstPos
    } break
  }
  
  out.type = type
  out.firstPos = firstPos
  out.bezier = 'qQtTcCsS'.match(type) ? bezier : null
  
  if ('mlacq'.match(out.type)) {
    out.type = out.type.toUpperCase()
  } else if ('zZvVhH'.match(out.type)) {
    out.type = 'L'
  } else if ('tT'.match(out.type)) {
    out.type = 'Q'
  } else if ('sS'.match(out.type)) {
    out.type = 'C'
  }
  
  return out
}

const argsNum = {
  M: 2, Z: 0,
  L: 2, H: 1, V: 1,
  
  A: 7,
  
  C: 6, S: 4,
  Q: 4, T: 2
}

const normalizePath = function (path) {
  let oldPos = [0, 0],
      firstPos = [0, 0]
  
  const bezier = {
    cubic: [0, 0],
    quadratic: [0, 0]
  }
  
  const result = path.trim().split(pathRegex).map(function (s) {
    const type = s[0],
          data = s.slice(1)
    
    if (!argsNum.hasOwnProperty(type.toUpperCase())) {
      throw new SyntaxError(`Invalid curve path instruction: "${type}"`)
    }
    
    const args = parseCoord(data),
          expArgs = argsNum[type.toUpperCase()],
          combo = expArgs ? Math.floor(args.length / expArgs) : 1
    
    const commands = range(combo).map(function () {
      const out = parseCommand(type, args.splice(0, expArgs), {oldPos, firstPos, bezier})
      
      oldPos = out.pos
      firstPos = out.firstPos
      
      if ('LM'.match(out.type)) {
        return out.type + out.pos
      } else if ('ACQ'.match(out.type)) {
        return out.type + out.arg + ' ' + out.pos
      }
    })
    
    return commands.join('')
  })
  
  logNorm(path, result.join(' ')) // TEST
  
  return result.join(' ')
}

const pathDimensions = function (path) {
  path = normalizePath(path)
  
  let pos = [0, 0],
      xMax = 0,
      yMax = 0
  
  path.split(pathRegex).forEach(function (s) {
    const [x, y] = parseCoord(s.slice(1)).slice(-2)
    
    xMax = x > xMax ? x : xMax
    yMax = y > yMax ? y : yMax
    pos = [x, y]
  })
  
  return {width: xMax, height: yMax}
}

const planeCurve = function (path, height, color) {
  path = normalizePath(path.trim())
  
  let result = '',
      pos = [0, 0]
  
  let xMax = 0, yMax = 0
  
  path.split(pathRegex).forEach(function (s) {
    const data = s.slice(1),
          type = s[0]
    
    if (!plane.hasOwnProperty(type)) {
      throw new SyntaxError(`Uncaught invalid curve path instruction: "${type}"`)
    }
    
    const args = parseCoord(data),
          coord = args.slice(-2),
          more = args.slice(0, -2)
    
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

module.exports = {
  plane: planeCreator,
  curve: curveCreator,
  dimensions: pathDimensions
}
