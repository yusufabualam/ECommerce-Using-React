import React from 'react';

class Footer extends React.Component {
    render(){
        return(
            <footer className='footer text-bg-dark pt-5'>
                <div className='container-fluid'>
                    <div className='row align-items-center'>
                        <div className='col text-start'>
                            <div>
                            <h4 className='text-white'>Get in Touch</h4>
                            <br></br>
                            <h5><i class="bi bi-envelope"></i> yabualam@gmail.com</h5>
                            <h5><i class="bi bi-person-rolodex"></i> +201099959294</h5>
                            </div>
                        </div>
                        <div className='col d-flex align-items-center'>
                        <button className='btn btn-outline-light'>Contact Me</button>
                        <div className='col text-end'>
                            <a href="https://www.linkedin.com/in/yusuf-abu-alam-3ba793142/" className='link-light fs-3'><i class="bi bi-linkedin"></i></a>
                            <span> </span>
                            <a href="https://www.facebook.com" className='link-light'><i class="bi bi-facebook fs-3"></i></a>
                            <span> </span>
                            <a href="https://github.com/yusufabualam" className='link-light'><i class="bi bi-github fs-3"></i></a>
                            <p>Copyrights &#169; 2024 EG</p>
                        </div>
                      
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;