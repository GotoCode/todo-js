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
 *  - array data structure to store list items - DONE
 * 	- persistent storage for entire to-do list - DONE
 *  - use more sensible DOM methods (NOT innerHTML / outerHTML)
 *  - push to-do list to localStorage only when the user exits (instead of on every update)
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


// populate the list using preexisting data from localStorage, if any

function populateList()
{
	// retrieve data from localStorage

	if (testLocalStorage())
	{
		if (localStorage.getItem('itemsDict'))
			itemsDict = JSON.parse(window.localStorage.itemsDict);
	}

	// render each to-do list item to the screen

	const listOfItems = document.getElementById("top");

	for (var i in Object.keys(itemsDict))
	{
		listOfItems.innerHTML += getHTMLItem(itemsDict[i].desc);
	}
}


// tests if the client's browser can support Web Storage API

function testLocalStorage()
{
	try
	{
		var localStorage = window.localStorage;

		localStorage.setItem('test', 'test');
		localStorage.getItem('test');

		return true;
	}

	catch (e)
	{
		return false;
	}
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

	// store updated data model to localStorage
	if (testLocalStorage())
	{
		window.localStorage.setItem('itemsDict', JSON.stringify(itemsDict));
	}
}


// ADD item to to-do list

function addItem()
{
	const addItemTextbox = document.getElementById("add-item-textbox");
	const listOfItems    = document.getElementById("top");

	const listItemDesc   = addItemTextbox.value.trim();

	if (listItemDesc !== "")
	{
		// update the data model
		itemsDict[current_id] = new Item(listItemDesc)

		// update the UI
		listOfItems.innerHTML += getHTMLItem(listItemDesc);

		// store updated data model to localStorage
		if (testLocalStorage())
		{
			window.localStorage.setItem('itemsDict', JSON.stringify(itemsDict));
		}
	}
}
