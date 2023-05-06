import { Textarea, Button } from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";

function CommentInput() {
  const form = useForm({
    initialValues: {
      commentInput: "",
    },

    validateInputOnChange: true,

    // DO VALIDATION HERE
    // validate: {
    //   commentInput: (value) =>
    // }
  });

  function handleSubmit() {
    console.log("Test");
  }

  return (
    <section id="comment-input" className="text-right">
      <form onSubmit={handleSubmit}>
        <Textarea
          required
          {...form.getInputProps("commentInput")}
          sx={{ width: "100%" }}
          placeholder="What are your thoughts?"
        />
        {form.values.commentInput.length > 0 ? (
          <Button my={"sm"} color="red">
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
