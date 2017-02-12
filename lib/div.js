const div = (attr, text) => {
  //TODO check for empty attrs
  const attributes = Object.keys(attr)
    .map(k => `${k}="${attr[k].replace(/\s+/g, ' ')}"`)
    .join(' ')
  
  return `<div ${attributes}>${text || ''}</div>`
}

module.exports = div
