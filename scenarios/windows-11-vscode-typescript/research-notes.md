# 2026 Windows 11 + Visual Studio Code reconstruction notes

This snapshot fixes the environment at August 2026: Windows 11 25H2, Visual Studio Code 1.131, a project-local TypeScript compiler, and Node.js. It uses the default recognizable workbench structure rather than speculative or agent-heavy features.

The workflow is terminal-driven. `npx tsc` reads `tsconfig.json`, emits `src/index.ts` to `dist/index.js`, and succeeds without output. `node dist/index.js` is a separate command and its output remains in the integrated terminal.

The workspace is SIMULATED because installed extensions, theme details, font metrics, terminal profile, and Windows personalization differ between real machines.
