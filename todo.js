/*
 *
 * todo.js
 *
 * This little web app provides basic functionality
 * for a simple to-do list application
 *
 * Currently, this program supports creation and 
 * deletion of list items
 *
 * Missing Features
 * 
 *  - disallow addition of 'empty' list items - DONE
 *  - array data structure to store list items
 * 	- persistent storage for entire to-do list
 *  - use more sensible DOM methods (NOT innerHTML / outerHTML)
 *
 */


// id the most recently added item

var current_id = 0;

// mapping between numeric ids and list items

var itemsDict = {};



// object to represent a single to-do list item

function Item(desc)
{
	this.desc = desc;
}


/* 
 * given the description of a list item,
 * returns an HTML string corresponding 
 * to a new item
*/

function getHTMLItem(item_description)
{

	current_id_name = "'list-item" + String(current_id) + "'";

	itemHTML = "";

	itemHTML += "<div class='list-item' id ='list-item" + String(current_id) + "'>";
	itemHTML += "<div class='description' id='desc" + String(current_id) + "'>";
	itemHTML += item_description;
	itemHTML += "</div>";
	itemHTML += "<div " + "onclick=deleteItem(" + current_id_name + ") class='cancel' id='cancel" + String(current_id) + "'>X</div>";
	itemHTML += "</div>";

	current_id++;

	return itemHTML;
}


// DELETE item from to-do list

function deleteItem(elemId)
{
	const deletedItem  = document.getElementById(elemId);
	const indexDeleted = Number(/list-item(\d+)/.exec(deletedItem.id)[1]);

	// update the data model
	delete itemsDict[indexDeleted];

	// update the UI
	deletedItem.outerHTML = "";

	console.log(itemsDict);

	//console.log(deletedItem.outerHTML);

	//console.log(elemId);
}


// ADD item to to-do list

function addItem()
{
	const addItemTextbox = document.getElementById("add-item-textbox");
	const listOfItems    = document.getElementById("top");

	const listItemDesc   = addItemTextbox.value.trim();

	if (listItemDesc !== "")
	{
		itemsDict[current_id] = new Item(listItemDesc)
		listOfItems.innerHTML += getHTMLItem(listItemDesc);
	}

	console.log(itemsDict);
}
