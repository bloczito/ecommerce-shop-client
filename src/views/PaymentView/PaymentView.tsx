import React, { FC, useContext, useEffect, useState } from "react";
import {
	Box,
	Button,
	Container, Divider,
	Grid,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ContactData, CreateOrderResult } from "../../types";
import { Elements } from "@stripe/react-stripe-js";
import { BasketContext } from "../../context/BasketContext";
import BasketItemCard from "../../components/BasketItem/BasketItemCard";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { paymentApi } from "../../api/PaymentApi";
import { ordersApi } from "../../api/OrdersApi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { userApi } from "../../api/UserApi";
import { validate } from "email-validator";

const steps = ["Zaloguj się", "Adres", "Podsumowanie", "Płatność", "Gotowe"]

type Errors = {
	name?: string;
	email?: string;
	city?: string;
	street?: string;
	postcode?: string;
}


const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISH_ID!!}`, {locale: "pl"})



const PaymentView: FC = () => {
	const {token} = useContext(UserContext);
	const {items, clearBasket} = useContext(BasketContext)

	const navigate = useNavigate();

	const [activeStep, setActiveStep] = useState<number>(new URLSearchParams(useLocation().search).get("redirect_status") === "succeeded" ? 4 : 1);
	const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
	const [createOrderResult, setCreateOrderResult] = useState<CreateOrderResult | null>(null);
	const [contactData, setContactData] = useState<ContactData>({
		name: "", email: "", city: "", postcode: "", street: ""
	});
	const [errors, setErrors] = useState<Errors>({})

	const createPayment = (amount: number) => {
		paymentApi.createPayment(amount).then(res => setClientSecret(res.clientSecret));
	}



	useEffect(() => {
		if (activeStep === 4) {
			const contact = JSON.parse(localStorage.getItem("contactData") || "{}") as ContactData

			ordersApi.createOrder({
				...contact,
				customerName: contact.name,
				items: items.map(({quantity, product}) => ({quantity, productId: product.id}))
			}).then(result => {
				setCreateOrderResult(result)
				localStorage.removeItem("contactData");
				clearBasket();
			})
		}

		userApi.fetchUserInfo()
			.then(({city, customerName, postcode, street, email}) => setContactData({
				name: customerName || "",
				email: email || "",
				city: city || "",
				street: street || "",
				postcode: postcode || ""
			}))
	}, [])


	useEffect(() => {
		if (activeStep < 4) {
			const amount = items.map(({product, quantity}) => product.price * quantity).reduce((pv, cv) => pv + cv, 0)
			createPayment(amount)
		}
	}, [])


	useEffect(() => {
		if (!token) {
			navigate("/")
		}
	}, [token])


	const validateForm = () => {
		let isError = false;

		setErrors({})

		if (contactData.name === "") {
			setErrors(prevState => ({...prevState, name: "Muisz podać imię i nazwisko"}));
			isError = true;
		}

		if (!validate(contactData.email)) {
			setErrors(prevState => ({...prevState, email: "Podaj prawidłowy adres email"}));
			isError = true;
		}

		if (contactData.city === "") {
			setErrors(prevState => ({...prevState, city: "Muisz podać miasto"}));
			isError = true;
		}

		if (contactData.street === "") {
			setErrors(prevState => ({...prevState, street: "Muisz podać ulicę"}));
			isError = true;
		}


		if (contactData.postcode === "") {
			setErrors(prevState => ({...prevState, postcode: "Muisz podać kod pocztowy"}));
			isError = true;
		}

		if (!isError) {
			setActiveStep(prevState => prevState + 1);
			localStorage.setItem("contactData", JSON.stringify(contactData));
		}
	}


	return (
		<Container maxWidth="lg">
			<Stepper activeStep={activeStep} sx={{marginBottom: 5, marginTop: 5}}>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel color="black" >{label}</StepLabel>
					</Step>
				))}
			</Stepper>

			<Box component="div">
				{activeStep === 1 && (
					<Grid
						container
						direction="column"
						justifyContent="flex-start"
						alignItems="center"
						spacing={2}
					>
						<Grid item sx={{alignItems: "flex-start"}}>
							<Typography variant="h6">
								Dane kontaktowe
							</Typography>
						</Grid>

						<Grid item width={500}>
							<TextField
								name="name"
								label="Imię i nazwisko *"
								color="secondary"
								fullWidth
								value={contactData.name}
								onChange={e => setContactData(prev => ({...prev, name: e.target.value}))}
								error={!!errors.name}
								helperText={errors.name}
							/>
						</Grid>

						<Grid item width={500}>
							<TextField
								name="email"
								label="Email *"
								type="email"
								color="secondary"
								fullWidth
								value={contactData.email}
								onChange={e => setContactData(prev => ({...prev, email: e.target.value}))}
								error={!!errors.email}
								helperText={errors.email}
							/>
						</Grid>

						<Grid item width={500} mt={3}>
							<TextField
								name="city"
								label="Miasto *"
								fullWidth
								color="secondary"
								value={contactData.city}
								onChange={e => setContactData(prev => ({...prev, city: e.target.value}))}
								error={!!errors.city}
								helperText={errors.city}
							/>
						</Grid>

						<Grid item width={500}>
							<TextField
								name="street"
								label="Ulica i nr domu *"
								color="secondary"
								fullWidth
								value={contactData.street}
								onChange={e => setContactData(prev => ({...prev, street: e.target.value}))}
								error={!!errors.street}
								helperText={errors.street}
							/>
						</Grid>

						<Grid item width={500}>
							<TextField
								name="postcode"
								label="Kod pocztowy *"
								color="secondary"
								fullWidth
								value={contactData.postcode}
								onChange={e => setContactData(prev => ({...prev, postcode: e.target.value}))}
								error={!!errors.postcode}
								helperText={errors.postcode}
							/>
						</Grid>
					</Grid>
				)}
				{activeStep === 2 && (
					<Grid container spacing={5}>
						<Grid item xs={8}>
							{items.map((i, idx, arr) => (
								<>
									<BasketItemCard key={idx} item={i} summary/>
									{(idx + 1) !== arr.length && (
										<Divider/>
									)}
								</>
							))}
						</Grid>

						<Grid item xs={4}>
							<Typography variant="subtitle1" fontWeight="bold">
								Imię i nazwisko:
							</Typography>
							<Typography>
								{contactData.name}
							</Typography>

							<Typography variant="subtitle1" fontWeight="bold">
								Email:
							</Typography>
							<Typography>
								{contactData.email} <br/>
							</Typography>

							<Typography variant="subtitle1" fontWeight="bold">
								Adres dostawy:
							</Typography>
							<Typography>
								{contactData.street} <br/>
								{contactData.postcode}, {contactData.city} <br/>
							</Typography>
						</Grid>
					</Grid>
				)}
				{(activeStep === 3 && !!clientSecret) && (
					<Elements stripe={stripePromise} options={{clientSecret, appearance: {theme: "stripe"}}}>
						<PaymentForm setActiveStep={setActiveStep}/>
					</Elements>
				)}

				{activeStep === 4 && (
					<Grid container direction="column" justifyContent="center" alignItems="center">
						<CheckCircleIcon
							sx={{fontSize: 120}}
							color="success"
						/>

						<Typography variant="h5" mt={3} mb={3} fontWeight="bold">
							Zamówienie nr. {createOrderResult?.orderNumber} zostało złożone
						</Typography>

						<Button
							variant="contained"
							color="secondary"
							onClick={() => navigate(`/orders?orderId=${createOrderResult?.orderId}`)}
						>
							Przejdź do zamówienia
						</Button>
					</Grid>
				)}

			</Box>


			{activeStep < 3 && (
				<Box
					component="div"
					display="flex"
					justifyContent="space-between"
				>
					<Button
						variant="contained"
						disableElevation
						disabled={activeStep === 1}
						onClick={() => setActiveStep(prevState => prevState - 1)}
					>
						Wróć
					</Button>
					<Button
						variant="contained"
						disableElevation
						disabled={activeStep === 4}
						onClick={() => {
							if (activeStep !== 1)
								setActiveStep(prevState => prevState + 1)
							else
								validateForm()
						}}
					>
						Dalej
					</Button>
				</Box>
			)}
		</Container>
	)
}


export default PaymentView;
