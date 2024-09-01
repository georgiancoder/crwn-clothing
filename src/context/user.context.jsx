import {createContext, useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "../utils/firebase/firebase.utils";

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {...state, currentUser: payload};
        default:
            throw new Error(`Unknown action type ${type}`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    }
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) => {
            if (user) createUserDocumentFromAuth(user)
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
