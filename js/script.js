document.addEventListenes('DOMContentLoaded', function () {
	// Place for rest code of Trello

	// Generation an ID for every card to eliminate duplicate
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	// Generate templates
	function generateTemplate(name, data, basicElement) {
		var template = document.getElementById(name).innerHTML;
		var element = document.createElement(basicElement || 'div');

		Mustache.parse(template);
		element.innerHTML = Mustache.render(template, data);

		return element;
	}
})