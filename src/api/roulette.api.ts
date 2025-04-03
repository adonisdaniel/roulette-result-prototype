import axios from 'axios'
import { user } from '../shared/store/user.svelte'
import { browser } from '$app/environment';

let token = ''

if (browser) {
  token = localStorage.getItem('token') || ''
}


const ROULETTE_API = axios.create({
  baseURL: import.meta.env.VITE_ROULETTE_API
})

if (token) {
  ROULETTE_API.defaults.headers.common['x-token'] = token
  user.token = token
}

export default ROULETTE_API
