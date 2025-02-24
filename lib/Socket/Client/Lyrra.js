const axios = require('axios')
const chalk = require('chalk')
const cheerio = require("cheerio")
const FormData = require('form-data')
const fs = require('fs')
const fetch = require('node-fetch')
const path = require('path')
const ms = require('ms')


async function getInput(prompt) {
  process.stdout.write(prompt)
  return new Promise((resolve, reject) => {
    process.stdin.once('data', (data) => {
      const input = data.toString().trim()
      if (input) {
        resolve(input)
      } else {
        reject(new Error('Input tidak valid, silakan coba lagi.'))
      }
    })
  })
}

async function responSearchMsg(Lyrra) {
  const filePath = './socket-unex.json';
  let isAuthorized = false;
  let getuserName = '';

  while (!isAuthorized) {
    console.log(chalk.yellow.bold('\nMasukan UserName :'));
    getuserName = await getInput(chalk.yellow.bold('Name: '));

    try {
      const jsonData = await fs.promises.readFile(filePath, 'utf8');
      const numbersData = JSON.parse(jsonData);

      if (numbersData && numbersData.data) {
        const userData = numbersData.data.find(data => data.userName === getuserName);

        if (userData) {
          console.log(chalk.green.bold('UserName Diizinkan!'));
          const code = await Lyrra.requestPairingCode(userData.nomor);
          console.log(chalk.yellow.bold(`\nKode pairing: `) + chalk.reset(code));
          isAuthorized = true;
        } else {
          console.log(chalk.red.bold('Username Salah!!'));
        }
      } else {
        console.log(chalk.red.bold('Gagal mengambil data!'));
      }
    } catch (error) {
      console.error(chalk.red.bold('Error membaca file: ') + error.message);
    }
  }
}


module.exports = {
  getInput,
  responSearchMsg
}