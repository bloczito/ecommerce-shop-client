import React, { useContext } from "react";
import {
	AppBar,
	Badge,
	Box,
	Button,
	Grid,
	IconButton,
	Slide,
	Toolbar,
	Typography,
	useScrollTrigger
} from "@mui/material";
import { ShopContext } from "../../context/ShopContext";
import NavbarCategory from "../NavbarCategory/NavbarCategory";
import { BasketContext } from "../../context/BasketContext";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AccountMenu from "../AccountMenu/AccountMenu";


interface HideOnScrollProps {
	children: React.ReactElement
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({children}) => {
	const trigger = useScrollTrigger({
		target: window
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	)
}


const Navbar: React.FC = () => {
	const {categories} = useContext(ShopContext);
	const {items} = useContext(BasketContext);
	const {token, signOut} = useContext(UserContext);
	const navigation = useNavigate()

	return (
		<div>
			<HideOnScroll>
				<AppBar elevation={0}>
					<Toolbar>
						<Grid container justifyContent="space-between">
							<Grid item>
								<Grid container justifyContent="start">
									<Button onClick={() => navigation("/")}>
										<Typography
											variant="h6"
											component="div"
											marginRight={3}
											color="black"
										>
											Shopp
										</Typography>
									</Button>

									<Box sx={{display: "flex", flexGrow: 1, marginLeft: 2, gap: 2}}>
										{categories?.map(c => (
											<NavbarCategory
												key={c.name}
												category={c}
											/>
										))}
									</Box>
								</Grid>
							</Grid>

							<Grid>
								{!token && (
									<Button onClick={() => navigation("/signIn")} color="inherit">
										Zaloguj
									</Button>
								)}


								<IconButton
									color="inherit"
									onClick={() => navigation("/basket")}
								>
									<Badge badgeContent={items.length} color="secondary">
										<ShoppingBasketIcon/>
									</Badge>
								</IconButton>

								{ !!token && <AccountMenu/> }
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar id="back-to-top-anchor"/>
		</div>
	)
}

export default Navbar;
