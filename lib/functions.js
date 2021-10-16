const fetch = require('node-fetch')
const imgbb = require('imgbb-uploader')
const axios = require('axios')
const cfonts = require('cfonts')
const spin = require('spinnies')
const Crypto = require('crypto')

const getBuffer = async (url, options) => {
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

const randomBytes = (length) => {
    return Crypto.randomBytes(length)
}

const generateMessageID = () => {
    return randomBytes(10).toString('hex').toUpperCase()
}

const getGroupAdmins = (participants) => {
	admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
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
	
const info = (id, text) => {
	spins.update(id, {text: text})
}

const success = (id, text) => {
	spins.succeed(id, {text: text})

	}

const close = (id, text) => {
	spins.fail(id, {text: text})
}

const banner = cfonts.render(('XIE DEV|T E A M'), {
    font: 'chrome',
    color: 'candy',
    align: 'center',
    gradient: ["red","yellow"],
    lineHeight: 3
  });


module.exports = { getBuffer, generateMessageID, getGroupAdmins, getRandom, start, info, success, banner, close }
