const fs = require('fs'),
      path = require('path'),
      xml2js = require('xml2js'),
      xml = require('xmldoc'),
      div = require('./lib/div')

global.opt = {}
global.opt.maxZoom = 10
global.opt.maxSides = 12
global.opt.maxShadow = .5

const {
  shape,
  parsePositionAttributes
} = require('./lib/shapes')

const u = v => v.toUpperCase()
console.dir = function (obj) { return console.log(JSON.stringify(obj, null, 2)) }

const parseElement = function (elm) {
  if (elm.hasOwnProperty('name')) {
    switch (u(elm.name)) {
      case 'CUBE':
      case 'PRISM':
      case 'SPHERE':
      case 'PYRAMID':
        return shape(u(elm.name), elm.attr)
        break
      
      case 'GROUP':
        return div({
          style: parsePositionAttributes(elm.attr, 0),
          role: 'group',
          'data-name': elm.attr.name || ''},
          elm.children.map(parseElement).join('')
        )
        break
      
      case 'SVM':
        return div({role: 'root', 'data-name': elm.attr.name}, elm.children.map(parseElement).join``)
        break
      
      default:
        return `<div class="hi">${elm.children.map(parseElement).join``}</div>`
        break
    }
  } else {
    return elm.text
  }
}

var config = fs.readFileSync(path.join(__dirname, '.svmconfig'), 'utf8')
  .split('\n')
  .filter(v => v)
  .map(v => v.split(' '))
  .map(([inFile, method, outFile]) => ({inFile, method, outFile}))

config.forEach(v => {
  try {
    const data = fs.readFileSync(path.join(__dirname, v.inFile), 'utf8'),
          xmlDoc = new xml.XmlDocument(data)
    
    let output
    
    switch (v.method) {
      case 'html':
        const style = fs.readFileSync(path.join(__dirname, '3d.css'), 'utf8')
        output = `<style>${style}</style>` + parseElement(xmlDoc)
        break
      
      default:
        throw new Error('No valid parsing method provided!')
        break
    }
    
    fs.writeFileSync(v.outFile, output)
  } catch (e) {
    console.error(`File skipped: ${v.inFile}
${e}
`)
  }
})
