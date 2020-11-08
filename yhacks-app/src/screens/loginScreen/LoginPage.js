import React, { Component } from 'react'

export class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.signUpButton = this.signUpButton.bind(this);
        this.signInButton = this.signInButton.bind(this);
    }

    signUpButton(e) {
        e.preventDefault();
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
        console.log("SignUP Button")
    }

    signInButton(e) {
        e.preventDefault();
        const container = document.getElementById('container');
        container.classList.remove('right-panel-active');
        console.log("Sign in Button")
    }

    render() {
        return (
            <>
                <div class="container" id="container">
                    <div class="form-container sign-up-container">
                        <div class="form-container sign-up-container">
                            <form action="#">
                                <h1>Create Account</h1>
                                <div class="social-container">
                                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                                </div>
                                <span>or use your email for registration</span>
                                <input type="text" placeholder="Name" />
                                <input type="email" placeholder="Email" />
                                <input type="password" placeholder="Password" />
                                <button onClick={this.signUpButton}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                    <div class="form-container sign-in-container">
                        <div class="form-container sign-in-container">
                            <form action="#">
                                <h1>Sign in</h1>
                                <div class="social-container">
                                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                                </div>
                                <span>or use your account</span>
                                <input type="email" placeholder="Email" />
                                <input type="password" placeholder="Password" />
                                <a href="#">Forgot your password?</a>
                                <button onClick={this.signInButton}>Sign In</button>
                            </form>
                        </div>
                    </div>
                    <div class="overlay-container">
                        <div class="overlay-container">
                            <div class="overlay">
                                <div class="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>
                                        To keep connected with us please login with your personal info
                                    </p>
                                    <button class="ghost" id="signIn" onClick={this.signInButton}>Sign In</button>
                                </div>
                                <div class="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start journey with us</p>
                                    <button class="ghost" id="signUp" onClick={this.signUpButton}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LoginPage
