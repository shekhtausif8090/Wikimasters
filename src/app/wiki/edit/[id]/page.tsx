import { notFound, redirect } from "next/navigation";
import WikiEditor from "@/components/wiki-editor";
import { getArticleById } from "@/lib/data/articles";
import { getUser } from "@/lib/auth-server";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;
  const _user = await getUser();
  if (!_user) {
    redirect("/auth/sign-in");
  }

  // we'll uncomment this later when the articles have real IDs
  // if (user.id !== id) {
  //   stackServerApp.redirectToHome();
  // }

  const article = await getArticleById(+id);
  if (!article) {
    notFound();
  }
  return (
    <WikiEditor
      initialTitle={article.title}
      initialContent={article.content}
      isEditing={true}
      articleId={id}
    />
  );
}
