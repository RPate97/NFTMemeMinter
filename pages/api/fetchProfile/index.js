const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;
import withAuth from "middleware/auth";

const handler = async (req, res) => {
    const address = req.user;
    if (!address) {
        res.status(401).json({ error: 'did not send user address' });
    }
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        const userCollection = client.db("primary").collection("users");
        const user = await userCollection.findOne({address: {$eq: address}});
        if (user) {
            res.status(200).json({ user: user });
        } else {
            res.status(404).json({ error: 'user not found' });
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
}

export default withAuth(handler);