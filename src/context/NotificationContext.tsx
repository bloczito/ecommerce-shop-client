import { NotificationContextState } from "../types";
import React, { useState } from "react";
import { AlertColor } from "@mui/material";


const defaultState: NotificationContextState = {
	isOpen: false,
	type: "info",
	message: null,
	openNotification: () => console.error("No function defined"),
	closeNotification: () => console.error("No function defined")
}
export const NotificationContext = React.createContext(defaultState);

export const NotificationContextProvider: React.FC<{children: React.ReactElement}> = ({children}) => {
	const [message, setMessage] = useState<{
		isOpen: boolean,
		content: string | null,
		type: AlertColor
	}>({isOpen: false, content: null, type: "info"});

	const providerValue: NotificationContextState = {
		isOpen: message.isOpen,
		type: message.type,
		message: message.content,
		openNotification: (msg, msgType) => {
			setMessage({
				isOpen: true,
				content: msg,
				type: msgType ?? "info"
			});
		},
		closeNotification: () => setMessage(prev => ({...prev, isOpen: false}))
	}

	return (
		<NotificationContext.Provider value={providerValue}>
			{children}
		</NotificationContext.Provider>
	)
}
