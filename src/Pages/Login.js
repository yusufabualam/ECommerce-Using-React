import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginForm(){
    const history = useHistory();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: ""
    })
    
    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
          history.push("/");
        }
      }, [history]);

    
      const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
      };

    const chageUserData = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(e.target.value)
        if(e.target.name == "email"){
            setUserData({
                ...userData,
                email: e.target.value
            })
            setIsValidEmail(emailRegex.test(e.target.value));
            setErrors({
                ...errors, 
                emailError: e.target.value.length == 0 ? "This Field Is Required" : isValidEmail ? "" : "Please enter a valid email"
            
            })
        }else{
            setUserData({
                ...userData,
                password: e.target.value
            })
            setErrors({
                ...errors, 
                passwordError : e.target.value.length == 0 ? "This Field Is Required" : e.target.value.length < 8 && "Please Enter a password with at least 8 characters"
            })
        }
    }
    
    const submitData = (e) => {
        e.preventDefault();
        if (!errors.emailError && !errors.passwordError) {
          const users = JSON.parse(localStorage.getItem("users")) || [];
          const user = users.find((u) => u.email === userData.email && u.password === userData.password);
          if (user) {
            // Successful login
            localStorage.setItem("isLoggedIn", "true");
            history.push("/");
          } else {
            // Display error message
            setErrorMessage("Invalid email or password");
          }
        }
      };

    return (
        <div className="container border p-4 mt-5 mb-5 ">
            <h1 className="text-dark text-center fw-bold">Login Form</h1>
            <form onSubmit={(e) => submitData(e)}> 
                <div className="mb-3">
                    {/* <label htmlfor="exampleInputEmail1" className="form-label">Email address</label> */}
                    <input type="email" 
                    value={userData.email}
                    className={isValidEmail ? 'form-control' : 'form-control is-invalid'}
                    onChange={(e) => chageUserData(e)}
                    name = "email"
                    placeholder="Email Address"/>
                    {!isValidEmail && ( 
                        <div className="invalid-feedback">
                            {/* Please enter a valid email address. */}
                        </div>
                    )}
                    <p className="text-danger"> {errors.emailError} </p>
                </div>
                <div className="mb-3 input-group">
                    {/* <label htmlfor="exampleInputPassword1" className="form-label">Password</label> */}
                    <input type={showPassword ? 'text' : 'password'} className="form-control" 
                    value={userData.password}
                    onChange={(e) => chageUserData(e)}
                    name = "password"
                    placeholder='Password'/>
               <div className="input-group-append">
                        <span
                            className="input-group-text"
                            onClick={handleShowPasswordToggle}
                            style={{ cursor: 'pointer' }}
                        >
                            <i
                            className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}
                            aria-hidden="true"
                            ></i>
                        </span>
                </div>
                </div>
                <p className="text-danger"> {errors.passwordError} </p>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="container d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-dark d-flex justify-content-center" style={{width:"100%"}}>Login</button>
                </div>
            </form>
            <p className="mt-3 text-center">Don't Have Account? <span className="text-primary"> <Link to='registeraion'>Create an Account</Link></span></p>
        </div>

    )
}
export default LoginForm