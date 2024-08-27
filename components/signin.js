"use client";
import React, { useState } from "react";
import signincc from "@/styles/signin.module.css";
import Image from "next/image";
import google from "@/public/google.png";
import { motion } from "framer-motion";
import { useRef } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import wizard from "@/public/wizard.png";

const Signin = () => {
//   const { data: session } = useSession();

  const [loadervisible, setloadervisible] = useState(true);
  const [loadervisiblemagic, setloadervisiblemagic] = useState(true);
  const [loadervisiblegoogle, setloadervisiblegoogle] = useState(true);
  const router = useRouter();
  const emailRef = useRef(null);
  const emailRefmagic = useRef(null);
  const passwordRef = useRef(null);

  const signInWithGoogle = async () => {
    const destination = localStorage.getItem("destination");

    setloadervisiblegoogle(false);
    try {
      await signIn("google", { redirect: false, callbackUrl: destination ?? "/"});
      setloadervisiblegoogle(true);
      
    } catch (error) {
      toast.error("Failed to sign in. Please try again.", { duration: 4000 });
      setloadervisiblegoogle(true);
    }finally {
      if (localStorage.getItem("destination")) {
        localStorage.removeItem("destination");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloadervisible(false);
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email,
        password,
      });
      if (res.ok) {
        const destination = localStorage.getItem("destination");
        setloadervisible(true);
        router.push(destination ?? "/");
        toast.success("Sign-in successfuly", { duration: 4000 });

      } else {
        if (res.error === "Validation error") {
          setloadervisible(true);
          toast.error(
            "Invalid email or password. Ensure the email address is valid and the password is at least 8 characters long, with at least one uppercase letter and one special character.",
            { duration: 6000 }
          );
        }
        if (res.error === "Email not found") {
          setloadervisible(true);
          toast.error("incorrect Email or password", { duration: 4000 });
        }
        if (res.error === "Email not active") {
          setloadervisible(true);
          toast.error("Email not Confirmed", { duration: 4000 });
        }
      }
    } catch (error) {
      console.log(error);
      setloadervisible(true);
      toast.error("internal server error", { duration: 4000 });
    } finally {
      if (localStorage.getItem("destination")) {
        localStorage.removeItem("destination");
      }
    }
  };

  const handleSubmitMagicLink = async (e) => {
    e.preventDefault();
    setloadervisiblemagic(false);
    try {
      const email = emailRefmagic.current.value;

      const res = await signIn("email", {
        redirect: false,
        callbackUrl: "/",
        email,
      });

      if (res.ok) {
        setloadervisiblemagic(true);
        toast.success("Please Check your Email", { duration: 4000 });
        router.push("/");
      }
    } catch (error) {
      toast.error("internal server error", { duration: 4000 });
      setloadervisiblemagic(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className={signincc.formcontainer}
      >
        <div className={signincc.formcontainer}>
          <p className={signincc.title}>Login</p>
          <form onSubmit={handleSubmit} className={signincc.form}>
            <div className={signincc.inputgroup}>
              <label htmlFor="email">Email</label>
              <input
                // value="stat1401@gmail.com"
                autoComplete="off"
                ref={emailRef}
                type="email"
                name="email"
                id="email2"
                placeholder="contact@houaribelsaadi.dev"
                required
              />
            </div>
            <div className={signincc.inputgroup}>
              <label htmlFor="password">Password</label>
              <input
                // value="Stat1401@"
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                placeholder="******"
                required
              />
              <div className={signincc.forgot}>
                <Link href="/">Forgot Password ?</Link>
              </div>
            </div>
            {loadervisible && (
              <button type="submit" className={signincc.sign}>
                Sign in
              </button>
            )}
            {!loadervisible && (
              <button type="submit" className={signincc.sign}>
                <Typography
                  className={signincc.typography}
                  variant="h6"
                  component="h6"
                >
                  Processing...
                </Typography>
                <Stack
                  sx={{ display: loadervisible }}
                  spacing={2}
                  direction="row"
                  className={signincc.stackloader}
                >
                  <CircularProgress color="secondary" size={22} />
                </Stack>
              </button>
            )}
          </form>
          <div className={signincc.socialmessage}>
            <div className={signincc.line}></div>
            <p className={signincc.message}>Or</p>
            <div className={signincc.line}></div>
          </div>
          <div className={signincc.socialicons}>
            {loadervisiblegoogle && (
              <div
                onClick={signInWithGoogle}
                className={signincc.containergoogle}
              >
                <button
                  aria-label="Log in with Google"
                  className={signincc.icon}
                >
                  <Image
                    src={google}
                    alt="google icon"
                    width={25}
                    height={25}
                  />
                </button>
                <span>Sign-in with google Account</span>
              </div>
            )}
            {!loadervisiblegoogle && (
              <div
                onClick={signInWithGoogle}
                className={signincc.containergoogle2}
              >
                <Typography
                  className={signincc.typography}
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "10px" }}
                >
                  Processing...
                </Typography>
                <Stack
                  sx={{ display: loadervisiblegoogle }}
                  spacing={2}
                  direction="row"
                  className={signincc.stackloader}
                >
                  <CircularProgress color="secondary" size={20} />
                </Stack>
              </div>
            )}

            <div className={signincc.socialmessage}>
              <div className={signincc.line}></div>
              <p className={signincc.message}>Or</p>
              <div className={signincc.line}></div>
            </div>

            <form onSubmit={handleSubmitMagicLink}>
              <div className={signincc.inputgroup}>
                <label htmlFor="email">Email</label>
                <input
                  autoComplete="off"
                  ref={emailRefmagic}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="contact@houaribelsaadi.dev"
                  required
                />
              </div>
              {loadervisiblemagic && (
                <button type="submit" className={signincc.containermagic}>
                  <div
                    aria-label="Log in with magic link"
                    className={signincc.icon}
                  >
                    <Image
                      src={wizard}
                      alt="wizard icon"
                      width={25}
                      height={25}
                    />
                  </div>

                  <span>Sign-in with Magic Link</span>
                </button>
              )}
              {!loadervisiblemagic && (
                <button
                  style={{ height: "40px", marginTop: "1rem" }}
                  type="submit"
                  className={signincc.sign}
                >
                  <Typography
                    className={signincc.typography}
                    variant="h6"
                    component="h6"
                    sx={{ fontSize: "10px" }}
                  >
                    Processing...
                  </Typography>
                  <Stack
                    sx={{ display: loadervisiblemagic }}
                    spacing={2}
                    direction="row"
                    className={signincc.stackloader}
                  >
                    <CircularProgress color="secondary" size={20} />
                  </Stack>
                </button>
              )}
            </form>
          </div>

          <p className={signincc.signup}>
            Don't have an account?
            <a
              rel="noopener noreferrer"
              href="/signup"
              className={signincc.signup1}
            >
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Signin;
