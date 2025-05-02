import fs from "fs";
import yaml from "js-yaml";

try {
  // Read YAML file
  const yamlData = fs.readFileSync("test.yaml", "utf8");

  // Parse YAML into JavaScript object
  const data = yaml.load(yamlData);

  console.log("Server URL:", data.servers[0].url);
  // console.log("Components:", data.components.responses);

  // Object.keys(data.paths).forEach((path) => {
  //   console.log("Path:", path);
  //   console.log("Details:", data.paths[path].get);
  // });

  // Object.entries(data.paths).forEach(([path, details]) => {
  //   console.log("Path:", path);
  //   console.log("Details:", details);
  // });
} catch (error) {
  console.error("Error reading YAML file:", error);
}
