import React from "react";

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

import SsrFalse from "../../_components/SsrFalse";
<SsrFalse />;
interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const parsedId = Number(id);
  const issue = await prisma.issue.findUnique({
    where: { id: parsedId },
  });
  if (!issue) notFound();
  return <SsrFalse issue={issue} />;
};

export default EditIssuePage;
