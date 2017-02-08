slideshowdata.push({
  title:'Card',
  sta:1,
  type:'puzzle',
  style:'dev2',
  load:'puzzle',
  slides:[
    {
      kind:'none',
      type:'none',
      pos:{x:'0px',y:'0px',rx:20,sc:'2'},
      comp:function(){
	$('.card').transition({
	  rotateY:'0',
	  duration:0
	});
	$('.card .b').transition({
	  rotateY:'-20',
	  duration:1000
	});
      }
    },
    {
      kind:'none',
      type:'none',
      pos:{x:'0px',y:'0px',rx:20,sc:'2'},
      comp:function(){
	nextSlide();
	$('.card .b').transition({
	  rotateY:'-160',
	  duration:1000
	});
      }
    },
    {
      kind:'none',
      type:'none',
      pos:{x:'-250px',y:'0px',rx:20,sc:'2'}
    },
    {
      kind:'none',
      type:'none',
      pos:{x:'0px',y:'0px',rx:20,sc:'2'},
      comp:function(){
	$('.card .b').transition({
	  rotateY:'-3',
	  duration:1000
	});
	$('.card').transition({
	  rotateY:'+=360',
	  duration:5000
	});
      }
    },
    {
      kind:'html',
      type:'html',
      content:
	'<style>'+
	  '.card {font-family:Lobster;}'+
	  '.card .b{transform-origin:0% 50%;}'+
	  '.card {position:absolute;}'+
	  '.card section{position:absolute;width:500px;height:750px;}'+
	  '.card section.a{-webkit-backface-visibility:hidden !important;backface-visibility:hidden !important;}'+
	'</style>'+
	'<div class="card">'+
	  '<div class="b" style="transform: rotateY(-3deg);">'+
	    '<section class="a one" style="background-image:url(http://www.kerstkaarten.cards/kerstkaarten/kerstkaart/91.jpg);background-size:cover;">'+
	      '<h1 style="position:absolute;top:40%;text-align:center;width:100%;color:white;">Vrolijk kerstfeest!</h1>'+
	    '</section>'+
	    '<section class="a two" style="background:#ffd;transform: rotateY(180deg);">'+
	      ''+
	    '</section>'+
	  '</div>'+
	  '<section class="a" style="background:#ffd;border-left:1px solid grey;">'+
	    '<h1 style="position:absolute;top:40%;text-align:center;width:100%">Vrolijk kerstfeest!</h1>'+
	    '<h2 style="position:absolute;top:60%;text-align:center;width:100%;font-family:\'Indie Flower\';">Van Lars</h2>'+
	  '</section>'+
	  '<section class="a" style="background:#fff;transform:rotateY(180deg)">'+
	    '<img src="img/LOGO_2.png" width="50%" style="position:absolute;bottom:30px;left:23%;">'+
	  '</section>'+
	'</div>',
      pos:{x:'200px',y:'-150px'}
    }
  ]
});slideshowdata.push({
  'title':'Example 2',
  'sta':9,
  'type': 'puzzle',
  'style':'dev2',
  'load':'puzzle',
  'slides':[
    {
      'type':'text-2',
      'con':[
	{'title':'Controls:',
	'list':{'items':[
	  'Next slide: right arrow, Page Up or spacebar',
	  'Previous slide: left arrow or Page Down',
	  'First slide: down arrow or Home',
	  'Last slide: up arrow or End',
	  'Turn around y-axis: A & D',
	  'Turn around x-axis: W & S',
	  'Turn around z-axis: Z & X',
	  'Zoom in & out: R & F',
	  'Walk: IJKL for up-left-down-right, TG for forth-back',
	  'And press Q to move back to the current slide'
	]}},
	{'title':'Explanation:',
	'text':[
	  'A way to make cool 3D presentations. Backwards compatible with the last slideshow thing.',
	  'Disclaimer: Still in development. All pieces of content are just placeholders. Powered by:',
          '<img style="background:white" width="80%" src="http://www.techmynd.org/demos/html5-multiple-attachment-email/images/css3_html5_jquery_bootstrap.png" >',
          'And <span style="padding:0 5px;background:white;font-size:24px;font-family:Transit;color:#405060;text-shadow:2px 2px 0 rgba(30, 30, 30, 0.15);">Transit</span>'
	]}
      ].reverse(),
      'pos':{x:'-1050px'},
      bhid:'bhid'
    },{
      'type':'text-2',
      'con':[
	{'title':'Issues:',
	'list':{items:[
	  'The slide-hiding mechanism isn\'t perfect yet - but hey: it exists!',
	  'Lack of perspective (the way to do it looks shitty)'
	]}},
	{'title':'Solved Issues:',
	'list':{'title':'Solved issues','items':[
	  'Scaling does work proportionally (Fixed by changing the library)',
	  'You can now toggle the axes',
	  'You now have the option to make slides invisible on the backside - just like this one',
	  'You now have the option to put ordered lists in slides',
          'Slides now appear in order - let\'s hope it stay that way!',
	  'You now have the option to pass a function to execute when the slide has appeared',
	  'Slides never cover slides anymore!',
	  'Implemented!',
          'Fixed the moving',
	  'Added devtools',
	  'Added way to link presentation to url'
	]}}
      ],
      'pos':{x:'-1050px',ry:180},
      bhid:'bhid'
    },{
      'type':'title',
      'title':'This is testing'
    },{
      'kind':'html',
      'type':'html',
      'content':
	'<div style="position:relative;width:100px;height:100px">'+
	  '<svg style="position:absolute;transform:translateY(-60px)" width="80px" height="140px"><path fill="#0f0" d="'+
	    'M40 0 l40 60 v80 h-80 v-80 l40 -60 Z'+
	    'M20 100 h15 v40 h-15 Z'+
	    'M45 100 h15 v15 h-15 Z'+
	  '" fill-rule="evenodd"/></svg>'+
	  '<div style="position:absolute;background:#f00;transform:translateZ(-40px) translateX(40px) rotateY(90deg);width:80px;height:80px"></div>'+
	  '<div style="position:absolute;background:#f88;transform:translateZ(-40px) translateX(-40px) rotateY(-90deg);width:80px;height:80px"></div>'+
	  '<div style="position:absolute;background:#00f;transform:translateZ(-40px) translateY(40px) rotateX(90deg);width:80px;height:80px"></div>'+
	  '<div style="position:absolute;background:#88f;transform:translateZ(-40px) translateY(-40px) rotateX(-90deg);width:80px;height:80px"></div>'+
	  '<div style="position:absolute;background:#8f8;transform:translateZ(-80px);width:80px;height:80px"></div>'+
	  '<div style="position:absolute;border:20px solid #f88;transform:translateZ(-40px) translateY(-66px) translateX(-20px) rotateY(-90deg) rotateX(34deg);width:80px;height:72px"></div>'+
	  '<div style="position:absolute;border:20px solid #f00;transform:translateZ(-40px) translateY(-66px) translateX(20px) rotateY(-90deg) rotateX(-34deg);width:80px;height:72px"></div>'+
	  '<div style="position:absolute;border:40px solid transparent;border-top:none;border-bottom:60px solid #8f8;transform:translateY(-60px) translateZ(-80px)"></div>'+
	'</div>',
      'pos':{z:'-100px',x:'100px'}
    },{
      'type':'title',
      'title':'Really testing',
      'pos':{x:'1050px'}
    },{
      'type':'title',
      'title':'So don\'t!',
      'bgr':{'src':'http://nos.nl/data/image/2015/10/14/200816/864x486.jpg','typ':'img'},
      'pos':{x:'2100px',rz:'180'}
    },{
      'type':'title',
      'title':'Think',
      'subtitle':'Different',
      'pos':{x:'1050px',ry:'90'}
    },{
      'type':'title',
      'title':'Think',
      'subtitle':'Big',
      'pos':{x:'1050px',y:'-1500px',ry:'90',rz:'90',sc:'2'}
    },{
      'type':'title',
      'title':'Think',
      'subtitle':'Adventurous',
      'pos':{x:'3150px',ry:'-90'/*,rz:'20'*/}
    },{
      'type':'title',
      'title':'Think',
      'subtitle':'Amazing',
      'pos':{x:'4200px',ry:'-90'}
    }
  ]
});