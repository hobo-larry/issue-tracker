import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import LatestIssues from "./LatestIssues";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

//export const revalidate = 60; // Cache page for 60 seconds rly good for alot of users accecing at the same time and it makes website faster
export const dynamic = 'force-dynamic'; //the opposite, everytime someone enters the website it accesses the db, super slow

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({
      where: { status: "OPEN" },
    }),
    prisma.issue.count({
      where: { status: "IN_PROGRESS" },
    }),
    prisma.issue.count({
      where: { status: "CLOSED" },
    }),
  ]);

  const encapsulatedValues = {
    open,
    inProgress,
    closed,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...encapsulatedValues} />
        <IssueChart {...encapsulatedValues} />
      </Flex>

      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a Summary of Project Issues",
};