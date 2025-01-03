"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState, useTransition } from "react";

type Props = {
  title: string;
  value: string;
  isChecked: boolean;
  param: string;
};

const FilterItem = ({ title, isChecked, param, value }: Props) => {
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [localChecked, setLocalChecked] = useState(isChecked);

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    const values = params.getAll(param);

    const newValues = values.includes(value)
      ? values.filter((el) => el !== value)
      : [...values, value];

    if (newValues.length) {
      params.set(param, newValues.join(","));
    } else {
      params.delete(param);
    }
    setLocalChecked(() => !localChecked);

    startTransition(() => {
      router.push(`/cars?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div data-load={pending ? "true" : undefined} className="flex items-center justify-between">
      <Label
        htmlFor={`filter-checkbox-${title}`}
        className="text-[14px] font-[500] text-[#494949] cursor-pointer"
      >
        {title}
      </Label>
      <Checkbox
        id={`filter-checkbox-${title}`}
        checked={localChecked}
        onCheckedChange={handleClick}
      />
    </div>
  );
};

export default FilterItem;
