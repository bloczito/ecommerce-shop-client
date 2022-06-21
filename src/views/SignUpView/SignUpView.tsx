import { FC, useState } from "react";
import { Button, Container, Grid, setRef, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../api/UserApi";


const WIDTH = 400;

const isInvalid = (field: string) => field == undefined  || field === ""

export const validateEmail = (email: string) => {
	return email
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const SignUpView: FC = () => {

	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("")
	const [pwd, setPwd] = useState<string>("")
	const [confirmPwd, setConfirmPwd] = useState<string>("")
	const [name, setName] = useState<string | undefined>(undefined)
	const [street, setStreet] = useState<string | undefined>(undefined)
	const [postcode, setPostcode] = useState<string | undefined>(undefined)
	const [city, setCity] = useState<string | undefined>(undefined)
	const [error, setError] = useState<{
		email?: string;
		pwd?: string;
		confirmPwd?: string;
		// name?: string;
		// street?: string;
		// postcode?: string;
		// city?: string
	}>({});


	const submitForm = async () => {
		let isError = false;

		if (isInvalid(email)) {
			setError(prevState => ({ ...prevState, email: "Musisz podać email" }));
			isError = true;
		} else if (!validateEmail(email)) {
			setError(prevState => ({ ...prevState, email: "Podaj prawidłowy adres email" }));
			isError = true;
		} else {
			setError(prevState => ({ ...prevState, email: undefined }));
		}

		const isAvailable = await userApi.checkEmail(email)

		if (!isAvailable) {
			setError(prevState => ({ ...prevState, email: "Podany adres email jest zajęty" }))
			isError = true;
		}
		console.log("A")


		if (isInvalid(pwd)) {
			setError(prevState => ({ ...prevState, pwd: "Musisz podać hasło" }));
			isError = true;
		} else if (pwd.length < 8) {
			setError(prevState => ({ ...prevState, pwd: "Hasło powinno posiadać minimum 8 znaków" }));
			isError = true;
		} else {
			setError(prevState => ({ ...prevState, pwd: undefined }));
		}

		console.log("B")

		if (isInvalid(confirmPwd)) {
			setError(prevState => ({ ...prevState, confirmPwd: "Musisz potwierdzić hasło" }));
			isError = true;
		} else if (pwd !== confirmPwd) {
			setError(prevState => ({ ...prevState, confirmPwd: "Hasła muszą być takie same" }));
			isError = true;
		} else {
			setError(prevState => ({ ...prevState, confirmPwd: undefined }));
		}
		console.log("C")

		console.log(isError)

		if (!isError) {
			userApi.signUp({ email, password: pwd, name, city, postcode, street })
				.then(() => navigate("/signIn"))
		}
		console.log("D")

	}

	return (
		<Container sx={{marginTop: 5}}>
			<Grid
				container
				flexDirection="column"
				justifyContent="start"
				alignItems="center"
				gap={3}
			>
				<Typography variant="h4" mb={4}>
					Rejestracja
				</Typography>

				<TextField
					label="Email"
					type="email"
					sx={{width: WIDTH}}
					color="secondary"
					onChange={e => setEmail(e.target.value)}
					value={email}
					required
					error={!!error.email}
					helperText={error.email}
					InputProps={{inputProps: {maxLength: 50}}}
				/>

				<TextField
					label="Hasło"
					type="password"
					sx={{width: WIDTH}}
					color="secondary"
					onChange={e => setPwd(e.target.value)}
					value={pwd}
					required
					error={!!error.pwd}
					helperText={error.pwd}
					InputProps={{inputProps: {minLength: 8, maxLength: 24}}}
				/>

				<TextField
					label="Potwierdź hasło"
					type="password"
					sx={{width: WIDTH}}
					color="secondary"
					onChange={e => setConfirmPwd(e.target.value)}
					value={confirmPwd}
					required
					error={!!error.confirmPwd}
					helperText={error.confirmPwd}
					InputProps={{inputProps: {minLength: 8, maxLength: 24}}}
				/>

				<TextField
					label="Imię i nazwisko"
					sx={{width: WIDTH}}
					color="secondary"
					onChange={e => setName(e.target.value)}
					value={name}
					InputProps={{inputProps: {maxLength: 30}}}
				/>

				<TextField
					label="Ulica i nr domu"
					sx={{width: WIDTH}}
					color="secondary"
					onChange={e => setStreet(e.target.value)}
					value={street}
					InputProps={{inputProps: {maxLength: 30}}}
				/>

				<TextField
					label="Kod pocztowy"
					sx={{width: WIDTH}}
					color="secondary"
					onChange={e => setPostcode(e.target.value)}
					value={postcode}
					InputProps={{inputProps: {maxLength: 10}}}
				/>

				<TextField
					label="Miasto"
					sx={{width: WIDTH}}
					color="secondary"
					onChange={e => setCity(e.target.value)}
					value={city}
					InputProps={{inputProps: {maxLength: 30}}}
				/>

				<Button
					variant="contained"
					sx={{width: WIDTH}}
					onClick={submitForm}
				>
					Zarejestruj
				</Button>

				<Typography>
					Masz już konto? <Link to="/signIn">Zaloguj się</Link>
				</Typography>

			</Grid>
		</Container>
	)
}


export default SignUpView;
