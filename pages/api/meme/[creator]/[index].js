const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const { creator, index } = req.query
    if (!creator || !index) {
        res.status(401).json({ error: 'did not send handle and/or index' });
    }
    console.log(creator);
    console.log(index);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const linkCollection = client.db("primary").collection("memelinks");
        const link = await linkCollection.findOne({creator: {$eq: creator}});
        console.log(link);
        if (link) {
            res.redirect(`/meme/${link.memeHash}`);
        } else {
            res.status(404).json({ error: 'meme not found' });
        }
    } catch(e) {
        res.status(500).json({ error: e.message })
    } finally {
        await client.close();
    }
}