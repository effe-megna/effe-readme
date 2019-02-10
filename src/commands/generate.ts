import { Command, flags } from '@oclif/command'
import * as fs from "fs"
import * as path from "path"
import * as Mustache from "mustache"
import cli from 'cli-ux'
const inquier = require('inquirer')
import { fetchPackagesJson, writeBasicConfig } from '../utils';
import { EffePackageJson, PackageManagerSupported } from '../types';
const pjson = require("../../package.json")
const emoji = require('emoji-random');

export default class Generate extends Command {
  static description = 'generate README.md from package.json'

  static flags = {
    // help: flags.help({ char: 'h' }),
    // // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: 'n', description: 'name to print' }),
    // // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),
    packageManagerSelected: flags.string({options: ['npm', 'yarn', 'none of these']})
  }

  static args = [{ name: 'file' }]

  async run() {
    const { flags } = this.parse(Generate)

    cli.action.start("effe is generating")

    let pJson = pjson as EffePackageJson

    if (pJson.effe === undefined) {
      let packageManagerSelected = flags.packageManagerSelected

      if (!packageManagerSelected) {
        let responses: any = await inquier.prompt([{
          name: "packagemanagerSelected",
          message: `from where people can download ${pJson.name}?`,
          type: "list",
          choices: [{ name: "npm" }, { name: "yarn" }, { name: "none of these" }]
        }])

        packageManagerSelected = responses.packagemanagerSelected != "none of these" ?  responses.packagemanagerSelected : null
      }

      try {
        pJson = await writeBasicConfig(pJson, packageManagerSelected as PackageManagerSupported)
      } catch (error) {
        this.log(error)
      }
    }

    const templatePath = path.join(__dirname, "../../templates/basic.md")

    let licenseDescription: String | null = null

    if (pJson.license === "MIT") {
      try {
        const licensesPath = path.join(__dirname, "../../licenses")
        licenseDescription = fs.readFileSync(`${licensesPath}/${pJson.license}.txt`, "utf8")
        licenseDescription = Mustache.render(licenseDescription.toString(), {
          author: pJson.author
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

    const rendered = Mustache.render(fs.readFileSync(templatePath).toString(), {
      emoji: pJson.effe.emoji ? randomEmoji : null,
      mentionme: pJson.effe.mentionme,
      name: pJson.name,
      description: pJson.description,
      author: pJson.author,
      twitt: pJson.effe.twitt ? pJson.effe.twitt : null,
      testInstruction: testInstructionDescription,
      dependencies: pJson.effe.tecnhologies ? displayableDependencies : [],
      howtocontribute: pJson.effe ? pJson.effe.howtocontribute : false,
      licenseDescription: licenseDescription,
      packagemanager: pJson.effe.installfrom ? pJson.effe.installfrom : null,
      installationInstructions: installationInstructions
    })

    const readmePath = path.dirname("package.json")

    fs.writeFile(`${readmePath}/README.md`, rendered, err => {
      if (err) {
        this.log(err.message)
      } else {
        cli.action.stop(`tada -> ${readmePath}/README.md`)
      }
    })
  }
}
