import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";

import Tilt from "react-parallax-tilt";

import "./dependencies/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./dependencies/vendor/animate/animate.css";
import "./dependencies/vendor/css-hamburgers/hamburgers.min.css";
import "./dependencies/vendor/select2/select2.min.css";
import "./dependencies/css/util.css";
import "./dependencies/css/main.css";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <div className="login100-pic js-tilt" data-tilt>
                  <Tilt scale={1.1}>
                    <img
                      src={require("./dependencies/images/img-01.png")}
                      alt="IMG"
                    />
                  </Tilt>
                </div>

                <div className="login100-form validate-form">
                    <Form
                      formTitle={"Sign In"}
                      submitBtn={"Login"}
                      formType={"login"}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
