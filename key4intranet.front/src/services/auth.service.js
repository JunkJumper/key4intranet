import axios from 'axios'
import router from '@/router'
import store from '../store'

const API_URL = process.env.VUE_APP_API_URL_BASE + 'api/auth'

class AuthService {
    login(user) {
        return axios.post(API_URL, {
                User: user.username,
                Pass: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }
}

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch('auth/logout');
            router.push({ path: '/login' });
        }
        return error;
    }
)

export default new AuthService();