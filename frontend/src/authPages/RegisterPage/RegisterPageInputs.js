import React from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";

const RegisterPageInputs = (props) => {
    const { mail, setMail, username, setUsername, password, setPassword } = props;

    return (
        <>
            <InputWithLabel
                value={mail}
                setValue={setMail}
                label="Adres e-mail"
                type="text"
                placeholder="Wprawdź adres e-mail"
            />
            <InputWithLabel
                value={username}
                setValue={setUsername}
                label="Login"
                type="text"
                placeholder="Wprwadź login"
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

export default RegisterPageInputs;