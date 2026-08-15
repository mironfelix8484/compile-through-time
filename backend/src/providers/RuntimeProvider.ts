import type { Runtime } from "../models/Runtime.js";

export interface RuntimeProvider {
  getRuntimes(): Promise<Runtime[]>;
}
