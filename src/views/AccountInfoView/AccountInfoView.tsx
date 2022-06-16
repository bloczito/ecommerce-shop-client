import React, { FC, useEffect, useState } from "react";
import { Button, Container, Divider, Grid, TextField, TextFieldProps, Typography } from "@mui/material";
import { useController, UseControllerProps, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userApi } from "../../api/UserApi";
import { AccountData } from "../../types";
import { useSnackbar } from "notistack";



const schema = Yup.object({
	customerName: Yup.string().required(),
	city: Yup.string(),
	street: Yup.string(),
	postcode: Yup.string().trim(),
	// password: string(),
	// confirmPassword: string().oneOf([ref("password"), null], "Hasła muszą być identyczne")
})


const CustomInput: React.FC<UseControllerProps<AccountData> & TextFieldProps> = ({helperText, label, ...props}) => {

	const {field, fieldState} = useController(props);

	return (
		<TextField
			error={!!fieldState.error?.message}
			helperText={fieldState.error?.message && (helperText || "Wypełnij to pole")}
			{...props}
			{...field}
			required={false}
			color="secondary"
			label={label && `${props.required ? label + " *" : label }`}
			fullWidth
			InputLabelProps={{shrink: !!field.value || props.focused}}
		/>
	)
}




const AccountInfoView: FC = () => {

	const {enqueueSnackbar} = useSnackbar();
	const {control, handleSubmit, setValue} = useForm<AccountData>({
		mode: "onBlur",
		resolver: yupResolver(schema)
	})

	const loadData = () => {
		userApi.fetchUserInfo()
			.then(res => Object
				.entries(res)
				.forEach(([k, v]: [string, string]) => setValue(k as keyof AccountData, v))
			)
	}

	useEffect(() => {
		loadData()
	}, [])

	const handleSubmitChanges = (values: AccountData) => {
		Object.entries(values).forEach(([k, v]) => {
			if (v === '') {
				values[k as keyof AccountData] = undefined
			}
		});

		userApi.updateUserInfo(values)
			.then(
				() => {
					enqueueSnackbar("Zakualizowano!", {variant: "success"})
					loadData()
				},
				() => enqueueSnackbar("Nie udało się zapisać danych", {variant: "error"})
			)

	}

	return (
		<Container maxWidth="md" sx={{mt: 5}}>
			<form autoComplete="off" onSubmit={handleSubmit(handleSubmitChanges)}>
				<Typography variant="h5" mb={2}>
					Twoje konto
				</Typography>

				<Divider/>

				<Grid container rowGap={4} mt={5}>
					<Grid container spacing={5} >
						<Grid item xs={4} >
							<CustomInput
								name="customerName"
								control={control}
								label="Imię i nazwisko"
							/>
						</Grid>
					</Grid>

					<Grid container spacing={5}>
						<Grid item xs={4}>
							<CustomInput
								name="city"
								control={control}
								label="Miasto"
							/>
						</Grid>

						<Grid item xs={4}>
							<CustomInput
								name="street"
								control={control}
								label="Ulica i nr domu"
							/>
						</Grid>

						<Grid item xs={4}>
							<CustomInput
								name="postcode"
								control={control}
								label="Kod pocztowy"
							/>
						</Grid>
					</Grid>

					{/*<Grid container spacing={5}>*/}
					{/*	<Grid item xs={4}>*/}
					{/*		<CustomInput*/}
					{/*			name="customerName"*/}
					{/*			control={control}*/}
					{/*		/>*/}
					{/*	</Grid>*/}

					{/*	<Grid item xs={4}>*/}
					{/*		<CustomInput*/}
					{/*			name="customerName"*/}
					{/*			control={control}*/}
					{/*		/>*/}
					{/*	</Grid>*/}
					{/*</Grid>*/}

					<Grid container justifyContent="end">
						<Button
							variant="contained"
							color="secondary"
							disableElevation
							type="submit"
						>
							Zapisz
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}


export default AccountInfoView;
