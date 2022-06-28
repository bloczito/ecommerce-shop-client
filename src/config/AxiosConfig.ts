import axiosFactory from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "https://shopp-server.azurewebsites.net/"

const axios = axiosFactory.create({
	baseURL: BASE_URL
});

axios.interceptors.request.use(config => {
	const token = Cookies.get("auth-token")

	if (!!token) {
		config.headers = {
			...config.headers,
			"Authorization": `Bearer ${token}`
		}
	}

	return config
})

axios.interceptors.response.use(response => {

	// if (response.status === 401)

	return response.data
})

export default axios;
