import React from "react";

const baseUrl = process.env.REACT_BASE_URL;

export const registerUser = async (
  email,
  firstName,
  lastName,
  imageUrl,
  password
) => {
  let registerData = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    imageUrl: imageUrl,
    password: password,
  };
  let result = await fetch(
    "https://nftmarketbackendapp.herokuapp.com/api/signup",
    {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  ).then((response) => {
    return response.json();
  });

  return result;
};

export const loginWithGoogle = async (
  sub,
  name,
  given_name,
  family_name,
  picture,
  email,
  email_verified,
  locale
) => {
  let registerData = {
    sub: sub,
    name: name,
    given_name: given_name,
    family_name: family_name,
    picture: picture,
    email: email,
    email_verified: email_verified,
    locale: locale,
  };
  let result = fetch(
    "https://nftmarketbackendapp.herokuapp.com/api/loginWithGoogle",
    {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  ).then((response) => {
    return response.json();
  });
  return result;
};

export const login = async (email, password) => {
  let loginData = {
    email: email,
    password: password,
  };
  let result = fetch("https://nftmarketbackendapp.herokuapp.com/api/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  }).then((response) => {
    return response.json();
  });

  return result;
};

export const forgotPassword = async (email) => {
  let forgotData = {
    email: email,
  };
  let result = fetch(
    "https://nftmarketbackendapp.herokuapp.com/api/forgetPassword",
    {
      method: "POST",
      body: JSON.stringify(forgotData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  ).then((response) => {
    return response.json();
  });

  return result;
};

export const updateNewPassword = async (password, tokenParam) => {
  let updatePasswordData = {
    password: password,
  };
  let result = fetch(
    `https://nftmarketbackendapp.herokuapp.com/api/updateNewPassword/${tokenParam}`,
    {
      method: "PUT",
      body: JSON.stringify(updatePasswordData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  ).then((response) => {
    return response.json();
  });

  return result;
};

export const getAllUsers = async () => {
  const result = await fetch(
    "https://nftmarketbackendapp.herokuapp.com/api/getUserData"
  ).then((response) => {
    return response.json();
  });

  return result;
};
