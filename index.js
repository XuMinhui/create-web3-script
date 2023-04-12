#!/usr/bin/env node

/**
 * Copyright (c) 2023-present, Homie_Xu, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// create-web3-script is installed globally on people's computers. This means
// that it is extremely difficult to have them upgrade the version and
// because there's only one global version installed, it is very prone to
// breaking changes.
//
// The only job of create-web3-script is to init the repository and then
// forward all the commands to the local version of create-web3-script.
//
// If you need to add a new command, please add it to the scripts/ folder.
//
// The only reason to modify this file is to add more warnings and
// troubleshooting information for the `create-web3-script` command.
//
// Do not make breaking changes! We absolutely don't want to have to
// tell people to update their global version of create-web3-script.
//
// Also be careful with new language features.
// This file must work on Node 0.14+.
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

'use strict';


const { program } = require('commander');
const { execSync } = require('child_process');
const { existsSync } = require('fs');
const clalk = require('chalk')

function init() {
    const currentNodeVersion = process.versions.node;
    const semver = currentNodeVersion.split('.');
    const major = semver[0];

    if (major < 14) {
        console.log(clalk.red(
            'You are running Node ' +
            currentNodeVersion +
            '.\n' +
            'Create React App requires Node 14 or higher. \n' +
            'Please update your version of Node.'
        ));
        process.exit(1);
    }

    program
        .arguments('<name>')
        .description('Create a new Web3 script project')
        .action(name => {
            console.log(clalk.blue(`💼 Creating ${name} project...`));
            if (existsSync(`./${name}`)) {
                console.log(clalk.red(`❌ Error: < ${name} > folder already exists!`))
                process.exit()
            }

            execSync(`git clone https://github.com/XuMinhui/web3-script-template ${name}`);
            console.log(clalk.green(`✅ success clone repository!`))

            console.log(clalk.blue(`⌛️ Dependencies are being installed...`));
            execSync(`cd ${name} && npm install`);
            console.log(clalk.green(`✅ success install dependencies!`))

            console.log(clalk.green(`🐎 Done!`));
        });

    program.parse(process.argv);
}

init()