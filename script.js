//url for ISS coordinates
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

//create map
const issMap = L.map('issMap').setView([0, 0], 1);

// create marker with custom icon
const issIcon = L.icon({
    iconUrl: 'issIcon.png',
    iconSize: [200, 80],
    iconAnchor: [100, 40]
});
let marker = L.marker([0, 0], { icon: issIcon });

//add marker to map
marker.addTo(issMap);

//create tile layer
const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

const tileLayer = L.tileLayer(tileUrl, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWhzYW51bGhhcSIsImEiOiJja2NydGdmcGowOTdsMnNvNDVmZmEwbWR4In0.dV-5J1bfWq9W-owgkX06hw'
});

//add tile layer to map
tileLayer.addTo(issMap);

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;
    document.querySelector("#lat").innerHTML = Math.floor(latitude * 1000) / 1000 + 'º';
    document.querySelector("#lon").innerHTML = Math.floor(longitude * 1000) / 1000 + 'º';

    //set ISS coordinates as marker coordinates
    marker.setLatLng([latitude, longitude]);

    //set issMap origin to latitude, longitude
    issMap.setView([latitude, longitude], 4);
}

getISS();
setInterval(getISS, 1000 / 2);