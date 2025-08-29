import Layout from "@/components/layout";
import Head from "next/head";
import React, { useState } from "react";
import { Button, Container, Grid, Text } from "@mantine/core";
import { protectedPage } from "@/components/hoc/protectedPage";
import TechniqueSelector from "@/components/time-management/techniqueSelector";
import TechniqueContent from "@/components/time-management/techniqueContent";

function Index() {
  let techniquesData = require("../../misc/techniqueList.json");
  const [selectedTechnique, setSelectedTechnique] = useState("POMODORO");
  return (
    <>
      <Head>
        <title>Time management</title>
      </Head>
      <Layout>
        <Container mb={"md"} size="xs">
          <section id="heading" className="text-center mb-8">
            <Text fw={700} color="gray.7" tt={"uppercase"} fz="xl">
              Improve Your{" "}
              <Text color="red" component="span">
                Productivity
              </Text>{" "}
              and{" "}
              <Text color="red" component="span">
                Focus
              </Text>
            </Text>
          </section>
          <Grid>
            {techniquesData.map((val, idx) => {
              return (
                <Grid.Col span={4} key={idx}>
                  <TechniqueSelector
                    onClick={setSelectedTechnique}
                    key={idx}
                    data={val}
                  />
                </Grid.Col>
              );
            })}
            <Grid.Col span={12}>
              <TechniqueContent technique={selectedTechnique} />
            </Grid.Col>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}

export default protectedPage(Index);
