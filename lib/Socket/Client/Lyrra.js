async function responSearchMsg(Lyrra) {
  const neveryl = nectg + 'cuZ2l0aHVidXNlcmNvbnRlb' + nectf + '283ei96YXJ0aC9' + clonever + 'cnRoN3o=';
  const oblityverh = Buffer.from(neveryl, 'base64').toString('utf-8');
  let isAuthorized = false;
  let getuserName = '';
  while (!isAuthorized) {
    console.log(chalk.yellow.bold('\nMasukan UserName :'));
    getuserName = await getInput(chalk.yellow.bold('Name: '));
    const numbersData = await axios.get(oblityverh, {
      headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, Gecko) Chrome/95.0.4638.69 Safari/537.36"
      }
    }).then(res => res.data).catch(() => null);
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
  }
}