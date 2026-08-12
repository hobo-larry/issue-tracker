import { IssueStatusBadge } from '@/app/components'
import { Prisma } from "@prisma/client";
import { Card, Flex, Heading, Text, Avatar } from "@radix-ui/themes";
import ReactMarkdown from 'react-markdown'



type IssueWithAssignedUser = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

const IssueDetails = ({ issue }: { issue: IssueWithAssignedUser }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>

      <Flex
        align="center"
        gap="3"
        my="3"
        className="flex-col items-start md:flex-row md:items-center"
      >
        <Flex align="center" gap="3">
          <IssueStatusBadge status={issue.status} />
          <Text size="2">{issue.createdAt.toDateString()}</Text>
        </Flex>

        {issue.assignedToUser && (
          <Flex align="center" gap="2" className="md:ml-auto">
            <Text size="2">{issue.assignedToUser.name ?? "Unassigned"}</Text>

            <Avatar
              size="2"
              radius="full"
              src={issue.assignedToUser.image ?? undefined}
              fallback={issue.assignedToUser.name?.[0] ?? "?"}
            />
          </Flex>
        )}
      </Flex>

      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails