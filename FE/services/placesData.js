import { axios } from "axios";

export const getPlaceSearch = async (keys) => {
    const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/locations/search',
        params: {
          query: keys,
          limit: '50',
          offset: '0',
          units: 'km',
          location_id: '1',
          currency: 'USD',
          sort: 'relevance',
          lang: 'vi' //or vi
        },
        headers: {
          'X-RapidAPI-Key': 'dfd82f7dc1msh79f889e9b674a2fp1d9bf5jsn06aaec52702a',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };
      
    
    const { data } = await axios(options)
    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
    return data
} 

export const getHotels = async (lat, lng) => {
  const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
    params: {
      latitude: lat,
      longitude: lng,
      limit: '30',
      currency: 'USD',
      distance: '2',
      open_now: 'false',
      lunit: 'km',
      lang: 'en_US'
    },
    headers: {
      'X-RapidAPI-Key': 'dfd82f7dc1msh79f889e9b674a2fp1d9bf5jsn06aaec52702a',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };
    
  
  const { data } = await axios(options)
  // axios.request(options).then(function (response) {
  //     console.log(response.data);
  // }).catch(function (error) {
  //     console.error(error);
  // });
  return data
} 