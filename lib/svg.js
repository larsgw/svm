const parseAttrs = require('./attr')

const pathCreator = function (attr) {
  return `<path ${parseAttrs(attr)}></path>`
}

const svgCreator = function (attr, path) {
  attr.width *= 5
  attr.height *= 5
  
  return `<svg ${parseAttrs(attr)}>${pathCreator(path)}</svg>`
}

module.exports = svgCreator
