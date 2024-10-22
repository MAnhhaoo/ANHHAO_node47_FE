import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};



export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

// them interceptor
// b1 tao axiosInstance
export const axiosInstance = axios.create ({
  baseURL: `${BASE_URL}`
});
axiosInstance.interceptors.request.use(
(config)=>{
  // check flag requireAuth
  // neu requirAuth = true => truyen token vao header request
  // nguoc lai => binh thuong
  if(config.requireAuth){
    // lay access token  tu local storage
    let accessToken = localStorage.getItem('LOGIN_USER');
    if(accessToken){
      config.headers["token"] = accessToken;
    }
    return config;
  }
},
()=>{

}
);




// define function call API get list video tu` BE

export const getVideosAPI = async () => {
  try {
    let {data} = await axios.get(`${BASE_URL}/video/get-videos`) ;
    // const result = await axios.get(`${BASE_URL} /video/get-videos`)
    // console.log(result)
    return data ;
  } catch (error) {
    console.log("eorr api get list video")
  }
}



// define function call api get list type video from back end

export const getTypeAPI = async () =>{
  try {
    const {data} = await axiosInstance.get(`${BASE_URL}/video/get-types` , {
      requireAuth : true
    })
    return data ;
  }
  catch(erorr) {
    throw erorr
  }
}


// define function call api get list video by type_ib from back end
export const getVideoTypeIdAPI = async (typeID) =>{
  try {
    const {data} = await axios.get(`${BASE_URL}/video/get-list-video-type/${typeID}`);
    return data ;
  }
  catch(error){
    console.log("err api get list video by type_id")
  }
}



export const getVideoById = async (videoId) => {
  try {
      const {data} = await axios.get(`${BASE_URL}/video/get-video-detail/${videoId}`);
      return data;
  }
  catch(error){
    console.log("err api get video by id")
  }
}



export const signUp = async (payload) =>{
  try{
    const {data} = await axios.post(`${BASE_URL}/auth/sign-up` , payload)
    return data;
  }catch(error){
    console.log("erorr")
    throw error;
  }
}

export const loginAPI = async (payload) =>{
  try{
    const {data} = await axios.post(`${BASE_URL}/auth/login`, payload)
    return data ;
  }catch(erorr){
    throw erorr
  }
}

export const loginFBAPI = async (payload) =>{
  try {
    // payload: email , name , id
    const {data} = await axios.post(`${BASE_URL}/auth/login-fb`,payload);
    return data ;
  }
  catch(erorr){
    throw erorr;
  }
}


export const forgotPassAPI = async (payload) => {
  try{
    const {data} = await axios.post(`${BASE_URL}/auth/forgot-password`, payload)
    return data ;

  } catch (erorr) {
    throw erorr
  }
} 

export const changePassAPI = async (payload) =>{
  try {
    // payload: email , code , newPass
    const {data} = await axios.post(`${BASE_URL}/auth/change-password` , payload);
    return data ;
  } catch (error) {
    throw error
  }
}