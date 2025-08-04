'use client'

import dynamic from 'next/dynamic'
import IssueFormSkeleton from './IssueFormSkeleton';
const SsrFalse = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
export default SsrFalse