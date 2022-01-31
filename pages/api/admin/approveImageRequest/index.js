const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const imageInfo = req.body.imageRequest;
    delete imageInfo._id;
    const id = req.body.imageRequestId;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    try {
        const imageRequestCollection = client.db("primary").collection("images");
        await imageRequestCollection.insertOne(imageInfo);
    } catch (e) {
        // TODO - handle errors
        console.error(e);
        await client.close();
        return res.status(500).send(e.message);
    }

    console.log(id);

    try {
        const imageRequestCollection = client.db("primary").collection("imageRequests");
        await imageRequestCollection.findOneAndDelete({_id: new ObjectId(id)});
    } catch (e) {
        // TODO - handle errors
        console.error(e);
        await client.close();
        return res.status(500).send(e.message);
    }

    await client.close();
    res.status(200).end("successfully requested template");
}