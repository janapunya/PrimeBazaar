import axios from 'axios';
// https://primebazaarbackend.onrender.com
const instance =axios.create({
    baseURL:"https://primebazaarbackend.onrender.com",
    withCredentials:true    
});
export default instance;