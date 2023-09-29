import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { NoteType } from "@/types";
import { useContext } from "react";
import { NotesContext } from "@/context/NotesContext";
import { showFormattedDate } from "@/utils";

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(50, { message: "Title must be 50 characters or less" }),
  notes: z.string().min(3, {
    message: "Notes must be at least 3 characters.",
  }),
});

const NotesForm = () => {
  const ctx = useContext(NotesContext);
  const maxCharacters = 50;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      notes: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: NoteType = {
      id: crypto.randomUUID(),
      title: values.title,
      body: values.notes,
      archived: false,
      createdAt: showFormattedDate(new Date()),
    };
    ctx?.setNotes([...ctx.notes, payload]);
  }

  return (
    <Form {...form}>
      <div className="container max-w-xl">
        <h4 className="mb-10 text-lg font-semibold">Create a new note</h4>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Title</FormLabel>
                  <span>Sisa Karakter: {maxCharacters - form.watch("title").length}</span>
                </div>
                <FormControl>
                  <Input placeholder="Enter a title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea rows={10} className="resize-none" placeholder="Write your notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Note</Button>
        </form>
      </div>
    </Form>
  );
};

export default NotesForm;
