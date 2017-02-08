function editMedia(idx){
  var elm = $(this),
      media = elm.find('embed,img,iframe,video');
      figcaption = elm.find('figcaption'),
      slideshow = currentEditShow,
      slide = $('#E-Cc .slide'),
      i = parseInt(slide.data('idx'));
  
  if(media.length===0){
    elm.prepend('<img>');
    media = elm.find('embed,img,iframe,video')}
    
  if(figcaption.length===0){
    elm.append('<figcaption>');
    figcaption = elm.find('figcaption')}
  
  var src = media.attr('src'),
      media_dialog = new Dialog('media_dialog'+idx,{
    text:[
      'Provide the URL of the image',
      {
	type: 'input',
	attributes: {
	  type: 'url',
	  name: 'url'
	}
      }
    ],
    buttons: [
      {
	text: 'Continue',
	ripple: true,
	onclick: function () {
	  src = $media_dialog.find('[name="url"]').val();
	  media.attr('src',src);
	  
	  save();
	  media_dialog.close();
	}
      },
      {
	text: 'Delete',
	ripple: true,
	onclick: function () {
	  slideshow.slides[i].elm.pop(idx);
	  
	  editSlide(slideshow,i);
	  slide.find('.media-container figure').each(editMedia);
	  save();
	  media_dialog.close();
	}
      }
    ]
  }),
    $media_dialog = media_dialog.getElement();
  
  
  media.click(function(){
    $media_dialog.find('[name="url"]').val(src);
    
    media_dialog.open();
  });
  
  figcaption.on('input',save).attr('contenteditable','true');
  
  function save() {      
    slideshow.slides[i].elm[idx] = {
      src: media.attr('src'),
      type: media.get(0).tagName.toLowerCase(),
      caption: stripHTMLTags(figcaption.text()||'')
    };
  }
  
  save();
  
}

function editSlide(slideshow,i) {
  var container = $('#E-Cc-Ca'),
      slide;
  
  container.empty();
  
  if(slideshow.slides.length>0){
    container.append(parseSlide(slideshow,i));
    slide = container.find('.slide');
    slide.data('idx',i).attr('style','');
  }
  
  slide.find('.title-container h1').inlinedit(function(){
    var txt = $(this).parents('h1'             ).find('.T-et').text().replace('\n',' '),
	str = stripHTMLTags(txt);
    
    slideshow.slides[i].title=str;
  });
  
  slide.find('.title-container h2').inlinedit(function(){
    var txt = $(this).parents('h2'             ).find('.T-et').text().replace('\n',' '),
	str = stripHTMLTags(txt);
    
    slideshow.slides[i].subtitle=str;
  });
  
  slide.find('.text-container .T-ts').inlinedit(function(){
    var txt = $(this).parents('.text-container').find('.T-et').text().replace('\n','\\n'),
	str = stripHTMLTags(txt);
    
    slideshow.slides[i].text=str.replace('\\n','\n');
  });
  
  slide.find('.media-container').append(
    '<div id="E-Cc-Ca-Ba" class="C-i C-s">'+
      'add_circle_outline'+
    '</div>'
  );
  
  $('#E-Cc-Ca-Ba').ripple().click(function(){
    slideshow.slides[i].elm.push({type:'img'});
    editSlide(slideshow,i);
    slide.find('.media-container figure').each(editMedia);
  });
  
  slide.find('.media-container figure').each(editMedia);
  
  alignEdit();
}

function editSlides(slideshow,slide) {
  document.title = slideshow.title+' - Editing - Presentatie';
  currentEditShow= slideshow;
  
  $('#E').data('idx',account.slideshowdata.indexOf(slideshow).toString());
  $('#E-Ca h1').html(slideshow.title);
  $('#E-Cb .T-t').remove();
  
  for (var i=slideshow.slides.length-1;i>=0;i--) {
    var elm   = slideshow.slides[i],
	title = elm.title?(elm.title.length>5?elm.title:(elm.title||'')+' '+(elm.subtitle||'')):'Slide '+(i+1);
    $('#E-Cb').prepend(
      '<div class="T-t" data-idx="'+i+'">'+
	'<div class="tn">'+parseSlide(slideshow,i,true)+'</div>'+
	'<p>&nbsp;<span class="t-a">'+title+'</span><span class="t-b">'+(i+1)+'</span></p>'+
      '</div>'
    );
    $('#E-Cb .T-t').first().find('.slide').attr('style','');
    $('#E-Cb .T-t').click(function(){editSlide(slideshow,$(this).data('idx'));}).ripple();
  }
  
  editSlide(slideshow,slide||0);
  goTo('edit');
  alignEdit();
}