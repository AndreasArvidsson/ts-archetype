import { config } from "./config";
import { generate } from "./generate";

generate({ ...config, outDir: "examples/lib", react: false });
generate({ ...config, outDir: "examples/react", react: true });
