import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault();
        //reset login Errror
        setLoginError('');
        //reset success
        setSuccess('');



        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password).then((result) => {
            console.log(result.user);
            if (result.user.emailVerified) {
                setSuccess('you have successfully loged in')
            } else {
                alert('Please Verify your email address');
            }

        }
        ).catch((error) => {
            console.error(error)
            setLoginError(error.message);
        }
        );

    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('please provide an email', emailRef.current.value)
            return;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('Please Write a valid email')
            return;
        }

        //send velidation email
        sendPasswordResetEmail(auth, email).then(result => {
            alert('Please Check your email')
        }
        ).catch(error => {
            console.error(error.message);
        }
        )

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    ref={emailRef}
                                    name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            {loginError && <p className='text-red-600'>{loginError}</p>}
                            {
                                success && <p className='text-green-600'>{success}</p>
                            }
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p>New to this website?Please <Link to="/Register"><a className='font-semibold' href="">Register</a></Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;