const { MongoClient } = require('mongodb');
const url = require('url');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const queryObject = url.parse(req.url,true).query;
    const page = parseInt(queryObject.page);

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        const templateCollection = client.db("primary").collection("templateRequests");
        const templates = await templateCollection.find().skip((page - 1) * 10).limit(10).toArray();
        console.log(templates);
        if (templates) {
            res.status(200).json({ templates: templates });
        } else {
            res.status(404).json({ error: 'templates not found' });
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
}