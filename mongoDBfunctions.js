//Pisanje po bazi
    require('dotenv').config();
    const uri = process.env.MONGODB_URI;     
    const { MongoClient } = require("mongodb"); 
    const mongoDB = new MongoClient(uri); 
    const myMongoDB = 'page';

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
// Funkciji pageRead se prosljedjuje mongodb kolekcija i query
// Vraca cijeli dokument koji odgovara query-u
  async function pageRead(coll, query){
    try {
      await mongoDB.connect();
      const database = mongoDB.db(myMongoDB);
      const mongoColl = database.collection(coll);
      const DBdoc = await mongoColl.findOne(query);
      return DBdoc;
    } finally {     
      await mongoDB.close();
    }

}



  module.exports =  {pageWrite, pageRead};