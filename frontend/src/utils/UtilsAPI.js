export const api = "http://localhost:3001"

// Generate a unique token for storing your data on the backend server.
export const getToken = () => {
    let token = localStorage.token
    if (!token) {
        token = localStorage.token = Math.random().toString(36).substr(-8)
    }
    return token;
}

export const headers = {
    'Accept': 'application/json',
    'Authorization': getToken()
}