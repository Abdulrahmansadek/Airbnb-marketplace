var delay_typing = (function(){
	var timer = 0;
	return function(callback, ms, myevent){
		clearTimeout (timer);
		if(myevent.keyCode!=13){
			timer = setTimeout(callback, ms);
		}
	};
})();

function check_length(id_element, nb_cars){
	$("#" + id_element).keyup(function(){
		if($(this).val().length > nb_cars){
			$(this).val($(this).val().substr(0, nb_cars));
		}
	});
}

function search_suggested(my_id, my_lang, cities_only, france_only, form_id_autosubmit, section_site, with_cp, with_currency, fire_onchange_event){
	with_cp = typeof with_cp !== 'undefined' ? with_cp : 0;
	with_currency = typeof with_currency !== 'undefined' ? with_currency : 0;
	var param_suppl = '';
	if(typeof fire_onchange_event !== 'undefined'){
		param_suppl += '&fire_onchange_event=1';
	}
	delay_typing(function(){
		$.ajax({
			url: 'https://www.cybevasion.fr/ajax/search_dest.php?langue=' + my_lang + '&id=' + my_id + '&mots_cles=' + $('#' + my_id).val() + '&cities_only=' + cities_only + '&france_only=' + france_only + '&form_id_autosubmit=' + form_id_autosubmit + '&section_site=' + section_site + '&with_cp=' + with_cp + '&with_currency=' + with_currency + '&as=1' + param_suppl,
			crossDomain : true,
			dataType: 'script',
			cache: true
		});
	}, 500, 0 );//pas de détection de la touche entrée pour le site public
	//à chaque appel de cette page, on réinitialise des données du formulaire
	document.getElementById('type_lieu').name='';
	document.getElementById('type_lieu').value='';

	if(document.getElementById('lat_lon_centre') != null){
		// document.getElementById('lat_lon_centre').remove(); // n'existe pas pour IE11

		var lat_lon_centre = document.getElementById('lat_lon_centre');
		lat_lon_centre.parentNode.removeChild(lat_lon_centre);
	}
}

$('#more-criteria a').click(function(){
	$('#form_moteur_annonces_advanced').animate({height: 'toggle', opacity: 'toggle'}, 200, 'linear');

	// if(document.getElementById('is_expand').value==0){
	// 	document.getElementById('is_expand').value = 1;
	// }else{
	// 	document.getElementById('is_expand').value = 0;
	// }

	$('#link_more_criteria').toggleText(pluscriteres, moinscriteres);

	return false;
});

$('.toggle_moteur').click(function(){
	var id_toggle = $(this).data('toggle');
	toggleAnimVertical('#' + id_toggle);
});

$('#nb_personnes_text').click(function(){
	$('#nb_personnes_toggle').toggle();
	maj_nb_adultes_enfants();
});
$('.fermer_nb_personnes').click(function(){
	$('#nb_personnes_toggle').hide();
});

// Pour chaque input qui perd le focus, on va ouvrir automatiquement l'élément suivant (comme un tabindex)
$('input[data-tabindex]').blur(function(){
	// Si l'objet est un datepicker, on ne fait rien car il ouvrira automatiquement le suivant
	if($(this).hasClass('hasDatepicker')){
		return;
	}
	// Si l'objet est vide, on ne fait rien
	if($(this).val() == ''){
		return;
	}
	var tab_index = $(this).data('tabindex');
	tab_index++;
	var next_elem_tabindex = $('[data-tabindex='+tab_index+']');
	if(next_elem_tabindex.length){
		// Si l'élément suivant contient déjà une valeur, on ne l'ouvre pas
		if(next_elem_tabindex.val() != ''){
			return;
		}
		// Si l'élément suivant est un datepicker, on l'ouvre
		if(next_elem_tabindex.hasClass('hasDatepicker')){
			setTimeout(function(){
				next_elem_tabindex.datepicker('show');
			}, 200);
		} else {
			// sinon on clique sur l'élément
			setTimeout(function(){
				next_elem_tabindex.click();
			}, 200);
		}
	}
});

function toggleAnimVertical(selector_toggle, force_hide){
	force_hide = (typeof force_hide != 'undefined') ? force_hide : false;
	var mouvement = (!force_hide) ? 'toggle' : 'hide';
	$(selector_toggle).animate({height: mouvement, opacity: mouvement}, 200, 'linear');
}

// Pour supprimer un filtre
$('.filtre_actif').click(function(){
	var id_checkbox = $(this).data('lien_filtre');
	if($('#'+id_checkbox).attr('type') == 'checkbox'){
		$('#'+id_checkbox).prop('checked', false);
	}
	if($('#'+id_checkbox).length && $('#'+id_checkbox).prop('tagName').toLowerCase() == 'select'){
		$('#'+id_checkbox).val('');
	}
	setChFamille();
	verif_form_ann('form_moteur_annonces2');
});

function verif_form_ann(my_form_id){
	var is_ok = true;

	var form = document.getElementById(my_form_id) || document.getElementsByTagName('form')[0];
	my_form_id = form.id;

	if($('#mots_cles_destination').val()==''){
		confirmJquery(alert_destination, 'Ok');
		is_ok = false;
	}

	var prix_mini_val = $('[name=prix_mini]').val();
	var prix_maxi_val = $('[name=prix_maxi]').val();
	if(typeof prix_maxi_val != 'undefined' && typeof prix_mini_val != 'undefined' && prix_mini_val != '' && prix_maxi_val != ''){
		if(parseInt(prix_mini_val) > parseInt(prix_maxi_val)){
			confirmJquery(alert_prix_mini_maxi, 'Ok');
			is_ok = false;
		}
	}

	// Les dates sont obligatoires si l'une des deux dates est renseignée OU si on se trouve dans la rubrique "annulation gratuite" (annulation_gratuite_fct)
	if(($('#date_arrivee_m').val()=='' && $('#date_depart_m').val()!='') || ($('#date_arrivee_m').val()!='' && $('#date_depart_m').val()=='')){
		confirmJquery(alert_date, 'Ok');
		is_ok = false;

	} else if(document.querySelectorAll('[name=annulation_gratuite_fct]').length && $('#date_arrivee_m').val()=='' && $('#date_depart_m').val()==''){
		confirmJquery(alert_date, 'Ok');
		is_ok = false;
	}

	if(is_ok){
		// Pour récupérer les cases cochées (filtres et tri) et les ajouter dans le formulaire
		$('#sort-bar input:checked, #sort-bar select').each(function(){
			var new_elem = '<input type="hidden" name="'+($(this).prop('name'))+'" value="'+($(this).prop('value'))+'">';
			if($(this).prop('name') == 'order'){
				// Pour l'élément "order", on supprime l'ancien élément "order" du moteur
				var elem_order_moteur = $('#'+my_form_id+' input[name=order]');
				if(elem_order_moteur.length > 0){
					elem_order_moteur.remove();
				}
			}
			$('#'+my_form_id).append(new_elem);
		});

		$('body').addClass('loading');
		if(is_touchScreen()){
			setInterval(function(){
				$('body.loading .modal').click(function(){
					$('body').removeClass('loading');
				});
			}, 5000);
		}
		// setInterval(function(){ $('body').removeClass('loading'); }, 5000);
		document.getElementById(my_form_id).submit();
	}
}

function verif_form_hot(){
	//if($("#mots_cles_destination").val()=='' || $("#datepicker").val()==''){
	if($("#mots_cles_destination").val()==''){
		// alert(alert_destination_date);
		confirmJquery(alert_destination_date, 'Ok');
	}else{
		//le champ adresse n'est pas disponible sur le moteur de la page d'accueil
		if(document.getElementById('adresse')){
			if(document.getElementById('adresse').value == $("#adresse").prop('placeholder')){
				document.getElementById('adresse').value = '';
			}
		}

		$('body').addClass('loading');
		if(is_touchScreen()){
			setInterval(function(){
				$('body.loading .modal').click(function(){
					$('body').removeClass('loading');
				});
			}, 5000);
		}
		// setInterval(function(){ $('body').removeClass('loading'); }, 5000);
		document.getElementById('form_hotels').submit();
	}
}

function verif_form_hotel(){
	if($("#date_arrivee_m").val()==''){
		confirmJquery(alert_date, 'Ok');
		$("#date_arrivee_m").focus();
	} else if($("#date_depart_m").val()==''){
		confirmJquery(alert_date, 'Ok');
		$("#date_depart_m").focus();
	} else {
		$('body').addClass('loading');
		if(is_touchScreen()){
			setInterval(function(){
				$('body.loading .modal').click(function(){
					$('body').removeClass('loading');
				});
			}, 5000);
		}
		// setInterval(function(){ $('body').removeClass('loading'); }, 5000);
		document.getElementById('form_hotels').submit();
	}
}

function verif_form_annonce(){
	if($("#date_arrivee_m").val()==''){
		confirmJquery(alert_date, 'Ok');
		$("#date_arrivee_m").focus();
	} else if($("#date_depart_m").val()==''){
		confirmJquery(alert_date, 'Ok');
		$("#date_depart_m").focus();
	} else {
		$('body').addClass('loading');
		if(is_touchScreen()){
			setInterval(function(){
				$('body.loading .modal').click(function(){
					$('body').removeClass('loading');
				});
			}, 5000);
		}
		// setInterval(function(){ $('body').removeClass('loading'); }, 5000);
		document.getElementById('form_annonces').submit();
	}
}

function verif_chambres_select(){
	var nb_select = 0;
	$('#form_select select').each(function(n,element){  
		if($(element).val()>0){
			nb_select++;
		}
	});  
	
	if(nb_select>0){
		document.getElementById('form_select').submit();
	}else{
		// alert(alert_ch_select);
		confirmJquery(alert_ch_select, 'Ok');
	}
}

function verif_resa_data(){
	//on verifie si le nom du client est indiqué pour chaque chambre
	var input_blank = 0;
	var email_error = 0;
	var conf_email_error = 0;

	var msg_alert = '';

	$.each($("input[name^='nom_chambre']"), function(key, val){
		if($.trim(val.value)==''){
			input_blank++;
			$(this).addClass("input-form-error");
		}
	});

	var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	if ($("#email_client").val().search(emailRegEx) == -1) {
		email_error++;
	}

	if($.trim($("#nom_prenom_client").val())==""){
		input_blank++;
		$("#nom_prenom_client").addClass("input-form-error");
	}

	if($.trim($("#tel_client").val())==""){
		input_blank++;
		$("#tel_client").addClass("input-form-error");
	}

	if(input_blank>0){
		msg_alert += 'Vous devez renseigner tous les champs marqués en rouge !';
	}
	if(email_error>0){
		msg_alert += "\n\n" + alert_email_valide;
		$("#email_client").addClass("input-form-error");
	}

	if($("#email_client").val()!=$("#confirm_email_client").val()){
		conf_email_error++;
		msg_alert += "\n\n" + 'La confirmation d\'email ne correspond pas à l\'email fourni !';
		$("#confirm_email_client").addClass("input-form-error");
	}

	if(msg_alert!=''){
		alert($.trim(msg_alert));
	}
	
	if(input_blank + email_error + conf_email_error == 0){
		if(Test_CB()==true){
			document.getElementById('submit_button').disabled = true;
			document.getElementById('form_resa').submit();
		}
	}
}

function verif_annul_modif(){
	if($("#num_resa").val()=='' || $("#nom_hotel").val()=='' || $("#nom_client").val()=='' || $("#email_client").val()==''){
		alert("Veuillez remplir tous les champs obligatoires :\n - Numero de reservation\n - Nom de l'hotel\n - Prenom et Nom\n - E-mail");
	}else{
		var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if ($("#email_client").val().search(emailRegEx) == -1) {
			alert(alert_email_valide);
		}else{
			if($("#modification").is(':checked') || $("#annulation").is(':checked')){
				if($("#modification").is(':checked') && $("#commentaires").val()==''){
					alert("Veuillez indiquer les détails de votre modification");
				}else{
					$("#form_modif").submit();
				}
			}else{
				alert("Indiquez le motif de votre demande (annulation ou modification)");
			}
		}
	}
}

function Test_CB(){
	var return_value = false;
	var numero = $("#num_carte").val();
	numero = numero.replace(/\D/g,"");
	var totalcarte=0;
	var dnum=0;
	var test=0;
	if (numero.length < 14) {
		alert('Numéro de carte bancaire non valide');
		$("#num_carte").addClass("input-form-error");
		$("#num_carte").focus();
	}else{
		for ( i = numero.length; i >= 1 ;  i--){
			test=test+1;
			num = numero.charAt(i-1);
			if ((test % 2) != 0){
				totalcarte=totalcarte+parseInt(num);
			}else{
				dnum=parseInt(num)*2;
				if (dnum >= 10){
					totalcarte=totalcarte+1+dnum-10;
				}else{
					totalcarte=totalcarte+dnum;
				}
			}
		}

		if ((totalcarte % 10) != 0){
			alert('Numéro de carte bancaire non valide');
			$("#num_carte").addClass("input-form-error");
			$("#num_carte").focus();
		}else{
			if ($("#crypto").length > 0){
				if ($("#crypto").val() == ""){
					alert('Veuillez indiquer le cryptogramme');
				}else{
					return_value = true;
				}
			}else{
				return_value = true;
			}
		}
	}

	if(return_value==true){
		if(verifDateExpire($("#mois_courant").val(), $("#annee_courant").val())==true){
			return_value = true;
		}else{
			return_value = false;
		}
	}
	
	return return_value;
}

function verifDateExpire(mois_courant, annee_courant){
	//cas 1 : année expiration supérieure à l'année en cours
	//cas 2 : année expiration même que l'année en cours + mois expiration supérieur ou égal au mois en cours
	if($("#annee_valid").val() > annee_courant || ($("#mois_valid").val() >= mois_courant && $("#annee_valid").val() == annee_courant)){
		return (true);
	}else{
		alert('Veuillez entrer une date d\'expiration valide pour votre carte');
		return (false);
	}
}

function setChFamille(){
	if($('#check_theme_19').is(':checked')){
		$('#capa_max_ch_famille').val(4);
		$('#capa_max_ch_famille').show();
	}else{
		$("#capa_max_ch_famille").val($("#capa_max_ch_famille option:first").val());
		$('#capa_max_ch_famille').hide();
	}
}

/* Permet de vérifier si une date peut être sélectionnée ou non comme "date d'arrivée" */
function verifierDateFermees(date){
	// format xxxx-yy-zz
	var date_sql = date.getFullYear() + '-' + ('0'+(date.getMonth() + 1)).slice(-2) + '-' + ('0'+date.getDate()).slice(-2);
	
	if(typeof tab_dates_detail != 'undefined' && tab_dates_detail.hasOwnProperty(date_sql)){
		var tab_details = tab_dates_detail[date_sql].split('|');

		if($.inArray('available', tab_details)>=0){
			return [true];
		} else if($.inArray('unavailable', tab_details)>=0){
			return [false, 'completACetteDate', legendeDateFermee];
		} else if($.inArray('no_arrival', tab_details)>=0){
			return [false, 'no_arrivee_possible', 'Pas d\'arrivée possible ce jour'];
		}
	}

	return [true];
}
/* Permet de vérifier si une date peut être sélectionnée ou non comme "date de départ" */
function verifierDatesFermees_2(date){	
	// if(date >= $('#date_arrivee').datepicker('getDate') && date < $('#date_depart').datepicker('getDate')){
	// 	// return [true, 'min_loc']; // 10/12/2019 : on ne veut plus voir la période sélectionnée
	// 	return [true];
	// }

	// on travaille sur une copie de l'objet Date
	var date_tmp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	// On enlève un jour car il faut tester la date précédente (ouverte ou fermée) pour savoir si le jour actuel est disponible comme "date de départ"
	// Exemple dans $tab_dates_detail : 27: ouvert, 28: fermé
	// Pour une date de départ, le 28 doit être ouvert
	date_tmp.setDate(date_tmp.getDate() - 1);

	var date_sql = date_tmp.getFullYear() + '-' + ('0'+(date_tmp.getMonth() + 1)).slice(-2) + '-' + ('0'+date_tmp.getDate()).slice(-2);

	if(typeof tab_dates_detail != 'undefined' && tab_dates_detail.hasOwnProperty(date_sql)){
		var tab_details = tab_dates_detail[date_sql].split('|');
		
		if($.inArray('unavailable', tab_details)>=0){
			return [false, 'completACetteDate', legendeDateFermee];
		} else if($.inArray('no_departure', tab_details)>=0){
			return [false, 'no_arrivee_possible', 'Pas de départ possible ce jour'];
		}
	}

	return [true];
}

function check_form_resa_direct(){
	var date_arrivee_resa = $('#date_arrivee_resa').val();
	var date_depart_resa = $('#date_depart_resa').val();

	if(date_arrivee_resa.length == 0 || date_depart_resa.length == 0){
		confirmJquery('Les dates d\'arrivée et de départ sont obligatoires !', 'Ok');
	}else{
		$("#form_resa_ann_direct").submit();
	}
}

// Retourne le nb de jours entre deux dates (start & end doivent être au format YYYY-MM-DD)
function get_nb_days(start, end){
	return Math.abs( (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24) );
}

var numberOfMonthsDatepicker = 2;
if(typeof window.matchMedia != 'undefined' && window.matchMedia("(max-width: 800px)").matches){
	numberOfMonthsDatepicker = 1;
}

var d_tmp = new Date();
// var nb_jours_restants = (new Date(d_tmp.getFullYear(), d_tmp.getMonth()+1, 0)).getDate() - d_tmp.getDate(); // Nb de jours restants avant la fin du mois
// var duree_datepicker = '+16M +'+nb_jours_restants+'D'; // soit environ 25 mois
var duree_datepicker = new Date(d_tmp.getFullYear(), d_tmp.getMonth()+16, 0); // soit 16 mois plus tard, accordé à $nb_mois_disp_planning

$("#datepicker").datepicker({
	minDate: 0, 
	maxDate: duree_datepicker, 
	numberOfMonths: numberOfMonthsDatepicker,
	beforeShowDay: verifierDateFermees
});
$(".datepicker").datepicker({ // il y a certaines pages avec plusieurs calendriers
	minDate: 0, 
	maxDate: duree_datepicker, 
	numberOfMonths: numberOfMonthsDatepicker,
	beforeShowDay: verifierDateFermees
});

// pour les moteurs
$("#date_arrivee_m").datepicker({
	minDate: 0, 
	maxDate: duree_datepicker, 
	numberOfMonths: numberOfMonthsDatepicker,
	onSelect: function (date_format) {
		var obj_date_arrivee = $('#date_arrivee_m');
		var obj_date_depart = $('#date_depart_m');
		if(obj_date_depart.length >= 1){
			var dt1 = obj_date_arrivee.datepicker('getDate');
			var dt2 = obj_date_depart.datepicker('getDate');

			var min_dt2 = new Date(dt1);
			min_dt2.setDate(min_dt2.getDate() + 1);
			obj_date_depart.datepicker('option', 'minDate', min_dt2);

			var max_dt2 = new Date(dt1);
			max_dt2.setDate(max_dt2.getDate() + 90);
			obj_date_depart.datepicker('option', 'maxDate', max_dt2);

			setTimeout(function(){
				obj_date_depart.focus();
			}, 0);
		}
		$(this).change();
	}
});
$("#date_depart_m").datepicker({
	minDate: 0, 
	maxDate: duree_datepicker, 
	numberOfMonths: numberOfMonthsDatepicker,
	onSelect: function () {
		if($("#nb_adultes").val()==1 && $("#nb_enfants").val()==0){
			$("#nb_personnes_text").click();
		}
		$(this).change();
	}
});

// pour les moteurs de resa
$(".date_arrivee_resa").datepicker({
	minDate: 0, 
	maxDate: duree_datepicker, 
	numberOfMonths: numberOfMonthsDatepicker,
	beforeShowDay: verifierDateFermees,
	onSelect: function (date_format) {
		var obj_date_arrivee = $('.date_arrivee_resa');
		var obj_date_depart = $('.date_depart_resa');
		if(obj_date_depart.length >= 1){
			var dt1 = obj_date_arrivee.datepicker('getDate');
			var dt2 = obj_date_depart.datepicker('getDate');

			var min_dt2 = new Date(dt1);
			var duree_mini_loc = get_duree_mini(dateSlashToSql(date_format));

			// minDate = dt1 + duree_mini_loc => variable selon chaque annonce, déterminé en fonction de : tabDureeslocMiniDates
			min_dt2.setDate(min_dt2.getDate() + parseInt(duree_mini_loc));
			obj_date_depart.datepicker('option', 'minDate', min_dt2);

			var max_dt2 = new Date(dt1);
			max_dt2.setDate(max_dt2.getDate() + 90);
			obj_date_depart.datepicker('option', 'maxDate', max_dt2);

			if(dt2==null){
				obj_date_depart.datepicker('setDate', min_dt2);
			}

			setTimeout(function(){
				obj_date_depart.focus();
			}, 0);
		}
		$(this).change();
	}
});
$(".date_depart_resa").datepicker({
	minDate: 0, 
	maxDate: duree_datepicker, 
	numberOfMonths: numberOfMonthsDatepicker,
	beforeShowDay: verifierDatesFermees_2
});

function set_dates_indiff(){
	if($( "#dates_indiff" ).prop( "checked" ) == true){
		$( "#date_arrivee_m" ).prop( "disabled", true);
		$( "#date_depart_m" ).prop( "disabled", true);
	}else{
		$( "#date_arrivee_m" ).prop( "disabled", false);
		$( "#date_depart_m" ).prop( "disabled", false);
	}
}

/* Pour fiche annonce */
$("#date_arrivee").datepicker({
	minDate: 0, 
	maxDate: duree_datepicker, 
	numberOfMonths: numberOfMonthsDatepicker,
	beforeShowDay: verifierDateFermees,
	onSelect: function (date_format) {
		var obj_date_arrivee = $('#date_arrivee');
		var obj_date_depart = $('#date_depart');
		var dt1 = obj_date_arrivee.datepicker('getDate'); // retourne un type 'date'
		var dt2 = obj_date_depart.datepicker('getDate'); // retourne un type 'date'

		var min_dt2 = new Date(dt1); // copie de l'objet
		var max_dt2 = new Date(dt1); // copie de l'objet
		var duree_mini_loc = get_duree_mini(dateSlashToSql(date_format));
		var duree_maxi_loc = get_duree_maxi(dateSlashToSql(date_format));

		// minDate = dt1 + duree_mini_loc => variable selon chaque annonce, déterminé en fonction de : tabDureeslocMiniDates
		min_dt2.setDate(min_dt2.getDate() + parseInt(duree_mini_loc));
		obj_date_depart.datepicker('option', 'minDate', min_dt2);

		if(dt2==null){
			obj_date_depart.datepicker('setDate', min_dt2);
		}
		max_dt2.setDate(max_dt2.getDate() + parseInt(duree_maxi_loc));
		obj_date_depart.datepicker('option', 'maxDate', max_dt2);

		setTimeout(function(){
			obj_date_depart.focus();
		}, 0);

		setTimeout(function(){
			verif_dispos_planning();
		}, 0);
		$(this).change();
	}
});
/* Pour fiche annonce */
$("#date_depart").datepicker({
	minDate: 0, 
	maxDate: duree_datepicker, 
	numberOfMonths: numberOfMonthsDatepicker,
	beforeShowDay: verifierDatesFermees_2,
	onSelect: function (date_depart) {
		setTimeout(function(){
			verif_dispos_planning();
		}, 0);
		$(this).change();
	}
});
/* Pour fiche annonce */
$('#nb_personnes').change(function(){
	setTimeout(function(){
		verif_dispos_planning(); // Dès que date_depart, date_arrivee ou nb_personnes change, la fonction verif_dispos_planning() est appelée
	}, 0);
});

/* Pour fiche annonce */
$('#annonce_contact [name=email]').change(function(){
	setTimeout(function(){
		verif_form_contact_ajax(); // Dès que le champ email change, la fonction verif_form_contact_ajax() est appelée
	}, 0);
});

// Retourne la duree_mini en fonction de la date d'arrivée prévue
function get_duree_mini(date){
	var duree_loc_mini = 1;
	for(var i in tabDureeslocMiniDates){
		if(date >= tabDureeslocMiniDates[i]['dd'] && date <= tabDureeslocMiniDates[i]['df']){
			duree_loc_mini = tabDureeslocMiniDates[i]['dm'];
			break;
		}
	}

	return duree_loc_mini;
}

// Retourne la duree_maxi en fonction de la date d'arrivée prévue
function get_duree_maxi(date){
	var duree_loc_maxi = 90;
	for(var i in tabDureeslocMiniDates){
		if(date >= tabDureeslocMiniDates[i]['dd'] && date <= tabDureeslocMiniDates[i]['df']){
			duree_loc_maxi = tabDureeslocMiniDates[i]['dmax'];
			break;
		}
	}

	return duree_loc_maxi;
}

/* Pour fiche annonce */
function verif_dispos_planning(alerte, show_button, show_send_msg_button){
	var date_arrivee = $('#date_arrivee').val();
	var date_depart = $('#date_depart').val();
	var nb_personnes = $('#nb_personnes').val();
	var nb_adultes = $('#nb_adultes').val();
	var nb_enfants = $('#nb_enfants').val();

	if(typeof alerte == 'undefined'){
		alerte = false;
	}
	if(typeof show_button == 'undefined'){
		show_button = true;
	}

	if(typeof show_send_msg_button == 'undefined'){
		show_send_msg_button = false;
	}

	if(typeof date_arrivee == 'undefined' || date_arrivee.length == 0 || typeof date_depart == 'undefined' || date_depart.length == 0 || typeof nb_personnes == 'undefined' || nb_personnes.length == 0){
		//confirmJquery('Veuillez renseigner vos dates de séjour.', 'Ok');
		return false;
	}

	// les paramètres qui seront envoyés par la requête
	var data_requete = { 
		id_annonce: id_annonce_js, 
		date_arrivee: date_arrivee,
		date_depart: date_depart,
		nb_personnes: nb_personnes,
		nb_adultes: nb_adultes,
		nb_enfants: nb_enfants,
		langue: langue_js
	};

	// Pour obtenir les paramètres de l'url du document (utile si iframe)
	var tab_params_request_document = {};
	var query = document.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		tab_params_request_document[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	}
	if(typeof tab_params_request_document['ms'] != 'undefined'){
		data_requete['ms'] = tab_params_request_document['ms'];
	}

	var defer = $.Deferred();
	$.ajax({
		method: 'GET',
		url: '/get_dispos_planning.html',
		cache: false,
		data: data_requete, 
		beforeSend: function() {
			$('#btn_submit_dispos_planning').hide();
			$('#btn_submit_dispos_planning1').hide();
			$('#btn_submit_dispos_planning2').show();
			$('#texte_dispos_planning').html('');
			$('#loader_dispos_planning').show();
		}
	}).done(function(data) {
		var json = JSON.parse(data);
		if(json.dispo){
			$('#texte_dispos_planning').html('');
			if(show_button){
				if(show_send_msg_button){
					$('#btn_submit_dispos_planning1').hide();
					$('#btn_submit_dispos_planning2').show();
				}else{
					$('#btn_submit_dispos_planning').show();
				}
			}
			defer.resolve(true);
		} else {
			show_button = true; // pour enlever le loader
			$('#texte_dispos_planning').html(json.msg);
			defer.resolve(false);
			$('#btn_submit_dispos_planning1').hide();
			$('#btn_submit_dispos_planning2').hide();

			if(alerte){
				confirmJquery(json.msg, 'Ok');
			}
		}
		// Info : Disponible / Non disponible / Disponibilité sur demande
		var availability = ((typeof json.availability != 'undefined') ? json.availability : '');
		var availability_text = ((typeof json.availability_text != 'undefined') ? json.availability_text : '');
		var availability_color = ((typeof json.availability_color != 'undefined') ? json.availability_color : '#666');
		
		var html_dispo_tarif = '';

		var ligne_tarif = '';
		if(typeof json.mode_planning_tarifs != 'undefined' && json.mode_planning_tarifs == '2'){
			// mode_planning_tarifs == 2 : on commence par masquer toutes les grilles de tarifs
			$('.grille_tarifs').hide();
			$('.button_voir_tarifs_struc').hide();

			var min_tarif = 0;
			var symbole_monnaie = json.symbole_monnaie;

			// puis pour chaque structure, on affiche la grille de tarifs (mise à jour) de chaque structure disponible
			if(typeof json.structures != 'undefined' && typeof json.nb_nuits != 'undefined'){
				for(var id_struc in json.structures){
					var struc = json.structures[id_struc]; // raccourci

					if(!struc['dispo']){
						continue;
					}

					var tarif_nuit_tmp = Math.ceil(struc['tarif_sejour'] / json.nb_nuits);

					$('.grille_tarifs_'+id_struc).show();
					$('.grille_tarifs_'+id_struc+' .date_deb_date_fin').html(date_arrivee + ' - ' + date_depart);
					$('.grille_tarifs_'+id_struc+' .nb_de_personnes').html(struc['nb_pers_sejour'] + ' pers.');
					$('.grille_tarifs_'+id_struc+' .td_tarif_nuit').html(tarif_nuit_tmp + ' ' + symbole_monnaie);
					$('.grille_tarifs_'+id_struc+' .td_tarif_sejour').html(Math.ceil(struc['tarif_sejour']) + ' ' + symbole_monnaie);

					// Prêt si besoin d'afficher le détail des tarifs selon chaque nb_personnes
					
					// var html_td_sejour = '';
					// var html_td_tarif_sejour = '';
					// if(typeof struc['tarifs_sejour_nb_pers'] != 'undefined'){
					// 	html_td_sejour += '<div style="display: flex;">';
					// 	html_td_tarif_sejour += '<div style="display: flex;">';
					// 	for(var i in struc['tarifs_sejour_nb_pers']){
					// 		html_td_sejour += '<div style="flex: 1;padding: 0 5px;">'+i+' pers.</div>';
					// 		html_td_tarif_sejour += '<div style="flex: 1;padding: 0 5px;">'+struc['tarifs_sejour_nb_pers'][i]+' '+symbole_monnaie+'</div>';
					// 	}
					// 	html_td_sejour += '</div>';
					// 	html_td_tarif_sejour += '</div>';

					// 	$('.grille_tarifs_'+id_struc+' .nb_de_personnes.td_sejour').html(html_td_sejour);
					// 	$('.grille_tarifs_'+id_struc+' .td_tarif_sejour').html(html_td_tarif_sejour);
					// }

					if(json.nb_nuits == 1){
						$('.grille_tarifs_'+id_struc+' .td_sejour').hide();
					} else {
						$('.grille_tarifs_'+id_struc+' .td_sejour').show();
					}

					if(min_tarif==0 || tarif_nuit_tmp<min_tarif){
						min_tarif = tarif_nuit_tmp;
					}
				}
			}

			if(typeof json.tarif_total_min != 'undefined' && json.tarif_total_min>0){
				// tarif séjour en gros
				ligne_tarif = '<div class="dispo_tarif_big" style="font-size: 1.4em;">'+Math.ceil(json.tarif_total_min)+' '+symbole_monnaie+'</div>';

				// tarif nuit
				if(json.nb_nuits >= 2){
					// si >= 2 nuits => afficher équivalent "nuit"
					// si tarifs différents => afficher "à partir de"

					var a_partir_de = false;
					if(json.tarif_total_min != json.tarif_total_max){
						a_partir_de = true;
					}
					// si plusieurs nuits OU que les tarifs min/max sont différents, il faut afficher 
					ligne_tarif += '<div class="dispo_tarif" style="display: inline-block;margin-left: 5px;font-weight: normal;">('+(a_partir_de ? json.dico_a_partir_de+' ' : '')+Math.ceil(json.tarif_total_min / json.nb_nuits)+' '+symbole_monnaie+'/'+json.dico_nuit+')</div>';
				}
			}
		}

		if(ligne_tarif != ''){
			html_dispo_tarif += ligne_tarif;
		}
		if(availability_text != ''){
			html_dispo_tarif += '<div class="dispo_dispo">'+availability_text+'</div>';
		}

		$('.item_main_tarif_sejour').html('<div class="div-list-25 zoomInOut" style="color: '+availability_color+';text-align: center;width: auto;min-width: 25%;">'+html_dispo_tarif+'</div>');

		if(show_button){
			$('#loader_dispos_planning').hide();
		}
	}).fail(function(){
		$('#btn_submit_dispos_planning').show();
		$('#btn_submit_dispos_planning1').show();
		$('#loader_dispos_planning').hide();
	});

	return defer.promise();
}

/* Pour fiche annonce */
// similaire à verif_dispos_planning() mais permet de vérifier d'autres paramètres supplémentaires
function verif_form_contact_ajax(tab_params){
	var tab_init = {
		alerte: false,
		show_button: true,
		force_show_button: false,
		form_selector: '#annonce_contact'
	};

	if(typeof tab_params == 'undefined'){
		tab_params = {};
	}

	if(tab_params){
		for(var i in tab_params){
			tab_init[i] = tab_params[i];
		}
	}

	// les données du formulaire transmises pour vérification
	var tab_data = $(tab_init['form_selector']).serializeArray();
	tab_data.push({'name': 'id_annonce', 'value': id_annonce_js});

	var defer = $.Deferred();
	$.ajax({
		method: 'GET',
		url: 'https://www.gites.fr/ajax/verif_form_contact.php',
		data: tab_data, 
		beforeSend: function() {
			$('#btn_submit_dispos_planning').hide();
			$('#texte_dispos_planning').html('');
			$('#loader_dispos_planning').show();
		}
	}).done(function(json) {
		if(json.continue){
			$('#texte_dispos_planning').html('');
			if(tab_init['show_button']){
				$('#btn_submit_dispos_planning').show();
			}
			defer.resolve(true);
		} else {
			tab_init['show_button'] = true; // pour enlever le loader
			$('#texte_dispos_planning').html(json.msg);
			defer.resolve(false);

			if(tab_init['alerte']){
				confirmJquery(json.msg, 'Ok');
			}
		}
		if(tab_init['show_button']){
			$('#loader_dispos_planning').hide();
		}

		if(tab_init['force_show_button']){
			$('#btn_submit_dispos_planning').show();
			$('#texte_dispos_planning').html('');
			$('#loader_dispos_planning').hide();
		}
	}).fail(function(){
		defer.resolve(true);
		$('#btn_submit_dispos_planning').show();
		$('#loader_dispos_planning').hide();
	});

	return defer.promise();
}

// Génération du code HTML permettant de selectionner l'âge des enfants (moteur de dispos)
function create_html_age_enfants(html_select_age){
	$('.age_enfant').remove(); // On suppr tous les <select>

	for(var i=1; i<=$('#nb_enfants').val(); i++){
		$('#ages_enfants').append(html_select_age); // On créé tous les <select>
	}
}

// Met à jour l'input #nb_personnes en fonction de #nb_adultes et #nb_enfants
function maj_nb_personnes_adultes_enfants(){
	$('#nb_personnes').val(parseInt($('#nb_adultes').val()) + parseInt($('#nb_enfants').val()));
}

// Génération du code HTML permettant de selectionner l'âge des enfants (moteur de dispos)
function maj_moteur_nb_enfants(html_select_age){
	$('.age_enfant').remove(); // On suppr tous les <select>

	for(var i=1; i<=$('#nb_enfants').val(); i++){
		$('#ages_enfants').append(html_select_age); // On créé le bon nombre de <select>
	}
}
// Met à jour l'input #nb_personnes et l'affichage "{x} adultes, {y} enfants"
function maj_nb_adultes_enfants(){
	var nb_adultes = parseInt($('#nb_adultes').val());
	var nb_enfants = parseInt($('#nb_enfants').val());

	$('#nb_personnes').val(nb_adultes + nb_enfants);
	$('#nb_personnes').change(); // event

	var text = '';
	if(nb_adultes == 1){
		text += nb_adultes + ' ' + adulte;
	} else {
		text += nb_adultes + ' ' + adultes;
	}
	if(nb_enfants == 0){
		// text += ', pas d\'enfants';
	} else if(nb_enfants == 1){
		text += ', ' + nb_enfants + ' ' + enfant;
	} else {
		text += ', ' + nb_enfants + ' ' + enfants;
	}

	$('#nb_personnes_text').val(text);

	if(typeof max_nb_personnes_form_contact != 'undefined'){
		$('#nb_adultes option').each(function(){
			if($(this).prop('selected')){
				return;
			}
			var nb_tmp = parseInt(nb_enfants) + parseInt($(this).val());
			if(nb_tmp <= max_nb_personnes_form_contact){
				$(this).removeAttr('disabled').removeClass('disabled');
			} else {
				$(this).attr('disabled', 'disabled').addClass('disabled');
			}
		});
		$('#nb_enfants option').each(function(){
			if($(this).prop('selected')){
				return;
			}
			var nb_tmp = parseInt(nb_adultes) + parseInt($(this).val());
			if(nb_tmp <= max_nb_personnes_form_contact){
				$(this).removeAttr('disabled').removeClass('disabled');
			} else {
				$(this).attr('disabled', 'disabled').addClass('disabled');
			}
		});
	}
}

// Permet d'initialiser les événements des filtres et de la barre de tri


function init_events_filtres_moteur(auto_reload){
	auto_reload = (typeof auto_reload == 'undefined') ? true : false;

	// $('#form_annonces select:not(#nb_adultes, #nb_enfants, .age_enfant), #form_annonces input[type=checkbox], #form_hotels select:not(#nb_adultes, #nb_enfants, .age_enfant), #form_hotels input[type=checkbox]').change(function(){
	// 	if($('#mots_cles_destination').val()!=''){
	// 		if(document.getElementById('form_hotels') !== null){
	// 			verif_form_hot();
	// 		} else {
	// 			verif_form_ann();
	// 		}
	// 	}
	// });

	if(auto_reload){
		$('#form_annonces select[name=rayon], #form_hotels select[name=rayon], #sort-bar input[type=checkbox]:not(#check_theme_19), #sort-bar select').change(function(){
			if($('#mots_cles_destination').val()!=''){
				if(document.getElementById('form_hotels') !== null){
					verif_form_hot();
				} else {
					verif_form_ann();
				}
			}
		});
	} else {
		// Si le rayon est modifié, on soumet le formulaire
		$('#form_annonces select[name=rayon], #form_hotels select[name=rayon], #bloc_trier_par input[type=checkbox]').change(function(){
			if($('#mots_cles_destination').val()!=''){
				if(document.getElementById('form_hotels') !== null){
					verif_form_hot();
				} else {
					verif_form_ann();
				}
			}
		});
		// Si une case à cocher est modifiée, on affiche le bouton "Appliquer"
		$('#bloc_prestas_m input[type=checkbox], #sort-bar select, #noUiSlide_number1, #noUiSlide_number2').change(function(){
			if($('#mots_cles_destination').val()!=''){
				$('#bouton_appliquer').show();
			}
		});
	}
}

/* Moteur de suggestions */

var currentFocusListSugg = -1;
var is_init_list_sugg = false;

function search_suggested_v2(event, my_id, my_lang, cities_only, france_only, form_id_autosubmit, section_site, with_cp, with_currency, fire_onchange_event, with_licence, with_desc_etr){
	if(!is_init_list_sugg){
		init_events_list_sugg(my_id);
	}

	if(event.keyCode && ([37, 38, 39, 40, 13, 27]).indexOf(event.keyCode)!=-1){
		// Les flèches, la touche Entrée, la touche Échap ne rechargent pas la liste de suggestions
		return false;
	}

	with_cp = ((typeof with_cp !== 'undefined') ? with_cp : 0);
	with_currency = ((typeof with_currency !== 'undefined') ? with_currency : 0);
	with_licence = ((typeof with_licence !== 'undefined') ? with_licence : 0);
	with_desc_etr = ((typeof with_desc_etr !== 'undefined') ? with_desc_etr : 0);
	var param_suppl = '';
	if(typeof fire_onchange_event !== 'undefined'){
		param_suppl += '&fire_onchange_event=1';
	}

	delay_typing(function(){
		// On commence par vider et fermer la liste
		closeListSugg(true);

		if(!document.getElementById(my_id) || !document.getElementById(my_id).value){
			return false;
		}

		currentFocusListSugg = -1; // index de sélection par défaut

		$.ajax({
			url: 'https://www.cybevasion.fr/ajax/search_dest_v2.php?langue=' + my_lang + '&id=' + my_id + '&mots_cles=' + $('#' + my_id).val() + '&cities_only=' + cities_only + '&france_only=' + france_only + '&form_id_autosubmit=' + form_id_autosubmit + '&section_site=' + section_site + '&with_cp=' + with_cp + '&with_currency=' + with_currency + '&with_licence=' + with_licence + '&with_desc_etr=' + with_desc_etr + '&as=1' + param_suppl,
			crossDomain : true,
			dataType: 'script',
			cache: true
		});
	
		var div_list = document.getElementById('mots_cles_destination_sugg');
		if(div_list){
			div_list.style.display = 'block';
		}
	}, 300, 0);

	// À chaque appel de cette fonction, on réinitialise des données du formulaire
	document.getElementById('type_lieu').name='';
	document.getElementById('type_lieu').value='';

	if(document.getElementById('lat_lon_centre') != null){
		// document.getElementById('lat_lon_centre').remove(); // n'existe pas pour IE11

		var lat_lon_centre = document.getElementById('lat_lon_centre');
		lat_lon_centre.parentNode.removeChild(lat_lon_centre);
	}
}

function init_events_list_sugg(my_id){
	if(document.getElementById(my_id)){
		document.getElementById(my_id).addEventListener('keydown', function(e) {
			var div_items = document.querySelectorAll('#mots_cles_destination_sugg .item_can_be_selected');

			if(!div_items){
				return false;
			}

			if(e.keyCode == 40){ // Flèche DOWN
				currentFocusListSugg++;
				addActiveSugg(div_items);

			} else if(e.keyCode == 38){ // Flèche UP
				currentFocusListSugg--;
				addActiveSugg(div_items);

			} else if(e.keyCode == 13){ // Touche ENTRÉE
				e.preventDefault();

				if(currentFocusListSugg > -1 && div_items[currentFocusListSugg]){
					selectItemSugg(div_items[currentFocusListSugg]);
				}
			}
		});

		// Sur l'événement "clic", on réaffiche la liste si elle contient des suggestions
		document.getElementById(my_id).addEventListener('click', function(e){
			var div_list = document.getElementById('mots_cles_destination_sugg');

			if(div_list && div_list.childNodes.length){
				div_list.style.display = 'block';
			}
		});

		// Les événements sont initialisés
		is_init_list_sugg = true;
	}
}

// Permet de sélectionner un élément
function addActiveSugg(div_items) {
	// On commence par désélectionner les éléments actifs
	removeActiveSugg(div_items);

	// Si besoin, on corrige l'index de sélection
	if(currentFocusListSugg >= div_items.length){
		currentFocusListSugg = 0;
	}
	if(currentFocusListSugg < 0){
		currentFocusListSugg = (div_items.length - 1);
	}

	// Enfin, on sélectionne l'item concerné
	if(div_items[currentFocusListSugg]){
		div_items[currentFocusListSugg].classList.add('autocomplete-active');
	}
}

// Permet de désélectionner tous les éléments actifs (normalement, il n'y en a qu'un seul...)
function removeActiveSugg(div_items) {
	for(var i=0; i<div_items.length; i++){
		if(div_items[i]){
			div_items[i].classList.remove('autocomplete-active');
		}
	}
}

// Permet de récupérer la valeur de l'élément sélectionné (clic ou Entrée)
function selectItemSugg(elem){
	var json_data = '';
	if(elem.dataset !== undefined){
		json_data = elem.dataset.action_data; // standard approach
	} else {
		json_data = elem.getAttribute('data-action_data'); // old browser
	}

	json_data = JSON.parse(decodeURIComponent(json_data));

	for(var i in json_data){
		if(typeof json_data[i].id != 'undefined' && document.getElementById(json_data[i].id)){
			if(typeof json_data[i].name != 'undefined'){
				document.getElementById(json_data[i].id).name = json_data[i].name;
			}
			if(typeof json_data[i].value != 'undefined'){
				document.getElementById(json_data[i].id).value = json_data[i].value;
			}
			if(typeof json_data[i].show != 'undefined'){
				if(json_data[i].show=='1'){
					$('#' + json_data[i].id).show();
				}else{
					$('#' + json_data[i].id).hide();
				}
			}
			if(typeof json_data[i].html != 'undefined'){
				document.getElementById(json_data[i].id).innerHTML = json_data[i].html;
			}
			if(typeof json_data[i].placeholder != 'undefined'){
				document.getElementById(json_data[i].id).placeholder = json_data[i].placeholder;
			}
		}
	}
	
	// puis on vide et ferme la liste 
	closeListSugg(true);

	document.getElementById('mots_cles_destination').blur();
	// document.activeElement.blur();
}

// Vide le contenu de la liste de suggestions
function closeListSugg(vider_liste){
	vider_liste = (typeof vider_liste == 'undefined') ? false : vider_liste;

	var div_list = document.getElementById('mots_cles_destination_sugg');

	if(vider_liste){
		while(div_list.firstChild){
			div_list.removeChild(div_list.firstChild);
		}
	}

	if(div_list){
		div_list.style.display = 'none';
	}
}

/* Fin du moteur de suggestions */

// moteur de recherche des listes de favoris
function verif_form_favoris(my_form_id){
	var is_ok = true;

	if($('#date_arrivee_m').val()=='' && $('#date_depart_m').val()==''){
		// ok
		location.href = document.getElementById(my_form_id).getAttribute('action');
		return;

		// sinon si l'un des deux est vide mais pas l'autre => alerte
	} else if($('#date_arrivee_m').val()=='' || $('#date_depart_m').val()==''){
		confirmJquery(alert_date, 'Ok');
		is_ok = false;
	}

	if(is_ok){
		$('body').addClass('loading');

		if(is_touchScreen()){
			setInterval(function(){
				$('body.loading .modal').click(function(){
					$('body').removeClass('loading');
				});
			}, 5000);
		}

		document.getElementById(my_form_id).submit();
	}
}

$(window).load(function(){
	/* Au chargement de la page, il est possible de sélectionner une date de départ inférieure à la date d'arrivée. Ici, on empêche ce comportement en initialisant 'date_depart' correctement */
	var tab_init_date_depart = [
		{arr: '#date_arrivee_m', dep: '#date_depart_m'}, 
		{arr: '.date_arrivee_resa', dep: '.date_depart_resa'}, 
		{arr: '#date_arrivee', dep: '#date_depart'}
	];
	for(var i in tab_init_date_depart){
		if($(tab_init_date_depart[i].arr).val() != ''){
			var dt1 = $(tab_init_date_depart[i].arr).datepicker('getDate');
			var min_dt2 = new Date(dt1);
			min_dt2.setDate(min_dt2.getDate() + 1);
			$(tab_init_date_depart[i].dep).datepicker('option', 'minDate', min_dt2);
		}
	}

	// Certains "input" affichent une petite croix pour effacer leur contenu
	$('.with_clear_button').change(function(){
		if($(this).val() == ''){
			$(this).next('.clear_button').hide();
		} else {
			$(this).next('.clear_button').show();
		}
	});
	$('.clear_button').click(function(){
		var input = $(this).prev('.input_calendar');
		input.val('');
		input.focus();
		input.change();
	});
});

/* Corrections du comportement d'iOS */

$(window).load(function(){
	// Désactive le placement automatique du datepicker -> on veut qu'il soit placé en dessous de l'input (avec envoi de l'événement 'focusDatePicker')
	$('.input_calendar').datepicker('option', 'autoPosition', false);
	// Désactive l'envoi d'événement 'focus' à chaque action sur le datepicker (iOS centre l'input à chaque événement 'focus')
	$('.input_calendar').datepicker('option', 'shouldFocus', false);

	// Permet d'éviter le bug suivant : 
	// 1- à chaque événement "focus", iOS recentre l'input au milieu de la page --> ici, on déplace la page pour que le calendrier ait suffisamment de place pour s'afficher
	$('.input_calendar').on('focusDatePicker', function(e){
		var height_viewport = $(window).height(); // Hauteur de la fenêtre d'affichage (partie visible)
		var height_datepicker = $('#ui-datepicker-div').height(); // Hauteur du datepicker
		height_datepicker = (height_datepicker > 275) ? height_datepicker : 275; // Hauteur mini du datepicker : 275px
		var pos_top_doc = document.body.getBoundingClientRect().top; // Position absolue du doc (si on a faire descendre la page, on obtient une valeur négative)
		var pos_top_input = this.getBoundingClientRect().top; // Position de l'input sur la partie visible de la page
		var height_input = $(this).height(); // Position de l'input sur la partie visible de la page

		// Si la position de l'input + la hauteur du datepicker ne passent pas dans la fenêtre d'affichage => on déplace la page (hauteur de la page cachée + position de l'input)
		if((height_datepicker + pos_top_input + height_input + 10) > height_viewport){
			$('html, body').animate({ scrollTop: (Math.abs(pos_top_doc) + Math.abs(height_viewport - (height_datepicker + pos_top_input + height_input)) + 10) }, 400);
		} else {
			$('html, body').animate({ scrollTop: Math.abs(pos_top_doc) }, 400);
		}
	});

	if(is_iOS()){
		// iOS effectue un zoom de la page pour tous les "input:focus" qui ont un "font-size" inférieur à "16px"
		// ici, on applique la classe "focus-font-size" qui restaure la propriété "font-size: 16px;"
		function addClassFocusFontSize(e){
			$(e.target).addClass('focus-font-size');
		}
		function removeClassFocusFontSize(e){
			$(e.target).removeClass('focus-font-size');
		}

		// Mise en place des listeners pour corriger le comportement d'iOS (zoom auto si font-size inférieure 16px)
		$('body').on('touchstart mousedown', 'input, textarea, select', addClassFocusFontSize);
		$('body').on('focus blur touchend mouseup', 'input, textarea, select', removeClassFocusFontSize);

		// Quand le DOM est modifié (insertion de nouveaux éléments), on supprime les listeners et on en créé des nouveaux
		document.addEventListener('DOMNodeInserted', function(e) {
			$('body').off('touchstart mousedown', 'input, textarea, select', addClassFocusFontSize);
			$('body').off('focus blur touchend mouseup', 'input, textarea, select', removeClassFocusFontSize);

			$('body').on('touchstart mousedown', 'input, textarea, select', addClassFocusFontSize);
			$('body').on('focus blur touchend mouseup', 'input, textarea, select', removeClassFocusFontSize);
		}, false);
	}
});

/* Fin des corrections du comportement d'iOS */

/* Pour la géolocalisation */
if(document.querySelectorAll('.geolocation_button').length > 0){
	window.addEventListener('load', function(){
		$('.geolocation_button').click(getPosition);
	});
	function getPosition(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(positionSuccess, postionError, {enableHighAccuracy: true}); // {timeout: 60, enableHighAccuracy: true, maximumAge: Infinity}
		}
	}
	function positionSuccess(position){
		document.getElementById('mots_cles_destination').value = autour_de_moi;
		document.getElementById('type_lieu').name = 'lat_lon_centre';
		document.getElementById('type_lieu').value = position.coords.latitude.toFixed(6) + ',' + position.coords.longitude.toFixed(6) + ',' + position.coords.accuracy.toFixed(0);

		var geolocation = document.getElementById('geolocation');
		if(geolocation == null){
			var new_input = createElement('input', 'id=geolocation', 'type=hidden', 'name=geolocation', 'value=1');
			document.getElementsByTagName('form')[0].appendChild(new_input);
		}

		$.ajax({
			url: 'https://www.cybevasion.fr/ajax/search_dest_v2.php?langue=fr&id=mots_cles_destination&mots_cles=' + autour_de_moi + '&geolocation=1&lat_lon_centre=' + position.coords.latitude.toFixed(6) + ',' + position.coords.longitude.toFixed(6) + ',' + position.coords.accuracy.toFixed(0),
			crossDomain : true,
			dataType: 'script',
			cache: true
		});
	}
	function postionError(position){
		console.log(position);
	}
}