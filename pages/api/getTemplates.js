const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;

export default function getTemplates(req, res) {
    let templates = [];
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
    });

    res.status(200).json({ name: 'John Doe' })
}
  