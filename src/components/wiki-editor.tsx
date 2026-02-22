"use client";

import MDEditor from "@uiw/react-md-editor";
import { FileText, Image as ImageIcon, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { createArticle, updateArticle } from "@/app/actions/articles";
import { uploadFile } from "@/app/actions/upload";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface WikiEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialImage?: File | string;
  isEditing?: boolean;
  articleId?: string;
}

interface FormErrors {
  title?: string;
  content?: string;
}

export default function WikiEditor({
  initialTitle = "",
  initialContent = "",
  initialImage = "",
  isEditing = false,
  articleId,
}: WikiEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState<File | string | null>(
    initialImage || null,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  // Remove image
  const removeImage = () => {
    setImage("");
  };

  // Handle form submission using Server Actions
  // We import server actions and call them from the client component.
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let imageUrl: string | undefined;

      // If there's an image, upload it via server action
      if (image) {
        if (typeof image === "string") {
          // Existing image URL, use as-is
          imageUrl = image;
        } else {
          // New file upload
          const fd = new FormData();
          fd.append("files", image);
          const uploaded = await uploadFile(fd);
          imageUrl = uploaded?.url;
        }
      }

      const payload = {
        title: title.trim(),
        content: content.trim(),
        authorId: "user-1", // TODO: wire real user id
        imageUrl,
      };

      if (isEditing && articleId) {
        await updateArticle(articleId, payload);
      } else {
        await createArticle(payload);
      }

      // Redirect to home page after successful save
      router.push("/");
    } catch (err) {
      console.error("Error submitting article:", err);
      alert("Failed to submit article");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    const shouldLeave = window.confirm(
      "Are you sure you want to cancel? Any unsaved changes will be lost.",
    );
    if (shouldLeave) {
      router.push("/");
    }
  };

  const pageTitle = isEditing ? "Edit Article" : "Create New Article";

  return (
    <div className="min-h-screen">
      {/* Header section with gradient */}
      <div className="relative bg-linear-to-br from-primary/10 via-background to-accent/10 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {pageTitle}
          </h1>
          {isEditing && articleId && (
            <p className="text-muted-foreground mt-3 text-sm">
              Editing article ID:{" "}
              <span className="font-mono font-medium bg-muted px-2 py-0.5 rounded">
                {articleId}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-8 pb-32">
          {/* Title Section */}
          <Card className="border-2 shadow-lg shadow-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Article Title
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a descriptive title for your article..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`text-lg h-12 ${errors.title ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.title && (
                  <p className="text-sm text-destructive font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                    {errors.title}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Section */}
          <Card className="border-2 shadow-lg shadow-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Article Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="content" className="text-sm font-medium">
                  Content (Markdown) <span className="text-destructive">*</span>
                </Label>
                <div
                  className={`border-2 rounded-lg overflow-hidden ${
                    errors.content ? "border-destructive" : "border-border"
                  }`}
                >
                  <MDEditor
                    value={content}
                    onChange={(val) => setContent(val || "")}
                    preview="edit"
                    hideToolbar={false}
                    visibleDragbar={false}
                    height={500}
                    textareaProps={{
                      placeholder: "Write your article content in Markdown...",
                      style: { fontSize: 16, lineHeight: 1.5 },
                      // make these explicit so SSR and client output match exactly
                      autoCapitalize: "off",
                      autoComplete: "off",
                      autoCorrect: "off",
                      spellCheck: false,
                    }}
                  />
                </div>
                {errors.content && (
                  <p className="text-sm text-destructive font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                    {errors.content}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Image Upload Section */}
          <Card className="border-2 shadow-lg shadow-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Cover Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {!image ? (
                  <div className="relative border-2 border-dashed border-primary/30 hover:border-primary/50 rounded-xl p-10 text-center bg-primary/5 hover:bg-primary/10 cursor-pointer group transition-all duration-300">
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <Upload className="mx-auto h-14 w-14 text-muted-foreground/40 group-hover:text-muted-foreground/60 mb-4" />
                    <div className="space-y-2">
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer text-base font-semibold text-foreground/90"
                      >
                        Click to upload an image
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add a cover image for your article
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 rounded-md overflow-hidden border border-border">
                        <Image
                          src={
                            typeof image === "string"
                              ? image
                              : URL.createObjectURL(image)
                          }
                          width={200}
                          height={200}
                          alt="Cover image preview"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeImage}
                      className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border shadow-2xl z-50">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground hidden sm:block">
                {isEditing
                  ? "Make your changes and save"
                  : "Fill in the details to create your article"}
              </p>
              <div className="flex gap-3 ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="min-w-[100px]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="min-w-[140px] shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Article"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
