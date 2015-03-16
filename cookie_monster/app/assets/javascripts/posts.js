var venues;
var map;
var markers = [];

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
     icon: 'http://i.imgur.com/DfA8TrB.png?1'
   });
}

function toggleBounce(){
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

$(document).ready(function(){
  var lat, lng;

  var returnCoords = function(position){
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  };

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

        // Builds markers and elements from venues returned
        $.each( venues, function() {
          // TODO :: STORE THINGS IN markers
          var venueLat = this.venue.location.lat;
          var venueLng = this.venue.location.lng;
          var newMarker = venueLat + venueLng;
          var contentString = '<div id="infowindow-content">' +
          '<h3>' + this.venue.name + '</h3>' +
          '<p>Address: ' + this.venue.location.formattedAddress + '</p>' +
          '<p>Category: ' + this.venue.categories[0].name + '</p>' +
          '<p>Rating: ' + this.venue.rating + '</p>' +
          '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          markers.push( newMarker );

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

          if (this.venue.url) {
            website = "Website: " + this.venue.url;
          } else {
            website = "";
          }

          var $venuesList = $('#venues');
          var $newVenueLi = $('<li><div class="venue-name"><h2>' + this.venue.name + '</h2></div></li>' );

          var $newVenueShow = $('<div class="venue-show"></div>');
          $newVenueShow.append('<p>' + category + '</p>');
          $newVenueShow.append('<p>' + address + '</p>');
          $newVenueShow.append('<p>' + phone + '</p>');
          $newVenueShow.append('<p>' + distance + '</p>');
          $newVenueShow.append('<p>' + rating + '</p>');
          $newVenueShow.append('<p>' + website + '</p>');

          var $newVenueCommentsList = $('<ul class="comments-list"></ul>');
          $newVenueShow.append($newVenueCommentsList);

          $newVenueShow.hide();

          $newVenueLi.children('.venue-name').on('click', function(e){
            $newVenueShow.slideToggle();
          });

          $newVenueLi.append($newVenueShow);
          $venuesList.append($newVenueLi);
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
      icon: 'http://i.imgur.com/rmrs7kG.png?1',
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


