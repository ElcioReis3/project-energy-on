import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

interface OTPInputProps {
  length: number;
  onChange: (value: string) => void;
}

export const OTPInput = ({ length, onChange }: OTPInputProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-min m-auto">
      <div className="text-xs md:text-sm">
        Enviamos um código para o seu e-mail
      </div>
      <InputOTP
        maxLength={length}
        value={value}
        onChange={(value) => {
          setValue(value);
          onChange(value);
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot
            className="w-8 h-8 text-sm sm:w-10 sm:h-10 sm:text-base"
            index={0}
          />
          <InputOTPSlot
            className="w-8 h-8 text-sm sm:w-10 sm:h-10 sm:text-base"
            index={1}
          />
          <InputOTPSlot
            className="w-8 h-8 text-sm sm:w-10 sm:h-10 sm:text-base"
            index={2}
          />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup className="gap-1 sm:gap-2">
          <InputOTPSlot
            className="w-8 h-8 text-sm sm:w-10 sm:h-10 sm:text-base"
            index={3}
          />
          <InputOTPSlot
            className="w-8 h-8 text-sm sm:w-10 sm:h-10 sm:text-base"
            index={4}
          />
          <InputOTPSlot
            className="w-8 h-8 text-sm sm:w-10 sm:h-10 sm:text-base"
            index={5}
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};
