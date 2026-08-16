# 1979 UNIX + cc reconstruction notes

This snapshot uses Seventh Edition Research UNIX as the concrete 1979 reference. It presents an 80-column monochrome character terminal, a plain shell prompt, and a restrained `vi` editing trace rather than a graphical terminal or IDE.

The source follows the first-edition K&R idiom: `main()` has no explicit return type and calls `printf`. The visible compiler invocation is `cc hello.c -o hello`; successful compilation is silent. Execution is a separate `./hello` command.

The browser reconstruction is marked SIMULATED because terminal hardware, glyph shape, host identity, timing, and interaction details vary across historical installations.
