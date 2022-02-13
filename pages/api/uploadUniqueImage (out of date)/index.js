const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;
const fs = require("fs");
var FileReader = require('filereader')
import { IncomingForm } from "formidable";
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
var jwt = require('jsonwebtoken');
const axios = require('axios');
const querystring = require('querystring');

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
        
        // ping image match with pinata url
        const params = new url.URLSearchParams({ src: src });
        const results = await axios.post(`${process.env.IMAGE_MATCH_BASE_URL}/search`, params.toString())
          .then(function (response) {
            return response.result;
          })
          .catch(function (error) {
            // handle deleting image on error
            console.log(error);
          });

        // check for results greater than threshhold, if > 1 then return list of similar images and delete requested image from pinata
        let closeEnough = [];
        results.forEach((el) => {
            if (el.score > 90) {
                closeEnough.push(el);
            }
        });

        const imgHash = src.split('/ipfs/')[1];
        if (closeEnough.length > 0) {
            pinata.unpin(imgHash).then((result) => {
                console.log(result);
            }).catch((err) => {
                //todo - handle error here
                console.log(err);
            });
            return res.status(401).json({results: closeEnough});
        }

        // else, add to mongodb so other people can use it
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        try {
            const baseImageCollection = client.db("primary").collection("baseImages");
            await baseImageCollection.insertOne({src: src, name: result.fields.imageName});
        } catch (e) {
            // TODO - handle errors
            console.error(e);
            await client.close();
            return res.status(500).send(e.message);
        }
        await client.close();

        // add image to image-match so it will remain unique
        const addParams = new url.URLSearchParams({ src: src, filepath: `/images/${imgHash}` });
        await axios.post(`${process.env.IMAGE_MATCH_BASE_URL}/add`, addParams.toString())
          .then(function (response) {
            console.log(response);
            return response.result;
          })
          .catch(function (error) {
            // Todo - handle error
            console.log(error);
          });

        // return image src
        res.status(200).json({src: src});
    } else {
        res.status(403).end("error, invalid request type");
    }
}