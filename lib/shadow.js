const Color = require('color')

const shadow = function (color, shade) {
  const orig = Color(color)
  
  //TODO
  return orig.darken(shade)
}

module.exports = shadow
