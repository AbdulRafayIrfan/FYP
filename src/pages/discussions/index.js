import { Container } from "@mantine/core";
import Layout from "../../components/layout";
import CreateDiscussion from "../../components/createDiscussion";
import DiscussionList from "@/components/discussionList";
import { useState } from "react";
import CreateDiscussionForm from "@/components/createDiscussionForm";

function Discussions() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Layout>
      <Container
        size="md"
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(320px, 576px)",
          justifyItems: "center",
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {!showForm ? (
          <>
            <CreateDiscussion showForm={setShowForm} />
            <DiscussionList />
          </>
        ) : (
          <CreateDiscussionForm showForm={setShowForm} />
        )}
      </Container>
    </Layout>
  );
}

export default Discussions;
