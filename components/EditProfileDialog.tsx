"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useProfileMutation from "@/hooks/mutations/useProfileMutation";
import {
  getErrorResponse,
  handleValidationError,
  showToastError,
} from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const VALID_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

const imageSchema = z
  .custom<FileList>((v) => v instanceof FileList, "Required")
  .refine((v) => {
    return v.length === 1;
  }, "You can only select 1 image file")
  .refine((v) => {
    for (let i = 0; i < v.length; i++) {
      if (!VALID_FILE_TYPES.includes(v[i].type)) {
        return false;
      }
    }
    return true;
  }, "You can only select image file")
  .refine((v) => {
    for (let i = 0; i < v.length; i++) {
      if (v[i].size > MAX_FILE_SIZE) {
        return false;
      }
    }
    return true;
  }, "File size must not exceed 5MB")
  .optional();

export const updateProfileBodySchema = z.object({
  coverPicture: imageSchema,
  profilePicture: imageSchema,
  fullName: z.string().trim().min(6),
  about: z.string().max(1000).optional(),
  removeProfilePicture: z.coerce.boolean().optional(),
  removeCoverPicture: z.coerce.boolean().optional(),
});

export type UpdateProfileBodyType = z.infer<typeof updateProfileBodySchema>;

interface EditProfileDialogProps {
  fullName: string;
  about: null | string;
}

export default function EditProfileDialog({
  fullName,
  about,
}: EditProfileDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { profileMutateAsync, isProfileMutatePending } = useProfileMutation();

  const form = useForm<UpdateProfileBodyType>({
    resolver: zodResolver(updateProfileBodySchema),
  });

  const onSubmit = async (values: UpdateProfileBodyType) => {
    try {
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      if (values.about !== undefined) formData.append("about", values.about);
      if (values.coverPicture)
        formData.append("coverPicture", values.coverPicture[0]);
      if (values.profilePicture)
        formData.append("profilePicture", values.profilePicture[0]);
      if (values.removeCoverPicture !== undefined)
        formData.append("removeCoverPicture", "true");
      if (values.removeProfilePicture !== undefined)
        formData.append("removeProfilePicture", "true");

      await profileMutateAsync(formData);
      router.refresh();
      setOpen(false);
    } catch (e) {
      const error = getErrorResponse(e);
      handleValidationError(error, form);
      showToastError(e);
    }
  };

  useEffect(() => {
    form.reset({ fullName, about: about ?? "" });
  }, [form, fullName, about]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto" variant="outline">
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            You can further make changes as many times as you want in your
            profile. Your information will be public so make sure to not share
            any sensitive information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="coverPicture"
              control={form.control}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <FormItem>
                  <FormLabel>Cover Picture</FormLabel>
                  <FormControl>
                    <Input
                      ref={ref}
                      type="file"
                      name={name}
                      onBlur={onBlur}
                      accept={VALID_FILE_TYPES.join(",")}
                      onChange={(e) => onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="profilePicture"
              control={form.control}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input
                      ref={ref}
                      type="file"
                      name={name}
                      onBlur={onBlur}
                      accept={VALID_FILE_TYPES.join(",")}
                      onChange={(e) => onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jon Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="about"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Write something about you..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="submit" disabled={isProfileMutatePending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
