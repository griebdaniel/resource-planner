"use client";

import { useState } from "react";
import { createUser, deleteUser } from "@/actions/user";
import DataTable, {
  TableColumn,
  TableConfiguration,
} from "@/components/data-table";

interface UsersProps {
  users: Record<string, unknown>[];
}

export default function UsersTable({ users }: UsersProps) {
  // Use useState to manage the users data
  const [userList, setUserList] = useState(users);

  const handleInsert = async (row: Record<string, unknown>) => {
    await createUser(row as any);
    // Update the userList state with the new user
    setUserList((prevUsers) => [...prevUsers, row]);
  };

  const handleDelete = async (row: Record<string, unknown>) => {
    const username = row.username;
    await deleteUser(username as string);
    setUserList((prevUsers) =>
      prevUsers.filter((user) => user.username !== username),
    );
  };

  const columns: TableColumn[] = [
    { kind: "Text", name: "Username", key: "username" },
    { kind: "Text", name: "Password", key: "password" },
    { kind: "Text", name: "Role", key: "role" },
  ];

  const tableConfiguration: TableConfiguration = {
    allowEdit: false,
    allowDelete: true,
    allowInsert: true,
    columns,
  };

  return (
    <DataTable
      rows={userList} // Use the state variable
      tableConfiguration={tableConfiguration}
      onInsert={handleInsert}
      onDelete={handleDelete}
    />
  );
}
