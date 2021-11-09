const chalk = require('chalk')
const cfonts = require('cfonts')
const fetch = require('node-fetch')
const { spawn } = require("child_process")
const axios = require('axios')
const fs = require("fs")

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})

const fetchText = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.text())
        .then(text => {
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const banner = cfonts.render(('X D T'), {
    font: 'chrome',
    color: 'candy',
    align: 'center',
    gradient: ["red","yellow"],
    lineHeight: 3
  })

const getGroupAdmins = (participants) => {
	admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

const getBuffer = async(url, options) => {
  try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
  }
}

const spinner = { 
  "interval": 120,
  "frames": [
    "",
    "X",
    "XI",
    "XIE",
    "XIED",
    "XIEDE",
    "XIEDEV",
    "XIEDEVT",
    "XIEDEVTE",
    "XIEDEVTEA",
    "XIEDEVTEAM",
    "XIEDEVTEA",
    "XIEDEVTE",
    "XIEDEVT",
    "XIEDEV",
    "XIEDE",
    "XIED",
    "XIE",
    "XI",
    "X",
    "XI",
    "XIE",
    "XIED",
    "XIEDE",
    "XIEDEV",
    "XIEDEVT",
    "XIEDEVTE",
    "XIEDEVTEA",
    "XIEDEVTEAM",
    "XIEDEVTEA",
    "XIEDEVTE",
    "XIEDEVT",
    "XIEDEV",
    "XIEDE",
    "XIED",
    "XIE",
    "XI",
    "X",
    ""
  ]}

let globalSpinner;


const getGlobalSpinner = (disableSpins = false) => {
  if(!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
  return globalSpinner;
}

spins = getGlobalSpinner(false)

const start = (id, text) => {
	spins.add(id, {text: text})
}

const success = (id, text) => {
	spins.succeed(id, {text: text})
}

const createExif = (pack, auth) =>{
    const code = [0x00,0x00,0x16,0x00,0x00,0x00]
    const exif = {"sticker-pack-id": "com.client.tech", "sticker-pack-name": pack, "sticker-pack-publisher": auth, "android-app-store-link": "https://play.google.com/store/apps/details?id=com.termux", "ios-app-store-link": "https://itunes.apple.com/app/sticker-maker-studio/id1443326857"}
    let len = JSON.stringify(exif).length
    if (len > 256) {
        len = len - 256
        code.unshift(0x01)
    } else {
        code.unshift(0x00)
    }
    if (len < 16) {
        len = len.toString(16)
        len = "0" + len
    } else {
        len = len.toString(16)
    }
    const _ = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
    const __ = Buffer.from(len, "hex")
    const ___ = Buffer.from(code)
    const ____ = Buffer.from(JSON.stringify(exif))
    fs.writeFileSync('./stick/data.exif', Buffer.concat([_, __, ___, ____]), function (err) {
        console.log(err)
        if (err) return console.error(err)
        return `./stick/data.exif`
    })

}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const modStick = (media, xiedev, caa, from) => {
    out = getRandom('.webp')
    try {
        console.log(media)
        spawn('webpmux', ['-set','exif', './stick/data.exif', media, '-o', out])
        .on('exit', () => {
            xiedev.sendMessage(from, fs.readFileSync(out), 'stickerMessage', {quoted: caa})
            fs.unlinkSync(out)
            fs.unlinkSync(media)
        })
    } catch (e) {
        console.log(e)
        xiedev.sendMessage(from, 'Terjadi keslahan', 'conversation', {quoted: caa})
        fs.unlinkSync(media)
    }
}

module.exports = { color, banner, start, getGroupAdmins, getBuffer, createExif, getRandom, modStick, fetchJson, fetchText }