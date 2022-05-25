import { NotificationContextState } from "../types";
import React, { useState } from "react";
import { NotificationType } from "../types/MiscTypes";


const defaultState: NotificationContextState = {
	isOpen: false,
	message: null,
	openNotification: () => {},
	closeNotification: () => {}
}
export const NotificationContext = React.createContext(defaultState);

export const NotificationContextProvider: React.FC<{children: React.ReactElement}> = ({children}) => {
	const [message, setMessage] = useState<{
		isOpen: boolean,
		content: string | null,
		type: NotificationType
	}>({isOpen: false, content: null, type: "info"});

	const providerValue: NotificationContextState = {
		isOpen: message.isOpen,
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
