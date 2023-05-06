import Head from "next/head";
import Layout from "../../components/layout";
import {
  Container,
  Paper,
  Grid,
  Col,
  Text,
  List,
  ListItem,
  Link,
  Button,
} from "@mantine/core";
import { protectedPage } from "@/components/hoc/protectedPage";

function UsefulLinks() {
  return (
    <>
      <Head>
        <title>Useful Links</title>
      </Head>
      <Layout>
        <div>Useful University Resources</div>
        <main>
          <Container>
            <Grid gutter="md" style={{ marginTop: 30 }}>
              <Col span={6}>
                <Paper padding="md" shadow="xs">
                  <Text size="xl" weight={700} style={{ marginBottom: 20 }}>
                    Useful Links
                  </Text>
                  <List>
                    {usefulLinks.map((link) => (
                      <ListItem key={link.id}>
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.title}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Col>
              <Col span={6}>
                <Paper padding="md" shadow="xs">
                  <Text size="xl" weight={700} style={{ marginBottom: 20 }}>
                    Download Templates
                  </Text>
                  <List>
                    {downloadLinks.map((link) => (
                      <ListItem key={link.id}>
                        <Button
                          component={Link}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.title}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Col>
            </Grid>
          </Container>
        </main>
      </Layout>
    </>
  );
}

export default protectedPage(UsefulLinks);
