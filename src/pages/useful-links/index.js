import Head from "next/head";
import Layout from "../../components/layout";
import { Container, Grid, Text } from "@mantine/core";
import { protectedPage } from "@/components/hoc/protectedPage";
import { ArrowDownTrayIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function UsefulLinks() {
  const [showAcademicLinks, setShowAcademicLinks] = useState();
  const [showOtherLinks, setShowOtherLinks] = useState();
  const [showTemplates, setShowTemplates] = useState();

  return (
    <>
      <Head>
        <title>Useful Links</title>
      </Head>
      <Layout>
        <Container mb={"md"} size={"sm"}>
          <section id="heading" className="text-center mb-8">
            <Text fw={700} color="gray.7" tt={"uppercase"} fz="xl">
              Useful Resources
            </Text>
          </section>
          <Grid justify="center">
            <Grid.Col
              sx={{ borderRadius: "10px" }}
              mx="sm"
              mt="sm"
              bg={"red.6"}
              md={5}
              sm={12}
              onMouseEnter={() => setShowAcademicLinks(true)}
              onMouseLeave={() => setShowAcademicLinks(false)}
            >
              <Text
                tt={"uppercase"}
                fz={"xl"}
                fw={700}
                color="white"
                ta={"center"}
                mb={"sm"}
              >
                Academic Links <AcademicCapIcon className="ml-2 h-6 w-6 mt0" />
              </Text>
              {showAcademicLinks && (
                <>
                  <a
                    className="text-white block"
                    href="https://blackboard.salford.ac.uk/bbcswebdav/pid-8033152-dt-content-rid-36086732_1/xid-36086732_1"
                    target="_blank"
                  >
                    BUB Academic Calender 2022-2023
                  </a>
                  <a
                    className="text-white block"
                    href="https://www.salford.ac.uk/skills/referencing/apa-7th-edition"
                    target="_blank"
                  >
                    BUB Referencing Guide (APA 7th)
                  </a>
                  <a
                    className="text-white block"
                    href="https://www.salford.ac.uk/skills/referencing/apa-7th-edition"
                    target="_blank"
                  >
                    LinkedIn Learning
                  </a>
                  <a
                    className="text-white block"
                    href="https://padlet.com/bublibrary/list-of-resources-idjcflbxefkg"
                    target="_blank"
                  >
                    BUB Library Resources
                  </a>
                </>
              )}
            </Grid.Col>
            <Grid.Col
              sx={{ borderRadius: "10px" }}
              mt="sm"
              bg={"red.6"}
              md={5}
              sm={12}
              onMouseEnter={() => setShowOtherLinks(true)}
              onMouseLeave={() => setShowOtherLinks(false)}
            >
              <Text
                tt={"uppercase"}
                fz={"xl"}
                fw={700}
                color="white"
                ta={"center"}
                mb="sm"
              >
                Other Links
              </Text>
              {showOtherLinks && (
                <>
                  <a
                    className="text-white block"
                    href="https://www.youtube.com/watch?v=l7yAzvgBmtI"
                    target="_blank"
                  >
                    Blackboard Guide
                  </a>
                  <a
                    className="text-white block"
                    href="https://www.instagram.com/bub_bh/"
                    target="_blank"
                  >
                    BUB Instagram
                  </a>
                </>
              )}
            </Grid.Col>
            <Grid.Col
              sx={{ borderRadius: "10px" }}
              mt={"md"}
              grow
              bg={"red.6"}
              md={6}
              sm={12}
              onMouseEnter={() => setShowTemplates(true)}
              onMouseLeave={() => setShowTemplates(false)}
            >
              <Text
                tt={"uppercase"}
                fz={"xl"}
                fw={700}
                color="white"
                ta={"center"}
                mb="sm"
              >
                BUB Templates <ArrowDownTrayIcon className="ml-2 h-6 w-6" />
              </Text>
              {showTemplates && (
                <>
                  <a
                    className="text-white block"
                    href="https://blackboard.salford.ac.uk/bbcswebdav/pid-6806605-dt-content-rid-30397737_1/xid-30397737_1"
                    download
                  >
                    BUB PowerPoint Template
                  </a>
                  <a
                    className="text-white block"
                    href="https://blackboard.salford.ac.uk/bbcswebdav/pid-6806606-dt-content-rid-30397738_1/xid-30397738_1"
                    download
                  >
                    BUB MS Word Template
                  </a>
                  <a
                    className="text-white block"
                    href="https://blackboard.salford.ac.uk/bbcswebdav/pid-7675233-dt-content-rid-33171653_1/xid-33171653_1"
                    download
                  >
                    BUB Assessment Coversheet
                  </a>
                </>
              )}
            </Grid.Col>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}

export default protectedPage(UsefulLinks);
