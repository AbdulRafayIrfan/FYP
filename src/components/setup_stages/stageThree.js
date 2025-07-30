import {
  Avatar,
  Text,
  TextInput,
  FileButton,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import {
  ExclamationCircleIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useAuth } from "@/Contexts/AuthContext";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, ref } from "../../../firebase";
import { updateProfile } from "firebase/auth";

function StageThree() {
  const { currentUser } = useAuth();

  const [file, setFile] = useState(null);
  const [currentFileExt, setCurrentFileExt] = useState("");
  const [fileError, setFileError] = useState(true);
  const [photoURLChanged, setPhotoURLChanged] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const router = useRouter();

  useEffect(() => {
    function getExtension(filename) {
      let parts = filename.split(".");
      return parts[parts.length - 1];
    }

    function checkType(filename) {
      let ext = getExtension(filename);
      // Set current file extension here
      setCurrentFileExt(ext);
      switch (ext.toLowerCase()) {
        case "jpg":
        case "jpeg":
        case "png":
          return true;
      }
      return false;
    }

    if (file && file.size > 1000000) {
      notifications.show({
        title: "File size too big! Try again",
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
      setFile(null);
      setFileError(true);
    } else {
      setFileError(false);
    }

    if (file && !checkType(file.name)) {
      // Incorrect type
      notifications.show({
        title: "File type invalid! Try again",
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
      setFile(null);
      setFileError(true);
    } else {
      setFileError(false);
    }
  }, [file]);

  // Another UseEffect to call upload file
  useEffect(() => {
    // Function to upload image
    async function uploadImage() {
      const fileRef = ref(storage, currentUser.uid + "." + currentFileExt);

      uploadBytes(fileRef, file).then((snapshot) => {
        // Display uploaded image in Avatar before continuing
        getDownloadURL(fileRef).then((url) => {
          // Update profile of user to include uploaded photo
          updateProfile(currentUser, { photoURL: url }).then(() => {
            setPhotoURLChanged(true);
          });
        });
      });
    }

    // If there is a file and there is no file error (with a file extension set)
    if (file && !fileError && currentFileExt) {
      uploadImage();
    }
  }, [file, fileError, currentFileExt, currentUser]);

  // UseEffect to regularly check when photoURL is changed and display in avatar
  useEffect(() => {
    let timeoutId;

    const isPhotoURLChanged = () => {
      currentUser.reload().then(() => {
        setPhotoURL(currentUser.photoURL);
        timeoutId = setTimeout(isPhotoURLChanged, 5000);
      });
    };

    // If photoURL of current user is changed but still null value
    if (photoURLChanged && photoURL === null) {
      isPhotoURLChanged();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [photoURLChanged, currentUser, photoURL]);

  const form = useForm({
    validateInputOnChange: true,

    initialValues: {
      displayName: "",
    },

    validate: {
      displayName: (value) => {
        if (value.length > 20) return "Character Limit is 20!";
        if (!/^[a-zA-Z ]+$/.test(value))
          return "Should contain only letters/spaces!";

        // No error found
        return null;
      },
    },
  });

  function handleSubmit() {
    // Update display name of user
    // and then push user to home page
    updateProfile(currentUser, { displayName: form.values.displayName }).then(
      () => {
        router.push("/home");
      }
    );
  }

  return (
    <>
      <Text fz="lg" fw={700} mt="xl" mb="xl">
        Enter your display name & upload your profile photo
      </Text>
      <SimpleGrid cols={2} spacing={"lg"}>
        <div className="m-auto text-center">
          <Avatar
            src={photoURL}
            radius={"lg"}
            size={"lg"}
            sx={{ margin: "auto" }}
          />
          <FileButton
            onChange={setFile}
            accept="image/png, image/jpeg, image/jpg"
          >
            {(props) => (
              <Button
                leftIcon={<ArrowUpTrayIcon className="w-5 h-5" />}
                variant="outline"
                color="gray.0"
                mt="sm"
                {...props}
              >
                Upload
              </Button>
            )}
          </FileButton>
          <Text mt={"xs"} fz="xs" c="gray.4">
            Must be a .jpg or .png file smaller than 1MB
          </Text>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            styles={{
              label: {
                textAlign: "left",
                fontSize: "0.75rem",
                marginBottom: "0.75rem",
                color: "#DEE2E6",
              },
              error: {
                color: "orange",
                fontSize: "0.8125rem",
                textAlign: "left",
              },
              required: { color: "white" },
            }}
            label={"Your display name (Will be visible to others)"}
            placeholder="Display name"
            required
            {...form.getInputProps("displayName")}
          />
          <div className="flex justify-end">
            {file && !fileError && photoURL ? (
              <Button mt={"xl"} type="submit">
                Next
              </Button>
            ) : null}
          </div>
        </form>
      </SimpleGrid>
    </>
  );
}

export default StageThree;
