import { Card, CardContent } from "@/components/common/ui/card";
import React from "react";

type Props = {
  description: string;
};

const Description = async ({ description }: Props) => {
  return (
    <Card variant="transparent">
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default Description;
