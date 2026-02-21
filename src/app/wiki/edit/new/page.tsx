import { redirect } from "next/navigation";
import WikiEditor from "@/components/wiki-editor";
import { getUser } from "@/lib/auth-server";

export default async function NewArticlePage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }
  return <WikiEditor isEditing={false} />;
}
