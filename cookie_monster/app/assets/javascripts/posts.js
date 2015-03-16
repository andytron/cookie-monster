// // GOOGLE MAPS API

// var map;
// var service;

// // add search request to include places that are only 'openNow'
// function handleSearchResults(results, status){
//   console.log(results);

//   for (var i = 0; i < results.length; i++) {
//     var marker = new google.maps.Marker({
//       position: results[i].geometry.location,
//       map: map,
//       icon: 'http://i.imgur.com/DfA8TrB.png?1' 
//     });
//   }
// }

// function performSearch(){
//   var request = {
//     bounds: map.getBounds(),
//     keyword: 'cookies'
//   }
//   service.nearbySearch(request, handleSearchResults);
// }

// function initialize(location) {
//   console.log(location);
//   // debugger;
//   // lat = location.coords.latitude;
//   // lng = location.coords.longitude;

//   var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
//   var mapOptions = {
//     center: currentLocation,
//     zoom: 14,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   map = new google.maps.Map(document.getElementById('map'), mapOptions);

//   var marker = new google.maps.Marker({
//     position: currentLocation,
//     map: map,
//     icon:'http://i.imgur.com/rmrs7kG.png?1'
//   });

//   service = new google.maps.places.PlacesService(map);

//   // this ensures that we wait until the map bounds are initialized before we perform the search
//   google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
// }

//   // var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
//   // google.maps.event.addListener(marker,'click',function(e){

//   //   infoWindow.open(map, marker);

//   // });

// // $(document).ready(function(){
// //   navigator.geolocation.getCurrentPosition(initialize);
// // });


// // FOURSQUARE API

// $(document).ready(function(){
//   var lat, lng;
//   var returnCoords = function(position){
//     console.log("callback");
//     lat = position.coords.latitude;
//     lng = position.coords.longitude;
//   }
//   var somethingWentWrong = function(error){
//     console.log("callback");
//   }
//   navigator.geolocation.getCurrentPosition(getVenues, somethingWentWrong)
//   navigator.geolocation.getCurrentPosition(initialize);
//   // debugger;
//   // if (!lat) {
//   // } else {
//   //   getVenues();
//   // }
//   //
//   // var keyword = "cookies"

//   // getVenues( keyword );
// });

// // get lat & lng from google to put in url for ajax


// function getVenues(location) {
//   // function getLocation(location) {
//   // debugger;
//     var keyword = "cookies";
//     var lat = location.coords.latitude;
//     var lng = location.coords.longitude;

//     var data = {keyword: keyword, lat: lat, lng: lng};

//   // var coords = navigator.geolocation.getCurrentPosition(initialize);

//     // $.ajax({
//     //   url: "https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + " &client_id=I34KOKW5DI2MSD12IHDY2KKYIT2UDUD2VHDC5WTBWX4TG4SJ&client_secret=1V0VGFUVO10EJ0NL03EJCIDNLVS5FTZC0WWWCSXAWY5UDHF2&v=20150301&query="+keyword,
//     //   type: 'GET',
//     //   dataType: 'json',
//     //   success: function (data) {
//     //     console.log(data);

//     $.ajax({
//       url: '/venues',
//       type: 'Get',
//       dataType: 'json',
//       data: data,
//       success: function (data) {
//         console.log(data);

//       $('#venues').show();
//         var dataObj = data.response.groups[0].items;
//         $('#venues').empty();

//         // storeVenues(dataObj);

//         // Build markers and elements from venues returned
//       $.each( dataObj, function() {
//         if (this.venue.categories[0].name) {
//           category = "Category: " + this.venue.categories[0].name;
//         } else {
//           category = "";
//         }

//         if (this.venue.location.formattedAddress) {
//           address = "Address: " + this.venue.location.formattedAddress;
//         } else {
//           address = "";
//         }

//         if (this.venue.contact.formattedPhone) {
//           phone = "Phone: " + this.venue.contact.formattedPhone;
//         } else {
//           phone = "";
//         }

//         // if (this.venue.menu.url) {
//         //   menu = "Menu URL: " + this.venue.menu.url;
//         // } else {
//         //   menu = "";
//         // }

//         // if (this.venue.price.message != undefined) {
//         //   pricing = "Pricing: " + this.venue.price.message;
//         // } else {
//         //   pricing = "";
//         // }

//         if (this.venue.location.distance) {
//           distance = "Distance: " + (this.venue.location.distance / 1609.3).toPrecision(2) + " miles";
//         } else {
//           distance = "";
//         }

//         if (this.venue.rating) {
//           rating = "Rating: " + this.venue.rating;
//         } else {
//           rating = "";
//         }

//         if (this.venue.url) {
//           website = "Website: " + this.venue.url;
//         } else {
//           website = "";
//         }

//       var appendDataHtml = '<div id="venues"><h2><span>' + this.venue.name + '</span></h2>' + category + '<br>' + address + '<br>' + phone + '<br>' + distance + '<br>' + rating + '<br>' + website + '</div>';
//       $('#venues').append(appendDataHtml);
//         });
//       },
//     });
//   }

////////////////////// FOURSQUARE API ////////////////////
var dataobj;
var baseUrl = "https://api.foursquare.com/v2/venues/explore?ll=";
var secondUrl = "&venuePhotos=1&client_id=I34KOKW5DI2MSD12IHDY2KKYIT2UDUD2VHDC5WTBWX4TG4SJ&client_secret=1V0VGFUVO10EJ0NL03EJCIDNLVS5FTZC0WWWCSXAWY5UDHF2&v=20150301&query=";

////////////////// GOOGLE MAPS API MARKERS //////////////////////

var map;
var service;
var markers = [];

/////////// USER'S Location on Google Maps ///////////////////

function userLocation(location) {
  console.log(location);

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

  service = new google.maps.places.PlacesService(map);

  setMarkers(map, dataobj);
}

function toggleBounce(){
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

//////////////////// ON PAGE LOAD /////////////////////////

$(document).ready(function(){
  var lat, lng;
  var returnCoords = function(position){
    console.log("callback");
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  };
  var somethingWentWrong = function(error){
    console.log("callback");
  };
  navigator.geolocation.getCurrentPosition(getVenues, somethingWentWrong);
  navigator.geolocation.getCurrentPosition(userLocation);
  // navigator.geolocation.getCurrentPosition(setMarkers);

  function getVenues(location) {

    var keyword = "cookies";  
    var lat = location.coords.latitude;
    var lng = location.coords.longitude;

    $.ajax({
      url: baseUrl + lat + "," + lng + secondUrl + keyword,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data);

        $('#venues').show();
        venues = data.response.groups[0].items;
        $('#venues').empty();

        // Builds markers and elements from venues returned
        $.each( venues, function() {
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
          // var $venueListCoords = $('#venues').push(venueCoordinates);
          var $newVenueLi = $('<li><div class="venue-name"><h2>' + this.venue.name + '</h2></div></li>' );

          var $newVenueShow = $('<div class="venue-show"></div>');
          $newVenueShow.append('<p>' + category + '</p>');
          $newVenueShow.append('<p>' + address + '</p>');
          $newVenueShow.append('<p>' + phone + '</p>');
          $newVenueShow.append('<p>' + distance + '</p>');
          $newVenueShow.append('<p>' + rating + '</p>');
          $newVenueShow.append('<p>' + website + '</p>');
          // $newVenueShow.append('<p>' + photo + '</p>');

          var $newVenueCommentsList = $('<ul class="comments-list"></ul>');
          $newVenueShow.append($newVenueCommentsList);

          $newVenueShow.hide();

          $newVenueLi.children('.venue-name').on('click', function(e){
            $newVenueShow.slideToggle();
          });

          $newVenueLi.append($newVenueShow);
          $venuesList.append($newVenueLi);
        });
}
});

function setMarkers(map, venues) {
  getVenues(location);

  for (i = 0; i < venues.length; i++) {

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        venues[i].venue.location.lat,
        venues[i].venue.location.lng
        ),
      map: map,
      title: dataobj[i].venue.name,
      icon: 'http://i.imgur.com/rmrs7kG.png?1',
      animation:google.maps.Animation.DROP
    });
  }      
}
}
});












