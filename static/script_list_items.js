let users_select = document.getElementById("users_select")
let table_container = document.getElementById("table_container")

let getInitialValues = function() {
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
   	users_select.innerHTML = `<option value="-1">- ALL -</option>`
   	for (let obj of data) {
   		users_select.innerHTML += `<option value="${obj.id}">${obj.username}</option>`
   	}
   	
   	
   }).catch(e => {
   	e.then(msg => {
   		console.log(msg)
   		table_container.innerHTML = msg.message
   	})
   })
}
getInitialValues()

let getItemValues = function() {
	let api_url = "get_items"

	if (users_select.value > -1) {
		api_url = `/item/${users_select.value}`
	}
	fetch(api_url,{
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

   	data_displayer_table.innerHTML = ""

   	if (data.length <= 0) {
   		data_displayer_table.innerHTML = "No items"
   		return
   	}
   	
   	let keys = Object.keys(data[0]);

   	let thead = data_displayer_table.createTHead();
	let row = thead.insertRow();
	for (let key of keys) {
		    let th = document.createElement("th");
		    th.classList.add('th_'+key);
		    let text = document.createTextNode(key);
		    th.appendChild(text);
		    row.appendChild(th);
		  }

	for (let element of data) {
	    let elem_row = data_displayer_table.insertRow();
	    elem_row.classList.add('tr_row');
	    //elem_row.classList.add('tr_row__'+operators_color_map[element["operator"]]);
	    for (let akey in element) {
	      let is_null = element[akey] === null || element[akey] === undefined
	      elem_row.classList.add('th_'+akey);
	      //let elem_normalized_str = element[akey]
	      let elem_str = element[akey]// `"${elem_normalized_str}"` //for excel reading
	      let cell = elem_row.insertCell();
	      let text = document.createTextNode(elem_str);
	      //element[akey] = normalizeDataUponExport ? elem_normalized_str : `"${(!is_null ? element[akey] : '-')}"`
	      cell.appendChild(text);
	    }
	  }
   	
   	
   }).catch(e => {
   	e.then(msg => {
   		console.log(msg)
   		table_container.innerHTML = msg.message
   	})
   })
}
users_select.onchange = getItemValues
getItemValues()