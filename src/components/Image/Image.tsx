import React from "react";
import { Box } from "@mui/material";

interface ImageProps {
	url?: string
}

const Image: React.FC<ImageProps> = ({url}) => (
	<Box component="div">
		<Box
			component="img"
			sx={{
				maxHeight: 500,
				maxWidth: 400
			}}
			src={url ?? "https://img01.ztat.net/article/spp-media-p1/5a2054521ea63c76b967129ac00f99e0/53e05d695047435790cf3ffaf5b8e17c.jpg?imwidth=1800"}
		/>
	</Box>

)

export default Image;
