import { useRouter } from "next/router";

import { useAuth } from "@/application/hooks";

import { Button } from "../../Button";

export const UploadButton = () => {
  const router = useRouter();
  const { validate } = useAuth();
  return (
    <Button
      className="h-36 w-69 rounded-10 bg-primary-600 px-16 py-8 text-14-semibold-140 text-white"
      onClick={validate(() => router.push("/upload"))}
    >
      업로드
    </Button>
  );
};
