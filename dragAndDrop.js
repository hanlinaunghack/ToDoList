
	//drag and drop events
	function drag(event) {
		let i = [event.target.children[1].children[0].id];
		let x = Array.from(document.getElementsByClassName('selected')).map(e=>e.id);
		i = i.concat(x);
		i.sort((a,b) => a-b);
		i = Array.from(new Set(i));
	    event.dataTransfer.setData("text", i);
	};
	function allowDrop(ev) {
	    ev.preventDefault();
	}
	function drop(ev) {
		ev.preventDefault();
    	var data = ev.dataTransfer.getData("text").split(',');
    	let data1 = $(ev.target)[0].id;
    	if(!data1) {
    		data1 = $(ev.target).parents('tr')[0].children[1].children[0].id;
    	}
    	if(data.indexOf(data1) > -1) {
    		return undefined;
    	} else {
			localStorageRearrangement(data,data1);    		
    	};
		alternatingTableCellColor();
	}
	//drag and drop events
	//alternating Table Cell Color
	function alternatingTableCellColor() {
		$('.containerX.display-item:odd').css('background-color','rgb(100, 200, 255, 0.25)');
		$('.containerX.display-item:even').css('background-color','rgb(150, 250, 200, 0.25)');
		$('.container.categoryX:odd').css('background-color','rgb(100, 200, 255, 0.25)');
		$('.container.categoryX:even').css('background-color','rgb(150, 250, 200, 0.25)');
	}
	//alternating Table Cell Color
	//localStorage rearrangement
	function localStorageRearrangement(key1,key2) {
		let arra = [];
		key1 = key1.map(e => Number(e));
		let data1 = JSON.parse(localStorage.getItem(key2))[3];
		for(let i = 0 ; i < localStorage.length ; i++) {
			if(key1.indexOf(i) > -1) {

			} else if (JSON.parse(localStorage.getItem(i))[3] === data1) {
				key1.forEach(function(element) {
					arra.push(JSON.parse(localStorage.getItem(element)));
				})
				arra.push(JSON.parse(localStorage.getItem(i)));
			} else {
				arra.push(JSON.parse(localStorage.getItem(i)));
			}
		}
		localStorage.clear();
		for(let i = 0; i < arra.length; i++) {
			arra[i][3] = i;
			localStorage.setItem(i,JSON.stringify(arra[i]));
		}
		$('.displaycontents').html(`<tr><th style='width:15%;' class='headings'>Category</th><th style='width:55%;' class='headings'>Content</th><th style='width:20%' class='headings'>Due Date</th><th style='width:10%;' class='headings'>Date</th></tr>`)
		let localKey = Object.keys(localStorage);
		localKey.forEach(function(element) {
			let item = JSON.parse(localStorage.getItem(element));
			let duedate = moment(item[4]).isValid() ? moment(item[4]).fromNow() : "";
			if(element !== undefined) {
				let itemHtml = $(`<tr draggable='true' ondragstart='drag(event)' ondrop='drop(event)' ondragover='allowDrop(event)'><td><div class='container categoryX'>${item[0]}<img class='editbutton' src='editbutton.png'></div></td><td><div class='containerX display-item' id='${element}'>${item[1]} <img class='editbutton' src='editbutton.png'></div></td><td><div class='container date'>${duedate}</div></td><td><div class='container date'>${item[2]}</div></td></tr>`);
				$('.displaycontents').append(itemHtml);
			}
		})	
	};
	//localStorage rearrangement