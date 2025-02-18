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

  async getTransaction(date) {
    this.client.connect();
    let pengeluaranCollection = this.client.db(this.dbName).collection("pengeluaran");
    let pemasukanCollection = this.client.db(this.dbName).collection("pemasukan");
    let pengeluaranRes = await pengeluaranCollection.find({ time: { $lte: date } }).toArray();
    let pemasukanRes = await pemasukanCollection.find({ time: { $lte: date } }).toArray();
    let result = [...pengeluaranRes, ...pemasukanRes];
    return result.map(v => ({_id : v._id.toString(), name: v.name, amount: v.amount, date: v.time.toString() }))
  }
}

module.exports = Keuangan