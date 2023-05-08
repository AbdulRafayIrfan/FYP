import { Textarea, Button } from "@mantine/core";
import React, { useState } from "react";
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
import { getDiscussionDetails } from "@/misc/firestoreQueries";

function ReplyInput({ replyingTo, commentIndex }) {
  const router = useRouter();
  const discussionId = router.query.discussionId;
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  // Reference to the current document in firestore
  const documentRef = doc(
    db,
    `discussions/global/discussionList/${discussionId}`
  );

  const form = useForm({
    initialValues: {
      replyInput: `@${replyingTo}: `,
    },

    validateInputOnChange: true,

    // DO VALIDATION HERE
    validate: {
      replyInput: (value) =>
        !/^[a-zA-Z0-9@.: ]+$/.test(value) ? "No invalid characters!" : null,
    },
  });

  async function moderateReply(title) {
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
    e.preventDefault();
    // Get the data of the discussion post
    const discussionData = await getDiscussionDetails(discussionId);
    const newCommentArray = discussionData.comments;
    // Check for profanity
    const cleanData = await moderateReply(form.values.replyInput);
    if (cleanData) {
      // Make new reply object and add to replies array
      const newReply = {
        reply: cleanData.cleanContent,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        likes: [],
        postedAt: Timestamp.now(),
      };
      // Push the reply into the replies array
      newCommentArray[commentIndex].replies.push(newReply);
      updateDoc(documentRef, {
        comments: newCommentArray,
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
          setLoading(false);
          router.reload();
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
      setLoading(false);
    }
  }

  return (
    <section id="reply-input" className="mt-4 text-right">
      <form className="inline-block w-[95%]" onSubmit={(e) => handleSubmit(e)}>
        <Textarea
          autoFocus
          required
          {...form.getInputProps("replyInput")}
          placeholder=""
        />
        {form.values.replyInput.length > 0 ? (
          <Button compact loading={loading} type="submit" my={"xs"} color="red">
            Reply
          </Button>
        ) : (
          <Button compact disabled my={"sm"} color="red">
            Reply
          </Button>
        )}
      </form>
    </section>
  );
}

export default ReplyInput;
