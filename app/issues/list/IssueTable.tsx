import { IssueStatusBadge } from '@/app/components'
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons'
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from 'next/link'
import React from 'react'
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { Prisma } from "@prisma/client";



export interface IssueQuery{
    status: Status;
  orderBy: keyof Issue;
  direction?: "asc" | "desc";
  page: string;

}

interface Props {
  searchParams: IssueQuery;
  issues: IssueWithAssignedUser[];
}
type IssueWithAssignedUser = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

const IssueTable = ({searchParams, issues}:Props) => {
  
  
    
    
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
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
            <Table.Cell className="hidden md:table-cell">
              {issue.assignedToUser && (
                <Avatar
                  size="2"
                  radius="full"
                  src={issue.assignedToUser.image ?? undefined}
                  fallback="?"
                />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
 const columns: { label: string; value: keyof Issue; className?: string }[] = [
   { label: "Issue", value: "title" },
   { label: "Status", value: "status", className: "hidden md:table-cell" },
   { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
   {
     label: "Assigned",
     value: "assignedToUserId",
     className: "hidden md:table-cell",
   },
 ];
export const columnNames = columns.map(column => column.value)

export default IssueTable