var tab_markers = new Array();

/* PNG */
tab_markers['mini-pin'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/maps/mini-pin.png',
	iconSize: [10, 10],
	iconAnchor: [5, 5]
});
tab_markers['mini-pin-hover'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/maps/mini-pin2.png',
	iconSize: [10, 10],
	iconAnchor: [5, 5]
});
tab_markers['maxi-pin-hover'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/maps/maxi-pin2.png',
	iconSize: [24, 38],
	iconAnchor: [12, 33]
});
tab_markers['mini-pin-main'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/maps/mini-pin3.png',
	iconSize: [10, 10],
	iconAnchor: [5, 5]
});
tab_markers['drapeau'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/maps/default-pin.png',
	iconSize: [22, 40],
	iconAnchor: [11, 40]
});
tab_markers['drapeau2'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/maps/drapeau.png',
	iconSize: [21, 32],
	iconAnchor: [0, 32]
});
tab_markers['empty'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/maps/empty.gif',
	iconSize: [1, 1],
	iconAnchor: [1, 1]
});

/* SVG */
tab_markers['mini-pin2'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/svg/maps/mini-pin.svg',
	iconSize: [10, 10],
	iconAnchor: [5, 5]
});
tab_markers['mini-pin2-hover'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/svg/maps/mini-pin2.svg',
	iconSize: [10, 10],
	iconAnchor: [5, 5]
});
tab_markers['maxi-pin2-hover'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/svg/maps/maxi-pin2.svg',
	iconSize: [24, 38],
	iconAnchor: [12, 33]
});
tab_markers['mini-pin2-main'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/svg/maps/mini-pin3.svg',
	iconSize: [10, 10],
	iconAnchor: [5, 5]
});
tab_markers['drapeau3'] = L.icon({
	iconUrl: '//www.cybevasion.fr/lib3/svg/maps/default-pin.svg',
	iconSize: [26, 40],
	iconAnchor: [13, 40]
});


var icon_tour = [];
for(var i=0; i<=52; i++){
	icon_tour[i] = L.icon({iconUrl: '//www.cybevasion.fr/lib3/maps/tourisme2/' + i + '.png', iconSize: [18, 18], iconAnchor: [9, 9]});
}
icon_tour['metro'] = L.icon({iconUrl: '//www.cybevasion.fr/lib3/maps/tourisme2/metro.png', iconSize: [18, 18], iconAnchor: [9, 9]});

var markers = new Array();
var bounds = new L.LatLngBounds();

function setMarkers(map, locations, autozoom, infowindowsize, setCenter){
	autozoom = typeof autozoom !== 'undefined' ? autozoom : true;
	infowindowsize = typeof infowindowsize !== 'undefined' ? infowindowsize : 420;
	setCenter = typeof setCenter !== 'undefined' ? setCenter : false;

	for (var i = 0; i < locations.length; i++) {
		var my_marker = locations[i];

		var myLatLng = L.latLng(my_marker[1], my_marker[2]);
		
		if(my_marker[5]=='1'){//autozoom sur un marker en particulier
			autozoom_marker = false;
		}else{
			autozoom_marker = true;
		}

		if(autozoom==true && autozoom_marker==true){
			bounds.extend(myLatLng);
		}

		if(my_marker[3]=='empty' || my_marker[3]=='drapeau'){
			my_zindex = 1;
		}else{
			my_zindex = 998;
		}
		
		// 7 : marker contient un prix
		if(my_marker[7] == 'false'){
			markers[my_marker[0]] = L.marker(myLatLng, {
				icon: my_marker[3],
				mode_marker: my_marker[6], 
				is_displayed: true
			});

			if(my_marker[4] != ''){
				markers[my_marker[0]].bindPopup(my_marker[4]);
			}
			markers[my_marker[0]].addTo(ma_carte);
		} else {
			var centrePoint = my_marker[7].length * 2.35;

			var class_dispo = '';
			if(my_marker[6] == 'etab'){
				if(my_marker[9] == 1){
					class_dispo = ' ann_dispo';
				}
				if(my_marker[9] == 2){
					class_dispo = ' ann_demande';
				}
			}

			var zindexoffset = 0;
			if(my_marker[11] == '0'){
				zindexoffset = 200; // zindex++ si !is_hotel
			}
			
			markers[my_marker[0]] = L.marker(myLatLng, {
				icon: new L.DivIcon({
					className: 'markersWithLabel', // the CSS class for the label
					iconSize: [70, 24],
					iconAnchor: [35, 24],
					popupAnchor: [0, 0], // [35, 24]
					html: '<div class="fakeDivToFitContentSize'+class_dispo+'"><div class="prixMaps">' + my_marker[7] + '</div><div class="flecheMaps"></div></div>', // prix à afficher
				}),
				mode_marker: my_marker[6],
				is_displayed: true,
				zIndexOffset: zindexoffset
			})
			if(my_marker[4] != ''){
				markers[my_marker[0]].bindPopup(my_marker[4]);
			}
			markers[my_marker[0]].addTo(ma_carte);
		}

		// set_circle() ?
		if(my_marker[10] == 1){
			set_circle_orig();
		}
	}
	if(autozoom==true && locations.length>=2){
		map.fitBounds(bounds);
	}

	if(setCenter){
		var listener_idle = map.once('load moveend', function(){
			center_maps_on_orig();
		});
	}
}

function setMarkers_v2(map, locations, autozoom, infowindowwidth, setCenter){
	autozoom = typeof autozoom !== 'undefined' ? autozoom : true;
	infowindowwidth = typeof infowindowwidth !== 'undefined' && infowindowwidth ? infowindowwidth : 420;
	setCenter = typeof setCenter !== 'undefined' ? setCenter : false;
	
	for (var i = 0; i < locations.length; i++) {
		var my_marker = locations[i];

		var myLatLng = L.latLng(my_marker.lat, my_marker.lon);
		
		if(my_marker.no_autozoom=='1'){ // autozoom sur un marker en particulier ?
			autozoom_marker = false;
		}else{
			autozoom_marker = true;
		}

		if(autozoom==true && autozoom_marker==true){
			bounds.extend(myLatLng);
		}

		if(my_marker.type_marker=='empty' || my_marker.type_marker=='drapeau' || my_marker.type_marker=='drapeau3' || (typeof tab_markers['drapeau'] != 'undefined' && (my_marker.type_marker==tab_markers['drapeau'] || my_marker.type_marker==tab_markers['drapeau3']))){
			my_zindex = 1;
			my_zindex_offset = -100;
		}else{
			my_zindex = 1000;
			my_zindex_offset = 0;
		}

		if(my_marker.is_hotel == '0'){
			my_zindex_offset = 200; // zindex++ si !is_hotel
		}
	
		if(my_marker.montantMarkerWithLabel == 'false'){
			markers[my_marker.id] = L.marker(myLatLng, {
				icon: my_marker.type_marker,
				mode_marker: my_marker.mode_marker, 
				is_displayed: true, 
				zIndexOffset: my_zindex_offset
			});

			if(my_marker.html != ''){
				if(typeof my_marker.class != 'undefined' && my_marker.class != ''){
					markers[my_marker.id].bindPopup(my_marker.html, {
						className: my_marker.class
					});
				} else {
					markers[my_marker.id].bindPopup(my_marker.html);
				}
			}
			markers[my_marker.id].addTo(ma_carte);
		} else {
			var tailleContenu = my_marker.montantMarkerWithLabel.length;

			var class_dispo = '';
			if(my_marker.mode_marker == 'etab'){
				if(my_marker.ann_dispo == 1){
					class_dispo = ' ann_dispo';
				}
				if(my_marker.ann_dispo == 2){
					class_dispo = ' ann_demande';
				}
			}
			
			markers[my_marker.id] = L.marker(myLatLng, {
				icon: new L.DivIcon({
					className: 'markersWithLabel', // the CSS class for the label
					iconSize: [70, 24],
					iconAnchor: [35, 24],
					popupAnchor: [0, 0], // [35, 24]
					html: '<div class="fakeDivToFitContentSize'+class_dispo+'"><div class="prixMaps">' + my_marker.montantMarkerWithLabel + '</div><div class="flecheMaps"></div></div>', // prix à afficher
				}),
				mode_marker: my_marker.mode_marker,
				is_displayed: true, 
				zIndexOffset: my_zindex_offset
			});

			if(my_marker.html != ''){
				if(typeof my_marker.class != 'undefined' && my_marker.class != ''){
					markers[my_marker.id].bindPopup(my_marker.html, {
						className: my_marker.class
					});
				} else {
					markers[my_marker.id].bindPopup(my_marker.html);
				}
			}
			markers[my_marker.id].addTo(ma_carte);
		}
		
		// 8 : heightMax
		if(my_marker.heightMax === 0){
			my_marker.heightMax = 600;
		} 

		if(my_marker.set_circle == 1){
			set_circle_orig();
		}
	}
	
	if(autozoom==true && locations.length>=2){
		map.fitBounds(bounds);
	}
	
	if(setCenter){
		var listener_idle = map.once('load moveend', function() {
			center_maps_on_orig();
		});
	}
}

function createDragMarker(my_map, my_position, contenu_html, index_gg) {
	var marker = L.marker(my_position, {draggable: true}).addTo(my_map);

	if(contenu_html!=""){
		marker.bindPopup(contenu_html);
	}

	return marker;
}

function max_zoom(zoom_level, my_map){
	my_map.options.maxZoom = zoom_level;
	if(my_map.getZoom()>zoom_level){
		my_map.setZoom(zoom_level);
	}
}
function setCircle(lat_center, lon_center, rayon, couleur_contour, opacite_contour, epaisseur_contour, couleur_fond, opacite_fond, map){
	var circleOptions = {color: couleur_contour, opacity: opacite_contour, weight: epaisseur_contour, fillColor: couleur_fond, fillOpacity: opacite_fond, interactive: false, radius: rayon};
	return L.Circle([lat_center, lon_center], circleOptions).addTo(map);
}

function affiche_marker(my_marker, obj, event){
	disable_infowindow = typeof disable_infowindow !== 'undefined' ? disable_infowindow : false;
	if(!disable_infowindow){
		markers[my_marker].openPopup();
		var px = ma_carte.project(markers[my_marker].getLatLng());
		px.y -= markers[my_marker].getPopup()._container.clientHeight/2;
		ma_carte.panTo(ma_carte.unproject(px),{animate: true}); // On centre la popup entière et non le point
	} else {
		ma_carte.panTo(markers[my_marker].getLatLng()); // On centre le marker (point) sur la carte
	}
}

/* Redirige vers la bonne fonction selon le type d'objet */
function affiche_pin(my_marker){
	if(typeof markers[my_marker].options.icon.options.html != 'undefined' && markers[my_marker].options.icon.options.html != ''){ // markersWithLabel
		affiche_maxi_pin2(my_marker);
	} else {
		affiche_maxi_pin(my_marker);
	}
}
function revert_pin(my_marker){
	if(typeof markers[my_marker].options.icon.options.html != 'undefined' && markers[my_marker].options.icon.options.html != ''){ // markersWithLabel
		revert_maxi_pin2(my_marker);
	} else {
		revert_mini_pin(my_marker);
	}
}

function affiche_mini_pin(my_marker, obj, event){
	markers[my_marker].openPopup();
	markers[my_marker].setIcon(tab_markers['mini-pin2-hover']);
	markers[my_marker]._icon.style.zIndex = parseInt(markers[my_marker]._icon.style.zIndex) + 200; // += => concaténation
}
function affiche_maxi_pin(my_marker, obj, event){
	markers[my_marker].setIcon(tab_markers['maxi-pin2-hover']);
	markers[my_marker]._icon.style.zIndex = parseInt(markers[my_marker]._icon.style.zIndex) + 200;
}
function revert_mini_pin(my_marker, obj, event){
	markers[my_marker].setIcon(tab_markers['mini-pin2']);
	markers[my_marker]._icon.style.zIndex = parseInt(markers[my_marker]._icon.style.zIndex) - 200;
}
function revert_mini_pin_main(my_marker, obj, event){
	markers[my_marker].setIcon(tab_markers['mini-pin2-main']);
	markers[my_marker]._icon.style.zIndex = parseInt(markers[my_marker]._icon.style.zIndex) - 200;
}

/*affiche_maxi_pin2 et revert_maxi_pin2 sont utilisées lorsqu'un prix doit être affiché (hotels) */
function affiche_maxi_pin2(my_marker){
	markers[my_marker]._icon.classList.add('hover');
	markers[my_marker]._icon.style.zIndex = parseInt(markers[my_marker]._icon.style.zIndex) + 200;
}
function revert_maxi_pin2(my_marker){
	markers[my_marker]._icon.classList.remove('hover');
	markers[my_marker]._icon.style.zIndex = parseInt(markers[my_marker]._icon.style.zIndex) - 200;
}

// Fixe certains éléments (moteur de recherche, barre de tri et carte)
function elements_sticky(){
	var stick_to_object = document;
	if($('#results-with-map').length){
		// stick_to_object = $('#results-with-map'); // si màj de hc-sticky, changer cet objet en objet DOM et non jQuery
		stick_to_object = '#results-with-map';
	}
	var selecteur_carte = $('#map-canvas');
	if($('#map-block').length){//on se sert de ça si on inclut la carte dans un autre bloc
		selecteur_carte = $('#map-block');
	}

	// Si format "ordinateur" et que le moteur de recherche est présent
	var form_moteur_annonces = $('#form_moteur_annonces2');
	if($('#form_moteur_accueil').length){
		form_moteur_annonces = $('#form_moteur_accueil');
	}

	if($(window).width()>800 && form_moteur_annonces.length){
		var hauteur_form = 0;

		if($('.filtres_gen_suppl_mot').length > 0){
			// Seul le moteur réduit est affiché lorsque le comportement "sticky" se met en place
			$('.filtres_gen_suppl_mot').hide();
		}

		hauteur_form = form_moteur_annonces.outerHeight();

		if($('.filtres_gen_suppl_mot').length > 0){
			// Seul le moteur réduit est affiché lorsque le comportement "sticky" se met en place
			$('.filtres_gen_suppl_mot').show();
		}

		form_moteur_annonces.hcSticky({
			responsive: true,
			top: 0,
			stickTo: stick_to_object
		});
		selecteur_carte.hcSticky({
			responsive: true,
			top: hauteur_form,
			stickTo: stick_to_object
		});
		$("#sort-bar").hcSticky({
			responsive: true,
			top: hauteur_form,
			stickTo: stick_to_object
		});
	} else {
		// Page sans moteur de recherche (comportement normal)
		selecteur_carte.hcSticky({
			responsive: true,
			top: 10,
			stickTo: stick_to_object
		});
	}
}

if(is_scroll_map==true){
	$(document).ready(elements_sticky);
}

var directionsDisplay;
// var directionsService = new google.maps.DirectionsService(); // A corriger !

function initIti(){
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(ma_carte);
	directionsDisplay.setPanel(document.getElementById('directionsPanel'));
}

function calcIti(my_type_iti) {
	if(my_type_iti=='' || my_type_iti==undefined){
		my_travel_mode = google.maps.TravelMode.DRIVING;
	}else{
		my_travel_mode = google.maps.TravelMode.TRANSIT;
	}
	
	var start = document.getElementById('start_iti').value;
	var end = document.getElementById('end_iti').value;
	var request = {
		origin:start, 
		destination:end,
		travelMode: my_travel_mode,
		unitSystem: google.maps.UnitSystem.METRIC,
		region: 'fr'
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}else{
			alert('Error: ' + status);
		}
	});
}

function affiche_iti(){
	if($("#ville_dep").val()!=''){
		
		var my_url = document.getElementById("url_print").href + '?ville_dep=' + document.getElementById('ville_dep').value;
		if(document.getElementById('transport_mode_transit')){
			if(document.getElementById('transport_mode_transit').checked){
				//my_url = my_url + ' ' + document.getElementById('ville_transit').value + '&transit';
				my_url = my_url + '&transit';
			}
		}
		window.open(my_url);
	}
}

// Permet de centrer la carte sur le point d'origine
function center_maps_on_orig(){
	if(typeof markers['orig'] != 'undefined'){
		ma_carte.closePopup();
		ma_carte.panTo(markers['orig'].getLatLng());
	}
}

function set_circle_orig(){
	circle_orig = new L.Circle(markers['orig'].getLatLng(), {
		radius: 500, // 500m
		fillColor: '#EE0000',
		fillOpacity: 0.4,
		color: '#CCCCCC',
		opacity: 1,
		weight: 2,
		interactive: false
	}).addTo(ma_carte);
}

// Affiche ou masque les markers en fonction de leur id_type_tourisme - puis appel de toggle_liste_type_tourisme()
// show_on_map (string) : 'auto' => mode automatique ; 'true' => affiche les markers ; 'false' => masque les markers
function toggle_show_markers_tourisme(elem, id_type_tourisme, show_on_map){
	for(var i in markers){
		if(markers[i].options.icon.options.iconUrl.indexOf('/' + id_type_tourisme + '.png') > 0){
			if(show_on_map == 'auto'){
				show_on_map = (ma_carte.hasLayer(markers[i])) ? 'false' : 'true'; // mode auto => on inverse
			}

			if(show_on_map == 'true'){
				if(!ma_carte.hasLayer(markers[i])){
					ma_carte.addLayer(markers[i]);
				}
				markers[i].options.is_displayed = true;
			} else {
				ma_carte.removeLayer(markers[i]);
				markers[i].options.is_displayed = false;
			}
		}
	}
	toggle_liste_type_tourisme($(elem).parent().find('.nom_type_tourisme')[0], id_type_tourisme, true);
}

// Affiche ou masque la liste des points touristiques, par catégorie (en fonction de leur id_type_tourisme)
// puis bloque le déroulement de la liste si besoin
// par défaut, cette fonction fait un toggle. Si force_to_close est présent, alors on masque la liste dans tous les cas
function toggle_liste_type_tourisme(elem, id_type_tourisme, force_to_close){
	var is_checked = $('[name=tourisme_'+id_type_tourisme+']').prop('checked');
	if(typeof force_to_close != 'undefined' && force_to_close){
		if(!is_checked){ // is_checked : il s'agit de la valeur AVANT de cliquer sur l'élement
			$(elem).parent().find('.toggle_type_tourisme').slideUp();
			$(elem).find('.fleche_css').removeClass('fleche_css_up');
			$('#nom_type_tourisme_'+id_type_tourisme).addClass('disable_elem_tourisme');
		} else {
			$('#nom_type_tourisme_'+id_type_tourisme).removeClass('disable_elem_tourisme');
		}
	} else {
		$(elem).parent().find('.toggle_type_tourisme').slideToggle();
		$(elem).find('.fleche_css').toggleClass('fleche_css_up');
	}
}