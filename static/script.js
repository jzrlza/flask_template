const universalBOM = "\uFEFF";

console.log("Flask JS")

let test_btn = document.getElementById("button__scrape")
let test_txt = document.getElementById("test_txt")
let table_container = document.getElementById("table_container")
let postSomething = function() {
	//console.log(input__keyword.value)
	let query = {
		"username": test_txt.value
	}
	fetch('test_post',{
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
   	table_container.innerHTML = data[0]
   	
   }).catch(e => {
   	console.error(e)
   })
}
test_btn.onclick = postSomething