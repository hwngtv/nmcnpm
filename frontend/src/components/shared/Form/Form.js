import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

import "./dependencies/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./dependencies/vendor/animate/animate.css";
import "./dependencies/vendor/css-hamburgers/hamburgers.min.css";
import "./dependencies/vendor/select2/select2.min.css";
import "./dependencies/css/util.css";
import "./dependencies/css/main.css";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  return (
    <div>
      <form
        className="login100-form validate-form"
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website,
              bloodGroup,
              0
            );
        }}
      >
        <span className="login100-form-title">{formTitle}</span>
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>
          {formType === "login" && (
            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="adminRadio"
                value={"admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="adminRadio" className="form-check-label">
                Admin
              </label>
            </div>
          )}

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
        </div>
        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Valid email is required: ex@abc.xyz"
                  >
                    <InputType
                      labelText={"email"}
                      labelFor={"forEmail"}
                      inputType={"email"}
                      name={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                  </div>

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <InputType
                      labelText={"Password"}
                      labelFor={"forPassword"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <div>
                      <div
                        className="wrap-input100 validate-input"
                        data-validate="Valid email is required: ex@abc.xyz"
                      >
                        <InputType
                          labelText={"Name"}
                          labelFor={"forName"}
                          inputType={"text"}
                          name={"name"}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <br></br>
                        <InputType
                          labelText={"Blood Group"}
                          labelFor={"forBloodGroup"}
                          inputType={"text"}
                          name={"bloodGroup"}
                          value={bloodGroup}
                          onChange={(e) => setBloodGroup(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {role === "organisation" && (
                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Password is required"
                    >
                      <InputType
                        labelText={"Organisation Name"}
                        labelFor={"fororganisationName"}
                        inputType={"text"}
                        name={"organisationName"}
                        value={organisationName}
                        onChange={(e) => setOrganisationName(e.target.value)}
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="fa fa-building-o" aria-hidden="true"></i>
                      </span>
                    </div>
                  )}
                  {role === "hospital" && (
                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Password is required"
                    >
                      <InputType
                        labelText={"Hospital Name"}
                        labelFor={"forHospitalName"}
                        inputType={"text"}
                        name={"hospitalName"}
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="fa fa-hospital-o" aria-hidden="true"></i>
                      </span>
                    </div>
                  )}
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Valid email is required: ex@abc.xyz"
                  >
                    <InputType
                      labelText={"email"}
                      labelFor={"forEmail"}
                      inputType={"email"}
                      name={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <InputType
                      labelText={"Password"}
                      labelFor={"forPassword"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <InputType
                      labelText={"website"}
                      labelFor={"forWebsite"}
                      inputType={"text"}
                      name={"website"}
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-weibo" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <InputType
                      labelText={"Address"}
                      labelFor={"forAddress"}
                      inputType={"text"}
                      name={"address"}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-address-card" aria-hidden="true"></i>
                    </span>
                  </div>

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <InputType
                      labelText={"Phone"}
                      labelFor={"forPhone"}
                      inputType={"text"}
                      name={"phone"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </span>
                  </div>
                </>
              );
            }
          }
        })()}
        <div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn">{submitBtn}</button>
          </div>
        </div>

        <div className="text-center p-t-50">
          {formType === "login" ? (
            <Link to="/register" className="txt2">
              Create your Account
              <i
                className="fa fa-arrow-circle-right m-l-5"
                aria-hidden="true"
              ></i>
            </Link>
          ) : (
            <Link to="/login" className="txt2">
              Already have an account?
              <i
                className="fa fa-arrow-circle-right m-l-5"
                aria-hidden="true"
              ></i>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
