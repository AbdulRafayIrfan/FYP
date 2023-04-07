import { Avatar, TextInput } from "@mantine/core";

function CreateDiscussion({ showForm }) {
  return (
    <section className="border-[1px] border-solid box-border w-full min-w-[320px] border-[#ccc] mb-8 p-1 flex gap-2">
      <Avatar src={null} color="gray.5" />
      <TextInput
        sx={{ width: "92%" }}
        styles={{
          input: {
            backgroundColor: "#efefef",
            color: "#999999",
            "::placeholder": { color: "#999999" },
          },
        }}
        placeholder="Start a discussion..."
        onClick={() => showForm(true)}
      />
    </section>
  );
}

export default CreateDiscussion;
