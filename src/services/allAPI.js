import commonAPI from './commonAPI'

const serverURL = "https://borrowly-server.onrender.com"



// Add a new item
export const addItemAPI = async (reqBody) => {
  return await commonAPI(
    'POST',
    `${serverURL}/items`,
    reqBody,
    ''
  )
}

// Get all items
export const getAllItemsAPI = async () => {
  return await commonAPI(
    'GET',
    `${serverURL}/items`,
    '',
    ''
  )
}

// Get one item by ID
export const getItemByIdAPI = async (id) => {
  return await commonAPI(
    'GET',
    `${serverURL}/items/${id}`,
    '',
    ''
  )
}



// Register user
export const registerUserAPI = async (reqBody) => {
  return await commonAPI(
    'POST',
    `${serverURL}/users`,
    reqBody,
    ''
  )
}

// Get user by email
export const getUserByEmailAPI = async (email) => {
  return await commonAPI(
    'GET',
    `${serverURL}/users?email=${email}`,
    '',
    ''
  )
}



// Create a borrow request
export const addBorrowRequestAPI = async (reqBody) => {
  return await commonAPI(
    'POST',
    `${serverURL}/borrowRequests`,
    reqBody,
    ''
  )
}

// Get borrow requests for a user
export const getMyRequestsAPI = async (borrowerName) => {
  return await commonAPI(
    'GET',
    `${serverURL}/borrowRequests?borrowerName=${borrowerName}`,
    '',
    ''
  )
}

// Get all borrow requests
export const getAllBorrowRequestsAPI = async () => {
  return await commonAPI(
    'GET',
    `${serverURL}/borrowRequests`,
    '',
    ''
  )
}

// Update borrow request status
export const updateBorrowRequestAPI = async (id, reqBody) => {
  return await commonAPI(
    'PATCH',
    `${serverURL}/borrowRequests/${id}`,
    reqBody,
    ''
  )
}

// Get items owned by a user
export const getMyItemsAPI = async (ownerName) => {
  return await commonAPI(
    'GET',
    `${serverURL}/items?ownerName=${ownerName}`,
    '',
    ''
  )
}

// Delete an item
export const deleteItemAPI = async (id) => {
  return await commonAPI(
    'DELETE',
    `${serverURL}/items/${id}`,
    '',
    ''
  )
}

// Update item
export const updateItemAPI = async (id, reqBody) => {
  return await commonAPI(
    'PATCH',
    `${serverURL}/items/${id}`,
    reqBody,
    ''
  )
}