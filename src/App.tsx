import React from 'react';
import { Container } from "@mui/material";


const App = () => (
    <Container>
        {Array.from(Array(1500).keys()).map(() => "Lorem ipsum ")}
    </Container>
)

export default App;
