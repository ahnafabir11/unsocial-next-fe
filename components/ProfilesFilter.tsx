"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce, updateUrlWithQuery } from "@/lib/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

const LIMIT_OPTIONS = [
  { value: "8", label: "8 Profiles" },
  { value: "12", label: "12 Profiles" },
  { value: "24", label: "24 Profiles" },
  { value: "40", label: "40 Profiles" },
];

export default function ProfilesFilter({ baseURL }: { baseURL: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultLimit = searchParams.get("limit") ?? "12";
  const defaultSearch = searchParams.get("search") ?? "";

  const handleChangeLimit = (value: string) => {
    const updatedUrl = updateUrlWithQuery(baseURL, { limit: value });
    router.push(updatedUrl);
  };

  const handleSearch = (value: string) => {
    const updatedUrl = updateUrlWithQuery(baseURL, { search: value });
    router.push(updatedUrl);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
      <Select defaultValue={defaultLimit} onValueChange={handleChangeLimit}>
        <SelectTrigger className="sm:max-w-max">
          <SelectValue placeholder="Select profile limit" />
        </SelectTrigger>

        <SelectContent>
          {LIMIT_OPTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        className="sm:max-w-max"
        defaultValue={defaultSearch}
        placeholder="Search profile..."
        onChange={debounce((e) => handleSearch(e.target.value))}
      />
    </div>
  );
}
