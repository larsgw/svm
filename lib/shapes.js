const parseStandardAttributes = function ({
  x = 0, y = 0, z = 0,
  rx = 0, ry = 0, rz = 0,
  scale = 1
}) {
  return `
    transform:translate3d(${x}px,${y}px,${z}px)
    rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry}deg)
    scale3d(${scale},${scale},${scale});
  `
}
const shape = {}

shape.CUBE = function (opt) {
  return `<div class="cube" style="
    ${parseStandardAttributes(opt)}
    --cuboid-width:${opt.width}px;
    --cuboid-height:${opt.height}px;
    --cuboid-depth:${opt.depth}px;
    --cuboid-color:${opt.color||''};
  ">
    <div class="bottom"></div><div class="back"></div><div class="front"></div><div class="left"></div><div class="right"></div><div class="top"></div>
  </div>`
}

shape.PRISM = function (opt) {
  let i = 0
  const pieceHeight = (6.98 * opt.radius) / opt.sides
  
  const max = 12
  opt.sides = opt.sides > max ? max : (opt.sides || max)
  
  return `<div class="cilinder" style="
    ${parseStandardAttributes(opt)}
    transform-origin:0 ${.5 * pieceHeight}px;
    --cilinder-components: ${opt.sides};
    --cilinder-color: ${opt.color};
    --cilinder-radius: ${opt.radius}px;
    --cilinder-height: ${opt.height}px;
  ">
    ${opt.hollow ? `` : `<div class="a1"></div><div class="a2"></div>`}
    ${`<div class="b%i"></div>`.repeat(opt.sides).replace(/%i/g, v => ++i)}
  </div>`
}

shape.SPHERE = function (opt) {
  const max = 12
  opt.sides = opt.sides > max ? max : (opt.sides || max)
  const pieceHeight = (6.98 * opt.radius) / opt.sides
  
  let result = ''
  
  for (let i = 0; i < opt.sides; i++) {
    result += shape.PRISM({
      sides: opt.sides,
      color: opt.color,
      rz: (i / opt.sides) * 360,
      y: pieceHeight * -.5,
      radius: opt.radius,
      height: pieceHeight,
      hollow: true
    })
  }
  
  return `<div class="sphere" style="${parseStandardAttributes(opt)}">${result}</div>`
}

module.exports = {shape}
