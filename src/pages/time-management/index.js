import Layout from "@/components/layout";
import Head from "next/head";
import React from "react";
import {
  Container,
  Grid,
  Col,
  Paper,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { TechniqueContent } from "/components/techniques";

function Index() {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  return (
    <>
      <Head>
        <title>Time management</title>
      </Head>
      <Layout>
        <div>
          <main>
            <Container>
              <Grid gutter="md" style={{ marginTop: 30 }}>
                <Col span={3}>
                  <Paper padding="md" shadow="xs">
                    <Text size="xl" weight={700} style={{ marginBottom: 20 }}>
                      Techniques
                    </Text>
                    <Group direction="column" spacing="md">
                      {techniques.map((technique) => (
                        <Button
                          key={technique.id}
                          onClick={() => setSelectedTechnique(technique.id)}
                          variant={
                            selectedTechnique === technique.id
                              ? "filled"
                              : "light"
                          }
                          fullWidth
                        >
                          {technique.name}
                        </Button>
                      ))}
                    </Group>
                  </Paper>
                </Col>
                <Col span={9}>
                  <Paper padding="md" shadow="xs" style={{ minHeight: 400 }}>
                    <TechniqueContent technique={selectedTechnique} />
                  </Paper>
                </Col>
              </Grid>
            </Container>
          </main>
        </div>
      </Layout>
    </>
  );
}

export default Index;
