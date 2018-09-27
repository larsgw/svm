import * as geo from './geometry'
import * as gl from './matrix'
import * as svg from './svg/'

export {geo, gl, svg}

export const deg = rad => 180 * rad / Math.PI
export const rad = deg => Math.PI * deg / 180
export const round = (num, dec = 0) => Math.round(num * (10 ** dec)) / (10 ** dec)
