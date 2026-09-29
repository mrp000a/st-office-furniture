import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import React from "react";

export const InvoiceButtonView = ({ id }: { id: number | string }) => {
  return (
    <Button asChild>
      <a href={`/api/${id}/invoice`} target="_blank" rel="noopener noreferrer">
        <FileText className="mr-2 size-4" />
        Invoice
      </a>
    </Button>
  );
};

export const InvoiceButtonDownload = ({ id }: { id: number | string }) => {
  return (
    <Button asChild>
      <a
        href={`/api/${id}/invoice`}
        // href={`/api/orders/${id}/invoice?download=true`}
        download={`invoice-${id}.pdf`}
      >
        <Download className="mr-2 size-4" />
        Download Invoice
      </a>
    </Button>
  );
};
