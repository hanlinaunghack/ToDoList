  function handleFileSelect() {
    $('#clear-storage-warning').iziModal('close');               
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      alert('The File APIs are not fully supported in this browser.');
      return;
    }   

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Import'");               
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
      //fr.readAsDataURL(file);
    }
  }

  function receivedText() {
    let loc = JSON.parse(fr.result);
    localStorage.clear();
    for(var key in loc) {
      if (typeof Number(key) !== 'number') {
        console.log('error');
      } else {
        localStorage.setItem(key , loc[key]);
      }
    }
  	console.log(loc);
    //document.getElementById('editor').appendChild(document.createTextNode(fr.result));
  }  