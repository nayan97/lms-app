import React from "react";
import { Link } from "react-router";
import Layout from "../../components/Shared/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from "../../components/Shared/Config"
import { toast } from 'react-hot-toast';

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit, setError
  } = useForm();

const onSubmit = async (data) => {
  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result.message || 'Something went wrong';
      toast.error(message);
      return;
    }

    toast.success('User registered successfully!');
    // Optionally reset form or redirect
    // reset();
    // navigate('/login');
  } catch (error) {
    console.error('Fetch error:', error);
    toast.error('Network error. Please try again.');
  }
};


  return (
    <Layout>
      <div className="container py-5 mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card border-0 shadow register">
              <div className="card-body p-4">
                <h3 className="border-bottom pb-3 mb-3">Register</h3>

                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: true,
                    })}
                    className={`form-control`}
                    placeholder="Name"
                  />
                  {errors.email?.type === "required" && (
                    <p role="alert" className="text-danger">
                      Name is required
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                    })}
                    className={`form-control`}
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <p role="alert" className="text-danger">
                      email is required
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    className={`form-control`}
                    placeholder="Password"
                  />
                  {errors.password?.type === "required" && (
                    <p role="alert" className="text-danger">
                      password is required
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p role="alert" className="text-danger">
                      password is must be 6 character.
                    </p>
                  )}
                </div>

                <div>
                  <button className="btn btn-primary w-100">Register</button>
                </div>

                <div className="d-flex justify-content-center py-3">
                  Already have account? &nbsp;
                  <Link className="text-secondary" to={`/account/login`}>
                    {" "}
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
