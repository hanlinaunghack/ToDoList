$(document).ready(function() {
	//resizable tables
	$(function(){
	  $(".displaycontents").colResizable();
	});
	//resizable tables
	//append items from storage to display format [category,content,date,x]
	rearrangement();
	//append items from storage to display
	//alternating table cell color
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
		let duedate = $('.user-input1').val();
		console.log(duedate);
		if(inputValue == "") {
			$('.user-input').val('');
			return undefined;
		}
		var x = 0;
		while(localStorage.hasOwnProperty(x)) {
			x = x + 1;
		}
		let date = moment().format("MMM Do YY");
		let item = JSON.stringify(['',inputValue,date,x,duedate]);
		localStorage.setItem(x,item);
		if(!moment(duedate).isValid()) {
			duedate = '';
		} else {
			duedate = moment(duedate).fromNow();
		}
		let itemHtml = $(`<tr draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'><td><div class='container categoryX'><img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${x}'>${inputValue} <img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${duedate}<img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${date}</div></td></tr>`);
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
	//still making it
	$('.trigger').on('click',function(event) {
		$('#modal').iziModal('open', {
    		transition: 'fadeInDown'
		});
	});
	//still making it
	//escape to deselect all
	$('html').on('keyup',function(event) {
		if(event.keyCode === 27) {
			$('.de-sel-all-btn').trigger('click');
		}
	});
	//escape to deselectall

})