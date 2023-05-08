import Head from "next/head";
import Layout from "../../components/layout";
import { Container, Grid, Text } from "@mantine/core";
import { protectedPage } from "@/components/hoc/protectedPage";
import { ArrowDownTrayIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

function UsefulLinks() {
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
            <Grid.Col mx="sm" mt="sm" bg={"red.6"} md={5} sm={12}>
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
              <a
                className="text-white block"
                href="https://blackboard.salford.ac.uk/bbcswebdav/pid-8033152-dt-content-rid-36086732_1/xid-36086732_1"
                target="_blank"
              >
                BUB Academic Calender 2022-2023
              </a>
            </Grid.Col>
            <Grid.Col mt="sm" bg={"red.6"} md={5} sm={12}>
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
            </Grid.Col>
            <Grid.Col mt={"md"} grow bg={"red.6"} md={6} sm={12}>
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
            </Grid.Col>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}

export default protectedPage(UsefulLinks);
