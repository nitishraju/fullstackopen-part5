import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (userToken) => {
  token = userToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// const createBlog = () => {

// }

export default { setToken, getAll }