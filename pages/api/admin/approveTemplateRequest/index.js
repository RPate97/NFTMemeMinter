const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.DB_HOST;

export default async function handler(req, res) {
    const template = req.body.template;
    const id = req.body.templateRequestId;
    console.log(id);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    try {
        const templateRequestCollection = client.db("primary").collection("templates");
        await templateRequestCollection.insertOne(template);
    } catch (e) {
        // TODO - handle errors
        console.error(e);
        await client.close();
        return res.status(500).send(e.message);
    }

    console.log(template._id);

    try {
        const templateRequestCollection = client.db("primary").collection("templateRequests");
        await templateRequestCollection.findOneAndDelete({_id: new ObjectId(id)});
    } catch (e) {
        // TODO - handle errors
        console.error(e);
        await client.close();
        return res.status(500).send(e.message);
    }

    await client.close();
    res.status(200).end("successfully requested template");
}