const { MongoClient } = require('mongodb');
const url = require('url');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const queryObject = url.parse(req.url,true).query;
    const page = parseInt(queryObject.page);

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        const imageCollection = client.db("primary").collection("imageRequests");
        const imageRequests = await imageCollection.find().skip((page - 1) * 10).limit(10).toArray();
        if (imageRequests) {
            res.status(200).json({ imageRequests: imageRequests });
        } else {
            res.status(404).json({ error: 'imageRequests not found' });
        }
    } catch(e) {
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
}