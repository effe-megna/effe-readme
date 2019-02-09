import { PackageJson } from "package-json";

export interface EffePackageJson extends PackageJson {
  effe: EffeOptions
}

interface EffeOptions {
  twitt: string | null,
  emoji: boolean | null,
  tecnhologies: boolean | null,
  howtocontribute: boolean | null,
  packagemanager: PackageManagerSupported,
  mentionme: boolean | null,
  testInstructions: boolean | null
}

export enum PackageManagerSupported {
  npm = "npm",
  yarn = "yarn"
}
