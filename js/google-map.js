var google;

function createIframeMap(address) {
  var el = document.getElementById('map');
  if (!el) return;
  // ensure container has a height in case CSS is missing
  if (!el.style.height) el.style.height = '420px';
  var src = 'https://www.google.com/maps?hl=en&q=' + encodeURIComponent('Ars Dental Durrës Albania') + '&ll=41.318674,19.450202&z=17&output=embed';
  el.innerHTML = '<iframe title="Ars Dental Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="border:0;width:100%;height:100%;" src="' + src + '"></iframe>';
}

function init() {
  // Fallback if Google Maps JS API is blocked or key is invalid
  var addressFallback = '41.318674, 19.450202'; // Ars Dental exact coords
  // Force iframe map for now to avoid Google JS API overlay/error
  createIframeMap(addressFallback);
  return;
  if (typeof google === 'undefined' || !google.maps) {
    createIframeMap(addressFallback);
    return;
  }
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(41.3231, 19.4440); // Durrës, Albania (approx center)
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 16,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
  try {
    var addresses = ['Lagja nr 5, Durrës 2001, Albania'];
    for (var x = 0; x < addresses.length; x++) {
      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&sensor=false', null, function (data) {
          var p = data.results[0].geometry.location;
          var latlng = new google.maps.LatLng(p.lat, p.lng);
          new google.maps.Marker({
              position: latlng,
              map: map,
              icon: 'images/loc.png'
          });
          map.setCenter(latlng);
      }).fail(function(){
          createIframeMap(addressFallback);
      });
    }
  } catch (e) {
    createIframeMap(addressFallback);
  }
    
}
google.maps.event.addDomListener(window, 'load', init);