window.quotesarray = [];
window.photosarray = [];
window.iteration = 1;
window.currenttop = 0;
window.flipper;
window.layouts =["layout1","layout2","layout3"]
window.currentlayout = "layout1"

$( document ).ready(function() {
	var hashsstring = window.location.hash.substr(1);
	keys = hashsstring.split(",");
	//console.log(keys);
	if (keys.length != 2) {
		window.sheetskey = window.prompt("Sheets API key");
		window.photokey = window.prompt("500px API key");
	} else {
		window.sheetskey = keys[0];
		window.photokey = keys[1];
	}
	loadcontent();

	$( ".quoteimg" ).click(function(){
		window.clearInterval(window.flipper);
		flip_quote();
		cycle();
	})

});

function loadcontent(){
	$.ajax({
	  url: "https://sheets.googleapis.com/v4/spreadsheets/1Wwu7ZbsFf3Zd_3ZlY9KSu_pgdMWk3hr_ptelL79_6kE?includeGridData=true&key="+window.sheetskey,
	  success: function( quotes ) {
	  	//console.log( quotes.sheets[0]['data'][0].rowData );
	  	//var quotesarray = [];
	  	for ( var r in quotes.sheets[0]['data'][0].rowData ) {
	  		var single_quote = [];
	  		single_quote["date"] = quotes.sheets[0]['data'][0].rowData[r].values[0].formattedValue;
	  		single_quote["structdate"] = quotes.sheets[0]['data'][0].rowData[r].values[0].effectiveValue.numberValue;
	  		single_quote["text"] = quotes.sheets[0]['data'][0].rowData[r].values[1].formattedValue;
	  		window.quotesarray.push(single_quote);
	  	}  
	  	window.quotesarray = shuffle( quotesarray );
	  	//console.log( quotesarray.sort() );

	    //$( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
	    loadphotos();
	  }
	});
}

function loadphotos(){
	$.ajax({
		url: "https://api.500px.com/v1/photos/search?term=thoughtful&license_type=0,1,2,3,4,5,6,7,8&rpp=100&exclude_nude=1&was_featured_type=highest_rated&image_size=1600,30&consumer_key="+window.photokey,
		success: function( photos ) {
	  		//console.log( photos.photos );
	  		for (var p in photos.photos ) {
	  			var single_photo = [];
	  			single_photo["image_large"] = photos.photos[p].image_url[0];
	  			single_photo["image_small"] = photos.photos[p].image_url[1];
	  			single_photo["author"] = photos.photos[p].user.fullname;
	  			single_photo["url"] = "https://www.500px.com"+photos.photos[p].url;
	  			//console.log( photos.photos[p] );
	  			window.photosarray.push( single_photo );
	  		}
	  		window.photosarray = shuffle(photosarray);
	  		console.log( photosarray.sort() );
	  		setup_start();
	  	}
	});
}

function setup_start() {
	hide_loader();

	// iteration is 1-based om berekening makkelijker te maken
	window.iteration = 1;

	$( ".quoteimg-2" ).hide();
	$( ".quoteimg-1" ).show();
	window.currenttop = 1;

	load_data( 1, window.iteration );
	window.iteration ++;
	load_data( 2, ( window.iteration ) );

	cycle();
}

function load_data( target, contentid ) {

	quoteid = ( contentid % window.quotesarray.length );
	photoid = ( contentid % window.photosarray.length );

	//console.log( quoteid+ " / "+ photoid );

	targetwrap = ".quoteimg-"+target;

	$( targetwrap ).css("background-image", "url(" + window.photosarray[photoid]["image_small"] + ")"); 	
	$( targetwrap+" .fullsize" ).css("background-image", "url(" + window.photosarray[photoid]["image_large"] + ")"); 

	$( targetwrap+" .photocredit a" ).text( window.photosarray[photoid]["author"] );
	$( targetwrap+" .photocredit a" ).attr( { "href" : window.photosarray[photoid]["url"] } );

	$( targetwrap+" figcaption" ).text( window.quotesarray[quoteid]["text"] );
	$( targetwrap+" figcaption" ).data( "date",quotesarray[quoteid]["date"] )


}

function hide_loader() {
	$(".pagewrapper").addClass("loaded");
	$(".loader").hide();
}

function cycle() {
	window.flipper = setInterval(
		flip_quote, 10000
	);
}

function flip_quote() {
	window.iteration++;
	layout = window.layouts[Math.floor(Math.random()*window.layouts.length)];

	while (layout == window.currentlayout) {
		layout = window.layouts[Math.floor(Math.random()*window.layouts.length)];
	}

	window.currentlayout = layout;

	console.log(layout);
	if (1 == window.currenttop) {

		$( ".quoteimg-2 figcaption").attr("class",layout);
		$( ".quoteimg-2" ).fadeIn("slow");
		$( ".quoteimg-1 figcaption" ).fadeOut("slow", 
			function(){
				load_data( 1, window.iteration );
			}
		);
		window.currenttop = 2;
	} else {
		$( ".quoteimg-1 figcaption").attr("class",layout);
		$( ".quoteimg-2" ).fadeOut("slow");
		$( ".quoteimg-1 figcaption" ).fadeIn("slow",
			function(){
				load_data( 2, window.iteration );
			}
		);
		window.currenttop = 1;
	}

	if (window.iteration > 10000) {
		window.iteration = 1;
	}
	console.log("flip");
	//console.log(window.currenttop );
}

/**
* array shuffling functie
*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}