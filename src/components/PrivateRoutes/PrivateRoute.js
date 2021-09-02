import React from "react";
import { Route, Redirect } from "react-router-dom";
import { userSubjectValue } from "../../servicesFetch/accountServicesFetch";

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = userSubjectValue.userValue;
        if (!user) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{
                pathname: "/menu",
                state: { from: props.location },
              }}
            />
          );
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(user.role) === -1) {
          // role not authorized so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
        }

        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
