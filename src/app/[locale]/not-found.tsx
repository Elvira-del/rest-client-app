import { AlertTriangle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <div className="min-h-[90svh] w-full grid place-items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex items-center justify-center border-0 bg-transparent rounded-none">
            <AlertTriangle className="h-12 w-12 text-gray-500" />
          </div>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription className="text-base">{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link className="w-full" href="/">{t("backHome")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
