(function($) {
	// dom ready
	$(function() {
		var Offcavas = {
			init: function() {
				this.$offcanvas = $('.offcanvas');
				this.$offcanvasToggler = $('.offcanvas-toggle');
				this.offcanvasToggleClass = 'offcanvas--open';
				this.bindEvents();
			},
			bindEvents: function() {
				var self = this;
				this.$offcanvasToggler.on('click', function(e) {
					e.preventDefault();
					self.$offcanvas.toggleClass(self.offcanvasToggleClass);
				})
			}
		};

		Offcavas.init();
	});
})(window.jQuery);