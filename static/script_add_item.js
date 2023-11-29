let users_select = document.getElementById("users_select")

let getSomething = function() {
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

getSomething()