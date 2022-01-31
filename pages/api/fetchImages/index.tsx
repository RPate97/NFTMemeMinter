import { NextApiRequest, NextApiResponse } from "next";
import withAuth from "middleware/auth";
const { MongoClient } = require('mongodb');
const url = require('url');
const uri = process.env.DB_HOST;

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const queryObject = url.parse(req.url,true).query;
    const page = parseInt(queryObject.page);

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        const imageCollection = client.db("primary").collection("images");
        const images = await imageCollection.find().skip((page - 1) * 10).limit(10).toArray();
        if (images) {
            res.status(200).json({ imageRequests: images });
        } else {
            res.status(404).json({ error: 'images not found' });
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
}

export default withAuth(handler);