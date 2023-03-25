import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Anchor,
  Text,
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

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  // Defining form's initial values
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  // Form submit function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await login(form.values.email, form.values.password);
      form.reset();
      router.push("/home");
    } catch (error) {
      const errorCode = error.code;
      notifications.show({
        title: errorCode,
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

    setLoading(false);
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

              <Anchor
                color="gray.0"
                size="xs"
                onClick={(event) => event.preventDefault()}
                sx={{ fontWeight: "500" }}
              >
                Forgot your password?
              </Anchor>
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
              <Anchor
                color="gray.0"
                component="button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/register");
                }}
                size="sm"
              >
                {`Don't have an account? Register`}
              </Anchor>
              {loading ? (
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
