$(document).ready(function() {
	//initialize izimodal
	$('#modal').iziModal({
		width: 800,
		height: 500,
		radius: 30,
		background: 'rgb(130, 250, 255)',
	});
	$('#category-confirm-modal').iziModal({
		width: 500,
		height: 300,
		radius: 20,
		background: 'rgb(130, 250, 255)',
	})
	$('#date-confirm-modal').iziModal({
		width: 500,
		height: 300,
		radius: 20,
		background: 'rgb(130, 250, 255)',
	})
	$('#content-confirm-modal').iziModal({
		width: 500,
		height: 300,
		radius: 20,
		background: 'rgb(130, 250, 255)',
	})
	//initialize izimodal
	//edit modal
	$('body').on('focusout','.currentText',function(event) {
		let value = $('.currentText').val();
		if($('.currentText').parent().attr('class') === 'container categoryX') { //category
			var element = $('.currentText').parents('tr').children()[0];
			element = $(element).children();
			$('#category-confirm-modal').iziModal('open', {
	    		transition: 'fadeInDown'
			});
		} else if ($('.currentText').parent().attr('class') === 'container date') { //due date
			$('#date-confirm-modal').iziModal('open', {
	    		transition: 'fadeInDown'
			});
			var element = $('.currentText').parents('tr').children()[2];
			element = $(element).children();
		} else {
			$('#content-confirm-modal').iziModal('open', { //content block
	    		transition: 'fadeInDown'
			});
			var element = $('.currentText').parent();
		}
		$('.currentText').trigger('focus');
	});
	$('body').on('click','.category.btn.btn-success',function() {
		$('#category-confirm-modal').iziModal('close');
		let value = $('.currentText').val();
		var key = $('.currentText').parents('tr').children()[1];
		var element = $('.currentText').parents('tr').children()[0];
		element = $(element).children();
		key = $(key).children().attr('id');
		var item = JSON.parse(localStorage.getItem(key));
		item[0] = value;
		item = JSON.stringify(item);
		localStorage.setItem(key, item);
		$(element).html(`${value}<img class='editbutton' src='editbutton.png'>`)
		$('.currentText').val('');
	})
	$('body').on('click','.category.btn.btn-danger',function() {
		let value = $('.currentText').val();
		var key = $('.currentText').parents('tr').children()[1];
		var element = $('.currentText').parents('tr').children()[0];
		element = $(element).children();
		key = $(key).children().attr('id');
		var item = JSON.parse(localStorage.getItem(key));
		$('#category-confirm-modal').iziModal('close');
		$(element).html(`${item[0]}<img class='editbutton' src='editbutton.png'>`)
	})
	$('body').on('click','.date.btn.btn-success',function() {
		$('#date-confirm-modal').iziModal('close');
		let value = $('.currentText').val();
		var key = $('.currentText').parents('tr').children()[1];
		var element = $('.currentText').parents('tr').children()[2];
		element = $(element).children();
		key = $(key).children().attr('id');
		var item = JSON.parse(localStorage.getItem(key));
		item[4] = value;
		item = JSON.stringify(item);
		localStorage.setItem(key, item);
		value = moment(value).isValid() ? moment(value).fromNow() : '';
		$(element).html(`${value}<img class='editbutton' src='editbutton.png'>`)
		$('.currentText').val('');
	})
	$('body').on('click','.date.btn.btn-danger',function() {
		$('#date-confirm-modal').iziModal('close');
		let value = $('.currentText').val();
		var key = $('.currentText').parents('tr').children()[1];
		var element = $('.currentText').parents('tr').children()[2];
		element = $(element).children();
		key = $(key).children().attr('id');
		var item = JSON.parse(localStorage.getItem(key));
		$(element).html(`${item[4]}<img class='editbutton' src='editbutton.png'>`)
	})
	$('body').on('click','.content.btn.btn-success',function() {
		$('#content-confirm-modal').iziModal('close');
		let value = $('.currentText').val();
		var key = $('.currentText').parent().attr('id');
		var element = $('.currentText').parent();
		var item = JSON.parse(localStorage.getItem(key));
		value = value.replace(/<br> */g,'<br>');
		if(value.substr(-4) === '<br>') {
  			value = value.slice(0,-4);
		}
		if(value == "") {
			$(element).html(`${item[1]}<img class='editbutton' src='editbutton.png'>`)
			return undefined;
		} else {
			item[1] = value;
		}
		item = JSON.stringify(item);
		localStorage.setItem(key, item);
		$(element).html(`${value}<img class='editbutton' src='editbutton.png'>`)
		$('.currentText').val('');
	})
	$('body').on('click','.content.btn.btn-danger',function() {
		$('#content-confirm-modal').iziModal('close');
		let value = $('.currentText').val();
		var key = $('.currentText').parent().attr('id');
		var element = $('.currentText').parent();
		var item = JSON.parse(localStorage.getItem(key));
		$(element).html(`${item[1]}<img class='editbutton' src='editbutton.png'>`)
	})
	//edit modal
	//edit button
	$('body').on('click','.editbutton',function(event) {
		let edit = $(event.target).parent('div');
		let key = $(edit).attr('id');
		if($(event.target).parent().attr('class') === 'container date') {
			$(edit).html(`<input type='datetime-local' class='currentText'></input>`)
		} else {
			$(edit).html(`<input type='text' class='currentText'></input>`)
		}
		
		$('.currentText').focus();
	});
	$('body').on('keyup','.currentText',function(event) {
		let e = event.which;
		if(e == 13) {
			$('.currentText').trigger('focusout');
		}
	});
	//edit button
})