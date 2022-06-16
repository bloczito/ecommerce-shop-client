import React, { FC, useContext, useState } from "react";
import { Divider, IconButton, Link, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

type AccountMenuItem = {
	link: string,
	title: string
}

const menuItems: AccountMenuItem[] = [{
	link: "/account",
	title: "Konto"
}, {
	link: "/orders",
	title: "Zamówienia"
}]


const AccountMenu: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {signOut} = useContext(UserContext)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

	const handleHideMenu = () => setAnchorEl(null);

	const handleNavigate = (link: string) => {
		navigate(link)
		handleHideMenu()
	}

	const handleSignOut = () => {
		const subpaths = ["/orders", "/account"]
		subpaths.forEach(sp => {
			if (location.pathname.includes(sp)) {
				navigate("/")
			}
		})
		signOut();
		handleHideMenu()
	}

	return (
		<>
			<IconButton
				color="inherit"
				id="account-menu-btn"
				aria-controls={!!anchorEl ? "account-menu" : undefined}
				aria-expanded={!!anchorEl ? true : undefined}
				aria-haspopup="true"
				onClick={handleShowMenu}
			>
				<AccountCircleIcon/>
			</IconButton>

			<Menu
				id="account-menu"
				open={!!anchorEl}
				anchorEl={anchorEl}
				aria-labelledby="account-menu-btn"
				onClose={handleHideMenu}
			>
				{menuItems.map(({ link, title }) => (
					<MenuItem key={title} onClick={() => handleNavigate(link)}>
						{title}
					</MenuItem>
				))}
				<Divider/>

				<MenuItem onClick={handleSignOut}>
					Wyloguj się
				</MenuItem>
			</Menu>
		</>
	)
}


export default AccountMenu;
