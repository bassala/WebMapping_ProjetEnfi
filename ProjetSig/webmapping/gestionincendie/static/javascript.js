// Initialisation de la carte
var map = L.map('map').setView([34.0538, -6.3109], 10);

// Ajout des couches de tuiles
var Osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var fontTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: {attribution.OpenStreetMap}, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Ajout de la couche GeoJSON pour chaque canton
var maamora = L.geoJSON(jsoncanton, {
    style: style,
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.nom);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
}).addTo(map);

// Ajout de la couche GeoJSON pour chaque strate
var strateEssence = L.geoJSON(jsonstrate);

// Ajout de la couche GeoJSON pour posteVigi
var PosteVigi = L.geoJSON(postvigie, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.nom);
    }
});

// Ajout de la couche GeoJSON pour Point_d'Eau
var Point_Eau = L.geoJSON(pointdeau);

// Ajout de la couche GeoJSON pour Incendie
var Incendies = L.geoJSON(incendi);

// Définition des fonctions de style et d'événements
function getColor(c_name) {
    switch (c_name) {
        case "D":
        case "A":
        case "B":
        case "C":
        case "E":
            return 'blue';
    }
}

function style(feature) {
    return {
        fillColor: 'transparent',
        color: getColor(feature.properties.nom),
        weight: 3,
        dashArray: '4'
    };
}

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

// Contrôle des couches de base et des couches en superposition
var overlayMaps = {
    "Point d'eau": Point_Eau,
    "Strates": strateEssence,
    "PosteVigi": PosteVigi,
    "Eclosion": Incendies
};
var baseMaps = {
    "Osm": Osm,
    "fontTopo": fontTopo
};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);





// Fonction pour récupérer les données de la région sélectionnée
function getRegionModel(regionName) {
    var regionModels = {
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D",
        "E": "E",
    };
    return regionModels[regionName];
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    var regionName = e.target.feature.properties.nom;
    var modelName = getRegionModel(regionName);

    console.log(regionName);


    axios.get('/get_data/', {
        params: {
            canton: modelName
        }
    })
    .then(function (response) {
        console.log(response.data);
        document.getElementById('regionCell').textContent = regionName;
        document.getElementById('habitatsCell').textContent = response.data.superficie;
    })
    .catch(function (error) {
        console.log(error);
    });
}
