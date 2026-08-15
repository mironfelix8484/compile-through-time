export interface DevelopmentEnvironment {
  id: string;
  operatingSystem: string;
  tool: { name: string; type: "ide" | "compiler" };
  languages: string[];
  availableFrom: string;
  availableTo?: string;
}
export interface EnvironmentsResponse { date: string; environments: DevelopmentEnvironment[] }
