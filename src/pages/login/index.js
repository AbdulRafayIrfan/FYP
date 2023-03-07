import React from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Head from "next/head";
import Image from "next/image";
import bshLogo from "../../../public/logos/bsh-logo-white.png";

function Login() {
  // Defining form's initial values
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="flex justify-center items-center h-screen bg-secondary">
        {/* Login box from Mantine */}
        <Box sx={{ maxWidth: 400, width: 360 }}>
          {/* Header */}
          <header className="text-white text-center">
            <Image
              src={bshLogo}
              alt="bsh-logo"
              width="200"
              height="232"
              className="mb-8"
            />
          </header>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            <PasswordInput
              required
              placeholder="Password"
              label="Password"
              {...form.getInputProps("password")}
              mt="xl"
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
                onClick={
                  {
                    /* onClick function here */
                  }
                }
                size="sm"
              >
                {`Don't have an account? Register`}
              </Anchor>
              <Button variant="outline" type="submit" color="gray.0">
                Login
              </Button>
            </Group>
          </form>
        </Box>
      </main>
    </>
  );
}

export default Login;
