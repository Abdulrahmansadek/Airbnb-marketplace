// Affiche la fenêtre modale permettant de partager une liste de favoris (copier le lien + partage par email)
function partager_liste_favoris(e, url, id_liste, token){
	e.preventDefault();
	e.stopPropagation();

	id_liste = (typeof id_liste != 'undefined' ? id_liste : 0);
	token = (typeof token != 'undefined' ? token : '');

	var html = '';
	html += '<div class="overlayModal">';
	html += '<div class="containerModal_1">';
	html += '<div class="containerModal_2">';

	html += '<img src="/lib3/svg/close.svg" style="position: absolute;top: 2px;right: 2px;cursor: pointer;" onclick="$(this).parents(\'.overlayModal\')[0].remove();">';

	html += '<span class="titre_page">'+dico['partager_cette_liste_favoris']+'</span>';
	html += '<br>';
	html += '<br>';

	if(id_liste>0 && token!=''){
		html += '<br>';
		html += '<div class="liste_items_partage_liste">';
	
		html += '<a class="item_partage_liste partage_mail" href="#" onclick="$(this).parents(\'.overlayModal\')[0].remove();creation_modale_partage_mail(event, '+id_liste+', \''+token+'\');">';
		html += '<img src="/lib3/svg/social/mail_o.svg" alt="'+dico['partager_par_mail']+'" width="32" style="height: 100%;margin-right: 5px;">';
		html += '<span>'+dico['partager_par_mail']+'</span>';
		html += '</a>';

		// + partage par Messenger

		html += '</div>'; // Fin de .liste_items_partage_liste
		html += '<br>';
	}

	html += '<div class="item_partage_liste">';
	html += '<input id="lienPartageFavoris" type="text" value="'+url+'" style="width: 300px;margin-right: 5px;">';
	html += '<input type="button" class="button-orange" value="'+dico['copier_lien']+'" onclick="var r = copyToClipboard(\'lienPartageFavoris\');if(r){$(this).removeClass(\'button-orange\');$(this).addClass(\'button-vert-v2\');$(this).val(\''+dico['lien_copie']+'\');var this_ = this;setTimeout(function(){$(this_).removeClass(\'button-vert-v2\');$(this_).addClass(\'button-orange\');$(this_).val(\''+dico['copier_lien']+'\');}, 3000);}return false;" style="padding: 7px;border-radius: 3px;cursor: pointer;">';
	html += '</div>';

	html += '</div>'; // Fin de .containerModal_2
	html += '</div>'; // Fin de .containerModal_1
	html += '</div>'; // Fin de .overlayModal

	$('body').append(html);
}

// Affiche la fenêtre modale permettant de créer une liste (demande le nom de la nouvelle liste)
// id_annonce et is_hot sont des paramètres optionnels
function creation_modale_ajout_liste(e, id_annonce, is_hot, reload){
	id_annonce = ((typeof id_annonce != 'undefined') ? id_annonce : 0);
	is_hot = ((typeof is_hot != 'undefined') ? is_hot : false);
	reload = ((typeof reload != 'undefined') ? reload : true);
	
	var html = '';
	html += '<div class="overlayModal">';
	html += '<div class="containerModal_1">';
	html += '<div class="containerModal_2">';

	html += '<img src="/lib3/svg/close.svg" style="position: absolute;top: 2px;right: 2px;cursor: pointer;" onclick="$(this).parents(\'.overlayModal\')[0].remove();">';

	html += '<b>'+dico['creer_nouvelle_liste_favoris']+'</b>';
	html += '<br>';
	html += '<br>';
	html += '<input type="text" name="creation_nom_liste" placeholder="'+dico['nom_nouvelle_liste']+'" autocomplete="'+(new Date()).getTime()+'" autofocus style="width: 300px;">';

	html += '<div style="margin-top: 30px;text-align: center;">';
	html += '<input type="button" class="button-orange" value="'+dico['creer_liste']+'" onclick="creer_liste(event, '+id_annonce+', '+is_hot+', '+reload+');$(this).parents(\'.overlayModal\')[0].remove();">';
	html += '</div>';

	html += '</div>'; // Fin de .containerModal_2
	html += '</div>'; // Fin de .containerModal_1
	html += '</div>'; // Fin de .overlayModal

	$('body').append(html);
}

// Affiche la fenêtre modale permettant d'ajouter l'annonce courante à une liste (toutes les listes de l'utilisateur sont affichées ; s'il le souhaite, il peut en créer une nouvelle)
function creation_modale_toutes_listes(e, id_annonce, is_hot, reload){
	e.preventDefault();
	e.stopPropagation();

	reload = ((typeof reload != 'undefined') ? reload : true);

	$.ajax({
		method: 'POST',
		url: '/ajax/gestion_favoris.php',
		data: {
			action: 'listes'
		}
	}).done(function(json) {
		// Si aucune liste, on propose immédiatement de créer une nouvelle liste
		if(json.nb_listes == 0){
			creation_modale_ajout_liste(event, id_annonce, is_hot, reload);

		} else {
			var html = '';
			html += '<div class="overlayModal">';
			html += '<div class="containerModal_1">';
			html += '<div class="containerModal_2">';

			html += '<img src="/lib3/svg/close.svg" style="position: absolute;top: 2px;right: 2px;cursor: pointer;" onclick="$(this).parents(\'.overlayModal\')[0].remove();">';

			html += '<b>'+dico['ajouter_annonce_liste_favoris']+'</b>';
			html += '<br>';
			html += '<br>';

			for(var i in json.listes){
				var liste = json.listes[i];
				html += '<div class="liste_favoris_item" onclick="ajout_ann_liste(event, '+liste.id_liste+', \''+liste.token+'\', '+id_annonce+', '+is_hot+', '+reload+');$(this).parents(\'.overlayModal\')[0].remove();">';
				html += liste.nom_liste;
				html += '</div>'; // Fin de .liste_favoris
			}

			html += '<br>';
			html += '<br>';

			html += '<div class="liste_favoris_item" onclick="$(this).parents(\'.overlayModal\')[0].remove();creation_modale_ajout_liste(event, '+id_annonce+', '+is_hot+', '+reload+');">';
			html += '<div class="rond_plus_mini"><img src="/lib3/svg/adherents/plus_w.svg" width="10" height="10"></div>';
			html += '<span class="label_creer_liste">'+dico['creer_nouvelle_liste']+'</span>';
			html += '</div>'; // Fin de .liste_favoris
			
			html += '</div>'; // Fin de .containerModal_2
			html += '</div>'; // Fin de .containerModal_1
			html += '</div>'; // Fin de .overlayModal

			$('body').append(html);
		}
	});
}

// Requête Ajax pour créer une liste (déjà nommée) + éventuellement y ajouter une annonce
function creer_liste(e, id_annonce, is_hot, reload){
	reload = ((typeof reload != 'undefined') ? reload : true);

	var val_new_liste = $('input[name=creation_nom_liste]').val();
	
	// if(val_new_liste != ''){
		var data = {};
		data.action = 'ajout';
		data.nom_liste = val_new_liste;
		
		// si besoin d'ajouter une annonce immédiatement à la nouvelle liste
		if(typeof id_annonce != 'undefined' && id_annonce>0 && typeof is_hot != 'undefined'){
			if(is_hot){
				data.id_hotel = id_annonce;
			} else {
				data.id_annonce = id_annonce;
			}
		}

		$.ajax({
			method: 'POST',
			url: '/ajax/gestion_favoris.php',
			data: data
		}).done(function(json) {
			if(json.val){
				if(reload){
					location.reload();
				} else if(typeof json.toggle_coeur != 'undefined' && json.toggle_coeur){
					$('.imgAddFavoris_'+id_annonce).toggle();
					$('.imgDeleteFavoris_'+id_annonce).toggle();
				}
			} else {
				confirmJquery('Une erreur est survenue, merci de réessayer.', 'Ok');
			}
		});
	// } else {
	// 	confirmJquery(dico['nom_liste_obligatoire'], 'Ok');
	// }
}

// Requête Ajax pour ajouter l'annonce à une liste spécifique
function ajout_ann_liste(e, id_liste, token, id_annonce, is_hot, reload){
	reload = ((typeof reload != 'undefined') ? reload : true);

	var data = {};
	data.action = 'ajout';
	data.id_liste = id_liste;
	data.token = token;
	if(is_hot){
		data.id_hotel = id_annonce;
	} else {
		data.id_annonce = id_annonce;
	}
	
	$.ajax({
		method: 'POST',
		url: '/ajax/gestion_favoris.php',
		data: data
	}).done(function(json) {
		if(json.val){
			if(typeof json.action != 'undefined'){
				for(var obj of json.action){
					if(typeof obj.type != 'undefined' && obj.type == 'ajax'){
						if(typeof obj.url != 'undefined'){
							$.ajax({
								method: obj.method,
								url: obj.url,
								data: obj.data,
								async: false,
								xhrFields: {
									withCredentials: true
								}
							});
						}
					}
				}
			}

			if(reload){
				location.reload();
			} else if(typeof json.toggle_coeur != 'undefined' && json.toggle_coeur){
				$('.imgAddFavoris_'+id_annonce).toggle();
				$('.imgDeleteFavoris_'+id_annonce).toggle();
			}
		} else {
			confirmJquery('Une erreur est survenue, merci de réessayer.', 'Ok');
		}
	});
}

// Requête Ajax pour supprimer l'annonce de toutes les listes de l'utilisateur
function suppr_ann_listes(e, id_annonce, is_hot, reload){
	e.preventDefault();
	e.stopPropagation();

	reload = ((typeof reload != 'undefined') ? reload : true);

	var data = {};
	data.action = 'suppr_ann';
	if(is_hot){
		data.id_hotel = id_annonce;
	} else {
		data.id_annonce = id_annonce;
	}
	
	$.ajax({
		method: 'POST',
		url: '/ajax/gestion_favoris.php',
		data: data
	}).done(function(json) {
		if(json.val){
			if(reload){
				location.reload();
			} else if(typeof json.toggle_coeur != 'undefined' && json.toggle_coeur){
				$('.imgAddFavoris_'+id_annonce).toggle();
				$('.imgDeleteFavoris_'+id_annonce).toggle();
			}
		} else {
			confirmJquery('Une erreur est survenue, merci de réessayer.', 'Ok');
		}
	});
}

// Affiche la fenêtre de confirmation permettant de supprimer une liste (puis appel ajax pour supprimer la liste si clic sur "oui")
function supprimer_liste_favoris(e, id_liste, token){
	e.preventDefault();
	e.stopPropagation();

	var html = '';
	html += '<div class="overlayModal">';
	html += '<div class="containerModal_1">';
	html += '<div class="containerModal_2">';

	html += '<img src="/lib3/svg/close.svg" style="position: absolute;top: 2px;right: 2px;cursor: pointer;" onclick="$(this).parents(\'.overlayModal\')[0].remove();">';

	html += '<b>'+dico['q_suppr_liste_favoris']+'</b>';
	html += '<br>';
	html += '<br>';
	html += '<div style="margin-top: 15px;text-align: center;">';
	html += '<input type="button" class="button-gris-v2" value="'+dico['oui']+'" style="cursor: pointer;padding: 7px 15px;text-transform: capitalize;" onclick="$.ajax({method:\'POST\',url:\'/ajax/gestion_favoris.php\',data:{action:\'suppr_liste\',id_liste:'+id_liste+',token:\''+token+'\'}}).done(function(json){location.reload();});">';
	html += '<input type="button" class="button-orange" value="'+dico['non']+'" style="cursor: pointer;margin-left: 20px;padding: 7px 15px;text-transform: capitalize;" onclick="$(this).parents(\'.overlayModal\')[0].remove();">';
	html += '</div>';

	html += '</div>'; // Fin de .containerModal_2
	html += '</div>'; // Fin de .containerModal_1
	html += '</div>'; // Fin de .overlayModal

	$('body').append(html);
}

// Requête Ajax pour modifier le nom d'une liste
function modif_nom_liste(e, id_liste, token, nouveau_nom){
	e.preventDefault();
	e.stopPropagation();

	var data = {};
	data.action = 'modif_nom_liste';
	data.id_liste = id_liste;
	data.token = token;
	data.nouveau_nom = nouveau_nom;
	
	$.ajax({
		method: 'POST',
		url: '/ajax/gestion_favoris.php',
		data: data
	}).done(function(json) {
		// if(json.val){
		// 	// ...
		// } else {
		// 	confirmJquery('Une erreur est survenue, merci de réessayer.', 'Ok');
		// }
	});
}

// Pour envoyer la liste par email entre l'utilisateur et son destinataire
function send_form_partage_liste(){
	if($('input[name=nom_prenom]').val()=='' || $('input[name=mail_sender]').val()==''){
		confirmJquery(dico['coordonnees_obligatoire'], 'Ok');
		return false;
	}
	if($('input[name=mail_recipient]').val()==''){
		confirmJquery(dico['adresse_mail_obligatoire'], 'Ok');
		return false;
	}

	var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
	if($('input[name=mail_sender]').val().search(emailRegex) == -1 || $('input[name=mail_recipient]').val().search(emailRegex) == -1){
		confirmJquery(alert_email_valide, 'Ok');
		return false;
	}

	$.ajax({
		method: 'POST',
		url: '/ajax/partage_liste_mail.php',
		data: $('#form_partage_liste').serializeArray()
	}).done(function(json){
		console.log(json);
		if(json.retour){
			$('.overlayModal')[0].remove();
			$('#retour_partage').html(dico['confirm_liste_favoris_partagee']);
			setTimeout(function(){
				$('#retour_partage').show('slow');
			}, 500);
		} else {
			confirmJquery(dico['erreur_liste_non_partagee'] + "\r\n\r\n" + json.msg, 'Ok');
		}
	});
}

// Affiche la fenêtre modale permettant de partager par e-mail
function creation_modale_partage_mail(e, id_liste, token){		
	var html = '';
	html += '<div class="overlayModal">';
	html += '<div class="containerModal_1">';
	html += '<div class="containerModal_2">';

	html += '<img src="/lib3/svg/close.svg" style="position: absolute;top: 2px;right: 2px;cursor: pointer;" onclick="$(this).parents(\'.overlayModal\')[0].remove();">';

	html += '<div class="modale_partage_mail">';

	html += '<span class="titre_page">'+dico['partagez_liste_mail']+'</span>';
	html += '<br>';
	html += '<br>';

	html += '<form id="form_partage_liste">';

	html += '<b>'+dico['vos_coordonnees']+'</b>';
	html += '<br>';
	html += '<input type="text" name="nom_prenom" placeholder="'+dico['vos_nom_prenom']+'" required>';
	html += ' ';
	html += '<input type="text" name="mail_sender" placeholder="'+dico['votre_mail']+'" required>';
	html += '<br>';
	html += '<br>';

	html += '<b>'+dico['mail_destinataire']+'</b>';
	html += '<br>';
	html += '<input type="text" name="mail_recipient" placeholder="'+dico['son_mail']+'" autocomplete="one-time-code" required>';
	html += '<br>';
	html += '<br>';

	html += '<b>'+dico['message_avec_liste']+'</b> ('+dico['facultatif']+')';
	html += '<br>';
	html += '<textarea name="message" placeholder="'+dico['votre_message']+'" style="width: 100%;min-width: 300px;max-width: 768px;height: 80px;min-height: 50px;"></textarea>';
	html += '<br>';
	html += '<br>';

	html += '<input type="hidden" name="id_liste" value="'+id_liste+'">';
	html += '<input type="hidden" name="token" value="'+token+'">';
	html += '<input type="hidden" name="langue" value="'+langue_js+'">';

	html += '<div style="margin-top: 20px;text-align: center;">';
	html += '<input type="button" class="button-orange" value="'+dico['envoyer']+'" onclick="send_form_partage_liste();">';
	html += '</div>';

	html += '</form>';

	html += '</div>'; // Fin de .modale_partage_mail

	html += '</div>'; // Fin de .containerModal_2
	html += '</div>'; // Fin de .containerModal_1
	html += '<style>';
	html += '	.modale_partage_mail input[type=text] {';
	html += '		width: 250px;';
	html += '	}';
	html += '</style>';
	html += '</div>'; // Fin de .overlayModal

	$('body').append(html);
}