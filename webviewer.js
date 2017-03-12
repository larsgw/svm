'use strict'

class WebViewer {
  constructor (source, config) {
    this.source = source
    this.config = Object.assign({
      zoom: 1,
      defaultCamera: {x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, sc: 1}
    }, config)
  }
  
  static parseCamera (camera) {
    const cm = 37.8
    
    if (camera.x && camera.x.slice && camera.x.slice(-2) === 'cm') {
      camera.x = parseFloat(camera.x) * cm
    }
    if (camera.y && camera.y.slice && camera.y.slice(-2) === 'cm') {
      camera.y = parseFloat(camera.y) * cm
    }
    if (camera.z && camera.z.slice && camera.z.slice(-2) === 'cm') {
      camera.z = parseFloat(camera.z) * cm
    }
    
    const transform = {
      x: parseFloat(camera.x) || 0,
      y: parseFloat(camera.y) || 0,
      z: parseFloat(camera.z) || 0
    }
    const rotate = {
      rotateZ: parseFloat(camera.rz) || 0,
      rotateX: parseFloat(camera.rx) || 0,
      rotateY: parseFloat(camera.ry) || 0,
      scale: parseFloat(camera.sc) || 1
    }
    
    return {transform, rotate}
  }
  
  camera (camera, animate) {
    switch (this.config.method) {
      case 'html':
      default:
        this.currentCamera = WebViewer.parseCamera(camera)
        
        const $containerR = this.element.find('.svm-container-rotate'),
              $containerT = this.element.find('.svm-container-transform'),
              method = animate ? 'transition' : 'css',
              {transform, rotate} = JSON.parse(JSON.stringify(this.currentCamera))
        
        transform.x *= -1
        transform.y *= -1
        transform.z *= -1
        rotate.rotateZ *= -1
        rotate.rotateX *= -1
        rotate.rotateY *= -1
        rotate.scale = this.config.zoom / rotate.scale
        
        $containerT[method](transform, animate)
        $containerR[method](rotate, animate)
        break
    }
  }
  
  moveCamera (dCamera, animate) {
    const {
      transform: {x, y, z},
      rotate: {
        rotateZ,
        rotateX,
        rotateY,
        scale
      }
    } = this.currentCamera
    
    const {
      transform: {x: dX, y: dY, z: dZ},
      rotate: {
        rotateZ: dRotateZ,
        rotateX: dRotateX,
        rotateY: dRotateY,
        scale: dScale
      }
    } = WebViewer.parseCamera(dCamera)
    
    const camera = {
      x: x + dX, y: y + dY, z: z + dZ,
      rz: rotateZ + dRotateZ,
      rx: rotateX + dRotateX,
      ry: rotateY + dRotateY,
      sc: scale * dScale
    }
    
    this.camera(camera, animate)
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
    
    const camera = Object.assign(
      {},
      this.config.defaultCamera,
      this.source.cameras[this.source.current]
    )
    
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
    
    const mov = {},
          $body = $('body'),
          $rotateContainer = $('.svm-container-rotate')
    
    function getKey (index) {
      if (index >= 48 && 57 >= index) {
        return '0123456789'[index - 48]
      } else if (index >= 65 && 90 >= index) {
        return 'abcdefghijklmnopqrstuvwxyz'[index - 65]
      } else if (index === 16) {
        return 'shft'
      } else if (index === 17) {
        return 'ctr'
      } else {
        return index
      }
    }

    const getNewScale = (old, factor) => Math.pow(2, Math.log2(old) + factor)

    function updateFrame () {
      const diff = {}
      
      if (mov.k) diff.rx = -2
      if (mov.i) diff.rx =  2
      if (mov.j) diff.ry = -2
      if (mov.l) diff.ry =  2
      if (mov.z) diff.rz = -2
      if (mov.x) diff.rz =  2
      
      const movementSpeed = 14 * viewer.currentCamera.rotate.scale
      
      if (mov.w) diff.z = -movementSpeed
      if (mov.s) diff.z =  movementSpeed
      if (mov.a) diff.x = -movementSpeed
      if (mov.d) diff.x =  movementSpeed
      if (mov.r) diff.y = -movementSpeed
      if (mov.f) diff.y =  movementSpeed
      
      if (mov.t) diff.sc = getNewScale(viewer.currentCamera.rotate.scale, 0.03)
      if (mov.g) diff.sc = getNewScale(viewer.currentCamera.rotate.scale,-0.03)
      
      viewer.moveCamera(diff)
    }
    
    const nextSlide    = () => viewer.switchCamera('next'   , 500),
          firstSlide   = () => viewer.switchCamera('first'  , 500),
          lastSlide    = () => viewer.switchCamera('last'   , 500),
          prevSlide    = () => viewer.switchCamera('prev'   , 500),
          currentSlide = () => viewer.switchCamera('current', 500),
          randSlide    = function () { viewer.switchCamera($(this).index(), 500) }

    //BEGIN KEY CONTROLS
    $body.keydown(function (e) {
      const key = getKey(e.keyCode)
      
      if (typeof key === 'string') mov[key] = 1    // alphanumerical
      
      // Handeling
      if (key === 34 ||
          key === 37) prevSlide()                  // < or Pg down 
      if (key === 32 ||
          key === 33 ||
          key === 39) nextSlide()                  // > or Pg up or space 
      if (key === 36 ||
          key === 40)firstSlide()                  // ∨ or Home 
      if (key === 35 ||
          key === 38) lastSlide()                  // ∧ or End 
      
      if (mov.ctr) {                               // ctr
        if (mov.shft) {                            // ctr + shift
          if (mov['1']) $('.svm-axis').toggle()    // ctr + shift + 1
          if (mov['2']) $('#toggle-bar').toggle()  // ctr + shift + 2
        } else {                                   // ctr
        }
      } else {
        if (mov['q']) currentSlide()               // Q
      }
    })
    
    $body.keyup(function (e) {
      const key = getKey(e.keyCode)
      
      if (typeof key === 'string') mov[key] = 0
    })
    //END
    
    //BEGIN MOUSE CONTROLS
    let mouseDown = false,
        originalPos = null
    
    $body.on('vmousedown', function (e) {
      e.preventDefault()
      mouseDown = true, originalPos = { x: e.pageX, y: e.pageY }
    })
    
    $body.on('vmouseup', function () { mouseDown = false })
    
    $body.on('vmousemove', function (e) {
      if (mouseDown) {
        viewer.moveCamera({
          rx: ((originalPos.y - e.pageY) * -.3),
          ry: ((e.pageX - originalPos.x) * -.3)
        })
        originalPos = {x: e.pageX, y: e.pageY}
      }
    })
    
    $body.on('mousewheel', function (e) {
      const scale = getNewScale(viewer.currentCamera.rotate.scale, -.3 * e.deltaY)
      viewer.moveCamera({sc: scale / viewer.currentCamera.rotate.scale})
    })
    //END
    
    setInterval(updateFrame, 50)
  })
})
