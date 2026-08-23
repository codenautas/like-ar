// Declaraciones para el chequeo de tipos de like-ar.js. No se publica (ver "files" en package.json).

// define es el global que provee un loader AMD. El header UMD lo usa condicionalmente.
declare const define: {
    (factory: () => any): void;
    amd?: unknown;
};
