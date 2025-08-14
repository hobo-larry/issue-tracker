import IssueStatusFilter from "./IssueStatusFilter";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">Add New issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
