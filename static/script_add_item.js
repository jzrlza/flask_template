let users_select = document.getElementById("users_select")
let test_txt = document.getElementById("test_txt")
let table_container = document.getElementById("table_container")
let button__add = document.getElementById("button__add")

let getInitialValues = function() {
	//console.log(input__keyword.value)
	fetch('get_users',{
		  method: "GET"
		})
   .then(response => response.json())
   .then(json => {
   	
   	let data = json.result
   	console.log(data)
   	users_select.innerHTML = `<option value="-1">- Select -</option>`
   	for (let obj of data) {
   		users_select.innerHTML += `<option value="${obj.id}">${obj.username}</option>`
   	}
   	
   	
   }).catch(e => {
   	console.error(e)
   })
}
getInitialValues()

let postAnItem = function() {
	//console.log(input__keyword.value)
	if (test_txt.value == "" || users_select.value < 0) {
		return
	}
	let query = {
		"name": test_txt.value,
		"user_id": users_select.value
	}
	fetch('test_add_item',{
		  method: "POST",
		  headers: {
		      "Content-Type": "application/json",
		      // 'Content-Type': 'application/x-www-form-urlencoded',
		    },
		  body: JSON.stringify(query)
		})
   .then(response => response.json())
   .then(json => {
   	
   	let data = json.result
   	console.log(data)
   	table_container.innerHTML = data
   	
   }).catch(e => {
   	console.error(e)
   })
}
button__add.onclick = postAnItem