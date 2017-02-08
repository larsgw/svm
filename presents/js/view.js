function displaySlides(slideshow){
  currentShow = slideshow;
  
  /* (Re)initializing slider element */
  
  $('#V div.slider, #V ul.slider-dots').empty();
  $('#V div.slider').removeClass('puzzleload longload fastload');
  
  var type   = slideshow.type || 'normal',
      puzzle = type === 'puzzle',
      load   = slideshow.load||'long',
      sta    = slideshow.sta || 1;
  
  document.title=slideshow.title+' - Presentatie';
  $('#V .title' ).html(slideshow.title);
  if(puzzle)$('#V').addClass(slideshow.style||'dev2').find('.slider').html(
    '<div class="rotate-container">'+
      '<div class="y-axis axis"></div>'+
      '<div class="x-axis axis"></div>'+
      '<div class="z-axis axis"></div>'+
      '<div class="slides"></div>'+
    '</div>'
  );
      
  for (var i=0;i<slideshow.slides.length;i++) {
    var elm    = slideshow.slides[i],
	kind   = elm.kind || 'dia',
	slide  = parseSlide(slideshow,i);
    
    if(kind=='dia'||kind=='none'){
      $('#V ul.slider-dots')
	.append('<li class="dot '+(elm.hide?'hidden':'')+'"><div class="circle"></div></li>');
    }
    
    if(puzzle)$('#V div.slides').append(slide);
    else      $('#V div.slider').append(slide);
    
    var slideHTML = puzzle ? $('#V div.slides') : $('#V div.slider') ,
	idx = parseInt(slideHTML.data('idx'));
	slideHTML = slideHTML.find('.slide').last().find('.content-replace');
    if(slideHTML.length)SJSLoadHTML[idx]=false;
    slideHTML.parent().load(slideHTML.data('content-url'),function(){
      SJSLoadHTML[idx] = true;
      toggle3d($(this))
    });
  }
  
  $('#V div.slider').addClass(load+'load')
  
  hljs.configure({tabReplace:'    '});
  hljs.initHighlighting.called = false;
  hljs.initHighlighting();
  
  var cs = $('div.slider .slide:nth-of-type('+sta+')'),
      cd = $('ul.slider-dots .dot:nth-of-type('+sta+')'),
      np = slideshow.slides[cs.data('idx')]||{};
  switchSlide(cs,cs,cd,cd,np);
  
  if(slideshow.type==='puzzle')hideHUD(true);
  $('.dot').unbind('click').click(function(){randSlide($(this));});
  $('.dot .circle').ripple();
  
  goTo('V');
  alignView();
}

function align() {
  if (false)
    return;
  else if ($('#V').hasClass('S-as'))
    alignView();
  else if ($('#E').hasClass('S-as'))
    alignEdit();
}

function alignView() {
  $('.controls').each(function(){
    $(this).css('left',(($(this).parent().outerWidth()/2)-($(this).outerWidth()/2)));
  });
  if (!$('.slider').hasClass('puzzleload')) {
    if ($('#V').outerWidth()/$('#V').outerHeight()>16/9) {
      $('.slider').css('width',($('#V').outerHeight()*16/9).toString()+'px')
                  .css('top','0')
                  .css('left',(($('.slider').parent().outerWidth() /2)-($('.slider').outerWidth() /2)));
    } else {
      $('.slider').css('width','100%')
                  .css('top' ,(($('.slider').parent().outerHeight()/2)-($('.slider').outerHeight()/2)))
                  .css('left','0');
    }
  } setTimeout(function(){
    $('.slider').css('font-size',($('.slider').outerWidth()/(slidewidth*2))*fontSize);
  },300);
}

function alignEdit() {
  if ($('#E-Cc').outerWidth()/$('#E-Cc').outerHeight()>16/9) {
    $('#E-Cc-Ca').css('width',($('#E-Cc').outerHeight()*16/9)+'px')
                 //.css('height',$('#E-Cc').outerHeight()+'px')
                 .css('top','0')
                 .css('left',(($('#E-Cc').outerWidth()/2)-($('#E-Cc-Ca').outerWidth() /2)));
  } else {
    $('#E-Cc-Ca').css('width','100%')
                 //.css('height',$('#E-Cc').outerHeight()+'px')
                 .css('top' ,(($('#E-Cc').outerHeight()/2)-($('#E-Cc-Ca').outerHeight()/2)))
                 .css('left','0');
  } setTimeout(function(){
    $('#E-Cc').css('font-size',($('#E-Cc-Ca').outerWidth()/(slidewidth*2))*fontSize);
  },300);
}

function hideHUD(a) {
  if (a) {
    $('#V header').transition({top   : 0 });
    $('#V footer').transition({bottom: 0 });
  }
  else {
    $('#V header').transition({top   :-62});
    $('#V footer').transition({bottom:-62});
  }
}

function switchSlide(cs,ns,cd,nd,dx){
  var data = dx.pos  || {},
      comp = dx.comp || function(){},
      type = dx.type || 'normal',
      fect = dx.effect;
  
  switch(currentShow.type){
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
	x: -(parseInt  (data. x)+slidewidth ),
	y: -(parseInt  (data. y)+slideheight),
	z: - parseInt  (data. z)             ,
	rx:- parseInt  (data.rx)             ,
	ry:- parseInt  (data.ry)             ,
	rz:- parseInt  (data.rz)             ,
	sc:  parseFloat(data.sc)!=0 ? zoom/parseFloat(data.sc) : parseFloat(data.sc)
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
      
      /*if(type!='none')$('.slide.dia:not(.active-slide)').each(function(){
	if(calculatePath(data,currentShow.slides[$(this).data('idx')].pos))
	  $(this).addClass('path');
      });*/
      $('.slides').css({ left:0, top:0 }).transition({ x:pos.x, y:pos.y, z:pos.z },1000);
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
  } else if ($('#V').hasClass('S-as')) {
  var cs= $('.active-slide'),
      ns= cs.nextAll('#V .slide.dia,#V .slide.none').first(),
      cd= $('.active-dot'),
      nd= cd.next('.dot');
  if(last){
      ns= $('#V .slide.dia,#V .slide.none').last(),
      nd= $('.dot').last();}
  else if(ns.length===0){
      ns= $('#V .slide.dia,#V .slide.none').first(),
      nd= $('.dot').first();}
  var np= currentShow.slides[ns.data('idx')];
  switchSlide(cs,ns,cd,nd,np)
}};

// prev slide handeler

function prevSlide(first){
  if ($('#V').hasClass('S-as')) {
    var cs= $('.active-slide'),
	ns= cs.prevAll('.slide.dia,.slide.none').first(),
	cd= $('.active-dot'),
	nd= cd.prev('.dot');
    if(first){
	ns= $('#V .slide.dia,#V .slide.none').first(),
	nd= $('.dot').first();}
    else if(ns.length===0){
	ns= $('#V .slide.dia,#V .slide.none').last(),
	nd= $('.dot').last();}
    var np= currentShow.slides[ns.data('idx')];
    switchSlide(cs,ns,cd,nd,np)
  }
};

// move back to the current slide

function currentSlide() {
  if ($('#V').hasClass('S-as')) {
    var cs = $('.active-slide'),
	cd = $('.active-dot'),
	np = currentShow.slides[cs.data('idx')],
	vd = cs.find('video'),
	hd = np.comp;
	currentShow.slides[cs.data('idx')].comp = null;
    if(vd.length){vd[0].currentTime=0;vd[0].play();}
    switchSlide(cs,cs,cd,cd,np)
    currentShow.slides[cs.data('idx')].comp = hd;
  }
}

// random slide handeler (read: go to slide on the press of a button)
  
function randSlide(elm){
  if (!elm.hasClass('active-dot')) {
    var i = elm.index() + 1,
	ns= $('.slide:nth-child(' + i + ')'),
	nd= $('.dot:nth-child(' + i + ')');
    switchSlide($('.active-slide'),ns,$('.active-dot'),nd,currentShow.slides[i-1]);
  }
}

$(document).ready(function(){
  
  /* Keyboard shortcut handeling */
  
//   $('#V').keydown(function(e) {
//     ek = e.keyCode;
//     if (/*ek!=34&&ek!=37&&*/ek!=32&&ek!=33&&ek!=39/*&&ek!=36&&ek!=40&&ek!=35&&ek!=38&&ek!=81*/)
//       $('.slide').removeClass('path');
//     if (ek==34||ek==37) prevSlide();		// < or Pg down 
//     if (ek==32||ek==33||ek==39) nextSlide();	// > or Pg up or space 
//     if (ek==36||ek==40) prevSlide(true);	// ∨ or Home 
//     if (ek==35||ek==38) nextSlide(true);	// ∧ or End 
//     if (ek==81) currentSlide();			// Q 
//     
//     // Moving, rotating, etc. 
//     if (ek==65) mov.a=1;			// A 
//     if (ek==68) mov.d=1;			// D 
//     if (ek==87) mov.s=1;			// S 
//     if (ek==83) mov.w=1;			// W 
//     if (ek==90) mov.x=1;			// X 
//     if (ek==88) mov.z=1;			// Z 
// 		    
//     if (ek==74) mov.j=1;			// J 
//     if (ek==76) mov.l=1;			// L 
//     if (ek==73) mov.i=1;			// K 
//     if (ek==75) mov.k=1;			// I 
//     if (ek==84) mov.t=1;			// T 
//     if (ek==71) mov.g=1;			// G 
// 		    
//     if (ek==82) mov.r=1;			// R 
//     if (ek==70) mov.f=1;			// F
// 
//     // Other things
//     if (ek==17) mov.ctr=1;			// Ctrl
//     if (ek==16) mov.shft=1;			// Shft
//     if (ek==80) mov.p=1;			// P 
// 
//     // Handeling
//     if (mov.ctr&&mov.p) printShow()
//     
//     if (mov.ctr&&mov.shft&&mov.hud) { hideHUD(true); mov.h=0; }
//     else if (mov.ctr&&mov.shft&&!mov.hud) { hideHUD(false); mov.h=1; }
//   });
  
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
  
  $(window).resize(align);
});