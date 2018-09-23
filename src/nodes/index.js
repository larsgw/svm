import {deg, geo} from '../math/'

let clipPath = {
  polygon (points) {
    return `polygon(${points.map(point => {
      return point.map(value => `${value * 100}%`).join(' ')
    }).join(', ')})`
  }
}

export default {
  cube ({width, height, depth}) {
    let planes = [
      {width, height, transform: [{ry:   0}, {z: 0.5 * depth}]},
      {width, height, transform: [{ry: 180}, {z: 0.5 * depth}]},

      {width: depth, height, transform: [{ry:  90}, {z: 0.5 * width}]},
      {width: depth, height, transform: [{ry: -90}, {z: 0.5 * width}]},

      {width, height: depth, transform: [{rx:  90}, {z: 0.5 * height}]},
      {width, height: depth, transform: [{rx: -90}, {z: 0.5 * height}]}
    ]

    return {planes}
  },

  prism ({sides, radius, height, hollow, open = hollow}) {
    let planes = []
    let polygon = geo.polygon({sides, radius})

    if (!open) {
      planes.push(
        {
          width: 2 * radius,
          height: 2 * radius,
          path: clipPath.polygon(polygon.relativePoints),
          transform: [{
            y: 0.5 * height,
            rx: 90,
            rz: 180
          }]
        },
        {
          width: 2 * radius,
          height: 2 * radius,
          path: clipPath.polygon(polygon.relativePoints),
          transform: [{
            y: -0.5 * height,
            rx: 90
          }]
        }
      )
    }

    let step = deg(polygon.step)
    for (let i = 0; i < sides; i++) {
      planes.push({
        height,
        width: polygon.stepWidth,
        transform: [
          {ry: (0.5 + i) * step + 180},
          {z: polygon.inscribedRadius}
        ]
      })
    }

    return {planes}
  },

  pyramid ({sides, radius, height, hollow, open = hollow}) {
    let planes = []
    let pyramid = geo.pyramid({sides, radius, height})

    if (!open) {
      planes.push(
        {
          width: 2 * radius,
          height: 2 * radius,
          path: clipPath.polygon(pyramid.relativePoints),
          transform: [{
            y: 0.5 * height,
            rx: 90,
            rz: 180
          }]
        }
      )
    }

    for (let i = 0; i < sides; i++) {
      planes.push({
        height: pyramid.sideHeight,
        width: pyramid.stepWidth,
        transform: [
          {ry: (0.5 + i) * deg(pyramid.step) + 180},
          {z: 0.5 * pyramid.inscribedRadius, rx: deg(pyramid.inclination)}
        ],
        path: clipPath.polygon([[0.5, 0], [1, 1], [0, 1]])
      })
    }

    return {planes}
  },

  frustum ({sides, radius, height, 'cap-height': capHeight, hollow, open = hollow}) {
    let planes = []
    let pyramid = geo.pyramid({sides, radius, height})
    let ratio = capHeight / height

    if (!open) {
      planes.push(
        {
          width: 2 * radius,
          height: 2 * radius,
          path: clipPath.polygon(pyramid.relativePoints),
          transform: [{
            y: 0.5 * height,
            rx: 90,
            rz: 180
          }]
        },
        {
          width: 2 * radius * ratio,
          height: 2 * radius * ratio,
          path: clipPath.polygon(pyramid.relativePoints),
          transform: [{
            y: 0.5 * height - capHeight,
            rx: 90
          }]
        }
      )
    }

    for (let i = 0; i < sides; i++) {
      planes.push({
        height: pyramid.sideHeight,
        width: pyramid.stepWidth,
        transform: [
          {ry: (0.5 + i) * deg(pyramid.step) + 180},
          {z: 0.5 * pyramid.inscribedRadius, rx: deg(pyramid.inclination)}
        ],
        path: clipPath.polygon([
          [0.5 * ratio, 1 - ratio],
          [1 - 0.5 * ratio, 1 - ratio],
          [1, 1],
          [0, 1]
        ])
      })
    }

    return {planes}
  },

  plane ({width, height}) {
    return {
      planes: [
        {width, height, transform: []}
      ]
    }
  }
}
