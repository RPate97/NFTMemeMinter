const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const { tokenId } = req.query
    if (!tokenId) {
        res.status(401).json({ error: 'did not send tokenId' });
    }
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const metadataCollection = client.db("primary").collection("metadata");
        const meme = await metadataCollection.findOne({tokenId: {$eq: tokenId}});
        if (meme) {
            res.status(200).json(JSON.stringify(meme, null, 4));
        } else {
            res.status(404).json({ error: 'meme not found' });
        }
    } catch(e) {
        res.status(500).json({ error: e.message })
    } finally {
        await client.close();
    }
}