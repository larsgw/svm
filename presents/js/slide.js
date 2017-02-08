// Begin: basic functions

/*function  deg(a){return  a*(180/Math.PI);}
function  rad(a){return  a*(Math.PI/180);}
function  sin(a){return  Math.sin(rad(a))}
function  cos(a){return  Math.cos(rad(a))}
function  tan(a){return  Math.tan(rad(a))}
function asin(a){return deg(Math.asin(a))}
function acos(a){return deg(Math.acos(a))}
function atan(a){return deg(Math.atan(a))}

function getCornerCoor(a) {
  a=$.extend(true,{},a),
  a.x=parseInt(/(\-?\d+)/.exec(a.x||'0px')[1]),
  a.y=parseInt(/(\-?\d+)/.exec(a.y||'0px')[1]),
  a.z=parseInt(/(\-?\d+)/.exec(a.z||'0px')[1])
  var res = [
    {x:a.x, y:a.y, z:a.z},
    {x:a.x+(2*slidewidth), y:a.y+(2*slideheight), z:a.z}
  ];
  
  res[0].z += sin(a.rx) * slideheight;
  res[1].z -= sin(a.rx) * slideheight;
  res[0].y += slideheight - ( cos(a.rx) * slideheight );
  res[1].y -= slideheight - ( cos(a.rx) * slideheight );
  res[0].z += sin(a.ry) * slidewidth;
  res[1].z -= sin(a.ry) * slidewidth;
  res[0].x += slidewidth - ( cos(a.ry) * slidewidth );
  res[1].x -= slidewidth - ( cos(a.ry) * slidewidth );
  var z = atan( slideheight / slidewidth ) - a.rz,
      d = Math.sqrt((slidewidth*slidewidth) + (slideheight*slideheight)) ;
  res[0].y += slideheight - ( sin(z) * d );
  res[1].y -= slideheight - ( sin(z) * d );
  res[0].x += ( cos(z) * d ) -  slidewidth;
  res[1].x -= ( cos(z) * d ) -  slidewidth;
  
  return res;
}*/

function calculatePath(a,b) {
  /*if(b.x){if(b.x.slice(-2)=='cm')b.x=(parseFloat(b.x.slice(0,-2))*cm).toString()+'px'};
  if(b.y){if(b.y.slice(-2)=='cm')b.y=(parseFloat(b.y.slice(0,-2))*cm).toString()+'px'};
  if(b.z){if(b.z.slice(-2)=='cm')b.z=(parseFloat(b.z.slice(0,-2))*cm).toString()+'px'};
  var xd = parseInt(/(\-?\d+)/.exec(b.x)[1])-parseInt(/(\-?\d+)/.exec(a.x)[1]),
      yd = parseInt(/(\-?\d+)/.exec(b.y)[1])-parseInt(/(\-?\d+)/.exec(a.y)[1]),
      zd = parseInt(/(\-?\d+)/.exec(b.z)[1])-parseInt(/(\-?\d+)/.exec(a.z)[1]),
      di = Math.sqrt((xd*xd)+(yd*yd)+(zd*zd)),
      mx = 2*Math.sqrt((slidewidth*slidewidth)+(slideheight*slideheight));
  console.log(di>=mx)
  if(di>=mx)return false;else return true;*/
  return true;
}
      
function getStyle(style, selector) {
  var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;
  for (var i = 0, l = sheets.length; i < l; i++) {
    var sheet = sheets[i];
    if( !sheet.cssRules ) { continue; }
    for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
      var rule = sheet.cssRules[j];
      if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
	return rule.style[style];
      }
    }
  }
  return null;
}

function round(val, exp) {
  if(typeof exp==='undefined'||+exp===0)return Math.round(val);
  val=+val,exp=+exp;
  if(isNaN(val)||!(typeof exp==='number'&&exp%1===0))return NaN;
  val=val.toString().split('e');
  val=Math.round(+(val[0]+'e'+(val[1]?(+val[1]+exp):exp)));
  val=val.toString().split('e');
  return +(val[0]+'e'+(val[1]?(+val[1]-exp):-exp));
}

function getURLPm(key) {
  if(typeof uri!=='object'){
    var res={},
	param = window.location.href.split('?')[1];
    if(param)param=param.split('&');
    else param=[];
    for(var i=0;i<param.length;i++){
      res[param[i].split('=')[0]]=decodeURI(param[i].split('=')[1]);
    }
    uri = res;
  }
  return uri[key];
}

// End: basic functions

/*============================================================================*/
/*------------┏━╸-┏━┓-┏━╸-┏━╸-╺┳╸-┏━━-╺┳╸-┏━╸-----┏━╸-┏━┓-┏━┓-┏━╸-------------*/
/*------------┗━┓-┣━┛-┣━╸-┃----┃--┣━╸--┃--┃-------┃---┃-┃-┃-┃-┣━╸-------------*/
/*------------╺━┛-╹---┗━╸-┗━╸-╺┻╸-╹---╺┻╸-┗━╸-----┗━╸-┗━┛-┗━┛-┗━╸-------------*/
/*============================================================================*/


/* Global support variabels: */

var uri,

    /* Simple password-protection support */
    pass = 'QW1hemluZyE=',
    protect = [/*'Een kolonie in de ruimte?','Share & Care'*/],

    /* Loading support */
    l = 0,
    tim = [],
    preset = getURLPm('p'),
    preset2 = getURLPm('url'),
    vip = $.grep(slideshowdata,function(e){return e.title==preset;}),
    vip2 = $.grep(slideshowdata,function(e){return e.title==preset2;}),
    vipyn = vip.length,
    vip2yn = vip2.length,
    
    /* Slide related support */
    currentShow,
    slidewidth	= 450,
    slideheight	= 253,
    
    dota = '<li class="dot"><div class="circle"></div></li>',
    dotb = '<li class="dot hidden"><div class="circle"></div></li>',
    
    cm = 37.8,
    
    /* Event listening and handeling support */
    mov = {a:0,d:0,f:0,g:0,i:0,j:0,k:0,l:0,r:0,s:0,t:0,w:0,x:0,z:0,ctr:0,shft:0,hud:1},
    zoom = 1,
    mainstyle = document.styleSheets[1],
//     sliderx = 0, slidery = 82;
    devtheme = {dark:'dev1',light:'dev2',note:'note','default':'normal'},
    display = ['none','block'],
    devtool = {'none':'flex','flex':'none'};
    
// Begin: Slide converter

function displaySlides(slideshow){
/*=*/ currentShow = slideshowdata.indexOf(slideshow);
/*=*/
/*=*/ if(protect.indexOf(slideshow.title)>=0){
/*=*/   if(prompt('Please enter the password to continue...')!=atob(pass)){
/*=*/   alert('Wrong!');return;}
/*=*/ }
/*=*/
/*=*/ /* (Re)initializing slider element */
/*=*/
/*=*/ $('.slider, .slider-dots').empty();
/*=*/ $('.slider').removeClass('puzzleload longload fastload');
/*=*/ 
/*=*/ document.title=slideshow.title+' - Presentatie';
/*=*/ $('.title').html(slideshow.title);
/*=*/ 
/*=*/ var type=slideshow.type||'normal',
/*=*/     puzzle=type==='puzzle',
/*=*/     sta=slideshow.sta||1,
/*=*/     load=slideshow.load||'long',
/*=*/     style=puzzle?slideshow.style||'dev2':'normal';
/*=*/     
/*=*/     $('.slider').html(puzzle?
/*=*/     '<div class="rotate-container">'+
/*=*/       '<div class="y-axis axis"></div>'+
/*=*/       '<div class="x-axis axis"></div>'+
/*=*/       '<div class="z-axis axis"></div>'+
/*=*/       '<div class="slides"></div>'+
/*=*/     '</div>':'')[0].style.perspective = puzzle?'2000px':'none';
/*=*/   
/*=*/ $('body').removeClass().addClass(style)
/*=*/     
/*=*/ for (var i=0;i<slideshow.slides.length;i++) {
/*=*/   var elm = slideshow.slides[i],
/*=*/       dir , dir2 ,
/*=*/       kind = elm.kind || 'dia',
/*=*/       bhid = elm.bhid || ' ',
/*=*/       slide = '<div class="slide '+kind+' '+bhid+'" ';
/*=*/       
/*=*/       elm.type=elm.type||'default',
/*=*/       elm.pos=elm.pos||{},
/*=*/       elm.pos.x=elm.pos.x||0,
/*=*/       elm.pos.y=elm.pos.y||0,
/*=*/       elm.pos.z=elm.pos.z||0,
/*=*/       elm.pos.rx=elm.pos.rx||0,
/*=*/       elm.pos.ry=elm.pos.ry||0,
/*=*/       elm.pos.rz=elm.pos.rz||0,
/*=*/       elm.pos.sc=elm.pos.sc||1;
/*=*/   
/*=*/   if(puzzle)slide += 'style="left:'+elm.pos.x+';top:'+elm.pos.y+';transform:translateZ('+elm.pos.z+') rotateZ('+elm.pos.rz+'deg) rotateX('+elm.pos.rx+'deg) rotateY('+elm.pos.ry+'deg) scale('+elm.pos.sc+')" ';
/*=*/   slide += 'data-idx="'+i+'"';
/*=*/   
/*=*/   slide += elm.type ? 'data-slide-type="' + elm.type + '" ' : '' ;
/*=*/   slide += 'data-slide-style="' + style + '"';
/*=*/     
/*=*/   if (elm.effect) slide += ' data-slide-effect="' + elm.effect + '">';
/*=*/   else if (slideshow.effect) slide += ' data-slide-effect="' + slideshow.effect + '">';
/*=*/   else slide += '>';
/*=*/   
/*=*/   switch (elm.type) {
/*=*/
/*=*/     case 'text-2':
/*=*/       for (var m=0;m<elm.con.length;m++) {
/*=*/         slide += '<div class="slide-container">'
/*=*/         
/*=*/         if(elm.con[m].title)slide+='<h1 data-content="'+elm.con[m].title+'" class="h1">'+elm.con[m].title+'</h1>';
/*=*/         if(elm.con[m].subtitle)slide+='<h2 class="h2">'+elm.con[m].subtitle+'</h2>';
/*=*/         if(elm.con[m].text)for(var j=0;j<elm.con[m].text.length;j++){slide+='<p>'+elm.con[m].text[j]+'</p>';};
/*=*/         if(elm.con[m].list)slide+='<ul>'+listToHTML(elm.con[m].list)+'</ul>';
/*=*/         if(elm.con[m].html)slide+=elm.con[m].html;
/*=*/         
/*=*/         slide += '</div>';
/*=*/       }
/*=*/       break;
/*=*/       
/*=*/     case 'html':
/*=*/       if (elm.content   ) slide += elm.content;
/*=*/       if (elm.contenturl) slide += '<div class="content-replace" data-content-url="'+elm.contenturl+'"></div>';
/*=*/       break;
/*=*/     case 'none':break;
/*=*/       
/*=*/     default:
/*=*/   
/*=*/       // Text Container
/*=*/       
/*=*/       slide += '<div class="slide-container">'
/*=*/       
/*=*/       if(elm.title)slide+='<h1 data-content="'+elm.title+'" class="h1">'+elm.title+'</h1>';
/*=*/       if(elm.subtitle)slide+='<h2 class="h2">'+elm.subtitle+'</h2>';
/*=*/       if(elm.text)for(var j=0;j<elm.text.length;j++){slide+='<p>'+elm.text[j]+'</p>';};
/*=*/       if(elm.list)slide+='<ul>'+listToHTML(elm.list)+'</ul>';
/*=*/       if(elm.html)slide+=elm.html;
/*=*/       
/*=*/       slide += '</div>';
/*=*/       
/*=*/       // Content container
/*=*/       
/*=*/       slide += '<div class="slide-container">'
/*=*/       
/*=*/       if(elm.elm){ for(var l=0;l<elm.elm.length;l++){
/*=*/           var a='',b='',c=elm.elm[l];
/*=*/           slide += ' <figure style="';
/*=*/           slide+=c.h?'height:'+c.h+';':'';
/*=*/           slide+=c.w? 'width:'+c.w+';':'';
/*=*/           slide+='">';
/*=*/           switch(c.type){
/*=*/             case 'img':case 'video':a=c.type,b=' />';break;
/*=*/             case 'iframe':a='iframe',b='>This cannot be displayed</iframe>';break;
/*=*/             default:a='embed',b=' />';}
/*=*/           if (c.src) {
/*=*/             slide+='<'+a;
/*=*/             if(c.h)slide+=' height="'+c.h+'"';
/*=*/             if(c.c)slide+='  class="'+c.c+'"';
/*=*/             if(c.p)slide+=' poster="'+c.p+'"';
/*=*/             slide+=' src="'+c.src+'" '+b;}
/*=*/           if(c.caption)slide+='<figcaption>'+c.caption+'</figcaption>';
/*=*/           slide += '</figure>'
/*=*/       }}
/*=*/       
/*=*/       slide += '</div>';
/*=*/   
/*=*/   }
/*=*/   
/*=*/   // Background-image: The Hard Way (for embed, iframe and video as background)
/*=*/   
/*=*/   if(elm.bgr){
/*=*/     var a='',b='',c=elm.bgr;
/*=*/     slide+='<div class="background">';
/*=*/     switch(c.type){
/*=*/       case 'img':case 'video':a=c.type,b=' />';break;
/*=*/       case 'iframe':a='iframe',b='>This cannot be displayed</iframe>';break;
/*=*/       default: a='embed',b=' />';}
/*=*/     if(c.src)slide+='<'+a+' src="'+c.src+'"'+b;
/*=*/     slide+='</div>';
/*=*/   }
/*=*/   
/*=*/   // End
/*=*/   
/*=*/   slide += '</div>';
/*=*/   
/*=*/   if(kind=='dia'||kind=='none'){
/*=*/     if(elm.hide)$('ul.slider-dots').append(dotb);
/*=*/     else        $('ul.slider-dots').append(dota);
/*=*/   }
/*=*/ 
/*=*/   if(puzzle)$('div.slides').append(slide);
/*=*/   else $('div.slider').append(slide);
/*=*/   
/*=*/   var slideHTML = puzzle ? $('div.slides') : $('div.slider') ,
/*=*/       idx = parseInt(slideHTML.data('idx'));
/*=*/       slideHTML = slideHTML.find('.slide').last().find('.content-replace');
/*=*/   if(slideHTML.length)SJSLoadHTML[idx]=false;
/*=*/   slideHTML.parent().load(slideHTML.data('content-url'),function(){
/*=*/     var num = (function(){return idx})()
/*=*/     SJSLoadHTML[num]=true;
/*=*/   });
/*=*/   
/*=*/ }
/*=*/
/*=*/ $('.slider').addClass(load+'load');
/*=*/ 
/*=*/ hljs.configure({tabReplace:'    '});
/*=* $('slider slide code, pre code').each(function(i, block) {
/*=*   hljs.highlightBlock(block);
/*=* });*/
/*=*/ hljs.initHighlighting.called = false;
/*=*/ hljs.initHighlighting();
/*=*/ 
/*=*/ var cs= $('div.slider .slide:nth-of-type('+sta+')'),
/*=*/     cd= $('ul.slider-dots .dot:nth-of-type('+sta+')'),
/*=*/     np= slideshowdata[currentShow].slides[cs.data('idx')];
/*=*/ switchSlide(cs,cs,cd,cd,np);
/*=*/ 
/*=*/ if(slideshowdata[currentShow].type==='puzzle')hideHUD(true);
/*=*/ $('.dot').unbind('click').click(function(){randSlide($(this));});
/*=*/ $('.dot .circle').ripple();
/*=*/ 
/*=*/ start();
}

function switchSlide(cs,ns,cd,nd,dx){
  var data = dx.pos  || {},
      comp = dx.comp || function(){},
      type = dx.type || 'normal',
      fect = dx.effect;
  
  switch(slideshowdata[currentShow].type){
    case 'puzzle':
      
      cs.removeClass('active-slide');
      ns.addClass('active-slide');
      cd.removeClass('active-dot');
      nd.addClass('active-dot');
      $('.slide').removeClass('path');
      
      if(data.x){if(data.x.slice(-2)=='cm')data.x=(parseFloat(data.x.slice(0,-2))*cm).toString()+'px'};
      if(data.y){if(data.y.slice(-2)=='cm')data.y=(parseFloat(data.y.slice(0,-2))*cm).toString()+'px'};
      if(data.z){if(data.z.slice(-2)=='cm')data.z=(parseFloat(data.z.slice(0,-2))*cm).toString()+'px'};
      
      var pos = {
	x:-(parseInt(/(\-?\d+)/.exec(data.x)[1])+slidewidth ),
	y:-(parseInt(/(\-?\d+)/.exec(data.y)[1])+slideheight),
	z:  parseInt(/(\-?\d+)/.exec(data.z)[1]),
	rx:-parseInt(data.rx),
	ry:-parseInt(data.ry),
	rz:-parseInt(data.rz),
	sc:parseFloat(data.sc)!=0 ? zoom/parseFloat(data.sc) : parseFloat(data.sc)
      }//,  c = getCornerCoor(data);
      
//       $('.slides')
// 	.find('.corner').remove();
//       $('.slides')
// 	.append('<div class="corner"\
// 	style="left:'+(c[0].x-5)+'px;top:'+(c[0].y-5)+'px;transform:translateZ('+c[0].z+'px)"\
// 	></div>')
// 	.append('<div class="corner"\
// 	style="left:'+(c[1].x-5)+'px;top:'+(c[1].y-5)+'px;transform:translateZ('+c[1].z+'px)"\
// 	></div>')
      
      if(type!='none')$('.slide.dia:not(.active-slide)').each(function(){
	if(calculatePath(data,slideshowdata[currentShow].slides[$(this).data('idx')].pos))
	  $(this).addClass('path');
      });
      $('.slides').transition({ left:pos.x, top:pos.y, z:pos.z },1000);
      $('.rotate-container').transition({rotateX:pos.rx,rotateY:pos.ry,rotate:pos.rz,scale:pos.sc,duration:1000});
      setTimeout(function(){if(typeof comp==='function')(comp)();},1000);
      
      break;
      
    case 'normal':
    default:
      
      if(fect)cs.effect(fect,"swing",700,function(){
	cs.removeClass('active-slide');
	ns.addClass('active-slide');
	cd.removeClass('active-dot');
	nd.addClass('active-dot');	
      });
      else{
	cs.removeClass('active-slide');
	ns.addClass('active-slide');
	cd.removeClass('active-dot');
	nd.addClass('active-dot');
      }
      
      break;
  }
}

// next slide handeler

function nextSlide(last){
  if ($('.active-slide').find('video').data('paused')!=''&&$('.active-slide').find('video').data('paused')!=undefined) {
    $('.active-slide').find('video')[0].play();
  } else {
  var cs= $('.active-slide'),
      ns= cs.nextAll('.slide.dia,.slide.none').first(),
      cd= $('.active-dot'),
      nd= cd.next('.dot');
  if(ns.length===0&&!last){
      ns= $('.slide.dia,.slide.none').first(),
      nd= $('.dot').first();}
  else if(last){
      ns= $('.slide.dia,.slide.none').last(),
      nd= $('.dot').last();}
  var np= slideshowdata[currentShow].slides[ns.data('idx')];
  switchSlide(cs,ns,cd,nd,np)
}};

// prev slide handeler

function prevSlide(first){
  var cs= $('.active-slide'),
      ns= cs.prevAll('.slide.dia,.slide.none').first(),
      cd= $('.active-dot'),
      nd= cd.prev('.dot');
  if(ns.length===0&&!first){
      ns= $('.slide.dia,.slide.none').last(),
      nd= $('.dot').last();}
  else if(first){
      ns= $('.slide.dia,.slide.none').first(),
      nd= $('.dot').first();}
  var np= slideshowdata[currentShow].slides[ns.data('idx')];
  switchSlide(cs,ns,cd,nd,np)
};

// move back to the current slide

function currentSlide() {
  var cs = $('.active-slide'),
      cd = $('.active-dot'),
      np = slideshowdata[currentShow].slides[cs.data('idx')],
      vd = cs.find('video'),
      hd = np.comp;
      slideshowdata[currentShow].slides[cs.data('idx')].comp = null;
  if(vd.length){vd[0].currentTime=0;vd[0].play();}
  switchSlide(cs,cs,cd,cd,np)
  slideshowdata[currentShow].slides[cs.data('idx')].comp = hd;
}

// random slide handeler (read: go to slide on the press of a button)
  
function randSlide(elm){
  if (!elm.hasClass('active-dot')) {
    var i = elm.index() + 1,
	ns= $('.slide:nth-child(' + i + ')'),
	nd= $('.dot:nth-child(' + i + ')');
    switchSlide($('.active-slide'),ns,$('.active-dot'),nd,slideshowdata[currentShow].slides[i-1]);
  }
}

function start() {
  $('.controls').each(function(){
    $(this).css('left',(($(this).parent().outerWidth()/2)-($(this).outerWidth()/2)));
  });
  
  if ($('header, footer').css('display')!='none') {
    if ($(window).outerWidth()/$(window).outerHeight()>16/9&&!$('.slider').hasClass('puzzleload')) {
      $('.slider').css('width',($(window).outerHeight()*16/9).toString()+'px')
      $('.slider').css('top','0');
      $('.slider').css('left',(($('.slider').parent().outerWidth() /2)-($('.slider').outerWidth() /2)));
    } else {
      $('.slider').css('width','100%');
      $('.slider').css('top' ,(($('.slider').parent().outerHeight()/2)-($('.slider').outerHeight()/2)));
      $('.slider').css('left','0');
    }
  }
    
}

function hideHUD(a) {
  if (a) {
    mov.hud=0;
    $('header').transition({top   : 0 });
    $('footer').transition({bottom: 0 });
  }
  else {
    mov.hud=1;
    $('header').transition({top   :-62});
    $('footer').transition({bottom:-62});
  }
}

$(document).ready(function(){
  $('.loadingscreen p').html('Loading data');
  l+=34;$('.loadingscreen .loadingbar div').width(l*2);
  
  $('script.load').ready(function(){
    $('.loadingscreen p').html('Loading external resources');
    l+=33;$('.loadingscreen .loadingbar div').width(l*2);
  });
  
  $('.arrow,.title,#menu-toggle,.fab').ripple();
});

window.addEventListener('load',function(){
  
  /* Loading screen */
  
  l+=33;$('.loadingscreen .loadingbar div').width(l*2);
  
  $('.loadingscreen').fadeOut(1000,'swing',function(){
    $(this).remove();
//     $('.initial').remove();
//     goFurther();
    if(vipyn)vip=vip[0];
    if(vip2yn)vip2=vip2[0];
    if(vipyn==0&&vip2yn==0){
      var c=$('.credits'),t=0,n=c.length-1;
      c.each(function(i){
	var e=$(this);
	tim[0]=setTimeout(function(){e.addClass('roll');},t);
	t+=2999;
	tim[1]=setTimeout(function(){
	  e.fadeOut(function(){
	    e.removeClass('roll');
	    if(i<n)t+=1001;
	    else goFurther();
	  });
	},t-400);
      });
    }
    else{
      $('.credits').remove();
      $('.initial').remove();
      if(vipyn)displaySlides(vip);
      else if(vip2yn)displaySlides(vip2);
      $('.choose').hide();
    }
  });
  
  function goFurther() {
    $('.credits').remove();
    $('.initial').remove();
    $('.choose').show();
    $('.box .select p').empty();
    for (var i=0;i<slideshowdata.length;i++) {
      var title= slideshowdata[i].title, type = slideshowdata[i].type, desc= '';
      if(title)           desc+=title;
      if(type==='puzzle') desc+=' (3D)';
      $('.box .select p').append('<input type="radio" name="present" value="'+i.toString()+'" /><span>'+desc+'</span>');
    }
    $(".box .select input").first().prop("checked", true)
    $('.choose').addClass('do');
    $('button.choose').click(function(){
      var idx = $('input[name="present"]:checked').val();
      displaySlides(slideshowdata[idx]);
      var itv = setInterval(function(){
	var bln = true;
	for (var ab=0;ab<SJSLoadHTML.length;ab++) { if(!SJSLoadHTML[ab])bln=false;break; }
	if(bln){$('.choose').hide();clearInterval(itv)}
      },100);
    });
    
    $('button.cancel').click(function(){
      $('.choose').hide();
      start();
    });
    
    /*displaySlides(slideshowdata[0]);
    $('.initial').remove();
    $('.choose').hide();*/
  }
  
  /* Menu controls */
  
  // Testing
  
  $('body').css('left','230px');
  
  // End: testing
  
  $('#menu-toggle').click(function(){
    $('.menu').toggleClass('open');
    $('body').css('left',{'0px':'230px','230px':'0px'}[$('body').css('left')]);
    setTimeout(start,500)
  });
  
  $('.menu section h2').click(function(){
    $(this).parent().toggleClass('closed');
  });
  
  /* Axis */
  $('#axis-toggle').change(function(){
    $('.axis').css('display',['none','block'][$(this).val()]);
    $('input[type="range"].switch').css('background-color',['hsl(0,0%,74%)','#B0BEC5'][$(this).val()])
    var flag = mainstyle.rules[1].cssText.match(/-(webkit|moz|ms)-/)[1];
    mainstyle.deleteRule(1);
    mainstyle.insertRule('#axis-toggle::-'+flag+'-slider-thumb{background-color:'+['#fafafa','#607D8B'][$(this).val()]+';}',1);
  });
  
  /* Theme */
  for (var i in devtheme) {
    $('div.select #bg-toggle + p').append(
      '<input type="radio" name="theme" value="'+
      devtheme[i]+
      '" /><span>'+
      i[0].toUpperCase()+i.slice(1)+
      '</span>');
  }
  
  $('#bg-toggle').click(function(){
    var a = $('body').get(0).className,
	b=$('input[name="theme"]:checked').val();
    $('body').removeClass(a).addClass(b);
    $('.slide').attr('data-slide-style',b);
  });
  
  /* Zoom */
  $('#zoom-level').change(function(){
    zoom=0.25*$(this).val();
    if(chrome){
      mainstyle.deleteRule(0);
      var perc=12.5*$(this).val();
      mainstyle.insertRule('#zoom-level::-webkit-slider-runnable-track { background-image:'+
	'linear-gradient(to right,#607D8B,#607D8B '+perc+'%,hsl(0,0%,74%) '+perc+'%,hsl(0,0%,74%))'+';}'
      ,0);
    }
    currentSlide();
  });
  
  $('#zoom-level').val(zoom*4);
  
  /* Print */
  $('#print').click(function(){
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
    /*win.print();
    win.close();*/
  });
  
  /* Keyboard shortcut handeling */
  
  $("body").keydown(function(e) {
    ek = e.keyCode;
    if (ek!=34&&ek!=37&&ek!=32&&ek!=33&&ek!=39&&ek!=36&&ek!=40&&ek!=35&&ek!=38&&ek!=81)
      $('.slide').removeClass('path');
    if (ek==34||ek==37) prevSlide();		// < or Pg down 
    if (ek==32||ek==33||ek==39) nextSlide();	// > or Pg up or space 
    if (ek==36||ek==40) prevSlide(true);	// ∨ or Home 
    if (ek==35||ek==38) nextSlide(true);	// ∧ or End 
    if (ek==81) currentSlide();			// Q 

    // Moving, rotating, etc. 
    if (ek==65) mov.a=1;			// A 
    if (ek==68) mov.d=1;			// D 
    if (ek==87) mov.s=1;			// S 
    if (ek==83) mov.w=1;			// W 
    if (ek==90) mov.x=1;			// X 
    if (ek==88) mov.z=1;			// Z 
		    
    if (ek==74) mov.j=1;			// J 
    if (ek==76) mov.l=1;			// L 
    if (ek==73) mov.i=1;			// K 
    if (ek==75) mov.k=1;			// I 
    if (ek==84) mov.t=1;			// T 
    if (ek==71) mov.g=1;			// G 
		    
    if (ek==82) mov.r=1;			// R 
    if (ek==70) mov.f=1;			// F

    // Other things
    if (ek==17) mov.ctr=1;			// Ctrl
    if (ek==16) mov.shft=1;			// Shft

    // Handeling
    if (mov.ctr&&mov.shft&&mov.hud) { hideHUD(true); mov.h=0; }
    else if (mov.ctr&&mov.shft&&!mov.hud) { hideHUD(false); mov.h=1; }
  });
   
  $("body").keyup(function(e) {
    ek = e.keyCode;
    
    // Moving, rotating, etc. 
    if (ek==65) mov.a=0;			// A 
    if (ek==68) mov.d=0;			// D 
    if (ek==87) mov.s=0;			// S 
    if (ek==83) mov.w=0;			// W 
    if (ek==90) mov.x=0;			// X 
    if (ek==88) mov.z=0;			// Z 
		    
    if (ek==74) mov.j=0;			// J 
    if (ek==76) mov.l=0;			// L 
    if (ek==73) mov.i=0;			// K 
    if (ek==75) mov.k=0;			// I 
    if (ek==84) mov.t=0;			// T 
    if (ek==71) mov.g=0;			// G 
		    
    if (ek==82) mov.r=0;			// R 
    if (ek==70) mov.f=0;			// F

    // Other things
    if (ek==17) mov.ctr=0;			// Ctrl
    if (ek==16) mov.shft=0;			// Shft
  });
  
  setInterval(function () {
    if (mov.w) $('.rotate-container').transition({rotateX:'+=1'},9);
    if (mov.s) $('.rotate-container').transition({rotateX:'-=1'},9);
    if (mov.a) $('.rotate-container').transition({rotateY:'+=1'},9);
    if (mov.d) $('.rotate-container').transition({rotateY:'-=1'},9);
    if (mov.z) $('.rotate-container').transition({rotate :'+=1'},9);
    if (mov.x) $('.rotate-container').transition({rotate :'-=1'},9);
    
    var msp = ( 5 * ( 1 / $('.rotate-container').css('scale') ) ).toString();
	      
    if (mov.i) $('.slides').transition({top:'+='+msp,queue:false},9);
    if (mov.k) $('.slides').transition({top:'-='+msp,queue:false},9);
    if (mov.j) $('.slides').transition({left:'+='+msp,queue:false},9);
    if (mov.l) $('.slides').transition({left:'-='+msp,queue:false},9);
    if (mov.t) $('.slides').transition({z:'+='+msp},9);
    if (mov.g) $('.slides').transition({z:'-='+msp},9);
    
    if (mov.r) $('.rotate-container').transition({scale:'+=.01'},9);
    if (mov.f) $('.rotate-container').transition({scale:'-=.01'},9);
  },10);
  
  /*$('.slider').draggable({
    revert:true,
    drag:function(e){
      e.preventDefault();
      var xd = sliderx - $('.slider').offset().left,
	  yd = slidery - $('.slider').offset(). top;
      $('.rotate-container').transition({rotateY:'+='+(1*xd)},5);
      $('.rotate-container').transition({rotateX:'+='+(1*xd)},5);
	  sliderx = $('.slider').offset().left,
	  slidery = $('.slider').offset(). top;
    },
    stop:function(){sliderx=0,slidery=82}
  });*/
  
  /* Click handeling */
	    
  $('.arrow-first').click(function(){prevSlide(true);});
  $('.arrow-prev').click(function(){prevSlide();});
  $('.arrow-next').click(function(){nextSlide();});
  $('.arrow-last').click(function(){nextSlide(true);});
  
  $('footer, header').mousewheel(function(event){
    var st = event.deltaY;
    if (st > 0) nextSlide();
    else if (st < 0) prevSlide();
  });
  
  $('header .title').click(function(){
    goFurther();
  });
  
  $('.initial').dblclick(function(){
    $('.credits,.loadingscreen').removeClass('roll');
    goFurther();
    clearTimeout(tim[0]);
    clearTimeout(tim[1]);
  });

  $(window).resize(function(){start()})
  
});