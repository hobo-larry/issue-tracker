'use client'
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import { MdOutlineErrorOutline } from "react-icons/md";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, //The ssr: false ensures it won't be run on the server, avoiding the document error.
});
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuesPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className="max-w-xl">
      <ErrorMessage>{error}</ErrorMessage>

      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/");
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected error occurred. Please try again.");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue="" // Ensure a default empty string to avoid undefined
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              value={field.value || ""} // Fallback to empty string
              onChange={(value) => field.onChange(value)} // Explicitly pass string value
              onBlur={field.onBlur} // Handle blur for validation
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuesPage