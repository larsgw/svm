'use strict'

class WebViewer {
  constructor (source, config) {
    this.source = source
    this.config = Object.assign({
      zoom: 1,
      defaultCamera: {x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, sc: 1}
    }, config)
  }
  
  static parseCamera (camera, zoom) {
    const cm = 37.8
    
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
    
    return {transform, rotate}
  }
  
  camera (camera, animate) {
    switch (this.config.method) {
      case 'html':
      default:
        const $containerR = this.element.find('.svm-container-rotate'),
              $containerT = this.element.find('.svm-container-transform'),
              method = animate ? 'transition' : 'css',
              {transform, rotate} = this.currentCamera = WebViewer.parseCamera(camera)
        
        $containerT[method](transform, animate)
        $containerR[method](rotate, animate)
        break
    }
  }
  
  moveCamera (dCamera, animate) {
    const {
      {x, y, z},
      {
        rotateZ,
        rotateX,
        rotateY,
        scale
      }
    } = this.currentCamera
    
    const {
      {x: dX, y: dY, z: dZ},
      {
        rotateZ: dRotateZ,
        rotateX: dRotateX,
        rotateY: dRotateY,
        scale: dScale
      }
    } = WebViewer.parseCamera(dCamera)
    
    const camera = {
      x: x + dX,
      y: y + dY,
      z: z + dZ,
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
    
    /*var mov = {},
    slidewidth = 512,
    slideheight = 288,
    zoom = 1

var $document = $(document),
    $window = $(window),
    $body,
    $rotateContainer,
    $translateContainer

var classes = {
  slideActive: 'active-slide',
  dotActive: 'active-dot'
},
    selectors = {
  slide: '.slide-container',
  slideActive: '.slide-container.' + classes.slideActive,
  slideViewable: '.slide-container:not([data-slide-type="html"])',
  dot: '.dot',
  dotActive: '.dot.' + classes.dotActive,
  dotViewable: '.dot:not(.hide)'
}

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

function updateScale (element, factor) {
  var magnitude = (Math.log(parseFloat(element.css('scale'))) / Math.log(2)) + factor
  
  element.css('scale', Math.pow(2, magnitude).toString())
}

function updateFrame () {
  if (mov.k) $rotateContainer.css('rotateX', '-=1')
  if (mov.i) $rotateContainer.css('rotateX', '+=1')
  if (mov.j) $rotateContainer.css('rotateY', '+=1')
  if (mov.l) $rotateContainer.css('rotateY', '-=1')
  if (mov.z) $rotateContainer.css('rotate' , '+=1')
  if (mov.x) $rotateContainer.css('rotate' , '-=1')
  
  var movementSpeed = 7 / $rotateContainer.css('scale')
  
  if (mov.w) $translateContainer.css('z', '+=' + movementSpeed)
  if (mov.s) $translateContainer.css('z', '-=' + movementSpeed)
  if (mov.a) $translateContainer.css('x', '+=' + movementSpeed)
  if (mov.d) $translateContainer.css('x', '-=' + movementSpeed)
  if (mov.r) $translateContainer.css('y', '+=' + movementSpeed)
  if (mov.f) $translateContainer.css('y', '-=' + movementSpeed)
  
  if (mov.t) updateScale($rotateContainer, 0.03)
  if (mov.g) updateScale($rotateContainer,-0.03)
}

function switchSlide (nextSlide, nextDot, preventCallback) {
  var currentSlide = $(selectors.slideActive),
      currentDot = $('.active-dot')
  
  var duration = 1000,
      position = nextSlide.data('position').split(' ').map(parseFloat),
      effect = nextSlide.data('effect')
  
  if (modelIs3d) {
    $(selectors.slide).removeClass('path')
    
    $translateContainer.transition({
      x: -position[0] - slidewidth,
      y: -position[1] - slideheight,
      z: -position[2]
    }, duration)
    
    $rotateContainer.transition({
      rotateX: -position[3],
      rotateY: -position[4],
      rotate : -position[5],
      scale  :  position[6] !== 0 ? zoom / position[6] : position[6]
    }, duration)
  } else if (effect) {
    currentSlide.effect(effect, 'swing', duration, function () {
      currentSlide.css('display', 'block')
    })
  }
  
  if (!preventCallback) {
    setTimeout(function () {
      var videos = nextSlide.find('video')
      if (videos.length) {
        videos.get(0).currentTime = 0
        videos.get(0).play()
      }
      
      var moveData = nextSlide.data('move-data')
      if (moveData) {
        moveData = moveData.split(';').map(function (value) { return value.split(',') })
        moveData.forEach(function (value) {
          if (['addClass'].indexOf(value[1]) > -1) {
            $(value[0])[value[1]](value[2])
          } else {
            var object = {}
            object[value[1]] = value[2]
            $(value[0]).transition(object, 800)
          }
        })
      }
    }, duration)
  }
  
  currentSlide.removeClass(classes.slideActive)
  nextSlide.addClass(classes.slideActive)
  currentDot.removeClass(classes.dotActive)
  nextDot.addClass(classes.dotActive)
}

// next slide handeler
function nextSlide () {
  var $slideActive = $(selectors.slideActive),
      video = $slideActive.find('video')
  
  if (video.data('paused')) {
    video.get(0).play()
  } else {
    var slide = $slideActive.next(selectors.slideViewable),
        dot = $(selectors.dotActive).next(selectors.dotViewable)
    
    if (slide.length === 0) {
      firstSlide()
    } else {
      switchSlide(slide, dot)
    }
  }
}

// first slide handeler
function firstSlide () {
  var slide = $(selectors.slideViewable).first(),
      dot = $(selectors.dotViewable).first()
  
  switchSlide(slide, dot)
}

// last slide handeler
function lastSlide () {
  var slide = $(selectors.slideViewable).last(),
      dot = $(selectors.dotViewable).last()
  
  switchSlide(slide, dot)
}

// prev slide handeler
function prevSlide () {
  var slide = $(selectors.slideActive).prev(selectors.slideViewable),
      dot = $(selectors.dotActive).prev(selectors.dotViewable)
  
  if (slide.length === 0) {
    lastSlide()
  } else {
    switchSlide(slide, dot)
  }
}

// current slide handeler
function currentSlide() {
  var slide = $(selectors.slideActive),
      dot = $(selectors.dotActive),
      video = slide.find('video')
  
  if (video.length) {
    video.get(0).currentTime = 0
    video.get(0).play()
  }
  
  switchSlide(slide, dot, true)
}

// random slide handeler (read: go to slide on the press of a button)
function randSlide () {
  var index = $(this).index(),
      slide = $(selectors.slide).eq(index),
      dot = $(selectors.dot).eq(index)
  
  switchSlide(slide, dot)
}

$document.on('ready', function () {
  $body = $('body')
  $rotateContainer = $('.rotate-container')
  $translateContainer = $('.slides')
  
  //BEGIN KEY CONTROLS
  $body.keydown(function (e) {
    var key = getKey(e.keyCode)
    
    if (typeof key === 'string') mov[key] = 1    // alphanumerical
    
    // Handeling
    if (key === 34 ||
        key === 37) prevSlide()                  // < or Pg down 
    if (key === 32 ||
        key === 33 ||
        key === 39) nextSlide()                  // > or Pg up or space 
    if (key === 36 ||
        key === 40) firstSlide()                 // ∨ or Home 
    if (key === 35 ||
        key === 38) lastSlide()                  // ∧ or End 
    
    if (mov.ctr) {                               // ctr
      if (mov.shft) {                            // ctr + shift
        if (mov['h']) {                          // ctr + shift + H
          hideHUD(!mov.hud)
          mov.hud = !mov.hud * 1
        }
        if (mov['p']) printShow()                // ctr + shift + P
        
        if (mov['1']) showXs(!showXs())          // ctr + shift + 1 TODO add this
        if (mov['2']) $('#toggle-bar').toggle()  // ctr + shift + 2 TODO add this
        if (mov['3']) $window.resize()           // ctr + shift + 3 TODO Add align
      } else {                                   // ctr
      }
    } else {
      if (mov['q']) currentSlide()               // Q
    }
  })
   
  $body.keyup(function (e) {
    var key = getKey(e.keyCode)
    
    if (typeof key === 'string') mov[key] = 0
  })
  //END
  
  //BEGIN MOUSE CONTROLS
  var mouseDown = false,
      originalPos = null
  
  $body.on('mousedown', function (e) {
    e.preventDefault()
    mouseDown = true, originalPos = { x: e.pageX, y: e.pageY }
  })
  
  $body.on('mouseup', function () { mouseDown = false })
  
  $body.on('mousemove', function(e) {
    if (mouseDown) {
      $rotateContainer.css('rotateX', '+=' + ((originalPos.y - e.pageY) * 0.3))
      $rotateContainer.css('rotateY', '+=' + ((e.pageX - originalPos.x) * 0.3))
      
      originalPos = {x: e.pageX, y: e.pageY}
    }
  })
  
  $body.on('mousewheel', function (e) {
    updateScale($rotateContainer, 0.25 * Math.sign(e.deltaY))
  })
  //END
})

$window.on('load', function () {
  $(selectors.slide).filter(':first-child').addClass(classes.slideActive)
  $(selectors.dot).filter(':first-child').addClass(classes.dotActive)
  $(selectors.dot).click(randSlide)
  
  $(selectors.slide).filter('[data-model-url]').each(function (_, elm) {
    var $this = $(this)
    $this.load($this.data('model-url'))
  })
  $(selectors.slide).find('video').each(function (_, elm) {
    var $elm = $(elm)
    
    $elm.data('paused','')
    
    if ($elm.is('[data-media-loop]')) {
      $elm.on('ended', function () {
        $elm.data('paused','')
        this.currentTime = parseFloat($elm.data('media-loop'))
        this.play()
      })
    } else {
      $elm.on('ended', function () {
        $elm.data('paused','')
        this.pause()
        this.currentTime -= 0.1
      })
    }
    if ($elm.is('[data-media-steps]')) {
      var steps = $elm.data('media-steps').toString().split(',').map(parseFloat)
      
      $elm.on('timeupdate', function () {
        var time = parseInt(this.currentTime, 10),
            $this = $(this)
        
        if (steps.indexOf(time) > -1 && $this.data('paused') !== time.toString()) {
          $this.data('paused', time.toString())
          this.pause()
        }
      })
    }
  })
  
  currentSlide()
  setInterval(updateFrame, 10)
})*/
  })
})
