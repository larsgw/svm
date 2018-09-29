import {deg, geo, svg} from '../math/'

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
  },

  concave ({path, height}) {
    let planes = []

    path = new svg.SvgPath(path)
    let polygons = path.getPolygons()
    let dimensions = path.getDimensions()

    for (let i = 0; i < polygons.length; i++) {
      let polygon = polygons[i]
      let {width, height: depth, xmin, ymin} = dimensions[i]
      let path = polygon.map(([x, y]) => [(x - xmin) / width, (y - ymin) / depth])

      planes.push({
        width,
        height: depth,
        transform: [
          {x: 0.5 * width + xmin, z: 0.5 * depth + ymin},
          {rx: 90},
          {z: 0.5 * height}
        ],
        path: clipPath.polygon(path)
      }, {
        width,
        height: depth,
        transform: [
          {x: 0.5 * width + xmin, z: 0.5 * depth + ymin},
          {rx: -90},
          {z: 0.5 * height}
        ],
        path: clipPath.polygon(path.map(([x, y]) => [x, 1 - y]))
      })

      for (let i = 1; i < polygon.length; i++) {
        let [x1, y1] = polygon[i - 1]
        let [x2, y2] = polygon[i]
        let dx = x2 - x1
        let dy = y2 - y1

        planes.push({
          width: Math.hypot(dx, dy),
          height,
          transform: [{
            x: x1 + 0.5 * dx,
            z: y1 + 0.5 * dy,
            ry: deg(-Math.atan2(dy, dx))
          }]
        })
      }
    }

    return {planes}
  },

  curve ({path, height}) {
    let planes = []

    path = new svg.SvgPath(path)

    for (let polygon of path.getPolygons()) {
      for (let i = 1; i < polygon.length; i++) {
        let [x1, y1] = polygon[i - 1]
        let [x2, y2] = polygon[i]
        let dx = x2 - x1
        let dy = y2 - y1

        planes.push({
          width: Math.hypot(dx, dy),
          height,
          transform: [{
            x: x1 + 0.5 * dx,
            z: y1 + 0.5 * dy,
            ry: deg(-Math.atan2(dy, dx))
          }]
        })
      }
    }

    return {planes}
  }
}
