import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { userType } from "@/types/userType";

type Props = {
  item: userType;
};

export const CardGrid = ({ item }: Props) => {
  const { name, address, contact, email, privy } = item;
  return (
    <Card className="py-3 space-y-3 max-w-80">
      <CardTitle className="text-lg">{name}</CardTitle>

      <CardContent className="h-32"></CardContent>
      <CardDescription className="px-3 min-h-10">{address}</CardDescription>
      <CardFooter className="w-full flex justify-center py-3">
        {contact}
      </CardFooter>
    </Card>
  );
};
