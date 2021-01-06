import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userObject) => {
  const response = await axios.post(baseUrl, userObject)

  return response.data
}

export default { login }