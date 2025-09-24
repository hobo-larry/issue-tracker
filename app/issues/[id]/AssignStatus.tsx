"use client"

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Status } from "@prisma/client";

const statuses: { label: string; value?: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const AssignStatus = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const assignNewStatus = async (newStatus: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status: newStatus,
      });
      router.refresh();
    } catch (error) {
      toast.error("changes could not be saved");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(value) => assignNewStatus(value as Status)}
      >
        <Select.Trigger placeholder={issue.status} />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>

            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value!}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};



export default AssignStatus


  