function cargarImagen() {
    var input = document.getElementById('imagenInput');
    var imagenMostrada = document.getElementById('imagenMostrada');
    
    var file = input.files[0]; 
    
    if (file) {
        var reader = new FileReader(); 
        reader.onload = function(e) {
            imagenMostrada.src = e.target.result; 
        }
        reader.readAsDataURL(file); 
    } 
}

function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
  
    var imgtag = document.getElementById("imagenMostrada");
    imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
      imgtag.src = event.target.result;
    };
  
    reader.readAsDataURL(selectedFile);
  }
  