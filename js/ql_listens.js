/* This is a work in progress. Refactors/Clean Up to come */
$(function(){
  /* Get the user(s) from RDIO for avatars */
  $.ajax({
    url: "http://qlrdio.herokuapp.com/user/collin?callback=?",
    dataType: "jsonp",
    success: function(data){
      var keyVal = data.key,
          iconPic = data.icon;

      $('#rdio_wrapper img').attr('src', iconPic);

      getHeavyRotation(keyVal);
      $('#rdio_wrapper').slideDown();
      $('#loader').addClass('load_2');
    }
  });

  function getHeavyRotation(keyVal){
    /* Get most played albums from RDIO */
    $.ajax({
      url: "http://qlrdio.herokuapp.com/collin/getHeavyRotation",
      dataType: "jsonp",
      success: function(data){
        $('#loader').fadeOut(300);

        $.each(data, function(index, album) {
          $( "#albumWrap" ).tmpl( album ).appendTo( "#heavy_rotation ul" );
        });
        $('#music_wrap').delay(400).slideDown(1000);
      }
    });
  }

  $('.info_icon').live('click', function(e){
    $('.album_info').fadeOut();
    e.preventDefault();
    var $this = $(this),
        $parent = $this.parent('li'),
        albumName = $this.attr('data-album'),
        albumArtist = $this.attr('data-artist');

    /* Call Discogs API for artist info */
    $.ajax({
      url: "http://api.discogs.com/artist/" + albumArtist,
      dataType: "jsonp",
      success: function(data){
        $.each(data, function(index, artist) {
          $( "#albumInfo" ).tmpl( artist ).appendTo( $parent );
        });

        $parent.find('.album_info').fadeIn(500);
      }
    });

    $('.close_btn').live('click', function(e){
      e.preventDefault();
      var $this = $(this),
          $parent = $this.parent('.album_info');
      $parent.fadeOut();
    });
  });

});