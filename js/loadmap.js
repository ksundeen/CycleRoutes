"use strict";
(function() {     
    var map;
    var gmarkers = [];
    var infoBox = new InfoBox();
    
    // Instatiates map with traffic layer
    function initMap() {
        var mapOptions = {
            zoom: 12,
            center: {lat: 46.8, lng: -92.1}, 
            mapTypeId: 'terrain'
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);         
        
        google.maps.event.addListener(map, 'click', function() {
            infoBox.close();
        });        
        
        getAjaxData(map);
        
        // load ajax data using google api's method
//        map.data.loadGeoJson("data/geotweets_merc3857.geo.json"); 
////        map.data.loadGeoJson('data/attractions_merc3857.geo.json');
//        console.log(map.data.loadGeoJson("data/geotweets_merc3857.geo.json"));

        // add google traffic layer
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        
     };
    
    
    // Looads data using AJAX
    function getAjaxData(map) {
        // load the data
        $.getJSON("data/geotweets_merc3857.geo.json",  function(data) {
            console.log(data.features.length);
            for (var i = 0; i < data.features.length; i++) {
//                console.log("i: ", i);
//                console.log("data.features[i]: ", data.features[i]);
//                console.log('data.features[i]: ', data.features[i]);
                
                // obtain the attribues of each marker
                var item = data.features[i].properties;
//                console.log("item: ", item);
//                console.log("item.longitude: ", item.longitude);
                var point = new google.maps.LatLng(item.latitude, item.longitude);
//                console.log(point);
                var name = item.name;
//                console.log(name);
                var html = "<b>"+item.name+"<\/b><br \/>"+item.text+"<br/>title='"+ item.screen_nam;
                
                // category could be used if we want to categorize the types of tweets
//                var category = item.cat;
                
                // create the marker
                // category could be a different type of twitter item
                var marker = createMarker(point,name,html) //,category);
//                console.log(marker);
            };
        })
    };
    
    // A function to create the marker and set up the event window
    // from https://gist.github.com/phirework/4771983
    // removed "category" from function parameters since we don't categorize the tweets yet.
//    function createMarker(latlng, name, html, category) {
    function createMarker(latlng, name, html) {
        var boxText = document.createElement("div");
        boxText.style.cssText = "margin-top: 42px; background: rgba(68,53,134,0.6); padding: 10px; border-radius: 10px; color: #fff";
        var fullContent = name 
        boxText.innerHTML = html;

        var myOptions = {
            content: boxText,
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-100, 0),
            zIndex: null,
            boxStyle: { 
            //          background: "url('http://www.eyestagedit.com/wtda/assets/map/tip.png') no-repeat",
                width: "250px",
            },
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };

        var marker = new google.maps.Marker({
            position: latlng,
            //        icon: category + ".png",
            icon: 'img/twitter_small.png',
            map: map,
            title: name,
            zIndex: Math.round(latlng.lat()*-100000)<<5
        });

        // === Store the category and name info as a marker properties ===
        //      marker.mycategory = category;   
        marker.html = html
        marker.myname = name;
        gmarkers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
            infoBox.setOptions(myOptions)
            infoBox.open(map, this);
        });
    }; // end createMarker    
    
    
    // THIS DOESN'T WORK...
    // Loads json data into map. 
    // Method to place the parsed GeoJSON data on the map.
//    function loadOperationLayers(map) {
//        console.log("map:" ,map);
//        console.log("map.data: ", map.data);
//        var geotweets = map.data.loadGeoJson('data/geotweets_merc3857.geojson');
//        console.log(geotweets);
//    };
//
//    // Set style for loaded data
//    function styleData(map) {
//        map.data.setStyle({
//            icon: 'img/twitter.png',
//            fillColor: 'green'
//        });
//    };
    
    
    
//    // Toggle layer on & off
//    function toggleLayer(map, layer) {
//        $(".layerbutton").click(function() {
//            if (map.hasLayer(layer)) {
//                map.removeLayer(layer);
//                $(".layerbutton").css("background-color", "gray");
//                $(".layerbutton h3 i").html("Off");
//            } else {
//                map.addLayer(layer);
//                $(".layerbutton").css("background-color", "green");
//                $(".layerbutton h3 i").html("On");            
//            };
//        });
//    };    
    
    $(document).ready(initMap);
    
})();