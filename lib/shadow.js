const Color = require('color')

const aT = 360,
      sT = 1,
      sTd = sT * 2
      sTh = sT *.5

const f = global.opt.maxShadow / sT

const shadow = (c, s) => s == 'max' ? f : Color(c).darken(s / sT)

//TODO 3d
const shadowFactor = (a) => f - sTd * f * Math.abs(a / aT - sTh)

module.exports = {shadow, shadowFactor}
