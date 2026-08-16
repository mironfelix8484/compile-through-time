import type { ComponentType } from "react";
import type { DevelopmentEnvironment, ExperienceVariant } from "../types/Environment";
import { IbmBasicaWorkspace } from "./IbmBasicaWorkspace";
import { MsDosTurboPascalWorkspace } from "./MsDosTurboPascalWorkspace";
import { UnixV7CcWorkspace } from "./UnixV7CcWorkspace";
import { UbuntuEclipseWorkspace } from "./UbuntuEclipseWorkspace";
import { UbuntuNetBeansWorkspace } from "./UbuntuNetBeansWorkspace";
import { Windows95VisualBasicWorkspace } from "./Windows95VisualBasicWorkspace";
import { Windows98VisualCpp6Workspace } from "./Windows98VisualCpp6Workspace";
import { WindowsXpVisualStudio2005Workspace } from "./WindowsXpVisualStudio2005Workspace";
import { Windows11VsCodeWorkspace } from "./Windows11VsCodeWorkspace";

interface WorkspaceProps {
  environment: DevelopmentEnvironment;
  onExit: () => void;
}

const workspaceRenderers: Partial<Record<ExperienceVariant, ComponentType<WorkspaceProps>>> = {
  "unix-v7-cc": UnixV7CcWorkspace,
  "ibm-basica": IbmBasicaWorkspace,
  "turbo-pascal-6": MsDosTurboPascalWorkspace,
  "eclipse-3": UbuntuEclipseWorkspace,
  "netbeans-8": UbuntuNetBeansWorkspace,
  "visual-basic-4": Windows95VisualBasicWorkspace,
  "visual-cpp-6": Windows98VisualCpp6Workspace,
  "visual-studio-2005": WindowsXpVisualStudio2005Workspace,
  "vscode-2026": Windows11VsCodeWorkspace,
};

export function WorkspaceRenderer(props: WorkspaceProps) {
  const variant = props.environment.experience?.visualStyle.variant;
  const Renderer = variant ? workspaceRenderers[variant] : undefined;
  if (!Renderer) return null;
  return <Renderer {...props} />;
}
