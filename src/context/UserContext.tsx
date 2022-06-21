import { UserContextState } from "../types";
import { createContext, FC, ReactElement, useState } from "react";
import Cookies from "js-cookie";
import moment from "moment";


const defaultState: UserContextState = {
	token: undefined,
	signOut: () => undefined,
	signIn: () => undefined
};

export const UserContext = createContext(defaultState);


export const UserContextProvider: FC<{children: ReactElement}> = ({children}) => {
	const [token, setToken] = useState<string | undefined>(Cookies.get("auth-token"));

	const signOut = () => {
		Cookies.remove("auth-token");
		setToken(undefined);
	}

	const signIn = (newToken: string) => {
		setToken(newToken)
		Cookies.set("auth-token", newToken, {expires: moment().add(3600000, "milliseconds").date()})
	}

	return (
		<UserContext.Provider value={{ token, signOut, signIn }}>
			{children}
		</UserContext.Provider>
	)
}
