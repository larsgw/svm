export function polygon ({sides, radius}) {
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

export function pyramid ({sides, radius, height}) {
  let data = polygon({sides, radius})
  data.inclination = Math.atan2(data.inscribedRadius, height)
  data.sideHeight = Math.hypot(height, data.inscribedRadius)
  return data
}
