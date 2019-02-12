export const basicTemplate = `
# {{name}}

[![npm version](https://badge.fury.io/js/{{name}}.svg)](https://www.npmjs.com/package/{{name}})
{{#license}}
[![{{{license}}} license](http://img.shields.io/badge/license-{{{license}}}-brightgreen.svg)](http://opensource.org/licenses/{{{license}}})
{{/license}}
{{#twitt.length}}
  <a href="https://twitter.com/intent/tweet?text={{twitt}}: {{{githubrepo}}}">
    <img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"/>
  </a>
{{/twitt.length}}

{{emoji}} {{description}}
{{#packagemanager}}

## Installation

Use {{packagemanager}} to install {{name}}.

\`\`\`javascript
{{installationInstructions}}
\`\`\`
{{/packagemanager}}
{{#testInstruction.length}}

## How to test

\`\`\`javascript
{{{testInstruction}}}
\`\`\`
{{/testInstruction.length}}
{{#dependencies.length}}

## 🚀 Technologies

| **Tech** | **Version** | **Description** |
| -------- | ----------- | --------------- |
{{#dependencies}}
| {{{dependencyName}}} | {{{dependencyVersion}}} | {{{dependencyDescription}}} |
{{/dependencies}}

{{/dependencies.length}}

## 🚶 Developed by
\`\`\`
{{author}}
\`\`\`
{{#linkedin.length}}
- [LinkedIn]({{{linkedin}}})
- [Twitter]({{{twitter}}})
{{/linkedin.length}}

{{#howtocontribute}}

## 👍 How to Contribute
1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
{{/howtocontribute}}

{{#mentionme}}
This README.md was bootstrapped with [effe-readme](https://github.com/effe-megna/effe-readme).
{{/mentionme}}

{{#licenseDescription.length}}
## 📃 License

 {{{licenseDescription}}}
{{/licenseDescription.length}}
`
