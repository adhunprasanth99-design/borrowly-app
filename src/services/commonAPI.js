import axios from 'axios'

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpMethod,
    url: url,
    data: reqBody,
    headers: reqHeader
  }

  return await axios(reqConfig)
}

export default commonAPI