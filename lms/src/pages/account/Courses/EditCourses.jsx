import React from "react";
import { useForm } from "react-hook-form";
import UserSidebar from "../../../components/Shared/UserSidebar";
import Layout from "../../../components/Shared/Layout";
import { Link } from "react-router";

const EditCourses = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = () => {};

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
                <div className="card shadow-lg border-0">
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          {...register("title", {
                            required: "The title field is required",
                          })}
                          className={`form-control ${
                            errors.title ? "is-invalid" : ""
                          }`}
                          placeholder="Enter title"
                        />
                        {errors.title && (
                          <div className="text-danger">
                            {errors.title.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="user_id" className="form-label">
                          User ID
                        </label>
                        <input
                          type="number"
                          {...register("user_id", {
                            required: "User ID is required",
                          })}
                          className={`form-control ${
                            errors.user_id ? "is-invalid" : ""
                          }`}
                          placeholder="Enter user ID"
                        />
                        {errors.user_id && (
                          <div className="text-danger">
                            {errors.user_id.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="category_id" className="form-label">
                          Category ID
                        </label>
                        <input
                          type="number"
                          {...register("category_id")}
                          className="form-control"
                          placeholder="Optional"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="level_id" className="form-label">
                          Level ID
                        </label>
                        <input
                          type="number"
                          {...register("level_id")}
                          className="form-control"
                          placeholder="Optional"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="language_id" className="form-label">
                          Language ID
                        </label>
                        <input
                          type="number"
                          {...register("language_id")}
                          className="form-control"
                          placeholder="Optional"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <textarea
                          {...register("description")}
                          className="form-control"
                          placeholder="Optional description"
                          rows="3"
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register("price", {
                            required: "Price is required",
                          })}
                          className={`form-control ${
                            errors.price ? "is-invalid" : ""
                          }`}
                          placeholder="Enter price"
                        />
                        {errors.price && (
                          <div className="text-danger">
                            {errors.price.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="cross_price" className="form-label">
                          Cross Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...register("cross_price")}
                          className="form-control"
                          placeholder="Optional cross price"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          Image URL
                        </label>
                        <input
                          type="text"
                          {...register("image")}
                          className="form-control"
                          placeholder="Optional image URL"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary w-100">
                        Continue
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EditCourses;
