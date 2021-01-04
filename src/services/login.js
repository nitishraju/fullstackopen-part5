import axios from 'axios'
const baseUrl = '/api/login'

const getUser = async (userObject) => {
  const response = await axios.post(baseUrl, userObject)

  return response.data 
}

export default { getUser }