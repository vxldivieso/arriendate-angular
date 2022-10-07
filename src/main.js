const { app, BrowserWindow, ipcMain, Notification, ipcRenderer } = require('electron');
const path = require('path'); 
let db = require('./database')

let win;
let winlogin;

//Window Login
function loginWindow () {
  winlogin = new BrowserWindow({
   width: 1000,
   height: 1000,
   webPreferences: {
    // nodeIntegration: true,
    // contextIsolation:true,
    // devTools:false,
     preload:path.join(__dirname, './login.js')
     
   }
 })

 winlogin.loadFile('src/ui/Login/login.html')
}

//Window Home
function createWindow () {
   win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
     // nodeIntegration: true,
     // contextIsolation:true,
     // devTools:false,
      preload:path.join(__dirname, './index.js')
      
    }
  })

  win.loadFile('src/ui/Home/index.html')
}

//First window
app.whenReady().then(loginWindow)



//
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//Llamado validar credenciales
ipcMain.handle('login', (event, obj) => {
  validatelogin(obj)
});

function validatelogin(obj) {
 const { run, password } = obj 
 //const sql = "SELECT CONCAT(rut_emp, '-', rut_dv_emp ) FROM bdturismoreal.empleado WHERE RUT=? and PASS_EMP=?"
 const sql = "SELECT * FROM empleado WHERE RUT_EMP=? AND PASS_EMP=?"

 db.query(sql, [run, password], (error, results, fields) => {
    if(error){ console.log(error);}

    if(results.length > 0){
       createWindow()
       win.show()
       winlogin.close()
     }else{
       new Notification({
         title:"Error Inicio de Sesión",
         body: 'Usuario o Contraseña incorrecta.'
       }).show()
     }
    
  });
}

//Validar pantalla de inicio según Rol



//Funcion para mostrar contraseña
/*
function mostrarPassword(){
  var cambio = document.getElementById("txtPassword");
  if(cambio.type == "password"){
    cambio.type = "text";
    $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
  }else{
    cambio.type = "password";
    $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
  }
} 

$(document).ready(function () {
//CheckBox mostrar contraseña
$('#ShowPassword').click(function () {
  $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
});
});

*/

//CRUD
ipcMain.handle('get', () => {
   getProducts()
});


ipcMain.handle('add', (event, obj) => {
  addProduct(obj)
});


ipcMain.handle('get_one', (event, obj) => {
  getproduct(obj)    
});


ipcMain.handle('remove_product', (event, obj) => {
  deleteproduct(obj)
});


ipcMain.handle('update', (event, obj) => {
  updateproduct(obj)    
});

//CRUD 2

/* 
function getProducts()
{
  
  db.query('SELECT * FROM product', (error, results, fields) => {
    if (error){
      console.log(error);
    }
    
    win.webContents.send('products', results)
  });  
}


function addProduct(obj)
{
  const sql = "INSERT INTO product SET ?";  
  db.query(sql, obj, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
    getProducts()  
 });
}


function deleteproduct(obj)
{
  const { id }  = obj
  const sql = "DELETE FROM product WHERE id = ?"
  db.query(sql, id, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
    getProducts()  
  });
}


function getproduct(obj)
{
  let { id } = obj 
  let sql = "SELECT * FROM product WHERE id = ?"
  db.query(sql, id, (error, results, fields) => {
    if (error){
      console.log(error);
    }
    console.log(results)
    win.webContents.send('product', results[0])
  });
}


function updateproduct(obj) 
{
   let { id, name, price } = obj
   const sql = "UPDATE product SET name=?, price=? WHERE id=?";  
   db.query(sql, [name, price, id], (error, results, fields) => {
     if(error) {
        console.log(error);
     }
     getProducts()  
   });
}
*/

