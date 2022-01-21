import axios from "axios";
import { APP_CONFIG } from "../../common/config";

export default async function handler(req, res) {
  // get access token
  const { accessToken } = req?.query;

  // if method is GET request and we have access token
  if (req.method === "GET" && accessToken) {
    const { data } = await axios.get(`${APP_CONFIG.ENDPOINT+accessToken}`);

    res.status(200).json(data);
  } else {
    // Handle any other HTTP method
    res.status(500).json({
      success: 0,
      message: "Request method not supported.",
    });
  }
}