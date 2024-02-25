import axios from 'axios';

const mediaLinksEndpoint = 'api/user-guids-links';

const getMediaLinks = () => {
  return axios.get(mediaLinksEndpoint);
};

export { getMediaLinks };
