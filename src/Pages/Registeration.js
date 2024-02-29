import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

function RegisterForm(){
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [errors, setErrors] = useState({
        nameError: "",
        emailError: "",
        usernameError: "",
        passwordError: "",
        confirmPasswordError: ""
    })
    
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
      }, [userData]);

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
      };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setUserData({
          ...userData,
          confirmPassword: value,
        });
        setPasswordsMatch(userData.password === value);
    };

    const chageUserData = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { value } = e.target;

        if (e.target.name == "name"){
            setUserData({
                ...userData,
                name: e.target.value
            })
            setErrors({
                ...errors, 
                nameError: e.target.value.length == 0 ? "This Field Is Required" : e.target.value.length < 3 && "The Name Must be at least 3 Letters"
            
            })
        }
        
        else if (e.target.name == "email"){
            setUserData({
                ...userData,
                email: e.target.value
            })
            setIsValidEmail(emailRegex.test(e.target.value));
            setErrors({
                ...errors, 
                emailError: e.target.value.length == 0 ? "This Field Is Required" : isValidEmail ? "" : "Please enter a valid email"
            
            })
        }
        else if (e.target.name == "username"){
            setUserData({
                ...userData,
                username: e.target.value
            })
            setIsUsernameValid(!/\s/.test(e.target.value));
            setErrors({
                ...errors, 
                usernameError: e.target.value.length == 0 && "This Field Is Required" 
            
            })
        }
        else if (e.target.name == "password") {
            setUserData({
                ...userData,
                password: e.target.value
            })
            // setIsValidPassword(validatePassword(e.target.value));
            setIsValidPassword(validatePassword(value));
            setPasswordsMatch(userData.confirmPassword === value);
            setErrors({
                ...errors, 
                passwordError : e.target.value.length == 0 ? "This Field Is Required" : e.target.value.length < 8 && "Please Enter a password with at least 8 characters"
            })
        }
        else{
            setUserData({
                ...userData,
                confirmPassword: e.target.value
            })
            setErrors({
                ...errors, 
                confirmPasswordError : e.target.value.length == 0 ? "This Field Is Required" : e.target.value.length < 8 && "Please Enter a password with at least 8 characters"
            })
        }
    }
    const submitData = (e) => {
        if(!errors.emailError && !errors.passwordError && !errors.nameError && !errors.usernameError && !errors.confirmPasswordError){
            e.preventDefault()
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
            const newUser = { ...userData };
            const updatedUsers = [...existingUsers, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            history.push('/login')
        }
    }
    
    return(

        <div className="container border p-4 mt-5 mb-5">
            <h1 className="text-dark text-center fw-bold">Register Form</h1>
            <form onSubmit={(e) => submitData(e)}>
            <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text"
                    value={userData.name} 
                    className="form-control"
                    onChange={(e) => chageUserData(e)}
                    name = "name"/>
                </div>
                <p className="text-danger"> {errors.nameError} </p>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" 
                    value={userData.email}
                    className={isValidEmail ? 'form-control' : 'form-control is-invalid'}
                    onChange={(e) => chageUserData(e)}
                    name = "email"/>
                    {!isValidEmail && ( 
                        <div className="invalid-feedback">
                            Please enter a valid email address.
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="User Name" className="form-label">User Name</label>
                    <input type="text"
                    value={userData.username}  
                    className={isUsernameValid ? 'form-control' : 'form-control is-invalid'}
                    onChange={(e) => chageUserData(e)}
                    name = "username"/>
                    {!isUsernameValid && <div className="invalid-feedback">Username cannot contain spaces.</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password"
                    value={userData.password} 
                    className={isValidPassword ? 'form-control' : 'form-control is-invalid'}
                    onChange={(e) => chageUserData(e)} 
                    name = "password"/>
                    {!isValidPassword && (
                        <div className="invalid-feedback">
                        Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Confirm Password</label>
                    <input type="password"
                    value={userData.confirmPassword} 
                    className={passwordsMatch ? 'form-control' : 'form-control is-invalid'}
                    onChange={handleConfirmPasswordChange}
                    name = ""/>
                 {!passwordsMatch && <div className="invalid-feedback">Passwords do not match.</div>}
                </div>
                <button type="submit" className="btn btn-dark mt-3" style={{width:"100%"}}>Register</button>
                </form>
        </div>

    )

}
export default RegisterForm