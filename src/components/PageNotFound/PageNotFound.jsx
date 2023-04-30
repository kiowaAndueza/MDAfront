import React from "react";
import "./PageNotFound.css";

function PageNotFound (){
    return(
        <div className="login-form-wrapper">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="pageNotFound-container text-center">
                        <h1 className="display-1 fw-bold">404</h1>
                        <p className="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                        <p className="lead">
                            La página que buscas no existe.
                        </p>
                    </div>
                </div>
                
        </div>
    );
}
export default PageNotFound;