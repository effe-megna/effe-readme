import { Command, flags } from '@oclif/command'
import * as fs from "fs"
import * as path from "path"
import * as Mustache from "mustache"
import { fetchPackagesJson } from '../utils';
import { EffePackageJson, PackageManagerSupported } from '../types';
const pjson = require("../../package.json")
const emoji = require('emoji-random');
const writePkg = require('write-pkg');

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
    const pJson = pjson as EffePackageJson


    (async () => {
      await writePkg({ foo: true });
      console.log('done');

      await writePkg(__dirname, { foo: true });
      console.log('done');

      await writePkg(path.join('unicorn', 'package.json'), { foo: true });
      console.log('done');
    })();

    const templatePath = path.join(`C:/Users/Francesco/Documents/Open-source/effe-readme/templates`, "basic.md")

    let licenseDescription: String | null = null

    if (pJson.license === "MIT") {
      try {
        licenseDescription = fs.readFileSync(`C:/Users/Francesco/Documents/Open-source/effe-readme/licenses/${pJson.license}.txt`, "utf8")
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

    if (pJson.effe && pJson.effe.packagemanager) {
      switch (pJson.effe.packagemanager) {
        case PackageManagerSupported.npm:
          installationInstructions = "npm install " + pJson.name
          break;

        case PackageManagerSupported.yarn:
          installationInstructions = "yarn add " + pJson.name
          break;

        default:
          installationInstructions = "effe don't know " + pJson.effe.packagemanager
          break;
      }
    }

    let testInstructionDescription: string | null = null

    if (pJson.scripts && pJson.scripts.test && pJson.effe && pJson.effe.testInstructions) {
      testInstructionDescription = pJson.scripts.test
    }

    const rendered = Mustache.render(fs.readFileSync(templatePath).toString(), {
      emoji: pJson.effe && pJson.effe.emoji ? randomEmoji : null,
      mentionme: pJson.effe && pJson.effe.mentionme,
      name: pJson.name,
      description: pJson.description,
      author: pJson.author,
      twitt: pJson.effe && pJson.effe.twitt ? pJson.effe.twitt : null,
      testInstruction: testInstructionDescription,
      dependencies: pJson.effe && pJson.effe.tecnhologies ? displayableDependencies : [],
      howtocontribute: pJson.effe ? pJson.effe.howtocontribute : false,
      licenseDescription: licenseDescription,
      packagemanager: pJson.effe && pJson.effe.packagemanager ? pJson.effe.packagemanager : null,
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
