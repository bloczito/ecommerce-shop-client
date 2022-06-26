import { FC } from "react";
import { Button, ButtonProps} from "@mui/material";


const GitHubButton: FC<ButtonProps> = (props) => (
	<Button
		{...props}
		startIcon={<img src={"/github-icon.png"} width={35}/>}
		variant="contained"
		sx={{
			...props.sx,
			color: "white",
			fontSize: 18,
			backgroundColor: "rgb(51, 51, 51)",
			"&:hover": {
				backgroundColor: "rgb(85, 85, 85)"
			}
		}}
	>
		Zaloguj przez GitHub
	</Button>
);


export default GitHubButton;
