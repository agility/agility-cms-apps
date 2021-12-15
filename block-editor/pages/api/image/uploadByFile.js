import middleware from '../../../middleware/middleware'
import nextConnect from 'next-connect';
import agilityMgmt from '@agility/content-management'
import fs from 'fs'
import sizeOf from 'image-size'
import { getNewFileName } from '../../../utils/imageUtils';

//this uses a custom handler so that it can parse an image and other data-attributes - next.js doesn't handle this out of the box
const handler = nextConnect();

handler.use(middleware);

handler.post(async(req, res) => {
    
    //set up Agility CMS Management client
    const api = agilityMgmt.getApi({
        location: req.body.location,
        websiteName: req.body.websiteName,
        securityKey: req.body.securityKey
    });
    
    //parse the image from the request
    const image = req.files.image[0];
    console.log(`Image from Request`, image);
    
    //get the dimensions of the image
    const size = sizeOf(image.path);
    console.log(`Image dimensions`, size);

    //get the contents of the image
    let fileContent = fs.createReadStream(image.path)
    
    //build a unique filename with a timestamp
    const fileName = getNewFileName(image.originalFilename);

    //upload the file to Agility CMS
    const uploadRes = await api.uploadMedia({
      fileName,
      fileContent,
      mediaFolder: req.body?.assetFolder
    });

    console.log(`Image upload Response`, uploadRes);

    //return the uploaded file details
    res.status(200).json({ 
        success: 1,
        file: {
            url: uploadRes.url,
            size,
        }
    });

});


export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;