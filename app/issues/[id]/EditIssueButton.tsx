import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({issueId}:{issueId:number}) => {
  return (
    <Link
      href={`/issues/edit/${issueId}`}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      <Pencil2Icon className="mr-2" />
      Edit Issue
    </Link>
  );
}

export default EditIssueButton