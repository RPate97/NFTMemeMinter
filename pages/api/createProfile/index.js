const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;
import withAuth from "middleware/auth";

const handler = async (req, res) => {
    const address = req.user;
    const handle = req.body.handle;
    const addedTokens = req.body.addedTokens;
    const memeIndex = req.body.memeIndex;
    if (!address) {
        res.status(401).json({ error: 'did not send user address' });
    }
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const userCollection = client.db("primary").collection("users");
        await userCollection.updateOne({address: {$eq: address}}, { $set: {handle: handle, addedTokens: addedTokens, memeIndex: memeIndex}});
        res.status(200).json({ message: 'updated profile' });
    } catch(e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
}

export default withAuth(handler);