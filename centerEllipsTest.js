const q = v => Math.pow(v,2)
const g = {
  deg: v => v * 180 / Math.PI,
  rad: v => v * Math.PI / 180
}
const range = n => Array(n).fill(null).map((_, i) => i)

const ellipseRadius = function ([rx, ry], a) {
  const vA = rx * ry
        vB = q(rx * Math.sin(a)) + q(ry * Math.cos(a)),
        vC = Math.sqrt(vB)
  
  return vA / vC
}

const rotatePoint = function ([xA, yA], a) {
  const b = Math.atan2(yA, xA) - a,
        d = Math.sqrt(q(xA) + q(yA))
  
  const xB = Math.cos(b) * d,
        yB = Math.sin(b) * d
  
  return [xB, yB]
}

const getPolyLine = function ([rx, ry], rot, arc, neg, [xB, yB], [xA, yA], [xM, yM]) {
  const dxA = xA - xM,
        dyA = yA - yM,
        dxB = xB - xM,
        dyB = yB - yM
  
  const aA = Math.atan2(dyA, dxA),
        aB = Math.atan2(dyB, dxB),
        a = !arc ? aB - aA : (Math.PI * 2 - Math.abs(aB - aA)) * (neg ? -1 : 1)
  
  const n = 20,
        step = a / n
  
  const points = range(n).map((v) => {
    const i = arc ? v + 1 : v + 1
    
    const b = aA + i * step,
          d = ellipseRadius([rx, ry], b - rot)
    
    const x = xM + Math.cos(b) * d,
          y = yM + Math.sin(b) * d
    
    return [x, y]
  })
  
  return [[xA, yA]].concat(points)
}

const calculateCenter = function ([rx, ry], rot, arc, neg, B, A) {
  const [xA, yA] = rotatePoint(A, rot),
        [xB, yB] = rotatePoint(B, rot)
  
  const dx = xB - xA,
        dy = yB - yA,
        R  = ry / rx
  
  const dxR= dx * R,
        dR = Math.sqrt(q(dxR) + q(dy)),
        rR = Math.sqrt(q(ry) - q(dR / 2))
  
  const a  = Math.atan2(dxR, dy) + Math.PI * !neg
  
  const xM = (xA + xB) / 2 - Math.cos(a) * rR / R,
        yM = (yA + yB) / 2 + Math.sin(a) * rR
  
  return rotatePoint([xM, yM], -rot)
}

const tests = [
  [[4, 2], 0, 0, 0, [3, 2], [0, 1]],
  [[4, 2], 45, 0, 0, [3, 2], [0, 1]],
  [[4, 2], 90, 0, 1, [3, 2], [0, 1]],
  [[4, 2], 135, 1, 0, [3, 2], [0, 1]],
//   [[4, 2], 0, 0, 0, [0, 1], [3, 2]],
//   [[4, 2], 0, 0, 0, [3, 1], [0, 2]],
//   [[4, 2], 0, 0, 0, [0, 2], [3, 1]],
//   [[2.5, 2.5], 0, 0, 0, [0, 2], [3, 1]],
//   [[3, 3], 0, 0, 0, [3, 2], [0, 1]]
]

const colors = [
  'black',
  'red',
  'blue',
  'green', 
  'orange',
  'purple',
  'magenta',
  'yellow',
  'grey'
]

const f = 50,
      l = true//tests.length <= 2

$(()=>{

  const $body = $('body')

  tests.forEach(([[rx, ry], rot, arc, neg, [xB, yB], [xA, yA]], i) => {
    rx*=f,ry*=f,xA*=f,yA*=f,xB*=f,yB*=f
    
    const [xM, yM] = calculateCenter([rx, ry], g.rad(rot), arc, neg, [xB, yB], [xA, yA]),
          color = colors[i % colors.length]
    
    const polyLine = getPolyLine([rx, ry], g.rad(rot), arc, neg, [xB, yB], [xA, yA], [xM, yM]),
          arcPath = polyLine.map(([x, y], i) => `${!i ? 'M' : 'L'}${x} ${y}`).join(' ')
    
    let labels
    if (l) {
      labels =
        `<circle r="2" cx="${xA}" cy="${yA}" fill="${color}" />
        <text x="${xA + 5}" y="${yA + 15}" fill="${color}">A</text>
        <circle r="2" cx="${xB}" cy="${yB}" fill="${color}" />
        <text x="${xB + 5}" y="${yB + 15}" fill="${color}">B</text>
        <circle r="2" cx="${xM}" cy="${yM}" fill="${color}" />
        <text x="${xM + 5}" y="${yM + 15}" fill="${color}">M</text>`
    }
    
    $body.append(`
    <svg height="800" viewBox="0 0 800 800" width="800">
      <g style="transform:translate(400px,400px)">
        
        <ellipse fill="transparent" stroke="${color}" stroke-dasharray="20 10"
          transform="rotate(${rot}, ${xM}, ${yM})"
          cx="${xM}" cy="${yM}"
          rx="${rx}" ry="${ry}"/>
        
        ${labels}
        
        <path fill="transparent" stroke="${color}" d="
          M${xA} ${yA}
          A${rx} ${ry},${rot},${+!arc},${arc?neg:+!neg},${xB} ${yB}
        "></path>
        
        <path fill="transparent" stroke-width="2" stroke="${color}" d="${arcPath}"></path>
        
      </g>
      
    </svg>
    `)//
  })

})