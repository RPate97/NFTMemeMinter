const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;

// type textLocation = {
//     x: number,        // x location 
//     y: number,        // y location 
//     text: String,     // default caption 
//     rotation: number, // rotation angle 
//     height: number,   // text area height
//     width: number,    // text area width
//     key: number       // location key
// }

// type template = {
//   src: String,
//   width: number, 
//   height: number,
//   textLocations: [textLocation],
// }

// export default async (req, res) => {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//     await client.connect();
//     const templateCollection = client.db("primary").collection("templates");
//     await templateCollection.insertOne(req.body);
//   } catch(e) {
//     res.status(500).json({ error: e.message })
//   } finally {
//     await client.close();
//     res.status(200).json({ template: req.body })
//   }
// }