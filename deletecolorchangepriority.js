$(document).ready(function() {
	//delete selected items
	$('.del-text-btn').on('click',function() {
		var x = Array.from(document.getElementsByClassName('selected'));
		x.forEach(element => $(element.parentElement.parentElement).remove());
		x.map(element => element.id).forEach(element => localStorage.removeItem(element));
		reorganizeLocalStorage();
		alternatingTableCellColor();
	})
	//delete selected items
	//colorchanging
	$('.color-input').on('change',function() {
		let x = Array.from(document.getElementsByClassName('selected'));
		let color = $('.color-input').val();
		x.forEach(element => {
			console.log(element.id);
			let id = element.id;
			let item = JSON.parse(localStorage.getItem(id));
			item[6] = color;
			localStorage.setItem(id, JSON.stringify(item));
			$(element).css('color',color);
			$(element).removeClass('selected');
		});
	})	
	//colorchanging
	//priority edit
	$('body').on('click','.priority',function(event) {
		$(event.target).html('<input type="text" class="input-priority"/>')
		$('.input-priority').focus();
	})
	$('body').on('focusout','.input-priority',function(event) {
		let x = $('.input-priority').val();
		let priority = $(event.target).parent('.priority');
		let id = $(priority).parents('tr').find('.containerX.display-item')[0].id;
		let item = JSON.parse(localStorage.getItem(id));
		if(x == '') {
		$(priority).html('0');
		} else {
		$(priority).html(x);
		}
		item[5] = x;
		item = JSON.stringify(item);
		localStorage.setItem(id, item);
	});
	$('body').on('keyup','.input-priority',function(event) {
		if(event.keyCode === 13) {
			$('.input-priority').trigger('focusout');
		}
	})
	//priority edit
})
