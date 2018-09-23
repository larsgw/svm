import {mat4, vec3, vec4, quat} from 'gl-matrix'

vec3.fromSvmTranslate = function ({x = 0, y = 0, z = 0}) {
  return vec3.fromValues(x, y, z)
}

vec3.fromSvmScale = function ({scale = 1, scaleX: x = scale, scaleY: y = scale, scaleZ: z = scale}) {
  return vec3.fromValues(x, y, z)
}

mat4.fromSvmTransform = function (transform) {
  let out = mat4.create()

  mat4.translate(out, out, vec3.fromSvmTranslate(transform))
  mat4.rotateZ(out, out, rad(transform.rz || 0))
  mat4.rotateX(out, out, rad(transform.rx || 0))
  mat4.rotateY(out, out, rad(transform.ry || 0))
  mat4.scale(out, out, vec3.fromSvmScale(transform))

  return out
}

mat4.toCss = function (transform) {
  return `matrix3d(${transform.join(',')})`
}

export {mat4 as matrix, vec3 as vector, mat4, vec3, vec4, quat}

export const deg = rad => 180 * rad / Math.PI
export const rad = deg => Math.PI * deg / 180
export const round = (num, dec = 0) => Math.round(num * (10 ** dec)) / (10 ** dec)
