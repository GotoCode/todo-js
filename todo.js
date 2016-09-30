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
 *  - array structure to store list items
 * 	- persistent storage of to-do list
 *
 */


// id the most recently added item

var current_id = 0;


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


function deleteItem(elemId)
{
	const deletedItem = document.getElementById(elemId);

	deletedItem.outerHTML = "";

	//console.log(deletedItem.outerHTML);

	//console.log(elemId);
}


function addItem()
{
	const addItemTextbox = document.getElementById("add-item-textbox");
	const listOfItems    = document.getElementById("top");

	const listItemDesc   = addItemTextbox.value;

	listOfItems.innerHTML += getHTMLItem(listItemDesc);
}
