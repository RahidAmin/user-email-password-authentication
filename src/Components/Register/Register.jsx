import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase.config';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Register = () => {

    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = (e) => {

        e.preventDefault();
        const mName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);


        //Reset Error
        setRegisterError('');

        //reset Success
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your Password should have at least one upper class character');
            return;
        }
        else if (!accepted) {
            setRegisterError('Please Accept our Terms and Conditions')
            return;
        }

        //create user
        createUserWithEmailAndPassword(auth, email, password).then(result => {
            // console.log(result.user)
            setSuccess('User Created Successfully');


            //Update Profile
            updateProfile(result.user, {
                displayName: mName,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(() => {
                console.log('Profile Updated');
            }).catch()

            //send verification email
            sendEmailVerification(result.user).then(() => {
                alert('Please Check Your email and verify your account')
            }).catch()

        }
        ).catch(error => {
            console.error(error);
            setRegisterError(error.message)

        }
        )
    }
    return (
        <div className=''>
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className='mb-4 w-full border-solid border-2 border-black px-2 py-4' type="text" name="name" placeholder='Your Name' id="" required />
                    <br />
                    <input className='mb-4 w-full border-solid border-2 border-black px-2 py-4' type="email" name="email" placeholder='Your Email Address' id="" required />
                    <br />
                    <div className='relative border mb-4'>
                        <input className='w-full border-solid border-2 border-black px-2 py-4'
                            type={showPassword ? 'text' : "password"}
                            placeholder='Your Password'
                            name='password'
                            id="" required />
                        <span className='absolute top-5 right-2' onClick={() => {
                            setShowPassword(!showPassword);
                        }
                        }>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                    </div>
                    <br />
                    <div className='mb-2 '>
                        <input type="checkbox" name="terms" id="terms" />
                        <label className='ml-2' htmlFor="terms">Accept Our <a href="">Terms and conditions</a></label>
                    </div>
                    <br />
                    <input className='w-full btn btn-secondary' type="submit" value="Register" />

                </form>
                {
                    registerError && <p className='text-red-800'>{registerError}</p>

                }
                {
                    success && <p className='text-blue-700'>{success}</p>
                }
                <p>Already have an account?<Link to='/Login'><a className='font-semibold' href="">Please Login</a></Link></p>
            </div>
        </div>
    );
};

export default Register;