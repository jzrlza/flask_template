const universalBOM = "\uFEFF";

console.log("Login")

let button__login = document.getElementById("button__login")
let test_txt = document.getElementById("test_txt")
let test_pwd = document.getElementById("test_pwd")
let table_container = document.getElementById("table_container")
let authenUser = function() {
	//console.log(input__keyword.value)
	let query = {
		"username": test_txt.value,
		"password": test_pwd.value
	}
	fetch('authen_token',{
		  method: "POST",
		  headers: {
		      "Content-Type": "application/json",
		      // 'Content-Type': 'application/x-www-form-urlencoded',
		    },
		  body: JSON.stringify(query)
		})
   .then(response => {
   	if (response.status < 400) {
   		return response.json()
   	} else {
   		throw response.json()
   	}
   	
   })
   .then(json => {
   	
   	let data = json.token
   	console.log(data)
   	table_container.innerHTML = data
   	
   }).catch(e => {
   	e.then(msg => {
   		console.log(msg)
   		table_container.innerHTML = msg.message
   	})
   })
}
button__login.onclick = authenUser