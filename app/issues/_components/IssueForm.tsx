'use client'
import { ErrorMessage, Spinner } from "@/app/components/index";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;




const IssueForm = ({issue}:{issue?:Issue}) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred. Please try again.");
    }
  });

  return (
    <div className="max-w-xl">
      <ErrorMessage>{error}</ErrorMessage>

      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        ></TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description} // Ensure a default empty string to avoid undefined
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
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm