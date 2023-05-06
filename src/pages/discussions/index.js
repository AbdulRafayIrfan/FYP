import { Container } from "@mantine/core";
import Layout from "../../components/layout";
import CreateDiscussion from "../../components/discussion/createDiscussion";
import DiscussionList from "@/components/discussion/discussionList";
import { useState } from "react";
import CreateDiscussionForm from "@/components/discussion/createDiscussionForm";
import Head from "next/head";

function Discussions() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Head>
        <title>Discussions</title>
      </Head>
      <Layout>
        <Container
          size="md"
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(320px, 576px)",
            justifyItems: "center",
            justifyContent: "center",
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
    </>
  );
}

export default Discussions;
