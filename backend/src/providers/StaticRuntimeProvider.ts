import type { Runtime } from "../models/Runtime.js";
import type { RuntimeProvider } from "./RuntimeProvider.js";

const runtimes: Runtime[] = [
  { id: "windows-xp-vs-2005", operatingSystem: "Windows XP", tool: { name: "Visual Studio 2005", type: "ide" }, languages: ["C#"], availableFrom: "2005-11-07", availableTo: "2014-04-08" },
  { id: "ubuntu-6-10-netbeans-5-5", operatingSystem: "Ubuntu 6.10", tool: { name: "NetBeans 5.5", type: "ide" }, languages: ["Java"], availableFrom: "2006-10-30", availableTo: "2008-04-25" },
  { id: "ubuntu-6-10-gcc", operatingSystem: "Ubuntu 6.10", tool: { name: "GCC", type: "compiler" }, languages: ["C", "C++"], availableFrom: "2006-10-26", availableTo: "2008-04-25" },
  { id: "mac-os-x-tiger-xcode-2", operatingSystem: "Mac OS X Tiger", tool: { name: "Xcode 2.x", type: "ide" }, languages: ["C", "C++", "Objective-C"], availableFrom: "2005-04-29", availableTo: "2007-10-26" },
];

export class StaticRuntimeProvider implements RuntimeProvider {
  async getRuntimes(): Promise<Runtime[]> {
    return runtimes;
  }
}
