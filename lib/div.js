const div = (attr = {}, text = '') => {
  const attributes = Object.keys(attr)
    .map(k => `
      ${k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}
      ="${attr[k].replace(/\s+/g, ' ')}"
    `)
    .join(' ')
  
  return `<div ${attributes}>${text}</div>`
}

module.exports = div
