import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { googleSignInStart,emailSignInStart } from '../../redux/user/userSlice'; // Import your action creator

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch(); // Initialize useDispatch hook

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(emailSignInStart(userCredentials));
      // Handle sign-in logic (e.g., call your API)
      // Example: await signInWithEmailAndPassword(auth, email, password);
      setUserCredentials({ email: '', password: '' });
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'> Sign in </CustomButton>
          {/* Replace signInWithGoogle with the appropriate action */}
          <CustomButton type='button' onClick={() => dispatch(googleSignInStart())} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
