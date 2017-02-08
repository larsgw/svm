slideshowdata.push({
  title:'Werkplek van de toekomst - Introductie',
  sta:1,
  load:'long',
  slides: [
    {
      type:'title',
      title:'Werkplek van de toekomst',
      subtitle:'<span style="font-size:.75em;">door Stef Lamerichs, Rob Schellingerhout,<br>Koen Smeets en Lars Willighagen</span>'
    },
    {
      title:'Onderzoek',
      list:{items:[
	{
	  title:'3 gebieden:',
	  items:['Arbeidsmarkt','Techniek','Kantoor']
	},
	'Meer invloed verdere toekomst',
	'Gezocht naar wat er al is',
	'Volgende conclusies:'
      ]}
    },
    {
      type:'title',
      subtitle:'<a title="YEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHH!!!!!!!!" href="./index.html?p=Werkplek%20van%20de%20toekomst">& Ontwerp</a>'
    }
  ]
});
slideshowdata.push({
  title:'Werkplek van de toekomst',
  sta:1,
  style:'dev2',
  load:'puzzle',
  type:'puzzle',
  slides: [
    {
      kind:'none',
      type:'none',hide:true,
      pos:{x:'-9.2cm',y:'-1.85cm',z:'-7.3cm',rx:20,ry:45,sc:.05,}
    },
    {
      kind:'none',
      type:'none',hide:true,
      pos:{x:'-9.2cm',y:'-1.85cm',z:'-7.3cm',rx:10,ry:90,sc:.2,}
    },
    {
      kind:'none',
      type:'none',
      pos:{x:'-450px',rx:33,ry:45},
      comp:function(){
	var spd = 800;
	$('.a.e').transition({rotate:180,opacity:0},spd);
	$('.a.f').transition({rotate:0,opacity:1},spd);
	$('.b.e').transition({rotate:180,opacity:0},spd);
	$('.b.f').transition({rotate:0,opacity:1},spd);
	$('.c.e').transition({rotate:-90,opacity:1},spd);
	$('.c.f').transition({rotate:90,opacity:1},spd);
	$('.d.e').transition({rotate:180,opacity:1},spd);
	$('.d.f').transition({rotate:90,opacity:1},spd);
      }
    },
    {
      kind:'none',
      type:'none',hide:true,
      pos:{x:'-450px',rx:33,ry:45},
      comp:function(){
	var spd = 800;
	$('.b.e').transition({opacity:1},spd);
	$('.b.f').transition({rotate:-90},spd);
	$('.c.f').transition({rotate:0},spd);
	$('.d.e').transition({rotate:0,opacity:0},spd);
	$('.d.f').transition({rotate:180,opacity:0},spd);
	$('.a.f').addClass('door');
      }
    },
    {
      kind:'none',
      type:'none',hide:true,
      pos:{x:'-9.2cm',y:'-1.85cm',z:'-7.3cm',rx:10,sc:.2,}
    },
    { kind:'none',type:'none',hide:true,pos:{x:'10cm'} },
    {
      type:'content',
      title:'Muren pt. 1 - Rob',
      pos:{x:'10cm'},
      elm:[
	{h:'100%',c:'fr4',type:'video',src:'vid/fr4.ogv'}
      ],
      comp:function(){
	$('.fr4')[0].currentTime=0;
	$('.fr4').data('paused','').on('ended',function(){
	  $('.fr4').data('paused','');
	  this.pause();
	  this.currentTime-=.1;
	})[0].play();
      }
    },
    {
      type:'content',hide:true,
      title:'Muren pt. 2 - Rob',
      pos:{x:'35cm'},
      elm:[
	{h:'100%',c:'fr5',type:'video',src:'vid/fr5.ogv'}
      ],
      comp:function(){
	$('.fr5')[0].currentTime=0;
	$('.fr5').data('paused','').on('ended',function(){
	  $('.fr5').data('paused','');
	  this.pause();
	  this.currentTime-=.001;
	})[0].play();
      }
    },
    {
      type:'content',hide:true,
      title:'Muren pt. 3 - Rob',
      pos:{x:'60cm'},
      elm:[
	{h:'100%',c:'fr8',type:'video',src:'vid/fr8.ogv'}
      ],
      comp:function(){
	$('.fr8')[0].currentTime=0;
	$('.fr8').data('paused','').bind('timeupdate',function(){
	  if(parseInt(this.currentTime,10)==0&&$(this).data('paused')!='true')
	    $(this).data('paused','true')[0].pause();
	}).on('ended',function(){
	  $('.fr8').data('paused','');
	  this.pause();
	  this.currentTime-=.001;
	})[0].play();
      }
    },
    {
      type:'content',hide:true,
      title:'Muren pt. 4 - Rob',
      pos:{x:'85cm'},
      elm:[
	{h:'100%',c:'fr3',type:'video',src:'vid/fr3.ogv'}
      ],
      comp:function(){
	$('.fr3')[0].currentTime=0;
	$('.fr3').data('paused','').on('ended',function(){
	  $('.fr3').data('paused','');
	  this.pause();
	  this.currentTime-=.001;
	})[0].play();
      }
    },
    {
      type:'content',hide:true,
      title:'Muren pt. 5 - Rob',
      pos:{x:'110cm'},
      elm:[
	{h:'100%',c:'fr2a',type:'video',src:'vid/fr2a.ogv'}
      ],
      comp:function(){
	$('.fr2a')[0].currentTime=0;
	$('.fr2a').data('paused','').on('ended',function(){
	  $('.fr2a').data('paused','');
	  this.pause();
	  this.currentTime-=.001;
	})[0].play();
      }
    },
    {
      type:'content',hide:true,
      title:'Muren pt. 6 - Rob',
      pos:{x:'135cm'},
      elm:[
	{h:'100%',c:'fr2b',type:'video',src:'vid/fr2b.ogv'}
      ],
      comp:function(){
	$('.fr2b')[0].currentTime=0;
	$('.fr2b').data('paused','').on('ended',function(){
	  $('.fr2b').data('paused','');
	  this.pause();
	  this.currentTime-=.1;
	})[0].play();
      }
    },
    {
      type:'content',hide:true,
      title:'Muren pt. 7 - Rob',
      pos:{x:'160cm'},
      elm:[
	{h:'100%',c:'fr2c',type:'video',src:'vid/fr2c.ogv'}
      ],
      comp:function(){
	$('.fr2c')[0].currentTime=0;
	$('.fr2c').data('paused','').on('ended',function(){
	  $('.fr2c').data('paused','');
	  this.pause();
	  this.currentTime-=.1;
	})[0].play();
      }
    },
    {
      type:'content',
      title:'Elektrochromie pt. 1 - Stef',
      pos:{x:'10cm',y:'20cm'},
      elm:[
	{h:'100%',c:'fr6',p:'vid/fr40000.png',type:'video',src:'vid/fr6.ogv'}
      ],
      comp:function(){
	$('.fr6')[0].currentTime=0;
	$('.fr6').data('paused','').bind('timeupdate',function(){
	  if(parseInt(this.currentTime,10)==5&&$(this).data('paused')!='5')
	    $(this).data('paused','5')[0].pause();
	  if(parseInt(this.currentTime,10)==7&&$(this).data('paused')!='7')
	    $(this).data('paused','7')[0].pause();
	  if(parseInt(this.currentTime,10)==10&&$(this).data('paused')!='10')
	    $(this).data('paused','10')[0].pause();
	}).on('ended',function(){
	  $(this).data('paused','')
	  this.currentTime=12.5;
	  this.play();
	})[0].play();
      }
    },
    {
      type:'content',
      title:'Zonnepanneel pt. 1 - Koen',
      pos:{x:'10cm',y:'40cm'},
      elm:[
	{h:'100%',c:'fr7',type:'video',src:'vid/fr7.ogv'}
      ],
      comp:function(){
	$('.fr7')[0].currentTime=0;
	$('.fr7').data('paused','').bind('timeupdate',function(){
	  if(parseInt(this.currentTime,10)==8&&$(this).data('paused')!='true')
	    $(this).data('paused','true')[0].pause();
	}).on('ended',function(){
	  $('.fr7').data('paused','');
	  this.pause();
	  this.currentTime-=.001;
	})[0].play();
      }
    },
    {
      type:'content',
      title:'Zonnepanneel pt. 2 - Koen',hide:true,
      pos:{x:'35cm',y:'40cm'},
      elm:[
	{h:'100%',c:'fr9',type:'video',src:'vid/fr9.ogv'}
      ],
      comp:function(){
	$('.fr9')[0].currentTime=0;
	$('.fr9').data('paused','').bind('timeupdate',function(){
	  if(parseInt(this.currentTime,10)==0&&$(this).data('paused')!='true')
	    $(this).data('paused','true')[0].pause();
	}).on('ended',function(){
	  $('.fr9').data('paused','')
	  this.pause();
	  this.currentTime-=.001;
	})[0].play();
      }
    },
    {
      type:'content',
      title:'Zonnepanneel pt. 3 - Koen',hide:true,
      pos:{x:'60cm',y:'40cm'},
      elm:[
	{h:'auto',type:'img',src:'http://yyhx.ciac.jl.cn/fileup/1000-0518/FIGURE/2015-32-12/Images/1000-0518-32-12-1431/img_1.png'}
      ]
    },
    {
      kind:'none',
      type:'none',hide:true,
      pos:{x:'2500px',y:'1000px',sc:7,}
    },
    {
      type:'content',
      title:'Einde - Rob',
      pos:{x:'135cm',y:'20cm'},
      elm:[
	{h:'100%',c:'fr1',type:'video',src:'vid/fr1_2.0.ogv'}
      ],
      comp:function(){
	$('.fr1')[0].currentTime=0;
	$('.fr1').data('paused','').on('ended',function(){
	  $('.fr1').data('paused','');
	  this.pause();
	  this.currentTime-=.001;
	})[0].play();
      }
    },
    {
      kind:'html',
      type:'html',
      title:'Office',
      pos:{/**x:'450px',/**/y:'253px',ry:90},
      content:`
      <style>
.kantoor, .kantoor > div { position:absolute }
.length,.width,.height { transform-style:flat; }
.length { height:20cm;transform:rotate(90deg) rotateY(-90deg) translate3d(5.6cm,0,10cm); }
.width { height:10cm;transform:rotateY(180deg) rotateX(90deg) translate3d(10.6cm,0,5cm); }
.height { height: 5cm;transform:rotateY(-90deg) translate3d(5.6cm,-5cm,-10cm); }
.length span,.width span,.height span {
  font-family:'Oswald';text-transform:uppercase;font-size:18px;font-weight:bold;
  position:absolute;top:50%;left:35px;
  width:60px;margin-top:-12.5px;}
.length span:before,.width span:before,.height span:before {content:'[ '}
.length span:after,.width span:after,.height span:after {content:' ]'}
.length:before,.width:before,.height:before {
  content:'';width:30px;top:0;bottom:0;left:0;position:absolute;
  background:url('http://clipartion.com/wp-content/uploads/2015/11/gt-brace-png.png');
  background-size: 100% 100%;transform:scale(-1,1);
  opacity:.8}
/* Walls */
.wall-n,.wall-w,.wall-o,.wall-s { float:right;height:5cm;background:#ccc; }
.wall-w { width:20.3cm;transform:translate3d(-10cm,-5cm,-5.3cm) }
.wall-n { width:10.6cm;transform:rotateY(-90deg) translate3d(0cm,-5cm,-5cm) }
.wall-o { width:10.3cm;transform:translate3d(0,-5cm, 5.3cm) }

.wall-n div,.wall-o div,.wall-w div { float:right;height:5cm;background:#ffe; }
.wall-n div { width:10cm;transform:translate3d(-.3cm,0,.3cm) }
.wall-o div { width:10cm;transform:translate3d(-.3cm,0,-.3cm) }
.wall-w div { width:20cm;transform:translate3d(-.3cm,0,.3cm) }

.vloer { width:20cm;height:10cm;background:#aaa;left:-10cm;top:-5cm;transform:rotateX(90deg) }

.dak { width:20.3cm;height:.3cm;transform:rotateX(90deg) translate3d(-10cm,-5.15cm,5.15cm) }
.dak,.dak div {float:right;background:#888;}
.dak .one { width:10.6cm;height:.3cm;transform:rotate(90deg) translate3d(5.15cm,-5.15cm,0) }
.dak .two { width:10cm;height:.3cm;transform:translate3d(-.3cm,10cm,0) }
.dak .tre { width:5cm;height:.3cm;transform:rotateY(90deg) translate3d(2.5cm,-.3cm,-7.8cm) }
.dak .for { width:5cm;height:.3cm;transform:rotateY(90deg) translate3d(2.5cm,10cm,7.2cm) }
.dak .fiv { width:10.6cm;height:10.6cm;border-left:.3cm dashed #888;border-bottom:.3cm dashed #888;
  background:transparent;transform:translate3d(-9.7cm,-.6cm,0) }
  
.kamers { width:20cm;height:10cm;left:-10cm;top:-5cm;transform:rotateX(90deg) }
.kamers > div { position:absolute;width:5cm;height:5cm;opacity:1 !important }
.kamers > div > div { width:5cm;height:5cm;transform:translate3d(0,-2.5cm,2.5cm) rotateX(90deg);outline: 1px solid #bbb;
  border-top:1cm solid #ccc;border-bottom:1cm solid #ccc;border-left:1.7cm solid #ccc;border-right:1.7cm solid #ccc; }
.kamers > .door > div { border-top:none; }
.kamers > :not(.door) > div { background:rgba(0,100,150,.3); }
.kamers .e { top:0; }.kamers .f { top:5cm; }
.kamers .a { right:.3cm; }.kamers .b { right:5cm; }.kamers .c { right:10cm; }.kamers .d { right:15cm }
.kamers .a.e div { transform:translate3d(-.3cm,-2.5cm,2.5cm) rotateX(90deg); }
.kamers .a.f div { transform:translate3d( .3cm,-2.5cm,2.5cm) rotateX(90deg); }
.kamers > div > div:before { content:'';display: inline-block;width:5cm;height:6px;
  background:#ccc;transform:rotateX(90deg) translate3d(-1.7cm,0,-3.7cm); }

.kamers .a.e { transform:rotateZ(180deg) }
.kamers .b.e { transform:rotateZ(180deg) }
.kamers .c.e { transform:rotateZ(-90deg) }
.kamers .c.f { transform:rotateZ(90deg) }
.kamers .d.e { transform:rotateZ(180deg) }
.kamers .d.f { transform:rotateZ(90deg) }

/* Stoelen */
.stoel {transform:rotateX(90deg) translate3d(-8.6cm,3cm,0) rotateZ(95deg) }
.stoel  svg { position:absolute; }
.stoel .one { fill:#000 }
.stoel .two,.stoel .twob,.stoel .tre,.stoel .treb,.stoel .for,.stoel .forb,.stoel .fiv,.stoel .fivb,.stoel .sixb{ fill:#cf6 }
.stoel .six{ fill:#DFD }
.stoel .one,.stoel .fiv,.stoel .fivb,.stoel .six,.stoel .sixb{ width:40px;height:40px; }
.stoel .two,.stoel .twob,.stoel .tre,.stoel .treb,.stoel .for,.stoel .forb{ width:40px;height:80px;}
.stoel .two  { transform:rotateX(-90deg) translateY(-40px) }
.stoel .twob { transform:rotateX(-90deg) translate3d(0,-40px,-5px) }
.stoel .tre  { transform:rotateX(-90deg) rotateY(-90deg) translate3d(-20px,-40px,-20px) }
.stoel .treb { transform:rotateX(-90deg) rotateY(-90deg) translate3d(-20px,-40px,-15px) }
.stoel .for  { transform:rotateX(-90deg) rotateY(-90deg) translate3d(-20px,-40px,20px) }
.stoel .forb { transform:rotateX(-90deg) rotateY(-90deg) translate3d(-20px,-40px,15px) }
.stoel .fiv  { transform:rotateX(-90deg) translate3d(0,-20px,-20px) }
.stoel .fivb { transform:rotateX(-90deg) translate3d(0,-20px,-15px) }
.stoel .six  { transform:translate3d(0,0px,40px) }
.stoel .sixb { transform:translate3d(0,0px,80px) }

/* Bureau's */
.bureau.a {transform:translate3d(-7.5cm,0,1cm) rotateY(-45deg) rotateX(90deg)}
.bureau.b {transform:translate3d(3.75cm,0,2cm) rotateX(90deg) }
.bureau  svg { position:absolute;fill:#643 }
.bureau .one,.bureau .two,.bureau .twob,.bureau .for,.bureau .forb,.bureau .sixb { width:100px;height:50px; }
.bureau .tre,.bureau .treb,.bureau .fiv,.bureau .fivb { width:50px;height:50px; }
.bureau .six  { width:110px;height:60px; }
.bureau .two  { transform:rotateX(90deg) translate3d(0,25px,-25px) }
.bureau .twob { transform:rotateX(90deg) translate3d(0,25px,-20px) }
.bureau .tre  { transform:rotateX(90deg) rotateY(-90deg) translate3d(0,25px,25px) }
.bureau .treb { transform:rotateX(90deg) rotateY(-90deg) translate3d(0,25px,20px) }
.bureau .for  { transform:rotateX(90deg) translate3d(0,25px,25px) }
.bureau .forb { transform:rotateX(90deg) translate3d(0,25px,20px) }
.bureau .fiv  { transform:rotateX(90deg) rotateY(-90deg) translate3d(0,25px,-75px) }
.bureau .fivb { transform:rotateX(90deg) rotateY(-90deg) translate3d(0,25px,-70px) }
.bureau .sixb { transform:translate3d(0,0,5px) }
.bureau .six  { transform:translate3d(-5px,-5px,50px);stroke:#432;fill:#363 }
.bureau .pc { position:absolute }
.bureau .pc img { border-radius:0 0 5px 5px;width: 42px;height: 20px;transform: translate3d(30px,20px,51px); }
.bureau .pc .screen {width:28cm;height:20cm;transform-origin: 0 0 0;border:50px solid #eee;border-radius:50px 50px 0 0;
  transform:translate3d(30px,20px,50px) rotateX(-80deg) translateY(-30px) scale3d(.04,.04,.04) }

.plant { transform:translate3d(8.2cm,0,-4.7cm) rotateX(90deg) }
.plant > div, .plant > img { position:absolute }
.plant .one,.plant .two,.plant .tre,.plant .for { width:40px;height:50px;background:#db9; }
.plant .fiv,.plant .six { width:40px;height:40px;background:#db9; }
.plant .svn, .plant .egt { width:80px;height:120px; }
.plant .one { transform:rotateX(90deg) rotateY(-90deg) translate3d(0,25px,20px) }
.plant .two { transform:rotateX(90deg) translate3d(0,25px,-20px) }
.plant .tre { transform:rotateX(90deg) rotateY(-90deg) translate3d(0,25px,-20px) }
.plant .for { transform:rotateX(90deg) translate3d(0,25px,20px) }
.plant .fiv { transform:translate3d(0,5px,1px) }
.plant .six { transform:translate3d(0,5px,45px);background:brown }
.plant .svn { transform:rotateX(-90deg) translate3d(-20px,-100px,-35px) }
.plant .egt { transform:rotateX(-90deg) translate3d(-20px,-100px,-35px) rotateY(-90deg) }

</style>

<div class="kantoor">
  <div class="length"><span>20 m</span></div>
  <div class="width"><span style="transform:scale(-1,-1)">10 m</span></div>
  <div class="height"><span> 5 m</span></div>
  
  <div class="stoel">
    <svg class="one"><path d="M0 0 h5 v5 h-5 Z M35 0 h5 v5 h-5 Z M0 35 h5 v5 h-5 Z M35 35 h5 v5 h-5 Z"></svg>
    <svg class="two"><path d="M0 0 h40 v80 h-5 v-30 h-30 v30 h-5 Z"></svg>
    <svg class="twob"><path d="M0 0 h40 v80 h-5 v-30 h-30 v30 h-5 Z"></svg>
    <svg class="tre"><path d="M0 40 h35 v-40 h5 v80 h-5 v-30 h-30 v30 h-5 Z"></svg>
    <svg class="treb"><path d="M0 40 h35 v-40 h5 v80 h-5 v-30 h-30 v30 h-5 Z"></svg>
    <svg class="for"><path d="M0 40 h35 v-40 h5 v80 h-5 v-30 h-30 v30 h-5 Z"></svg>
    <svg class="forb"><path d="M0 40 h35 v-40 h5 v80 h-5 v-30 h-30 v30 h-5 Z"></svg>
    <svg class="fiv"><path d="M0 0 h40 v40 h-5 v-30 h-30 v30 h-5 Z"></svg>
    <svg class="fivb"><path d="M0 0 h40 v40 h-5 v-30 h-30 v30 h-5 Z"></svg>
    <svg class="six"><path d="M0 0 h40 v40 h-40 Z"></svg>
    <svg class="sixb"><path d="M0 35 h40 v5 h-40 Z"></svg>
  </div>
  
  <div class="bureau a">
    <svg class="one"><path d="M0 0 h5 v5 h-5 Z M95 0 h5 v5 h-5 Z M0 45 h5 v5 h-5 Z M95 45 h5 v5 h-5 Z"></svg>
    <svg class="two"><path d="M0 0 h5 v5 h90 v-5 h5 v50 h-100 Z"></svg>
    <svg class="twob"><path d="M0 0 h5 v5 h90 v-5 h5 v50 h-100 Z"></svg>
    <svg class="tre"><path d="M0 0 h5 v5 h40 v-5 h5 v50 h-50 Z"></svg>
    <svg class="treb"><path d="M0 0 h5 v5 h40 v-5 h5 v50 h-50 Z"></svg>
    <svg class="for"><path d="M0 0 h5 v5 h90 v-5 h5 v50 h-100 Z"></svg>
    <svg class="forb"><path d="M0 0 h5 v5 h90 v-5 h5 v50 h-100 Z"></svg>
    <svg class="fiv"><path d="M0 0 h5 v5 h40 v-5 h5 v50 h-50 Z"></svg>
    <svg class="fivb"><path d="M0 0 h5 v5 h40 v-5 h5 v50 h-50 Z"></svg>
    <svg class="six"><path stroke-width="10" d="M5 5 h100 v50 h-100 Z"></svg>
    <svg class="sixb"><path d="M0 0 h100 v50 h-100 Z"></svg>
    
    <div class="pc">
      <img src="http://www.laptopmag.com/images/uploads/ppress/43753/APPLE_SH_keyboard.jpg" />
      <iframe class="screen" src="./index.html?p=Werkplek%20van%20de%20toekomst%20-%20Introductie" />
    </div>
  </div>
  
  <div class="bureau b">
    <svg class="one"><path d="M0 0 h5 v5 h-5 Z M95 0 h5 v5 h-5 Z M0 45 h5 v5 h-5 Z M95 45 h5 v5 h-5 Z"></svg>
    <svg class="two"><path d="M0 0 h5 v5 h90 v-5 h5 v50 h-100 Z"></svg>
    <svg class="twob"><path d="M0 0 h5 v5 h90 v-5 h5 v50 h-100 Z"></svg>
    <svg class="tre"><path d="M0 0 h5 v5 h40 v-5 h5 v50 h-50 Z"></svg>
    <svg class="treb"><path d="M0 0 h5 v5 h40 v-5 h5 v50 h-50 Z"></svg>
    <svg class="for"><path d="M0 0 h5 v5 h90 v-5 h5 v50 h-100 Z"></svg>
    <svg class="forb"><path d="M0 0 h5 v5 h90 v-5 h5 v50 h-100 Z"></svg>
    <svg class="fiv"><path d="M0 0 h5 v5 h40 v-5 h5 v50 h-50 Z"></svg>
    <svg class="fivb"><path d="M0 0 h5 v5 h40 v-5 h5 v50 h-50 Z"></svg>
    <svg class="six"><path stroke-width="10" d="M5 5 h100 v50 h-100 Z"></svg>
    <svg class="sixb"><path d="M0 0 h100 v50 h-100 Z"></svg>
  </div>
  
  <div class="plant">
    <div class="one"></div><div class="two"></div>
    <div class="tre"></div><div class="for"></div>
    <div class="fiv"></div><div class="six"></div>
    <img class="svn" src="http://freecutout.com/wp-content/uploads/2015/03/feecutout_tree_02.png" />
    <img class="egt" src="http://freecutout.com/wp-content/uploads/2015/03/feecutout_tree_02.png" />
  </div>  
  
  <div class="vloer"></div>
  <div class="kamers">
    <div class="a e"><div></div></div>
    <div class="a f"><div></div></div>
    <div class="b e"><div></div></div>
    <div class="b f"><div></div></div>
    <div class="c e door"><div></div></div>
    <div class="c f door"><div></div></div>
    <div class="d e door"><div></div></div>
    <div class="d f"><div></div></div>
  </div>
  <div class="wall-n"><div></div></div>
  <div class="wall-w"><div></div></div>
  <div class="wall-o"><div></div></div>
  <div class="dak">
    <div class="one"></div>
    <div class="two"></div>
    <div class="tre"></div>
    <div class="for"></div>
    <div class="fiv"></div>
  </div>
  
</div>
      `
//       contenturl:'3d/Heijmans-01.html'
    }
  ]
  
});
slideshowdata.push({
  title:'Een kolonie in de ruimte?',
  sta:1,
  style:'space',
  load:'long',
  slides: [
    {
      type:'title',
      title:' Een kolonie in de ruimte?',
      subtitle:'Door: Gijs, Robin, Luuk en Lars - V3D',
      effect:'blind'
    },
    {
      type:'content-right',
      title:'Het project',
      list:{items:[
	      {title:'Bestemming'},
	      {title:'Mars'},
	      {title:'Onderzoeken:',items:['Omstandigheden planeet','Klimaat op de planeet',
		{title:'Analyse van de planeet',items:['Problemen en oplossingen']}]},
	      {title:'Verslag',items:['Onderzoeksverslag']}
      ]},
      elm:[
	{caption:'Odyssey-programma',src:'http://ssicsim.ca/wp-content/uploads/2014/08/SSICsim-Fall-2014-The-Odyssey-Program.pdf'},
	{caption:'Poster',src:'https://drive.google.com/file/d/0B51JKcEdNx3pYndSS2p0LTUyRlE/preview',type:'embed'}
      ]
    },
    {
      type:'content-right',
      title:'Problemen en oplossingen',
      list:{items:[
	      {title:'Ruimte',items:[
		'Problemen: Temperatuur, Atmosfeer (of het gebrek daaraan), Straling, etc.',
		'Oplossingen (alg.): Beschermende pakken, Basis, Terraformen(?)'
	      ]},
	      {title:'<i>Resources</i>',items:[
		'Problemen: Water, Voedsel, Energie',
		'Oplossingen (resp.): Recyclen, Verbouwen, bv. Methaan'
	      ]}
	      ]},
      elm:[{caption:'Astronaut Mike Hopkins in een beschermend pak',src:'http://www.nasa.gov/sites/default/files/11572307115_1194957269_o_0.jpg'},
	    {caption:'Still uit <cite>The Martian</cite>',src:'http://cdn.modernfarmer.com/wp-content/uploads/2015/10/matt-damon-martian.jpg',type:'img'}
      ]
    },
    {
      type:'default',
      title:'Eten in de ruimte',
      list:{items:[
	{title:'Quinoa:',items:['Weinig water nodig','Op dezelfde manier als graan geteeld','Veilig naar Mars vervoeren']},
	{title:'Ruimtesla:',items:['Paarse kleur','Smaakt naar rucola','Groeit in kleine ruimte, het is dus ruimte-effici&euml;nt']}
      ]},
      hide:true
    },
    {
      type:'content-right',
      title:'Energie',
      list:{items:['Zonne-energie','Windenergie','Methaan','Kernenergie']},
      elm:[
	{src:'http://magmens.com/uploads/posts/2014-04/1397464102_mars-one-2018-lander.jpg'},
	{src:'http://images.fondecranhd.net/deserts/dgwr0isiz0x.jpg'},
	{src:'http://cdn.kme.si/public/images-cache/750xX/2015/10/07/33fb0c0efcb6638b8d15c8e25e9f4fb3/5614c466d6c20/33fb0c0efcb6638b8d15c8e25e9f4fb3.jpeg'}
      ],
      bgr:{src:'http://astrobites.org/wp-content/uploads/2015/05/mars.jpg'},
      hide:true
    },
    {
      type:'content-right',
      title:'Zwaartekracht en osteoporosis',
      list:{items:['Constante weerstand','Vaccu&uuml;m','iRED vs ARED']},
      elm:[
	{src:'https://www.youtube.com/embed/05oOst9kZXQ',type:'iframe'},
	{src:'https://lh3.googleusercontent.com/0EB2r081u8FcrFYwWzmh8dRFJdzvvo0OHlmuVmVbMOhXTMx8leLgPXBhyg8isT4iCCrsl-ttyDnmZ-WZymy_ASElbiDoy-TywPEhEx-eHSMCt_nU64fyu1PPe_554Z8Mc4OY2Koc8ik-h69pSyiYbLu1slvHLJgvYaUX8MXkqi8pUNzuTN8ABDXDsGrEz_D3GO7kqvzscVo0vvygrvOFf3sSy3l5vI0OHsjER6BbD3cgjrM08WK9ibNvChjaOtxQSKDTsUqx4LL9-t6fhL_c1rCjnCoWEgpOEpoFOXoFgClNRHzYGAgoFWjjxL_DbypG74svD2XBl_xAH0pXMBC90Lyl8kzxMH6NkhKT_Kl2kWZ_r7T2Wl2DAUiDOP0VHlXQl1Ox0MAgXr6jcjv9Urc4vBRsnUwijHexw9s0ssqs4lGJlV_asTLMt5M49JQDz13cD7BVrleBQ7Ognf1SdsRZ_QujNO3L4C1wDOgt9dlTnfoKROwyyD5w7zN-Qcac4UPibOvL4L6ugQFbvZE_bUyctc9LuwYnTxTJAYxqleLtiXOoKD5wHrNoXtNiCFqNNvoZrmJX=w956-h538-no',type:'img'}
      ],
      hide:true
    },
    {
      type:'default',
      title:'Programma van Eisen',
      list:{items:[
	{title:'Bronnen:',items:['Richtlijnen voor het onderzoeksverslag','VU, Faculteit der Letteren','Vooral voor letterkunde, toch toepasbaar']},
	{title:'Onderzoeksverslag Type B: Exploratief'},
	{title:'Structuureisen, bv.',items:['Inleiding: o.a. motivatie','Kern I: Data en methode','Kern II: Resultaten en analyse','Slot: Conclussie en discussie']}
      ]}
    }
  ]
});
slideshowdata.push({
  title: 'Share & Care',
  sta: 1,
  style:'segment',
  slides: [
    {
      type:'title',
      title:'Share and Care',
      subtitle:'Door: Isabel D, Gijs en Lars - V3D',
      effect:'blind'
    },
    {
      type:'default',
      title:'Het project',
      list:{items:[{title:'Herbestemming'},
	      {title:'Community van 30- en 60+'},
	      {title:'Onderzoeken:',items:['woonwensen van beide leeftijdsgroepen','herbestemd erfgoed','analyse van de kerk']},
	      {title:'Ontwerpen',items:['maquette (leeg/ingedeeld)']}
	      ]},
      effect:'puff'
    },
    {
      type:'content-right',
      title:'Planning en Samenwerking',
      list:{items:[
	      {title:'Planning',items:['Goed ingevuld &#10142; elke week' , 'Heel handig voor als je niet weet wat je moet doen' , 'Samen bedacht en ingevuld']},
	      {title:'Samenwerking',items:['Goede samenwerking &#10142; veel gedaan']}
	      ]},
      elm:[{src:'http://www.blackwomenshealth.com/site_media/uploads/article_pictures/todolist.jpg'}],
      effect:'clip'
    },
    {
      type:'default',
      title:'Het Vaktaalveld',
      list:{items:[
	      {title:'Verdeeld in twee delen:',items:['architectuur &#10142; belangrijke begrippen uit kerken (schip, etc.)','overige vaktermen &#10142; andere belangrijke woorden (community, etc.)']},
	      {title:'Onderzoeken:',items:['"Wat hebben de begrippen te maken met het project?"']}
	      ]},
      effect:'drop'
    },
    {
      type:'default',
      title:'Herbestemd Erfgoed',
      list:{items:[
	      {title:'Onderzoeken:',items:['Watertoren Den Bosch','Woonkerk Utrecht','Kantoorkerk Dieren']},
	      {title:'Alvast voorbereiden op het ontwerpen van de kerk'}
	      ]},
      effect:'explode'
    },
    {
      type:'content-right',
      title:'Analyses',
      list:{items:[
	      {title:'Doelgroep',items:[
		{title:'Enquete:',items:['verschillende onderwerpen (verdieping, keuken, etc.) voor een zo breed mogelijk beeld','afgenomen bij 10 mensen']},
		{title:'Resultaten:',items:['tabel gemaakt','resultaten van ons en ander groepje']}
	      ]},
	      {title:'Kerk',items:['Foto\'s ingevoegd' , 'Tekst en tabel &#10142; overzicht' , 'Alvast voorbereiden op het ontwerpen en de keuze van de kerk']
		
	      }]
	      },
      elm:[{caption:'Don Boscokerk',src:'https://www.google.com/maps/embed?pb=!1m0!3m2!1snl!2snl!4v1445086495017!6m8!1m7!1sGPnPlieEYKhBxwOafEXFBg!2m2!1d51.42135017098629!2d5.497514913465278!3f7.727760647701283!4f13.522892746447312!5f0.7820865974627469'/*,src:'img/cus/DONBOSCO.png'*/},
	      {caption:'Onze-lieve-vrouwe van Fatimakerk',src:'https://www.google.com/maps/embed?pb=!1m0!3m2!1snl!2snl!4v1445086365431!6m8!1m7!1sDDnXUJesjfeaQfuWmv9fUQ!2m2!1d51.42746589739284!2d5.4946942319357!3f89.59382773475005!4f-2.399056718016496!5f0.4000000000000002'/*,src:'img/cus/FATIMA.png'*/}
	    ],
      effect:'fade'
    },
    {
      type:'default',
      title:'Kerk en ontwerp',
      list:{items:[
	      {title:'Keuze kerk',items:[
		{title:'Onze-Lieve-Vrouwe van Fatimakerk',items:['Geschikte vorm en grote kelder','Beter in te richten dan de Don Boscokerk']}
	      ]},
	      {title:'Ontwerp',items:[
		{title:'30- kamers:',items:['meerdere verdiepingen/plateaus','meer slaapkamers (ivm kinderen)']},
		{title:'60+ kamers',items:['&Eacute;&eacute;n verdieping','&Eacute;&eacute;n/twee slaapkamers (ivm bezoek)']}
	      ]}
	      ]},
      effect:'fold'
    },
    {
      type:'default',
      title:'Programma V. Eisen',
      list:{items:[
	      {title:'Technische eisen, bv.',items:['goede isolatie (temperatuur en geluid)','passende deuren']},
	      {title:'Designeisen, bv.',items:['Eettafel in gezamelijke ruimte','mooie lichtinval']},
	      {title:'Overige eisen, bv.',items:['gezamelijke ruimte']}
	      ]},
      effect:'scale'
    },
    {
      type:'content-right',
      title:'Eindproduct',
      text:['Foto van de maquette'],
      elm:[{src:'img/cus/MAQUETTE-4.jpg'},{src:'img/cus/MAQUETTE-1.jpg'},{src:'img/cus/MAQUETTE-2.jpg'},{src:'img/cus/MAQUETTE-3.jpg'},{src:'img/cus/MAQUETTE-5.jpg'},{src:'img/cus/MAQUETTE-6.jpg'}],
    }
  ]
});