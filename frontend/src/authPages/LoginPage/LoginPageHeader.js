import React from "react";
import { Typography } from "@mui/material";

const LoginPageHeader = () => {
    return (
        <>
            <Typography variant="h4" sx={{ color: "white" }}>
                Witaj ponownie!
            </Typography>
            <Typography sx={{ color: "#b9bbbe" }}>
                Dziękujemy, że jesteś z nami!
            </Typography>
        </>
    );
};

export default LoginPageHeader;
