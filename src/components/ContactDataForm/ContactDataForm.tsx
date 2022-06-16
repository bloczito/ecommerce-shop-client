import React, { FC } from "react";
import { Grid, TextField, TextFieldProps, Typography } from "@mui/material";
import { ContactData } from "../../types";
import { useController, UseControllerProps, useForm } from "react-hook-form";
import { object, string } from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type ContactDataFormProps = {
	submitFn: (fields: ContactData) => void;
}


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

const ContactDataForm: FC<ContactDataFormProps> = ({submitFn}) => {

	const {control, handleSubmit} = useForm<ContactData>({
		mode: "onBlur",
		resolver: yupResolver(schema)
	});

	const submitForm = (fields: any) => {
		console.log("FIELDS:", fields)
	}


	return (
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
	);
}


export default ContactDataForm;


