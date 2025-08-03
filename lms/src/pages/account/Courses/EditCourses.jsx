import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserSidebar from "../../../components/Shared/UserSidebar";
import Layout from "../../../components/Shared/Layout";
import { Link, useParams } from "react-router";
import { apiUrl, token } from "../../../components/Shared/Config";
import toast from "react-hot-toast";

const EditCourses = () => {
  const params  = useParams();
  const {
    register,
    formState: { errors }, reset,
    handleSubmit,
  } = useForm({
    defaultValues: async () => {
      await fetch(`${apiUrl}/course/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          if (result.status === 200) {
            reset({
              
            });
          } else {
            toast.error(result.message);
          }
        });
    },
  });
  const [categories, setCategories] = useState([]);
  const [Levels, setLevels] = useState([]);
  const [languages, setlanguages] = useState([]);

  const onSubmit = async (data) => {
    await fetch(`${apiUrl}/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
          // const errors = result.errors;
          //   Object.keys(errors.foreach(field => {
          //     setError(field, {message: errors[field[0]]})
          //   }))
          // }
        }
      });
  };

  const courseMetaData = async () => {
    await fetch(`${apiUrl}/course/meta-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.status === 200) {
          setCategories(result.categories);
          setLevels(result.levels);
          setlanguages(result.languages);
        } else {
          toast.error(result.message);
        }
      });
  };

  useEffect(() => {
    courseMetaData();
  }, []);

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
                          Category
                        </label>
                        <select className="form-select" name="" id="category">
                          <option value="">Select a category</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="level_id" className="form-label">
                          Level ID
                        </label>
                        <select className="form-select" name="" id="levels">
                          <option value="">Select a Levels</option>
                          {Levels &&
                            Levels.map((Level) => {
                              return (
                                <option value={Level.id}>{Level.name}</option>
                              );
                            })}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="language_id" className="form-label">
                          Language ID
                        </label>
                        <select className="form-select" name="" id="levels">
                          <option value="">Select a Levels</option>
                          {languages &&
                            languages.map((language) => {
                              return (
                                <option value={language.id}>
                                  {language.name}
                                </option>
                              );
                            })}
                        </select>
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
