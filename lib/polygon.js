const range = require('./range'),
      {pow2: q,
       round2: r,
       trig: g} = require('./math'),
      
      div = require('./div'),
      svg = require('./svg'),
      style = require('./css'),
      pos = require('./position'),
      
      {dimensions: pathDim} = require('./planes')

const {
  maxZoom: f
} = global.opt

const s = a => a.join(' ')

const {rad, deg} = g.const

const dimensions = function (sides, radius, height) {
  const angle = {}
  angle.rad = rad / sides
  angle.deg = deg / sides
  
  const total = {}
  total.outer = parseFloat(radius)
  total.inner = total.outer * Math.cos(angle.rad / 2)
  total.width = 2 * total.outer
  total.height= parseFloat(height)
  
  const part = {}
  part.width = 2 * total.inner * Math.tan(angle.rad / 2)
  part.height= total.height
  
  return {angle, total, part}
}

const polygon = function (sides, dimensions, color) {
  if (typeof sides !== 'number' || typeof dimensions !== 'number') {
    throw new TypeError(`sides and dimensions must be numbers: ${sides}; ${dimensions}`)
  }
  if (parseInt(sides) !== sides) {
    throw new TypeError(`sides must be an integer: ${sides}`)
  }
  if (!(sides > 2)) {
    throw new RangeError(`sides must be bigger than 2: ${sides}`)
  }
  if (!(dimensions >= 0)) {
    throw new RangeError(`dimensions must be bigger than or equal to 0: ${dimensions}`)
  }
  
  dimensions *= f
  
  const width = dimensions * 2,
        step = rad / sides,
        diff = sides % 2 ? 0 : rad / (sides * 2)
  
  const points = range(sides).map(i => {
    const a = i * step - diff
    
    return [dimensions + dimensions * Math.sin(a), dimensions - dimensions * Math.cos(a)]
  })
  
  return svg({
    width: r(width),
    height: r(width),
    style: style({
      transformOrigin: '0 0',
      transform: pos({scale: 1 / f})
    })
  },{
    fill: color,
    d: `M0 0 M${r(width)} ${r(width)} M${s(points.shift())}
    ${s(points.map(point => `L${s(point)}`))} Z`
  })
}

const triangle = function (w, h, c) {
  w *= f * .5
  h *= f
  
  return div({
    style: style({
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: `0 ${r(w)}px ${r(h)}px ${r(w)}px`,
      borderColor: `transparent transparent ${c} transparent`,
      transformOrigin: '0 0',
      transform: pos({scale: 1 / f})
    })
  })
}

const rectangle = function (w, h, c) {
  return div({style: style({
    backgroundColor: c,
    width: `${w}px`,
    height: `${h}px`
  })})
}

const trapezoid = function (wB, wT, hC, hN, c) {
  wB *= f, wT *= f, hC *= f, hN *= f
  
  wB = r(wB), wT = r(wT), hC = r(hC), hN = r(hN)
  
  return svg({
    width: wB,
    height: hN,
    style: style({
      transformOrigin: '0 0',
      transform: pos({scale: 1 / f})
    })
  },{
    fill: c,
    d: `M0 0 M${wB} ${hN} M0 ${hN} H${wB}
    L${wT + ((wB - wT) / 2)} ${hN - hC}
    H${(wB - wT) / 2} Z`
  })
}

module.exports = {
  polygon,
  triangle,
  dimensions,
  rectangle,
  trapezoid
}
