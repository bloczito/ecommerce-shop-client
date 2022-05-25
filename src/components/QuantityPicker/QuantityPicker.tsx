import React from "react";
import { Grid, IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
interface QuantityPickerProps {
	quantity: number,
	addItem: () => void,
	removeItem: () => void
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({quantity, removeItem, addItem}) => (
	<Grid container>
		<Grid item>
			<IconButton
				onClick={addItem}
				color="inherit"
			>
				<AddBoxIcon/>
			</IconButton>
		</Grid>
		<Grid>
			<TextField
				disabled
				size="small"
				value={quantity}
				sx={{width: 50}}
			/>
		</Grid>
		<Grid>
			<IconButton
				onClick={removeItem}
				color="inherit"
			>
				<IndeterminateCheckBoxIcon/>
			</IconButton>
		</Grid>
	</Grid>
)


export default QuantityPicker;
