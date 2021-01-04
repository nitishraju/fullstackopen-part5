import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

export default { setToken, getAll, createBlog }