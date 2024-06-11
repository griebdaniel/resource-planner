import { findUsers } from "@/actions/user";
import UsersTable from "./users-table";

export default async function Users() {
  const fetchedUsers = await findUsers();

  return <UsersTable users={fetchedUsers} />;
}
