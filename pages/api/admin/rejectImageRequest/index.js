const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.DB_HOST;
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

export default async function handler(req, res) {
    const imageInfo = req.body.imageRequest;
    const id = req.body.imageRequestId;
    console.log(id);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    let hashToUnpin = imageInfo.src.split('/ipfs/')[1];
    pinata.unpin(hashToUnpin).then(async (result) => {
        //handle results here
        console.log(result);
        await client.connect();
        try {
            const imageRequestCollection = client.db("primary").collection("imageRequests");
            await imageRequestCollection.findOneAndDelete({_id: new ObjectId(id)});
        } catch (e) {
            // TODO - handle errors
            console.error(e);
            await client.close();
            return res.status(500).send(e.message);
        }
    }).catch((err) => {
        //handle error here
        console.log(err);
        return res.status(500).send(err.message);
    });

    await client.close();
    res.status(200).end("successfully rejected image");
}