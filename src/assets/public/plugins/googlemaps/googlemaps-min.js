
var number = $('#map').attr("data-value1");
var latid = $('#map').attr("data-latid");
var long = $('#map').attr("data-long");


var markers = [
  ['number', long, latid],
  ['2', -11.927609, -77.084972],
  ['3', -11.933876, -77.086506]
];  

function initialize() {
    
  var center = {lat: -77.084972, lng: -11.927609},
      map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true,
        center: center,
        zoom: 11,
        disableDefaultUI:true,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        rotateControl: true,
        fullscreenControl: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
  });

  var Markers = [];
  
  var iconNormal = base_url + 'public/img/iconos/map-icon-1.png',
      iconSelected = base_url + 'public/img/iconos/map-icon-2.png',
      bounds = new google.maps.LatLngBounds();
  function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i],
          myLatLng = new google.maps.LatLng(marker[1], marker[2]),
          eachMarker = new google.maps.Marker({
            record_id: i,
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: iconNormal,
            title: marker[0]
      });
      //var selectedMarker;
      bounds.extend(myLatLng);
      Markers.push(eachMarker);

     /*google.maps.event.addListener(eachMarker,'click', function() {
        changeIcon(this);
      });

      function changeIcon(e){
        if (selectedMarker) {
          selectedMarker.setIcon(iconNormal);
        }
        e.setIcon(iconSelected);
        selectedMarker = e;
      }*/
      
      // choose from list
      $('.list_direcciones li').on('click', function(){
        
        $("li.activo").removeClass('activo');
        $(this).addClass('activo');
        
        mapItem = $(this).index();
        changeMarker(mapItem);                             
        var thisLat = markers[mapItem] [1],
            thisLon = markers[mapItem] [2];
        map.panTo({lat: thisLat, lng: thisLon});
      });

      function changeMarker(record_id){
        for (i in Markers){
          Markers[i].setIcon(iconNormal);
          Markers[record_id].setIcon(iconSelected);
        }
      }
    }
  }
  map.fitBounds(bounds);
  setMarkers(map);

}
google.maps.event.addDomListener(window, 'load', initialize);