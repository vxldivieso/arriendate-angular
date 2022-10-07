const { ipcRenderer } = require('electron')

let btnlogin;
let run; 
let password;

window.onload = function() { 
  run = document.getElementById("rut")
  password = document.getElementById("password")
  btnlogin = document.getElementById("login")

  btnlogin.onclick = function(){
    
   const obj = {run:run.value, password:password.value }

    ipcRenderer.invoke("login", obj)
  }
}

