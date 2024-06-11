import { findUsers } from "@/queries/admin";
import UsersTable from "./users-table";

export default async function Users() {
  const fetchedUsers = await findUsers();

  return <UsersTable users={fetchedUsers} />;
}
