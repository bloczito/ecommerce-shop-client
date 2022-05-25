import axiosFactory from "axios";

const axios = axiosFactory.create({
	baseURL: "http://localhost:8080",
	// transformResponse:

	headers: {
		"Access-Control-Allow-Origin": "*",
	}

});
axios.interceptors.response.use(response => response.data)

export default axios;
