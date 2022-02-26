function disp_lang(my_mode){
	if(my_mode=='show'){
		$('#list_flags').show();
	}

	if(my_mode=='hide'){
		$('#list_flags').hide();
	}
}

function disp_currencies(my_mode){
	if(my_mode=='show'){
		$('#list_currencies').show();
	}

	if(my_mode=='hide'){
		$('#list_currencies').hide();
	}
}

// $('body').click(function() {
// 	$('#mots_cles_destination_sugg').hide();
// });

function detectCharset(){
	if(document.charset!=undefined){
		var my_charset = document.charset.toLowerCase();
	}else{
		var my_charset = document.characterSet.toLowerCase();
	}

	if(my_charset.match(/utf/g)){
		my_charset = 'utf8';
	}else{
		my_charset = 'iso';
	}
	return my_charset;
}

function is_iOS() {
	var iDevices = [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	];

	if (!!navigator.platform) {
		while (iDevices.length) {
			if (navigator.platform === iDevices.pop()){
				return true;
			}
		}
	}
	return false;
}

function is_touchScreen(){
	// return ('ontouchstart' in document.documentElement);
	return ('ontouchstart' in window || navigator.msMaxTouchPoints);
	// return false;
}

if(!is_touchScreen()){
	$('[title!=""]').qtip({
		position: {
			viewport: $(window),
			target: 'mouse',
			adjust: { mouse: true, x: 20, y: 20, method: 'shift' }
		},
		style: { classes: 'qtip-light qtip-shadow', tip: {corner: false} }
	});

	// $('[title_avis!=""]').qtip({
	//     overwrite: true,
	// 		content: {
	// 			attr: 'title_avis'
	// 		},
	// 	position: {
	// 		viewport: $(window),
	// 		target: 'mouse',
	// 		adjust: { mouse: true, x: -200, y: 15, method: 'shift' }
	// 	},
	// 	style: { classes: 'qtip-light qtip-shadow', tip: {corner: false} }
	// });
}

// mouseup touchend
$(document).on('mouseup touchend', function(e){
	var mots_cles_destination = $('#mots_cles_destination');
	var mots_cles_destination_sugg = $('#mots_cles_destination_sugg');
	if (!mots_cles_destination.is(e.target) && mots_cles_destination.has(e.target).length === 0 && !mots_cles_destination_sugg.is(e.target) && mots_cles_destination_sugg.has(e.target).length === 0){
	// if (!mots_cles_destination.is(e.target) && mots_cles_destination.has(e.target).length === 0){
		$('#mots_cles_destination_sugg').hide();
	}

	var container1 = $("#list_flags"); // #flags
	if (!container1.is(e.target) && container1.has(e.target).length === 0){
		disp_lang('hide');
	}

	var container2 = $("#currencies");
	if (!container2.is(e.target) && container2.has(e.target).length === 0){
		disp_currencies('hide');
	}

	/* Pour cacher la fenêtre "favoris / partager sur ..." */
	var blocFavorisPartagerSur = $('.togglePartage');
	if (!blocFavorisPartagerSur.is(e.target) && blocFavorisPartagerSur.has(e.target).length === 0){
		$('.togglePartage').hide();
	}

	var nb_personnes_text = $('#nb_personnes_text');
	var nb_personnes_toggle = $('#nb_personnes_toggle');
	if(!nb_personnes_text.is(e.target) && nb_personnes_text.has(e.target).length === 0 && !nb_personnes_toggle.is(e.target) && nb_personnes_toggle.has(e.target).length === 0){
		nb_personnes_toggle.hide();
	}

	// Solution particulière pour le fermeture de DatePicker sur iOS !
	if (!$(e.target).hasClass('hasDatepicker') && !$(e.target).hasClass('ui-datepicker') && !$(e.target).hasClass('ui-icon') && !$(e.target).parent().parents('.ui-datepicker').length){
		$('.hasDatepicker').datepicker('hide');
	}

	/* Pour masquer les blocs "toggle_moteur" (prestas, themes, etc...) du moteur de recherche (avec animation) */
	$('.toggle_moteur').each(function(){
		var id_toggle = $(this).data('toggle');
		var bloc_no_anim = $('#' + id_toggle);
		if (!bloc_no_anim.is(e.target) && bloc_no_anim.has(e.target).length === 0 && !$(e.target).is($(this))){
			toggleAnimVertical('#' + id_toggle, true);
		}
	});

	// Listener : un clic sur .overlayModal ou .containerModal_1 et on ferme la fenêtre modale courante
	var overlayModal = $('.overlayModal');
	var containerModal_1 = $('.containerModal_1');
	if( overlayModal.is(e.target) || containerModal_1.is(e.target) ){
		overlayModal.remove();
	}
});

// Avis clients : pour les touchScreen, il faut cliquer sur le smiley pour voir le détail des notes
if(is_touchScreen()){
	$('.img_avis_et_fleche').click(function(){
		$(this).siblings('.detail_note_avis').toggle();
	});
	// Si on clique sur le document, on masque le détail des notes
	$(document).on('mouseup touchend', function(e){
		var container = $('.detail_note_avis');
		if (!container.is(e.target) && container.has(e.target).length === 0){
			container.hide();
		}
	});
// Sinon par défaut, on affiche le détail des notes au survol de la souris
} else {
	$('.img_avis_et_fleche').mouseover(function(){
		$(this).siblings('.detail_note_avis').show();
	});
	$('.img_avis_et_fleche').mouseleave(function(){
		$(this).siblings('.detail_note_avis').hide();
	});
}

// Solution particulière pour iOS : empêcher l'affichage du clavier lors d'un clic sur un "input readonly" ! - désactivé le 13/02/2019
// $('input:text[readonly]').on('focus', function(e){
// 	this.blur();
// });

function valid_date(my_year, my_month, my_day){
	var dateObj = new Date(my_year, my_month-1, my_day);//le numero de mois commence à 0

	if (dateObj.getFullYear() == my_year && dateObj.getMonth() == my_month-1 && dateObj.getDate() == my_day) {
		return true;
	}else{
		return false;
	}
}

$(document).ready(function(e) {
	$('img[usemap]').rwdImageMaps();
	$('.swipebox').swipebox({hideBarsDelay : 0, useSVG : false});
});

function change_region(ma_carte, id_region){
	document.getElementById(ma_carte).src ='/lib3/maps/france-css/france-' + id_region + '.png';
}

function revert_region(ma_carte){
	document.getElementById(ma_carte).src = '/lib3/empty.gif';
}

function toggle_bloc(id_bloc){
	$('#' + id_bloc).animate({height: 'toggle', opacity: 'toggle'}, 200, 'linear');
}

function show_boost(my_size, voir_plus, voir_moins){
	$('#boost_list').height() == my_size ? my_height=360 : my_height=my_size;
	$('#bottom_boost_list').height() == 30 ? bottom_boost_list_height=0 : bottom_boost_list_height=30;
	$('#bottom_boost_list').height(bottom_boost_list_height);

	$('#boost_list').animate({height: my_height+'px', opacity: 1}, 200, 'linear');
	
	$('#show_more_boost').toggleText(voir_plus, voir_moins);
	
	return false;
};

// $('#ann-form-contact select').change(function() {
// 	if($(this).children('option:first-child').is(':selected')) {
// 		$(this).addClass('select-placeholder');
// 	}else {
// 		$(this).removeClass('select-placeholder');
// 	}
// });

function change_pic_hotel(my_pic, src, title, pic_index){
	document.getElementById(my_pic).src = src;
	document.getElementById('lgd_' + my_pic).innerHTML = title;
	document.getElementById(my_pic + '_index').value = pic_index;
}

function launch_diapo_hotel(section_diap){
	$.swipebox( eval('main_' + section_diap + '_array') );
	
	for(i=1; i<=document.getElementById('main_' + section_diap + '_index').value; i++){
		$( "#swipebox-next" ).trigger( "click" );
	}
}

function show_more_photos(id_bloc, voir_plus, voir_moins){
	$('#' + id_bloc).animate({height: 'toggle', opacity: 'toggle'}, 200, 'linear');
	$('#link_' + id_bloc).toggleText(voir_plus, voir_moins);
}

function change_note(my_div, my_note){
	if(document.getElementById('review_note_' + my_div).value==0){
		document.getElementById('review_' + my_div).className = 'div_review sreview' + my_note;
		if(my_note==0){
			document.getElementById('review_mention_' + my_div).innerHTML = '';
		}else{
			document.getElementById('review_mention_' + my_div).innerHTML = review_mentions[my_note] + ', ' + my_note + '/10';
		}
	}else{
		if(my_note==0){
			document.getElementById('review_' + my_div).className = 'div_review sreview' + document.getElementById('review_note_' + my_div).value;
			document.getElementById('review_mention_' + my_div).innerHTML = review_mentions[document.getElementById('review_note_' + my_div).value] + ', ' + document.getElementById('review_note_' + my_div).value + '/10';
		}else{
			document.getElementById('review_' + my_div).className = 'div_review sreview' + my_note;
			document.getElementById('review_mention_' + my_div).innerHTML = review_mentions[my_note] + ', ' + my_note + '/10';
		}
	}
}

function set_note(my_div, my_note){
	document.getElementById('review_note_' + my_div).value = my_note;
	document.getElementById('review_' + my_div).className = 'div_review sreview' + my_note;
	document.getElementById('review_mention_' + my_div).innerHTML = review_mentions[my_note] + ', ' + my_note + '/10';
	document.getElementById('total_avis').value = 1;
}

function verif_avis(){
	if($("#titre_avis").val()=='' || $("#texte_avis").val()=='' || $("#date_sejour").val()=='' || $("#pseudo_avis").val()=='' || $("#nom_avis").val()==''){
		confirmJquery(alert_avis, 'Ok');
	}else{
		if($("#titre_avis").val().length<5 || $("#texte_avis").val().length<20){
			confirmJquery(alert_min_length, 'Ok');
		}else{		
			var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
			if ($("#email_avis").val().search(emailRegEx) == -1) {
				confirmJquery(alert_email_valide, 'Ok');
			}else{
				if(!$("#reco_yes").is(':checked') && !$("#reco_no").is(':checked')){
					confirmJquery(alert_reco_yesno, 'Ok');
				}else{
					if(!$("#authentique").is(':checked')){
						confirmJquery(alert_authentique, 'Ok');
					}else{
						if($("#total_avis").val()==0){
							confirmJquery(alert_set_note, 'Ok');
						}else{
							$("#form_avis").submit();
						}
					}
				}
			}
		}
	}
}

function goToByScroll(id, myoffset){
	if (myoffset == undefined) {
		myoffset = 0;
	}
	
	var target_offset_top = $('#' + id).offset().top;
	var window_height = document.body.clientHeight;
	$('html,body').animate({scrollTop: target_offset_top - (window_height/2 - 200 + myoffset)});
}

function check_annonce_contact(){
	if($("#nom_prenom").val()=='' || $("#datepicker").val()=='' || $("#email").val()=='' || $("#duree").val()=='' || $("#telephone").val()=='' || $("#nb_personnes").val()==''){
		alert( "Veuillez remplir tous les champs !");
	}else{
		var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if ($("#email").val().search(emailRegEx) == -1) {
			alert(alert_email_valide); 
		}else{
			$("#annonce_contact").submit();
		}
	}
}
function check_annonce_contact_2(){
	if($("#nom_prenom").val()=='' || $("#date_arrivee").val()=='' || $("#date_depart").val()=='' || $("#email").val()=='' || $("#telephone").val()=='' || $("#nb_personnes").val()==''){
		alert( "Veuillez remplir tous les champs !");
	}else{
		var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if ($("#email").val().search(emailRegEx) == -1) {
			alert(alert_email_valide); 
		}else{
			// var promise = verif_dispos_planning(false, false);
			var promise = verif_form_contact_ajax({alerte: true, show_button: false, force_show_button: true});
			promise.then(function(dispo){
				if(dispo){
					$("#annonce_contact").submit();
				}
				// else {
				// 	confirmJquery('Ces dates ne sont pas disponibles.', 'Ok');
				// }
			});
		}
	}
}
function check_annonce_contact_immo(){
	if($("#nom_prenom").val()=='' || $("#email").val()=='' || $("#telephone").val()=='' || $("#message").val()==''){
		alert( "Veuillez remplir tous les champs !");
	}else{
		var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if ($("#email").val().search(emailRegEx) == -1) {
			alert(alert_email_valide); 
		}else{
			$("#annonce_contact").submit();
		}
	}
}

function resize_iframe(my_iframe, my_offset){
	var viewportwidth;
	var viewportheight;
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined'){
		viewportwidth = window.innerWidth,
		viewportheight = window.innerHeight
	}

	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth!='undefined' && document.documentElement.clientWidth != 0){
		viewportwidth = document.documentElement.clientWidth,
		viewportheight = document.documentElement.clientHeight
	}
	// older versions of IE
	else{
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
		viewportheight = document.getElementsByTagName('body')[0].clientHeight
	}

	document.getElementById(my_iframe).style.height = (viewportheight-my_offset) + 'px';
}

$(document).on("ready", function () {
	var urlHash = window.location.href.split("#")[1];
		if(urlHash){
			$('html,body').animate({
				scrollTop: $('.' + urlHash + ', #' + urlHash +',[name='+urlHash+']').first().offset().top -100
		}, "fast");
	}
});

function openWindow(url, name, largeur, hauteur){
	var largeurEcran = (screen.width - largeur) / 2;
	var hauteurEcran = ((screen.height - hauteur) / 2)-60;

	newwindow = window.open(url, name, 'width=' + largeur + ', height=' + hauteur + ', top=' + hauteurEcran + ', left=' + largeurEcran);
	if (window.focus) {
		newwindow.focus();
	}
}

/* Retourne le nb d'éléments d'un tableau associatif */
function count(array){
    var c = 0;
    for(var i in array){
        if(array[i] != 'undefined'){
            c++;
		}
	}
	return c;
}

/* 
Cette fonction permet de copier du texte. 

Restrictions : 
- Accepte uniquement un nodeHtml ou un id (type string : 'id-1')
- La copie ne peut se faire que si l'élément à copier est visible (donc impossible de faire fonctionner avec type=hidden, display:none)
- copie seulement le contenu d'un input OU d'un textarea

retourne un booléen indiquant si le lien a été copié ou non
*/
function copyToClipboard(elem) {
	if(typeof (elem) == 'string'){
		elem = $('#' + elem)[0]; // recherche d'un élément portant cet id
	}
	if(!elem){
		return false;
	}
    var isInput = elem.tagName == "INPUT" || elem.tagName == "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
		console.log('Le Node Html n\'est ni un input, ni un textarea. Impossible de copier');
		return false;
	}
	// save original focus
    var currentFocus = document.activeElement;
	// select the content
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    // restore prior selection
    elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    return succeed;
}
// idem fonction "copyToClipboard". Cependant, celle-ci permet de copier le texte d'un élément div, span, p, etc...
function copyToClipboard_all(elem) {
	if(typeof (elem) == 'string'){
		elem = document.getElementById(elem); // recherche de l'élément portant cet id
	}
	var textarea = document.createElement('textarea');
	textarea.id = 'temp_element';
	textarea.style.height = 0;
	document.body.appendChild(textarea);
	textarea.value = elem.innerText;
	var selector = document.querySelector('#temp_element');
	selector.select();
	var succeed;
	try {
		succeed = document.execCommand('copy');
	} catch(e) {
		succeed = false;
	}
	document.body.removeChild(textarea);
	return succeed;
}

/*
Permet d'afficher une fenêtre de dialogue Jquery qui sera modale, non déplaçable, et non redimensionnable.

Paramètres obligatoires : text, button1, callback1

Paramètres : 
- text : le texte à afficher en tant que corps (body) de la fenêtre de dialogue
- button1 : le texte du 1er bouton
- callback1 : la fonction appelée si l'utilisateur clique sur le button1 -- non obligatoire
- button2 : le texte du 2ème bouton -- non obligatoire
- callback2 : la fonction appelée si l'utilisateur clique sur le button2 -- non obligatoire
	si aucune fonction ne doit être appelée, il faut mettre "function(){}"
- classNameDialog : la class de toute le fenêtre. Si on veut personnaliser uniquement le "text", il faut utiliser le sélecteur "{className} .confirmJquery" -- non obligatoire
- displayCloseButton : bouléen pour savoir s'il faut afficher le bouton "Fermer" (la croix en haut à droite) -- non obligatoire
- widthDialog : la taille de la fenêtre -> valeurs possibles : type number (150) ou 'auto' -- non obligatoire
- titleDialog : le titre de la fenêtre -- non obligatoire

Exemple : 
confirmJquery('texte du corps', 'affiche toto', function(){console.log('toto');}, 'affiche tata', function(){console.log('tata');}, 'classToto', false, 650, 'le titre');

// Pour remplacer .alert()
confirmJquery('texte du corps', 'affiche toto', function(){console.log('toto');});
confirmJquery('texte du corps', 'Ok');
*/
function confirmJquery(text, button1, callback1, button2, callback2, classNameDialog, displayCloseButton, widthDialog, titleDialog){
	// Vérifications
	var fctNoCloseButton = function(){}, fctNoTitle = function(){};
	if(typeof displayCloseButton != 'undefined' && displayCloseButton == false){
		fctNoCloseButton = function(thisRef){
			// ne pas afficher le bouton "fermer"
			$(thisRef).parent().children().children('.ui-dialog-titlebar-close').hide();
		};
	}
	if(typeof widthDialog == 'undefined'){
		widthDialog = 'auto';
	}
	if(typeof titleDialog == 'undefined' || titleDialog == ''){
		titleDialog = '';
		fctNoTitle = function(thisRef){
			$(thisRef).parent().find('.ui-dialog-titlebar').css('display', 'none');
		};
	}
	if(typeof classNameDialog == 'undefined'){
		classNameDialog = '';
	}
	if(typeof callback1 != 'function'){
		callback1 = function(){};
	}
	if(typeof callback2 != 'function'){
		callback2 = function(){};
	}
	
	// defer est la "promise" (promesse) qui contient la valeur de retour de la fonction
	// meilleur qu'un "return" puisqu'on est en fonctionnement asynchrone
	var defer = $.Deferred();
	
	var tableauDeBoutons = [];
	var objButton = {
		text: button1,
		click: function() {
			defer.resolve("bouton1");
			$(this).dialog("close");
			$(this).remove();
			callback1();
		}
	};
	tableauDeBoutons.push(objButton);
	if(typeof button2 != 'undefined' && button2 != ''){
		var objButton2 = {
			text: button2,
			click: function() {
				defer.resolve("bouton2");
				$(this).dialog("close");
				$(this).remove();
				callback2();
			}
		};
		tableauDeBoutons.push(objButton2);
	}

	// Création du nodeHtml qui contiendra le texte (retrouvable grace à nodeJquery)
	var nodeHtml = document.createElement("div");
	nodeHtml.id = 'confirmJquery_' + Math.floor((Math.random() * 1000) + 1); // Random entre 1 et 1000
	nodeHtml.className = 'confirmJquery';
	nodeHtml.style.display = "none";
	$('body').append(nodeHtml);
	var nodeJquery = $('#' + nodeHtml.id);
	nodeJquery.html(text);
	
	// Mise en place de la fenêtre de dialogue
	nodeJquery.dialog({		
		modal: true,
		draggable: false,
		resizable: false,
		width: widthDialog,
		title: titleDialog,
		dialogClass: classNameDialog,
		open: function(event, ui) { 
			fctNoCloseButton(this);
			fctNoTitle(this);
		},
		buttons: tableauDeBoutons
	});
	
	// On retourne la "promise" (promesse)
	return defer.promise();
}

/**
 * Permet de créer une fenêtre modale (JS / jQuery)
 */
function modalBox(options){
	var default_options = {
		elem: '', // (string | DOM object | JQuery object) : l'élément à rendre modal
		iframe: '', // (string) : URL ouverte dans une iframe
		id: 'modalBox_', // (string) : ID de la fenêtre modale
		class_content: '', // (string) : Class CSS du contenu de la fenêtre
		width_iframe: '800px', // (string) : largeur de l'iframe
		height_iframe: '600px', // (string) : hauteur de l'iframe
		no_width_height_iframe : false, // (bool) : spécifie si l'iframe doit être sans largeur/hauteur
		onload_iframe: '', // (string | function) : fonction exécutée au chargement de l'iframe
		scrolling_iframe: true, // (bool) : scrollbars pour l'iframe ?
		auto_open: false, // (bool) : Ouverture immédiate de la fenêtre modale
		btn_open: '', // (string | DOM object | JQuery object) : bouton d'ouverture de la fenêtre modale
		no_close_selector: '', // (string) : un élément extérieur à la fenêtre modale qui ne doit pas fermer la fenêtre modale s'il est cliqué (ex: datepicker)
		on_close: '', // (function) : fonction appelée lors de la fermeture de la fenêtre modale
		cache_iframe: true,
		close_on_click_overlay: true // (bool) : Ferme la fenêtre si on clique sur l'overlay
	};
	
	for(var i in default_options){
		if(typeof options[i] == 'undefined'){
			options[i] = default_options[i];
		}
	}
	
	var elem = $();
	if(options.elem!=''){
		elem = $(options.elem);
	}
	if(options.iframe != ''){
		var iframe = '<iframe src="' + options.iframe + '"';
		if(options.onload_iframe != ''){
			iframe += ' onload="' + options.onload_iframe + '"';
		}
		if(!options.scrolling_iframe){
			iframe += ' scrolling="no"';
		}
		iframe += ' style="border: none;';
		if(!options.no_width_height_iframe){
			iframe += 'width: ' + options.width_iframe + ';';
			iframe += 'height: ' + options.height_iframe + ';';
		}
		iframe += '">';

		// elem = $('<iframe src="' + options.iframe + '" ' + ((options.onload_iframe != '') ? ('onload="' + options.onload_iframe + '"') : '') + ' style="border: none;width: ' + options.width_iframe + ';height: ' + options.height_iframe + ';">');
		elem = $(iframe);
	}
	if(elem.length == 0){
		return;
	}

	if($('#' + options.id + '.modalBox').length == 0){
		// Calcul de la hauteur de l'élément
		var previousCss = elem.attr("style");
		elem.css({
			position: 'absolute',
			visibility: 'hidden',
			display: 'block'
		});
		var height_elem = elem.height();
		elem.attr('style', previousCss ? previousCss : '');

		// Récupération de la hauteur de l'écran
		var height_screen = document.documentElement.clientHeight;

		// Préparation des blocs à créer pour afficher la fenêtre modale (overlay, bouton "Fermer", etc...)
		elem_modalBox = $('<div id="' + options.id + '" class="modalBox"></div>');
		var elem_modalBox_content = $('<div class="modal-content ' + options.class_content + '"></div>');
		var elem_modalBox_content_close = $('<span class="modal-close">&times;</span>');

		elem_modalBox_content = elem.wrap(elem_modalBox_content).parent(); // dans .modal-content, on ajoute l'élément "elem"
		elem_modalBox_content.append(elem_modalBox_content_close); // dans .modal-content, on ajoute l'élément .modal-close
		elem_modalBox = elem_modalBox_content.wrap(elem_modalBox).parent(); // dans .modalbox, on ajoute l'élément .modal-content

		// L'élément est peut être masqué, on l'affiche
		elem.show();

		// Pour centrer verticalement la fenêtre modale (ssi hauteur positive et comprise dans la taille de l'écran)
		if(height_elem > 0 && height_screen>height_elem){
			elem_modalBox_content.css('margin-top', ((height_screen/2) - (height_elem/2)));
		}

		if(options.iframe != ''){
			$('body').append(elem_modalBox);
		}

		// Listener pour ouvrir la fenêtre modale
		if(options.btn_open!=''){
			var btn_open = $(btn_open);
			if(btn_open.length > 0){
				btn_open.click(function() {
					elem_modalBox.show();
				});
			}
		}

		// Listener pour fermer la fenêtre modale
		if(elem_modalBox_content_close.length > 0){
			elem_modalBox_content_close.click(function() {
				elem_modalBox.hide();
				if(options.iframe != '' && !options.cache_iframe){
					$('#' + options.id).remove();
				}

				if(typeof options.on_close == 'function'){
					options.on_close();
				}
			});
		}

		if(options.close_on_click_overlay){
			$(document).on('mouseup touchend keydown', function(e){
				// 27 = escape key
				if($(e.target).is('#' + options.id) || (e.type == 'keydown' && e.keyCode == 27)){
					e.preventDefault();
					e.stopPropagation();
					elem_modalBox.hide();
					if(options.iframe != '' && !options.cache_iframe){
						$('#' + options.id).remove();
					}
					if(typeof options.on_close == 'function'){
						options.on_close();
					}
				}
			});
		}

		elem_modalBox.prop_options = options;
	} else {
		elem_modalBox = $('#' + options.id + '.modalBox');
	}

	// Affiche immédiatement la fenêtre modale
	if(options.auto_open===true){
		elem_modalBox.show();
		// focus sur la nouvelle fenêtre pour que les scrollbars fonctionnent immédiatement
		setTimeout(function(){
			elem.focus();
		}, 200);
	}
}

/*
Permet de limiter le nb de caractères d'un input, textarea, ...
- selecteur - exemple : .classDuSelecteur, #idSelecteur, ...
- nbCaracMax - le nb de caractères maximal autorisé
- afficheNbCaracRestants - Bouléen pour afficher ou non une info "3 caractères restants"
*/
function limiterSelonNbCarac(selecteur, nbCaracMax, afficheNbCaracRestants){
	var random = Math.floor((Math.random() * 1000) + 1);
	if(typeof afficheNbCaracRestants == 'undefined'){
		afficheNbCaracRestants = false;
	}
	
	if(afficheNbCaracRestants){
		$(selecteur).focus(function() {
		   $('<span id="nb_carac_dispo_'+random+'" style="display: block;"></span>').insertAfter($(this));
		});
		$(selecteur).blur(function() {
			$('#nb_carac_dispo_'+random).remove();
		});
	}
	
	$(selecteur).keyup(function() {
		var tlength = $(this).val().length;
		if(tlength >= nbCaracMax){
			$(this).val($(this).val().substring(0,nbCaracMax));
		}
		var tlength = $(this).val().length;
		var remain = parseInt(tlength);
		$(this).parent().find('#nb_carac_dispo_'+random).html(remain + ' caractères utilisés sur ' + nbCaracMax);
	});
}

/**
 * Fonction à appeler si on veut surpasser les évènements onclick, href, ... des éléments parents
 */
function callChangeFavoris(e, ref_id, action, type_ann, reloadPage, site_src, fin_selector){
	e.stopPropagation();
	e.stopImmediatePropagation();
	e.preventDefault();
	if(typeof fin_selector == 'undefined'){
		fin_selector = '';
	}
	changeFavoris(ref_id, type_ann, action, reloadPage, site_src, fin_selector);
}

/**
 * Permet d'ajouter ou de supprimer un favoris
 * - id_annonce_tmp : int
 * - from_affil_tmp : 0 ou 1
 * - action_tmp : add ou del
 * - reloadPage : booléen (optionnel)
 */
function changeFavoris(id_annonce_tmp, from_affil_tmp, action_tmp, reloadPage, site_src, fin_selector){
	var url = '';
	if(action_tmp == 'del'){
		url = 'supprimer-favoris.html';
	} else {
		url = 'ajouter-favoris.html';
	}

	if(typeof reloadPage == 'undefined'){
		reloadPage = false;
	}
	if(typeof site_src == 'undefined'){
		site_src = '';
	}
	if(typeof fin_selector == 'undefined'){
		fin_selector = '';
	}

	$.get(url + '?id_annonce=' + id_annonce_tmp + '&from_affil=' + from_affil_tmp + '&site_source=' + site_src)
	.done(function (nbFavoris){
		if(reloadPage){
			window.location.reload();
			return;
		}
		$('.imgAddFavoris'+fin_selector).toggle();
		$('.imgDeleteFavoris'+fin_selector).toggle();
		if(!is_touchScreen()){
			$('[title!=""]').qtip();
		}

		if(nbFavoris == 0){
			$('#lien-annonces-sauvegardees').hide();
			$('#nbFavoris').hide();
		} else {
			$('#lien-annonces-sauvegardees').show();
			$('#nbFavoris').show();
			$('#nbFavoris').html(nbFavoris);
		}
	});
}

function get_numero_tel(id_ann, lng, my_id){
	if(typeof my_id == 'undefined'){
		my_id = 'voir_telephone';
	}

	$.ajax({
		url: '//www.cybevasion.fr/ajax/telephone.php?id_annonce=' + id_ann + '&langue=' + lng + '&my_id=' + my_id,
		crossDomain : true,
		dataType: 'script',
		cache: false
	});
}

function count_web_clic(id_ann){
	$.ajax({
		url: '//www.cybevasion.fr/ajax/count_web_clic.php?id_annonce=' + id_ann,
		crossDomain : true,
		dataType: 'script',
		cache: true
	});
}
function count_link_clic(id_ann, type){
	if(typeof type == 'undefined'){
		type = 'site';
	}
	$.ajax({
		url: '//www.cybevasion.fr/ajax/count_link_click.php?id_annonce=' + id_ann + '&type=' + type,
		crossDomain : true,
		dataType: 'script',
		cache: true
	});
}

function dateSlashToSql(date){
	date = date.split('/');
	return date.reverse().join('-');
}
function dateSqlToSlash(date){
	date = date.split('-');
	return date.reverse().join('/');
}

function verif_mot_de_passe(mdp, return_infos){
	return_infos = ((typeof return_infos != 'undefined') ? return_infos : false);

	var tab_mdp = mdp.split('');
	var minuscule = false;
	var majuscule = false;
	var chiffre = false;
	var size_mdp = mdp.length;

	for(var i in tab_mdp){
		var char_ascii = tab_mdp[i].charCodeAt(0);

		if(char_ascii >= 97 && char_ascii <= 122){
			minuscule = true;
		}
		if(char_ascii >= 65 && char_ascii <= 90){
			majuscule = true;
		}
		if(char_ascii >= 48 && char_ascii <= 57){
			chiffre = true;
		}
	}

	// indique les règles respectées dans le mot de passe donné
	if(return_infos){
		return {
			'minuscule': minuscule,
			'majuscule': majuscule,
			'chiffre': chiffre,
			'taille': ((size_mdp >= 8) ? true : false)
		};
	}

	if(size_mdp < 8){
		return alert_mdp_min;

	} else if(minuscule && majuscule && chiffre){
		return '';

	} else {
		return alert_mdp_contain;
	}
}

// Fonction utile pour créer rapidement un élément du Dom avec différents attributs
// createElement('input', 'id=myid', 'class=myclass', 'type=hidden', 'name=myname', 'value=12345');
function createElement(){
	if(arguments.length == 0){
		return;
	}
	var e = document.createElement(arguments[0]);
	for (var i=1; i<arguments.length; i++) {
		var tab_attr = arguments[i].split('=');
		if(tab_attr.length != 2){
			continue;
		}
		e.setAttribute(tab_attr[0], tab_attr[1]);
	}
	return e;
}

// Permet d'ajouter un élément (node) juste après un autre (déjà existant)
function insertAfter(newNode, referenceNode){
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function photo_goodsize(width_photo, height_photo){
	var is_photo_ok = true;
	if(width_photo<300){
		is_photo_ok = false;
	}
	
	if(width_photo>=height_photo){
		//photo horizontale ou carrée
		if(width_photo<400 || height_photo<300){
			is_photo_ok = false;
		}
	}else{
		//photo verticale
		if(width_photo<300 || height_photo<400){
			is_photo_ok = false;
		}
	}
	
	//photo panoramique
	if(width_photo>=800){
		if(height_photo>=225){
			is_photo_ok = true;
		}else{
			is_photo_ok = false;
		}
	}
	
	return is_photo_ok;
}

var tab_photos_chargees = [];
$('.fleche_liste').click(function(e){
	e.stopPropagation();
	e.preventDefault();
	var elem = $(this).parents('a.etab')[0];
	var selecteur = $(elem).attr('id');
	var sens = $(this).data('sens');
	if(typeof tab_photos_chargees[selecteur] == 'undefined'){
		var nb_photos = $(elem).data('nbp');
		tab_photos_chargees[selecteur] = {'nb_photos_max': nb_photos, 'index': 1};
	}
	var new_index = 1;
	if(sens == 'next'){
		new_index = tab_photos_chargees[selecteur].index + 1;
	} else {
		new_index = tab_photos_chargees[selecteur].index - 1;
	}
	if(new_index > 0 && new_index <= tab_photos_chargees[selecteur].nb_photos_max){
		$.ajax({
			url: '//www.cybevasion.fr/ajax/get_photos.php?selecteur=' + selecteur + '&index=' + new_index,
			crossDomain : true,
			dataType: 'script',
			cache: true
		});
		tab_photos_chargees[selecteur].index = new_index;
	}
});

// Permet de faire défiler les photos d'une annonce en fonction du tableau "cyb.tab_photos"
function change_photo(sens){
	if(typeof cyb.tab_photos == 'undefined'){
		return;
	}
	if(typeof cyb.nb_photos_max_ann == 'undefined' || cyb.nb_photos_max_ann==0){
		// Initialisation des valeurs
		cyb.nb_photos_max_ann = cyb.tab_photos.length - 1;
		cyb.index_photo_principale = 0;
	}

	var new_index = 0;
	if(sens == 'next'){
		new_index = cyb.index_photo_principale + 1;
	} else {
		new_index = cyb.index_photo_principale - 1;
	}
	if(new_index >= 0 && new_index <= cyb.nb_photos_max_ann){
		if(typeof cyb.tab_photos[new_index] != 'undefined' && typeof cyb.tab_photos[new_index].url_main != 'undefined'){
			$('.sous-annonce-illus a[rel=galerie]').attr('href', cyb.tab_photos[new_index].url_full);
			$('.sous-annonce-illus a[rel=galerie]').attr('title', cyb.tab_photos[new_index].legende);
			var img = $('.sous-annonce-illus a[rel=galerie] img');
			var duration_animation = 250; // 'fast'

			img.fadeOut(duration_animation, function () {
				img.attr('src', cyb.tab_photos[new_index].url_main);
				img.fadeIn(duration_animation);
			});

			if(new_index == 0){
				$('.sous-annonce-illus .fleche_gauche').hide();
			} else if(new_index == cyb.nb_photos_max_ann){
				$('.sous-annonce-illus .fleche_droite').hide();
			} else {
				$('.sous-annonce-illus .fleche_gauche').show();
				$('.sous-annonce-illus .fleche_droite').show();

				preload_img(cyb.tab_photos[new_index+1].url_main);
			}
		
			cyb.index_photo_principale = new_index;

			init_qtip('.sous-annonce-illus');
		}
	}
}
function preload_img(src){
	(new Image()).src = src;
}
function get_infos_nav(field_selector, b64){
	b64 = ((typeof b64 != 'undefined') ? b64 : false);
	try{
		var nav = window.navigator;
		var data = {};
		data.ua = nav.userAgent || '';
		data.platform = nav.platform || '';
		data.language = nav.language || '';
		data.cores = nav.hardwareConcurrency || 0;
		data.ram = nav.deviceMemory || 0;
		data.w_ecran = window.innerWidth || 0;
		data.h_ecran = window.innerHeight || 0;
		data.w_layout = document.documentElement.clientWidth || 0;
		data.h_layout = document.documentElement.clientHeight || 0;

		var data_ = JSON.stringify(data);
		document.querySelector(field_selector).value = (b64 ? btoa(data_) : data_);
	}catch(e){}
}