# Research methodology

## Evidence priority

1. A repeatable execution on matching OS and tool versions.
2. Official manuals and documentation for the exact version.
3. Contemporary screenshots or video showing the action and its result.
4. Archived contemporary training material.
5. Later or secondary sources, used only to corroborate individual claims.

## Scenario workflow

1. Freeze the OS edition, architecture, locale, IDE, compiler/build system, language, project type, and action.
2. List visible claims: action label, pane placement, phase order, transcript wording, summaries, and execution-output location.
3. Register each source in `evidence/`, including the page or timestamp and the claims it supports.
4. Preserve permitted captures in `assets/evidence/<evidence-id>/`; record a SHA-256 digest. Do not commit proprietary software or restricted documents.
5. When possible, reproduce the scenario in a VM and retain configuration, setup notes, project files, a before-action screenshot, video of the action, raw build output, and execution output.
6. Preserve raw captures unchanged. Record every normalization of paths, usernames, timestamps, or durations in the scenario notes.
7. Map every transcript phase and visible UI claim to evidence. Unsupported critical claims keep the scenario SIMULATED.
8. Require a second review before promotion to RECONSTRUCTED or VERIFIED.

## Capture standard

A VM capture records OS and tool versions, architecture, locale, display settings, project type, build configuration, exact action, source checksum, capture date, and host/guest time settings. Build output and program output are captured separately.

## Rights and preservation

Use a hybrid archive. Store project-created or redistributable evidence locally with checksums. For restricted material, store only citation metadata, a stable URL, access date, and precise page/timestamp. Never commit installers, disk images, license keys, or restricted manuals.
