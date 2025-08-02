import { Container } from "@mantine/core";
import Layout from "../../components/layout";
import CreateDiscussion from "../../components/discussion/createDiscussion";
import DiscussionList from "@/components/discussion/discussionList";
import { useState } from "react";
import CreateDiscussionForm from "@/components/discussion/createDiscussionForm";
import Head from "next/head";
import { protectedPage } from "@/components/hoc/protectedPage";

function Discussions() {
  const [showForm, setShowForm] = useState(false);
  const [activeSort, setActiveSort] = useState("");

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
              <CreateDiscussion
                showForm={setShowForm}
                activeSort={activeSort}
                updateSort={setActiveSort}
              />
              <DiscussionList activeSort={activeSort} />
            </>
          ) : (
            <CreateDiscussionForm showForm={setShowForm} />
          )}
        </Container>
      </Layout>
    </>
  );
}

export default protectedPage(Discussions);
