import axios from "axios";

export default async function handler(req, res) {
  // get access token
  const accessToken = req.query.accessToken;

  // if method is GET request and we have access token
  if (req.method !== "POST" && accessToken) {
    // options for formstack api call
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axios.get(
      "https://www.formstack.com/api/v2/form.json?folders=false",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const forms = data.forms;

    res.status(200).json({ forms });
  } else {
    // Handle any other HTTP method
    res.status(500).json({
      success: 0,
      message: "Request method not supported.",
    });
  }
}
