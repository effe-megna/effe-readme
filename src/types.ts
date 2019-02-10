import { PackageJson } from "package-json";

export interface EffePackageJson extends PackageJson {
  effe: EffeOptions
}

export interface EffeOptions {
  twitt: string | null,
  emoji: boolean | null,
  tecnhologies: boolean | null,
  howtocontribute: boolean | null,
  installfrom: PackageManagerSupported | null,
  mentionme: boolean | null,
  testInstructions: boolean | null,
  linkedin: string | null,
  twitter: string | null,
  githubrepo: string | null
}

export enum PackageManagerSupported {
  npm = "npm",
  yarn = "yarn"
}
