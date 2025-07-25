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

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdOutlineErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/");
          } catch (error) {
            setError("An unexpected error occurred. Please try again.");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>

        {errors.title && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Icon>
              <MdOutlineErrorOutline />
            </Callout.Icon>
            <Callout.Text>{errors.title.message}</Callout.Text>
          </Callout.Root>
        )}
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
        {errors.description && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Icon>
              <MdOutlineErrorOutline />
            </Callout.Icon>
            <Callout.Text>{errors.description.message}</Callout.Text>
          </Callout.Root>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuesPage