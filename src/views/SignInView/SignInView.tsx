import { FC } from "react";
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { useHref, useNavigate } from "react-router-dom";


const SignInView: FC = () => {
	const navigate = useHref("http://localhost:8080/login")


	return (
		<>
			<GoogleLoginButton style={{width: 500}} onClick={() => window.location.assign("http://localhost:8080/login")}/>
			<GithubLoginButton style={{width: 500}} onClick={() => window.location.assign("http://localhost:8080/login/github")}/>
		</>
	)

}

export default SignInView;
