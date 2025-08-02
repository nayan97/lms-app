import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import Layout from "../../components/Shared/Layout";
import { apiUrl } from "../../components/Shared/Config";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../components/context/Auth";

const Login = () => {
  const {login} = useContext(AuthContext)
   const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


const onSubmit = async (data) => {
  // try {
     await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then (result => {
        if (result.status === 200){
          toast.success(result.message);
          const userInfo = {
            name: result.name,
            id:result.id,
            token:result.token,
          }

          localStorage.setItem('userInfoLms', JSON.stringify(userInfo));
          login(userInfo)
           navigate('/account/dashboard');
        }else{
           toast.error(result.message);
          // const errors = result.errors;
        //   Object.keys(errors.foreach(field => {
        //     setError(field, {message: errors[field[0]]})
        //   }))
        // }


    }

  }) 
  // catch (error) {
  //   console.error('Fetch error:', error);
  //   toast.error('Network error. Please try again.');
  // }
};


  return (
    <Layout>
      <div className="container py-5 mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card border-0 shadow login">
              <div className="card-body p-4">
                <h3 className="border-bottom pb-3 mb-3">Login</h3>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                    })}
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
                    className="form-control"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <p role="alert" className="text-danger">
                      password is required
                    </p>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary">Login</button>
                  <Link to={`/account/register`} className="text-secondary">
                    Register Here
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

export default Login;
