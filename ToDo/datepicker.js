function Datepicker (e) {
	if (!!document.getElementById('datepicker')) {
		removePicker();
		return;
	}
	var self = e.target;
	self.year = {
		Days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		Months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		today: new Date(),
		date: new Date()
	}
	self.pickerHTML = document.createElement('div');
	self.pickerHTML.id = 'datepicker';
	var calendar = document.createElement('table');
	self.pickerHTML.appendChild(calendar);
	var chead = document.createElement('thead');
	calendar.appendChild(chead);
	var cbody = document.createElement('tbody');
	calendar.appendChild(cbody);
	var tfoot = document.createElement('tfoot');
	calendar.appendChild(tfoot);
	var headtr = document.createElement('tr');
	chead.appendChild(headtr);

	self.Calendar = function () {
		if (arguments[0]) {
			self.year.date = new Date(self.year.date.getFullYear(), self.year.date.getMonth()+Number(arguments[0]), 1);
			var EOM = new Date(self.year.date.getFullYear(), self.year.date.getMonth()+1, 0);	
		}
		else {
			self.year.date = new Date(self.year.today.getFullYear(), self.year.today.getMonth(), 1);
			var EOM = new Date(self.year.today.getFullYear(), self.year.today.getMonth()+1, 0);
		}
		if (chead.children.length === 2) {
			chead.removeChild(chead.getElementsByTagName('tr')[0]);
			headtr = document.createElement('tr');
			chead.insertBefore(headtr, chead.getElementsByTagName('tr')[0]);
			for (var i = 0; i < self.year.Days.length; i++) {
				var td = document.createElement('td');
				if (i === 0) {
					td.innerHTML = "<a title='prev month' style='text-decoration: none; cursor: pointer;'><<</a>";
					td.id = 'prev';
				}
				if (i === 1) {
					td.colSpan = 5;
					td.innerHTML = self.year.Months[self.year.date.getMonth()] + ' ' + self.year.date.getFullYear();
					i += 4;
				}
				if (i === self.year.Days.length - 1) {
					td.innerHTML = "<a title='next month' style='text-decoration: none; cursor: pointer;'>>></a>";
					td.id = 'next';
				}
				headtr.appendChild(td);
			};
		} else {
			for (var i = 0; i < self.year.Days.length; i++) {
				var td = document.createElement('td');
				if (i === 0) {
					td.innerHTML = "<a title='prev month' style='text-decoration: none; cursor: pointer;'><<</a>";
					td.id = 'prev';
				}
				if (i === 1) {
					td.colSpan = 5;
					td.innerHTML = self.year.Months[self.year.date.getMonth()] + ' ' + self.year.date.getFullYear();
					i += 4;
				}
				if (i === self.year.Days.length - 1) {
					td.innerHTML = "<a title='next month' style='text-decoration: none; cursor: pointer;'>>></a>";
					td.id = 'next';
				}
				headtr.appendChild(td);
			}
			headtr = document.createElement('tr');
			chead.appendChild(headtr);
			for (var i = 0; i < self.year.Days.length; i++) {
				var td = document.createElement('td');
				headtr.appendChild(td);
				td.innerHTML = self.year.Days[i];
			};
		}
		if (cbody.hasChildNodes()) {
			for (var i = cbody.getElementsByTagName('tr').length; i > 0; i--)
				cbody.removeChild(cbody.getElementsByTagName('tr')[0]);
		}
		for (var row = 0; row < 6; row++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < self.year.Days.length; j++) {
				var td = document.createElement('td');
				if (self.year.date.getDate() <= EOM.getDate() && self.year.date.getMonth() === EOM.getMonth()) {
					if (j === self.year.date.getDay()) {
						td.innerHTML = self.year.date.getDate();
						td.className = 'active';
						self.year.date.setDate(self.year.date.getDate() + 1);
					} else td.className = 'inactive';
				} else td.className = 'inactive';
				if ((row % 2) != 0)
					td.className += ' odd';
				else td.className += ' even';
				tr.appendChild(td);
			}
			cbody.appendChild(tr);
		}
		self.year.date = new Date(self.year.date.getFullYear(), self.year.date.getMonth()-1, 1);
	}
	
	self.Calendar();
	tfoot.innerHTML = "<tr><td colspan='7'>Сегодня: " + self.year.today.getDate() + ' ' + self.year.Months[self.year.today.getMonth()] + ' ' + self.year.today.getFullYear() + "</td></tr>";
	tfoot.addEventListener('click', function() {
		self.parentNode.children[0].value = self.year.today.getDate()+'/'+Number(self.year.today.getMonth()+1)+'/'+self.year.today.getFullYear();
		removePicker();
	}, false);
	var parentstyle = self.parentNode.getBoundingClientRect();
	self.parentNode.appendChild(self.pickerHTML);
	self.pickerHTML.style.top = (parentstyle.top + parentstyle.height) + 'px';
	self.pickerHTML.style.left = parentstyle.left + 'px';
	self.pickerHTML.addEventListener('click', function(e) {
		if (this == document.getElementById('datepicker')) {
			if (e.target.hasAttribute('class') && e.target.getAttribute('class').indexOf('active') === 0) {
				this.parentNode.children[0].value = e.target.innerHTML+'/'+(self.year.date.getMonth()+1)+'/'+self.year.date.getFullYear();
				removePicker();
			};
			if (e.target.text === '<<') {
				self.Calendar(-1);
			};
			if (e.target.text === '>>') {
				self.Calendar(+1);
			};
			e.stopPropagation();
		}
	}, false);
	e.stopPropagation();
}

function removePicker() {
	document.getElementById('datepicker').parentNode.removeChild(document.getElementById('datepicker'));
}

document.addEventListener('click', function(e) {
		if (!!document.getElementById('datepicker'))
			removePicker();
}, false)