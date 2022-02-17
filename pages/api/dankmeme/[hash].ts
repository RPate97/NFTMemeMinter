const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const { hash } = req.query
    if (!hash) {
        res.status(401).json({ error: 'did not send meme hash' });
    }
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const metadataCollection = client.db("primary").collection("metadata");
        const meme = await metadataCollection.findOne({hash: {$eq: hash}});
        if (meme) {
            res.status(200).json(JSON.stringify(meme, null, 4));
        } else {
            res.status(404).json({ error: 'meme not found' });
        }
    } catch(e) {
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
}