"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import React from "react";
import { useParams, useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "../../../../../../components/ui/data-table";
import { SizesColumn, columns } from "./column";
import ApiList from "../../../../../../components/ui/api-list";
import axios from "axios";
import SampleDataModalSizes from "@/components/quick-adds/sample-data-sizes";

type SizesProps = {
  SizesData: SizesColumn[];
};

const Sizes = ({ SizesData }: SizesProps) => {
  const router = useRouter();
  const params = useParams();
  const [Sizes, setSizes] = React.useState<SizesColumn[]>(SizesData);
  const onDeleteSelected = async (ids: string[]) => {
    try {
      console.log(ids, "ids deleted");
      const res = await axios.delete(
        `/api/${params.StoreId}/sizes/multidelete`,
        {
          data: { idsArr: ids },
        }
      );
      console.log(res, "res");
      setSizes((prev) => prev.filter((item) => !ids.includes(item.id)));
      return "true";
    } catch (err) {
      console.log(err);
      return "Check if the sizes attached to products is deleted and try again";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Heading
            title={`Sizes(${SizesData.length})`}
            description="Create and manage Sizes"
          />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <SampleDataModalSizes />
          <Button
            onClick={() => {
              router.push(`/${params.StoreId}/sizes/new`);
            }}
            className="gap-x-2 hover:bg-secondary hover:text-primary"
          >
            <Plus className="h-5 w-4" />
            New
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable
        onDeleteSelected={onDeleteSelected}
        searchKey="name"
        columns={columns}
        data={Sizes}
      />
      <div className="w-full mt-10 ml-2">
        <Heading
          title={"Api"}
          description="Api's to connected frontend and backend"
        />
        <Separator />
        <ApiList Entityname="sizes" EntityIdname="{SizesId}" />
      </div>
    </>
  );
};

export default Sizes;
