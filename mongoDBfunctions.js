//Pisanje po bazi
    const uri = "mongodb+srv://ismarosmanovic04:hCprY70OQEnq3yod@ismardb.s36za.mongodb.net/?retryWrites=true&w=majority&appName=ismarDB";     
    const { MongoClient } = require("mongodb"); 
    const mongoDB = new MongoClient(uri); 
    const mongoDBcoll = 'page';




  async function pageWrite(pageColl, obj, res) {
   
    try {
      console.log('Conecting to DB...')
      await mongoDB.connect();
      console.log("Connected successfully to DB");
      const db = mongoDB.db(mongoDBcoll);
      const result = await db.collection(pageColl).insertOne(obj);
      console.log("1 document inserted", result);
      
      } catch (err) {
      console.error("An error occurred:", err);
      res.redirect('/servererror');
    } finally {
         await mongoDB.close();
    }
  }

  async function pageRead(pageDoc, query){
    try {
      await client.connect();
      const database = client.db(mongoDBcoll);
      const pageUsers = database.collection(pageDoc);
      const pageUserName = await pageUsers.findOne(query);

      if(pageUserName == null){
        return null;
      }else{
        return pageUserName.Password
      }
    } finally {     
      await client.close();
    }

}



  module.exports =  {pageWrite, pageRead};