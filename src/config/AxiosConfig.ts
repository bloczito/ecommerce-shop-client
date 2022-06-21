import axiosFactory from "axios";
import Cookies from "js-cookie";

// const {} = useContext(UserContext)

const axios = axiosFactory.create({
	baseURL: "http://localhost:8080",
	// transformResponse:

	headers: {
		// "Access-Control-Allow-Origin": "http://localhost:8080",
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

axios.interceptors.response.use(response => {

	// if (response.status === 401)

	return response.data
})

export default axios;
