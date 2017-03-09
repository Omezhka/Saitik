 window.onload  = function() {
//1c9761c61335ffc5a5d4fe127a40fbd2
var rurl = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=1c9761c61335ffc5a5d4fe127a40fbd2&format=json&callback=?';
            $.getJSON(rurl, function (tracks) {
  $.each(tracks.tracks.track, function (i, track) {
                    var players = '<section class="all-players__player all-players__player_popular">' +
                        '<section class="all-players__player-icon" style="background-image: url(' + track.image[1]["#text"] + ')"></section>' +
                        '<section class="all-players__track">' +
                        '<b>' + track.name + '</b>' +
                        ' ' + track.artist["name"] + ' ' +
                        '</section>' +
                        '</section>';
                    if (i === 3) {
                        return false;
                    }
                     $('.r-box__popular').append(players);
  });
            }); 
    }
    $(document).on('click','.all-players__player', function ()  {
            var perem = $(this).text();
            var res = gapi.client.youtube.search.list({
                part: "snippet",
                q: perem,
                maxResults: 1
            });
            res.execute(function(response) {
                var results = response.result;
                $(".r-box__youtube").html("");
                $.each(results.items, function(index, arr) {
                    $(".r-box__youtube").append('<iframe width="300" height="200"  src="//www.youtube.com/embed/'+ arr.id.videoId +'?rel=0&autoplay=1" frameborder="0"></iframe>');
                });
            });
        });
        $('.header__a-input-search').click( function(){
            var music = $('.header__input-search')[0];
            var purl = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + music.value + '&api_key=1c9761c61335ffc5a5d4fe127a40fbd2&format=json&callback=?';
          $.getJSON( purl, function(musics) {
            $.each(musics.results.trackmatches.track, function(i, item) {
              var template = '<section class="all-players__player">' +
                        '<section class="all-players__player-icon" style="background-image: url(' + item.image[1]["#text"] + ')"></section>' +
                        '<section class="track">' +
                        '<b>' + item.name + '</b>' +
                        ' ' + item.artist + ' ' +
                        '</section>' +
                        '</section>';
                $('.all-players').append(template);
            });
        });
            return false;
        });
function init() {
  gapi.client.setApiKey("AIzaSyArGfsfADRbwg5rHu_Y0jeTplcMrK9nL5s");
}