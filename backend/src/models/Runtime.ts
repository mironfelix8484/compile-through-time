export interface Runtime {
  id: string;
  operatingSystem: string;
  tool: {
    name: string;
    type: "ide" | "compiler";
  };
  languages: string[];
  availableFrom: string;
  availableTo?: string;
}
