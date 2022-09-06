import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
    return "Wprowdź poprawny adres e-mail oraz hasło";
};

const getFormValidMessage = () => {
    return "Kliknij, aby się zalogować!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
    const history = useHistory();

    const handlePushToRegisterPage = () => {
        history.push("/register");
    };

    return (
        <>
            <Tooltip
                title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
            >
                <div>
                    <CustomPrimaryButton
                        label="Zaloguj się"
                        additionalStyles={{ marginTop: "30px" }}
                        disabled={!isFormValid}
                        onClick={handleLogin}
                    />
                </div>
            </Tooltip>
            <RedirectInfo
                text="Potrzebujesz konto? "
                redirectText="Stwórz konto"
                additionalStyles={{ marginTop: "5px" }}
                redirectHandler={handlePushToRegisterPage}
            />
        </>
    );
};

export default LoginPageFooter;