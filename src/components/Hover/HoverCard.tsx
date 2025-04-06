import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { userType } from "@/types/userType";
import React, { useState } from "react";
type Props = {
  children: React.ReactNode;
  item: userType;
};
const HoverCards = ({ children, item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger
        className="w-full underline cursor-pointer"
        onClick={handleToggle}
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-full gap-3 relative">
        <div>{item.name}</div>
        <div>{item.address}</div>
      </HoverCardContent>
    </HoverCard>
  );
};
export default HoverCards;
