import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { NotificationContext } from "../../context/NotificationContext";


const Notification: React.FC = () => {
	const {message, closeNotification} = useContext(NotificationContext)
	return (
		<Snackbar
			open={!!message}
			autoHideDuration={4000}
			onClose={closeNotification}
		>
			<Alert
				onClose={closeNotification}
				security="success"
				sx={{width: "100%"}}
			>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default Notification;
