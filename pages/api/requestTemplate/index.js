const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;
const fs = require("fs");
var FileReader = require('filereader')
import { IncomingForm } from "formidable";
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
var jwt = require('jsonwebtoken');

export const config = {
    api: {
        bodyParser: false,
    },
}  

const asyncParse = (req) =>
    new Promise((resolve, reject) => {
        const form = new IncomingForm({ multiples: true });
        form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
            resolve({ fields, files });
        });
    });

export default async function handler(req, res) {
    // TODO - add input validation

    if (req.method === "PUT") {
        const result = await asyncParse(req);
        let stream = fs.createReadStream(result.files.image.filepath);   
        let userAddress;
        jwt.verify(result.fields.token, process.env.JWT_KEY, function(err, decoded) {
            if (err) { 
                console.error(err);
                return res.send(401, { error: 'Failed to authenticate token'}); 
            } else {
                userAddress = decoded.user;
            };
        }); 

        // pin image file
        const options = {
            pinataMetadata: {
                name: "upload-test",
                keyvalues: {}
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        let src = await pinata.pinFileToIPFS(stream, options).then((result) => {
            return `https://dankminter.mypinata.cloud/ipfs/${result.IpfsHash}`;
        }).catch((err) => {
            //handle error here
            console.log(err);
            res.status(402).send("error, could not pin file to ipfs");
            return false;
        });
        if (src === false) {
            return;
        }
        let template = JSON.parse(result.fields.template);
        template.src = src;
        template.requestedBy = userAddress;

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        try {
            const templateRequestCollection = client.db("primary").collection("templateRequests");
            await templateRequestCollection.insertOne(template);
        } catch (e) {
            // TODO - handle errors
            console.error(e);
            await client.close();
            return res.status(500).send(e.message);
        }

        await client.close();
        res.status(200).end("successfully requested template");
    } else {
        res.status(403).end("error, invalid request type");
    }
}