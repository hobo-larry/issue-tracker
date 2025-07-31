import { Skeleton } from "@/app/components/index";
import { Box } from "@radix-ui/themes";

export const LoadingIssueNewPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingIssueNewPage;
