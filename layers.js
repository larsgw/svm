var toggle3d = function (a) {
  var f = a.find('div[role="root"][data-name]'),
      v = {}
  
  var u = function (s) {
    return '[data-name=\'' + s + '\']'
  }
  
  var t = function (c, k) {
    var o = ''
    
    c.children('div[role="group"]').each(function (_, m) {
      var $m = $(m),
          i = $m.data('name') || 'unnamed',
          n = k.slice()
      
      n.push(i)
      
      o += '<li>\
        <fieldset>\
          <input class="layer" checked type="checkbox"\
                value="' + n.map(u).join(' ') + '">\
          <label>' + i + '</label>\
        </fieldset>\
        <ul class="no-list-style">\
          ' + t($m, n) + '\
        </ul>\
      </li>'
    })
    
    return o
  }
  
  f.each(function (_, b) {
    var $b= $(b),
        k = $b.data('name') || 'unnamed',
        h = $('<form><p><b>'+k+'</b></p></form>').appendTo('#toggle-bar')
    
    v[k] = {
      group: $b.find('div[role=group]').length,
      shape: $b.find('> div[role=shape], div[role=group] > div[role=shape]').length,
      plane: $b.find('> div[role=plane], div[role=group] > div[role=plane]').length,
      curve: $b.find('> div[role=plane-curve], div[role=group] > div[role=plane-curve]').length,
      
      div: $b.find('div').length,
      path: $b.find('svg').length,
      elm: $b.find('div, svg').length
    }
    
    h.append('<ul>' + t($b, [k]) + '</ul>')
  })
  
  var tot = $('.svm-model *').length,
      com = 0
  
  var msg = Object.keys(v).map(function (k) {
    var o = v[k],
        h = k +
    '\n\tGroup: ' + o.group +
    '\n\tShape: ' + o.shape +
    '\n\tPlane: ' + o.plane +
    '\n\tCurve: ' + o.curve +
    '\n' +
    '\n\tDiv: ' + o.div +
    '\n\tSVG: ' + o.path +
    '\n\tTotal: ' + o.elm +
    '\n'
      
    com += o.elm
    
    return h
  }).join('\n')
  
  var color =
    tot < 50  ? 'blue' :
    tot < 100 ? 'green' :
    tot < 150 ? 'lime':
    tot < 200 ? '#bada55' :
    tot < 250 ? 'yellow' :
    tot < 300 ? 'gold' :
    tot < 350 ? 'orange' :
    tot < 400 ? 'darkorange' :
    'red'
  
  var count = tot < 400 ? tot / 16 : 25
  
  console.log(
    '%cSVM Render report' +
    '%c\n\nTotal: ' + tot + '\n\n' +
    '%c' + ' '.repeat(count) + '%c' + ' '.repeat(25 - count) +
    '%c\n\nCombined: ' + com + '\n\n' +
     msg,
    'background-color:black;color:white;',
    '',
    'background-color:' + color + ';',
    'background-color:#ccc;',
    ''
  )

  $('input.layer').unbind('change').change(function(){
    var j = $(this).val()
    $('.svm-frame > div > div > .svm-model').find(j).toggle()
  })
}
