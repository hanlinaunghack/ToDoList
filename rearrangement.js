	//rearrangement of contents on display
	function rearrangement() {
		for(var key = 0; key < localStorage.length; key++) {
			let item = JSON.parse(localStorage.getItem(key));
			if(key !== undefined) {
				if(!moment(item[4]).isValid()) {
					var duedate = '';
				} else {
					var duedate = moment(item[4]).fromNow();
				}
				let itemHtml = $(`<tr draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'><td><div class='container categoryX'>${item[0]}<img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${key}'>${item[1]} <img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${duedate}<img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${item[2]}</div></td></tr>`);
				$('.displaycontents').append(itemHtml);
			}
		}
	}
	//rearrangement of contents on display
	//alternating Table Cell Color
	function alternatingTableCellColor() {
		$('.containerX.display-item:odd').css('background-color','rgb(100, 200, 255, 0.25)');
		$('.containerX.display-item:even').css('background-color','rgb(150, 250, 200, 0.25)');
		$('.container.categoryX:odd').css('background-color','rgb(100, 200, 255, 0.25)');
		$('.container.categoryX:even').css('background-color','rgb(150, 250, 200, 0.25)');
	}
	//alternating Table Cell Color
	//input1 dates
	$(document).ready(function() {
		$('.user-input1').val(`${moment().format('YYYY-MM-DDTkk:mm:ss')}`);
	})

	//input1 dates