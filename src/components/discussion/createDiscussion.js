import { Avatar, TextInput } from "@mantine/core";
import { useAuth } from "@/Contexts/AuthContext";
import DiscussionGroupDropdown from "./discussionGroupDropdown";

function CreateDiscussion({ showForm, activeSort, updateSort }) {
  const { currentUser } = useAuth();

  return (
    <section className="border-[1px] border-solid box-border w-full min-w-[320px] border-[#ccc] mb-8 p-1 flex gap-2">
      <Avatar
        radius={"xl"}
        src={currentUser && currentUser.photoURL}
        color="gray.5"
      />
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
      <DiscussionGroupDropdown
        activeSort={activeSort}
        updateSort={updateSort}
      />
    </section>
  );
}

export default CreateDiscussion;
