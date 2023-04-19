import { Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { notifications } from "@mantine/notifications";

function CreateDiscussionForm({ showForm }) {
  const globalDiscussions = collection(db, "discussions/global/discussionList");

  const form = useForm({
    // validate: {
    //   title: (value) => (value.length < 1 ? "Please give a title" : null),
    //   description: (value) =>
    //     value.length < 1 ? "Please give a description" : null,
    // },
    // validateInputOnChange: true,
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form.values.title, form.values.description);
    addDoc(globalDiscussions, {
      title: form.values.title,
      content: form.values.description,
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
        showForm(false);
      })
      .catch((error) => console.error(error.message));
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
          {...form.getInputProps("title")}
          required
          autoFocus
        />
        <Textarea
          sx={{ width: "100%" }}
          placeholder="Description"
          {...form.getInputProps("description")}
          required
        />

        <Group sx={{ width: "100%" }} position="apart" mt="md">
          <Button onClick={() => showForm(false)}>Cancel</Button>
          {form.errors > 0 ? (
            <Button disabled>Post</Button>
          ) : (
            <Button color="red" type="submit">
              Post
            </Button>
          )}
        </Group>
      </form>
    </section>
  );
}

export default CreateDiscussionForm;
