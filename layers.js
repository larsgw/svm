var toggle3d = function (a) {
  var f = a.find('div[role="root"][data-name]')
  
  var v = {}
  
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
    var $b= $(b)
        k = $b.data('name') || 'unnamed',
        h = $('<form><p><b>'+k+'</b></p></form>').appendTo('#toggle-bar')
    
    v[k] = {
      elm: $b.find('div, svg').length,
      div: $b.find('div').length,
      path: $b.find('svg').length
    }
    
    h.append('<ul>' + t($b, [k]) + '</ul>')
  })
  
  var tot = 0
  var msg = Object.keys(v).map(function (k) {
    var o = v[k],
        h = k + '\n\tTotal: ' + o.elm + '\n\tDiv: ' + o.div + '\n\tSVG: ' + o.path
      
    tot += o.elm
    
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
    tot < 
    'red'
  
  console.log(
    '%cSVM Render report' + '\n\n' +
    '%cTotal: ' + tot + '\n\n' +
    '%c' + ' '.repeat(tot/16) + '%c' + ' '.repeat(25-tot/16) + '%c'
    + '\n\n' + msg,
    'background:black;color:white;',
    'background:transparent;color:rgb(48, 57, 66);',
    'background:' + color + ';',
    'background:#ccc;',
    'background:transparent'
  )

  $('input.layer').unbind('change').change(function(){
    var j = $(this).val()
    $('#V .slider .slide.html').find(j).toggle()
  })
}
