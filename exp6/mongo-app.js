const { MongoClient } = require('mongodb');

// Your Atlas connection string
const uri = "mongodb+srv://mailmdsana_db_user:fYMRtm5mD1XGDNqa@cluster0.hvmy19b.mongodb.net/myTestDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db("myTestDB");
    const collection = db.collection("users");

    // 1. Insert One
    const res1 = await collection.insertOne({
      name: "Ada Lovelace",
      age: 28,
      role: "Mathematician"
    });
    console.log("Inserted One:", res1.insertedId);

    // 2. Insert Many
    const res2 = await collection.insertMany([
      { name: "Grace Hopper", age: 85 },
      { name: "Alan Turing", age: 41 }
    ]);
    console.log("Inserted Many:", res2.insertedCount);

    // 3. Read
    const data = await collection.find().toArray();
    console.log("All Data:", data);

    // 4. Update
    await collection.updateOne(
      { name: "Alan Turing" },
      { $set: { age: 42 } }
    );
    console.log("Updated Alan Turing");

    // 5. Delete
    await collection.deleteOne({ name: "Grace Hopper" });
    console.log("Deleted Grace Hopper");

    // 6. List Databases
    const dbs = await client.db().admin().listDatabases();
    console.log("Databases:");
    dbs.databases.forEach(d => console.log(d.name));

  } catch (err) {
    console.log("Error:", err);
  } finally {
    await client.close();
  }
}

run();