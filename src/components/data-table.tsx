"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { ActionCellContent } from "./table-cell-content";
import TableRowDialog from "./table-row-dialog";
import { useState } from "react";

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
  onInsert?: (row: Record<string, unknown>) => void; // New prop for handling insertions
}

const MyTable: React.FC<MyTableProps> = ({
  rows,
  tableConfiguration: {
    allowDelete = false,
    allowEdit = false,
    allowInsert = false,
    columns,
  },
  onInsert, // New prop for handling insertions
}) => {
  const hasRowAction = allowEdit || allowDelete;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentRow, setCurrentRow] = useState<
    Record<string, unknown> | undefined
  >(undefined);

  if (hasRowAction) {
    columns.push({ kind: "Action", key: "action", name: "Action" });
  }

  const handleSave = (data: Record<string, unknown>) => {
    if (currentRow) {
      // Edit logic
      // Here, you should update the row in your rows state
    } else {
      // Insert logic
      // Here, you should add the new row to your rows state
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
      <Table aria-label="Users table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {rows.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column, index) => {
                if (column.kind === "Action") {
                  return (
                    <TableCell key={index}>
                      <ActionCellContent
                        deleteAllowed={allowDelete}
                        editAllowed={allowEdit}
                      />
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={index}>
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
