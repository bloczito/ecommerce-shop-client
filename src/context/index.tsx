import React, { ReactElement } from "react";
import { ProductsContextProvider } from "./ProductsContext";
import { NotificationContextProvider } from "./NotificationContext";
import { BasketContextProvider } from "./BasketContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { ShopContextProvider } from "./ShopContext";
import { SnackbarProvider } from "notistack";
import Fade from "@mui/material/Fade";


const theme = createTheme({
	palette: {
		primary: {
			light: "#fffd61",
			main: "#ffca28",
			dark: "#c79a00",
			contrastText: "#000",
		},
		secondary: {
			light: "#d7ffd9",
			main: "#a5d6a7",
			dark: "#75a478",
			contrastText: "#000"
		},
		text: {
			primary: "#000",
			secondary: "#fff",
		}
	}
});

const AppContextProvider: React.FC<{children: ReactElement}> = ({children}) => (
	<ShopContextProvider>
		<ProductsContextProvider>
			<NotificationContextProvider>
				<BasketContextProvider>
					<SnackbarProvider maxSnack={5} variant="success" autoHideDuration={800}>
						<ThemeProvider theme={theme}>
							{children}
						</ThemeProvider>
					</SnackbarProvider>
				</BasketContextProvider>
			</NotificationContextProvider>
		</ProductsContextProvider>
	</ShopContextProvider>
)


export default AppContextProvider;
