# {{name}}

[![npm version](https://badge.fury.io/js/{{name}}.svg)](https://www.npmjs.com/package/{{name}})
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
{{#twitt.length}}
  <a href="https://twitter.com/intent/tweet?text={{twitt}}: https://github.com/{{author}}//{{name}}">
    <img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"/>
  </a>
{{/twitt.length}}

{{emoji}} **{{name}}** {{description}}
{{#packagemanager}}

## Installation

Use {{packagemanager}} to install {{name}}.

```javascript
{{installationInstructions}}
```
{{/packagemanager}}
{{#testInstruction.length}}

## How to test

```javascript
{{{testInstruction}}}
```
{{/testInstruction.length}}
{{#dependencies.length}}

## Technologies

| **Tech** | **Version** | **Description** |
| -------- | ----------- | --------------- |
{{#dependencies}}
| {{dependencyName}} | {{dependencyVersion}} | {{dependencyDescription}} |
{{/dependencies}}

{{/dependencies.length}}

## 🚶 Developed by
```
{{author}}
```

{{#licenseDescription.length}}
# 📃 License

 {{licenseDescription}}
{{/licenseDescription.length}}
{{#howtocontribute}}

# 👍 How to Contribute
1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request
{{/howtocontribute}}

{{#mentionme}}
This README.md was bootstrapped with **effe-readme**.
{{/mentionme}}

