var adminAccount = {
  owner:"Lars Willihagen",
  cover:"http://www.wall321.com/thumbnails/detail/20121107/android%20google%20android%20jelly%20bean%201920x1080%20wallpaper_www.wall321.com_26.jpg",
  slideshowdata:[
    {
      'title':'Example',
      'sta': 1,
      'style':'normal',
      'slides': [
	{
	  'type':'title',
	  'title':'Title',
	  'subtitle':'Subtitle',
	  
	},
	{
	  'type':'default',
	  'title':'Title',
	  'subtitle':'and subtitle',
	  'text':['Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet.'],
	  'list':{'items':['L','I','S','T']}
	},
	{
	  'type':'content-right',
	  'title':'Title',
	  'subtitle':'and subtitle',
	  'text':['Lorem ipsum dolor sit amet.'],
	  'elm':[{'src':'http://nos.nl/data/image/2015/10/14/200816/864x486.jpg'},{'src':'http://nos.nl/data/image/2015/10/14/200817/864x486.jpg'}]
	},
	{
	  'type':'content-left',
	  'title':'Title',
	  'subtitle':'and subtitle',
	  'text':['Lorem ipsum dolor sit amet.'],
	  'elm':[{'src':'http://nos.nl/data/image/2015/10/14/200817/864x486.jpg'}],
	  'bgr':{'src':'http://xkcd.com','typ':'iframe'}
	},
	{
	  'type':'content',
	  'title':'Title',
	  'subtitle':'and subtitle',
	  'text':['Lorem ipsum dolor sit amet.'],
	  'elm':[{'src':'http://nos.nl/data/image/2015/10/14/200817/864x486.jpg'}]
	},
	{
	  'type':'content',
	  'title':'Title',
	  'subtitle':'and subtitle',
	  'elm':[{'src':'data.html'}],
	  'hidden':true
	}
      ]
    },
    {
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
	      'The slide-hiding mechanism isn\'t perfect yet - but hey: it exists!'
	    ]}},
	    {'title':'Solved Issues:',
	    'list':{'title':'Solved issues','items':[
	      'Perspective fixed; applied to .slider',
	      'Scaling does work proportionally (Fixed by changing the library)',
	      'You can now toggle the axes',
	      'You now have the option to make slides invisible on the backside - just like this one',
	      'You now have the option to put ordered lists in slides',
	      'Slides now appear in order - let\'s hope it stays that way!',
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
    },
    {
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
    },
    {
      title:'Syntaxis - Voorbeelden',
      sta: 1,
      type:'puzzle',
      load:'puzzle',
      style:'dev2',
      slides: [
	{
	  text:[
	      '<h3>Voorbeeld 1:</h3>',
	      '<pre><code class="javascript">var variabele = \'waarde\' ; // => "waarde"</code></pre>',
	      '<h3>Waardes:</h3>',
	      ('<table><thead><tr>'+
		'<td>Voorbeeld</td><td>Naam</td><td>Uitleg</td>'+
	      '</tr></thead><tr>'+
		'<td><code>"abc"</code></td>'+
		'<td>String</td><td>Tekst</td>'+
	      '</tr><tr>'+
		'<td><code>123</code></td>'+
		'<td>Integer</td><td>Nummer</td>'+
	      '</tr><tr>'+
		'<td><code>123.456</code></td>'+
		'<td>Float</td><td>Decimaal nummer</td>'+
	      '</tr><tr>'+
		'<td><code>true</code></td>'+
		'<td>Boolean</td><td>Waar of niet waar</td>'+
	      '</tr><tr>'+
		'<td><code>["abc",123,true]</code></td>'+
		'<td>Array</td><td>Lijst</td>'+
	      '</tr><tr>'+
		'<td>...</td>'+
		'<td>...</td><td>...</td>'+
	      '</tr></table>'),
	      '<h3>Voorbeeld 2:</h3>',
	      '<pre><code class="javascript">if ( 1 + 1 === 2) {\n\t...;\n}</code></pre>'
	    ]
	},
	{
	  text:[
	      '<h3>Voorbeeld 3:</h3>',
	      '<pre><code class="mathematica">f(x): y = x<sup>2</sup> + x - 4</code></pre>',
	      '<h3>Voorbeeld 4:</h3>',
	      '<pre><code class="mathematica">'+
		'Voer in y<sub>1</sub> = x<sup>2</sup> - 7x + 12,\n\t\ty<sub>2</sub> = x<sup>2</sup> + x - 4.\n\n'+
		'De optie ROOT<sub>y<sub>1</sub></sub> geeft x = -2,56 &or; x = 1,56.\n\n'+
		'Dus de snijpunten met de x-as zijn (-2,56;0) en (1,56;0).'+
	      '</code></pre>',
	      '<h3>Voorbeeld 5:</h3>',
	      '<pre style="vertical-align:top;display:inline-block;width:48%;float:left;"><code class="javascript">'+
		'var y1 = x<sup>2</sup> - 7x + 12,\n\ty<sub>2</sub> = x<sup>2</sup> + x - 4;'+
	      '</code></pre>'+
	      '<pre style="display:inline-block;width:48%;float:right;"><code class="javascript">'+
		'var f = function (x) {\n\t\tvar resultaat = x<sup>2</sup> - 7x + 12;\n\t\treturn resultaat;\n\t},\n\tg = function (x) {\n\t\treturn x<sup>2</sup> + x - 4;\n\t};'+
		'\n\nvar y = f(2); // => 2'+
	      '</code></pre>'
	    ],
	  pos:{x:'1050px'}
	},
	{
	  text:[
	      '<h3>Voorbeeld 6:</h3>',
	      '<pre><code class="nohighlight">De man at de appel</code>'+
	      '<code class="nohighlight"><span class="zo-o">De man</span> <span class="zo-pv">at</span> <span class="zo-lw">de appel</span></code></pre>',
	      '<h3>Voorbeeld 7a:</h3>',
	      '<pre><code class="nohighlight">Als een plus een twee is, doe dit: zeg \'abcd\', schrijf op \'9\' en zeg \'waar\'.</code>'+
	      '<code class="nohighlight"><span class="zo-bwb">Als een plus een twee is,</span> <span class="zo-pv">doe</span> <span class="zo-lw">dit: zeg \'abcd\', schrijf op \'9\' en zeg \'waar\'</span>.</code></pre>',
	      '<h3>Voorbeeld 7b:</h3>',
	      '<pre><code class="javascript">if ( 1 + 1 == 2) {\n\talert("abcd");\n\tconsole.log(9);\n\talert(true);\n}</code></pre>'
	    ],
	  pos:{x:'2100px'}
	},
	{
	  kind:'none',
	  type:'none',
	  pos:{rx:'-30',ry:'-30',x:'1050px',sc:'3'},
	  comp:function(){
	    $('.rotate-container').transition({
	      rotateY:'+=1080',
	      queue:false
	    },100000,'linear');
	  }
	}
      ]
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
	  contenturl:'3d/Heijmans-01.html'
	}
      ]
      
    },
    {
      title:'test',
      sta:1,
      style:'dev2',
      load:'puzzle',
      type:'puzzle',
      slides:[
        {kind:'none',type:'none',pos:{y:'100px',ry:45,rx:45}},
	{
	  kind:'html',
	  type:'html',
	  title:'Office',
	  pos:{x:'450px',y:'253px',ry:90},
	  contenturl:'../cube.html'
	}
      ]
    }
  ]
}
