import { FC, useContext, useState } from "react";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	InputAdornment,
	TextField,
	Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import { validateEmail } from "../SignUpView/SignUpView";
import { userApi } from "../../api/UserApi";
import { UserContext } from "../../context/UserContext";

const INPUT_WIDTH = 400;

const SignInView: FC = () => {
	const [searchParams] = useSearchParams();
	const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errors, setErrors] = useState<{email?: string, pwd?: string}>({})
	const [authError, setAuthError] = useState<string | undefined>(undefined)

	const navigate = useNavigate();
	const {signIn} = useContext(UserContext)

	const handleRedirect = (url: string) => {
		if (searchParams.get("redirectPayment") != null && searchParams.get("redirectPayment") === "true") {
			localStorage.setItem("redirectUrl", "/payment")
		}
		window.location.assign(url)
	}

	const submitForm = () => {
		let isError = false;

		if (email === "") {
			setErrors(prevState => ({...prevState, email: "Musisz podać email"}));
			isError = true;
		} else if (!validateEmail(email)) {
			setErrors(prevState => ({...prevState, email: "Podaj prawidłowy adres email"}))
			isError = true;
		} else {
			setErrors(prevState => ({...prevState, email: undefined}));
		}


		if (password === "") {
			setErrors(prevState => ({...prevState, pwd: "Podaj hasło"}));
			isError = true;
		} else if (password.length < 8) {
			setErrors(prevState => ({...prevState, pwd: "Hasło powinno zawierać pomiędzy 8 a 24 znaki"}));
			isError = true;
		} else {
			setErrors(prevState => ({...prevState, pwd: undefined}));
		}

		if (!isError) {
			userApi.signIn({email, password})
				.then(
					token => {
						signIn(token)
						navigate("/")
					},
					() => setAuthError("Nieprawidłowy email lub hasło")
				)
		}
	}


	return (
		<Container sx={{marginTop: 4}}>
			<Box display="flex" justifyContent="center">
				<Avatar sx={{m: 1, bgcolor: "secondary.main", width: 90, height: 90}}>
					<LockOutlinedIcon sx={{fontSize: 70}}/>
				</Avatar>
			</Box>

			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				style={{marginTop: 40}}
				gap={5}
			>
				<TextField
					label="Email"
					color="secondary"
					sx={{width: INPUT_WIDTH}}
					value={email}
					required
					onChange={e => setEmail(e.target.value)}
					InputProps={{inputProps: {maxLength: 40}}}
					error={!!errors.email}
					helperText={errors.email}
				/>

				<TextField
					label="Hasło"
					color="secondary"
					type={isPwdVisible ? "text" : "password"}
					sx={{width: INPUT_WIDTH}}
					required
					InputProps={{
						endAdornment: (
							<InputAdornment position="end" onClick={() => setIsPwdVisible(prevState => !prevState)} sx={{cursor: "pointer"}}>
								{isPwdVisible ? <Visibility/> : <VisibilityOff/>}
							</InputAdornment>
						),
						inputProps: {minLength: 8, maxLength: 24}
					}}
					value={password}
					onChange={e => setPassword(e.target.value)}
					error={!!errors.pwd}
					helperText={errors.pwd}
				/>

				{authError && (
					<Alert severity="error" variant="outlined" style={{width: 368}}>
						{authError}
					</Alert>
				)}

				<Button
					variant="contained"
					sx={{width: INPUT_WIDTH}}
					onClick={submitForm}
				>
					Zaloguj
				</Button>

				<Typography>
					Nie masz konta? <Link to="/signUp">Zarejestruj się</Link>
				</Typography>

				<Divider sx={{width: INPUT_WIDTH}}>
					<Typography>Lub</Typography>
				</Divider>

				<GoogleLoginButton
					style={{width: INPUT_WIDTH}}
					text="Zaloguj przez Google"
					onClick={() => handleRedirect("http://localhost:8080/login")}
				/>
				<GithubLoginButton
					style={{width: INPUT_WIDTH}}
					text="Zaloguj przez GitHub"
					onClick={() => handleRedirect("http://localhost:8080/login/github")}
				/>
			</Grid>



		</Container>
		// <div></div>
	)
}

export default SignInView;
