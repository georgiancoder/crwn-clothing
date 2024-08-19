import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFeilds, setFormFeilds] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFeilds;


    const resetFormFields = () => {
        setFormFeilds(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields()
        } catch (error)
        {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            else
            {
                console.log('user creation error', error);
            }
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFeilds({...formFeilds, [name]: value});
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" value={displayName} required onChange={handleChange} />
                <FormInput label="Email" type="email" name="email" value={email} required onChange={handleChange}/>
                <FormInput label="Password" type="password" name="password" value={password} required onChange={handleChange}/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} required onChange={handleChange}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;
