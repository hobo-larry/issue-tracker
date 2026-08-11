import React from "react";

import IssueFormLoader from "../_components/IssueFormLoader";
import AuthGuard from "@/app/components/AuthGuard";

const NewIssuePage = () => {
  return (
    <AuthGuard>
      <IssueFormLoader />
    </AuthGuard>
  );
};

export default NewIssuePage;
