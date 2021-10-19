const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const address = req.body.address;
    if (!address) {
        res.status(401).json({ error: 'did not send user address' });
    }
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const userCollection = client.db("primary").collection("users");
        const user = await userCollection.findOne({address: {$eq: address}});
        if (user?.nonce) {
            res.status(200).json({ nonce: user.nonce });
        } else {
            const nonce = require("crypto").randomBytes(64).toString('hex');
            await userCollection.insertOne({ address: address, nonce: nonce });
            res.status(200).json({ nonce: nonce });
        }
    } catch(e) {
        res.status(500).json({ error: e.message })
    } finally {
        await client.close();
    }
}