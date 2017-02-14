const {r} = require('./math')

const a = v => v !== null && v !== undefined

const parsePositionAttributes = ({x, y, z, rx, ry, rz, scale} = {}) =>
  [
    a( x) ? `translateX(${r( x)}px )` : '',
    a( y) ? `translateY(${r( y)}px )` : '',
    a( z) ? `translateZ(${r( z)}px )` : '',
    a(rz) ?    `rotateZ(${r(rz)}deg)` : '',
    a(rx) ?    `rotateX(${r(rx)}deg)` : '',
    a(ry) ?    `rotateY(${r(ry)}deg)` : '',
    scale ?    `scale3d(${r(scale)},${r(scale)},${r(scale)})` : ''
  ].join(' ').replace(/\s+/g, '')

module.exports = parsePositionAttributes
