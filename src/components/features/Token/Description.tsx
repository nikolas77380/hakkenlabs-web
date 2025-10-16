import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { BookOpenText, InfoIcon } from "lucide-react";
import React from "react";

type Props = {
  description: string;
};

const Description = async ({ description }: Props) => {
  return (
    <Card
      variant="transparent"
      collapsible
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <BookOpenText className="text-secondary" />
            <span>About</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default Description;
