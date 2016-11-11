var listPrice = parseInt(0);
var lastOffer = parseInt(0);
var parentOffers = [];
var offer = [];

function addList () {
	listPrice = parseInt(document.getElementById("txtList").value);
		console.log(listPrice);
		if (listPrice !== "") { //this does not work anymore post parseInt changes. Currently true even if input is left empty
			document.getElementById("listDiv").style.display="none";
			document.getElementById("offerDiv").style.display="inline";
		}
	document.getElementById("offerTableHeader").innerHTML="<strong>This property is listed at $"+listPrice+"</strong>";
	lastOffer=listPrice
};

function addOffer () {
	var currentParent = document.getElementById("selectParent").value;
	if (currentParent === "newParentOffer") {
		var randomColor = Math.floor(Math.random() * 1000000 -1);
		console.log(randomColor);
		var x = parentOffers.length;
		parentOffers[x] = {
			color: randomColor,
			lastOffer: listPrice
		}
		var addOption = document.createElement("OPTION");
		var oText = document.createTextNode("Offer #"+parentOffers.length)
		addOption.appendChild(oText);
		document.getElementById("selectParent").appendChild(addOption);
		document.getElementById("selectParent").lastChild.value = x;
		printOffer (x,parentOffers.length);
	} else {
		var offerChain = parseInt(currentParent) + 1; 
		printOffer (currentParent,offerChain);

	}
};

function printOffer (x,y) {
	offer[0] = document.getElementById("txtDate").value; //Date
	offer[1] = document.getElementById("selectParty").value; //Party
	offer[2] = parseInt(document.getElementById("txtAmount").value); //Amount
	offer[3] = parseInt(document.getElementById("txtClosingCredit").value); //Closing Credit
	offer[4] = parseInt(document.getElementById("txtExtrasValue").value); //Extras Value
	offer[5] = document.getElementById("txtExtrasType").value; //Extras Type
	offer[6] = offer[2]-offer[3]-offer[4]; //Seller's Amount
	offer[7] = offer[6]-listPrice; //Offer Vs List
	offer[8] = offer[6]-parentOffers[x].lastOffer;     //lastOffer; //Offer Vs Prev
	offer[9] = (parentOffers[x].lastOffer + offer[6]) / 2; //Midpoint
	offer[10] = y; //Parent Offer
	parentOffers[x].lastOffer = offer[6];	
	
	var tr = document.createElement("TR");
	for (i=0; i<offer.length; i++) {
		var td = document.createElement("TD");
		var t = document.createTextNode(offer[i]);
		td.appendChild(t);
		tr.appendChild(td);
	};
	document.getElementById("offerTable").appendChild(tr);
	document.getElementById("offerTable").lastChild.style.color = "#"+parentOffers[x].color;

	document.getElementById("txtDate").value = "";
	document.getElementById("txtAmount").value = "";
	document.getElementById("txtClosingCredit").value = "";
	document.getElementById("txtExtrasValue").value = "";
	document.getElementById("txtExtrasType").value = "";
};