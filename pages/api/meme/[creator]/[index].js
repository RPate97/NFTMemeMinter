import { create } from 'eslint/lib/rules/*';

const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const { creator, index } = req.query
    if (!create || !index) {
        res.status(401).json({ error: 'did not send handle and/or index' });
    }
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const linkCollection = client.db("primary").collection("memelinks");
        const link = await metadataCollection.findOne({creator: {$eq: creator}, memeIndex: { $eq: index }});
        if (link) {
            res.redirect(`/${link.memeHash}`);
        } else {
            res.status(404).json({ error: 'meme not found' });
        }
    } catch(e) {
        res.status(500).json({ error: e.message })
    } finally {
        await client.close();
    }
}