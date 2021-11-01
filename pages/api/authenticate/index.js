const { MongoClient } = require('mongodb');
const uri = process.env.DB_HOST;
var jwt = require('jsonwebtoken');
const ethSigUtil = require("eth-sig-util");
var Web3 = require('web3');

export default async function handler(req, res) {
    var sig = req.body.sig;
    var address = req.body.address;

    if (!sig) {
        res.status(500).json({ error: 'did not send signature' });
    }
    if (!address) {
        res.status(500).json({ error: 'did not sig owner' });
    }

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const userCollection = client.db("primary").collection("users");
        const user = await userCollection.findOne({address: {$eq: address}});
        if (user?.nonce) {
            // get address from sig
            const recoveredAddress = ethSigUtil.recoverPersonalSignature({data: user.nonce, sig: sig});
            // convert to checksum address
            const checksumAddress = Web3.utils.toChecksumAddress(recoveredAddress)
            // Determine if it is the same address as the sender
            var match = false;
            if (checksumAddress == address) { match = true; }

            // If the signature matches the address supplied, create a token and update nonce
            if (match) {
                // update user nonce
                const nonce = require("crypto").randomBytes(64).toString('hex');
                await userCollection.updateOne({address: {$eq: address}}, { $set: {nonce: nonce}});
                // JSON web token for the owner that expires in 24 hours
                var token = jwt.sign({user: address, handle: user.handle}, process.env.JWT_KEY,  { expiresIn: '1d' });
                // return token
                res.status(200).json({ token: token });
            } else {
                // If the signature doesn’t match, error out
                res.send(500, { error: 'Signature did not match.'});
            }
        } else {
            res.status(500).json({ error: 'user nonce not found' });
        }
    } catch(e) {
        res.status(500).json({ error: e.message })
    } finally {
        await client.close();
    }
}