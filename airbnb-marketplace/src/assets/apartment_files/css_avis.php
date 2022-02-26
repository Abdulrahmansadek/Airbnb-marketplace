
a.depot-avis{
	border-radius: 3px;
	display: inline-block;
	padding: 5px;
	text-decoration: none;
}
a.depot-avis:hover{
	color: #ffffff;
}

.div_review_disp_bloc{
	display: inline-block;
	vertical-align: top;
	margin-right: 30px;
	text-align: left;
}

.div_review_disp{
	height: 12px;
	width: 60px;
	background: url(/lib3/svg/avis/reviews_sprites.svg) no-repeat 0 0;
	background-size: cover;
	display: inline-block;
	margin-bottom: 4px;
	line-height: 30px;
	vertical-align: middle;
}
.review0 {background-position:0 0;}
.review5 {background-position:0 -12px;}
.review10 {background-position:0 -24px;}
.review15 {background-position:0 -36px;}
.review20 {background-position:0 -48px;}
.review25 {background-position:0 -60px;}
.review30 {background-position:0 -72px;}
.review35 {background-position:0 -84px;}
.review40 {background-position:0 -96px;}
.review45 {background-position:0 -108px;}
.review50 {background-position:0 -120px;}

.div_review{
	height: 16px;
	width: 160px;
	background:#ffffff url(/lib3/svg/avis/reviews_sprites_full.svg) no-repeat 0 0;
	background-size: cover;
	cursor: pointer;
}

.sreview0 {background-position:0 0;}
.sreview1 {background-position:0 -16px;}
.sreview2 {background-position:0 -32px;}
.sreview3 {background-position:0 -48px;}
.sreview4 {background-position:0 -64px;}
.sreview5 {background-position:0 -80px;}
.sreview6 {background-position:0 -96px;}
.sreview7 {background-position:0 -112px;}
.sreview8 {background-position:0 -128px;}
.sreview9 {background-position:0 -144px;}
.sreview10 {background-position:0 -160px;}

.table-set-avis td{
	padding: 7px;
}

.table-set-avis td:first-child{
	padding-right: 10px;
}

.table-infos-avis td{
	padding: 2px;
}

.table-infos-avis td:first-child{
	padding-right: 10px;
}

.table-infos-avis select{
	width: 150px;
}
.table-infos-avis input[type=text], .table-infos-avis input[type=email]{
	width: 250px;
}

.header_ann-haut-droite {
	/* position: absolute; */
	/* right: 5px; */
	float: right;
	z-index: 1;
}

a.badge-avis-annonce{
	/* position: absolute; */
	/* right: 5px; */
	float: right;
	padding: 5px;
	text-align: center;

	color: #ffffff;
	text-decoration: none;

	/*border: 1px solid #b26e1c;*/
	border-radius: 3px;

	/*background: #f68a1f;
	background: -moz-linear-gradient(top, #f4a52f 0%, #f68a1f 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f4a52f), color-stop(100%,#f68a1f));
	background: -webkit-linear-gradient(top, #f4a52f 0%,#f68a1f 100%);
	background: -o-linear-gradient(top, #f4a52f 0%,#f68a1f 100%);
	background: -ms-linear-gradient(top, #f4a52f 0%,#f68a1f 100%);
	background: linear-gradient(to bottom, #f4a52f 0%,#f68a1f 100%);*/
	border: 0;
	background: #FEA735;
	transition: all 0.2s;
}
a.badge-avis-annonce:hover{
	/*background: #f4a52f;
	background: -moz-linear-gradient(top, #f68a1f 0%, #f4a52f 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f68a1f), color-stop(100%,#f4a52f));
	background: -webkit-linear-gradient(top, #f68a1f 0%,#f4a52f 100%);
	background: -o-linear-gradient(top, #f68a1f 0%,#f4a52f 100%);
	background: -ms-linear-gradient(top, #f68a1f 0%,#f4a52f 100%);
	background: linear-gradient(to bottom, #f68a1f 0%,#f4a52f 100%);*/
	background: #7A7171;
}
a.badge-avis-annonce span{
	display: inline-block;
	font-size: 1.5em;
	font-weight: bold;
	vertical-align: middle;
	margin-top: -4px;
}

.bubble_arrows{
	height: 16px;
	width: 16px;
	background: url(/lib3/svg/avis/bubble_arrows2.svg) no-repeat 0 0;
	position: relative;
}

.bubble_arrows_post {
	float: left;
	left: -21px;
	background-position:0 0;
	margin-right: -20px;
}
.bubble_arrows_response {
	float: right;
	right: -21px;
	background-position:0 -16px;
	margin-left: -20px;
}
.drapeau_avis{
	/* border: 1px solid #d5d5d5; */
	margin-bottom: 2px;
	vertical-align: middle;
}
.annonce-avis-header-left{
	display: inline-block;
	width: 15%;
	vertical-align: middle;
}
.annonce-avis-header-center{
	display: inline-block;
	width: 75%;
	text-align: center;
	vertical-align: middle;
}
.annonce-avis-header-right{
	display: inline-block;
	width: 10%;
	text-align: center;
	vertical-align: middle;
	color: #F68A1F;
	font-weight: bold;
}
.annonce-avis-header-right img{
	vertical-align: top;
}

.annonce-avis-list-left{
	display: inline-block;
	width: 20%;
	vertical-align: top;
    padding-right: 15px;
    box-sizing: border-box;
}
.annonce-avis-list-center{
	display: inline-block;
	width: 80%;
	padding: 5px;
	vertical-align: top;
	border: 1px solid #c9c9cd;
	background-color: #ffffff;
	border-radius: 3px;
	box-sizing: border-box;
	text-align: justify;
}
.annonce-avis-list-txt{
	position: relative;
	display: inline-block;
	width: 90%;
	vertical-align: top;
}
.bottom_avis_long{
	position:absolute;
	bottom: 0;
	z-index:999;
	background: linear-gradient(transparent, #ffffff);
	height: 60px;
	width: 100%;
}
.titre-avis{
	/* color: #000088; */
	color: #F68A1F;
	font-size: 1.2em;
}
.annonce-avis-list-right{
	display: inline-block;
	width: 10%;
	text-align: center;
	font-weight: bold;
	color: #F68A1F;
}
.annonce-avis-list-right img{
	vertical-align: top;
}

#form_avis .input_range, #form_avis .slider_note {
	background: transparent;
	border-color: transparent;
	width: 100%;
	height: 100%;
	vertical-align: top;
	outline: none;
	opacity: 0;
	cursor: pointer;
}
#form_avis .slider_note > span {
	cursor: pointer !important;
}

@media screen and (max-width: 530px){
	.annonce-avis-list-center{
		position:relative;
	}
	.annonce-avis-list-txt{
		width: 100% !important;
		margin-top: 25px;
	}
	.annonce-avis-list-right{
		position: absolute;
		top: 5px;
		left: 5px;
		width:auto;
	}
	.annonce-avis-list-right .img_avis_et_fleche {
		position: absolute;
		top: 3px;
		left: 60px;
		width: 100%;
	}
	
	.annonce-avis-header-left{
		width: auto;
		display: block;
		text-align: center;
		margin-bottom: 10px;
	}
	.annonce-avis-header-center{
		width: auto;
	}
	.annonce-avis-header-right {
		display: block;
		width: 100%;
	}
	.annonce-avis-header-center .div_review_disp_bloc{
		display:block;
	}
	.header_ann-haut-droite {
		float: none;
		position: absolute;
		right: 5px;
		z-index: 1;
	}
}

/* IE gère mal les svg en background, on revient au format png */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
	.div_review_disp {
		background-image: url(/lib3/avis/reviews_sprites.png);
	}
	.div_review {
		background-image: url(/lib3/avis/reviews_sprites_full.png);
	}
	.bubble_arrows {
		background-image: url(/lib3/avis/bubble_arrows2.png);
	}
}