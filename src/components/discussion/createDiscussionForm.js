import { Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { notifications } from "@mantine/notifications";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/Contexts/AuthContext";
import { useState } from "react";

function CreateDiscussionForm({ showForm }) {
  const { currentUser } = useAuth();
  const globalDiscussions = collection(db, "discussions/global/discussionList");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      postTitle: "",
      postContent: "",
    },

    validate: {
      postTitle: (value) =>
        !/^[a-zA-Z0-9 ]+$/.test(value)
          ? "Letters, numbers and spaces only!"
          : null,
      postContent: (value) =>
        !/^[a-zA-Z0-9 ]+$/.test(value)
          ? "Letters, numbers and spaces only!"
          : null,
    },
    validateInputOnChange: true,
  });

  async function moderatePost(title, content) {
    const res = await fetch("/api/moderate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      const { cleanedData } = await res.json();
      return cleanedData;
    } else {
      const { error } = await res.json();
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    // Testing moderation
    const cleanData = await moderatePost(
      form.values.postTitle,
      form.values.postContent
    );
    // If it's not null (no profanity)
    if (cleanData) {
      addDoc(globalDiscussions, {
        title: cleanData.cleanTitle,
        content: cleanData.cleanContent,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        comments: [],
        likes: [],
        postedAt: Timestamp.now(),
      })
        .then(() => {
          notifications.show({
            title: "Successfully posted your discussion!",
            color: "green",
            icon: <CheckCircleIcon />,
            autoClose: 1500,
            styles: {
              title: {
                color: "green",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "1rem",
              },
              icon: {
                width: "1.25rem",
                height: "1.25rem",
              },
            },
          });
          setLoading(false);
          showForm(false);
        })
        .catch((error) => console.error(error.message));
    } else {
      notifications.show({
        title:
          "Submission not allowed: Your post contains profanity! Remove profanity and try again.",
        color: "red",
        icon: <ExclamationCircleIcon />,
        autoClose: 3000,
        styles: {
          title: {
            color: "red",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontWeight: "1rem",
          },
          icon: {
            width: "1.25rem",
            height: "1.25rem",
          },
        },
      });
      setLoading(false);
    }
  }

  return (
    <section id="discussion-form">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl flex flex-wrap p-8 mb-8 border-solid border-2 border-[#e9ecef]"
      >
        <TextInput
          sx={{ width: "100%" }}
          placeholder="Title"
          mb={"sm"}
          {...form.getInputProps("postTitle")}
          required
          autoFocus
        />
        <Textarea
          sx={{ width: "100%" }}
          placeholder="Description"
          {...form.getInputProps("postContent")}
          required
        />

        <Group sx={{ width: "100%" }} position="apart" mt="md">
          <Button onClick={() => showForm(false)}>Cancel</Button>
          {form.errors > 0 ? (
            <Button disabled>Post</Button>
          ) : (
            <Button loading={loading} color="red" type="submit">
              Post
            </Button>
          )}
        </Group>
      </form>
    </section>
  );
}

export default CreateDiscussionForm;
