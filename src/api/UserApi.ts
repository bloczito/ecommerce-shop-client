import { AccountData, SignInDto, SignUpDto } from "../types";
import axios from "../config/AxiosConfig";


const fetchUserInfo = (): Promise<AccountData> => {
	return axios.get("/user")
}

const updateUserInfo = (accountData: AccountData): Promise<void> => {
	return axios.post("/user", accountData)
}

const signUp = (dto: SignUpDto): Promise<void> => {
	return axios.post("/signUp", dto);
}

const signIn = (dto: SignInDto): Promise<string> =>
	axios
		.post(
			"/signIn",
			dto,
			{
				headers: {
					// "Allow-Access-Control-Origin": "localhost:8080"
				}
			}
		);

const checkEmail = (email: string): Promise<boolean> => axios.get("/isEmailAvailable", {params: { email }})

export const userApi = {
	fetchUserInfo,
	updateUserInfo,
	signUp,
	signIn,
	checkEmail
}
