import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { history } from '../index';
export const config = {
  setCookie: (name:string, value:string, days:number) => {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getCookie: (name:string) => {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name:string) => {
    document.cookie =
      name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
  getStore: (name:string) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  setStore: (name:string, value:any) => {
    localStorage.setItem(name, value);
  },
  setStoreJson: (name:string, value:any) => {
    let json = JSON.stringify(value);
    localStorage.setItem(name, json);
  },
  getStoreJson: (name:string) => {
    if (localStorage.getItem(name)) {
        let result:any = localStorage.getItem(name)
      return JSON.parse(result);
    }
    return null;
  },
  ACCESS_TOKEN: 'accessToken',
  USER_LOGIN: 'userLogin',
  USER_INFO: 'userInfo'
};

export const {
  setCookie,
  getCookie,
  setStore,
  getStore,
  setStoreJson,
  getStoreJson,
  ACCESS_TOKEN,
  USER_LOGIN,
  USER_INFO
} = config;

const DOMAIN = 'https://airbnbnew.cybersoft.edu.vn/api';
const TOKEN_CYBERSOFT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU';
/* cấu hình request cho tất cả api - response cho tất cả api trả về */

// cấu hình domain gửi đi
export const http:any = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

// Add a request interceptor
http.interceptors.request.use(
  (config:AxiosRequestConfig) => {
    const token = getStoreJson(ACCESS_TOKEN);
    config.headers = {
      ...config.headers,
      token: token,
      TokenCybersoft: TOKEN_CYBERSOFT,
    };
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error:any) => {
    Promise.reject(error);
  }
);

/* Cấu hình kêt quả trả về */

http.interceptors.response.use(
  (response:AxiosResponse) => {
    return response;
  },
  (err:any) => {
    //const originalRequest = err.config
    if (err.response.status === 400 || err.response.status === 404) {
    //   history.push('/');
      return Promise.reject(err);
    }
    if (err.response.status === 401 || err.response.status === 403) {
    //   history.push('/login');
      // alert('Token không hợp lệ ! Vui lòng đăng nhập lại !');
      console.log(err)
      return Promise.reject(err);
    }
  }
);
/*Status code:
  400: tham số gửi lên không hợp lệ => kết quả không tìm được (Bad Request);
  404: tham số gửi lên hợp lệ nhưng không tìm thấy => có thể bị xoá rồi (not found);
  200: ok, thành công;
  201: đã được tạo thành công => (mình đã tạo rồi sau đó request tiếp thì sẽ trả 201) (Created)
  401: không có quyền truy cập vào api đó (Unauthorize - có thể do token không hợp lệ hoặc bị admin chặn)
  403: chưa đủ quyền truy cập vào api đó (ForBiden - token hợp lệ tuy nhiên token đó chưa đủ quyền truy cập vào api)
  500: Lỗi xảy ra tại server (Nguyên nhân có thể frontend gửi dữ liệu không hợp lệ => backend trong quá trình xử lý code gây ra lỗi hoặc do backend code bị lỗi => Error in server )
 */