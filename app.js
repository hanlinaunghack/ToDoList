$(document).ready(function() {
	//resizable tables
	$(function(){
	  $(".displaycontents").colResizable();
	});
	//resizable tables
	//initialize izimodal
	$('#modal').iziModal({
		width: 700,
	});
	//initialize izimodal
	//append items from storage to display format [category,content,date,x]
	for(var key = 0; key < localStorage.length; key++) {
		let item = JSON.parse(localStorage.getItem(key));
		if(key !== undefined) {
			let itemHtml = $(`<tr draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'><td><div class='container categoryX'>${item[0]}<img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${key}'>${item[1]} <img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${item[2]}</div></td></tr>`);
			$('.displaycontents').append(itemHtml);
		}
	}
	//append items from storage to display
	//alternating table cell color
	function alternatingTableCellColor() {
		$('.containerX.display-item:odd').css('background-color','rgb(100, 200, 255, 0.25)');
		$('.containerX.display-item:even').css('background-color','rgb(150, 250, 200, 0.25)');
		$('.container.categoryX:odd').css('background-color','rgb(100, 200, 255, 0.25)');
		$('.container.categoryX:even').css('background-color','rgb(150, 250, 200, 0.25)');
	}
	alternatingTableCellColor();
	//alternating table cell color
	//add items to the list
	$(".user-input").on('keyup',function(event) {
		let e = event.which;
		if(e == 13) {
			$('.add-text-btn').trigger('click');
		}
	})
	$(".add-text-btn").on('click',function() {
		let inputValue = $('.user-input').val();
		inputValue = inputValue.replace(/<br>/g,'');
		let inputKey = $('.user-input').val();
		if(inputValue == "") {
			$('.user-input').val('');
			return undefined;
		}
		var x = 0;
		while(localStorage.hasOwnProperty(x)) {
			x = x + 1;
		}
		let date = moment().format("MMM Do YY");
		let item = JSON.stringify(['',inputValue,date,x]);
		localStorage.setItem(x,item);
		let itemHtml = $(`<tr draggable='true'><td><div class='container categoryX'><img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${x}'>${inputValue} <img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${date}</div></td></tr>`);
		$('.displaycontents').append(itemHtml);
		$('.user-input').val('');
		alternatingTableCellColor();
	});
	//add items to the list
	//select all button
	$('.sel-all-btn').on('click',function(event) {
		let selAll = Array.from(document.getElementsByClassName('containerX display-item'));
		selAll.forEach(function(element) {
			element.classList.add("selected");
		});
	});
	$('.de-sel-all-btn').on('click',function(event) {
		let deSelAll = Array.from(document.getElementsByClassName('containerX display-item selected'));
		deSelAll.forEach(function(element) {
			element.classList.remove('selected');
		});
	});
	//selectall button
	//select items by clicking on them
	$('body').on('click','.display-item',function(event) {
		if(!$(event.target).is('.display-item *')) {
			$(this).toggleClass('selected');		
		}
	})
	//select items by clicking on them
	//reorganize localStorage
	function reorganizeLocalStorage() {
		var val = Array.from(Object.values(localStorage));
		localStorage.clear();
		for(var i = 0 ; i < val.length ; i++) {
			localStorage.setItem(i , val[i]);
		};
		for(var j = 0 ; j < localStorage.length; j++) {
			var y = JSON.parse(localStorage.getItem(j));
			y[3] = j;
			localStorage.setItem(j , JSON.stringify(y));
		}	
	}
	//reorganize localStorage
	//delete selected items
	$('.del-text-btn').on('click',function() {
		var x = Array.from(document.getElementsByClassName('selected'));
		x.forEach(element => $(element.parentElement.parentElement).remove());
		x.map(element => element.id).forEach(element => localStorage.removeItem(element));
		reorganizeLocalStorage();
		alternatingTableCellColor();
	})
	//delete selected items
	//modal box
	$('.form-btn').on('click',function() {
		$('.blackbox').css('display', 'block');
		$('body').css('overflow','hidden');
	})
	$('#closebox').on('click',function(event) {
		if(!$(event.target).is('.containerbox *')) {
			$('.blackbox').css('display','none');
			$('body').css('overflow','scroll');	
		}
	})
	$('.submitbutton').on('click',function(event) {
		$('.blackbox').css('display','none');
		let inputCategory = $('.category').val();
		let inputKey = $('.contentblock').val();
		let inputValue = $('.contentblock').val();
		let testValue = $('.contentblock').val().replace(/<.*>/g,'');
		if(testValue === '') {
			inputValue = '';
		}
		inputValue = inputValue.replace(/<br> */gm,'<br>');
		inputValue = inputValue.replace(/<br>[\r?\n]*/g,'<br>');
		inputValue = inputValue.replace(/[\r?\n]*/g,'');
		console.log(inputValue);
		if(inputValue.substr(-4) === '<br>') {
  			inputValue = inputValue.slice(0,-4);
  			console.log(inputValue);
		}
		let date = moment().format("MMM Do YY");
		if(inputValue == "" || inputValue == "\n" || inputValue == "\n\n" || inputValue == "\n\n\n") {
		} else {
			let x = 0;
			while(localStorage.hasOwnProperty(x)) {
				x = x + 1;
			}
			let item = JSON.stringify([inputCategory,inputValue,date,x]);
			localStorage.setItem(x , item);
			let itemHtml = $(`<tr draggable='true'><td><div class='container categoryX'>${inputCategory}<img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${x}'>${inputValue} <img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${moment().format("MMM Do YY")}<div></td></tr>`);
			$('.displaycontents').append(itemHtml);
		}
		$('#modal').iziModal('close', {
    		transition: 'bounceOutDown'
		});
		$('.contentblock').val('');
		$('.category').val('');
		alternatingTableCellColor();
	});
	$('body').on('keydown','.contentblock',function(event) {
		if(event.keyCode == 13 && event.shiftKey) {
			$('.contentblock').trigger('blur');
			$('.submitbutton').trigger('click');
		}
	})
	//modal box
	//still making it
	$('.trigger').on('click',function(event) {
		$('#modal').iziModal('open', {
    		transition: 'fadeInDown'
		});
	});
	//still making it
	//edit button
	$('body').on('click','.editbutton',function(event) {
		let edit = $(event.target).parent('div');
		let key = $(edit).attr('id');
		$(edit).html(`<input type='text' class='currentText'></input>`)
		$('.currentText').focus();
	});
	$('body').on('keyup','.currentText',function(event) {
		let e = event.which;
		if(e == 13) {
			$('.currentText').trigger('focusout');
		}
	});
	$('body').on('focusout','.currentText',function(event) {
		let value = $('.currentText').val();
		if($('.currentText').parent().attr('class') === 'container categoryX') {
			var key = $('.currentText').parents('tr').children()[1];
			var element = $('.currentText').parents('tr').children()[0];
			element = $(element).children();
			key = $(key).children().attr('id');
			var item = JSON.parse(localStorage.getItem(key));
			item[0] = value;
		} else {
			var key = $('.currentText').parent().attr('id');
			var element = $('.currentText').parent();
			var item = JSON.parse(localStorage.getItem(key));
			if(value == "") {
				$(element).html(`${item[1]}<img class='editbutton' src='editbutton.png'>`)
				return undefined;
			} else {
				item[1] = value;
			}	
		}
		item = JSON.stringify(item);
		localStorage.setItem(key, item);
		$(element).html(`${value}<img class='editbutton' src='editbutton.png'>`)
		$('.currentText').val('');
	});
	//edit button
	//escape to deselect all
	$('html').on('keyup',function(event) {
		if(event.keyCode === 27) {
			$('.de-sel-all-btn').trigger('click');
		}
	});
	//escape to deselectall

})