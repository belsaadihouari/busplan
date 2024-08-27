"use client";
import React, { useState } from "react";
import signincc from "@/styles/signin.module.css";
import { motion } from "framer-motion";
import signupcss from "@/styles/signup.module.css";
import { useRef } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Link from "next/link";
const Signup = () => {
  const [loadervisible, setloadervisible] = useState(true);
  const router = useRouter();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  const handleSubmit = async (e) => {
    setloadervisible(false);
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cpassword = cpasswordRef.current.value;
    e.preventDefault();
    try {
      const response = await fetch("/api/signup/roote", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          cpassword: cpassword,
        }),
      });
      const data = await response.json();
      if (data.message) {
        toast.success("Please verify your email", { duration: 5000 });
        router.push("/signin");
      }
      if (data.validator) {
        const usernameError = data.validator.issues.find(
          (issue) => issue.path[0] === "username"
        );

        if (usernameError) {
          toast.error("Username must contain at least 3 characters", {
            duration: 4000,
          });
          setloadervisible(true);
          return true;
        }

        const emailError = data.validator.issues.find(
          (issue) => issue.path[0] === "email"
        );
        if (emailError) {
          toast.error("Invalide Email", { duration: 4000 });
          setloadervisible(true);
          return true;
        }

        const passwordError = data.validator.issues.find(
          (issue) => issue.path[0] === "password"
        );
        if (passwordError) {
          toast.error(
            "The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            { duration: 4000 }
          );
          setloadervisible(true);
          return true;
        }
      }

      if (data.confirm) {
        toast.error("Error Confirmation Password", { duration: 4000 });
        setloadervisible(true);
        return true;
      }

      if (data.isCurrentEmail) {
        toast.error("Email already exist", { duration: 4000 });
        setloadervisible(true);
      }
    } catch (error) {
      toast.error("Error Processing Sign-up", { duration: 4000 });
      setloadervisible(true);
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className={signupcss.formcontainer}
      >
        <div className={signupcss.formcontainer}>
          <p className={signincc.title}>Sign up</p>
          <form onSubmit={handleSubmit} className={signincc.form}>
            <div className={signincc.inputgroup}>
              <label htmlFor="username">Username</label>
              <input
                autoComplete="off"
                ref={usernameRef}
                type="text"
                name="username"
                id="username"
                placeholder="belsaadi"
                required
              />
            </div>
            <div className={signincc.inputgroup}>
              <label htmlFor="email">Email</label>
              <input
                autoComplete="off"
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                placeholder="contact@houaribelsaadi.dev"
                required
              />
            </div>
            <div className={signincc.inputgroup}>
              <label htmlFor="password">Password</label>
              <input
                autoComplete="off"
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                placeholder=""
                required
              />
            </div>
            <div className={signincc.inputgroup}>
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                autoComplete="off"
                ref={cpasswordRef}
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder=""
                required
              />
            </div>
            {loadervisible && (
              <button type="submit" className={signupcss.sign}>
                Sign up
              </button>
            )}
            {!loadervisible && (
              <button type="submit" className={signupcss.sign}>
                <Typography
                  className={signupcss.typography}
                  variant="h6"
                  component="h6"
                >
                  Processing...
                </Typography>
                <Stack
                  sx={{ display: loadervisible }}
                  spacing={2}
                  direction="row"
                  className={signupcss.stackloader}
                >
                  <CircularProgress color="secondary" size={22} />
                </Stack>
              </button>
            )}
          </form>

          <p className={signincc.signup}>
            Already have an account?
            <Link rel="noopener noreferrer" href="/" className={signincc.signup1}>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Signup;
