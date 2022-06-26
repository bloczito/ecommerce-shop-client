import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { NotificationContext } from "../../context/NotificationContext";


const Notification: React.FC = () => {
	const {message, isOpen, closeNotification, type} = useContext(NotificationContext)
	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={1500}
			onClose={closeNotification}
		>
			<Alert
				onClose={closeNotification}
				severity={type}
				sx={{width: "100%"}}
			>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default Notification;
