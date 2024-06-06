import axios from 'axios'
const SERVER_URL = 'https://azcaabeachvolleyballbackend-ab02410049f8.herokuapp.com';
const USER_LOGIN_REST_API_URL = SERVER_URL + '/userlogin';
const USER_CREATE_USER_API = SERVER_URL + '/addUser';
const USER_FIND_ALL = SERVER_URL + '/findAllUsers'
const USER_DELETE = SERVER_URL + '/deleteUser'
class UserService {
    
    authenticateUser(user){
        return axios.post(USER_LOGIN_REST_API_URL,user)
    }
    saveUser(user){
        return axios.post(USER_CREATE_USER_API,user)
    }
    getUsers(){
        return axios.get(USER_FIND_ALL)
    }
    deleteUser(username){
        return axios.get(USER_DELETE + "/"+username)
    }
}

export default new UserService()
