
// Initialisation de la carte 34.0538, -6.6109
var map = L.map('map').setView([34.0538, -6.6109], 10);

// Ajout des couches de tuiles
var Osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var fontTopo =  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: {attribution.OpenStreetMap}, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Ajout de la couche GeoJSON pour chaque canton
var maamora = L.geoJSON(jsoncanton,{
    style: style,
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.nom); 
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
           
        });
    }
}).addTo(map);

// colorer
function getColor(c_name) {
    switch (c_name) {
        case "D": return 'blue'
        case "A"   : return 'blue'
        case "B" : return 'blue'
        case "C" : return 'blue'
        case  "E": return 'blue'
    
    }                      }

function style(feature) {
            return {
                fillColor: 'transparent',
                color: getColor(feature.properties.nom),
                weight: 3,
                dashArray: '4'
        
            };
        }

// Gestion des événements pour chaque région
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: 'green',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
}

function resetHighlight(e) {
    maamora.resetStyle(e.target);
}


// Contrôle des couches de base
var baseMaps = {
    "Osm":Osm,
    "fontTopo" : fontTopo
};
var layerControl = L.control.layers(baseMaps).addTo(map);

