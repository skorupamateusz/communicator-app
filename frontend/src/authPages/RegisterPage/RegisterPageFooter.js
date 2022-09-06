import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
    return "Login powinien zawierać od 3 do 12 znaków, natomiast hasło od 6 do 12 znaków. Wymagany jest również poprawny adres e-mail";
};

const getFormValidMessage = () => {
    return "Kliknij, aby się zarejestować!";
};

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
    const history = useHistory();

    const handlePushToLoginPage = () => {
        history.push("/login");
    };

    return (
        <>
            <Tooltip
                title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
            >
                <div>
                    <CustomPrimaryButton
                        label="Zarejestruj się"
                        additionalStyles={{ marginTop: "30px" }}
                        disabled={!isFormValid}
                        onClick={handleRegister}
                    />
                </div>
            </Tooltip>
            <RedirectInfo
                text=""
                redirectText="Posiadasz już konto?"
                additionalStyles={{ marginTop: "5px" }}
                redirectHandler={handlePushToLoginPage}
            />
        </>
    );
};

export default RegisterPageFooter;