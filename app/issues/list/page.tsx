import prisma from "@/prisma/client";

import Pagination from "@/app/components/Pagination";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

export default async function IssuesPage(props: Props) {
  const searchParams = await props.searchParams;
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const validDirections = ["asc", "desc"] as const;
  const direction = validDirections.includes(searchParams.direction as any)
    ? (searchParams.direction as "asc" | "desc")
    : "desc";

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: direction }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View All Project Issues",
};
export const dynamic = "force-dynamic";
