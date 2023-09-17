import axios from 'axios'

const getGstCodeDetails = () => {
  console.log('getGstCodeDetails')
  return  axios.get('http://localhost:8080/getgstcodedetails')
  .then(response => {
    // setData(response.data);
    console.log(response.data);
    return response;
  })
  .catch(error => {
    // setError(error);
    console.log(error);
  })
};

const saveCompanyDetails=(companyrDetails)=>{
  console.log('companyrDetails',companyrDetails)
  axios.post('http://localhost:8080/savecompanydetails', 
    companyrDetails
  )
  .then(response => {
    return response;
  });
};

const getCompanyDetails = () => {
  return  axios.get('http://localhost:8080/getcompanydetails')
  .then(response => {
    console.log(response.data);
    return response;
  })
  .catch(error => {
    // setError(error);
    console.log(error);
  })
};

const UserService = {
getGstCodeDetails,
saveCompanyDetails,
getCompanyDetails
}



export default  UserService;
