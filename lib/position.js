const {round2: r} = require('./math')

const a = v => v !== null && v !== undefined

const parsePositionAttributes = ({
  x, y, z,
  rx, ry, rz,
  scale, scaleY, scaleX, scaleZ
} = {}) =>
  [
    a( x) ? `translateX(${r( x)}px )` : '',
    a( y) ? `translateY(${r( y)}px )` : '',
    a( z) ? `translateZ(${r( z)}px )` : '',
    a(rz) ?    `rotateZ(${r(rz)}deg)` : '',
    a(rx) ?    `rotateX(${r(rx)}deg)` : '',
    a(ry) ?    `rotateY(${r(ry)}deg)` : '',
    scale ?    `scale3d(${r(scale)},${r(scale)},${r(scale)})` : '',
    !scale && scaleX ? `scaleX(${scaleX})` : '',
    !scale && scaleY ? `scaleY(${scaleY})` : '',
    !scale && scaleZ ? `scaleZ(${scaleZ})` : ''
  ].join('&').replace(/\s+/g, '').replace(/&/g, ' ')

module.exports = parsePositionAttributes
