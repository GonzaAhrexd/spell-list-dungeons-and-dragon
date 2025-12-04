import axios from '../axios.settings'

export const pingServer = () => {
    return axios.get('/ping', {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    }
    );
}

