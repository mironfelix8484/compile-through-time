import type { ResearchArtifactLoader } from "./ResearchArtifactRepository.js";
import unixScenario from "../../../scenarios/unix-v7-cc-c/scenario.yaml";
import ibmScenario from "../../../scenarios/ibm-pc-dos-basica/scenario.yaml";
import pascalScenario from "../../../scenarios/ms-dos-5-turbo-pascal/scenario.yaml";
import eclipseScenario from "../../../scenarios/ubuntu-8-eclipse-java/scenario.yaml";
import netbeansScenario from "../../../scenarios/ubuntu-14-netbeans-8-java/scenario.yaml";
import vbScenario from "../../../scenarios/windows-95-vb4/scenario.yaml";
import vcppScenario from "../../../scenarios/windows-98-vcpp6-cpp/scenario.yaml";
import vsScenario from "../../../scenarios/windows-xp-vs2005-csharp/scenario.yaml";
import vscodeScenario from "../../../scenarios/windows-11-vscode-typescript/scenario.yaml";
import evidenceIndex from "../../../research/evidence/index.yaml";
import eclipseBuild from "../../../research/evidence/ev-eclipse-auto-build.yaml";
import eclipseRun from "../../../research/evidence/ev-eclipse-java-run.yaml";
import ibmBasic from "../../../research/evidence/ev-ibm-pc-basic-1-1.yaml";
import netbeansRun from "../../../research/evidence/ev-netbeans-java-build-run.yaml";
import turboPascal from "../../../research/evidence/ev-turbo-pascal-6-ide.yaml";
import unixCc from "../../../research/evidence/ev-unix-v7-cc.yaml";
import vcppBuild from "../../../research/evidence/ev-vcpp6-build-run.yaml";
import visualBasic from "../../../research/evidence/ev-visual-basic-form-workflow.yaml";
import vsBuild from "../../../research/evidence/ev-vs2005-build-configuration.yaml";
import vscodeWorkflow from "../../../research/evidence/ev-vscode-2026-typescript-workflow.yaml";
import unixTranscript from "../../../scenarios/unix-v7-cc-c/transcript.json" with { type: "json" };
import ibmTranscript from "../../../scenarios/ibm-pc-dos-basica/transcript.json" with { type: "json" };
import pascalTranscript from "../../../scenarios/ms-dos-5-turbo-pascal/transcript.json" with { type: "json" };
import eclipseTranscript from "../../../scenarios/ubuntu-8-eclipse-java/transcript.json" with { type: "json" };
import netbeansTranscript from "../../../scenarios/ubuntu-14-netbeans-8-java/transcript.json" with { type: "json" };
import vbTranscript from "../../../scenarios/windows-95-vb4/transcript.json" with { type: "json" };
import vcppTranscript from "../../../scenarios/windows-98-vcpp6-cpp/transcript.json" with { type: "json" };
import vsTranscript from "../../../scenarios/windows-xp-vs2005-csharp/transcript.json" with { type: "json" };
import vscodeTranscript from "../../../scenarios/windows-11-vscode-typescript/transcript.json" with { type: "json" };

const textArtifacts: Record<string, string> = {
  "scenarios/unix-v7-cc-c/scenario.yaml": unixScenario, "scenarios/ibm-pc-dos-basica/scenario.yaml": ibmScenario,
  "scenarios/ms-dos-5-turbo-pascal/scenario.yaml": pascalScenario, "scenarios/ubuntu-8-eclipse-java/scenario.yaml": eclipseScenario,
  "scenarios/ubuntu-14-netbeans-8-java/scenario.yaml": netbeansScenario, "scenarios/windows-95-vb4/scenario.yaml": vbScenario,
  "scenarios/windows-98-vcpp6-cpp/scenario.yaml": vcppScenario, "scenarios/windows-xp-vs2005-csharp/scenario.yaml": vsScenario,
  "scenarios/windows-11-vscode-typescript/scenario.yaml": vscodeScenario, "research/evidence/index.yaml": evidenceIndex,
  "research/evidence/ev-eclipse-auto-build.yaml": eclipseBuild, "research/evidence/ev-eclipse-java-run.yaml": eclipseRun,
  "research/evidence/ev-ibm-pc-basic-1-1.yaml": ibmBasic, "research/evidence/ev-netbeans-java-build-run.yaml": netbeansRun,
  "research/evidence/ev-turbo-pascal-6-ide.yaml": turboPascal, "research/evidence/ev-unix-v7-cc.yaml": unixCc,
  "research/evidence/ev-vcpp6-build-run.yaml": vcppBuild, "research/evidence/ev-visual-basic-form-workflow.yaml": visualBasic,
  "research/evidence/ev-vs2005-build-configuration.yaml": vsBuild, "research/evidence/ev-vscode-2026-typescript-workflow.yaml": vscodeWorkflow,
};
const jsonArtifacts: Record<string, unknown> = {
  "scenarios/unix-v7-cc-c/transcript.json": unixTranscript, "scenarios/ibm-pc-dos-basica/transcript.json": ibmTranscript,
  "scenarios/ms-dos-5-turbo-pascal/transcript.json": pascalTranscript, "scenarios/ubuntu-8-eclipse-java/transcript.json": eclipseTranscript,
  "scenarios/ubuntu-14-netbeans-8-java/transcript.json": netbeansTranscript, "scenarios/windows-95-vb4/transcript.json": vbTranscript,
  "scenarios/windows-98-vcpp6-cpp/transcript.json": vcppTranscript, "scenarios/windows-xp-vs2005-csharp/transcript.json": vsTranscript,
  "scenarios/windows-11-vscode-typescript/transcript.json": vscodeTranscript,
};

export class BundledResearchArtifactLoader implements ResearchArtifactLoader {
  async read<T>(path: string): Promise<T> {
    if (path in jsonArtifacts) return jsonArtifacts[path] as T;
    const contents = textArtifacts[path];
    if (contents === undefined) throw new Error(`Bundled research artifact '${path}' was not found`);
    return JSON.parse(contents) as T;
  }
}
