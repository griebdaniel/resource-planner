"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@/components/table";
import { ActionCellContent } from "./table-cell-content";
import TableRowDialog from "./table-row-dialog";
import { useDisclosure } from "@nextui-org/react";

export interface TableColumn {
  kind: "Text" | "Action";
  name: string;
  key: string;
}

export interface TableConfiguration {
  allowEdit: boolean;
  allowDelete: boolean;
  allowInsert: boolean;
  columns: TableColumn[];
}

interface MyTableProps {
  rows: Record<string, unknown>[];
  tableConfiguration: TableConfiguration;
  onInsert?: (row: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
}

const MyTable: React.FC<MyTableProps> = ({
  rows,
  tableConfiguration: {
    allowDelete = false,
    allowEdit = false,
    allowInsert = false,
    columns,
  },
  onInsert,
  onDelete,
}) => {
  console.log(rows);

  const hasRowAction = allowEdit || allowDelete;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentRow, setCurrentRow] = useState<
    Record<string, unknown> | undefined
  >(undefined);

  const [cols] = useState(
    hasRowAction
      ? [...columns, { kind: "Action", key: "action", name: "Action" }]
      : [...columns],
  );

  const handleSave = (data: Record<string, unknown>) => {
    if (currentRow) {
      // Edit logic
      // Here, you should update the row in your rows state
    } else {
      // Insert logic
      onInsert?.(data); // Emit insert event
    }
    setCurrentRow(undefined);
  };

  const handleInsert = () => {
    setCurrentRow(undefined);
    onOpen();
  };

  return (
    <div className="flex flex-col">
      {allowInsert && <Button onPress={handleInsert}>Insert</Button>}
      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            {cols.map((column) => (
              <TableColumn key={column.key}>{column.name}</TableColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {cols.map((column, colIndex) => {
                if (column.kind === "Action") {
                  return (
                    <TableCell key={colIndex}>
                      <ActionCellContent
                        deleteAllowed={allowDelete}
                        editAllowed={allowEdit}
                        onDelete={() => onDelete?.(item)}
                      />
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={colIndex}>
                    {item[column.key] as string}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableRowDialog
        tableColumns={columns.filter((column) => column.kind !== "Action")}
        row={currentRow}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default MyTable;
