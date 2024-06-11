"use client";

import { createUser } from "@/actions/user";
import DataTable, {
  TableColumn,
  TableConfiguration,
} from "@/components/data-table";

interface UsersProps {
  users: Record<string, unknown>[];
}

export default function UsersTable({ users }: UsersProps) {
  const handleInsert = async (row: Record<string, unknown>) => {
    await createUser(row.username as string, row.password as string);
  };

  const columns: TableColumn[] = [
    { kind: "Text", name: "Username", key: "username" },
    { kind: "Text", name: "Password", key: "password" },
  ];

  const tableConfiguration: TableConfiguration = {
    allowEdit: true,
    allowDelete: true,
    allowInsert: true,
    columns,
  };

  return (
    <DataTable
      rows={users}
      tableConfiguration={tableConfiguration}
      onInsert={handleInsert}
    />
  );
}
