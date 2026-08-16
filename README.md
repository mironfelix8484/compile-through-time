# Compile Through Time

Software changes. The feeling of seeing your code work for the first time does not.

> Revisit the moment every developer remembers:
>
> Pressing **Build** for the first time and seeing *Hello World* successfully come to life.

Compile Through Time is an interactive historical reconstruction project that explores how developers wrote, built, and executed a simple *Hello World* program across different computing eras.

This project is not a compiler playground.

It is not an emulator.

It is not a code editor.

It is a collection of **workspace snapshots** designed to recreate the atmosphere of software development at specific moments in computing history.

---

## The Idea

Every developer remembers that moment.

You write a few lines of code.

You press a button.

Sometimes it's called **Compile**.

Sometimes it's called **Build**.

Sometimes it's simply **Run**.

And then it happens:

```text
Hello World
```

That experience has changed dramatically over the years.

The tools changed.

The operating systems changed.

The workflows changed.

The languages changed.

But the emotional impact of seeing a program work for the first time remained surprisingly consistent.

Compile Through Time attempts to preserve that experience.

---

## Workspace Snapshots

Each snapshot reconstructs a specific development environment.

A snapshot may include:

- Operating system
- Desktop environment
- IDE
- Compiler or build system
- Programming language
- Source code
- Build workflow
- Build transcript
- Program output
- Visual atmosphere

The goal is immediate historical recognition.

A developer should recognize the period within a few seconds.

---

## Included Workspaces

| Year | Environment |
| --- | --- |
| 1979 | Unix + cc + C |
| 1983 | IBM PC + BASICA |
| 1991 | MS-DOS 5 + Turbo Pascal |
| 1995 | Windows 95 + Visual Basic |
| 1999 | Windows 98 + Visual C++ 6 |
| 2005 | Windows XP + Visual Studio 2005 |
| 2008 | Ubuntu 8.04 + Eclipse |
| 2015 | Ubuntu 14.04 + NetBeans |
| 2026 | Windows 11 + Visual Studio Code |

---

## Historical Fidelity

Snapshots are classified according to their level of historical confidence.

| Level | Description |
| --- | --- |
| VERIFIED | Reproduced using original software and operating systems |
| RECONSTRUCTED | Rebuilt using historical evidence |
| SIMULATED | Historically plausible but not fully documented |

The objective is transparency rather than perfect historical accuracy.

---

## Philosophy

The project deliberately separates three different experiences:

### Source code

```cpp
#include <iostream>

int main()
{
    std::cout << "Hello World";
}
```

### Build

```text
Compiling...
Linking...
Build succeeded.
```

### Program execution

```text
Hello World
```

Each era presents these concepts differently.

---

## This Is a Memory Project

Many of us remember:

- The blue Turbo Pascal editor.
- The gray Windows 95 interface.
- The Windows XP Bliss wallpaper.
- The Ubuntu Human theme.
- The first time an IDE successfully compiled our code.

Compile Through Time is an attempt to preserve those memories.

---

# Installation

## Prerequisites

- Node.js 22+
- npm 10+

## Clone the repository

```bash
git clone <repository-url>
cd compile-through-time
```

## Install dependencies

```bash
npm install
```

## Start the application

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

The backend API will be available at:

```text
http://localhost:5000
```

## Build for production

```bash
npm run build
```

***** Keep it simple :
git clone
npm install
npm run dev

# Architecture

```text
Frontend (React + Vite)
            │
            ▼
REST API (Node.js + TypeScript)
            │
            ▼
Workspace Snapshot Engine
            │
            ▼
Historical Workspace Definitions
```

Each workspace snapshot is implemented independently and includes:

- Operating system
- Development environment
- Source code
- Build workflow
- Build transcript
- Program output

# How It Works

1. Select a year on the timeline.

2. Enter a historical workspace.

3. Explore the development environment.

4. Examine the source code.

5. Trigger the historical Build, Compile, or Run action.

6. Compare how development workflows evolved across different eras.

# Technologies

- React
- TypeScript
- Vite
- Node.js
- Express
- REST APIs

---

## Future Work

- Additional historical workspaces
- More programming languages
- Improved historical verification
- Additional research sources
- Community-contributed reconstructions

Contributions are welcome.