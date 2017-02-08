function Dialog(id,data,options) {
  
  if ( !(this instanceof Dialog) )
    return new Dialog(id,data,options);
  
  if ( !id )
    throw new TypeError('An ID has not been specified');
  
  var data = data || {};
  
  data.title = typeof data.title === 'string' ? data.title : '';
  data.text = Array.isArray(data.text) ? data.text : [];
  data.buttons = Array.isArray(data.buttons) ? data.buttons : [];
  
  var dialog = document.createElement('div'),
      header = document.createElement('h1'),
      text = data.text.map(function(v,i){
	var con = document.createElement('p');
	if ( typeof v === 'string' ) {
	  con.innerText = v;
	} else if ( typeof v === 'object' && ['input'].indexOf(v.type) >= 0) {
	  var elm = document.createElement(v.type);
	  for (var i in v.attributes) {
	    elm.setAttribute(i,v.attributes[i]);
	  }
	  if ( v.text )
	    elm.innerText = v.text;
	  con.appendChild(elm);
	}
	return con;
      }),
      button_container = document.createElement('div'),
      buttons = data.buttons.map(function(v,i){
	var elm = document.createElement('button');
	elm.setAttribute('data-index',i.toString());
	elm.innerText = v.text || '';
	elm.setAttribute('class',v.class||'flat');
	
	if (v.onclick) elm.onclick = v.onclick;
	if (v.onhover) elm.onhover = v.onhover;
	return elm;
      });
  
  dialog.setAttribute('id',id);
  dialog.setAttribute('class','dialog');
  button_container.setAttribute('class','buttons');
  
  header.innerText = data.title;
  
  dialog.appendChild(header);
  text.map(function(v){dialog.appendChild(v)});
  buttons.map(function(v){button_container.appendChild(v)});
  dialog.appendChild(button_container);
  document.body.appendChild(dialog);
  
  $('[id="'+id+'"]').filter(':not(:last)').remove();
  
  var elm = $('#'+id);
  
  buttons.map(function(v,i){
    if(v.ripple)elm.find('button[data-index="'+i.toString()+'"]').ripple();
  });
  
  elm.hide();
  
  this.close = function () {
    elm.fadeOut(100);
  }
  
  this.open = function () {
    elm.fadeIn(100);
  }
  
  this.getElement = function () {
    return elm;
  }
  
}