'use strict'

class WebViewer {
  constructor (source, config) {
    this.source = source
    this.config = Object.assign({
      zoom: 1,
      defaultCamera: {x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, sc: 1}
    }, config)
    
    this.const = {
      cm: 37.8
    }
  }
  
  camera (camera, animate) {
    switch (this.config.method) {
      case 'html':
      default:
        const $containerR = this.element.find('.svm-container-rotate'),
              $containerT = this.element.find('.svm-container-transform'),
              method = animate ? 'transition' : 'css'
        
        if (camera.x && camera.x.slice(-2) === 'cm') {
          camera.x = parseFloat(camera.x) * this.const.cm
        }
        if (camera.y && camera.y.slice(-2) === 'cm') {
          camera.y = parseFloat(camera.y) * this.const.cm
        }
        if (camera.z && camera.z.slice(-2) === 'cm') {
          camera.z = parseFloat(camera.z) * this.const.cm
        }
        
        const transform = {
          x: -parseFloat(camera.x),
          y: -parseFloat(camera.y),
          z: -parseFloat(camera.z)
        }
        const rotate = {
          rotateZ: -parseFloat(camera.rz),
          rotateX: -parseFloat(camera.rx),
          rotateY: -parseFloat(camera.ry),
          scale: this.config.zoom / parseFloat(camera.sc)
        }
        
        $containerT[method](transform, animate)
        $containerR[method](rotate, animate)
        break
    }
  }
  
  switchCamera (num, animate) {
    switch (num) {
      case 'next':
        if (!(++this.source.current < this.source.cameras.length)) {
          return this.switchCamera('first', animate)
        }
        break
      
      case 'prev':
        this.source.current--
        if (!(--this.source.current >= 0)) {
          return this.switchCamera('last', animate)
        }
        break
      
      case 'first':
        this.source.current = 0
        break
      
      case 'last':
        this.source.current = this.source.cameras.length - 1
        break
      
      case 'current':
        break
      
      default:
        this.source.current = num
        break
    }
    
    const camera = Object.assign({},
      this.config.defaultCamera, this.source.cameras[this.source.current])
    
    this.camera(camera, animate)
  }
  
  getHTML (source, config) {
    const frame = $('<div>', {class: 'svm-frame'}),
          containerR = $('<div>', {class: 'svm-container-rotate'}),
          containerT = $('<div>', {class: 'svm-container-transform'}),
          models = [],
          axes = [],
          loadedModels = Array(source.models.length).fill(false)
    
    containerR.css('perspective', this.source.perspective)
    
    for (let model of source.models) {
      const pos = model.pos = Object.assign({},
        this.config.defaultCamera, model.pos)
      
      const html = $('<div>', {
        class: 'svm-model',
        style: `transform:
          translate3d(${pos.x},${pos.y},${pos.z})
          rotateZ(${pos.rz}deg) rotateX(${pos.rx}deg)
          rotateY(${pos.ry}deg) scale(${pos.sc})
        ;`
      })
      
      html.load(model.src, function () {
        loadedModels[source.models.indexOf(model)] = true
        const loaded = loadedModels
          .reduce(function (a, b) {return a && b})
        
        if (loaded) {
          toggle3d($('.svm-model'))
        }
      })
      models.push(html)
    }
    
    axes[0] = $('<div>', {class: 'svm-axis svm-axis-x'})
    axes[1] = $('<div>', {class: 'svm-axis svm-axis-y'})
    axes[2] = $('<div>', {class: 'svm-axis svm-axis-z'})
    
    containerT.append.apply(containerT, models)
    containerR.append.apply(containerR, axes)
    containerR.append(containerT)
    frame.append(containerR)
    
    return frame
  }
  
  view (element = $('body')) {
    if (!$(`link[href="${this.config.css}"]`).length) {
      $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: this.config.css
      }).appendTo('head')
    }
    
    if (this.element) {
      this.element.remove()
      delete this.element
    }
    
    switch (this.config.method) {
      case 'html':
      default:
        this.element = this.getHTML(this.source, this.config)
        element.append(this.element)
        this.switchCamera('current')
        return element
    }
  }
}
let viewer
$(function(){
  const config = {
    css: 'webviewer.css',
    method: 'html'
  }
  
  $.getJSON('svm-dev.json', function (data) {
    /*const*/ viewer = new WebViewer(data, config)
    viewer.view()
  })
})
