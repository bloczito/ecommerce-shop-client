import { FC } from "react";
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Box, Grid } from "@mui/material";


const SignInView: FC = () => {
	return (
		<Box
		// 	sx={{
		// 	width: "100%",
		// 	height: 600,
		// 	position: "absolute",
		// 	top: "50%",
		// 	left: "50%",
		// 	transform: "translate(-50%, -50%)"
		// }}
		>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				style={{minHeight: 600}}
				gap={5}
			>
				<GoogleLoginButton style={{width: 500}} onClick={() => window.location.assign("http://localhost:8080/login")}/>
				<GithubLoginButton style={{width: 500}} onClick={() => window.location.assign("http://localhost:8080/login/github")}/>
			</Grid>
		</Box>
	)

}

export default SignInView;
