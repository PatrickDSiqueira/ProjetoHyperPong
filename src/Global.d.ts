interface Window {
    deferredPrompt: any;
  }

  interface InstallPromptResult {
    outcome: "accepted" | "dismissed";
    platform: string;
    returnValue: boolean;
    userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
  }