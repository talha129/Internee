var MongoClient = require('mongodb').MongoClient;
var database = undefined;
var url = 'mongodb://localhost:27017/';


var express = require("express");
var myParser = require("body-parser");
var app = express();
 
app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json())
 

MongoClient.connect(url, function(err, db) {
	
	if (err) console.log("mongodb err");
	var dbo = db.db("Internee");
	dbo.collection('posts').createIndex(
    { eventName : "text", description : "text" }, function(err, result) {
    	if(err) console.log(err)
    	console.log(result);
    });
// console.log(db.system.indexes.find({'name':'use'}))
	// dbo.collection('users').createIndex( { userName: "text"} , function(err, indexname) {
 //  		if( err !== null)
 //  			{console.log(err)}
	// });
	// dbo.ensureIndex('users', {  
 //  		userName: "text"
	// }, function(err, indexname) {
 //  	assert.equal(null, err);
	// });
	db.close();

});

app.post("/login", function(request, response) {
   console.log(request.body); //This prints the JSON document received (if it is a JSON document)
   result = {}
   MongoClient.connect(url, function(err, db) {
	if (err) console.log("mongodb err");
	var dbo = db.db("Internee");
	// var myobj = [{ name: "Company Inc", address: "Highway 37" }, { name: "iZone", address: "Lahore" }];
	query = {'userName' : request.body.userName, 'password' : request.body.password}
	dbo.collection("users").find(request.body).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    console.log(result.length)
	    if (result.length !==  0) {
	    	response.json({status : result[0]['status'], userName : result[0]['userName']})
	    }
  		else{
  			response.json({status : false})
  		}
  	});

	db.close();	
 //   });
  
	});
});

app.post("/Signup", function(request, response) {
   console.log(request.body); //This prints the JSON document received (if it is a JSON document)
   MongoClient.connect(url, function(err, db) {
	if (err) console.log("mongodb err");
	var dbo = db.db("Internee");
	// var myobj = [{ name: "Company Inc", address: "Highway 37" }, { name: "iZone", address: "Lahore" }];
	dbo.collection("users").insertOne(request.body, function(err, res) {
		if (err) console.log("err");
			console.log("document inserted");
	    
  	});
	db.close();	
 //   });
  
	});
   response.json({status : true})
});


app.post("/Search", function(request, response) {
   
   console.log(request.body); //This prints the JSON document received (if it is a JSON document)
   MongoClient.connect(url, function(err, db) {
	
	if (err) console.log("mongodb err");
	var dbo = db.db("Internee");
	// var myobj = [{ name: "Company Inc", address: "Highway 37" }, { name: "iZone", address: "Lahore" }];
	if(request.body.jobSearch !==undefined) {
		field = 'posts' ; text = request.body.jobSearch  
		
		dbo.collection(field).find(
    		{ description : { "$regex": text }
  		}).toArray(function(err, results){
		
		if (err) console.log("err")
		console.log(results)

		if (results.length !==  0) {
	    	
	    	response.json({status : results})
	    }
  		else{
  			response.json({status : false})
   		} 
		});
	}
	

	if(request.body.searchVolunteer !== undefined) { 
		field = 'users';  text = request.body.searchVolunteer 

		dbo.collection(field).find(
    		{ userName: { "$regex": text }, status: 'Volunteer'
  		}).toArray(function(err, results){
		
		if (err) console.log("err")
		console.log(results)

		for(var i in results){
			results['password'] = undefined;
		}

		if (results.length !==  0) {
	    	
	    	response.json({status : results})
	    }
  		else{
  			response.json({status : false})
   		} 
		});
	}
	

	// result = dbo.collection(field).find(
 //   		{ $text: { $search: text } },
 //   		{ score: { $meta: "textScore" } }
	// 	).sort( { score: { $meta: "textScore" } } )
	
	// console.log(result);
	//	db.users.find({username:/Son/})
	// dbo.collection(field).find(query).toArray(function(err, result) {
	//     if (err) console.log("err");
	//     console.log(result);
	//     result['password'] = undefined;
	    
 //  	});
	db.close();	
 //   });
	});
});

app.post("/PostEvent", function(request, response) {
   console.log(request.body); //This prints the JSON document received (if it is a JSON document)
   
   MongoClient.connect(url, function(err, db) {
	
	if (err) console.log("mongodb err");
	
	var dbo = db.db("Internee");
	// var myobj = [{ name: "Company Inc", address: "Highway 37" }, { name: "iZone", address: "Lahore" }];
	dbo.collection("posts").insertOne(request.body, function(err, res) {
		if (err) console.log("err");
			console.log("document inserted");
	    
  	});
	db.close();	
 //   });
  
	});
   response.json({status : true})
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);