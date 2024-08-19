import {useState} from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFeilds, setFormFeilds] = useState(defaultFormFields);
    const { email, password} = formFeilds;

    const signInWithGoogle = async (event) => {
        event.preventDefault();
        await signInWithGooglePopup();
    }

    const resetFormFields = () => {
        setFormFeilds(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields()
        } catch (error)
        {
            if (error.code === 'auth/invalid-credential')
                alert(error.message);
            console.log(error);
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFeilds({...formFeilds, [name]: value});
    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" name="email" value={email} required onChange={handleChange}/>
                <FormInput label="Password" type="password" name="password" value={password} required onChange={handleChange}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
