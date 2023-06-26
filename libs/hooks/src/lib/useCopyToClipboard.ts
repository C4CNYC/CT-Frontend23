import { useState } from "react";

// ----------------------------------------------------------------------

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

interface ReturnType {
  copy: CopyFn;
  copiedText: CopiedValue;
}

export function useCopyToClipboard(): ReturnType {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text): Promise<boolean> => {
    if (!navigator?.clipboard) {
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error: any) {
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy };
}
