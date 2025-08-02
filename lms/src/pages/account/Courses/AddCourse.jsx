import React from "react";
import Layout from "../../../components/Shared/Layout";
import UserSidebar from "../../../components/Shared/UserSidebar";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../../components/Shared/Config";
import toast from "react-hot-toast";

const AddCourse = () => {
    const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

 const onSubmit = async (data) => {

     await fetch(`${apiUrl}/course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization'  : `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then (result => {
        if (result.status === 200){
          toast.success(result.message);
      
           navigate('/account/courses/edit/'+result.data.id);
        }else{
           toast.error(result.message);
          // const errors = result.errors;
        //   Object.keys(errors.foreach(field => {
        //     setError(field, {message: errors[field[0]]})
        //   }))
        // }


    }

  }) 
};

  return (
    <Layout>
      <section className="section-4">
        <div className="container pb-5 pt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/account">Account</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-12 mt-5 mb-3">
              <div className="d-flex justify-content-between">
                <h2 className="h4 mb-0 pb-0"> Create Course</h2>
              </div>
            </div>
            <div className="col-lg-3 account-sidebar">
              <UserSidebar />
            </div>
            <div className="col-lg-9">
              <div className="row">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card shadow-lg border-0">
                    <div className="card-body">
                      <div className="mb-3">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          {...register("title", {
                            required: "The title field is required",
                          })}
                          className="form-control"
                          placeholder="title"
                        />
                        {errors.title?.type === "required" && (
                          <p role="alert" className="text-danger">
                            email is required
                          </p>
                        )}
                      </div>
                      <button className="btn btn-primary">Continue</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AddCourse;
