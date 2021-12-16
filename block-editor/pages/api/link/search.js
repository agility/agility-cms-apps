import agility from '@agility/content-fetch'
import FuzzySearch from 'fuzzy-search'

export default async function handler(req, res) {

  //TODO: This needs env vars for the API and Sitemap Domain for this to work...

  // Process a GET request
  if (req.method === 'GET') {
    
    //create the Agility CMS content fetch client
    const api = agility.getApi({
        guid: '7f113aa6-u', //TODO: get these from env-vars
        apiKey: '', ////TODO: get these from env-vars
        isPreview: true,
    });

    //get the sitemap
    const sitemap = await api.getSitemapFlat({
        channelName: 'website',
        languageCode: 'en-us'
    })

    //use the query to filter matched urls from the sitemap
    const query = req.query.q;

    //convert sitemap to searchable array
    let searchableArray = [];
    for(const [key, value] of Object.entries(sitemap)) {
      searchableArray.push(value);
    }

    const searcher = new FuzzySearch(searchableArray, ['title', 'menuText', 'path']);

    const searchResults = searcher.search(query);

    const results = searchResults.map(item => {
      return {
        href: `${item.path}`, //TODO: these need to absolute URLs with the website domain specified, get this from env-vars
        name: item.title,
        description: item.name
      }
    })


    //return the uploaded file details
    res.status(200).json({ 
        success: true,
        items: results
    });
    
  } else {
    // Handle any other HTTP method
    res.status(500).json({ 
      success: 0,
      message: 'Request method not supported.'
    });
  }
}