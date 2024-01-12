
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const onSubmit = (formData) => {
    console.log(formData);
    setIsRegistrationComplete(true);
    window.confirm('Registration Completed');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registration-body">
      {!isRegistrationComplete && (
        <div className="registration-form-body">
          <h1 className="registration-heading"> <hr /> <br />Create Account</h1>
          <InputField
            type="text"
            placeholder="Name"
            name="name"
            register={register}
            rules={{
              required: 'Please enter your name',
              minLength: { value: 3, message: 'Name should be at least 3 characters' },
              maxLength: { value: 25, message: 'Name should not exceed 25 characters' },
            }}
            errors={errors}
          />
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            rules={{
              required: 'Please enter your email',
              pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                message: 'Please enter a valid email',
              },
            }}
            errors={errors}
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            rules={{
              required: 'Please enter a password',
              minLength: { value: 10, message: 'Password should be at least 10 characters long' },
              pattern: {
                value: /.*[!@#$%^&*()\-_=+{};:,<.>]/,
                message: 'Password should contain at least one special character',
              },
            }}
            errors={errors}
          />
          <InputField
            type="password"
            placeholder="Re-enter Password"
            name="rePassword"
            register={register}
            rules={{
              required: 'Please re-enter your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            }}
            errors={errors}
          /> <br /> <br />
          <button type="submit" className="submit-button">
            SUBMIT
          </button>
          <p > <br /><b>Already have an account? =&gt; </b> <span className='login'> <Link className='hel' to="/"> <b>Login here</b></Link> </span> <br /> <br /> <hr /></p>
        </div>
      )}
    </form>
  );
};

const InputField = ({ type, placeholder, name, register, rules, errors }) => (
  <>
    <input type={type} placeholder={placeholder} {...register(name, rules)} className="field-input" />
    {errors[name] && <span className="error-message">{errors[name].message}</span>}
  </>
);

export default RegistrationForm;
