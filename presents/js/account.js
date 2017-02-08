String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function getJSON(data) {
  try { return JSON.parse(data); }
  catch (e) { return eval(data);console.warn(e) }
}

function resetAccount() {
  Cookies.remove('account');
  Cookies.set('account',account/*,{expires:7}*/);
}

function updateAccountInfo() {
  console.log(account)
  
  $('.T-p .owner').html(account.owner);
  $('.T-p .presentation').html(account.slideshowdata.length + ' presentation'+(account.slideshowdata.length!=1?'s':''));
  $('.T-p img.cover').attr('src'             ,       account.cover    );
  $('.T-p div.cover'). css('background-image','url('+account.cover+')');
  $('#T-Sc-Fa-d').val(btoa(JSON.stringify(account)));
  if (!showsDisplayed||$('#L-Ca-b .T-t').length!=account.slideshowdata.length) {
    var elm = $('#L-Ca-b');
	showsDisplayed=true;
    elm.children('.T-t').remove();
    for (var i=0;i<account.slideshowdata.length;i++) {
      var sls = account.slideshowdata[i];
      elm.append(
	'<div data-idx="'+i+'" class="T-t">'+
	  '<div class="tn">'+(account.slideshowdata[i].slides.length>0?parseSlide(account.slideshowdata[i],0,true):'')/*.replace(/(iframe)/g,'div').replace(/(img|video|embed)/g,'br')*/+'</div>'+
	  '<p>&nbsp;<span class="t-a">'+sls.title+(sls.type=='puzzle'?' (3D)':'')+'</span><i class="t-b more material-icons">more_vert</i></p>'+
	'</div>'
      );
      elm.find('.T-t').last().find('.slide').attr('style','');
    }
    $('#L-Ca-b .T-t .more,#L-Ca-b .T-t').ripple();
    $('#L-Ca-b .T-t').click(function(ev){if(!$(this).hasClass('T-t')||ev.target==this){
      displaySlides(account.slideshowdata[$(this).data('idx')]);
    }});
    
    $('#L-Ca-b .T-t .more').click(function(){
      var ame = $('#L-Ca-b-Ma'),
	  elm = $(this).parents('.T-t'),
	  idx = elm.data('idx');
	  ame.data('idx',idx);
      if (ame.hasClass('closed')) {
	var left = (elm.outerWidth (true) + elm.position().left) - parseInt(elm.css('margin-right' )) - ame.outerWidth(),
	    top  = (elm.outerHeight(true) + elm.position().top ) - parseInt(elm.css('margin-bottom'));
	ame.css({left:left,top:top}).removeClass('closed');
      } else ame.addClass('closed');
    });
  }
}

/* Global support variabels: */

var
    // Set up account
    account = (function (){
      if(Cookies.get('account'))return getJSON(Cookies.get('account'));
      else return{
	owner:'Lars Willighagen',
	cover:'https://lh3.googleusercontent.com/sXPQRB1nAstxq14c-HX4PWsJ4lqF-dpQ9KzOH9Q7acjCXn34xok88AZgGD81DxTcHsBmV6Be16kB8V9X3DDWpoOuXP-aHRShc-_rJvb7MNhCZ9Qnu5BhPw56r2dd00mUol8OZNyeqrlNRyn7ViCKS9ZRJlmm0eNsTZqYQpsBvm1Aadc-3nh-_nAWfu9SFHDMmSWYPRnksDBBBViD96qaf4HWPDg_tnEMbOCklpjlizjrAg2S_V-Z4otnawXkWY7AU_HXRpUk-r45HTN2p18ikdEVMU95JHBuXnp6eWunKXCiMcR-gJ4yoQ_qsFRPq7H5zze7uk9wwYsxWqqXNnHiUGt5bh0iiThoZ6pa-1Va_fGx5h8RKKqkLKeLof70n6fluVKGfSt38umfVwXW_cDDQeK035LUVHcPeVrdbAADE8fS4nRzKdv5h_RpQ5_4Gupy1RQnheRabiYckq0T4ENTdENSg5yCl01GBARDmpNSOwVJWIs1SJ45xwMdWbc-Q9FLK4rlQLVLNE5i7cvHIPcUdAkWr4BcN_wZhruI21X_jUGwvW5qaR1fgkUv0kv2rjmfqSyw=w956-h637-no',
	slideshowdata:[
	  {
	    title:"Welcome!",
	    slides:[
	      {
		type:"title",
		title:"Welcome",
		subtitle:"to Presentations",
	      },{
		type:"default",
		title:"Here,",
		subtitle:"you can make fancy presentations,",
		text:"Like this one.\n\nYou can make paragraphs,\n\n* lists, and\n\n## Headers"
	      },{
		type:"content-right",
		title:"You may even add pictures",
		elm:[
		  {
		    src:'https://placehold.it/300x150',
		    type:'img'
		  }
		]
	      }
	    ]
	  }
	]
      }
    })(),
    showsDisplayed = false,
    
    
    
    unused_variabel_b;