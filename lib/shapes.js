const shape = {}

shape.CUBE = function (opt) {
  return `<div class="cube" style="
    --cuboid-width:${opt.width}px;
    --cuboid-height:${opt.height}px;
    --cuboid-depth:${opt.depth}px;
    --cuboid-color:${opt.color||''};
  ">
    <div class="bottom"></div><div class="back"></div><div class="front"></div><div class="left"></div><div class="right"></div><div class="top"></div>
  </div>`
}

module.exports = {shape}
