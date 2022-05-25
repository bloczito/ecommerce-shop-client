import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { CategoryWithSub } from "../../types";
import { Link } from "react-router-dom";

const getButtonId = (category: string) => `${category}-button`
const getMenuId = (category: string) => `${category}-menu`

const getLink = (category: string, subcategory?: string) =>
	`/products?category=${category}${subcategory ? "&subcategory=" + subcategory : ""}`

interface NavbarCategoryProps {
	category: CategoryWithSub
}

const NavbarCategory:React.FC<NavbarCategoryProps> = ({category}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const {title, name, subcategories} = category

	const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleHideMenu = () => {
		setAnchorEl(null);
	};

	const handleCategoryChosen = () => {
		window.history.pushState({}, "", getLink(name))
	}


	return (
	  <>
		  <Button
			  id={getButtonId(name)}
			  aria-controls={!!anchorEl ? getMenuId(name) : undefined}
			  aria-haspopup="true"
			  aria-expanded={!!anchorEl ? true : undefined}
			  variant="text"
			  color="inherit"
			  disableElevation
			  size="large"
			  // onMouseOver={handleShowMenu}
			  onClick={!!subcategories?.length ? handleShowMenu : () => {}}
			  // onMouseEnter={handleShowMenu}
			  // onMouseLeave={handleHideMenu}
			  // onMouseOver={!!subcategories?.length ? handleShowMenu : () => {}}

		  >
			  {title}
		  </Button>
		  {(!!subcategories?.length) && (
			  <Menu
				  id={getMenuId(name)}
				  open={!!anchorEl}
				  anchorEl={anchorEl}
				  aria-labelledby={getButtonId(name)}
				  onClose={handleHideMenu}
			  >
				  <Link
					  to={getLink(name)}
					  style={{textDecoration: "none", color: "black"}}
				  >
					  <MenuItem onClick={handleHideMenu}>
						  {`Wszystko w kategorii ${title}`}
					  </MenuItem>
				  </Link>
				  {subcategories?.map(s => (
					  <Link
						  key={s.name}
						  to={getLink(name, s.name)}
						  style={{textDecoration: "none",  color: "black"}}
					  >
						  <MenuItem onClick={handleHideMenu}>
							  {s.name}
						  </MenuItem>
					  </Link>
				  ))}
			  </Menu>
		  )}
	  </>
	)
}

export default NavbarCategory;
