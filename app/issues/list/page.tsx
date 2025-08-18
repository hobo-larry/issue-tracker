import { Table } from "@radix-ui/themes";

import prisma from "@/prisma/client";
import NextLink from "next/link";

import { IssueStatusBadge, Link } from "@/app/components/index";

import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
type SearchParams = Promise<{
  status: Status;
  orderBy: keyof Issue;
  direction?: "asc" | "desc";
}>;

interface Props {
  searchParams: SearchParams;
}

export default async function IssuesPage(props: Props) {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const searchParams = await props.searchParams;
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.direction || "desc" }
    : { createdAt: "desc" }; // default sorting

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: searchParams.orderBy
      ? {
          [searchParams.orderBy]: (searchParams.direction || "desc") as
            | "asc"
            | "desc",
        }
      : { createdAt: "desc" },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      direction:
                        searchParams.orderBy === column.value
                          ? searchParams.direction === "asc"
                            ? "desc"
                            : "asc"
                          : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy ? (
                  searchParams.direction === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  )
                ) : null}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
export const dynamic = "force-dynamic";

