const fs = require('fs'),
      path = require('path'),
      xml2js = require('xml2js'),
      xml = require('xmldoc'),
      {shape} = require('./lib/shapes')

const u = v => v.toUpperCase()
console.dir = function (obj) { return console.log(JSON.stringify(obj, null, 2)) }

const parseElement = function (elm) {
  if (elm.hasOwnProperty('name')) {
    switch (u(elm.name)) {
      case 'CUBE':
        return shape[u(elm.name)](elm.attr)
        break
      
      case 'GROUP':
      case 'G':
        return `<div class="hi" data-name="${elm.attr.name||``}">${elm.children.map(parseElement).join``}</div>`
        break
      
      default:
        return `<div class="hi" data-name="${elm.attr.name||``}">${elm.children.map(parseElement).join``}</div>`
        break
    }
  } else {
    return elm.text
  }
}

fs.readFile(path.join(__dirname, 'cube.svm'), 'utf8', (err, data) => {
  const xmlDoc = new xml.XmlDocument(data)
  const style = fs.readFileSync(path.join(__dirname, '3d.css'), 'utf8')
  fs.writeFileSync('cube.html', `<style>${style}</style>` + parseElement(xmlDoc))
})
