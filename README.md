# effe-readme

[![npm version](https://badge.fury.io/js/effe-readme.svg)](https://www.npmjs.com/package/effe-readme)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
  <a href="https://twitter.com/intent/tweet?text=Bootstrap README.md from package.json, say goodbye to your sad github account.: https://github.com/effe-megna/effe-readme">
    <img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"/>
  </a>

✏️ Bootstrap README.md from package.json

## Installation

Use npm to install effe-readme.

```javascript
npm install effe-readme
```

## Usage 
```javascript
effe generate
```

## Options

add "effe" in package.json, a basic config is created on the first generation
```json

"effe": {
  "twitt": "a fancy text to twitt",
  "emoji": true,
  "tecnhologies": true,
  "howtocontribute": true,
  "installfrom": "npm",
  "mentionme": true,
  "testInstructions": true,
  "linkedin": "https://www.linkedin.com/in/francesco-megna-19a266162",
  "twitter": "https://twitter.com/effemegna",
  "githubrepo": "https://github.com/effe-megna/effe-readme"
}
```
definition: 
```typescript
interface EffeOptions {
  twitt: string | null, // add twitter badge on your readme	
  emoji: boolean | null, // random emoji before description	
  tecnhologies: boolean | null, // show table of library used, with name, version and description
  howtocontribute: boolean | null, // how to contribute instructions
  installfrom: PackageManagerSupported | null, // npm and yarn supported
  mentionme: boolean | null, // mention effe-readme at the end of your readme
  testInstructions: boolean | null, // test instructions based on test script
  linkedin: string | null, // linkedin account
  twitter: string | null, // twitter account
  githubrepo: string | null // github repo of your project
}
```

## 🚀 Technologies

| **Tech** | **Version** | **Description** |
| -------- | ----------- | --------------- |
| @oclif/command | 1.5.10 | oclif base command |
| @oclif/config | 1.12.6 | base config object and standard interfaces for oclif components |
| @oclif/plugin-help | 2.1.6 | standard help for oclif |
| @types/mustache | 0.8.32 | TypeScript definitions for Mustache |
| @types/package-json | 5.0.0 | TypeScript definitions for package-json |
| @types/prompts | 1.2.0 | TypeScript definitions for prompts |
| cli-ux | 5.1.0 | cli IO utilities |
| emoji-random | 0.1.2 | Creates a random emoji string. This is as useless as it gets. |
| inquirer | 6.2.2 | A collection of common interactive command line user interfaces. |
| mustache | 3.0.1 | Logic-less {{mustache}} templates with JavaScript |
| package-json | 6.0.0 | Get metadata of a package from the npm registry |
| prompts | 2.0.2 | Lightweight, beautiful and user-friendly prompts |
| read-pkg-up | 4.0.0 | Read the closest package.json file |
| tslib | 1.9.3 | Runtime library for TypeScript helper functions |
| write-pkg | 3.2.0 | Write a package.json file |

## 🚶 Developed by
```
Francesco Megna
```
- [LinkedIn](https://www.linkedin.com/in/francesco-megna-19a266162)
- [Twitter](https://twitter.com/effemegna)


## 👍 How to Contribute
1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

This README.md was bootstrapped with [effe-readme](https://github.com/effe-megna/effe-readme).

## 📃 License

 MIT License

    Copyright (c) 2019 Francesco Megna

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
