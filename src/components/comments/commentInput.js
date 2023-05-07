import { Textarea, Button } from "@mantine/core";
import React, { useRef } from "react";
import { useForm } from "@mantine/form";

function CommentInput({ focus }) {
  const ref = useRef(null);

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

  if (focus) {
    ref.current.focus();
  }

  return (
    <section id="comment-input" className="text-right">
      <form onSubmit={handleSubmit}>
        <Textarea
          required
          {...form.getInputProps("commentInput")}
          sx={{ width: "100%" }}
          placeholder="What are your thoughts?"
          ref={ref}
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
