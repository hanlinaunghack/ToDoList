$(document).ready(function() {
		//modal box
	var timenow = moment().format('YYYY-MM-DDTkk:mm:ss');
	$('.contentblock1').val(timenow);
	$('.submitbutton').on('click',function(event) {
		let inputCategory = $('.category').val();
		let inputKey = $('.contentblock').val();
		let inputValue = $('.contentblock').val();
		let testValue = $('.contentblock').val().replace(/<.*>/g,'');
		let color = $('.input-color').val();
		if(testValue === '') {
			inputValue = '';
		}
		inputValue = inputValue.replace(/<br> */gm,'<br>');
		inputValue = inputValue.replace(/<br>[\r?\n]*/g,'<br>');
		inputValue = inputValue.replace(/[\r?\n]*/g,'');
		if(inputValue.substr(-4) === '<br>') {
  			inputValue = inputValue.slice(0,-4);
		}
		let date = moment().format("MMM Do YY");
		let duedate = $('.contentblock1').val();
		let x = 0;
		while(localStorage.hasOwnProperty(x)) {
			x = x + 1;
		}
		let item = JSON.stringify([inputCategory,inputValue,date,x,duedate,0,color]);
		localStorage.setItem(x , item);
		duedate = moment(duedate).isValid() ? moment(duedate).fromNow() : '';
		let itemHtml = $(`<tr draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'><td><div class='container categoryX'>${inputCategory}<img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${x}' style='color:${color}'>${inputValue} <img class='editbutton' src='editbutton.png'></div></td><td><div class='priority'>0<div></td><td><div class='container date'>${duedate}<img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${moment().format("MMM Do YY")}<div></td></tr>`);
		$('.displaycontents').append(itemHtml);
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
})