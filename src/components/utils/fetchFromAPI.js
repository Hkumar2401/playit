import axios from "axios";

const BASE_URL = 'https://youtube138.p.rapidapi.com/';

const options = {
    url: BASE_URL,
    params: {id: 'kJQP7kiw5Fk', hl: 'en', gl: 'US'},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  export const fetchFromApi = async (url) =>{

    const {data} = await axios.get(`${BASE_URL}/${url}`,
     options);
     
  }
  