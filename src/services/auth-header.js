export default function authHeader() {
  const data = JSON.parse(localStorage.getItem('data'));
  console.log('data', data.UserDetails.data.token)
  if (data && data.UserDetails.data.token) {
    return { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlemF6IiwiZXhwIjoxNjk0NTMyMzk3LCJpYXQiOjE2OTQ0OTYzOTd9.as2qzJz-vUOTGHGQRR-GZfSjvAfhUysnagSue9fc8WU',
             'mode':'cors'
 }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlemF6IiwiZXhwIjoxNjk0NTMyMzk3LCJpYXQiOjE2OTQ0OTYzOTd9.as2qzJz-vUOTGHGQRR-GZfSjvAfhUysnagSue9fc8WU'};
  }
}
