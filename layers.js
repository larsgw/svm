var toggle3d = function (a) {
  var f = a.find('div[role="root"][data-name]')
  
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
    
    h.append('<ul>' + t($b, [k]) + '</ul>')
  })

  $('input.layer').unbind('change').change(function(){
    var j = $(this).val()
    $('#V .slider .slide.html').find(j).toggle()
  })
}
