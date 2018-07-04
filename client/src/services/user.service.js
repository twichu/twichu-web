import axios from 'axios';

axios.defaults.baseURL = 'http://twichu.ml';

const userService = {
  getProfile() {
    return new Promise((resolve, reject) => {
      axios.get('/api/auth/profile')
        .then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.status);
        });
    });
  },
  patchProfile(profile) {
    return new Promise((resolve, reject) => {
      axios.patch('/api/auth/profile', profile)
        .then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.status);
        });
    });
  },
};

export default userService;
