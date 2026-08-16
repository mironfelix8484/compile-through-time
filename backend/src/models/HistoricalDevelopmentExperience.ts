export type ExperienceVariant = "unix-v7-cc" | "ibm-basica" | "turbo-pascal-6" | "visual-basic-4" | "eclipse-3" | "visual-cpp-6" | "visual-studio-2005" | "netbeans-8" | "vscode-2026";

export interface HistoricalDevelopmentExperience {
  source: { filename: string; code: string };
  buildActionLabel: string;
  programOutput: string;
  console: {
    title: string;
    prompt?: string;
    presentation: "output-pane" | "console-window";
  };
  visualStyle: {
    variant: ExperienceVariant;
    chrome: "ibm-pc-text" | "dos-text" | "windows-classic" | "windows-xp" | "linux-gtk";
    editorFont: string;
    colorScheme: "light" | "blue";
  };
}
