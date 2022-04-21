import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
export default function LoginRequiredRouter({
  component: Component,
  ...kwargs
}) {
  let isAuthenticate = window.localStorage.getItem("Access_token") ? true : false;
  // console.log(isAuthenticate);

  return (
    //리턴 값을 토큰 값이 있냐 없냐로 구분한다.
    <Route
      {...kwargs}
      render={(props) => {
        if (isAuthenticate) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
//const valueToStore = value instanceof Function ? value(storedValue) : value;
