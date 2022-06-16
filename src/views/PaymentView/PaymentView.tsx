import React, { FC, useContext, useEffect, useState } from "react";
import {
	Box,
	Button,
	Container, Divider,
	Grid, Icon,
	Step,
	StepLabel,
	Stepper,
	TextField,
	TextFieldProps,
	Typography
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ContactData, CreateOrderResult } from "../../types";
import { useController, UseControllerProps, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Elements } from "@stripe/react-stripe-js";
import { BasketContext } from "../../context/BasketContext";
import BasketItemCard from "../../components/BasketItem/BasketItemCard";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { paymentApi } from "../../api/PaymentApi";
import { ordersApi } from "../../api/OrdersApi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = ["Zaloguj się", "Adres", "Podsumowanie", "Płatność", "Gotowe"]


const schema = object({
	name: string().required(),
	email: string().required(),
	city: string().required(),
	street: string().required(),
	houseNumber: string().required(),
	postcode: string().required(),
})

const CustomInput: React.FC<UseControllerProps<ContactData> & TextFieldProps> = ({helperText, label, ...props}) => {
	const {field, fieldState} = useController(props);

	return (
		<TextField
			error={!!fieldState.error?.message}
			helperText={fieldState.error?.message && (helperText || "Wypełnij to pole")}
			{...props}
			{...field}
			required={false}
			label={label && `${props.required ? label + " *" : label }`}
			fullWidth
		/>
	)
}


const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISH_ID!!}`, {locale: "pl"})



const PaymentView: FC = () => {
	const {token} = useContext(UserContext);
	const {items, clearBasket} = useContext(BasketContext)

	const navigate = useNavigate();

	// const [activeStep, setActiveStep] = useState<number>(new URLSearchParams(useLocation().search).get("redirect_status") === "succeeded" ? 4 : 1);
	const [activeStep, setActiveStep] = useState<number>(4);
	const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
	const [createOrderResult, setCreateOrderResult] = useState<CreateOrderResult | null>({ orderId: 23, orderNumber: "202260008" });
	const [contactData, setContactData] = useState<ContactData>({
		name: "", email: "", city: "", postcode: "", houseNumber: "", street: ""
	});

	useEffect(() => {
		if (activeStep === 4) {
			const contact = JSON.parse(localStorage.getItem("contactData") || "{}") as ContactData

			ordersApi.createOrder({
				...contact,
				customerName: contact.name,
				items: items.map(({quantity, product}) => ({quantity, productId: product.id}))
			}).then(() => {
				localStorage.removeItem("contactData");
				clearBasket();
			})
		}
	}, [])


	const createPayment = (amount: number) => {
		paymentApi.createPayment(amount).then(res => setClientSecret(res.clientSecret));
	}

	const {handleSubmit, control} = useForm<ContactData>({
		mode: "onBlur",
		resolver: yupResolver(schema)
	});

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


	const handleSubmitForm = (values: ContactData) => {
		setContactData(values);
		setActiveStep(prevState => prevState + 1);
		localStorage.setItem("contactData", JSON.stringify(values));
	}


	return (
		<Container maxWidth="lg">
			<form autoComplete="off" onSubmit={handleSubmit(handleSubmitForm)}>
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
								<CustomInput
									control={control}
									name="name"
									label="Imię i nazwisko"
									color="secondary"
								/>
							</Grid>

							<Grid item width={500}>
								<CustomInput
									control={control}
									name="email"
									label="Email"
									type="email"
								/>
							</Grid>

							<Grid item width={500} mt={3}>
								<CustomInput
									control={control}
									name="city"
									label="Miasto"
									fullWidth
								/>
							</Grid>

							<Grid item width={500}>
								<CustomInput
									control={control}
									name="street"
									label="Ulica"
									fullWidth
								/>
							</Grid>

							<Grid item width={500}>
								<Grid container direction="row" spacing={2}>
									<Grid item xs={4}>
										<CustomInput
											control={control}
											name="houseNumber"
											label="Numer domu"
											fullWidth
										/>
									</Grid>

									<Grid item xs={8}>
										<CustomInput
											control={control}
											name="postcode"
											label="Kod pocztowy"
											fullWidth
										/>
									</Grid>
								</Grid>
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
									{contactData.street} {contactData.houseNumber} <br/>
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
							type={activeStep === 1 ? "submit" : "button"}
							disableElevation
							disabled={activeStep === 4}
							onClick={() => {if (activeStep !== 1) setActiveStep(prevState => prevState + 1)}}
						>
							Dalej
						</Button>
					</Box>
				)}
			</form>
		</Container>
	)
}


export default PaymentView;
