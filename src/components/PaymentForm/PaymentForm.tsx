import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Alert, Box, Button, Grid } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CLIENT_URL } from "../../config/AxiosConfig";


type PaymentFormProps = {
	setActiveStep: Dispatch<SetStateAction<number>>
}


const PaymentForm: FC<PaymentFormProps> = ({setActiveStep}) => {

	const [alert, setAlert] = useState<{msg?: string, type: "info" | "success" | "error" }>({type: "info"})

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		if (!stripe) return;

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent?.status) {
				case "succeeded":
					setAlert({msg: "Payment succeeded!", type: "success"});
					break;
				case "processing":
					setAlert({msg: "Your payment is processing.", type: "info"});
					break;
				case "requires_payment_method":
					setAlert({msg: "Your payment was not successful, please try again.", type: "error"});
					break;
				default:
					setAlert({msg: "Something went wrong.", type: "error"});
					break;
			}
		})


		}, [stripe])

	const submitPayment = () => {
		if (!stripe || !elements) return;

		stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${CLIENT_URL}/payment?paymentSuccess=true`
			}
		}).then(({error}) => {
			if (error.type === "card_error" || error.type === "validation_error") {
				console.log(error.message)
			} else {
				console.log("An unexpected error occurred.")
			}
		})

	}


	return (
		<Box>
			<Grid container justifyContent="center">
				<Grid item xs={5}>
					<PaymentElement/>
				</Grid>
			</Grid>

			<Grid container>
				{!!alert.msg && (
					<Alert severity={alert.type} >{alert.msg}</Alert>
				)}
			</Grid>

			<Box
				component="div"
				display="flex"
				justifyContent="space-between"
			>
				<Button
					variant="contained"
					disableElevation
					// disabled={activeStep === 1}
					onClick={() => setActiveStep(prevState => prevState - 1)}
				>
					Wróć
				</Button>
				<Button
					variant="contained"
					// type={activeStep === 1 ? "submit" : "button"}
					disableElevation
					// disabled={activeStep === 4}
					onClick={submitPayment}
				>
					Dalej
				</Button>
			</Box>
		</Box>
	)
}


export default PaymentForm;
