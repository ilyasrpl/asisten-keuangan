const { ObjectId, MongoClient, ServerApiVersion } = require("mongodb")
require('dotenv').config();

class Keuangan{
  constructor(){
    this.uri = process.env.MONGO_URI;
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    this.dbName = "keuangan"
  }

  async addExpense(name, amount){
    this.client.connect();
    let collection = this.client.db(this.dbName).collection("pengeluaran");
    let res = await collection.insertOne({
      name: name,
      amount: amount,
      time: new Date()
    })
    return res
  }

  async addIncome(name, amount){
    this.client.connect();
    let collection = this.client.db(this.dbName).collection("pemasukan");
    let res = await collection.insertOne({
      name: name,
      amount: amount,
      time: new Date()
    })
    return res
  }
}

module.exports = Keuangan