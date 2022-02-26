jQuery.fn.toggleText = function (value1, value2) {
	return this.each(function(){
		var $this = $(this), text = $this.text();
 
		if (text.indexOf(value1) > -1){
			$this.text(text.replace(value1, value2));
		}else{
			$this.text(text.replace(value2, value1));
		}
	});
};

jQuery.fn.toggleSrc = function (value1, value2) {
	return this.each(function(){
		var $this = $(this), mylink = $this.attr('src');

		if (mylink.indexOf(value1) > -1){
			var new_url = mylink.replace(value1, value2);
			$this.attr('src', new_url);
		}else{
			var new_url = mylink.replace(value2, value1);
			$this.attr('src', new_url);
		}
	});
};
