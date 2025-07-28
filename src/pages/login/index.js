import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Anchor,
  Text,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Head from "next/head";
import Image from "next/image";
import bshLogo from "../../../public/logos/bsh-logo-white.png";
import { useRouter } from "next/router";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../Contexts/AuthContext";
import { notifications } from "@mantine/notifications";

function Login() {
  const router = useRouter();

  const { login, anonymousLogin } = useAuth();

  const [loading, setLoading] = useState({state: false, type: ""});

  // Defining form's initial values
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  // Guest login
  const handleGuestLogin = async () => {
    try {
      setLoading({state: true, type: "guest"});
      await anonymousLogin();
      form.reset();
      router.push("/home");
    } catch (error) {
      notifications.show({
            title: "An error occured, please try again",
            color: "red",
            icon: <ExclamationCircleIcon />,
            styles: {
              title: {
                color: "red",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "1rem",
              },
              icon: { width: "1.25rem", height: "1.25rem" },
            },
          });
    }
    setLoading({state: false, type: ""});
  }

  // Form submit function
  const handleSubmit = async () => {
    try {
      setLoading({state: true, type: "user"});
      await login(form.values.email, form.values.password);
      form.reset();
      // Direct user to home upon successful log-in,
      // if user is unverified, they'll be pushed to
      // setup page
      router.push("/home");
    } catch (error) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/invalid-email":
        case "auth/wrong-password":
        case "auth/user-not-found": {
          notifications.show({
            title: "Wrong Email/Password.",
            color: "red",
            icon: <ExclamationCircleIcon />,
            styles: {
              title: {
                color: "red",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "1rem",
              },
              icon: { width: "1.25rem", height: "1.25rem" },
            },
          });
        }
      }
    }

    setLoading({state: false, type: ""});
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex justify-center items-center h-screen bg-secondary">
        {/* Login box from Mantine */}
        <Box sx={{ maxWidth: 375, width: "95%" }}>
          {/* Header */}
          <header className="text-center">
            <Image
              src={bshLogo}
              alt="bsh-logo"
              width="200"
              height="232"
              className="mb-8"
              priority
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
          </header>
          {/* Form */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              required
              label="Email"
              type="email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
              styles={{
                label: { color: "white" },
                required: { color: "whitesmoke" },
              }}
            />

            <Group position="apart" mt="xl">
              <Text
                component="label"
                htmlFor="your-password"
                size="sm"
                weight={500}
                color="gray.0"
              >
                Password *
              </Text>
            </Group>

            <PasswordInput
              required
              placeholder="Password"
              {...form.getInputProps("password")}
              styles={{
                label: { color: "white" },
                required: { color: "whitesmoke" },
              }}
            />

            <Group position="apart" mt="lg">
              {loading.state && loading.type == "guest" ? (
                <Button
                  loading
                  loaderPosition="center"
                  variant="gradient"
                >
                  Try as Guest
                </Button>
              ) : (
                 <Button
                  onClick={handleGuestLogin}
                  variant="gradient">
                  Try as Guest
                </Button>
              )
            }
              {loading.state && loading.type == "user" ? (
                <Button
                  loading
                  loaderPosition="center"
                  variant="outline"
                  type="submit"
                  color="gray.0"
                >
                  Login
                </Button>
              ) : (
                <Button variant="outline" type="submit" color="gray.0">
                  Login
                </Button>
              )}
            </Group>
          </form>
        </Box>
      </main>
    </>
  );
}

export default Login;
