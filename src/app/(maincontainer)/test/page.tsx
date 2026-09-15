"use client";

import MessageForm from "@/components/common/messageForm";
import { sendEmail } from "@/lib/api";
import { toast } from "sonner";

export default function TestEmail() {
  return (
    <div>
      <button
        onClick={async () => {
          const send = await sendEmail({
            to: "mrp000a@gmail.com",
            subject: "I am testing the message",
            message: "something <b> Rakib</b>",
          });
          if (send.success) toast.success("Message send successful!");
        }}
      >
        Send Test Email
      </button>

      <MessageForm />
    </div>
  );
}
