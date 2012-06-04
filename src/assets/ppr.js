(function(win) {
	
	var eachOnclick = document.querySelectorAll ? 
		function(parent, className, onclick) {
			var els = parent.querySelectorAll('.' + className);
			for (var i = 0, len = els.length; i < len; i++) {
				els[i].onclick = onclick;
			}
		} :
		function(parent, className, onclick) {
			var all = parent.getElementsByTagName('*');
			var matcher = new RegExp("\\b" + className + "\\b");
			for (var i = 0, len = all.length; i < len; i++) {
				if (matcher.test(all[i].className)) {
					all[i].onclick = onclick;
				}
			}
		}
	;
	
	var hide = function(el) { el.style.display = 'none'; };
	var show = function(el) { el.style.display = ''; };
	
	var toggleCollapsed = function() {
		var collapsible = this.nextSibling.nextSibling;
		if (collapsible.style.display == 'none') {
			this.className = this.className.replace(' ppr-collapsed', '');
			show(collapsible); // array keys or object properties
			hide(collapsible.nextSibling); // elipses
		}
		else {
			this.className += ' ppr-collapsed';
			hide(collapsible); // array keys or object properties
			show(collapsible.nextSibling); // elipses
		}
	};
	
	var more = function() {
		hide(this); // "more" icon
		hide(this.previousSibling); // elipses
		show(this.nextSibling); // rest of text
		show(this.nextSibling.nextSibling); // "less" icon
	};
	
	var less = function() {
		var el;
		hide(this); // "less icon"
		hide(el = this.previousSibling); // rest of text
		show(el = el.previousSibling); // "more" icon
		show(el.previousSibling); // elipses
	};	
	
	win.pprDecorate = function() {
		var pres = document.getElementsByTagName('pre');
		var pre = pres[pres.length-1];
		eachOnclick(pre, 'ppr-collapser', toggleCollapsed);
		eachOnclick(pre, 'ppr-more', more);
		eachOnclick(pre, 'ppr-less', less);
	};
	
	win.pprDecorate();
	
}(window));
