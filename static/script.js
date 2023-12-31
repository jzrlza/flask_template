const universalBOM = "\uFEFF";

console.log("Flask JS")

let test_btn = document.getElementById("button__scrape")
let test_result_btn = document.getElementById("button__export")
let test_txt = document.getElementById("test_txt")
let test_pwd = document.getElementById("test_pwd")
let table_container = document.getElementById("table_container")
let postSomething = function() {
	//console.log(input__keyword.value)
	if (test_txt.value == "" || test_pwd.value == "") {
		return
	}
	let query = {
		"username": test_txt.value,
		"password": test_pwd.value
	}
	fetch('test_post_db',{
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
   	
   	let data = json.result
   	console.log(data)
   	table_container.innerHTML = data
   	
   }).catch(e => {
   	e.then(msg => {
   		console.log(msg)
   		table_container.innerHTML = msg.message
   	})
   })
}
let getSomething = function() {
	//console.log(input__keyword.value)
	fetch('get_users',{
		  method: "GET"
		})
   .then(response => {
   	if (response.status < 400) {
   		return response.json()
   	} else {
   		throw response.json()
   	}
   	
   })
   .then(json => {
   	
   	let data = json.result
   	console.log(data)
   	table_container.innerHTML = ""
   	for (let obj of data) {
   		table_container.innerHTML += obj.id +" : "+obj.username+"<br>"
   	}
   	
   	
   }).catch(e => {
   	e.then(msg => {
   		console.log(msg)
   		table_container.innerHTML = msg.message
   	})
   })
}
test_btn.onclick = postSomething
test_result_btn.onclick = getSomething