var http = require("http"), fs = require('fs'); // makes accessible these modules, which ship with Node.js

// fs.readFile('./hello.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8888);
// });


function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888); // pass an anon. fn into createServer (explanation below)

console.log("Server has started.");


/*** NOTES ***************************************************************************/

// ---- Passing functions around: ----------------------------------------------------
	function say(word) {
		console.log(word);
	}

	/* We pass the function say as the first parameter to the execute function--
	 * not the return value of say, but say itself. */
	function execute(someFunction, value) {
		someFunction(value);
	}

	function example1() {
		execute(say, "Hello");

		/* we don't have to take this indirection of first defining, then passing it -
		 * we can define and pass a function as a parameter to another function in-place: */
		execute(   function(word) { console.log(word) },    "Hello"  );
	}

// ---- Event-driven asynchronous callbacks ------------------------------------------
	/* JavaScript & therefore Node.js introduces the concept of event-driven, asynchronous
	 * callbacks, by utilizing an event loop.  */
	function example2() {
		database.query("SELECT * FROM hugetable", function(rows) {
			var result = rows;
		});
		console.log("Hello World");
	}

	 /* Now, Node.js can handle the database request asynchronously. Provided that database.query()
	  * is part of an asynchronous library, this is what Node.js does: just as before, it takes the
	  * query and sends it to the database. But instead of waiting for it to be finished, it makes a
	  * mental note that says "When at some point in the future the database server is done and sends
	  * the result of the query, then I have to execute the anonymous function that was passed to
	  * database.query()."  */