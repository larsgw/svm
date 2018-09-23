import cssPosition from '../../lib/position'
import css from '../../lib/css'
import {matrix, vec3, vec4, quat, deg, round} from '../math'

let sun = vec3.fromValues(0, 1, 1)

function planeAngle (absTransform) {
  let absRotate = matrix.fromQuat(matrix.create(), matrix.getRotation(quat.create(), absTransform))
  let normal = vec4.fromValues(0, 0, 1, 1)
  vec4.transformMat4(normal, normal, absRotate)
  let [x, y, z] = normal
  normal = vec3.fromValues(x, -y, z)

  let angle = deg(vec3.angle(sun, normal))

  return angle
}

function applyShadow (color, transform) {
  const turningPoint = 0.5
  const easingFunction = Math.sqrt
  const changeFactor = 0.5

  // angle: 0-180
  let angle = planeAngle(transform)
  // shadow: 0-1
  let shadow = angle / 180

  let dark = shadow > turningPoint
  let changeFunction = dark ? 'darken' : 'lighten'

  // shadow: 0-1
  shadow = (dark ? 1 : -1) * ((shadow / turningPoint) - 1)
  shadow = Math.sqrt(shadow)
  // shadow: 0-changeFactor
  shadow = shadow * changeFactor

  return color[changeFunction](shadow)
}

function px (num) {
  return `${num}px`
}

function makePlane ({attr: options, data, parent}) {
  let {width, height} = options
  let color = options.color || parent.attr.color

  let transform

  // NOTE: calculate matrix here vs in the browser
  if (false) {
    transform = matrix.create()
    // center plane
    matrix.translate(transform, transform, vec3.fromValues(-0.5 * width, -0.5 * height, 0))
    // apply transformation
    matrix.multiply(transform, transform, data.transform)
    transform = matrix.toCss(transform)
  } else {
    transfom = [
      {x: -0.5 * width, y: -0.5 * height},
      ...options.transform
    ].map(cssPosition).join(' ')
  }

  color = applyShadow(color, data.absTransform)

  return {
    width: px(width),
    height: px(height),
    clipPath: options.path,

    backgroundColor: color.string(),

    transformOrigin: '50% 50%',
    transform/*: */
  }
}

function formatAttrs (attrs) {
  return Object.entries(attrs).map(([name, value]) => {
    // camelCase to kebab-case
    name = name.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)

    return value ? `${name}="${value}"` : name
  }).join(' ')
}

function formatHtml (node, level) {
  let {name, attr, children, val = ''} = node
  let indentation = ' '.repeat(level * 2)
  attr = formatAttrs(attr)

  if (children && children.length) {
    return `${indentation}<${name} ${attr}>
${val}
${children.join('\n')}
${indentation}</${name}>`
  } else {
    return `${indentation}<${name} ${attr}>${val}</${name}>`
  }
}

export default function format (node, level = 0) {
  let html

  if (node.name === '_plane') {
    html = {
      name: 'div',
      attr: {
        style: css(makePlane(node))
      }
    }
  } else if (node.name === 'group' || node.name === 'svm') {
    html = {
      name: 'div',
      attr: {
        role: node.name === 'svm' ? 'root' : 'group',
        dataName: node.attr.name,
        style: css({
          transform: cssPosition(node.attr)
        })
      },
      children: node.children.map(child => format(child, level + 1))
    }
  } else {
    html = {
      name: 'div',
      attr: {
        role: 'shape',
        dataShape: node.name.toLowerCase(),
        style: css({
          transform: cssPosition(node.attr)
        })
      },
      children: node.children.map(child => format(child, level + 1)),
      val: node.val
    }
  }

  return formatHtml(html, level)
}


