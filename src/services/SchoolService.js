import axios from 'axios'
const SERVER_URL = 'https://azcaabeachvolleyballbackend-ab02410049f8.herokuapp.com';
const SCHOOLS_REST_API_URL = SERVER_URL + '/findAllSchools';
const SCHOOL_DELETE = SERVER_URL + '/deleteSchool';
const SCHOOLS_ADD = SERVER_URL + '/schools/add';
const SCHOOL_FIND = SERVER_URL + '/schools';

class SchoolService {
    getSchoolImg(schoolName){        
       this.getSchool(8000).then((response) => {           
        return response.data.image
       });        
       return null
    }
    getSchools(){
        return axios.get(SCHOOLS_REST_API_URL)
    }
    deleteSchool(id){
        return axios.get(SCHOOL_DELETE + "/"+id)
    }
   
    addSchool(formData){
        return axios.post(SCHOOLS_ADD,formData)
    }
   
    getSchool(id){
        return axios.get(SCHOOL_FIND + "/"+id )
    }    
}
export default new SchoolService()
