import agilityMgmt from '@agility/content-management'
import sizeOf from 'image-size'
import { getNewFileName } from '../../../utils/imageUtils';
import axios from 'axios'

export default async function handler(req, res) {
  // Process a POST request
  if (req.method === 'POST') {
    
    //set up Agility CMS Management client
    const api = agilityMgmt.getApi({
        location: req.body.location,
        websiteName: req.body.websiteName,
        securityKey: req.body.securityKey
    });

    //download the image from Url
    const imageReq = await axios.get(req.body.url, { responseType: 'stream'});
    const fileContent = imageReq.data;
    

    //build a unique filename with timestamp
    let fileName = req.body.url.substring(req.body.url.lastIndexOf('/')+1);
    fileName = getNewFileName(fileName);

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
            url: uploadRes.url
        }
    });
    
  } else {
    // Handle any other HTTP method
    res.status(500).json({ 
      success: 0,
      message: 'GET request not supported.'
    });
  }
}