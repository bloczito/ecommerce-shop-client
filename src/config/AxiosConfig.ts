import axiosFactory from "axios";
import Cookies from "js-cookie";

const axios = axiosFactory.create({
	baseURL: "http://localhost:8080",
	// transformResponse:

	headers: {
		// "Access-Control-Allow-Origin": "*",
		// "Authorization": Cookies.ge
	}


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

axios.interceptors.response.use(response => response.data)

export default axios;
