/**
 * @typedef {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} RequestMethod 
 */

/**
 * @param {Object} requestData 
 * @param {RequestMethod} requestData.method 
 * @param {string} requestData.path 
 * @param {any | undefined} requestData.body 
 * @returns {Promise} 
 */
const request = ({ method, path, body=undefined }) => {
    const headers = {
        'Content-Type': 'application/json'
    }

    const options = {
        method,
        headers
    }

    if (!!body && method !== 'GET'  && method !== 'DELETE') {
        options.body = JSON.stringify(body)
    }

    return new Promise((resolve, reject) => {
        fetch(`${import.meta.env.VITE_SERVER_ORIGIN}${path}`, options)
            .then(response => {
                if (!response.ok) {
                    return response.json()
                        .then(errorData => {
                            reject(errorData ?? new Error('Ошибка сервера'))
                        })
                        .catch(() => {
                            reject(new Error('Ошибка сервера'))
                        })
                } if (response.status === 204) {
                    return resolve(null)
                }
                return response.json()
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const httpService = {
    /**
     * @param {string} path 
     * @returns {Promise} 
     */
    get: (path) => {
        return request({ method: 'GET', path })
    },
    /**
     * @param {string} path 
     * @param {any} body 
     * @returns {Promise} 
     */
    post: (path, body) => {
        return request({ method: 'POST', path, body })
    },
    /**
     * @param {string} path 
     * @param {any} body 
     * @returns {Promise} 
     */
    patch: (path, body) => {
        return request({ method: 'PATCH', path, body })
    },
    /**
     * @param {string} path 
     * @returns {Promise} 
     */
    delete: (path) => {
        return request({ method: 'DELETE', path})
    }
}

export { httpService, httpService as default }
