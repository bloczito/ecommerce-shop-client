import React from "react";
import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

interface ScrollTopProps {
	children?: React.ReactElement
}

const ScrollTop: React.FC<ScrollTopProps> = ({children}) => {
	const trigger = useScrollTrigger({
		target: window,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector('#back-to-top-anchor');

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
			>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUp />
				</Fab>
			</Box>
		</Zoom>
	);
}

export default ScrollTop
