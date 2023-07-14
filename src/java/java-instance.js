import java from "java-bridge";

java.ensureJvm();

export {
    java
};

export const JByteArrayInputStream = java.importClass("java.io.ByteArrayInputStream");