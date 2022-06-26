import { FC } from "react";
import { Button, ButtonProps, Icon } from "@mui/material";


const GoogleButton: FC<ButtonProps> = (props) => (
	<Button
		{...props}
		startIcon={<img src={"/google-icon.png"} width={35}/>}
		variant="contained"
		sx={{
			...props.sx,
			fontSize: 18,
			backgroundColor: "white",
			"&:hover": {
				backgroundColor: "rgb(239, 240, 238)"
			}
		}}
	>
		Zaloguj przez Google
	</Button>
);


export default GoogleButton;
