slideshowdata.push({
  'title':'Syntaxis - Voorbeelden',
  'sta': 1,
  type:'puzzle',
  load:'puzzle',
  'style':'dev2',
  'slides': [
    {
      'text':[
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
      'text':[
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
      'text':[
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
})