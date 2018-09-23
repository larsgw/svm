import {deg, rad} from '../math'

function polygon ({sides, radius}) {
  let step = 2 * Math.PI / sides
  let stepWidth = 2 * radius * Math.sin(0.5 * step)
  let inscribedRadius = Math.sqrt(radius ** 2 - (0.5 * stepWidth) ** 2)

  let relativePoints = []
  let points = []

  for (let i = 0; i < sides; i++) {
    let x = 0.5 + 0.5 * Math.sin(step * i)
    let y = 0.5 - 0.5 * Math.cos(step * i)
    relativePoints.push([x, y])
    points.push([x * radius, y * radius])
  }

  return {
    relativePoints,
    points,

    step,
    stepWidth,
    inscribedRadius
  }
}

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
    let polygonData = polygon({sides, radius})

    if (!open) {
      planes.push(
        {
          width: 2 * radius,
          height: 2 * radius,
          path: clipPath.polygon(polygonData.relativePoints),
          transform: [{
            y: 0.5 * height,
            rx: 90,
            rz: 180
          }]
        },
        {
          width: 2 * radius,
          height: 2 * radius,
          path: clipPath.polygon(polygonData.relativePoints),
          transform: [{
            y: -0.5 * height,
            rx: 90
          }]
        }
      )
    }

    let step = deg(polygonData.step)
    for (let i = 0; i < sides; i++) {
      planes.push({
        height,
        width: polygonData.stepWidth,
        transform: [
          {ry: (0.5 + i) * step + 180},
          {z: polygonData.inscribedRadius}
        ]
      })
    }

    return {planes}
  },

  pyramid ({sides, radius, height, hollow, open = hollow}) {
    let planes = []
    let polygonData = polygon({sides, radius})

    if (!open) {
      planes.push(
        {
          width: 2 * radius,
          height: 2 * radius,
          path: clipPath.polygon(polygonData.relativePoints),
          transform: [{
            y: 0.5 * height,
            rx: 90,
            rz: 180
          }]
        }
      )
    }

    let step = deg(polygonData.step)
    let inclination = deg(Math.atan2(polygonData.inscribedRadius, height))
    let sideHeight = Math.hypot(height, polygonData.inscribedRadius)

    for (let i = 0; i < sides; i++) {
      planes.push({
        height: sideHeight,
        width: polygonData.stepWidth,
        transform: [
          {ry: (0.5 + i) * step + 180},
          {z: 0.5 * polygonData.inscribedRadius, rx: inclination}
        ],
        path: clipPath.polygon([[0.5, 0], [1, 1], [0, 1]])
      })
    }

    return {planes}
  }
}
