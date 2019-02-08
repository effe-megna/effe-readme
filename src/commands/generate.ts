import { Command, flags } from '@oclif/command'
import * as fs from "fs"
import * as path from "path"
import * as Mustache from "mustache"
import { PackageJson } from 'package-json';
import { fetchPackagesJson } from '../utils';
const pjson = require("../../package.json")
const emoji = require('emoji-random');

export default class Generate extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(Generate)

    const pJson = pjson as PackageJson

    const templatePath = path.join(`C:/Users/Francesco/Documents/Open-source/effe-readme/templates`, "basic.md")

    let lisenseDescription: String | null = null

    if (pJson.license) {
      lisenseDescription = fs.readFileSync(`C:/Users/Francesco/Documents/Open-source/effe-readme/licenses/${pJson.license}.txt`, "utf8")
    }

    const randomEmoji = emoji.random()

    const dependenciesPJsonMetadata = await fetchPackagesJson(Object.keys(pJson.dependencies || []))
    const displayableDependencies = dependenciesPJsonMetadata.map(d => ({
      dependencyName: d.name,
      dependencyVersion: d.version,
      dependencyDescription: d.description,
    }))
    let installationInstructions: string | null = null

    if (pjson.effe && pjson.effe.packagemanager) {
      switch (pjson.effe.packagemanager) {
        case "npm":
          installationInstructions = "npm install " + pJson.name
          break;

        case "yarn":
          installationInstructions = "yarn add " + pJson.name
          break;

        default:
          installationInstructions = "effe don't know " + pjson.effe.packagemanager
          break;
      }
    }

    const rendered = Mustache.render(fs.readFileSync(templatePath).toString(), {
      emoji: pjson.effe && pjson.effe.emoji ? randomEmoji : null,
      name: pJson.name,
      description: pJson.description,
      author: pJson.author,
      twitt: pjson.effe && pjson.effe.twitt ? pjson.effe.twitt : null,
      dependencies: pjson.effe && pjson.effe.tecnhologies ? displayableDependencies : [],
      howtocontribute: pjson.effe ? pjson.effe.howtocontribute : false,
      licenseDescription: lisenseDescription ? lisenseDescription : "Missing license",
      packagemanager: pjson.effe && pjson.effe.packagemanager ? pjson.effe.packagemanager : null,
      installationInstructions: installationInstructions
    })

    fs.writeFile("C:/Users/Francesco/Documents/Open-source/effe-readme/README.md", rendered, err => {
      if (err) {
        this.log(err.message)
      } else {
        this.log(rendered)
      }
    })
  }
}
