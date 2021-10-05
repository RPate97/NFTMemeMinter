import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import MulterGoogleCloudStorage from 'multer-cloud-storage';

const oneMegabyteInBytes = 1000000;
const outputFolderName = './public/uploads';

// const upload = multer({
//   limits: { fileSize: oneMegabyteInBytes * 2 },
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
//   /*fileFilter: (req, file, cb) => {
//     const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
//     cb(null, acceptFile);
//   },*/
// });

const uploadHandler = multer({
  storage: new MulterGoogleCloudStorage()
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadHandler.array('theFiles'));

apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
  // const filenames = fs.readdirSync(outputFolderName);
  // const images = filenames.map((name) => name);

  res.status(200).json({ data: "done" });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;