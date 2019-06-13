document.addEventListener('DOMContentLoaded', function () {
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

	// Column Class
	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.element = generateTemplate('column-template', { name: this:name });

		this.element.querySelector('.column').addEventListener('click', function (event) {
			if (event.target.classList.contains('btn-delete')) {
				self.removeColumn();
			}

			if (event.target.classList.contains('add-card')) {
				self.addCard(new Card(prompt('Wprowadź nazwę karty')));
			}
		});
	}

	// Methods for Column
	Column.prototype = {
		addCard: function (card) {
			this.element.querySelector('ul').appendChild(card.element);
		},
		removeColumn: function () {
			this.element.parentNode.removeChild(this.element);
		}
	};

	// Card class
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.element = generateTemplate('card-template', { description: this.description }, 'li');

		this.element.querySelector('.card').addEventListener('click', function (event) {
			event.stopPropagation();

			if (event.target.classList.contains('btn-delete')) {
				self.removeCard();
			}
		})
	}
})