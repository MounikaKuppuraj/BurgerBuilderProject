import axios from 'axios';
const instance=axios.create({
    baseURL:'https://react-burger-builder-5993a.firebaseio.com'
})
export default instance;