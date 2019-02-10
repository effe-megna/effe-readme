import * as packageJson from "package-json"
import * as path from "path"
import { PackageManagerSupported, EffePackageJson, EffeOptions } from './types';
const writePkg = require('write-pkg');

export async function fetchPackagesJson(techNames: Array<string>) {
  return await Promise.all(techNames.map(async (x) => await packageJson(x, {
    version: "latest",
    fullMetadata: true
  })))
}

export async function writeBasicConfig(
  pJson: packageJson.PackageJson,
  packageManagerSelected: PackageManagerSupported
): Promise<EffePackageJson> {
  return new Promise(async (resolve, reject) => {
    const packageJsonPath = path.dirname("package.json")

    const effeConfig: EffeOptions = {
      twitt: "Twitt this awesome library",
      emoji: false,
      tecnhologies: true,
      howtocontribute: true,
      installfrom: packageManagerSelected,
      testInstructions: true,
      mentionme: true
    }

    const basicConfig: EffePackageJson = {
      ...pJson,
      effe: effeConfig
    }

    try {
      await writePkg(packageJsonPath, basicConfig)
    } catch (error) {
      reject(error)
    }

    resolve(basicConfig)
  })
}