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
		let color = $('.color-input').val();
		if(inputValue == "") {
			$('.user-input').val('');
			return undefined;
		}
		var x = 0;
		while(localStorage.hasOwnProperty(x)) {
			x = x + 1;
		}
		let date = moment().format("MMM Do YY");
		let item = JSON.stringify(['',inputValue,date,x,duedate,0,color]);
		localStorage.setItem(x,item);
		if(!moment(duedate).isValid()) {
			duedate = '';
		} else {
			duedate = moment(duedate).fromNow();
		}
		let itemHtml = $(`<tr draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'><td><div class='container categoryX'><img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${x}' style='color:${color};'>${inputValue} <img class='editbutton' src='editbutton.png'></div></td><td><div class='priority'>0</div></td><td><div class='container date'>${duedate}<img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${date}</div></td></tr>`);
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
	//export items
	$('.export').on('click',function(event) {
		var localStorageX = JSON.stringify(localStorage);
		var link = document.createElement('a');
		link.setAttribute('download', 'export.txt');
    	link.setAttribute('href', 'data:text/plain'  +  ';charset=utf-8,' + encodeURIComponent(localStorageX));
    	link.click();
	});
	//export items
	//search category
	$('#search-category').on('focusin',function(event) {
		$('.dropdown-options').css('display','block');
		$('.dropdown-options').html('');
		let categoryX = [];
		let keys = Object.keys(localStorage);
		keys.forEach(function(e) {
			categoryX.push(JSON.parse(localStorage.getItem(e)));
		})
		if($('#search-category').val() === "") {
			categoryY = categoryX.map(e => e[0]).sort();
		} else {
			var filter = $('#search-category').val();
			categoryY = categoryX.map(e => e[0]).filter(e => e === filter);
		}
		categoryY = Array.from(new Set(categoryY));
		if(categoryY.length > 0) {
			for(var i = 0 ; i < categoryY.length ; i++) {
				if(categoryY[i] !== "") {
					let x = $(`<div class='category-item'>${categoryY[i]}</div>`);
					$('.dropdown-options').append(x);
				};
			};
		};
	});
	$('#search-category').on('keyup',function(event) {
		$('.dropdown-options').html('');
		if(event.keyCode === 13) {
			$('#search-category-btn').trigger('click');
		} else {
			let val = $('#search-category').val();
			let categoryX = [];
			let keys = Object.keys(localStorage);
			keys.forEach(function(e) {
				categoryX.push(JSON.parse(localStorage.getItem(e)));
			})
			categoryY = categoryX.map(e => e[0]).filter(e => e.indexOf(val) > -1);
			categoryY = Array.from(new Set(categoryY));
			if(categoryY.length > 0) {
				for(var i = 0 ; i < categoryY.length ; i++) {
					if(categoryY[i] !== "") {
						let x = $(`<div class='category-item'>${categoryY[i]}</div>`);
						$('.dropdown-options').append(x);
					};
				};
			};
		};
	});
	$('html').on('click',function(event) {
		if(!$(event.target).parents().hasClass('search-category-container')) {		
			$('.dropdown-options').css('display','none');	
		}
	})
	$('body').on('click','.category-item',function(event) {
		let x = event.target.innerText;
		$('#search-category').val(x);
		$('.dropdown-options').css('display','none');	
	})
	$('#search-category-btn').on('click',function(event) {
		$('.dropdown-options').css('display','none');
		$('#search-category').blur();
		let val = $('#search-category').val();
		let categoryX = [];
		let keys = Object.keys(localStorage);
		keys.forEach(function(e) {
			categoryX.push(JSON.parse(localStorage.getItem(e)));
		})
		if(val === '') {
			categoryY = categoryX.filter(e => e[0] === '');
		} else {
			categoryY = categoryX.filter(e => e[0].indexOf(val) > -1);
		}
		if(categoryY.length > 0) {
			    $('.displaycontents').html(`<tr><th style='width:10%;' class='headings'>Category</th><th style='width:48%;' class='headings'>Content</th><th style='width:15' class='headings'>Priority</th><th style='width:17%' class='headings'>Due Date</th><th style='width:10%;' class='headings'>Added Date</th></tr>`)
			    for(var i = 0 ; i < categoryY.length ; i++) {
				if(categoryY[i] !== "") {
					let itemHtml = $(`<tr draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'><td><div class='container categoryX'>${categoryY[i][0]}<img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${categoryY[i][3]}' style='color:${categoryY[i][6]}'>${categoryY[i][1]} <img class='editbutton' src='editbutton.png'></div></td><td><div class='priority'>${categoryY[i][5]}</div></td><td><div class='container date'>${moment(categoryY[i][4]).fromNow()}<img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${categoryY[i][2]}</div></td></tr>`);
					$('.displaycontents').append(itemHtml);
				};
			};
		} else {
			$('.displaycontents').html('<div>No result found.</div>')
		};
		$('.displaycontents').append($(`<div style='display:flex;justify-content:center;width:1950px;padding:50px;'><button id='back-button' style='width:200px'>back</button></div>`))
		alternatingTableCellColor();
		$('#search-category').val('');
	})
	$('body').on('click','#back-button',function(event) {
		    $('.displaycontents').html(`<tr><th style='width:10%;' class='headings'>Category</th><th style='width:48%;' class='headings'>Content</th><th style='width:15' class='headings'>Priority</th><th style='width:17%' class='headings'>Due Date</th><th style='width:10%;' class='headings'>Added Date</th></tr>`)
		    rearrangement();
		alternatingTableCellColor();
	})
	//search category
})