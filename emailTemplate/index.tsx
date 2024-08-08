import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  otp: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  otp,
}) => (
  <div className="w-[500px] rounded-md bg-black text-white">
    <h4>
      Welcome, <span className="font-bold text-sky-600">{name}</span>! Thank you
      for signing up.
    </h4>
    <p>
      This is the otp sent onto your given email{" "}
      <span className="font-bold text-sky-600">{email}</span>
    </p>
    <h2 className="flex w-full items-center justify-center rounded-md bg-sky-300/70 py-5">
      <b className="text-xl font-bold">{otp}</b>
    </h2>
  </div>
);
