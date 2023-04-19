import { Container, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Head from "next/head";
import NextChevronBtn from "../../components/chevronBtns/nextChevronBtn";
import Link from "next/link";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../Contexts/AuthContext";
import { useState } from "react";

function Register() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validateInputOnChange: true,

    validate: {
      email: (value) =>
        // Make sure email is a student's email, for eg: test@bub.edu.bh
        /^[a-zA-Z.]+@bub\.edu\.bh$/.test(value)
          ? null
          : "Invalid email! Should be a BUB student email",
      password: (value) =>
        value.length < 8
          ? "Password should be atleast 8 characters long!"
          : null,
      confirmPassword: (value, values) =>
        value != values.password ? "Passwords do not match!" : null,
    },
  });

  // Logic for when form is submitted without any errors
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await register(form.values.email, form.values.password);
      // Navigate user to setup-profile page
      router.push("/setup-profile");
    } catch (error) {
      const errorCode = error.code;
      showNotification({
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

  // Error styling variable for re-usability
  const formStyling = {
    error: { color: "orange", fontSize: "0.8125rem" },
    required: { color: "white" },
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main className="flex justify-center items-center h-screen bg-secondary">
        <Container sx={{ maxWidth: 375, width: "95%", padding: 0 }}>
          <section className="text-white text-center">
            <Title order={1}>Sign Up</Title>
          </section>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              mt="xl"
              label="Email"
              required
              placeholder="your@bub.edu.bh"
              {...form.getInputProps("email")}
              sx={{ color: "white" }}
              styles={{
                error: {
                  color: "orange",
                  fontSize: "0.8125rem",
                },
                required: { color: "white" },
              }}
            />
            <PasswordInput
              mt="xl"
              required
              sx={{ color: "white" }}
              styles={formStyling}
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              mt="xl"
              required
              sx={{ color: "white" }}
              styles={formStyling}
              label="Confirm password"
              placeholder="Confirm password"
              {...form.getInputProps("confirmPassword")}
            />
            <div className="flex justify-between items-center mt-7">
              <Link
                className="text-white text-sm no-underline hover:underline"
                href={"/login"}
              >
                Already have an account? Sign in
              </Link>
              <NextChevronBtn type="submit" loading={loading} />
            </div>
          </form>
        </Container>
      </main>
    </>
  );
}

export default Register;
