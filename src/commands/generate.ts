import { Command, flags } from '@oclif/command'
import * as fs from "fs"
import * as path from "path"
import * as Mustache from "mustache"
import { basicTemplate } from "../templates/basic"
import { fetchPackagesJson, writeBasicConfig, getLicense } from '../utils';
import { EffePackageJson, PackageManagerSupported, LicenseSupported } from '../types';
import cli from 'cli-ux'
import { isNullOrUndefined } from 'util';
import * as propmts from "prompts"
const readPgkUp = require("read-pkg-up")
const emoji = require('emoji-random');

export default class Generate extends Command {
  static description = 'generate README.md from package.json'

  static flags = {

  }

  static args = [{ name: 'file' }]

  async run() {
    const { flags } = this.parse(Generate)

    cli.action.start("effe is generating")

    let pJson: EffePackageJson | null = null

    try {
      const res = await readPgkUp()
      pJson = res.pkg
    } catch (error) {
      this.log("Unable to find a package.json")
    }

    if (isNullOrUndefined(pJson)) {
      this.log("Unable to find a package.json")
      return
    }

    if (pJson.effe === undefined) {
      let packageManagerSelected = flags.packageManagerSelected

      this.log(JSON.stringify(packageManagerSelected))

      if (!packageManagerSelected) {
        let responses = await propmts({
          name: "packagemanagerSelected",
          message: `from where people can download ${pJson.name}?`,
          type: "list",
          choices: [{
            title: "npm", value: "npm",
          }, {
            title: "yarn", value: "yarn",
          }, {
            title: "none of these", value: "none of these",
          }]
        })

        packageManagerSelected = responses.packagemanagerSelected != "none of these" ? responses.packagemanagerSelected : null
      }

      try {
        pJson = await writeBasicConfig(pJson, packageManagerSelected as PackageManagerSupported)
      } catch (error) {
        this.log(error)
      }
    }

    let licenseDescription: String | null = null

    if (pJson.license && getLicense(pJson.license as LicenseSupported)) {
      try {
        licenseDescription = Mustache.render(getLicense(pJson.license as LicenseSupported)!, {
          author: pJson.author ? pJson.author.name : "Author empty"
        })
      } catch (error) {

      }
    }

    const randomEmoji = emoji.random()

    const dependenciesPJsonMetadata = await fetchPackagesJson(Object.keys(pJson.dependencies || []))
    const displayableDependencies = dependenciesPJsonMetadata.map(d => ({
      dependencyName: d.name,
      dependencyVersion: d.version,
      dependencyDescription: d.description,
    }))
    let installationInstructions: string | null = null

    if (pJson.effe.installfrom) {
      switch (pJson.effe.installfrom) {
        case PackageManagerSupported.npm:
          installationInstructions = "npm install " + pJson.name
          break;

        case PackageManagerSupported.yarn:
          installationInstructions = "yarn add " + pJson.name
          break;

        default:
          installationInstructions = "effe don't know " + pJson.effe.installfrom
          break;
      }
    }

    let testInstructionDescription: string | null = null

    if (pJson.scripts && pJson.scripts.test && pJson.effe.testInstructions) {
      testInstructionDescription = pJson.scripts.test
    }

    try {
      const rendered = Mustache.render(basicTemplate, {
        emoji: pJson.effe.emoji ? randomEmoji : null,
        mentionme: pJson.effe.mentionme,
        name: pJson.name,
        description: pJson.description,
        author: pJson.author ? pJson.author.name : "Author empty",
        testInstruction: testInstructionDescription,
        dependencies: pJson.effe.tecnhologies ? displayableDependencies : [],
        howtocontribute: pJson.effe ? pJson.effe.howtocontribute : false,
        license: pJson.license,
        licenseDescription: licenseDescription,
        packagemanager: pJson.effe.installfrom ? pJson.effe.installfrom : null,
        installationInstructions: installationInstructions,
        linkedin: pJson.effe.linkedin,
        twitter: pJson.effe.twitter,
        twitt: pJson.effe.twitt,
        githubrepo: pJson.effe.githubrepo
      })

      const readmePath = path.dirname("package.json")

      fs.writeFile(`${readmePath}/tmp/README.md`, rendered, err => {
        if (err) {
          this.log(err.message)
        } else {
          cli.action.stop(`tada -> ${readmePath}/README.md`)
        }
      })
    } catch (error) {
      this.log("Unable to render your new README.md: " + error)
    }
  }
}
