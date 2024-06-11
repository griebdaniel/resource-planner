"use client";

import { authenticate } from "@/actions/user";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

  const auth = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await authenticate(username, password);
    if (res?.role === "admin") {
      router.push("/admin/dashboard/users");
    } else if (res?.role === "user") {
      router.push("/user/dashboard");
    } else {
      toast("Incorrect credentials", {
        type: "error",
        position: "bottom-center",
      });
    }
  };
  return (
    <form action={auth} className="flex flex-col gap-2 p-5">
      <Input name="username" placeholder="Username" />
      <Input type="password" name="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
