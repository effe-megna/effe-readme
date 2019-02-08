import * as packageJson from "package-json"

export async function fetchPackagesJson(techNames: Array<string>) {
  return await Promise.all(techNames.map(async (x) => await packageJson(x, {
    version: "latest",
    fullMetadata: true
  })))
}
