import { Textarea, Button } from "@mantine/core";
import React, { useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/Contexts/AuthContext";
import { db } from "../../../firebase";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

function CommentInput({ focus, updateCommentList }) {
  const router = useRouter();
  const discussionId = router.query.discussionId;
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  // Reference to the current document in firestore
  const documentRef = doc(
    db,
    `discussions/global/discussionList/${discussionId}`
  );

  // Ref for comment input
  const ref = useRef(null);

  const form = useForm({
    initialValues: {
      commentInput: "",
    },

    validateInputOnChange: true,

    // DO VALIDATION HERE
    validate: {
      commentInput: (value) =>
        !/^[a-zA-Z0-9@. ]+$/.test(value) ? "No invalid characters!" : null,
    },
  });

  async function moderateComment(title) {
    const res = await fetch("/api/moderate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
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
    // Prevent default behaviour
    e.preventDefault();
    // Check for profanity first
    const cleanData = await moderateComment(form.values.commentInput);
    // Accordingly post comment or warn user
    if (cleanData) {
      // Make new comment object to add to comments array
      const newComment = {
        comment: cleanData.cleanContent,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        likes: [],
        replies: [],
        postedAt: Timestamp.now(),
      };
      // Update comments array in firestore to add new comment
      updateDoc(documentRef, {
        comments: arrayUnion(newComment),
      })
        .then(() => {
          notifications.show({
            title: "Successfully posted your comment!",
            color: "green",
            autoClose: 2000,
            icon: <CheckCircleIcon />,
            styles: {
              title: {
                color: "green",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "1rem",
              },
            },
          });
          form.reset();
          // Fetch comments list again with newly added comment
          updateCommentList();
        })
        .catch((error) => console.error(error));
    } else {
      notifications.show({
        title:
          "Submission not allowed: Your comment contains profanity! Remove profanity and try again.",
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
    }
    setLoading(false);
  }

  // Focus input field
  if (focus) {
    ref.current.focus();
  }

  return (
    <section id="comment-input" className="text-right">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Textarea
          required
          {...form.getInputProps("commentInput")}
          sx={{ width: "100%" }}
          placeholder="What are your thoughts?"
          ref={ref}
        />
        {form.values.commentInput.length > 0 ? (
          <Button loading={loading} type="submit" my={"sm"} color="red">
            Comment
          </Button>
        ) : (
          <Button disabled my={"sm"} color="red">
            Comment
          </Button>
        )}
      </form>
    </section>
  );
}

export default CommentInput;
