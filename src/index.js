import xml from 'xmldoc'

let console = global.console
delete global.console
global.console = new console.Console(process.stderr)

import {matrix} from './math'
import * as converters from './convert/'
import nodes from './nodes/'
import Color from 'color'

function normalise (attrs) {
  let out = {}

  for (let attr in attrs) {
    if (attr === 'color') {
      out[attr] = Color(attrs[attr])
    } else if (isNaN(parseFloat(attrs[attr]))) {
      out[attr] = attrs[attr]
    } else {
      out[attr] = parseFloat(attrs[attr])
    }
  }

  return out
}

function visitor (node) {
  let {name, attr, val, parent} = node
  attr = normalise(attr)

  let newNode = {
    name,
    attr,
    children: [],
    val,
    parent
  }

  if (parent) {
    newNode.attr.transform = matrix.fromSvmTransform(newNode.attr)
    newNode.attr.absTransform = matrix.multiply(matrix.create(), parent.attr.absTransform, newNode.attr.transform)
  } else {
    newNode.attr.transform = matrix.fromSvmTransform(newNode.attr)
    newNode.attr.absTransform = newNode.attr.transform
  }

  let children = node.children
    // filter text nodes
    .filter(node => node.name)
    .map(child => {
      child.parent = newNode
      return child
    })
    .map(visitor)
  newNode.children.push(...children)

  if (name === 'group' || name === 'svm') {
    return newNode
  } else if (typeof nodes[name] !== 'function') {
    throw new SyntaxError(`Unknown element '${name}'`)
  }

  let transformed = nodes[name].call(node, attr, val)
  newNode.children.push(...transformed.planes.map((attr) => {
    let data = {}

    data.transform = attr.transform.reduce((acc, transform) => {
      matrix.multiply(acc, acc, matrix.fromSvmTransform(transform))
      return acc
    }, matrix.create())
    data.absTransform = matrix.multiply(matrix.create(), newNode.attr.absTransform, data.transform)

    return {
      name: '_plane',
      attr,
      parent: newNode,
      data
    }
  }))

  return newNode
}

module.exports = function svm ({input, method}) {
  if (!(method in converters)) {
    throw new TypeError(`Conversion method '${method}' is not supported`)
  }

  let ast = new xml.XmlDocument(input)
  return converters[method](visitor(ast))
}
