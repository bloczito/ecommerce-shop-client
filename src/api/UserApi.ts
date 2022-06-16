import { AccountData } from "../types";
import axios from "../config/AxiosConfig";


const fetchUserInfo = (): Promise<AccountData> => {
	return axios.get("/user")
}

const updateUserInfo = (accountData: AccountData): Promise<void> => {
	return axios.post("/user", accountData)
}


export const userApi = {
	fetchUserInfo,
	updateUserInfo
}
