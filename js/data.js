(function(){

  d3.selectAll('img').attr("class",'img-responsive')

  var cartourl = d3.select('carto').attr('url');

  d3.select('carto').append('iframe')
    .attr('width', '100%')
    .attr('height', '400')
    .attr('frameborder','0')
    .attr('src', cartourl)

  var driveurl = d3.select('drive').attr('url');

  d3.select('drive').append('iframe')
  .attr('width', '100%')
  .attr('height', '400')
  .attr('frameborder','0')
    .attr('src', driveurl)

  $('#markdown-toc li a').each(function(d){
    $(this).on('click', function(e){
      // target element id
      var id = $(this).attr('href');

      // target element
      var $id = $(id);
      if ($id.length === 0) {
          return;
      }

      // prevent standard hash navigation (avoid blinking in IE)
      e.preventDefault();

      // top position relative to the document
      var pos = $(id).offset().top;

      // animated top scrolling
      $('body, html').animate({scrollTop: pos-70});

    })
  })

})()
