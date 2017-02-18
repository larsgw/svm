const range = require('./range'),
      {pow2: q,
       round2: r} = require('./math'),
      
      div = require('./div'),
      svg = require('./svg'),
      style = require('./css'),
      pos = require('./position'),
      
      {dimensions: pathDim} = require('./planes')

const {
  maxZoom: f
} = global.opt

const s = a => a.join(' ')

const rad = 2 * Math.PI,
      deg = 360

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

const polygon = function (n, d, b) {
  if (typeof n !== 'number' || typeof d !== 'number') {
    throw new TypeError(`n and d must be numbers`)
  }
  if (parseInt(n) !== n) {
    throw new TypeError(`n must be an integer`)
  }
  if (!(n > 2)) {
    throw new RangeError(`n must be bigger than 2`)
  }
  if (!(d >= 0)) {
    console.trace()
    throw new RangeError(`d must be bigger than or equal to 0`)
  }
  
  d *= f
  
  const w = r(d * 2),
        i = 1 / f
  
  const c = range(n).map(i => {
    const a = rad * i / n
    
    return [r(d + d * Math.sin(a)), r(d - d * Math.cos(a))]
  })
  
  return svg({
    width: w,
    height: w,
    style: style({
      transformOrigin: '0 0',
      transform: pos({scale: 1 / f})
    })
  },{
    fill: b,
    d: `M0 0 M${w} ${w} M${s(c.shift())}
    ${s(c.map(v => `L${s(v)}`))} Z`
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
      transform: pos({scale: 1/ f})
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
