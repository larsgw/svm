const parseAttrs = require('./attr')

const div = (attr, text = '') => {
  attr = parseAttrs(attr)
  
  return `<div ${attr}>${text}</div>`
}

module.exports = div
