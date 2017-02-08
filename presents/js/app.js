function printShow() {
  var win = window.open('','printwindow');
  win.document.open()
  win.document.write(
    '<html><head><title>Print the handout - '+document.title+'</title>'+
      '<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/default.min.css">'+
      '<link rel="stylesheet" type="text/css" href="css/bootstrap.css">'+
      '<link rel="stylesheet" type="text/css" href="css/standard.css">'+
      '<link rel="stylesheet" type="text/css" href="css/font.css">'+
      '<link rel="stylesheet" type="text/css" href="css/slides.css">'+
      '<link rel="stylesheet" type="text/css" href="css/theme.css">'+
    '</head><body>');
  var slides = $('.slider').clone();
  if(slides.hasClass('puzzleload')){
    var cnt = slides.find('.slides').contents();
    slides.find('.rotate-container').replaceWith(cnt);
    slides.find('.slide.none,.slide.html').remove();
  }
  win.document.write(slides.prop('outerHTML'));
  win.document.write('</body></html>');
  win.print();
  win.close();
}

function parseRichText(a) {
  var a=a
  //Inline
  .replace(/\*\*([^]*?)\*\*(?!\*)/g            , '<span>**</span><b>$1</b><span>**</span>')
  .replace(/__([^]*?)__(?!_)/g                 , '<span>__</span><u>$1</u><span>__</span>')
  .replace(/--([^]*?)--/g                      , '<span>--</span><s>$1</s><span>--</span>')
  .replace(/`([^]*?)`/g                        , '<span>`</span><code>$1</code><span>`</span>')
  .replace(/([^*]|^)\*([^* ]((\*\*|[^*])*[^*])?)\*(?=[^*]|$)/g,'$1<span>*</span><i>$2</i><span>*</span>')
  .replace(/([^_]|^)_([^_]((__|[^_])*[^_])?)_(?=[^_]|$)/g     ,'$1<span>_</span><sub>$2</sub><span>_</span>')
  .replace(/\^(.*?)\^/g                        , '<span>^</span><sup>$1</sup><span>^</span>')
  .replace(/\[\(c\)(?!<\/)([^]+?)\]\(c:(.+?)\)(?!<\/)/g, '<span>[(c)</span><abbr style="           color:$2">$1</abbr><span>](c:$2)</span>')
  .replace(/\[\(b\)(?!<\/)([^]+?)\]\(b:(.+?)\)(?!<\/)/g, '<span>[(b)</span><mark style="background-color:$2">$1</mark><span>](b:$2)</span>')
  .replace(/\[\(s\)(?!<\/)([^]+?)\]\(s:(.+?)\)(?!<\/)/g, '<span>[(s)</span><bdo  style="     font-size  :$2">$1</bdo ><span>](s:$2)</span>')
  .replace(/\[\(f\)(?!<\/)([^]+?)\]\(f:(.+?)\)(?!<\/)/g, '<span>[(f)</span><span style="     font-family:$2">$1</span><span>](f:$2)</span>')
  .replace(/\[(?!<\/)([^]+?)\]\((?![cbsf]:)(.+?)\)(?!<\/)/g, '<span>[</span><a href="$2">$1</a><span>]($2)</span>')
  // Lists
  .replace(/((?:\n|^)(?!(?:  )*\*).*\n)(?=\* .*(?:\n|$))/g      ,'$1<ul>' )
  .replace(/((?:\n|^)(?!(?:  )*\d\.).*\n)(?=\d\. .*(?:\n|$))/g  ,'$1<ol>' )
  .replace(/((?:\n|<[uo]l>|^)(?:  )*\* .*?(?:\n|$))(?!(?:  )*\* )/g     ,'$1</ul>')
  .replace(/((?:\n|<[uo]l>|^)(?:  )*\d\. .*?(?:\n|$))(?!(?:  )*\d\. )/g ,'$1</ol>')
  .replace(/(\n|<[uo]l>|^)((?:  )*(?:\*|\d\.) )(.*?)(?=\n<\/[uo]l>|\n(?:  )*(?:\*|\d\.) |$)/g,'$1<li><span>$2</span>$3</li>')
  // Tables
  .replace(/(\n\n|^)(?!.*\n\n)[^|]*(\|[^|]*)+(\n---+[^|]*(\|[^|]*?)+)+(?=\n\n|$)/g,function(m,a){
    return a +
	   '<table><tr><td>' +
	   m.replace(/^\n\n/g   ,''                                      )
	    .replace(/\|/g      ,'<span>|</span></td><td>'               )
	    .replace(/\n---+\n/g,'<span>\n---\n</span></td></tr><tr><td>') +
	   '</td></tr></table>'
  })
  // Code blocks
  .replace(/(^|(^|\n)(?!    ).*?\n)(?=    )/g,'$1<pre><code>')
  .replace(/((\n|^)    (?:.*?\n|$))(?!    )/g,'$1</code></pre>')
  .replace(/<pre><code>[\s\S]*?<\/code><\/pre>/g,function(m){
    return m.replace(/(\n|<pre><code>)    /g,'$1<span>    </span>')
  })
  // Headers
  .replace(/(\n|^)# (.*?)(?=\n|$)/g ,'$1<h2><span># </span>$2</h2>')
  .replace(/(\n|^)## (.*?)(?=\n|$)/g,'$1<h3><span>## </span>$2</h3>')
  // Cleaning empty tags
  .replace(new RegExp('('+
    '<span>\\*\\*<\\/span><b><\\/b><span>\\*\\*<\\/span>|'+
    '<span>__<\\/span><u><\\/u><span>__<\\/span>|'+
    '<span>*<\\/span><i><\\/i><span>*<\\/span>|'+
    '<span>--<\\/span><s><\\/s><span>--<\\/span>|'+
    '<span>_<\\/span><sub><\\/sub><span>_<\\/span>|'+
    '<span>\\^<\\/span><sup><\\/sup><span>\\^<\\/span>|'+
    '<span>`<\\/span><code><\\/code><span>`<\\/span>|'+
    '<span>\\[(\\([cbsf]\\))?<\\/span>('+
      '<a     href=".*?"><\\/a   >|'+
      '<mark style=".*?"><\\/mark>|'+
      '<bdo  style=".*?"><\\/bdo >|'+
      '<abbr style=".*?"><\\/abbr>|'+
      '<span style=".*?"><\\/span>'+
    ')<span>\\]\\(.*?\\)<\\/span>|'+
  ')','g'), '');
  return a;
}

function listToHTML(list){
  var res = '';
  var tmp = document.createElement("div");
  tmp.appendChild(parseNodes(list.items,list.type));
  res += tmp.innerHTML;
  return res;
}

function parseNodes(a,b) {
  var b = b || 'ul',
      ul = document.createElement(b);
      ul.className = 'list';
  for(var i=0;i<a.length;i++) {
    ul.appendChild(parseNode(a[i]));
  }
  return ul;
}

function parseNode(a) {
  var li = document.createElement("LI");
  if (typeof a === 'string') li.innerHTML = a;
  else {
    if(a.title) li.innerHTML = a.title;
    if(a.items) li.appendChild(parseNodes(a.items,a.type));
  }
  return li;
}

function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement :
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

function getTextFromHTML(a) {
  if (Array.isArray(a))
    return a.map(function(v){
      return v.innerText||v.textContent
    }).join('');
  
  else if (isElement(a))
    return a.innerText||a.textContent;
  
  else
    return '';
}

function stripHTMLTags(a){
  return getTextFromHTML($.parseHTML(a));
}

function getTitleContainer(a) {
  var slide = '';
  
  slide += '<div class="title-container">';
  
  if(a.title)
      slide += '<h1 data-content="' +
		 getTextFromHTML($.parseHTML(parseRichText(a.title))) +
	       '">' +
		 parseRichText(a.title) +
	       '</h1>';
  
  if(a.subtitle)
      slide+= '<h2>' +
		 parseRichText(a.subtitle) +
	       '</h2>';
  
  slide += '</div>';
  
  return slide;
}

function getTextContainer(a) {
  var slide='';
  
  slide += '<div class="text-container">';
  slide +=   '<div class="T-ts">';
  
  if(a.text){
    // Old version (for backwards compatibility)
    if (Array.isArray(a.text))
      for (var j=0;j<a.text.length;j++) slide += '<p>' + a.text[j] + '</p>';
    // New version
    else if (typeof a.text === 'string')
      slide += parseRichText(a.text);
  }
  
  if(a.list)
    slide+='<ul>'+listToHTML(a.list)+'</ul>';
  
  if(a.html)
    slide+=a.html;
  
  slide +=   '</div>';
  slide += '</div>';
  
  return slide;
}

function getMediaContainer(elm,embed) {
  var slide = '<div class="media-container">';
  if(elm.elm&&!embed){ for(var l=0;l<elm.elm.length;l++){
      var a ='',
          b='',
          c=elm.elm[l];
      
      slide+='<figure style="';
      slide+=c.h?'height:'+c.h+';':'';
      slide+=c.w?' width:'+c.w+';':'';
      slide+='">';
      
      switch(c.type){
	case 'img'  :
	case 'video':
	  a=c.type,
	  b=' />';
	  break;
	case 'iframe':
	  a='iframe',
	  b='>This cannot be displayed</iframe>';
	  break;
	default:
	  a='embed',
	  b=' />';}
	
      slide+='<'+a;
      if (c.h) slide+=' height="'+c.h+'"';
      if (c.w) slide+='  style="width:'+c.w+'"';
      if (c.c) slide+='  class="'+c.c+'"';
      if (c.p) slide+=' poster="'+c.p+'"';
      slide+=' src="'+(c.src||'https://placehold.it/300x150')+'" '+b;
	
      if(c.caption)
	slide+='<figcaption>'+c.caption+'</figcaption>';
      
      slide += '</figure>'
  }}
  slide += '</div>';
  
  return slide;
}

function parseSlide(slideshow,i,embed){
  var type=slideshow.type||'normal',
      puzzle=type==='puzzle',
      style=puzzle?slideshow.style||'dev2':slideshow.style||'normal',
      elm = slideshow.slides[i],
      kind = elm.kind || 'dia',
      bhid = elm.bhid || ' ',
      slide = '<div class="slide '+kind+' '+bhid+'" ';
      
      elm.type=elm.type||'default',
      elm.pos=elm.pos||{},
      elm.pos.x=elm.pos.x||0,
      elm.pos.y=elm.pos.y||0,
      elm.pos.z=elm.pos.z||0,
      elm.pos.rx=elm.pos.rx||0,
      elm.pos.ry=elm.pos.ry||0,
      elm.pos.rz=elm.pos.rz||0,
      elm.pos.sc=elm.pos.sc||1;
  
  if(puzzle)slide += ' style="transform:translate3d('+elm.pos.x+','+elm.pos.y+','+elm.pos.z+') rotateZ('+elm.pos.rz+'deg) rotateX('+elm.pos.rx+'deg) rotateY('+elm.pos.ry+'deg) scale('+elm.pos.sc+')"';
  slide += ' data-idx="'+i+'"';
  
  slide += elm.type ? ' data-slide-type="' + elm.type + '"' : '' ;
  slide += ' data-slide-style="' + style + '"';
    
  if (elm.effect) slide += ' data-slide-effect="' + elm.effect + '"';
  else if (slideshow.effect) slide += ' data-slide-effect="' + slideshow.effect + '"';
  
  slide += '>';
  
  switch (elm.type) {
      
    case 'html':
      if (!embed) {
	     if (elm.content   ) slide +=  elm.content;
	else if (elm.contenturl) slide += '<div class="content-replace" data-content-url="'+elm.contenturl+'"></div>';
      }
      break;
      
    case 'none':
      // Just makes a frame to view the presentation, no actual content
      break;

    case 'text-2':
      slide += getTitleContainer(elm.title?elm:elm.con[0]) +
              '<div class="slide-container">' +
                getTextContainer(elm.con[0]) +
                getTextContainer(elm.con[1]) +
              '</div>';
      break;
      
    default:
      slide += getTitleContainer(elm) +
              '<div class="slide-container">' +
                getTextContainer(elm) +
                getMediaContainer(elm,embed) +
              '</div>';
      break;
  
  }
  
  // Background-image: The Hard Way (for embed, iframe and video as background)
  
  if(elm.bgr&&!embed){
    var a='',b='',c=elm.bgr;
    slide+='<div class="background">';
    switch(c.type){
      case 'img':case 'video':a=c.type,b=' />';break;
      case 'iframe':a='iframe',b='>This cannot be displayed</iframe>';break;
      default: a='embed',b=' />';}
    if(c.src)slide+='<'+a+' src="'+c.src+'"'+b;
    slide+='</div>';
  }
  
  // End
  
  slide += '</div>';
  
  return slide;
}

function showXs (bool) {
  if (bool===undefined)
    return xs
  else {
    if (bool)
      $('.axis').show()
    else if (!bool)
      $('.axis').hide()
    
    xs=!xs
  }
}

function goTo(id) {
  id = id.charAt(0).toUpperCase();
  if(!$('#'+id).hasClass('S-as')){
    $('.T-s   ').fadeOut().removeClass('S-as');
    $( '#' + id).fadeIn ().   addClass('S-as');
    switch(id){
      case 'view':case 'V':
	$('#T section:contains("Presentation")').removeClass('S-d S-c');
	break;
      case 'edit':case 'E':break;
      default:
	$('#T section:contains("Presentation")').   addClass('S-d       ');
	document.title='Presentatie';
	break;
    }
  }
}

jQuery.fn.extend({
  ripple:function(n){
    return $(this).addClass('C-r').on(n||'mousedown',function(e){
      if(!$(this).hasClass('tile')||e.target==this){
        var b = $(this),
            t = $('<div class="C-re"></div>'),
            o = b.offset(),
            x = e.pageX - o.left,
            y = e.pageY - o.top,
            d = b.outerHeight(),
            r = d / 2;
        t.css({
          height:d     + 'px',
          width :d     + 'px',
          top   :y - r + 'px',
          left  :x - r + 'px'
        });
	b.append(t);
        window.setTimeout(function() {
          var parentNode = t[0].parentNode;
          if (parentNode) parentNode.removeChild(t[0]);
        }, 2000);
      }
    })
  }
});

/* Global support variables */

var 
    //URI
    uri = (function () {
	    var res={},
		param = window.location.href.split('?')[1];
	    if(param)param=param.split('&');
	    else param=[];
	    for(var i=0;i<param.length;i++){
	      res[param[i].split('=')[0]]=decodeURIComponent(param[i].split('=')[1]);
	    }
	    return res;
	  })(),
    
    // Slide support
    currentShow,
    fontSize = parseInt($('.slider').css('font-size')),
    
    // Slide support constants
    slidewidth  = 450,
    slideheight = 253,
    cm = 37.8,
    
    // Event handeling
    devtheme = {'dark':'dev1','light':'dev2','note':'note','default':'normal'},
    themes = [],
    mov = {a:0,d:0,f:0,g:0,i:0,j:0,k:0,l:0,r:0,s:0,t:0,w:0,x:0,z:0,ctr:0,shft:0,hud:1},
    mainstyle = document.styleSheets[1],
    zoom = 1,
    xs,
    
    // Edit support
    currentEditShow,
    
    
    
    unused_variable_a;

$(document).ready(function(){  
  // Ripple effect
  $('.arrow,.title,#T-a,.T-f,button,#T section h2,#L-Ca-b-Ma li,#E-Cb-Ba').ripple();
  $('#toggle-bar').toggle()
});

window.addEventListener('load',function(){
  
  /* Keyboard shortcut handeling */
  
   $("body").keydown(function(e) {
    ek = e.keyCode;
    if (/*ek!=34&&ek!=37&&*/ek!=32&&ek!=33&&ek!=39/*&&ek!=36&&ek!=40&&ek!=35&&ek!=38&&ek!=81*/)
      $('.slide').removeClass('path');
    if (ek==34||ek==37) prevSlide();		// < or Pg down 
    if (ek==32||ek==33||ek==39) nextSlide();	// > or Pg up or space 
    if (ek==36||ek==40) prevSlide(true);	// ∨ or Home 
    if (ek==35||ek==38) nextSlide(true);	// ∧ or End 
    if (ek==81) currentSlide();			// Q 
    
    if (ek==49) showXs(!showXs())		// 1 
    if (ek==50) $('#toggle-bar').toggle()	// 2
    if (ek==51) $(window).resize()		// 3 

    // Moving, rotating, etc. 
    if (ek==65) mov.a=1;			// A 
    if (ek==68) mov.d=1;			// D 
    if (ek==87) mov.s=1;			// S 
    if (ek==83) mov.w=1;			// W 
    if (ek==84) mov.t=1;			// T 
    if (ek==71) mov.g=1;			// G 
		    
    if (ek==74) mov.j=1;			// J 
    if (ek==76) mov.l=1;			// L 
    if (ek==73) mov.i=1;			// K 
    if (ek==75) mov.k=1;			// I 
    if (ek==90) mov.x=1;			// X 
    if (ek==88) mov.z=1;			// Z 
		    
    if (ek==82) mov.r=1;			// R 
    if (ek==70) mov.f=1;			// F

    // Other things
    if (ek==17) mov.ctr=1;			// Ctrl
    if (ek==16) mov.shft=1;			// Shft
//     if (ek==80) mov.p=1;			// P 

    // Handeling
    if (mov.ctr
     && mov.shft) {
      hideHUD(!mov.hud);
      mov.hud=!mov.hud*1;
    }
//     if (mov.p) printShow()
  });
   
  $("body").keyup(function(e) {
    ek = e.keyCode;
    
    // Moving, rotating, etc. 
    if (ek==65) mov.a=0;			// A 
    if (ek==68) mov.d=0;			// D 
    if (ek==87) mov.s=0;			// S 
    if (ek==83) mov.w=0;			// W 
    if (ek==84) mov.t=0;			// T 
    if (ek==71) mov.g=0;			// G 
		    
    if (ek==74) mov.j=0;			// J 
    if (ek==76) mov.l=0;			// L 
    if (ek==73) mov.i=0;			// K 
    if (ek==75) mov.k=0;			// I 
    if (ek==90) mov.x=0;			// X 
    if (ek==88) mov.z=0;			// Z 
		    
    if (ek==82) mov.r=0;			// R 
    if (ek==70) mov.f=0;			// F

    // Other things
    if (ek==17) mov.ctr=0;			// Ctrl
    if (ek==16) mov.shft=0;			// Shft
//     if (ek==80) mov.p=0;			// P 
  });
  
  setInterval(function () {
    if (mov.k) $('.rotate-container').transition({rotateX:'+=1'},9);
    if (mov.i) $('.rotate-container').transition({rotateX:'-=1'},9);
    if (mov.j) $('.rotate-container').transition({rotateY:'+=1'},9);
    if (mov.l) $('.rotate-container').transition({rotateY:'-=1'},9);
    if (mov.z) $('.rotate-container').transition({rotate :'+=1'},9);
    if (mov.x) $('.rotate-container').transition({rotate :'-=1'},9);
    
    var msp = ( 5 * ( 1 / $('.rotate-container').css('scale') ) ).toString();
	      
    if (mov.w) $('.slides').transition({z:'-='+msp,queue:false},9);
    if (mov.s) $('.slides').transition({z:'+='+msp,queue:false},9);
    if (mov.a) $('.slides').transition({left:'+='+msp,queue:false},9);
    if (mov.d) $('.slides').transition({left:'-='+msp,queue:false},9);
    if (mov.r) $('.slides').transition({top:'+='+msp},9);
    if (mov.f) $('.slides').transition({top:'-='+msp},9);
    
    if (mov.t) $('.rotate-container').transition({scale:'+=.01'},9);
    if (mov.g) $('.rotate-container').transition({scale:'-=.01'},9);
  },10);
  
  // Moving with mouse
  
  var mouseDown = false, originalPos = null;
  
  $("#V").on("mousedown", function(e) {
    e.preventDefault();
    mouseDown = true, originalPos = { x: e.pageX, y: e.pageY };
  });
  
  $("#V").on("mouseup", function() { mouseDown = false, originalPos = null; });
  
  $("#V").on("mousemove", function(e) { if(!mouseDown){return;}
    var offset = { x: e.pageX - originalPos.x, y: originalPos.y - e.pageY };
    if(offset.x > 0) $('.rotate-container').transition({rotateY:'+='+(offset.x* .3),queue:false},9);
    if(offset.x < 0) $('.rotate-container').transition({rotateY:'-='+(offset.x*-.3),queue:false},9);
    if(offset.y > 0) $('.rotate-container').transition({rotateX:'+='+(offset.y* .3),queue:false},9);
    if(offset.y < 0) $('.rotate-container').transition({rotateX:'-='+(offset.y*-.3),queue:false},9);
    originalPos = { x: e.pageX, y: e.pageY };
  });
  
  $("#V").mousewheel(function(e){
    var y = e.deltaY
      , n = Math.abs(y)
      , d = parseFloat( $('.rotate-container').css('scale') )
      , f = 1.3
      , s = n*(y<0?d/f:y>0?d*f:d)
    $('.rotate-container').transition({scale:s,queue:false},9)
  });
  
  if (uri.c&&uri.i) {
    var tmpSlideSet  = (window[atob(uri.c)]||{slideshowdata:[]}).slideshowdata,
	tmpSlideShow = tmpSlideSet[uri.i]
  } else if (uri.s&&uri.p) {
    var tmpSlideSet  = (window[uri.s]||{slideshowdata:[]}).slideshowdata,
	tmpSlideShow = (function(){for(var i=0;i<tmpSlideSet.length;i++)if(tmpSlideSet[i].title===uri.p)return window[uri.s].slideshowdata[i]})();
  }
  // Immediately display slideshow if named in URL parameters
  if(tmpSlideShow)displaySlides(tmpSlideShow);
  // Immediately display slideshow when present in URL parameters
  else if (uri.hasOwnProperty('view')) {
    try { var d = getJSON(atob(uri.view));
      if(d.title){
	displaySlides(d);
      }    else { console.warn('Not a valid key!') }
    } catch (e) { console.warn('Not a valid key!') }
  }
  
});