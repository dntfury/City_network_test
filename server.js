require("dotenv").config();
const express = require('express') // express framework

const db = require('./database');
const app = express();


app.use(express.json());

/**************************************************************************
CRUD Operations



GET Request
	GET /forum
	GET /post
	GET /user
	GET /forum/<id>
	GET /post/<id>
	GET /user/<id>

DELETE Request
	DELETE /forum/<id>
	DELETE /post/<id>

PUT Request
	PUT /forum/<id>
	PUT /post/<id>

POST Request
	POST /forum
	POST /post
	POST /user

***************************************************************************/
 




/*********************************
 			Task 1
	GET / 				-> hello world		 
	GET /forum			-> All Forum list with id
	GET /post			-> All posts list with details
	GET /user			-> All user list with only name
	GET /forum/<id>		-> Show details of that forum of that id
	GET /post/<id>		-> Show details of that post of that id
	GET /user/<id>		-> Show that user of that id only name

	<id> to be passed as a parameter in url
**********************************/

//1
app.get('/', (req, res) => {
    res.status(200).json({ 
        data: {
          string: "hello"
        }
      })
});

//2
app.get('/forum', async (req, res) => {
    //GET /forum should list existing forums
    try
	{
		const [result,fields] = await db.promise().query('SELECT * from forum');// getting data from DB
        res.status(200).json({ 
			data: {
			  forum_list: result
			}
		  })
	}
	catch(error)
	{
		console.log("Error in getting data form database ");
		console.log(error);
		res.status(500).send("500: Internal Server Error");	
	}
	//res.send(result);

});


app.get('/post',  async (req, res) => {
    //GET /post should list existing forum posts
    try
	{
		const [result,fields] = await db.promise().query('SELECT * from post');// getting data from DB
    
		res.status(200).json({ 
			data: {
			  post_list: result
			}
		  })
	}
	catch(error)
	{
		console.log("Error in getting data form   database ");
		console.log(error);
		res.status(500).send("500: Internal Server Error");	
	}

});

app.get('/user', async (req, res) => {
    //GET /user should list existing forum users. Do not return "password" or "admin" fields.
  	try
	{
		const [result,fields] = await db.promise().query('SELECT name from user'); // ONly user name is fetched
        
		res.status(200).json({ 
			data: {
			  user_list: result
			}
		  })
	}
	catch(error)
	{
		console.log("Error in getting data form   database ");
		console.log(error);
		res.status(500).send("500: Internal Server Error");	
	}
});


	/*
	GET with id with id specific part
	*/

app.get('/forum/:id', async (req, res) => {
    /*
		GET /forum/<id> should return information about the forum with an id that matches <id>
        Example GET /forum/1 should return the forum with id 1.8 
	*/
   try{
		const [result,fields] = await db.promise().query(`SELECT * from forum WHERE id=${req.params.id}`);// DB fetch
		res.status(200).json({
			data:{
				//status:"success",
				forum_result:result
			}
			
		});
	
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database fetch");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});


app.get('/post/:id', async (req, res) => {
    /*
		GET /post/<id> should return information about the post with id <id>.
    	const [result,fields] = await db.promise().query(`SELECT name from test_1 WHERE id=${req.params.id}`);
	*/
	
	try{
		const [result,fields] = await db.promise().query(`SELECT * from post WHERE id=${req.params.id}`);//DB fetch
		res.status(200).json({
			data:{
			//status:"success",
			post_result:result
			}
		});
	
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database fetch");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});


app.get('/user/:id', async (req, res) => {
    /*
		GET /user/<id> should return information about the user with id <id>. Do not return "password" or "admin" fields.
	*/

	try{
		const [result,fields] = await db.promise().query(`SELECT name from user WHERE id=${req.params.id}`);
		res.status(200).json({
			data:
			{
			//status:"success",
			user_result:result
			}
		});
	
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database insert");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});





/*********************************
 			Task 2

	DELETE /forum/<id>			-> Delete Forum with given id 
	DELETE /post/<id>			-> Delete posts with given id
	
	<id> to be passed as a parameter in url

			Task #7 (Bonus task is also done)

	Please refer to the comment below in app.delete('/forum/:id', async (req, res)
	delete all the post related to that specific forum_id to keep database clean and consistent. 
	This will in provide also satisfy the TASK #7

**********************************/

//DELETE /forum/<id> should delete the forum with id <id>.
app.delete('/forum/:id', async (req, res) => {

	/*
	If this request is called than the forum with provide id id deleted
	And also delete all the post related to that specicif forum_id to keep database clean and consistent. 
	This will in provide also satisfy the TASK #7
	*/
    try{
		const [result,fields] = await db.promise().query(`DELETE FROM forum WHERE id=${req.params.id}`);
		const [result1,fields1] = await db.promise().query(`DELETE FROM post WHERE forum_id=${req.params.id}`);
		res.status(200).json({
			data:{
			//status:"success",
			//response_1:result,
			//response_2:result1,
			response_string:"Deleted forum and post related to the forum id"
			}
		});
	
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database Delete");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});
//DELETE /post/<id> should delete the post with id <id>.
app.delete('/post/:id', async (req, res) => {

	try{
		const [result,fields] = await db.promise().query(`DELETE FROM post WHERE id=${req.params.id}`);
		res.status(200).json({
			datat:{
			//status:"success",
			//responce_1:result,
			response_string:"Successfully deleted"
			}
		});
	
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database Delete");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});





// PUT EDIT
app.put('/forum/:id', async (req, res) => {
    //PUT /forum/<id> should update data on forum with id <id>
	console.log("Updating forum");
	data1={
	"name":req.body.name    
	};
	try{
		//events=await db.query("");
		//const result = await db.promise().query('SELECT * from test_1');
        const [result,fields] = await db.promise().query(`UPDATE forum SET name='${data1.name}' WHERE id='${req.params.id}'`);
		console.log("Updating forum "+ req.body.name);
		res.status(200).json({
			status:"success",
			data:data1.name
		});
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database Update");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});

app.put('/post/:id', async (req, res) => {
     //PUT /post/<id> should update data on the post with id <id>.
	console.log("Updating forum");
	data1={
	"message":req.body.message    
	};
	try{
		//events=await db.query("");
		//const result = await db.promise().query('SELECT * from test_1');
        const [result,fields] = await db.promise().query(`UPDATE post SET message='${data1.message}' WHERE id='${req.params.id}'`);
		console.log("Updating post "+ req.body.name);
		res.status(200).json({
			status:"success",
			data:data1.message
		});
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database Update");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});










/*********************************
 			Task 4

	POST /forum/		-> Insert Forum with given name 
	POST /post/			-> Insert posts with given data
	
	Data to be passed in body in JSON format
	
**********************************/


//CREATE /forum to create a new forum
app.post('/forum', async (req,res)=>{
	console.log("Creating forum");
	data1={
	"name":req.body.name    
	};
	try{
		const [result,fields] = await db.promise().query(`INSERT INTO forum (name) VALUES ('${data1.name}')`);
		//console.log("Creating user "+ req.body.name);
		res.status(200).json({
			data:{
			status:"success",
			forum_name:data1.name
			}
		});
	}
	catch(error){
		console.log("Error in getting data or Erro in database insert");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});


//CREATE /post to create a new post
app.post('/post', async (req,res)=>{
	/*
		datetime will be according to current timme
		Date time is taken but not used the datatime will be set by itself 
		since a specfic foramte is needed and if not the request is failed by DB 
		So keeping in mind it has been done and if data time is passed correctly 
		Than commet the currentTime variable and in SQL query insteed of it pass the data1.created parameter it will work fine 

		The function is also cheking if there is post is having correct forum_id to keep data consistent and same could be done for user_id 
		but according to the task no such details have been provided so it was not done and 
		There is a scope of improving DB by foreign key but it may very well deviate from current tasks
		so it is not done to satisft the provided task which are neccessary for test but via comment 
		it to be noted that the point was noticed.   
	*/

	console.log("Creating post");
	data1={
	"forum_id":req.body.forum_id,
    "user_id":req.body.user_id,
    "message":req.body.message,
    "created":req.body.created    
	};
	try{
		const [result,field] = await db.promise().query(`SELECT COUNT(*) FROM forum WHERE id='${data1.forum_id}'`);
        //console.log(typeof result);
		var myJSON = JSON.stringify(result);
		//console.log(myJSON);
		var [a,b]=myJSON.split(":");
		console.log(b[0]);
		var currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
		if(b[0]==1)
		{
			const [result1,fields1] = await db.promise().query(`INSERT INTO post (forum_id,user_id,message,created)
			VALUES ('${data1.forum_id}','${data1.user_id}','${data1.message}','${currentTime}')`);
			//console.log("Creating user "+ req.body.name);
			res.status(200).json({
				data:
				{
					status:"success",
					message:data1.message
				}
				
			});
		
		}
		else
		{
			console.log("forum id is not valid!!!!");
			res.status(500).send("404 No frum with that id was found");
		}
		
		
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database insert");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});

//CREATE /user to create a new user
app.post('/user', async (req,res)=>{
	console.log("Creating user");
	data1={
	"name":req.body.name,
    "password":req.body.password,
    "admin":req.body.admin,   
	};
	/*
		It shuld be noted that the data must be in reqired formate , the test are not written to check data type 
	*/
	try{
		const [result,fields] = await db.promise().query(`INSERT INTO user (name,password,admin) VALUES ('${data1.name}','${data1.password}','${data1.admin}')`);
		//console.log("Creating user "+ req.body.name);
		res.status(200).json({
			datat:
			{
			status:"success",
			user_name:data1.name
			}	
		});
	}
	catch(error){
		console.log("Error in getting data form Param or Erro in database insert");
		console.log(error);
		res.status(500).send("500: Internal Server Error");
	}
});







//START
const port = process.env.PORT || 3001;
app.listen(port,() => {
    console.log("Serve is listning at " + port);
});