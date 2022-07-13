import { AccountData, SignInDto, SignUpDto } from "../types";
import axios from "../config/AxiosConfig";


const fetchUserInfo = (): Promise<AccountData> => {
	return axios.get("/users")
}

const updateUserInfo = (accountData: AccountData): Promise<void> => {
	return axios.put("/users", accountData)
}

const signUp = (dto: SignUpDto): Promise<void> => {
	return axios.post("/sign_up", dto);
}

const signIn = (dto: SignInDto): Promise<string> =>
	axios
		.post(
			"/sign_in",
			dto,
			{
				headers: {
					// "Allow-Access-Control-Origin": "localhost:8080"
				}
			}
		);

const checkEmail = (email: string): Promise<boolean> => axios.get("/is_email_available", {params: { email }})

export const userApi = {
	fetchUserInfo,
	updateUserInfo,
	signUp,
	signIn,
	checkEmail
}
