import React from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
    return (
        <>
            <InputWithLabel
                value={mail}
                setValue={setMail}
                label="Adres e-mail"
                type="text"
                placeholder="Wprowadź adres e-mail"
            />
            <InputWithLabel
                value={password}
                setValue={setPassword}
                label="Hasło"
                type="password"
                placeholder="Wprowadź hasło"
            />
        </>
    );
};

export default LoginPageInputs;
