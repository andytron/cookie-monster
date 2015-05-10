var venues;
var map;

function renderMap(location) {

  var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  var mapOptions = {
    center: currentLocation,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var marker = new google.maps.Marker({
   position: currentLocation,
   map: map,
   animation: google.maps.Animation.DROP,
   icon: 'http://i.imgur.com/MrPOkeX.png?1'
 });
}

function toggleBounce(){
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

$(window).load(function(){

  navigator.geolocation.getCurrentPosition(getVenues);
  navigator.geolocation.getCurrentPosition(renderMap);

});

function getVenues(location) {

  var keyword = "cookies";
  var lat = location.coords.latitude;
  var lng = location.coords.longitude;

  $.ajax({
    url: "https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&venuePhotos=1&client_id=I34KOKW5DI2MSD12IHDY2KKYIT2UDUD2VHDC5WTBWX4TG4SJ&client_secret=1V0VGFUVO10EJ0NL03EJCIDNLVS5FTZC0WWWCSXAWY5UDHF2&v=20150301&query=" + keyword,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      $('#venues').show();
      venues = data.response.groups[0].items;
      $('#venues').empty();

        $.each( venues, function() {
          var contentString = '<div id="infowindow-content">' +
          '<h3>' + this.venue.name + '</h3>' +
          '<p>Address: ' + this.venue.location.formattedAddress + '</p>' +
          '<p>Category: ' + this.venue.categories[0].name + '</p>' +
          '<p>Rating: ' + this.venue.rating + '</p>' +
          '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          if (this.venue.categories[0].name) {
            category = "Category: " + this.venue.categories[0].name;
          } else {
            category = "";
          }

          if (this.venue.location.formattedAddress) {
            address = "Address: " + this.venue.location.formattedAddress;
          } else {
            address = "";
          }

          if (this.venue.contact.formattedPhone) {
            phone = "Phone: " + this.venue.contact.formattedPhone;
          } else {
            phone = "";
          }

          if (this.venue.location.distance) {
            distance = "Distance: " + (this.venue.location.distance / 1609.3).toPrecision(2) + " miles";
          } else {
            distance = "";
          }

          if (this.venue.rating) {
            rating = "Rating: " + this.venue.rating;
          } else {
            rating = "";
          }

          // if (this.venue.hours.isOpen) {
          //   console.log(this);
          //   openNow = "Open Now: Yes ";
          // } else {
          //   openNow = "Open Now: No";
          // }

          if (this.venue.url) {
            website = this.venue.url;
          } else {
            website = "";
          }

          var $venuesList = $('#venues');
          var $newVenueLi = $('<li><div class="venue-name"><h2>' + this.venue.name + '</h2></div></li>' );
          // var $addPostForm = $('<form class="comment-form" data-id =' + this.venue.id + '><input type="text" name="comment" ><input type="submit" value="Add tip"></form>');
          var $statsWrapper = $('<div class="stats-wrapper"></div>');
          var $newVenueShow = $('<div class="venue-show"></div>');
          var $comments = $('<div class="comments"></div>');

          $newVenueShow.append('<p>' + category + '</p>');
          $newVenueShow.append('<p>' + address + '</p>');
          $newVenueShow.append('<p>' + phone + '</p>');
          $newVenueShow.append('<p>' + distance + '</p>');
          $newVenueShow.append('<p>' + rating + '</p>');
          // $newVenueShow.append('<p>' + openNow + '</p>');
          $newVenueShow.append('<p><a href="' + website + '" target="_blank">'+ website + '</a></p>');
          // $newVenueShow.append($addPostForm);
          $statsWrapper.append($newVenueShow);

          var $newVenueCommentsList = $('<ul class="comments-list"></ul>');
          $newVenueShow.append($newVenueCommentsList);

          $newVenueShow.hide();

          $newVenueLi.children('.venue-name').on('click', function(e){
            $newVenueShow.slideToggle();
          });

          $newVenueLi.append($newVenueShow);
          $newVenueLi.append($comments);
          $venuesList.append($newVenueLi);
          $statsWrapper.append($newVenueLi);
          $venuesList.append($statsWrapper);

          setMarkers(map, this.venue, infowindow);
      });
    }
  });
}

function setMarkers(map, venue, infowindow) {


  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(
      venue.location.lat,
      venue.location.lng
      ),
    map: map,
    title: venue.name,
    icon: 'http://i.imgur.com/TUTfMHG.png?1',
    animation:google.maps.Animation.DROP
  });
  attachInfo(infowindow, map, marker);
}

function attachInfo(infowindow, map, marker) {
  google.maps.event.addListener(marker,'click',function(){

    infowindow.close();
    infowindow.open(map, this);
  });
}
