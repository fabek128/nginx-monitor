var Faye   = require('faye'),
	jsdom = require('jsdom'),
server = new Faye.NodeAdapter({mount: '/'});
 
server.listen(1337, "localhost");

console.log("Server faye corriendo...");

setInterval(sendData, 3000);

function sendData(){
	jsdom.env(
		"http://xfigue.com.ar/nginx_status",
		[ 'http://code.jquery.com/jquery-1.5.min.js' ],
		function (errors, window){
			var $ = window.jQuery;
			
			var lines = $('body').text().split("\n");

			//visits (active connections)
			var visitsPieces = lines[0].split(" ");
			var visits = visitsPieces[visitsPieces.length - 2];
			
			server.getClient().publish('/act', {
			  text:       visits
			});						
			//

			var lastLinePieces = lines[3].split(" ");

			//Readings			
			var readings = lastLinePieces[1];

			server.getClient().publish('/rea', {
			  text:       readings
			});
			
			//Writing			
			var writing = lastLinePieces[3];

			server.getClient().publish('/wri', {
			  text:       writing
			});
			
			//Wainting			
			var waiting = lastLinePieces[5];

			server.getClient().publish('/wai', {
			  text:       waiting
			});														

		}
	);
}