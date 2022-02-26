/* http://stephband.info/jquery.event.swipe/ */

// jquery.event.move
//
// 1.3.6
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.
(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else if((typeof module!=="undefined"&&module!==null)&&module.exports){module.exports=a}else{a(jQuery)}})(function(h,j){var k=6,add=h.event.add,remove=h.event.remove,trigger=function(a,b,c){h.event.trigger(b,c,a)},requestFrame=(function(){return(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a,b){return window.setTimeout(function(){a()},25)})})(),ignoreTags={textarea:true,input:true,select:true,button:true},mouseevents={move:'mousemove',cancel:'mouseup dragstart',end:'mouseup'},touchevents={move:'touchmove',cancel:'touchend',end:'touchend'};function Timer(c){var d=c,active=false,running=false;function trigger(a){if(active){d();requestFrame(trigger);running=true;active=false}else{running=false}}this.kick=function(a){active=true;if(!running){trigger()}};this.end=function(a){var b=d;if(!a){return}if(!running){a()}else{d=active?function(){b();a()}:a;active=true}}}function returnTrue(){return true}function returnFalse(){return false}function preventDefault(e){e.preventDefault()}function preventIgnoreTags(e){if(ignoreTags[e.target.tagName.toLowerCase()]){return}e.preventDefault()}function isLeftButton(e){return(e.which===1&&!e.ctrlKey&&!e.altKey)}function identifiedTouch(a,b){var i,l;if(a.identifiedTouch){return a.identifiedTouch(b)}i=-1;l=a.length;while(++i<l){if(a[i].identifier===b){return a[i]}}}function changedTouch(e,a){var b=identifiedTouch(e.changedTouches,a.identifier);if(!b){return}if(b.pageX===a.pageX&&b.pageY===a.pageY){return}return b}function mousedown(e){var a;if(!isLeftButton(e)){return}a={target:e.target,startX:e.pageX,startY:e.pageY,timeStamp:e.timeStamp};add(document,mouseevents.move,mousemove,a);add(document,mouseevents.cancel,mouseend,a)}function mousemove(e){var a=e.data;checkThreshold(e,a,e,removeMouse)}function mouseend(e){removeMouse()}function removeMouse(){remove(document,mouseevents.move,mousemove);remove(document,mouseevents.cancel,mouseend)}function touchstart(e){var a,template;if(ignoreTags[e.target.tagName.toLowerCase()]){return}a=e.changedTouches[0];template={target:a.target,startX:a.pageX,startY:a.pageY,timeStamp:e.timeStamp,identifier:a.identifier};add(document,touchevents.move+'.'+a.identifier,touchmove,template);add(document,touchevents.cancel+'.'+a.identifier,touchend,template)}function touchmove(e){var a=e.data,touch=changedTouch(e,a);if(!touch){return}checkThreshold(e,a,touch,removeTouch)}function touchend(e){var a=e.data,touch=identifiedTouch(e.changedTouches,a.identifier);if(!touch){return}removeTouch(a.identifier)}function removeTouch(a){remove(document,'.'+a,touchmove);remove(document,'.'+a,touchend)}function checkThreshold(e,a,b,c){var d=b.pageX-a.startX,distY=b.pageY-a.startY;if((d*d)+(distY*distY)<(k*k)){return}triggerStart(e,a,b,d,distY,c)}function handled(){this._handled=returnTrue;return false}function flagAsHandled(e){e._handled()}function triggerStart(e,a,b,c,d,f){var g=a.target,touches,time;touches=e.targetTouches;time=e.timeStamp-a.timeStamp;a.type='movestart';a.distX=c;a.distY=d;a.deltaX=c;a.deltaY=d;a.pageX=b.pageX;a.pageY=b.pageY;a.velocityX=c/time;a.velocityY=d/time;a.targetTouches=touches;a.finger=touches?touches.length:1;a._handled=handled;a._preventTouchmoveDefault=function(){e.preventDefault()};trigger(a.target,a);f(a.identifier)}function activeMousemove(e){var a=e.data.timer;e.data.touch=e;e.data.timeStamp=e.timeStamp;a.kick()}function activeMouseend(e){var a=e.data.event,timer=e.data.timer;removeActiveMouse();endEvent(a,timer,function(){setTimeout(function(){remove(a.target,'click',returnFalse)},0)})}function removeActiveMouse(a){remove(document,mouseevents.move,activeMousemove);remove(document,mouseevents.end,activeMouseend)}function activeTouchmove(e){var a=e.data.event,timer=e.data.timer,touch=changedTouch(e,a);if(!touch){return}e.preventDefault();a.targetTouches=e.targetTouches;e.data.touch=touch;e.data.timeStamp=e.timeStamp;timer.kick()}function activeTouchend(e){var a=e.data.event,timer=e.data.timer,touch=identifiedTouch(e.changedTouches,a.identifier);if(!touch){return}removeActiveTouch(a);endEvent(a,timer)}function removeActiveTouch(a){remove(document,'.'+a.identifier,activeTouchmove);remove(document,'.'+a.identifier,activeTouchend)}function updateEvent(a,b,c,d){var e=c-a.timeStamp;a.type='move';a.distX=b.pageX-a.startX;a.distY=b.pageY-a.startY;a.deltaX=b.pageX-a.pageX;a.deltaY=b.pageY-a.pageY;a.velocityX=0.3*a.velocityX+0.7*a.deltaX/e;a.velocityY=0.3*a.velocityY+0.7*a.deltaY/e;a.pageX=b.pageX;a.pageY=b.pageY}function endEvent(a,b,c){b.end(function(){a.type='moveend';trigger(a.target,a);return c&&c()})}function setup(a,b,c){add(this,'movestart.move',flagAsHandled);return true}function teardown(a){remove(this,'dragstart drag',preventDefault);remove(this,'mousedown touchstart',preventIgnoreTags);remove(this,'movestart',flagAsHandled);return true}function addMethod(a){if(a.namespace==="move"||a.namespace==="moveend"){return}add(this,'dragstart.'+a.guid+' drag.'+a.guid,preventDefault,j,a.selector);add(this,'mousedown.'+a.guid,preventIgnoreTags,j,a.selector)}function removeMethod(a){if(a.namespace==="move"||a.namespace==="moveend"){return}remove(this,'dragstart.'+a.guid+' drag.'+a.guid);remove(this,'mousedown.'+a.guid)}h.event.special.movestart={setup:setup,teardown:teardown,add:addMethod,remove:removeMethod,_default:function(e){var b,data;if(!e._handled()){return}function update(a){updateEvent(b,data.touch,data.timeStamp);trigger(e.target,b)}b={target:e.target,startX:e.startX,startY:e.startY,pageX:e.pageX,pageY:e.pageY,distX:e.distX,distY:e.distY,deltaX:e.deltaX,deltaY:e.deltaY,velocityX:e.velocityX,velocityY:e.velocityY,timeStamp:e.timeStamp,identifier:e.identifier,targetTouches:e.targetTouches,finger:e.finger};data={event:b,timer:new Timer(update),touch:j,timeStamp:j};if(e.identifier===j){add(e.target,'click',returnFalse);add(document,mouseevents.move,activeMousemove,data);add(document,mouseevents.end,activeMouseend,data)}else{e._preventTouchmoveDefault();add(document,touchevents.move+'.'+e.identifier,activeTouchmove,data);add(document,touchevents.end+'.'+e.identifier,activeTouchend,data)}}};h.event.special.move={setup:function(){add(this,'movestart.move',h.noop)},teardown:function(){remove(this,'movestart.move',h.noop)}};h.event.special.moveend={setup:function(){add(this,'movestart.moveend',h.noop)},teardown:function(){remove(this,'movestart.moveend',h.noop)}};add(document,'mousedown.move',mousedown);add(document,'touchstart.move',touchstart);if(typeof Array.prototype.indexOf==='function'){(function(a,b){var c=["changedTouches","targetTouches"],l=c.length;while(l--){if(a.event.props.indexOf(c[l])===-1){a.event.props.push(c[l])}}})(h)}});

// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold || par défaut : 0.4
// jQuery.event.special.swipe.settings.sensitivity || par défaut : 6
(function(a){if(typeof define==='function'&&define.amd){define(['jquery',undefined,'jquery.event.move'],a)}else if((typeof module!=="undefined"&&module!==null)&&module.exports){module.exports=a}else{a(jQuery)}})(function(d,f){var g=d.event.add,remove=d.event.remove,trigger=function(a,b,c){d.event.trigger(b,c,a)},settings={threshold:0.2,sensitivity:6};function moveend(e){var w,h,event;w=e.currentTarget.offsetWidth;h=e.currentTarget.offsetHeight;event={distX:e.distX,distY:e.distY,velocityX:e.velocityX,velocityY:e.velocityY,finger:e.finger};if(e.distX>e.distY){if(e.distX>-e.distY){if(e.distX/w>settings.threshold||e.velocityX*e.distX/w*settings.sensitivity>1){event.type='swiperight';trigger(e.currentTarget,event)}}else{if(-e.distY/h>settings.threshold||e.velocityY*e.distY/w*settings.sensitivity>1){event.type='swipeup';trigger(e.currentTarget,event)}}}else{if(e.distX>-e.distY){if(e.distY/h>settings.threshold||e.velocityY*e.distY/w*settings.sensitivity>1){event.type='swipedown';trigger(e.currentTarget,event)}}else{if(-e.distX/w>settings.threshold||e.velocityX*e.distX/w*settings.sensitivity>1){event.type='swipeleft';trigger(e.currentTarget,event)}}}}function getData(a){var b=d.data(a,'event_swipe');if(!b){b={count:0};d.data(a,'event_swipe',b)}return b}d.event.special.swipe=d.event.special.swipeleft=d.event.special.swiperight=d.event.special.swipeup=d.event.special.swipedown={setup:function(a,b,c){var a=getData(this);if(a.count++>0){return}g(this,'moveend',moveend);return true},teardown:function(){var a=getData(this);if(--a.count>0){return}remove(this,'moveend',moveend);return true},settings:settings}});

/**
 * Permet de mettre en place des événements swipe
 * Paramètres : 
 * - conteneur : le bloc parent qui contient tous les éléments (sélecteur css)
 * - action_left : sélecteur css de l'éléement sur lequel il faut cliquer (dans le cas d'un swipe gauche-droite)
 * - action_right : sélecteur css de l'éléement sur lequel il faut cliquer (dans le cas d'un swipe droite-gauche)
 * 
 * Lorsque l'événement swipe est appelé, le système recherche l'élément correspondant au sélecteur "action_[left|right]"
 * Si aucun élément n'est trouvé dans la descendance de "conteneur", le système recherche parmi les éléments parents (1er niveau)
 * Si toujours aucun élément n'est trouvé, le système recherche parmi les éléments parents (2ème niveau)
 */
function init_swipe(conteneur, action_left, action_right){
	$(conteneur).each(function(){
		$(this).on('swipeleft', function(e) {
			var element = $(this);
			var fleches_droites = $(element).find(action_right);
			if(fleches_droites.length > 0){
				$(fleches_droites).click();
			} else {
				fleches_droites = $(element).parent().find(action_right);
				if(fleches_droites.length > 0){
					$(fleches_droites).click();
				} else {
					fleches_droites = $(element).parent().parent().find(action_right);
					if(fleches_droites.length > 0){
						$(fleches_droites).click();
					}
				}
			}
		});
		$(this).on('swiperight', function(e) {
			var element = $(this);
			var fleches_gauches = $(element).find(action_left);
			if(fleches_gauches.length > 0){
				$(fleches_gauches).click();
			} else {
				fleches_gauches = $(element).parent().find(action_left);
				if(fleches_gauches.length > 0){
					$(fleches_gauches).click();
				} else {
					fleches_gauches = $(element).parent().parent().find(action_left);
					if(fleches_gauches.length > 0){
						$(fleches_gauches).click();
					}
				}
			}
		});
		$(this).on('movestart', function(e) {
			// Scroll vertical autorisé
			if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
				e.preventDefault();
			}
		});
	});
}