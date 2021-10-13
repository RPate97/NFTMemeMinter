import { Storage } from '@google-cloud/storage';

export default async function handler(req, res) {
    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
        },
    });
    console.log("made object");
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const file = bucket.file(req.query.file);
    const options = {
        expires: Date.now() + 1 * 60 * 1000, //  1 minute,
        fields: { 'x-goog-meta-test': 'data' },
    };
    console.log("send options");
    const [response] = await file.generateSignedPostPolicyV4(options);
    console.log(file.publicUrl());
    const filePath = file.publicUrl();
    res.status(200).json({ filePath: filePath });
}