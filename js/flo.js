var map;
var infowindow;

var searchBtn = document.getElementById('searchBtn2');
var enteredKeyword = ['food'];
var typeOfEstablishment = ['food'];


searchBtn.addEventListener('click', function getUserInput() {
    var userInputKeyword = document.getElementById('searchBar2').value;
    var userSelectedType = document.getElementById('establishmentSelect2').value;
   
    enteredKeyword.push(userInputKeyword);
    typeOfEstablishment.push(userSelectedType);

    enteredKeyword.splice(0, 1);
    typeOfEstablishment.splice(0, 1);

    initMap();

}, false);



function initMap() {
    var place = { lat: -40.9006, lng: 174.8860 };
    map = new google.maps.Map(document.getElementById('map2'), {
        center: place,
        zoom: 8
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
        location: place,
        radius: 50000,
        types: typeOfEstablishment,
        keyword: enteredKeyword
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }else {
        console.log('cannot connect to server');
        alert('No results Aval');
    }

    var searchData = results.map(function (data) {
        returnSearchData(data);
    });

}

function returnSearchData(searchData) {
    // console.log(searchData);
    imagetest(searchData);

    // var x = document.createElement("IMG");
    // x.setAttribute("src", "img_pulpit.jpg");
    // x.setAttribute("width", "304");
    // x.setAttribute("height", "228");
    // x.setAttribute("alt", "The Pulpit Rock");
    // document.body.appendChild(x);

}

function imagetest(search) {
    var output = document.getElementById('dataOuputContainer2');

    var blah = document.createElement("IMG");
    blah.setAttribute("src", search.icon);
    blah.setAttribute("width", "100");
    blah.setAttribute("height", "100");
    blah.setAttribute("alt", "image");
    output.appendChild(blah);

    console.log(search);
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });

}

$(document).ready(function () {
    $('select').material_select();
});



