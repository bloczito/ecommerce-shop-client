import { UserContextState } from "../types";
import { createContext, FC, ReactElement, useState } from "react";
import Cookies from "js-cookie";


const defaultState: UserContextState = {
	token: undefined,
	signOut: () => undefined
};

export const UserContext = createContext(defaultState);


export const UserContextProvider: FC<{children: ReactElement}> = ({children}) => {
	const [token, setToken] = useState<string | undefined>(Cookies.get("auth-token"));

	const signOut = () => {
		Cookies.remove("auth-token");
		setToken(undefined);
	}

	return (
		<UserContext.Provider value={{ token, signOut }}>
			{children}
		</UserContext.Provider>
	)
}
