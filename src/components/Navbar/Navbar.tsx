import React, { useContext } from "react";
import { AppBar, Badge, Box, Grid, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { ShopContext } from "../../context/ShopContext";
import NavbarCategory from "../NavbarCategory/NavbarCategory";
import { BasketContext } from "../../context/BasketContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from "react-router-dom";


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
	const navigation = useNavigate()

	return (
		<div>
			<HideOnScroll>
				<AppBar elevation={0}>
					<Toolbar>
						<Grid container justifyContent="space-between">
							<Grid item>
								<Grid container justifyContent="start">
									<Typography
										variant="h6"
										component="div"
										marginRight={3}
									>
										Sklep
									</Typography>

									<Box sx={{flexGrow: 1, display: {xs: "flex"}}}>
										{categories?.reverse()?.map(c => (
											<NavbarCategory
												key={c.name}
												category={c}
											/>
										))}
									</Box>
								</Grid>
							</Grid>

							<Grid>
								<IconButton
									color="inherit"
									onClick={() => navigation("/basket")}
								>
									<Badge badgeContent={items.length} color="secondary">
										<ShoppingBasketIcon/>
									</Badge>
								</IconButton>
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
