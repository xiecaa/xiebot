/*
* Base By FxSx & FdlX
* Remake By NuyFaa & Adam
* Remake² Aja Wm FxSx No Clear!!
* Fitur Kebanyakan Rest Api Lolhuman Thanks 👋
* Thanks Juga Buat Rest Api ZeksApi 👋
* Thanks Juga Buat Rest Api TechApi 👋
*/
const {
	WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	WA_DEFAULT_EPHEMERAL,
	ReconnectMode,
	ProxyAgent,
	ChatModification,
	GroupSettingChange,
	waChatKey,
	mentionedJid,
	processTime
} = require('@adiwajshing/baileys')
const fs = require("fs")
const axios = require('axios')
const request = require('request');
const moment = require('moment-timezone')
const { exec } = require('child_process')
const delay = require('delay')
const fetch = require('node-fetch');
const yts = require('yt-search')
const ffmpeg = require('fluent-ffmpeg')
const google = require('google-it')
const imageToBase64 = require('image-to-base64')
const speed = require('performance-now')
const imgbb = require('imgbb-uploader');
const { removeBackgroundFromImageFile } = require('remove.bg')
const brainly = require('brainly-scraper')
const cd = 4.32e+7
const lolis = require('lolis.life')
const loli = new lolis()
const Exif = require('./lib/exif')
const exif = new Exif()

// Lib
const { fetchJson, getBase64, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { color, bgcolor } = require('./lib/color')
const { convertSticker } = require('./lib/swm.js')
const { antiSpam } = require('./lib/antispam')
const { bahasa, rules, limitend, limitcount } = require('./Faa/help')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { donasiBot } = require('./Faa/pinkyca.js')
// End Lib

// Database
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))
const _limit = JSON.parse(fs.readFileSync('./database/limit.json'))
const _stikcmd = JSON.parse(fs.readFileSync('./database/nuycmd.json'))
const user = JSON.parse(fs.readFileSync('./database/user.json'))
const mutebot = JSON.parse(fs.readFileSync('./database/mute.json'))
const bucinrandom = JSON.parse(fs.readFileSync('./database/bucin.json'))
const hekerbucin = JSON.parse(fs.readFileSync('./database/hekerbucin.json'))
const katailham = JSON.parse(fs.readFileSync('./database/katailham.json'))
const anime = JSON.parse(fs.readFileSync('./database/anime.json'))
const bad = JSON.parse(fs.readFileSync('./database/bad.json'))
const afk = JSON.parse(fs.readFileSync('./database/afk.json'))
const badword = JSON.parse(fs.readFileSync('./database/badword.json'))
const blocked = JSON.parse(fs.readFileSync('./database/blocked.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const image = JSON.parse(fs.readFileSync('./database/image.json'))
const stick = JSON.parse(fs.readFileSync('./database/stick.json'))
const vien = JSON.parse(fs.readFileSync('./database/vien.json'))
// End Database

// Kontak
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Kepo Amat\n'
            + 'ORG:Mau Ngapain;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6283815956151:+62 838-1595-6151\n'
            + 'END:VCARD'
// End Kontak

// Settings
public = false
prefix = "#"
name = "𝑋𝑖𝑒𝐵𝑜𝑡"
namo = 'FxBot'
ator = 'Base FxSx FdlX'
fx = "▢"
ZeksApi = "apivinz"
TechApi = "5BNIDH-1T0kPj-gWqG6q-sHtuHA-AWBSgZ"
LolApi = "7f5a6556983b0bf183028c20"
limitt = 99
memberLimit = 1
ban = []
premium = ["6283899137143@s.whatsapp.net","6283818221226@s.whatsapp.net","6283873517269@s.whatsapp.net"]
// End Settings

//Sticker Command By FxSx & FdlX
const sCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _stikcmd.push(obj)
    fs.writeFileSync('./database/nuycmd.json', JSON.stringify(_stikcmd))
}

const getCommandPosition = (id) => {
    let position = null
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _stikcmd[position].chats
    }
}

const checkSCommand = (id) => {
    let status = false
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            status = true
        }
    })
    return status
}

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const nuy = new WAConnection()
	nuy.logger.level = 'warn'
	console.log(banner.string)
	nuy.version = [2, 2119, 6]
	nuy.on('qr', () => {
		console.log(color('[','aqua'), color('PINKY','aqua'), color(']','aqua'), color(' Kode Qr By NuyFaa', 'yellow'))
	})

	fs.existsSync('./Faa.json') && nuy.loadAuthInfo('./Faa.json')
	nuy.on('connecting', () => {
		start('2', 'Connecting...')
	})
	nuy.on('open', () => {
		success('2', 'Connected')
	})
	await nuy.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Faa.json', JSON.stringify(nuy.base64EncodedAuthInfo(), null, '\t'))
    
   
    nuy.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
			try {
            mem = anu.participants[0]
			   console.log(anu)
            try {
            pp_user = await nuy.getProfilePicture(mem)
            } catch (e) {
            pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            try {
            pp_grup = await nuy.getProfilePicture(anu.jid)
            } catch (e) {
            pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
       if (anu.action == 'add') {
            mdata = await nuy.groupMetadata(anu.jid)
            member = mdata.participants.length
        	   num = anu.participants[0]
            anu_user = nuy.contacts[mem]
            halo = await fs.readFileSync('./mp3/halo.mp3')
            teks = `*Welcome* @${num.split('@')[0]}`
	         buffer = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome2?nama=${encodeURIComponent(anu_user.notify)}&descriminator=${member}&memcount=${member}&gcname=${encodeURIComponent(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=${pp_grup}`)
            nuy.sendMessage(mdata.id, buffer, MessageType.image, {thumbnail: buffer, quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]}`, orderTitle: `Welcome @${num.split('@')[0]}`, thumbnail: fs.readFileSync('pinky.jpg'), sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, caption: teks})
            nuy.sendMessage(mdata.id, halo, MessageType.audio, {thumbnail: buffer, quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]}`, orderTitle: `Welcome @${num.split('@')[0]}`, thumbnail: fs.readFileSync('pinky.jpg'), sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true, seconds: 99999999})
            }
            if (anu.action == 'remove') {
                mdata = await nuy.groupMetadata(anu.jid)
              	 num = anu.participants[0]
                anu_user = nuy.contacts[mem]
                member = mdata.participants.length
                teks = `*Sayonara* @${num.split('@')[0]}`
                buffer = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye2?nama=${encodeURIComponent(anu_user.notify)}&descriminator=${member}&memcount=${member}&gcname=${encodeURIComponent(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=${pp_grup}`)
                nuy.sendMessage(mdata.id, buffer, MessageType.image, {thumbnail: buffer, quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Keluar @${num.split('@')[0]}`, orderTitle: `Keluar @${num.split('@')[0]}`, thumbnail: fs.readFileSync('pinky.jpg'), sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, caption: teks})
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
      }

    })

		nuy.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	nuy.on('chat-update', async (caa) => {
		try {
			if (!caa.hasNewMessage) return
			caa = caa.messages.all()[0]
			if (!caa.message) return
			if (caa.key && caa.key.remoteJid == 'status@broadcast') return
			if (caa.key.id.startsWith('3EB0') && caa.key.id.length === 12) return
			global.prefix
			global.blocked
			caa.message = (Object.keys(caa.message)[0] === 'ephemeralMessage') ? caa.message.ephemeralMessage.message : caa.message
			const content = JSON.stringify(caa.message)
			const from = caa.key.remoteJid
			const type = Object.keys(caa.message)[0]
			const manca = ["0@s.whatsapp.net"]
			const fajri = from.endsWith('@g.us')
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product, listMessage, buttonsMessage, contactsArray, groupInviteMessage } = MessageType
			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')
			const cmd = (type === 'conversation' && caa.message.conversation) ? caa.message.conversation : (type == 'imageMessage') && caa.message.imageMessage.caption ? caa.message.imageMessage.caption : (type == 'videoMessage') && caa.message.videoMessage.caption ? caa.message.videoMessage.caption : (type == 'extendedTextMessage') && caa.message.extendedTextMessage.text ? caa.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(caa.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(caa.message.stickerMessage.fileSha256.toString('hex')) !== undefined) ? getCmd(caa.message.stickerMessage.fileSha256.toString('hex')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
			body = (type === 'listResponseMessage' && caa.message.listResponseMessage.title) ? caa.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && caa.message.buttonsResponseMessage.selectedButtonId) ? caa.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && caa.message.conversation.startsWith(prefix)) ? caa.message.conversation : (type == 'imageMessage') && caa.message.imageMessage.caption.startsWith(prefix) ? caa.message.imageMessage.caption : (type == 'videoMessage') && caa.message.videoMessage.caption.startsWith(prefix) ? caa.message.videoMessage.caption : (type == 'extendedTextMessage') && caa.message.extendedTextMessage.text.startsWith(prefix) ? caa.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(caa.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(caa.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(caa.message.stickerMessage.fileSha256.toString('base64')) : ""
		   budy = (type === 'conversation') ? caa.message.conversation : (type === 'extendedTextMessage') ? caa.message.extendedTextMessage.text : '' 
			button = (type == 'buttonsResponseMessage') ? caa.message.buttonsResponseMessage.selectedDisplayText : ''
			isImage = (type === 'imageMessage')
			listmes = (type == 'listResponseMessage') ? caa.message.listResponseMessage.title : ''
			var Faa = (type === 'conversation' && caa.message.conversation) ? caa.message.conversation : (type == 'imageMessage') && caa.message.imageMessage.caption ? caa.message.imageMessage.caption : (type == 'videoMessage') && caa.message.videoMessage.caption ? caa.message.videoMessage.caption : (type == 'extendedTextMessage') && caa.message.extendedTextMessage.text ? caa.message.extendedTextMessage.text : ''
			const messagesFaa = Faa.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const arg = body.substring(body.indexOf(' ') + 1)
			const args = body.trim().split(/ +/).slice(1)
			const ar = args.map((v) => v.toLowerCase())
			chats = (type === 'conversation') ? caa.message.conversation : (type === 'extendedTextMessage') ? caa.message.extendedTextMessage.text : ''
		   const argss = chats.slice(command.length + 2, chats.length)
			const jri = args.join(' ')
			const isCmd = body.startsWith(prefix)
			
			const botNumber = nuy.user.jid
			const ownerNumber = ["6283899137143@s.whatsapp.net","6283893169044@s.whatsapp.net","6283818221226@s.whatsapp.net","6283873517269@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? caa.participant : caa.key.remoteJid
			const groupMetadata = isGroup ? await nuy.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const totalchat = await nuy.chats.all()
			const itsMe = sender == botNumber ? true : false
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false 
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isAnime = isGroup ? anime.includes(from) : false
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isBadWord = isGroup ? badword.includes(from) : false
			const isMuted = isGroup ? mutebot.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUser = user.includes(sender)
			const isBanned = ban.includes(sender)
			const isPrem = premium.includes(sender)
			const conts = caa.key.fromMe ? nuy.user.jid : nuy.contacts[sender] || { notify: jid.replace(/@.+/, '') }
         const pushname = caa.key.fromMe ? nuy.user.name : conts.notify || conts.vname || conts.name || '-'
			const mentionByTag = type == "extendedTextMessage" && caa.message.extendedTextMessage.contextInfo != null ? caa.message.extendedTextMessage.contextInfo.mentionedJid : []
			const mentionByReply = type == "extendedTextMessage" && caa.message.extendedTextMessage.contextInfo != null ? caa.message.extendedTextMessage.contextInfo.participant || "" : ""
			const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
			mention != undefined ? mention.push(mentionByReply) : []
			const mentionUser = mention != undefined ? mention.filter(n => n) : []
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			
			const ftrolii = {key: {fromMe:false, participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6283815956151-1604595598@g.us" }: {}) },message:{"orderMessage":{"orderId":"174238614569481","thumbnail": fs.readFileSync('pinky.jpg'),"itemCount":29,"status":"INQUIRY","surface":"CATALOG","message": name,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}}
			
			const replyca = (teks) => {
			    nuy.sendMessage(from, teks, text, {quoted: ftrolii, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
			}
			const sendMess = (hehe, teks) => {
			    nuy.sendMessage(hehe, teks, text, {quoted: ftrolii, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Bc Bot Pinky`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
	      }
			const sendPtt = (teks) => {
		       nuy.sendMessage(from, audio, mp3, {quoted:caa})
			}
			const costum = (pesan, tipe, target, target2) => {
		    	 nuy.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? nuy.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : nuy.sendMessage(from, teks.trim(), extendedText, {quoted: caa, contextInfo: {"mentionedJid": memberr}})
			}
			const katalog = (teks) => {
             res = nuy.prepareMessageFromContent(from,{ "orderMessage": { "itemCount": 10, "message": teks, "footerText": name, "thumbnail": fs.readFileSync('pinky.jpg'), "surface": 'CATALOG' }}, {quoted: ftrolii})
             nuy.relayWAMessage(res)
         }
         const grupinv = (teks) => {
        	    grup = nuy.prepareMessageFromContent(from, { "groupInviteMessage": { "groupJid": '6283815956151-1616169743@g.us', "inviteCode": '', "groupName": "𝑋𝑖𝑒 𝐵𝑜𝑡 𝑂𝑓𝑐", "footerText": "𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥", "jpegThumbnail": fs.readFileSync('pinky.jpg'), "caption": teks}}, {quoted: ftrolii})
             nuy.relayWAMessage(grup)
         }
         const ftroli = {key: {fromMe:false, participant:`0@s.whatsapp.net`, ...(from ? {remoteJid :"6283815956151-1604595598@g.us" }: {}) },message:{"orderMessage":{"orderId":"174238614569481","thumbnail": fs.readFileSync('pinky.jpg'),"itemCount":29,"status":"INQUIRY","surface":"CATALOG","message": name,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}}
         
         const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
             buff = await getBuffer('https://i.ibb.co/xM9j6sZ/xieee.jpg')
             imgnya = await nuy.prepareMessage(from, buff, location, {thumbnail: buff})
         const buttonMessages = {
             locationMessage: imgnya.message.locationMessage,
             contentText: text1,
             footerText: desc1,
             buttons: but,
             headerType: 6
         }
         nuy.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options, {quoted: ftroli})
         }
         
         const sendStickerUrl = async(to, url) => {
			console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Downloading sticker'))
			var names = getRandom('.webp')
			var namea = getRandom('.png')
			var download = function (uri, filename, callback) {
				request.head(uri, function (err, res, body) {
				request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
			})
			}
			download(url, namea, async function () {
				let filess = namea
				let xiecanya = names
				require('./lib/exif.js')
				exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${xiecanya}`, (err) => {
				exec(`webpmux -set exif ./temp/data.exif ${xiecanya} -o ${xiecanya}`, async (error) => {
				let media = fs.readFileSync(xiecanya)
				nuy.sendMessage(to, media, sticker, {quoted: caa})
				console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Succes send sticker'))
		   })
			})
			})
			}
         
         const sendFileFromUrl = async(link, type, options) => {
             hasil = await getBuffer(link)
	          nuy.sendMessage(from, hasil, type, options).catch(e => {
	          fetch(link).then((hasil) => {
	          nuy.sendMessage(from, hasil, type, options).catch(e => {
	          nuy.sendMessage(from, { url : link }, type, options).catch(e => {
	          replyca('*Erorr*')
	          console.log(e)
         })
         })
         })
         })
         }
         
         mess = {
				wait: '*Sedang Diproses*',
				success: '*Sukses*',
				error: {
					stick: '*Gagal*',
					Iv: '*Link Invalid*'
				},
				only: {
					group: '*Khusus Group*',
					benned: '*Maaf Nomer Kamu Tidak Bisa Gunakan Xie Bot*',
					ownerG: '*Khusus Owner Group*',
					ownerB: '*Khusus Owner Xie*',
					premium: '*Khusus Premium Xie*',
					userXie: `Hai ${pushname}\nKamu Belum Terdaftar\nSilahkan Klik Dibawah\nAtau Ketik : ${prefix}daftar`,
					admin: '*Khusus Admin Group*',
					Badmin: '*Jadikan Xie Bot Admin Dulu*'
				}
			}
			
			if (itsMe){
         if(chats.toLowerCase() == `${prefix}self`){
         public = false
         replyca(`Success`, `STATUS : 𝑆𝐸𝐿𝐹`)
         }
         if (chats.toLowerCase() == 'status'){
         replyca(`STATUS : ${public ? '𝑃𝑈𝐵𝐿𝐼𝐶' : '𝑆𝐸𝐿𝐹'}`)
         }
         }
         if (!public){
         if (!caa.key.fromMe) return
         }
			
			if (isMuted){
            if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
            if (budy.toLowerCase().startsWith(`${prefix}unmute`)){
                let anu = mutebot.indexOf(from)
                mutebot.splice(anu, 1)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mutebot))
                replyca(`Xie Bot Telah Diunmute, Di Grup Ini`)
            }
         }
			
			let authorname = nuy.contacts[from] != undefined ? nuy.contacts[from].vname || nuy.contacts[from].notify : undefined
         if (authorname != undefined) { } else { authorname = groupName }	
         function addMetadata(packname, author) {	
       	if (!packname) packname = 'FxBot'; if (!author) author = 'Base FxSx FdlX';	
       	author = author.replace(/[^a-zA-Z0-9]/g, '');	
	      let name = `${author}_${packname}`
       	if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
	      const json = {	
		      "sticker-pack-name": packname,
	      	"sticker-pack-publisher": author,
	      }
	      const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	      const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

	      let len = JSON.stringify(json).length	
	      let last	

	      if (len > 256) {	
	        	len = len - 256	
		      bytes.unshift(0x01)	
	      } else {	
	        	bytes.unshift(0x00)	
	      }	

	      if (len < 16) {	
		      last = len.toString(16)	
		      last = "0" + len	
	      } else {	
		      last = len.toString(16)	
	      }	

	      const buf2 = Buffer.from(last, "hex")	
	      const buf3 = Buffer.from(bytes)	
	      const buf4 = Buffer.from(JSON.stringify(json))	

	      const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

	      fs.writeFile(`./${name}.exif`, buffer, (err) => {	
	    	return `./${name}.exif`	
	      })	

         }
 
			const timeXie = moment().tz('Asia/Jakarta').format('HH:mm:ss')
         if(timeXie < "23:59:00"){
         var ucapanWaktu = 'Selamat Malam🌃'
         }
         if(timeXie < "19:00:00"){
         var ucapanWaktu = 'Selamat Petang🌅'
         }
         if(timeXie < "18:00:00"){
         var ucapanWaktu = 'Selamat Sore🌅'
         }
         if(timeXie < "15:00:00"){
         var ucapanWaktu = 'Selamat Siang🏜️'
         }
         if(timeXie < "11:00:00"){
         var ucapanWaktu = 'Selamat Pagi🌄'
         }
         if(timeXie < "05:00:00"){
         var ucapanWaktu = 'Selamat Malam🌆'
         }
         
         //antispam
         if (isCmd && antiSpam.isFiltered(from) && !isGroup) {
         console.log(color('[SPAM]', 'aqua'), color(time, 'blue'), color(`${command} [${args.length}]`), 'from', color(pushname))
         return replyca('Mohon Jangan Spam\nKasih Waktu 6 Detik!')
         }
        
         if (isCmd && antiSpam.isFiltered(from) && isGroup) {
         console.log(color('[SPAM]', 'aqua'), color(time, 'blue'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
         return replyca('Mohon Jangan Spam\nKasih Waktu 6 Detik!')
         }
         
			colors = ['red','white','black','blue','yellow','green', 'aqua']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage' || type === 'audioMessage' || type === 'extendedTextMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
			
	   const checkLimit = (sender) => {
      let found = false
      for (let lmt of _limit) {
        if (lmt.id === sender) {
           limitCounts = limitt - lmt.limit
           found = true
       }
    }
    if (found === false) {
        let obj = { id: sender, limit: 1 }
           _limit.push(obj)
           fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
           nuy.sendMessage(from, limitcount(limitCounts), text, { quoted : ftroli})
        }
     }
     if (isGroup) {
				try {
					const getmemex = groupMembers.length
					    if (getmemex <= memberLimit) {
					    replyca(`Maaf Xie Tidak Bisa Masuk Ke Grup *${groupMetadata.subject}*\n\nMinimal Member Harus *${memberLimit}*`)
					setTimeout( () => {
                            nuy.groupLeave(from)
                            }, 100)
		setTimeout( () => {
		nuy.updatePresence(from, Presence.composing)
					}, 10)
		setTimeout( () => {
		replyca(`Xie Bot Akan Segera Keluar Dari Group *${groupMetadata.subject}*`)
		}, 0)
		}
					
		       } catch (err) { console.error(err)  }
 	 
 
        }
           const isLimit = (sender) =>{
                      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
                let limits = i.limit
              if (limits >= limitt ) {
                  position = true
                    nuy.sendMessage(from, limitend(pushname), text, {quoted: ftroli})
                    return true
              } else {
                _limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
                const obj = { id: sender, limit: 1 }
                _limit.push(obj)
                fs.writeFileSync('./database/limit.json',JSON.stringify(_limit))
           return false
       }
     }
        const limitAdd = (sender) => {
             let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id == sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit += 1
                fs.writeFileSync('./database/limit.json', JSON.stringify(_limit))
            }
        }
      
      // Mode Afk Simpel
      for (let x of mentionUser) {
                if (afk.hasOwnProperty(x.split('@')[0])) {
                    ini_txt = "User Yang Anda Tag/Reply Sedang Afk"
                    if (afk[x.split('@')[0]] != "") {
                        ini_txt += "Dengan alasan" + afk[x.split('@')[0]]
                    }
                    replyca(ini_txt)
                }
            }
      if (afk.hasOwnProperty(sender.split('@')[0])) {
            replyca(`Anda telah keluar dari mode afk\n\nSaat Nya Mulu Yak ${pushname}`)
              delete afk[sender.split('@')[0]]
          fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
      }
		
		if (messagesFaa.includes('assalamualaikum')) {
      nuy.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/waalaikumsalam.mp3')
      nuy.sendMessage(from, loli, MessageType.audio, {quoted: caa, mimetype: 'audio/mp4', ptt:true, duration: 999999})
      }
      if (bad.includes(messagesFaa)) {
      nuy.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/astag.mp3')
      nuy.sendMessage(from, loli, MessageType.audio, {quoted: caa, mimetype: 'audio/mp4', ptt:true, duration: 999999})
      }
		if (bad.includes(messagesFaa)) {
		if (!isGroup) return
		if (!isBadWord) return
		if (isGroupAdmins) return replyca(`Hai Admin *${pushname}*\nKamu Tidak Akan Ke Kick`)
		nuy.updatePresence(from, Presence.composing)
		if (messagesFaa.includes(`${prefix}izinadmin`)) return replyca(`*「 DITERIMA 」*\n\n${prefix}izinadmin`)
		var kic = `${sender.split('@')[0]}@s.whatsapp.net`
		replyca(`*「 BADWORD TERDETEKSI 」*\nMaaf *${pushname}*\nAnda Akan Segera Di Kick Dari Grup\n*${groupMetadata.subject}*`)
		setTimeout( () => {
		nuy.groupRemove(from, [kic]).catch((e)=>{replyca(`*ERR:* ${e}`)})
		}, 100)
		setTimeout( () => {
		nuy.groupRemove(from, [Kick]).catch((e) => {replyca(`*ERROR:* ${e}`)}) 
		}, 10)
		setTimeout( () => {
		replyca(`*Sayonara Beban Grup*`)
		}, 0)
		}
		if (messagesFaa.includes('://chat.whatsapp.com/')){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return replyca(`Hai Admin *${pushname}*\nKamu Tidak Akan Ke Kick`)
		nuy.updatePresence(from, Presence.composing)
		if (messagesFaa.includes(`${prefix}izinadmin`)) return replyca(`*「 DITERIMA 」*\n\n${prefix}izinadmin`)
		var kic = `${sender.split('@')[0]}@s.whatsapp.net`
		replyca(`*「 LINK TERDETEKSI 」*\nMaaf *${pushname}*\nAnda Akan Segera Di Kick Dari Grup\n*${groupMetadata.subject}*`)
		setTimeout( () => {
		nuy.groupRemove(from, [kic]).catch((e)=>{replyca(`*ERR:* ${e}`)})
		}, 100)
		setTimeout( () => {
		nuy.groupRemove(from, [Kick]).catch((e) => {replyca(`*ERROR:* ${e}`)}) 
		}, 10)
		setTimeout( () => {
		replyca(`*Sayonara Beban Grup*`)
		}, 0)
		}

      if (budy.startsWith('>')){
        try {
     	  if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
        return nuy.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: ftroli})
        } catch(err) {
        e = String(err)
        replyca(e)
        }
        }

            if (isCmd && !isGroup) console.log(color('[ CMD ]'), color(time, 'aqua'), color(`${command} [${args.length}]`), 'from', color(pushname))
            if (isCmd && isGroup) console.log(color('[ CMD ]'), color(time, 'aqua'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            
            if (isCmd && !isOwner) antiSpam.addFilter(from)

            switch(command) {
            case 'self':
			      if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
			      public = false
			      return katalog(`「 𝑀𝑂𝐷𝐸 : 𝑆𝐸𝐿𝐹 」`)
			      break
			   case 'public':
			      if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
			      public = true
			      return katalog(`「 𝑀𝑂𝐷𝐸 : 𝑃𝑈𝐵𝐿𝐼𝐶 」`)
			      break
			   case 'status':
			      const status = public ? '𝑃𝑈𝐵𝐿𝐼𝐶': '𝑆𝐸𝐿𝐹'
			      return katalog(`「 𝑆𝑇𝐴𝑇𝑈𝑆 𝐵𝑂𝑇 」\n\n ${status}`)
			      break
            case 'menu':
            case 'help':
               if (isBanned) return katalog(mess.only.benned)
               ucapnya = `Hallo ${pushname}\nSenang Bertemu Dengan Anda Ada Yang Bisa Saya Bantu?\nSilahkan Pilih Di Bawah\n\nYang Belum Daftar Silahkan Klik [Verify User]`
               ppxie = await getBuffer('https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg')
               imgnya = await nuy.prepareMessage(from, ppxie, image, {thumbnail: ppxie})
               gbutsan = [
                 {buttonId: `${prefix}daftarmenu`, buttonText: {displayText: 'Daftar Menu'}, type: 1},
                 {buttonId: `${prefix}rules`, buttonText: {displayText: 'Rules Bot'}, type: 1},
                 {buttonId: `${prefix}daftar`, buttonText: {displayText: 'Verify User'}, type: 1}
               ]
               gbuttonan = {
                 imageMessage: imgnya.message.imageMessage,
                 contentText: `${ucapnya}`,
                 footerText: `Note :\nGunakan Bot Xie Dengan Bijak Jangan Spam!\n\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥`,
                 buttons: gbutsan,
                 headerType: 4
               }
               await nuy.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('pinky.jpg'),caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: ftrolii, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
             	break
            case 'daftarmenu':
               if (isBanned) return katalog(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
               menu = `╭𖧹「 *INFO BOT* 」\n┴𖧹\n${fx} Author: FxSx/FdlX\n${fx} Recode: Pinky\n${fx} Prefix: ${prefix}\n┬𖧹\n╰────────𖧹\n\n╭──𖧹「 *DAFTAR MENU* 」\n┴𖧹\n${fx} ${prefix}aboutmenu\n${fx} ${prefix}grupmenu\n${fx} ${prefix}funmenu\n${fx} ${prefix}downloadmenu\n${fx} ${prefix}animemenu\n${fx} ${prefix}mediamenu\n${fx} ${prefix}audiomenu\n${fx} ${prefix}makermenu\n${fx} ${prefix}ownermenu\n┬𖧹\n╰──────𖧹`
               sendButLocation(from, `${menu}`, "𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥", {jpegThumbnail: fs.readFileSync('pinky.jpg')}, 
               [
                 {buttonId:`${prefix}allmenu`,buttonText:{displayText:'All Cmd'},type:1},

                 {buttonId:`${prefix}info`,buttonText:{displayText:'Info Bot'},type:1},

                 {buttonId:`${prefix}chatlist`,buttonText:{displayText:'Chat List'},type:1}

                 ], {contextInfo: { mentionedJid: [sender]}})
               break
            case 'aboutmenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *ABOUT PINKY* 」
┴𖧹
${fx} ${prefix}report
${fx} ${prefix}info
${fx} ${prefix}donasi
${fx} ${prefix}owner
${fx} ${prefix}speed
${fx} ${prefix}limit
${fx} ${prefix}totaluser
${fx} ${prefix}chatlist
${fx} ${prefix}blocklist
${fx} ${prefix}banlist
${fx} ${prefix}listscmd
${fx} ${prefix}bahasa
${fx} ${prefix}rules
${fx} ${prefix}status
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg`,"thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'grupmenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *MENU GRUP* 」
┴𖧹
${fx} ${prefix}modeanime on/off
${fx} ${prefix}antilink on/off
${fx} ${prefix}antibadword on/off
${fx} ${prefix}welcome on/off
${fx} ${prefix}grup buka/tutup
${fx} ${prefix}nsfw on/off
${fx} ${prefix}ganteng
${fx} ${prefix}cantik
${fx} ${prefix}beban
${fx} ${prefix}opentime
${fx} ${prefix}closetime
${fx} ${prefix}ownergrup
${fx} ${prefix}setpp
${fx} ${prefix}infogrup
${fx} ${prefix}add
${fx} ${prefix}kick
${fx} ${prefix}kicktime
${fx} ${prefix}promote
${fx} ${prefix}demote
${fx} ${prefix}setname
${fx} ${prefix}setdesc
${fx} ${prefix}linkgrup
${fx} ${prefix}resetlinkgroup
${fx} ${prefix}tagme
${fx} ${prefix}hidetag
${fx} ${prefix}tagall
${fx} ${prefix}mentionall
${fx} ${prefix}jadian
${fx} ${prefix}fitnah
${fx} ${prefix}listbadword
${fx} ${prefix}listadmin
${fx} ${prefix}liston
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg`,"thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'funmenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *MENU FUN* 」
┴𖧹
${fx} ${prefix}afk
${fx} ${prefix}testime
${fx} ${prefix}profilme
${fx} ${prefix}hilih
${fx} ${prefix}quotes
${fx} ${prefix}quotesmotivasi
${fx} ${prefix}quotesnasehat
${fx} ${prefix}quotesislami
${fx} ${prefix}darkjokes
${fx} ${prefix}bucin
${fx} ${prefix}pantun
${fx} ${prefix}img
${fx} ${prefix}style
${fx} ${prefix}wallpaper
${fx} ${prefix}katacinta
${fx} ${prefix}spamsms
${fx} ${prefix}hekerbucin
${fx} ${prefix}katailham
${fx} ${prefix}gantengcek
${fx} ${prefix}cantikcek
${fx} ${prefix}artinama
${fx} ${prefix}persengay
${fx} ${prefix}pbucin
${fx} ${prefix}bpfont
${fx} ${prefix}mimpi
${fx} ${prefix}readmore
${fx} ${prefix}tebakgambar
${fx} ${prefix}meme
${fx} ${prefix}anime
${fx} ${prefix}apakah
${fx} ${prefix}kapankah
${fx} ${prefix}bisakah
${fx} ${prefix}rate
${fx} ${prefix}watak
${fx} ${prefix}hobby
${fx} ${prefix}truth
${fx} ${prefix}dare
${fx} ${prefix}triggered
${fx} ${prefix}gay
${fx} ${prefix}sticker
${fx} ${prefix}swm
${fx} ${prefix}takes
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg`,"thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'downloadmenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *DOWNLOAD MENU* 」
┴𖧹
${fx} ${prefix}quranaudio
${fx} ${prefix}quran
${fx} ${prefix}quransurah
${fx} ${prefix}asmaulhusna
${fx} ${prefix}tomp3
${fx} ${prefix}igstalk
${fx} ${prefix}play
${fx} ${prefix}play2
${fx} ${prefix}play3
${fx} ${prefix}ytmp3
${fx} ${prefix}smule
${fx} ${prefix}joox
${fx} ${prefix}tiktok
${fx} ${prefix}tiktokaudio
${fx} ${prefix}toimg
${fx} ${prefix}asupan
${fx} ${prefix}ocr
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg`,"thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'animemenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *MENU ANIME* 」
┴𖧹
${fx} ${prefix}art
${fx} ${prefix}bts
${fx} ${prefix}exo
${fx} ${prefix}elf
${fx} ${prefix}loli
${fx} ${prefix}neko
${fx} ${prefix}waifu2
${fx} ${prefix}waifu3
${fx} ${prefix}shota
${fx} ${prefix}husbu
${fx} ${prefix}sagiri
${fx} ${prefix}shinobu
${fx} ${prefix}megumin
${fx} ${prefix}wallnime
${fx} ${prefix}chiisaihentai
${fx} ${prefix}trap
${fx} ${prefix}blowjob
${fx} ${prefix}yaoi
${fx} ${prefix}ecchi
${fx} ${prefix}hentai
${fx} ${prefix}ahegao
${fx} ${prefix}hololewd
${fx} ${prefix}sideoppai
${fx} ${prefix}animefeets
${fx} ${prefix}animebooty
${fx} ${prefix}animethighss
${fx} ${prefix}hentaiparadise
${fx} ${prefix}animearmpits
${fx} ${prefix}hentaifemdom
${fx} ${prefix}lewdanimegirls
${fx} ${prefix}biganimetiddies
${fx} ${prefix}animebellybutton
${fx} ${prefix}hentai4everyone
${fx} ${prefix}bj
${fx} ${prefix}ero
${fx} ${prefix}cum
${fx} ${prefix}feet
${fx} ${prefix}yuri
${fx} ${prefix}trap
${fx} ${prefix}lewd
${fx} ${prefix}feed
${fx} ${prefix}eron
${fx} ${prefix}solo
${fx} ${prefix}gasm
${fx} ${prefix}poke
${fx} ${prefix}anal
${fx} ${prefix}holo
${fx} ${prefix}tits
${fx} ${prefix}kuni
${fx} ${prefix}kiss
${fx} ${prefix}erok
${fx} ${prefix}smug
${fx} ${prefix}baka
${fx} ${prefix}solog
${fx} ${prefix}feetg
${fx} ${prefix}lewdk
${fx} ${prefix}waifu
${fx} ${prefix}pussy
${fx} ${prefix}femdom
${fx} ${prefix}cuddle
${fx} ${prefix}hentai2
${fx} ${prefix}eroyuri
${fx} ${prefix}cum_jpg
${fx} ${prefix}blowjob2
${fx} ${prefix}erofeet
${fx} ${prefix}holoero
${fx} ${prefix}erofeet
${fx} ${prefix}holoero
${fx} ${prefix}classic
${fx} ${prefix}erokemo
${fx} ${prefix}fox_girl
${fx} ${prefix}futanari
${fx} ${prefix}lewdkemo
${fx} ${prefix}wallpaperrr
${fx} ${prefix}pussy_jpg
${fx} ${prefix}kemonomimi
${fx} ${prefix}nsfw_avatar
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg`,"thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'mediamenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *MEDIA MENU* 」
┴𖧹
${fx} ${prefix}kbbi
${fx} ${prefix}wait
${fx} ${prefix}jadwaltvnow
${fx} ${prefix}brainly
${fx} ${prefix}resepmakanan
${fx} ${prefix}beritahoax
${fx} ${prefix}map
${fx} ${prefix}translate
${fx} ${prefix}infocovid
${fx} ${prefix}infogempa
${fx} ${prefix}infonomor
${fx} ${prefix}apkpure
${fx} ${prefix}jamdunia
${fx} ${prefix}trendtwit
${fx} ${prefix}google
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg`,"thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'audiomenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *MENU AUDIO* 」
┴𖧹
${fx} ${prefix}gemuk
${fx} ${prefix}tupai
${fx} ${prefix}bass
${fx} ${prefix}slow
${fx} ${prefix}fast
${fx} ${prefix}nightcore
${fx} ${prefix}tts
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg`,"thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'makermenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *MAKER MENU* 」
┴𖧹
${fx} ${prefix}darkneon
${fx} ${prefix}candlemug
${fx} ${prefix}lovemsg
${fx} ${prefix}mugflower
${fx} ${prefix}narutobanner
${fx} ${prefix}paperonglass
${fx} ${prefix}romancetext
${fx} ${prefix}shadowtext
${fx} ${prefix}coffeecup
${fx} ${prefix}coffeecup2
${fx} ${prefix}glowingneon
${fx} ${prefix}underwater2
${fx} ${prefix}hpotter
${fx} ${prefix}woodblock
${fx} ${prefix}jokerlogo
${fx} ${prefix}glitchtext
${fx} ${prefix}crosslogo
${fx} ${prefix}naruto
${fx} ${prefix}flowertext
${fx} ${prefix}silktext
${fx} ${prefix}flametext
${fx} ${prefix}glowtext
${fx} ${prefix}skytext
${fx} ${prefix}cslogo
${fx} ${prefix}pixelate
${fx} ${prefix}pixelate2
${fx} ${prefix}lithgtext
${fx} ${prefix}crismes
${fx} ${prefix}bneon
${fx} ${prefix}matrix
${fx} ${prefix}breakwall
${fx} ${prefix}dropwater
${fx} ${prefix}leavest
${fx} ${prefix}darkjokes
${fx} ${prefix}darklogo
${fx} ${prefix}logobp
${fx} ${prefix}goodgirl
${fx} ${prefix}bucinserti
${fx} ${prefix}pacarserti
${fx} ${prefix}fuckgirl
${fx} ${prefix}fuckboy
${fx} ${prefix}goodboy
${fx} ${prefix}badboy
${fx} ${prefix}badgirl
${fx} ${prefix}mlwall
${fx} ${prefix}shadow2
${fx} ${prefix}cup
${fx} ${prefix}cup2
${fx} ${prefix}romance2
${fx} ${prefix}smoke
${fx} ${prefix}burnpaper
${fx} ${prefix}lovemessage
${fx} ${prefix}undergrass
${fx} ${prefix}love
${fx} ${prefix}coffe
${fx} ${prefix}woodheart
${fx} ${prefix}flowerheart
${fx} ${prefix}woodenboard
${fx} ${prefix}summer3d
${fx} ${prefix}wolfmetal
${fx} ${prefix}nature3d
${fx} ${prefix}underwater
${fx} ${prefix}golderrose
${fx} ${prefix}summernature
${fx} ${prefix}letterleaves
${fx} ${prefix}glowingneon
${fx} ${prefix}falleaves
${fx} ${prefix}flamming
${fx} ${prefix}potter
${fx} ${prefix}carvedwood
${fx} ${prefix}wetglass
${fx} ${prefix}multicolor3d
${fx} ${prefix}watercolor
${fx} ${prefix}luxurygold
${fx} ${prefix}galaxywallpaper
${fx} ${prefix}lighttext
${fx} ${prefix}beautifulflower
${fx} ${prefix}puppycute
${fx} ${prefix}royaltext
${fx} ${prefix}heartshaped
${fx} ${prefix}birthdaycake
${fx} ${prefix}galaxystyle
${fx} ${prefix}hologram3d
${fx} ${prefix}greenneon
${fx} ${prefix}glossychrome
${fx} ${prefix}greenbush
${fx} ${prefix}metallogo
${fx} ${prefix}noeltext
${fx} ${prefix}glittergold
${fx} ${prefix}textcake
${fx} ${prefix}starsnight
${fx} ${prefix}wooden3d
${fx} ${prefix}textbyname
${fx} ${prefix}writegalacy
${fx} ${prefix}galaxybat
${fx} ${prefix}snow3d
${fx} ${prefix}birthdayday
${fx} ${prefix}gplybutton
${fx} ${prefix}splybutton
${fx} ${prefix}epep
${fx} ${prefix}blackpink
${fx} ${prefix}neon
${fx} ${prefix}greenneon
${fx} ${prefix}advanceglow
${fx} ${prefix}futureneon
${fx} ${prefix}sandwriting
${fx} ${prefix}sandsummer
${fx} ${prefix}sandengraved
${fx} ${prefix}metaldark
${fx} ${prefix}neonlight
${fx} ${prefix}holographic
${fx} ${prefix}text1917
${fx} ${prefix}minion
${fx} ${prefix}deluxesilver
${fx} ${prefix}newyearcard
${fx} ${prefix}bloodfrosted
${fx} ${prefix}halloween
${fx} ${prefix}fireworksparkle
${fx} ${prefix}natureleaves
${fx} ${prefix}bokeh
${fx} ${prefix}toxic
${fx} ${prefix}strawberry
${fx} ${prefix}box3d
${fx} ${prefix}roadwarning
${fx} ${prefix}breakwall
${fx} ${prefix}icecold
${fx} ${prefix}luxury
${fx} ${prefix}cloud
${fx} ${prefix}summersand
${fx} ${prefix}horrorblood
${fx} ${prefix}thunder2
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg`,"thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'ownermenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
            menuca = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx/FdlX
${fx} Recode: Pinky
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *OWNER MENU* 」
┴𖧹
${fx} ${prefix}public
${fx} ${prefix}self
${fx} ${prefix}mute
${fx} ${prefix}unmute
${fx} ${prefix}addprem
${fx} ${prefix}removeprem
${fx} ${prefix}addbadᴡord
${fx} ${prefix}delbadᴡord
${fx} ${prefix}addbucin
${fx} ${prefix}colong
${fx} ${prefix}setmemlimit
${fx} ${prefix}resetlimit
${fx} ${prefix}setlimit
${fx} ${prefix}setprefix
${fx} ${prefix}setfx
${fx} ${prefix}setwms
${fx} ${prefix}setzeks
${fx} ${prefix}settech
${fx} ${prefix}setlol
${fx} ${prefix}setnamebot
${fx} ${prefix}setppbot
${fx} ${prefix}setffoto
${fx} ${prefix}scmd
${fx} ${prefix}delcmd
${fx} ${prefix}bc
${fx} ${prefix}bcgc
${fx} ${prefix}bcs
${fx} ${prefix}bcgcs
${fx} ${prefix}spamsw
${fx} ${prefix}ban
${fx} ${prefix}unban
${fx} ${prefix}block
${fx} ${prefix}unblock
${fx} ${prefix}clearall
${fx} ${prefix}delete
${fx} ${prefix}clone
${fx} ${prefix}leave
${fx} ${prefix}join
┬𖧹
╰──────𖧹`
               nuy.sendMessage(from, menuca, text, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, quoted: ftroli})
               break
            case 'allmenu':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
               allmenu = `
╭𖧹「 *INFO BOT* 」
┴𖧹
${fx} Author: FxSx & FdlX
${fx} Recode: 𝑋𝑖𝑒
${fx} Prefix: ${prefix}
┬𖧹
╰──────𖧹

╭𖧹「 *ABOUT XIE* 」
┴𖧹
${fx} ${prefix}report
${fx} ${prefix}info
${fx} ${prefix}donasi
${fx} ${prefix}owner
${fx} ${prefix}speed
${fx} ${prefix}limit
${fx} ${prefix}totaluser
${fx} ${prefix}chatlist
${fx} ${prefix}blocklist
${fx} ${prefix}banlist
${fx} ${prefix}listscmd
${fx} ${prefix}bahasa
${fx} ${prefix}rules
${fx} ${prefix}status
┬𖧹
╰──────𖧹

╭𖧹「 *MENU GRUP* 」
┴𖧹
${fx} ${prefix}modeanime on/off
${fx} ${prefix}antilink on/off
${fx} ${prefix}antibadword on/off
${fx} ${prefix}welcome on/off
${fx} ${prefix}grup buka/tutup
${fx} ${prefix}nsfw on/off
${fx} ${prefix}ganteng
${fx} ${prefix}cantik
${fx} ${prefix}beban
${fx} ${prefix}opentime
${fx} ${prefix}closetime
${fx} ${prefix}ownergrup
${fx} ${prefix}setpp
${fx} ${prefix}infogrup
${fx} ${prefix}add
${fx} ${prefix}kick
${fx} ${prefix}kicktime
${fx} ${prefix}promote
${fx} ${prefix}demote
${fx} ${prefix}setname
${fx} ${prefix}setdesc
${fx} ${prefix}linkgrup
${fx} ${prefix}tagme
${fx} ${prefix}hidetag
${fx} ${prefix}tagall
${fx} ${prefix}mentionall
${fx} ${prefix}jadian
${fx} ${prefix}fitnah
${fx} ${prefix}listbadword
${fx} ${prefix}listadmin
${fx} ${prefix}liston
┬𖧹
╰──────𖧹

╭𖧹「 *MENU FUN* 」
┴𖧹
${fx} ${prefix}afk
${fx} ${prefix}testime
${fx} ${prefix}profilme
${fx} ${prefix}hilih
${fx} ${prefix}quotes
${fx} ${prefix}quotesmotivasi
${fx} ${prefix}quotesnasehat
${fx} ${prefix}quotesislami
${fx} ${prefix}darkjokes
${fx} ${prefix}bucin
${fx} ${prefix}pantun
${fx} ${prefix}img
${fx} ${prefix}wallpaper
${fx} ${prefix}katacinta
${fx} ${prefix}spamsms
${fx} ${prefix}hekerbucin
${fx} ${prefix}katailham
${fx} ${prefix}gantengcek
${fx} ${prefix}cantikcek
${fx} ${prefix}artinama
${fx} ${prefix}persengay
${fx} ${prefix}pbucin
${fx} ${prefix}bpfont
${fx} ${prefix}mimpi
${fx} ${prefix}readmore
${fx} ${prefix}tebakgambar
${fx} ${prefix}meme
${fx} ${prefix}anime
${fx} ${prefix}apakah
${fx} ${prefix}kapankah
${fx} ${prefix}bisakah
${fx} ${prefix}rate
${fx} ${prefix}watak
${fx} ${prefix}hobby
${fx} ${prefix}truth
${fx} ${prefix}dare
${fx} ${prefix}triggered
${fx} ${prefix}gay
${fx} ${prefix}sticker
${fx} ${prefix}swm
${fx} ${prefix}takes
┬𖧹
╰──────𖧹

╭𖧹「 *MENU ANIME* 」
┴𖧹
${fx} ${prefix}art
${fx} ${prefix}bts
${fx} ${prefix}exo
${fx} ${prefix}elf
${fx} ${prefix}loli
${fx} ${prefix}neko
${fx} ${prefix}waifu2
${fx} ${prefix}waifu3
${fx} ${prefix}shota
${fx} ${prefix}husbu
${fx} ${prefix}sagiri
${fx} ${prefix}shinobu
${fx} ${prefix}megumin
${fx} ${prefix}wallnime
${fx} ${prefix}chiisaihentai
${fx} ${prefix}trap
${fx} ${prefix}blowjob
${fx} ${prefix}yaoi
${fx} ${prefix}ecchi
${fx} ${prefix}hentai
${fx} ${prefix}ahegao
${fx} ${prefix}hololewd
${fx} ${prefix}sideoppai
${fx} ${prefix}animefeets
${fx} ${prefix}animebooty
${fx} ${prefix}animethighss
${fx} ${prefix}hentaiparadise
${fx} ${prefix}animearmpits
${fx} ${prefix}hentaifemdom
${fx} ${prefix}lewdanimegirls
${fx} ${prefix}biganimetiddies
${fx} ${prefix}animebellybutton
${fx} ${prefix}hentai4everyone
${fx} ${prefix}bj
${fx} ${prefix}ero
${fx} ${prefix}cum
${fx} ${prefix}feet
${fx} ${prefix}yuri
${fx} ${prefix}trap
${fx} ${prefix}lewd
${fx} ${prefix}feed
${fx} ${prefix}eron
${fx} ${prefix}solo
${fx} ${prefix}gasm
${fx} ${prefix}poke
${fx} ${prefix}anal
${fx} ${prefix}holo
${fx} ${prefix}tits
${fx} ${prefix}kuni
${fx} ${prefix}kiss
${fx} ${prefix}erok
${fx} ${prefix}smug
${fx} ${prefix}baka
${fx} ${prefix}solog
${fx} ${prefix}feetg
${fx} ${prefix}lewdk
${fx} ${prefix}waifu
${fx} ${prefix}pussy
${fx} ${prefix}femdom
${fx} ${prefix}cuddle
${fx} ${prefix}hentai2
${fx} ${prefix}eroyuri
${fx} ${prefix}cum_jpg
${fx} ${prefix}blowjob2
${fx} ${prefix}erofeet
${fx} ${prefix}holoero
${fx} ${prefix}erofeet
${fx} ${prefix}holoero
${fx} ${prefix}classic
${fx} ${prefix}erokemo
${fx} ${prefix}fox_girl
${fx} ${prefix}futanari
${fx} ${prefix}lewdkemo
${fx} ${prefix}wallpaperrr
${fx} ${prefix}pussy_jpg
${fx} ${prefix}kemonomimi
${fx} ${prefix}nsfw_avatar
┬𖧹
╰──────𖧹

╭𖧹「 *DOWNLOAD MENU* 」
┴𖧹
${fx} ${prefix}quranaudio
${fx} ${prefix}quran
${fx} ${prefix}quransurah
${fx} ${prefix}asmaulhusna
${fx} ${prefix}tomp3
${fx} ${prefix}igstalk
${fx} ${prefix}play
${fx} ${prefix}play2
${fx} ${prefix}ytmp3
${fx} ${prefix}smule
${fx} ${prefix}joox
${fx} ${prefix}tiktokstalk
${fx} ${prefix}tiktok
${fx} ${prefix}tiktokaudio
${fx} ${prefix}toimg
${fx} ${prefix}asupan
${fx} ${prefix}ocr
┬𖧹
╰──────𖧹

╭𖧹「 *MEDIA MENU* 」
┴𖧹
${fx} ${prefix}kbbi
${fx} ${prefix}wait
${fx} ${prefix}jadwaltvnow
${fx} ${prefix}brainly
${fx} ${prefix}resepmakanan
${fx} ${prefix}beritahoax
${fx} ${prefix}map
${fx} ${prefix}translate
${fx} ${prefix}infocovid
${fx} ${prefix}infogempa
${fx} ${prefix}infonomor
${fx} ${prefix}apkpure
${fx} ${prefix}jamdunia
${fx} ${prefix}trendtwit
${fx} ${prefix}google
┬𖧹
╰──────𖧹

╭𖧹「 *MENU AUDIO* 」
┴𖧹
${fx} ${prefix}gemuk
${fx} ${prefix}tupai
${fx} ${prefix}bass
${fx} ${prefix}slow
${fx} ${prefix}fast
${fx} ${prefix}nightcore
${fx} ${prefix}tts
┬𖧹
╰──────𖧹

╭𖧹「 *MAKER MENU* 」
┴𖧹
${fx} ${prefix}darkneon
${fx} ${prefix}candlemug
${fx} ${prefix}lovemsg
${fx} ${prefix}mugflower
${fx} ${prefix}narutobanner
${fx} ${prefix}paperonglass
${fx} ${prefix}romancetext
${fx} ${prefix}shadowtext
${fx} ${prefix}coffeecup
${fx} ${prefix}coffeecup2
${fx} ${prefix}glowingneon
${fx} ${prefix}underwater2
${fx} ${prefix}hpotter
${fx} ${prefix}woodblock
${fx} ${prefix}jokerlogo
${fx} ${prefix}glitchtext
${fx} ${prefix}crosslogo
${fx} ${prefix}naruto
${fx} ${prefix}flowertext
${fx} ${prefix}silktext
${fx} ${prefix}flametext
${fx} ${prefix}glowtext
${fx} ${prefix}skytext
${fx} ${prefix}cslogo
${fx} ${prefix}pixelate
${fx} ${prefix}pixelate2
${fx} ${prefix}lithgtext
${fx} ${prefix}crismes
${fx} ${prefix}bneon
${fx} ${prefix}matrix
${fx} ${prefix}breakwall
${fx} ${prefix}dropwater
${fx} ${prefix}leavest
${fx} ${prefix}darkjokes
${fx} ${prefix}darklogo
${fx} ${prefix}logobp
${fx} ${prefix}goodgirl
${fx} ${prefix}bucinserti
${fx} ${prefix}pacarserti
${fx} ${prefix}fuckgirl
${fx} ${prefix}fuckboy
${fx} ${prefix}goodboy
${fx} ${prefix}badboy
${fx} ${prefix}badgirl
${fx} ${prefix}mlwall
${fx} ${prefix}shadow2
${fx} ${prefix}cup
${fx} ${prefix}cup2
${fx} ${prefix}romance2
${fx} ${prefix}smoke
${fx} ${prefix}burnpaper
${fx} ${prefix}lovemessage
${fx} ${prefix}undergrass
${fx} ${prefix}love
${fx} ${prefix}coffe
${fx} ${prefix}woodheart
${fx} ${prefix}flowerheart
${fx} ${prefix}woodenboard
${fx} ${prefix}summer3d
${fx} ${prefix}wolfmetal
${fx} ${prefix}nature3d
${fx} ${prefix}underwater
${fx} ${prefix}golderrose
${fx} ${prefix}summernature
${fx} ${prefix}letterleaves
${fx} ${prefix}glowingneon
${fx} ${prefix}falleaves
${fx} ${prefix}flamming
${fx} ${prefix}potter
${fx} ${prefix}carvedwood
${fx} ${prefix}wetglass
${fx} ${prefix}multicolor3d
${fx} ${prefix}watercolor
${fx} ${prefix}luxurygold
${fx} ${prefix}galaxywallpaper
${fx} ${prefix}lighttext
${fx} ${prefix}beautifulflower
${fx} ${prefix}puppycute
${fx} ${prefix}royaltext
${fx} ${prefix}heartshaped
${fx} ${prefix}birthdaycake
${fx} ${prefix}galaxystyle
${fx} ${prefix}hologram3d
${fx} ${prefix}greenneon
${fx} ${prefix}glossychrome
${fx} ${prefix}greenbush
${fx} ${prefix}metallogo
${fx} ${prefix}noeltext
${fx} ${prefix}glittergold
${fx} ${prefix}textcake
${fx} ${prefix}starsnight
${fx} ${prefix}wooden3d
${fx} ${prefix}textbyname
${fx} ${prefix}writegalacy
${fx} ${prefix}galaxybat
${fx} ${prefix}snow3d
${fx} ${prefix}birthdayday
${fx} ${prefix}gplybutton
${fx} ${prefix}splybutton
${fx} ${prefix}epep
${fx} ${prefix}blackpink
${fx} ${prefix}neon
${fx} ${prefix}greenneon
${fx} ${prefix}advanceglow
${fx} ${prefix}futureneon
${fx} ${prefix}sandwriting
${fx} ${prefix}sandsummer
${fx} ${prefix}sandengraved
${fx} ${prefix}metaldark
${fx} ${prefix}neonlight
${fx} ${prefix}holographic
${fx} ${prefix}text1917
${fx} ${prefix}minion
${fx} ${prefix}deluxesilver
${fx} ${prefix}newyearcard
${fx} ${prefix}bloodfrosted
${fx} ${prefix}halloween
${fx} ${prefix}fireworksparkle
${fx} ${prefix}natureleaves
${fx} ${prefix}bokeh
${fx} ${prefix}toxic
${fx} ${prefix}strawberry
${fx} ${prefix}box3d
${fx} ${prefix}roadwarning
${fx} ${prefix}breakwall
${fx} ${prefix}icecold
${fx} ${prefix}luxury
${fx} ${prefix}cloud
${fx} ${prefix}summersand
${fx} ${prefix}horrorblood
${fx} ${prefix}thunder2
┬𖧹
╰──────𖧹

╭𖧹「 *OWNER MENU* 」
┴𖧹
${fx} ${prefix}public
${fx} ${prefix}self
${fx} ${prefix}mute
${fx} ${prefix}unmute
${fx} ${prefix}addprem
${fx} ${prefix}removeprem
${fx} ${prefix}addbadword
${fx} ${prefix}delbadword
${fx} ${prefix}addbucin
${fx} ${prefix}colong
${fx} ${prefix}setmemlimit
${fx} ${prefix}resetlimit
${fx} ${prefix}setlimit
${fx} ${prefix}setprefix
${fx} ${prefix}setfx
${fx} ${prefix}setwms
${fx} ${prefix}setzeks
${fx} ${prefix}settech
${fx} ${prefix}setlol
${fx} ${prefix}setnamebot
${fx} ${prefix}setppbot
${fx} ${prefix}setffoto
${fx} ${prefix}scmd
${fx} ${prefix}delcmd
${fx} ${prefix}bc
${fx} ${prefix}bcgc
${fx} ${prefix}bcs
${fx} ${prefix}bcgcs
${fx} ${prefix}spamsw
${fx} ${prefix}ban
${fx} ${prefix}unban
${fx} ${prefix}block
${fx} ${prefix}unblock
${fx} ${prefix}clearall
${fx} ${prefix}delete
${fx} ${prefix}clone
${fx} ${prefix}leave
${fx} ${prefix}restart
${fx} ${prefix}join
┬𖧹
╰──────𖧹`
                 sendButLocation(from, `${allmenu}`, "\nJika Anda Tidak Puas Sama Fitur Nya\nSilahkan Gunakan Bot Lain!\n\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥", {jpegThumbnail: fs.readFileSync('pinky.jpg')}, 
                 [
                 {buttonId:`${prefix}info`,buttonText:{displayText:'Info Bot'},type:1},

                 {buttonId:`${prefix}speed`,buttonText:{displayText:'Speed Bot'},type:1}

                 ], {contextInfo: { mentionedJid: [sender]}})
                 break
            case 'location':
               if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
               namanya = `𝑋𝑖𝑒 𝐵𝑜𝑡`
               captionnya = `Hallo Owner Fake Location Done`
               nuy.sendMessage(from, {"name": namanya, "address": captionnya, "jpegThumbnail": fs.readFileSync('pinky.jpg')}, location, {quoted: ftrolii, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
               break
            case 'donasi': 
               nuy.sendMessage(from, donasiBot(prefix), MessageType.text, {quoted: ftroli, contextInfo: { forwardingScore: 99999, isForwarded: true}})
               break
            case 'rules':
               nuy.sendMessage(from, rules(name), MessageType.text, {quoted: ftroli, contextInfo: { forwardingScore: 99999, isForwarded: true}})
    	         break
            case 'mute':
			      if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
               if (isMuted) return replyca(`Sudah Dimute`)
               mutebot.push(from)
               fs.writeFileSync('./database/mute.json', JSON.stringify(mutebot))
               replyca(`Xie Bot Telah Dimute, Di Grup Ini`)
               break
            case 'return':
				case '>':
				   if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					return nuy.sendMessage(from, JSON.stringify(eval(body.slice(8))), text, {quoted: ftroli, contextInfo: { forwardingScore: 99999, isForwarded: true}})
					break
            case 'xie1':
               await nuy.toggleDisappearingMessages(from)
               replyca("Jomblo Yak?")
               break
            case 'liston':
            case 'listonline':
            case 'here':                
               if (!isGroup) return grupinv(mess.only.group)
               try {
               let pinky = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
               let online = [...Object.keys(nuy.chats.get(pinky).presences), nuy.user.jid]
               nuy.sendMessage(from, 'List Nyimak:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, { quoted: ftroli, contextInfo: { mentionedJid: online }})
               } catch (e) {
               replyca(`${e}`)
               }
               break
            case 'pale':
               if (isBanned) return replyca(mess.only.benned)
	         	const pale = fs.readFileSync('./mp3/pale.mp3')
               nuy.sendMessage(from, pale, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'berkali':
               if (isBanned) return replyca(mess.only.benned)
	         	const kali = fs.readFileSync('./mp3/berkali.mp3')
               nuy.sendMessage(from, kali, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'sensei':
               if (isBanned) return replyca(mess.only.benned)
	         	const sei = fs.readFileSync('./mp3/sensei.mp3')
               nuy.sendMessage(from, sei, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'gatelsa':
               if (isBanned) return replyca(mess.only.benned)
	         	const tel = fs.readFileSync('./mp3/gatelsa.mp3')
               nuy.sendMessage(from, tel, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'berpalinghati':
               if (isBanned) return replyca(mess.only.benned)
	         	const hati = fs.readFileSync('./mp3/berpalinghati.mp3')
               nuy.sendMessage(from, hati, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'bermainmusik':
               if (isBanned) return replyca(mess.only.benned)
	         	const moshik = fs.readFileSync('./mp3/bermainmusik.mp3')
               nuy.sendMessage(from, moshik, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'jamet':
               if (isBanned) return replyca(mess.only.benned)
	         	const met = fs.readFileSync('./mp3/jamet.mp3')
               nuy.sendMessage(from, met, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'pembohong':
               if (isBanned) return replyca(mess.only.benned)
	         	const pem = fs.readFileSync('./mp3/pembohong.mp3')
               nuy.sendMessage(from, pem, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'pala':
               if (isBanned) return replyca(mess.only.benned)
	         	const pa = fs.readFileSync('./mp3/pala.mp3')
               nuy.sendMessage(from, pa, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'pam':
               if (isBanned) return replyca(mess.only.benned)
	         	const pam = fs.readFileSync('./mp3/pam.mp3')
               nuy.sendMessage(from, pam, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'loplop':
               if (isBanned) return replyca(mess.only.benned)
	         	const lop = fs.readFileSync('./mp3/lop.mp3')
               nuy.sendMessage(from, lop, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'totet':
               if (isBanned) return replyca(mess.only.benned)
	         	const tet = fs.readFileSync('./mp3/totet.mp3')
               nuy.sendMessage(from, tet, MessageType.audio, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `${name}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}, mimetype: 'audio/mp4', ptt:true, duration: 999999})
               break
            case 'sticker':
			   case 'stiker':
				case 'stick':
				case 's':
				   if (isBanned) return replyca(mess.only.benned)   
				   if (!isUser) return replyca(mess.only.userXie)
				   if ((isMedia && !caa.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
						const media = await nuy.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {
									nuy.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: caa, contextInfo: {"forwardingScore":99999,"isForwarded":true},sendEphemeral: true})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && caa.message.videoMessage.seconds < 11 || isQuotedVideo && caa.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
						const media = await nuy.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								replyca(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {
									nuy.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: caa, contextInfo: {"forwardingScore":99999,"isForwarded":true},sendEphemeral: true})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						replyca(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					break
            case 'ambil':
				case 'colong':
					   if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
				   	if (!isUser) return replyca(mess.only.userXie)
				   	if ((isMedia && !caa.message.videoMessage || isQuotedSticker) && args.length == 0) {
						const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
						const media = await nuy.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {
									nuy.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: caa, contextInfo: {"forwardingScore":99999,"isForwarded":true},sendEphemeral: true})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && caa.message.videoMessage.seconds < 11 || isQuotedVideo && caa.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
						const media = await nuy.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								replyca(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {
									nuy.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: caa, contextInfo: {"forwardingScore":99999,"isForwarded":true},sendEphemeral: true})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedSticker) && args[0] == 'nobg') {
						const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
						const media = await nuy.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return replyca('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ranw} -o ${ranw}`, async (error) => {
									nuy.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: caa, contextInfo: {"forwardingScore":99999,"isForwarded":true},sendEphemeral: true})
									fs.unlinkSync(ranw)
								})
							})
						})
					} else {
						replyca(`reply sticker dengan caption ${prefix}colong`)
					}
					break
            case 'swm':
	         case 'stickerwm':
	            if (isBanned) return replyca(mess.only.benned)   
				   if (!isUser) return replyca(mess.only.userXie)
               if (type === 'imageMessage' || isQuotedImage){
               var kls = body.slice(5)
               var pack = kls.split('/')[0]
               var author = kls.split('/')[1]
               const getbuff = isQuotedImage ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
               const dlfile = await nuy.downloadMediaMessage(getbuff)
               const bas64 = `data:image/jpeg;base64,${dlfile.toString('base64')}`
               var mantap = await convertSticker(bas64, `${author}`, `${pack}`)
               var imageBuffer = new Buffer.from(mantap, 'base64');
               nuy.sendMessage(from, imageBuffer, MessageType.sticker, {quoted: caa, contextInfo: {"forwardingScore":99999,"isForwarded":true},sendEphemeral: true})
               } else {
               replyca('Format Salah!')
               }
               break
            case 'takes':
               if (isBanned) return replyca(mess.only.benned)   
				   if (!isUser) return replyca(mess.only.userXie)
               if ((isMedia && !caa.message.videoMessage || isQuotedSticker)) {
               if (args.length == 0) return replyca(`Example: ${prefix + command} Pinky/Bot`)
               const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(caa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : caa
               filePath = await nuy.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
               file_name = getRandom(".webp")
               ini_txt = args.join(" ").split("/")
               request({
               url: `https://api.lolhuman.xyz/api/convert/towebpauthor?apikey=${LolApi}`,
               method: 'POST',
               formData: {
               "img": fs.createReadStream(filePath),
               "package": ini_txt[0],
               "author": ini_txt[1]
               },
               encoding: "binary"
               }, function(error, response, body) {
               fs.unlinkSync(filePath)
               fs.writeFileSync(file_name, body, "binary")
               buff = fs.readFileSync(file_name)
               nuy.sendMessage(from, buff, sticker, {quoted: caa}).then(() => {
               fs.unlinkSync(file_name)
               })
               });
               } else {
               replyca(`Tag sticker yang sudah dikirim`)
               }
               break
            case 'smeme':
               if (isBanned) return replyca(mess.only.benned)   
				   if (!isUser) return replyca(mess.only.userXie)
               top = arg.split('|')[0]
               bottom = arg.split('|')[1]
               var imgbb = require('imgbb-uploader')
               if ((isMedia && !caa.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length > 0) {
               encmedia = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
               media = await nuy.downloadAndSaveMediaMessage(encmedia)
               anu = await imgbb("cedeb44b8d204947a6833ca1412ca77d", media)
               teks = `${anu.display_url}`
               ranp = getRandom('.gif')
               rano = getRandom('.webp')
               anu1 = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${teks}`
               sendStickerUrl(from, `${anu1}`)
               } else {
               replyca('Gunakan foto/stiker!')
               }
               break
            case 'ttp5':
		         red = args.join(" ")
	         	buff = await getBuffer(`https://pecundang.herokuapp.com/api/texttopng?teks=${red}`)
		         nuy.sendMessage(from, buff, sticker, {quoted: caa})
		         break
            case 'attp2':
		         red = args.join(" ")
		         buff = await getBuffer(`https://pecundang.herokuapp.com/api/attp?teks=${red}`)
		         nuy.sendMessage(from, buff, sticker, {quoted: caa})
		         break
            case 'ttp':
            case 'ttp2':
            case 'ttp3':
            case 'ttp4':
            case 'attp':
               if (args.length == 0) return replyca(`Contoh : ${prefix + command} Xie Bot`)
               txt = args.join(" ")
               buffer = await getBuffer(`https://api.lolhuman.xyz/api/${command}?apikey=${LolApi}&text=${txt}`)
               await nuy.sendMessage(from, buffer, sticker, {quoted: caa})
               break
// makermenu
            case 'darkneon':
            case 'candlemug':
            case 'lovemsg':
            case 'mugflower':
            case 'narutobanner':
            case 'paperonglass':
            case 'romancetext':
            case 'shadowtext':
            case 'coffeecup':
            case 'coffeecup2':
            case 'glowingneon':
            case 'underwater2':
            case 'hpotter':
            case 'woodblock':
               if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca('Teksnya Mana Kak?')
               txt = args.join(" ")
               buffer = await getBuffer(`https://videfikri.com/api/textmaker/${command}/?text=${txt}`)
               nuy.sendMessage(from, buffer, image, {caption: 'Nih kak....', quoted: ftroli})
               break
            case 'shadow2':
            case 'cup':
            case 'cup2':
            case 'romance2':
            case 'smoke':
            case 'burnpaper':
            case 'lovemessage':
            case 'undergrass':
            case 'love':
            case 'coffe':
            case 'woodheart':
            case 'flowerheart':
            case 'woodenboard':
            case 'summer3d':
            case 'wolfmetal':
            case 'nature3d':
            case 'underwater':
            case 'golderrose':
            case 'summernature':
            case 'letterleaves':
            case 'glowingneon':
            case 'falleaves':
            case 'flamming':
            case 'potter':
            case 'carvedwood':
               if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca('Teksnya Mana Kak?')
               txt = args.join(" ")
               buffer = await getBuffer(`http://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${LolApi}&text=${txt}`)
               nuy.sendMessage(from, buffer, image, {caption: 'Nih kak...', quoted: ftroli})
               break
            case 'wetglass':
            case 'multicolor3d':
            case 'watercolor':
            case 'luxurygold':
            case 'galaxywallpaper':
            case 'lighttext':
            case 'beautifulflower':
            case 'puppycute':
            case 'royaltext':
            case 'heartshaped':
            case 'birthdaycake':
            case 'galaxystyle':
            case 'hologram3d':
            case 'greenneon':
            case 'glossychrome':
            case 'greenbush':
            case 'metallogo':
            case 'noeltext':
            case 'glittergold':
            case 'textcake':
            case 'starsnight':
            case 'wooden3d':
            case 'textbyname':
            case 'writegalacy':
            case 'galaxybat':
            case 'snow3d':
            case 'birthdayday':
            case 'gplybutton':
            case 'splybutton':
            case 'epep':
               if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca('Teksnya Mana Kak?')
               txt = args.join(" ")
               buffer = await getBuffer(`http://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${LolApi}&text=${txt}`)
               nuy.sendMessage(from, buffer, image, {caption: 'Nih kak...', quoted: ftroli})
               break
            case 'blackpink':
            case 'neon':
            case 'greenneon':
            case 'advanceglow':
            case 'futureneon':
            case 'sandwriting':
            case 'sandsummer':
            case 'sandengraved':
            case 'metaldark':
            case 'neonlight':
            case 'holographic':
            case 'text1917':
            case 'minion':
            case 'deluxesilver':
            case 'newyearcard':
            case 'bloodfrosted':
            case 'halloween':
            case 'jokerlogo':
            case 'fireworksparkle':
            case 'natureleaves':
            case 'bokeh':
            case 'toxic':
            case 'strawberry':
            case 'box3d':
            case 'roadwarning':
            case 'breakwall':
            case 'icecold':
            case 'luxury':
            case 'cloud':
            case 'summersand':
            case 'horrorblood':
            case 'thunder2':
               if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca('Teksnya Mana Kak?')
               txt = args.join(" ")
               buffer = await getBuffer(`http://api.lolhuman.xyz/api/textprome/${command}?apikey=${LolApi}&text=${txt}`)
               nuy.sendMessage(from, buffer, image, {caption: 'Nih kak...', quoted: ftroli})
               break
            case 'fuckboy':
				case 'fuckgirl':
				case 'bucinserti':
				case 'pacarserti':
				case 'goodboy':
				case 'goodgirl':
				case 'badboy':
				case 'badgirl':
				   if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
					if (args.length == 0) return replyca('Teksnya Mana Kak?')
				   txt = args.join(" ")
				   buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/${command}?apikey=${LolApi}&name=${txt}`)
				   nuy.sendMessage(from, buffer, image, {quoted: ftroli, contextInfo: { forwardingScore: 99999, isForwarded: true}})
				   break
// End makermenu
// Anime
            case 'anime':
               if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (!isAnime) return replyca(`Ketik ${prefix}modeanime on [ Khusus Admin ]`)
               if (args.length == 0) return replyca(`Example: ${prefix + command} one piece`)
               query = args.join(" ")
               get_result = await fetchJson(`http://api.lolhuman.xyz/api/anime?apikey=${LolApi}&query=${query}`)
               get_result = get_result.result
               ini_txt = `Id : ${get_result.id}\n`
               ini_txt += `Id MAL : ${get_result.idMal}\n`
               ini_txt += `Title : ${get_result.title.romaji}\n`
               ini_txt += `English : ${get_result.title.english}\n`
               ini_txt += `Native : ${get_result.title.native}\n`
               ini_txt += `Format : ${get_result.format}\n`
               ini_txt += `Episodes : ${get_result.episodes}\n`
               ini_txt += `Duration : ${get_result.duration} mins.\n`
               ini_txt += `Status : ${get_result.status}\n`
               ini_txt += `Season : ${get_result.season}\n`
               ini_txt += `Season Year : ${get_result.seasonYear}\n`
               ini_txt += `Source : ${get_result.source}\n`
               ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
               ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
               ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
               ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
               ini_txt += `Score : ${get_result.averageScore}%\n`
               ini_txt += `Characters : \n`
               ini_character = get_result.characters.nodes
               for (var x of ini_character) {
                    ini_txt += `- ${x.name.full} (${x.name.native})\n`
               }
               ini_txt += `\nDescription : ${get_result.description}`
               thumbnail = await getBuffer(get_result.coverImage.large)
               nuy.sendMessage(from, thumbnail, image, {quoted: caa, caption: ini_txt})
               await limitAdd(sender)
               break
            case 'storyanime':
               if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (!isAnime) return replyca(`Ketik ${prefix}modeanime on [ Khusus Admin ]`)
               anu = await fetchJson(`https://dapuhy-api.herokuapp.com/api/anime/storyanime`)
               buffer= await getBuffer(anu.result)
               nuy.sendMessage(from, buffer, video, {quoted: caa})
               await limitAdd(sender)
               break
            case 'waifu3':
               if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (!isAnime) return replyca(`Ketik ${prefix}modeanime on [ Khusus Admin ]`)
               waifu = await getBuffer(`https://xdev-api.herokuapp.com/waifu`)
               imgnya = await nuy.prepareMessage(from, waifu, image, {thumbnail: waifu})
               ucapnya = `Silahkan Klik Dibawah Jika Mau Waifu Lagi!`
               gbutsan = [
                 {buttonId: `${prefix}waifu4`, buttonText: {displayText: 'Minta Lagi'}, type: 1}
               ]
               gbuttonan = {
                 imageMessage: imgnya.message.imageMessage,
                 contentText: `${ucapnya}`,
                 footerText: `        𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥`,
                 buttons: gbutsan,
                 headerType: 4
               }
               await nuy.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('pinky.jpg'),caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: caa})
               await limitAdd(sender)
               break
            case 'waifu4':
               if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (!isAnime) return replyca(`Ketik ${prefix}modeanime on [ Khusus Admin ]`)
               waifu = await getBuffer(`https://xdev-api.herokuapp.com/waifu`)
               imgnya = await nuy.prepareMessage(from, waifu, image, {thumbnail: waifu})
               ucapnya = `Silahkan Klik Dibawah Jika Mau Waifu Lagi!`
               gbutsan = [
                 {buttonId: `${prefix}waifu3`, buttonText: {displayText: 'Minta Lagi'}, type: 1}
               ]
               gbuttonan = {
                 imageMessage: imgnya.message.imageMessage,
                 contentText: `${ucapnya}`,
                 footerText: `        𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥`,
                 buttons: gbutsan,
                 headerType: 4
               }
               await nuy.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('pinky.jpg'),caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: caa})
               await limitAdd(sender)
               break
            case 'art':
            case 'bts':
            case 'exo':
            case 'elf':
            case 'loli':
            case 'neko':
            case 'waifu2':
            case 'shota':
            case 'husbu':
            case 'sagiri':
            case 'shinobu':
            case 'megumin':
            case 'wallnime':
               if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (!isAnime) return replyca(`Ketik ${prefix}modeanime on [ Khusus Admin ]`)
               buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/${command}?apikey=${LolApi}`)
               ucapnya = `Hallo ${pushname}\nJika Anda Ingin Lagi Silahkan Klik Dibawah`
               imgnya = await nuy.prepareMessage(from, buffer, image, {thumbnail: buffer})
               gbutsan = [
                 {buttonId: `${prefix}${command}`, buttonText: {displayText: `${command}`}, type: 1},
                 {buttonId: `${prefix}rules`, buttonText: {displayText: 'Rules Bot'}, type: 1}
               ]
               gbuttonan = {
                 imageMessage: imgnya.message.imageMessage,
                 contentText: `${ucapnya}`,
                 footerText: `𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥`,
                 buttons: gbutsan,
                 headerType: 4
               }
               await nuy.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('pinky.jpg'),caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: ftrolii})
               await limitAdd(sender)
               break
            case 'chiisaihentai':
            case 'trap':
            case 'blowjob':
            case 'yaoi':
            case 'ecchi':
            case 'hentai':
            case 'ahegao':
            case 'hololewd':
            case 'sideoppai':
            case 'animefeets':
            case 'animebooty':
            case 'animethighss':
            case 'hentaiparadise':
            case 'animearmpits':
            case 'hentaifemdom':
            case 'lewdanimegirls':
            case 'biganimetiddies':
            case 'animebellybutton':
            case 'hentai4everyone':
               if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (!isAnime) return replyca(`Ketik ${prefix}modeanime on [ Khusus Admin ]`)
               buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${LolApi}`)
               nuy.sendMessage(from, buffer, image, {quoted: caa})
               await limitAdd(sender)
               break
            case 'bj':
            case 'ero':
            case 'cum':
            case 'feet':
            case 'yuri':
            case 'trap':
            case 'lewd':
            case 'feed':
            case 'eron':
            case 'solo':
            case 'gasm':
            case 'poke':
            case 'anal':
            case 'holo':
            case 'tits':
            case 'kuni':
            case 'kiss':
            case 'erok':
            case 'smug':
            case 'baka':
            case 'solog':
            case 'feetg':
            case 'lewdk':
            case 'waifu':
            case 'pussy':
            case 'femdom':
            case 'cuddle':
            case 'hentai2':
            case 'eroyuri':
            case 'cum_jpg':
            case 'blowjob2':
            case 'erofeet':
            case 'holoero':
            case 'classic':
            case 'erokemo':
            case 'fox_girl':
            case 'futanari':
            case 'lewdkemo':
            case 'wallpaperrr':
            case 'pussy_jpg':
            case 'kemonomimi':
            case 'nsfw_avatar':
               if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (!isAnime) return replyca(`Ketik ${prefix}modeanime on [ Khusus Admin ]`)
               buffer = await getBuffer(`http://api.lolhuman.xyz/api/random2/${command}?apikey=${LolApi}`)
               nuy.sendMessage(from, buffer, image, {quoted: caa})
               break
// End Anime
// last
            case 'randomquran':
            case 'quranaudio':
				   if (isBanned) return replyca(mess.only.benned)   
			  	   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
				   anu = await fetchJson(`https://api.zeks.xyz/api/randomquran`, {method: 'get'})
					faktaaa = `*Nama* : *${anu.result.nama}*\n*Arti* : *${anu.result.arti}*\n*Nomor* : *${anu.result.nomor}*\n*Tipe* : *${anu.result.type}*\n*Ayat* : *${anu.result.ayat}*\n*Isi* : *${anu.result.keterangan}*`
					quu = await getBuffer(anu.result.audio)
					nuy.sendMessage(from, faktaaa, text, {quoted: caa})
					nuy.sendMessage(from, quu, audio, {mimetype: 'audio/mp4', filename: `${anu.result.nama}.mp3`, quoted: caa})
					await limitAdd(sender) 
					break
			   case 'toimg':
			      if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
					if (!isQuotedSticker) return replyca('Reply stickernya kak')
					encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await nuy.downloadAndSaveMediaMessage(encmedia)
					ran= getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return replyca(' Gagal, pada saat mengkonversi sticker ke gambar ')
					buffer = fs.readFileSync(ran)
					nuy.sendMessage(from, buffer, image, {quoted: caa})
					fs.unlinkSync(ran)
					})
					await limitAdd(sender) 
					break
				case 'apkpure':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
				   data = await fetchJson(`https://api.zeks.xyz/api/apkpure?q=${body.slice(9)}&apikey=${ZeksApi}`, {method: 'get'})
			   	teks = '=================\n'
			   	for (let i of data.result) {
					teks += `*Nama APK* : ${i.title}\n*Link* : ${i.url}\n*Rating* : ${i.rating}\n=================\n`
					}
				   replyca(teks.trim())
			   	await limitAdd(sender)
				   break
            case 'img':
               if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (args.length == 0) return replyca(`Example: ${prefix + command} Bunga`)
               query = args.join(" ")
               ini_url = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${LolApi}&query=${query}`)
               ini_url = ini_url.result
               ini_buffer = await getBuffer(ini_url)
               await nuy.sendMessage(from, ini_buffer, image, {quoted: caa})
               await limitAdd(sender)
               break
            case 'wallpaper':
               if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
               if (isLimit(sender)) return replyca(limitend(pushname))
               if (args.length == 0) return replyca(`Example: ${prefix + command} Bunga`)
               query = args.join(" ")
               get_result = await fetchJson(`https://api.lolhuman.xyz/api/wallpaper?apikey=${LolApi}&query=${query}`)
               buffer = await getBuffer(get_result.result)
               nuy.sendMessage(from, buffer, image, {quoted: caa})
               await limitAdd(sender)
               break
            case 'triggered':
					if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
               if (isLimit(sender)) return replyca(limitend(pushname))
               var imgbb = require('imgbb-uploader')
               if ((isMedia && !caa.message.videoMessage || isQuotedImage) && args.length == 0) {
               encmedia = isQuotedImage ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
               media = await nuy.downloadAndSaveMediaMessage(encmedia)
               anu = await imgbb("cedeb44b8d204947a6833ca1412ca77d", media)
               teks = `${anu.display_url}`
               ranp = getRandom('.gif')
               rano = getRandom('.webp')
               anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
               exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
               fs.unlinkSync(ranp)
               if (err) return replyca(mess.error.stick)
               nobg = fs.readFileSync(rano)
               nuy.sendMessage(from, nobg, sticker, {quoted: caa})
               fs.unlinkSync(rano)
               })
               } else {
               replyca('Gunakan foto!')
               }
               await limitAdd(sender)
               break
            case 'gay':
               if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
               if (isLimit(sender)) return replyca(limitend(pushname))
               var imgbb = require('imgbb-uploader')
               if ((isMedia && !caa.message.videoMessage || isQuotedImage) && args.length == 0) {
               encmedia = isQuotedImage ? JSON.parse(JSON.stringify(caa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: caa
               media = await nuy.downloadAndSaveMediaMessage(encmedia)
               anu = await imgbb("cedeb44b8d204947a6833ca1412ca77d", media)
               teks = `${anu.display_url}`
               ranp = getRandom('.gif')
               rano = getRandom('.webp')
               anu1 = `https://some-random-api.ml/canvas/gay?avatar=${teks}`
               exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
               fs.unlinkSync(ranp)
               if (err) return replyca(mess.error.stick)
               buffer = fs.readFileSync(rano)
               nuy.sendMessage(from, buffer, sticker, {quoted: caa})
               fs.unlinkSync(rano)
               })
               } else {
               replyca('Gunakan foto!')
               }
               await limitAdd(sender)
               break
			   case 'jadian':
					if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
					jds = []
					const jdii = groupMembers
					const koss = groupMembers
					const akuu = jdii[Math.floor(Math.random() * jdii.length)]
					const diaa = koss[Math.floor(Math.random() * koss.length)]
					teks = `@${akuu.jid.split('@')[0]} ❤️ @${diaa.jid.split('@')[0]} `
					jds.push(akuu.jid)
					jds.push(diaa.jid)
					mentions(teks, jds, true)
					break	
				case 'cantik':
					if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
					membr = []
					const mes = groupMembers
					const msk = groupMembers
					const siaps = mes[Math.floor(Math.random() * mes.length)]
					const sips = pushname[Math.floor(Math.random() * msk.length)]
					teks = `*Yang Paling Cantik Disini Adalah :* @${siaps.jid.split('@')[0]}`
					membr.push(siaps.jid)
					mentions(teks, membr, true)
					break
            case 'nightcore':
	            if (!isQuotedAudio) return replyca('Reply Audionya Kak')
					encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await nuy.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
				   exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
					fs.unlinkSync(media)
				   if (err) return replyca('Error!')
				   buff = fs.readFileSync(ran)
					nuy.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', ptt: false, quoted: caa})
			      fs.unlinkSync(ran)
					})
				   break
				case 'slow':
				   encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await nuy.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
					fs.unlinkSync(media)
					if (err) return replyca('Error!')
					buffer = fs.readFileSync(ran)
					nuy.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', ptt:true, quoted: caa})
					fs.unlinkSync(ran)
					})
				   break
				case 'gemuk':
					encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await nuy.downloadAndSaveMediaMessage(encmedia)
				   ran = getRandom('.mp3')
				   exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
					fs.unlinkSync(media)
					if (err) return replyca('Error!')
					buffer = fs.readFileSync(ran)
					nuy.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', ptt:true, quoted: caa})
					fs.unlinkSync(ran)
					})
				   break
            case 'tupai':
					encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await nuy.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
					fs.unlinkSync(media)
					if (err) return replyca('Error!')
					buffer = fs.readFileSync(ran)
					nuy.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', ptt:true, quoted: caa})
					fs.unlinkSync(ran)
					})
				   break
				case 'fast':
               if (isBanned) return replyca(mess.only.benned)
			      if (!isUser) return replyca(mess.only.userXie)
				   encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				   media = await nuy.downloadAndSaveMediaMessage(encmedia)
				   ran = getRandom('.mp3')
				   exec(`ffmpeg -i ${media} -filter:a "atempo=1.63,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
				   fs.unlinkSync(media)
				   if (err) return replyca('Error!')
				   buffer = fs.readFileSync(ran)
				   nuy.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', ptt:true, quoted: caa})
				   fs.unlinkSync(ran)
				   })
				   break
				case 'ganteng':
					if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
					membr = []
					const nus = groupMembers
					const msl = groupMembers
					const siapss = nus[Math.floor(Math.random() * nus.length)]
					const sipss = pushname[Math.floor(Math.random() * msl.length)]
					teks = `*Yang Paling Ganteng Disini Adalah :* @${siapss.jid.split('@')[0]}`
					membr.push(siapss.jid)
					mentions(teks, membr, true)
					break
				case 'beban':
					if (isBanned) return replyca(mess.only.benned)   
					if (!isUser) return replyca(mess.only.userXie)
					membr = []
					const punya = groupMembers
					const xie = groupMembers
					const uwu = punya[Math.floor(Math.random() * punya.length)]
					const an = pushname[Math.floor(Math.random() * xie.length)]
					teks = `*Yang Paling Beban Disini Adalah :* @${uwu.jid.split('@')[0]}`
					membr.push(uwu.jid)
					mentions(teks, membr, true)
					break
            case 'style':
				   if(!jri) return replyca('Masukkan teks')
			      axios.get(`https://kocakz.herokuapp.com/api/random/text/fancytext?text=${body.slice(7)}`).then((res) => {
               let hasil = `*Hasil* :\n${res.data.result}`;
               nuy.sendMessage(from, hasil, MessageType.text, {quoted: ftroli})
               })
			      break
				case 'brainly':
					if (!isUser) return replyca(mess.only.userXie)	
					if (isBanned) return replyca(mess.only.benned)
					if (isLimit(sender)) return replyca(limitend(pushname))
               brien = body.slice(9)
					brainly(`${brien}`).then(res => {
					teks = '───────────────────────\n'
					for (let Y of res.data) {
					teks += `\n*「 Brainly 」*\n\n*➸ Pertanyaan*\n ${Y.pertanyaan}\n\n*➸ Jawaban*\n ${Y.jawaban[0].text}\n────────────────────\n`
					}
					nuy.sendMessage(from, teks, text, {quoted: caa, detectLinks: false})
               console.log(res)
               })
               await limitAdd(sender)
				   break 
				case 'spamsms':
				   if (!isUser) return replyca(mess.only.userXie)	
					if (isBanned) return replyca(mess.only.benned)
					if (isLimit(sender)) return replyca(limitend(pushname))
               if (args.length == 0) return replyca(`Example: ${prefix + command} 0838xxxxxxxx`)
               nomor = args[0]
               await fetchJson(`https://api.lolhuman.xyz/api/sms/spam1?apikey=${LolApi}&nomor=${nomor}`)
               await fetchJson(`https://api.lolhuman.xyz/api/sms/spam2?apikey=${LolApi}&nomor=${nomor}`)
               await fetchJson(`https://api.lolhuman.xyz/api/sms/spam3?apikey=${LolApi}&nomor=${nomor}`)
               await fetchJson(`https://api.lolhuman.xyz/api/sms/spam4?apikey=${LolApi}&nomor=${nomor}`)
               await fetchJson(`https://api.lolhuman.xyz/api/sms/spam5?apikey=${LolApi}&nomor=${nomor}`)
               await fetchJson(`https://api.lolhuman.xyz/api/sms/spam6?apikey=${LolApi}&nomor=${nomor}`)
               await fetchJson(`https://api.lolhuman.xyz/api/sms/spam7?apikey=${LolApi}&nomor=${nomor}`)
               await fetchJson(`https://api.lolhuman.xyz/api/sms/spam8?apikey=${LolApi}&nomor=${nomor}`)
               replyca("Success")
               await limitAdd(sender)
               break
				 case 'daftar':
					nuy.updatePresence(from, Presence.composing)
					if (isUser) return replyca('*Kamu Sudah Jadi User Pinky*')
					if (isBanned) return replyca(mess.only.benned)
					user.push(sender)
					fs.writeFileSync('./database/user.json', JSON.stringify(user))
					try {
					ppimg = await nuy.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
					captionnya = `╭─𖧹「 *PENDAFTARAN* 」\n┴𖧹\n${fx} Pada ${date} ${time}\n${fx} Nama : ${pushname}\n${fx} Nomer : wa.me/${sender.split('@')[0]}\n${fx} Total User : ${user.length} Orang\n┬𖧹\n╰───────𖧹`
               daftarimg = await getBuffer(ppimg)
					imgnya = await nuy.prepareMessage(from, daftarimg, image, {thumbnail: daftarimg})
					gbutsan = [
                 {buttonId: `${prefix}daftarmenu`, buttonText: {displayText: '𝐷𝐴𝐹𝑇𝐴𝑅 𝑀𝐸𝑁𝑈'}, type: 1},
                 {buttonId: `${prefix}rules`, buttonText: {displayText: '𝑅𝑈𝐿𝐸𝑆 𝐵𝑂𝑇'}, type: 1}
               ]
               gbuttonan = {
                 imageMessage: imgnya.message.imageMessage,
                 contentText: `${captionnya}`,
                 footerText: `Note :\nGunakan Bot Xie Dengan Bijak Jangan Spam!\n\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥`,
                 buttons: gbutsan,
                 headerType: 4
               }
               await nuy.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('pinky.jpg'),caption: captionnya,"contextInfo": {mentionedJid: [sender]}, quoted: ftrolii, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}\nSukses Daftar`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": "https://wa.me/c/994409919080"}}})
             	break
            case 'profile':
    				nuy.updatePresence(from, Presence.composing)
					if (!isUser) return replyca(mess.only.userXie)
					if (isBanned) return replyca(mess.only.benned)
    				try {
					profil = await nuy.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
					profil = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
					profile = `╭─「 *PROFILE ANDA* 」\n│• *Nama:* ${pushname}\n│• *User Terdaftar:* √\n│• *Nomer:* wa.me/${sender.split('@')[0]}\n╰────────────────`
					buff = await getBuffer(profil)
					nuy.sendMessage(from, buff, image, {quoted: ftroli, contextInfo: { forwardingScore: 99999, isForwarded: true}, caption: profile})
					break
				case 'bahasa':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   nuy.sendMessage(from, bahasa(prefix), text, {quoted: caa})
				   break
            case 'info':
            case 'infobot':
               me = nuy.user
					user.push(sender)
					uptime = process.uptime()
               if (isBanned) return replyca(mess.only.benned)
               textnya =`「 INFO XIE BOT 」\n\n${fx} Nama Bot : ${me.name}\n${fx} Owner Bot : Privat!\n${fx} Prefix : | ${prefix} |\n${fx} Total Block : ${blocked.length}\n${fx} Aktif Sejak : ${kyun(uptime)}\n${fx} Total User : ${user.length}`
               buttons = [
                 {buttonId: `${prefix}rules`, buttonText: {displayText: 'Rules Bot'}, type: 1},
                 {buttonId: `${prefix}status`, buttonText: {displayText: 'Status Bot'}, type: 1}
               ]
               buttonsMessage = {
               contentText: `${textnya}`,
               footerText: '𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥',
               buttons: buttons,
               headerType: 1
               }
               prep = await nuy.prepareMessageFromContent(from,{buttonsMessage},{quoted: ftroli})
               nuy.relayWAMessage(prep)
               break
				case 'totaluser':
					nuy.updatePresence(from, Presence.composing) 	
					if (!isUser) return replyca(mess.only.userXie)
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)    
					teks = `╭────「 *TOTAL USER ${name}* 」\n`
					no = 0
					for (let hehehe of user) {
						no += 1
						teks += `[${no.toString()}] @${hehehe.split('@')[0]}\n`
					}
					teks += `│+ Total Pengguna : ${user.length}\n╰──────⎿ *${name}* ⏋────`
					nuy.sendMessage(from, teks.trim(), extendedText, {quoted: caa, contextInfo: {"mentionedJid": user}, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
					break
            case 'chatlist':
		      case 'cekchat':
		         if (isBanned) return replyca(mess.only.benned)  
				   if (!isUser) return replyca(mess.only.userXie)
			     	teks = `Total : ${totalchat.length}`
			    	sendFakeToko(teks)
		    		break
	    	   case 'blocklist':
					teks = 'List Block :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					nuy.sendMessage(from, teks.trim(), extendedText, {quoted: caa, contextInfo: {"mentionedJid": blocked}, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
					break 
			   case 'banlist':
				   ben = '```List Banned``` :\n'
					for (let banned of ban) {
						ben += `~> @${banned.split('@')[0]}\n`
					}
					ben += `Total : ${ban.length}`
					nuy.sendMessage(from, ben.trim(), extendedText, {quoted: caa, contextInfo: {"mentionedJid": ban}, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
					break
				case 'ban':
					nuy.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					mentioned = caa.message.extendedTextMessage.contextInfo.mentionedJid
			      ban = mentioned
					replyca(`berhasil banned : ${ban}`)
					break
				case 'addprem':
					nuy.updatePresence(from, Presence.composing)
					if (args.length < 1) return
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					addpremium = caa.message.extendedTextMessage.contextInfo.mentionedJid
					premium = addpremium
					replyca(`*Berhasil Menambahkan ${premium} Ke database User Premium*`)
					break
				case 'removeprem':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					rprem = body.slice(13)
					premium.splice(`${rprem}@s.whatsapp.net`, 1)
					replyca(`Berhasil Remove wa.me/${rprem} Dari User Premium`)
					break
					case 'unban':
					if (!isOwner)return replyca(mess.only.ownerB)
					bnnd = body.slice(8)
					ban.splice(`${bnnd}@s.whatsapp.net`, 1)
					replyca(`Nomor wa.me/${bnnd} telah di unban!`)
					break
				case 'block':
				   nuy.updatePresence(from, Presence.composing) 
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					nuy.blockUser (`${body.slice(7)}@c.us`, "add")
					replyca(`perintah Diterima, memblokir ${body.slice(7)}@c.us`)
					break
				case 'unblock':
               if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
				   nuy.blockUser (`${body.slice(9)}@c.us`, "remove")
					replyca(`perintah Diterima, membuka blokir ${body.slice(9)}@c.us`)
				   break 
				case 'readmore':
					if (isBanned) return replyca(mess.only.benned)    
					if (!isUser) return replyca(mess.only.userXie)
					if (args.length < 1) return replyca('Textnya Mana?')
					var kls = body.slice(9)
					var has = kls.split("/")[0];
					var kas = kls.split("/")[1];
					if (args.length < 1) return replyca(mess.blank)
					nuy.sendMessage(from, `${has}‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎${kas}` , text, { quoted: caa })
					break
				case 'resetlimit':
				   if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
				   var obj = []
				   fs.writeFileSync('./database/limit.json', JSON.stringify(obj))
				   await replyca(`LIMIT BERHASIL DI RESET`)
				   break
			   case 'limit':
				   var found = false
               const limidat = JSON.parse(fs.readFileSync('./database/limit.json'))
               for (let lmt of limidat) {
               if (lmt.id === sender) {
               let limitCounts = limitt - lmt.limit
               if (limitCounts <= 0) return replyca(from,`Limit anda habis`, id)
               await replyca(`*LIMIT ANDA TINGGAL: ${limitCounts}*`)
               found = true
               }
               }
               if (found === false) {
               let obj = { id : sender, limit : 1 }
               limit.push(obj);
               fs.writeFileSync('./database/limit.json', JSON.stringify(limit, 1));
               await replyca(`LIMIT ANDA ${limitCounts}`)
               }
					break
				case 'ocr':
				   if (isBanned) return replyca(mess.only.benned)  
				   if (!isUser) return replyca(mess.only.userXie)
					if ((isMedia && !caa.message.videoMessage || isQuotedImage) && args.length == 0) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
					const media = await nuy.downloadAndSaveMediaMessage(encmedia)
					replyca(mess.wait)
					await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
					.then(teks => {
					replyca(teks.trim())
					fs.unlinkSync(media)
					})
					.catch(err => {
					replyca(err.message)
					fs.unlinkSync(media)
					})
					} else {
					replyca('Foto aja gan Jangan Video')
					}
					break
            case 'owner':
               if (isBanned) return replyca(mess.only.benned)  
				   if (!isUser) return replyca(mess.only.userXie)
               nuy.sendMessage(from, {displayName: "Privat!", contacts: [{displayName: "Owner", vcard: vcard}]}, MessageType.contact, {quoted: ftrolii, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}\n${name}`,"body": ``,"previewType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
               break
            case 'escebot':
               replyca('Silahkan Hubungi Owner\nJika Menginginkan Scpirt Bot Xie')
               break
            case 'fitnah':
               if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (args.length < 1) return replyca(`Usage :\n${prefix}fitnah [@tag/pesan/balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember/hai/hai juga`)
				   var gh = body.slice(8)
				   mentioned = caa.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("/")[0];
					var target = gh.split("/")[1];
					var bot = gh.split("/")[2];
					nuy.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
					break
				case 'infogc':
				case 'groupinfo':
				case 'infogrup':
				case 'grupinfo':
				   if (isBanned) return replyca(mess.only.benned)  
				   if (!isUser) return replyca(mess.only.userXie)
               nuy.updatePresence(from, Presence.composing)
               if (!isGroup) return grupinv(mess.only.group)
               try {
					ppUrl = await nuy.getProfilePicture(from)
					} catch {
					ppUrl = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
			      buffer = await getBuffer(ppUrl)
		         captionnya = `*NAME* : ${groupName}\n*MEMBER* : ${groupMembers.length}\n*ADMIN* : ${groupAdmins.length}\n*DESK* : ${groupDesc}`
               imgnya = await nuy.prepareMessage(from, buffer, image, {thumbnail: buffer})
					gbutsan = [
                 {buttonId: `${prefix}ownergrup`, buttonText: {displayText: 'Pemilik Group'}, type: 1}
               ]
               gbuttonan = {
                 imageMessage: imgnya.message.imageMessage,
                 contentText: `${captionnya}`,
                 footerText: `Note :\nGunakan Bot Xie Dengan Bijak Jangan Spam!\n\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥`,
                 buttons: gbutsan,
                 headerType: 4
               }
               await nuy.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('pinky.jpg'),caption: captionnya,"contextInfo": {mentionedJid: [sender]}, quoted: ftrolii, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}\nSukses Daftar`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
             	break
				case 'trendtwit':
					nuy.updatePresence(from, Presence.composing) 
               if (!isUser) return replyca(mess.only.userXie)
               if (isLimit(sender)) return replyca(limitend(pushname))
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/trendingtwitter`, {method: 'get'})
					replyca(mess.wait)
					teks = '=================\n'
					for (let i of data.result) {
					teks += `*Hastag* : ${i.hastag}\n*link* : ${i.link}\n*rank* : ${i.rank}\n*Tweet* : ${i.tweet}\n=================\n`
					}
					replyca(teks.trim())
					await limitAdd(sender) 
					break 
				case 'testime':
					setTimeout( () => {
					nuy.sendMessage(from, 'Waktu habis:v', text, {quoted: caa})
					}, 10000)
					setTimeout( () => {
					nuy.sendMessage(from, '5 Detik lagi', text, {quoted: caa})
					}, 5000)
					setTimeout( () => {
					nuy.sendMessage(from, '10 Detik lagi', text, {quoted: caa})
					}, 0)
					break
				case 'linkgroup':
				case 'linkgrup':
				case 'linkgc':
				case 'gruplink':
				case 'grouplink':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (!isGroup) return grupinv(mess.only.group)
				   if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
				   linkgc = await nuy.groupInviteCode (from)
				   yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				   nuy.sendMessage(from, yeh, text, {quoted: ftroli})
			      break
            case 'resetlinkgc':
            case 'resetlinkgroup':
            case 'revoke':
               if (!isGroup) return grupinv(mess.only.group)
				   if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
               if (!isGroupAdmins) return replyca(mess.only.admin)
               json = ['action', 'inviteReset', from]
               nuy.query({json, expect200: true})
               replyca('Sukses Riset Link Grup')
               break
				case 'hidetag':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
					var value = body.slice(9)
					var group = await nuy.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: caa
					}
					nuy.sendMessage(from, options, text)
					break
            case 'quotesmotivasi':
               if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userB)
					const motiv =['Nilai sebuah tindakan terletak dalam usaha menyelesaikan sampai tuntas','Kebaikan adalah seorang yang matanya penuh perhatian, serta tangannya yang penuh manfaat','Hiduplah seperti kamu akan mati besok, dan berbahagialah seperti kamu akan hidup selamanya','Kita tidak usah saling menyalahkan, agar dimasa depan tak ada yang menuntut akan kesalahan','Ketika semua hal tidak sejalan dengan anda, ingatlah bahwa sebuah pesawat terbang melawan angin, bukan dengan mengikuti angin','Belajarlah menikmati apa yang kamu miliki, itu akan membuat hidupmu lebih bernilai','Selalu ada kegelapan yang tergelap sebelum terbitnya fajar','Sahabat itu seperti bintang, tak selalu Nampak tetapi selalu ada dihati','Sibuk bukanlah jaminan karir karena hasil jauh lebih didengar orang','semua kemajuan tidak akan ada tanpa kesalahan, kesalahan adalah bagian dari kemajuan selama diakui dan diperbaiki','Sukses meninggalkan jejak, gagal meninggalkan pelajaran, diam meninggalkan penyesalan','Keraguan bersahabat dekat dengan kegagalan','uang tidak merusak seseorang, keserakahan lah yang merusak manusia','Kepercayaan tidak bisa dibeli, tapi kepercayaan bisa dipelihara','Impian, target, kemauan dan tujuan semuanya sia-sia tanpa tindakan','usia bisa berbohong tapi kedewasaan tidak','Ada yang lebih berharga dari uang dan emas yaitu waktu','Tidak ada yang gagal mereka hanya berhenti terlalu cepat','Terasa sakit selalu hampir tidak ada rasanya setelah apa yang kita perjuangkan tercapai','Seseorang tidak bisa sukses seringkali karena kurangnya keberanian untuk mencobaterasa sakit selalu hampir tidak ada rasanya setelah apa yang kita perjuangkan tercapai','Bicaralah secukupnya, lakukanlah semampunya. Jangan melakukan sebaliknya','Ada saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','jangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','Kadang cara terbaik untuk Memanfaatkan peluang adalah dengan mengatakan tidak pada peluang baru dan fokus mengembangkan apa yang sudah ada di tanganjangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','atasan hanya memberikan tugas berat pada karyawan terbaik, Allah hanya memberikan ujian pada pada manusia terbaikKadang cara terbaik untuk Memanfaatkan peluang adalah dengan mengatakan tidak pada peluang baru dan fokus mengembangkan apa yang sudah ada di tanganjangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','berusaha dan gagal Ternyata jauh lebih melegakan daripada pasrah melihat ke kanan dengan tangan terlipat','lewat kesulitan lah manusia belajar, lewatnya kenyamanan lah manusia Terlena','Saat kita merasa hebat kita baru saja kehilangan separuh pangkat kita karena lengah untuk terus belajar','hidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Orang pintar itu biasa orang hebat itu luar biasa tapi orang berani lah pemenangnyahidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Orang hebat membicarakan ide, orang menengah membicarakan pengalaman, orang lemah membicarakan orang lainOrang pintar itu biasa orang hebat itu luar biasa tapi orang berani lah pemenangnyahidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Anda tidak akan mengubah kehidupan sampai anda mengubah Apa yang anda lakukan setiap hari','bertahan saja tidak cukup anda perlu bereaksi terhadap tekanan dan merubah keadaan','masa depan kita tergantung pada apa yang kita lakukan pada saat ini. Maka jangan sia-siakan waktumu sekarang','Nilai manusia ditentukan bukan dari apa yang diperoleh melainkan apa yang telah diberikan','Malas adalah kemenangan saat ini dan kekalahan di masa nanti','sebuah masalah merupakan kesempatan bagi anda untuk mengeluarkan kemampuan terbaik anda','Kematian tidak dapat mengubur perbuatan baik seseorang','Asal percaya dengan sungguh-sungguh apapun keyakinan Anda dapat menjadi kenyataan','Jika ada hari buruk maka pasti akan hari ada hari baik tugas kita adalah terus bergerak majuAsal percaya dengan sungguh-sungguh apapun keyakinan Anda dapat menjadi kenyataan','Mengeluh adalah cara paling buruk dalam menyelesaikan masalah','Tetap Bertahan dan setia pada tujuan saat menghadapi Hambatan adalah kunci kesuksesan','Tidak perlu keahlian khusus untuk mencari musuh, tapi perlu kesetiaan untuk mempertahankan teman','Orang tua bukan hanya punya kekuatan untuk menatap juga untuk mengalah','Keuletan adalah tanda jadi kesuksesan','cepat atau lambat mereka yang menang adalah mereka yang berfikir dan yakin bahwa mereka bisa','Jaga terus Api Harapan Anda seperti menjaga hidup anda sendiri','Saat semua jalan tertutup. Buatlah jalan dan berserahlah kepada Allah','lari dari masalah bukanlah penyelesaian masalah, hadapi dan Belajarlah dari masalah itu','Rezeki itu ditangan Allah yang kita lakukan hanya berusaha semaksimal mungkin dan menyerahkan hasilnya kepada yang kuasa','Sukses dimulai dengan melakukan apa yang harus dilakukan','rasa syukur membuat kita tidak pernah merasa kekurangan','goal hanya sekedar goal kalau kita tidak mempunyai alasan yang kuat Mengapa kita harus mencapainya','Apapun yang terjadi Yakinlah bahwa Allah menginginkan kita akan jadi lebih baik karena Kejadian ini','orang yang paling Bahagia bukanlah orang yang punya hal-hal terbaik tapi orang yang bisa menjadikan hal-hal yang ia punya menjadi yang terbaikApapun yang terjadi Yakinlah bahwa Allah menginginkan kita akan jadi lebih baik karena Kejadian ini','Respon kita terhadap masalah menentukan kualitas berita fokus pada solusi','Semua yang terlalu sedikit dan terlalu banyak tidak akan membawa kebaikan','Tidak semua usaha kita dibayar oleh manusia, tapi Allah akan membayarnya kelak','Tidak ada harga untuk waktu, tetapi waktu sangat berharga','Sukses seringkali datang pada mereka yang berani bertindak dan jarang menghampiri pada mereka yang dikalahkan ketakutan','Katakan bisa pasti bisa dengan penuh keyakinan otak kita akan segera mencari solusi','Orang yang tidak belajar dari kegagalan adalah orang yang gagal sesungguhnya','Segala sesuatu masalah yang menimpa Anda tidak akan pernah melatih kekuatan anda untuk menyelesaikannya','Saat orang lain melakukan impianmu itu berarti mereka belum mampu melihat sejauh anda melihat','Allah tidak pernah terlambat ia akan menunjukkan kuasanya, pada detik terakhir sekalipun','Bukan banyaknya panah yang menentukan kemenangan tapi tajam panah dan tujuannya yang menentukan','Mengeluh itu sisi lain dari pemborosan, pemborosan waktu dan energy','Pikiran negatif sangat berkuasa bila diberi kesempatan, jadi jangan memberinya kesempatan','Cinta akan membuat kita menjadi orang terkaya di dunia, oleh karena itu mulailah mencintai','Cemas yang berlebihan tidak akan mengubah apapun kecuali merusak diri sendiri','Hidup ini sederhana terkadang pikiran manusia yang membuatnya rumit','Siapa yang bisa menerima kelemahannya sesungguhnya baru saja menambah satu kelebihan pada dirinya','Ada saatnya dimana kekalahan rasa manis yaitu Saat anda sudah melakukan yang terbaik','Menabung itu hanya untuk mempertahankan kekayaan, untuk meningkatkannya berinvestasilah','Jika selamanya anda bermain aman, selamanya juga Anda di tempat yang sama','Lari dari masalah akan membuat masalah menjadi lebih besar, menghadapinya akan membuat anda menjadi lebih besar','Yang menyedihkan bukanlah bidikan yang meleset tapi bidikan tanpa target','Hati yang sedang panas menumpulkan logika dinginkan terlebih dahulu sebelum mengambil keputusan','bila ingin hasil yang besar jangan kerjakan hal yang mudah saja','Jangan biarkan impianmu dijajah oleh pendapat orang lain','Mulailah dengan yang kecil, Kerjakanlah dengan cara yang besar adalah dengan cara yang benar','Pengaruh perkataan orang kepada anda 100% adalah atas izin anda sendiri','Bekerjalah dengan ikhlas karena bekerja tanpa paksaan akan memberi hasil maksimal','Suka belajar, suka jualan, hidup hemat, beli aset suka, sedekah adalah 5 resep Makmur','Lebih baik menjadi raja tikus daripada ekor naga','Kerja keras dan kerja cerdas dapat memastikan keberhasilan dan sedekah dapat memudahkannya','Sakit dalam perjuangan itu hanya berlangsung sementara, namun jika anda menyerah rasa sakit itu akan terasa selamanya','Kegagalan terbesar adalah ketika tidak berani mencoba','Langkah pertama yang diperlukan untuk mendapatkan hal yang anda inginkan adalah memutuskan apa yang anda inginkan','Jangan takut menghadapi masa depan, hadapi dan perjuangkanlah','Dahulukan Allah dalam setiap langkah hidupmu maka semuanya akan ditambahkan kepadamu','Kesulitan adalah hujan terbaik untuk menunjukkan kualitas diri yang sebenarnya','Kesalahan dan kegagalan adalah guru terbaik jika kita mau jujur mengakui dan belajar darinya','Diam belum tentu menyelesaikan masalah tapi setidaknya tidak membesarkan masalah','Pemenang sejati selalu memberikan 100% upayanya, bahkan ketika tidak seorang pun melihatnya','Memaafkan orang lain bagai Menyiram air Bara dendam di hati baik untuk kesehatan kita','Jenius adalah 1 inspirasi dan 99 keringat tidak ada yang dapat menggantikan kerja keras','Disiplin memang tidak mudah tapi tanpa kedisiplinan hidup anda akan jauh lebih sulit','Orang yang berhenti belajar akan menjadi pemilik masa lalu, orang yang terus belajar akan menjadi pemilik masa depan','Hujan tidak hanya datang sendirian Ia datang bersama kesejukan, hal buruk tidak datang sendirian ia datang bersama pembelajaran','Menang atau kalah lakukanlah dengan jujur','Lihatlah tantangan sebagai ujian dan lihatlah masalah Sebagai teguran','Lihat ke atas agar terinspirasi lihat ke bawah agar bersyukur','Untuk meraih apa yang benar-benar anda inginkan fokus saja tidak cukup. Anda harus memiliki rasa lapar untuk meraihnya','90% dari kegagalan berasal dari orang-orang yang memiliki kebiasaan membuat alasan-alasan','Allah tidak membenci orang malas, tapi Allah mengizinkan orang rajin mengambil rezeki orang malas','Keajaiban itu nyata bagi mereka yang yakin berserah diri dan bekerja keras','Orang optimis dapat melihat peluang dalam masalah, orang pesimis akan melihat masalah dalam peluangKeajaiban itu nyata bagi mereka yang yakin berserah diri dan bekerja keras','Kualitas pikiran anda menentukan kualitas kehidupan anda','Bersyukur adalah cara ampuh untuk meraih energi yang dahsyat, Sudahkah anda bersyukur hari ini','Jangan mengharapkan sesuatu yang luar biasa jika anda hanya mau melakukan hal yang biasa saja','Kebahagiaan dimulai dengan ketulusan','1000 perkataan dan pengetahuan tidak berarti tanpa adanya satu tindakan yang nyata','Tangkap peluang, kerjakan, selesaikan','Ketika situasi di sekolah Anda tidak menyenangkan. Di saat itulah sebenarnya karakter anda sedang dibentuk','Seorang pemberani bukan orang yang tidak mempunyai rasa takut. Tapi orang yang mampu berjalan diatas rasa takutnya','dalam takut yang tampak adalah hambatan, dalam yakin yang tampak adalah kesempatan','Tidak ada kata gagal yang ada hanya sukses atau perlu belajar lagi sampai berhasil','Menjadi tua itu pasti menjadi dewasa itu pilihan','Kehidupan yang besar dimulai dari mimpi yang besar','Tragedi dalam kehidupan ini bukanlah yang berakhir terlalu cepat, tetapi kita menunggu terlalu lama untuk memulainya','Takut akan kegagalan seharusnya tidak menjadi alasan untuk tidak mencoba sesuatu','Hari ini adalah hari pertama dalam hidup anda. Buatlah hari ini menjadi hari yang terbaik sepanjang hidup anda dan semoga hari esok matahari bersinar dengan terang','Saya berpikir bahwa ada suatu hal yang lebih penting daripada sekedar percaya, tindakan Dunia ini penuh dengan pemimpi ,tidaklah banyak orang yang berani maju ke depan dan Mulai mengambil langkah pasti untuk mewujudkan visi mereka','Anda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Allah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Pergilah sejauh mungkin dan ketika anda tiba di sana anda akan melihat lebih jauh lagiAllah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Menangis dapat melepaskan tambahan hormon stress, itulah mengapa kita sehabis menangis merasa lebih baikPergilah sejauh mungkin dan ketika anda tiba di sana anda akan melihat lebih jauh lagiAllah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Ketika cinta itu dipertahankan kamu akan tau siapa yang lebih menghargai tentang sebuah hubungan','Dalam hidup ini banyak orang tahu apa yang harus dilakukan, tetapi hanya sedikit yang melakukan apa yang ia ketahui. Mengetahui tidaklah cukup, Anda harus mengambil tindakan','Berilah perhatian lebih ke orang yang kamu sayangi, itu yang mereka butuhkan','Satu ons tindakan sama berharganya dengan satu ton teori','Kita mungkin terpisah sejak lama ketika tak mampu belajar untuk lebih dewasa','Sayangilah dia walau tidak sesempurna seperti yang kau inginkan','Kecantikan akan mengundang perhatian sikap santun memikat Kalbu','Mengetahui tidaklah cukup kita harus melakukannya, keinginan tak cukup hanya dengan berangan kita harus melakukannya','Kesalahan adalah bukti bahwa kamu sedang mencoba','Betapapun jauhnya air mengalir ia takkan pernah lupa hulunya','Lebih baik sendiri daripada bersama dengan orang yang salahBetapapun jauhnya air mengalir ia takkan pernah lupa hulunya','Lakukan sesuatu hari ini yang akan membuat dirimu berterima kasih di hari-hari mendatang','Waktu yang memutuskan Dengan siapa kamu akan berjumpa','Hati yang memutuskan siapa yang kamu inginkan dalam hidup ini','Dengan sikap yang akan menentukan siapa yang akan bertahan dalam hidupmu','Menjadi dewasa dan bijak diawali dengan menjadi muda dan bodoh','Lakukanlah apa yang paling kamu takutkan dalam hidupmu','Bekerjalah seolah kamu tak butuh uang, Cintailah seolah Kamu takkan Tersakiti dan menarilah seakan tak ada yang melihatmu','Jika hari ini sudah sempurna maka Apalah arti hari esok','Bintang pun tak kan bersinar tanpa kegelapan','Suatu saat aku akan menjadi tempat yang akan selalu kau rindu','Guru terbaik kamu adalah kesalahan terakhir yang kamu lakukan','Diam adalah respon terbaik untuk orang bodoh','Jangan pernah membuat keputusan yang permanen untuk perasaan yang sementara','Jika Allah yang menjadi alasan anda untuk hidup maka takkan pernah ada alasan untuk menyerah','Kegagalan ada bukan untuk ditakuti tetapi untuk dipelajari','Anda saat ini adalah hasil dari pengalaman anda','Keberuntungan adalah saat kesempatan datang, anda telah matang dengan segala persiapan','Jangan Menunggu hari yang terbaik untuk melangkah karena setiap hari sangatlah berharga','Keputusan yang baik diperoleh dari pengalaman, dan pengalaman didapat dari keputusan yang buruk','Setiap waktu yang anda lewati dengan sia-sia hanya menjauhkan anda dan semakin jauh dari kata sukses','Realitas kehidupan Anda adalah deskripsi dari jiwa dan pikiran anda','Berani mengambil keputusan maka anda telah melangkah 10 kali lebih cepat untuk sukses','Allah masih mencintai anda jika masih banyak cobaan dan tantangan hidup yang datang menghampiri anda. Allah percaya bahwa anda mampu melaluinya, maka jagalah kepercayaan itu','Ketika orang mengatakan anda sudah berubah sebenarnya itu hanya karena anda berhenti melakukan apa yang mereka ingin anda lakukan','Jangan menukar apa yang sangat anda inginkan untuk apa yang Anda ingin untuk saat ini','Orang-orang yang mengikuti keramaian biasanya tersesat di dalamnya','Orang tua saya bekerja terlalu keras untuk saya bukan supaya saya tidak hanya menjadi orang biasa tetapi menjadi orang luar biasa','Anda menghalangi impian anda ketika anda mengizinkan ketakutan Anda tumbuh lebih besar dari keyakinan anda','Sang juara percaya kepada dirinya sendiri bahkan ketika orang lain tidak percaya','Hanya mereka yang berani mengambil resiko yang jauh pasti dapat menemukan Seberapa jauh seseorang dapat pergi','Tunjukkan teman Anda, saya akan menunjukkan masa depan Anda','Beberapa orang ingin sesuatu terjadi, beberapa orang berharap itu akan terjadi, yang lain mewujudkannya jadi kenyataan','Jika anda menghabiskan waktu untuk mencoba menjadi baik dalam segala hal, Anda tidak akan pernah menjadi hebat dalam apapun','Sebuah perjalanan ribuan mil dimulai dari langkah kecil','Apa yang akan Anda kerjakan, Ketika anda tahu anda tidak mungkin gagal','Ketika kita memiliki satu sama lain, kita Memiliki segalanya','Kebesaran sebenarnya dapat ditemukan dalam hal hal kecil yang terkadang kita lewatkan','Bekerja keraslah, Bermimpilah lebih besar dan jadilah yang terbaik','Apa yang kita pikirkan menentukan apa yang akan terjadi pada kita. Jadi jika kita ingin mengubah hidup kita, kita perlu sedikit mengubah pikiran kita.','Seseorang yang berani membuang satu jam waktunya tidak mengetahui nilai dari kehidupan.','Saya memiliki filosofi yang sederhana: isi apa yang kosong, kosongkan apa yang terlalu penuh.','Hidup adalah cermin dan akan merefleksikan kembali kepada para pemikir mengenai apa yang mereka pikirkan.','Anda di sini hanya untuk persinggahan yang singkat. Jangan terburu, jangan khawatir. Yakinlah bahwa Anda menghirup wangi bunga sepanjang perjalanan.Hidup adalah cermin dan akan merefleksikan kembali kepada para pemikir mengenai apa yang mereka pikirkan.','Hidup adalah serangkaian perubahan yang alami dan spontan. Jangan tolak mereka karena itu hanya membuat penyesalan dan duka. Biarkan realita menjadi realita. Biarkan sesuatu mengalir dengan alami ke manapun mereka suka.','Hidup yang baik adalah hidup yang diinspirasi oleh cinta dan dipandu oleh ilmu pengetahuan.','Kenyataannya, Anda tidak tahu apa yang akan terjadi besok. Hidup adalah pengendaraan yang gila dan tidak ada yang menjaminnya.','Hidup adalah mimpi bagi mereka yang bijaksana, permainan bagi mereka yang bodoh, komedi bagi mereka yang kaya, dan tragedi bagi mereka yang miskin','Hidup itu bukan soal menemukan diri Anda sendiri, hidup itu membuat diri Anda sendiri.','Hal yang paling penting adalah menikmati hidupmu, menjadi bahagia, apapun yang terjadi.','Hidup itu sederhana, kita yang membuatnya sulit.']
					const vasi = motiv[Math.floor(Math.random() * motiv.length)]
					buffer = await getBuffer(`https://i.ibb.co/346nsHC/56806462-399407660892553-4745814299438481408-o.jpg`)
					nuy.sendMessage(from, buffer, image, { quoted: ftroli, caption: '*Motivasi*\n\n'+ vasi })
					break
            case 'quotesislami':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					const islami =['Hal yang paling manis adalah ketika seseorang menyebutkan nama kamu di tahajjud mereka.','Ya Allah panggillah diriku dan orang tuaku ke baitullah dalam keadaan sehat walafiat.','Ya Allah semoga seseorang yang engkau jodohkan denganku adalah seseorang yang saat ini sedang aku perjuangkan.','Allah tidak pernah tidur. Semua pasti akan di balas kelak. Orang-orang jahat yang sekarang bisa tertawa karena banyak uang, berkuasa, tapi besok-besok mereka semua di balas seadil-adilnya.','Jangan putus asa, Allah tidak akan mengecewakan hambanya yang ingin memperbaiki diri.','Percayalah orang yang menasehatimu untuk sholat adalah dia yang paling mencintaimu.','Bukannya Allah tidak tahu sedihmu, Tapi Allah tahu kalau kamu itu kuat.','Bacalah Al-Quran, Ia akan menenangkan hatimu meskipun engkau tidak memahami artinya.','Saat kita sakit hati sama omongan orang, saat itu juga sebenarnya Allah ngajarin kita buat jaga omongan kita ke orang lain. Sederhana bukan?','Di dunia ini orang paling baik pun bisa dicela, dan bahkan orang paling jahat sekalipun bisa di bela.','Al-Quran adalah teman yang tidak akan mengecewakan kamu di dunia dan akhirat.','Cara Allah menjawab doa hambanya : Iyaa.. aku beri untukmu sekarang. Tunggu, aku ingin melihat dulu perjuanganmu. Tidak, aku punya yang lebih baik untukmu.','Dan Allah tidak akan mengadzab mereka selama mereka mau Memohon ampun kepada-Nya. [Al-Anfaal, 8:33]','Kesabaran itu ada dua macam : Sabar atas sesuatu yang tidak kamu ingin. Sabar menahan diri dari sesuatu yang kamu ingini. -Ali bin Abi Thalib','Ambillah kebenaran, jika kamu telah mendengarnya. Karena sungguh di atas kebenaran ada cahaya. (HR. Abu Daud)','Sholatlah agar hatimu tenang, Istighfarlah agar kecewamu hilang, Berdoalah agar bahagiamu segera datang.','Surga itu mahal.. Akan tetapi orang miskin tetap mampu membelinya, Karena harganya bukan pada Harta melainkan Taqwa.','Ya Allah... Perbaikilah lisanku, Perbaikilah hatiku, Perbaikilah akhlakku, Perbaikilah hidupku, Aamiin..','Semoga hari ini Allah memudahkan setiap urusan kita, melapangkan hati kita serta meringankan langkah kita, dalam kebaikan kita Aamiin.','Peganglah aku, bacalah aku setiap hari, karena aku akan menjadi penerang didalam kuburmu nanti. #Al-Quran','Kematian..Kamu terlalu banyak bercanda. Hingga sampai kamu lupa, kematian mungkin tidak menunggumu selesai tertawa.','Jangan khawatirkan rizkimu, karena Allah telah menjaminnya untukmu, namun khawatirkanlah amalanmu, karena Allah tidak menjamin surga-Nya untukmu..','Wahai orang-orang yang beriman! Ingatlah kepada Allah, Dengan mengingat (nama-Nya) sebanyak-banyaknya dan bertasbihlah kepada-nya pada waktu pagi dan petang.','Aku sangat ingin menjadi pemburu surga. Namun aku lupa bahwa aku juga buronan neraka.','Karena aku percaya apapun yang menjadi milikku akan tetap menjadi milikku. Sejauh apapun dia (mencoba) pergi. Sejauh apapun usaha orang lain ingin merebutnya dariku. Aku hanya perlu percaya pada Allah bahwa yang menjadi milikku tidak akan pernah menjadi milik orang lain.','Andai hidayah itu seperti buah yang bisa kubeli, maka akan kubeli berkeranjang-keranjang untuk aku bagikan kepada orang-orang yang aku cintai.','Bila kamu tidak melihatku di syurga. Tolong tanya kepada Allah dimana aku, Tolonglah aku ketika itu..','Hanya Allah yang mengerti bagaimana sulitnya menahan sabar tanpa harus bercerita panjang lebar.','Letakkan hpmu lalu ambil air wudhu, shalatlah kamu, Allah menunggu curhatan darimu.','Maafin aku Ya Allah Gara gara aku mencintai dia tapi tidak pasti, sampai aku lupa mencintai mu juga.','Akan ada saatnya setelah salam dari sholatku, tanganmu yang pertama kali kusentuh.','Mungkin maksud Tuhan mempertemukan kamu dengannya adalah, sekedar mengingatkan bahwa tidak semua yang kamu inginkan bisa kamu dapatkan.','Percayalah Seorang wanita yang mencintai Allah. Allah akan berikan lelaki terbaik untuk menjaganya.','Berterimakasihlah kepada tuhan, Yang memberimu hidup dan kehidupan.','Mungkin kamu hanya harus sedikit peka untuk menyadari petunjuk dari Tuhan atas doa-doamu.']
					const isl = islami[Math.floor(Math.random() * islami.length)]
					buffer = await getBuffer(`https://i.ibb.co/dPnjvD3/IMG-20210127-WA0018.jpg`)
					nuy.sendMessage(from, buffer, image, { quoted: ftroli, caption: '*Quotes Islami*\n\n'+ isl })
					break	
		      case 'quotesnasehat':
               if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					const nasehat =['Jangan pernah mengabaikan apapun yang terjadi, suatu saat akan sadar dan menyesal, ingat tuhan akan selalu memberikan penyesalan terakhir ...','Ingat iya.. Perilaku mu bisa mengubah perasaan seseorang.','Setia itu bukan yang selalu ada, namun saat tak bersama dia tahu hatinya milik siapa.','Kamu perlu belajar satu hal : "Menghargai seriusnya seseorang."','Jangan cari yang sempurna, Sempurnakan saja yang ada.','Ketika seseorang menghina kamu, itu adalah sebuah pujian bahwa selama ini mereka menghabiskan banyak waktu untuk memikirkan kamu, bahkan ketika kamu tidak memikirkan mereka.','Yang terbaik tidak akan hilang. Jika dia hilang maka dia bukanlah yang terbaik.','Percayalah. Suatu hari nanti pasti akan ada seseorang yang bangga memilikimu.','Tidak ada karya yang pernah dibuat oleh seorang seniman yang malas.','Jika seseorang memberimu perhatian jangan pernah mengabaikannya karena suatu saat perhatian sekecil itu kamu rindukan saat kamu kesepian.','Bersyukurlah.. Untuk segala apapun yang engkau miliki saat ini, sebab nikmat itu akan bertambah ketika kamu dapat mensyukuri apa yang telah diberi saat ini. #Buat diri ini jangan banyak mengeluh yah.','Ada perbedaan antara menyerah dan tau kapan kamu merasa cukup dalam berusaha.','Jangan sampai kesenanganmu menyusahkan orang lain. Jangan pula kesusahanmu menyenangkan orang lain.','Semakin banyak kamu memberi, semakin banyak pula yang akan kembali padamu.','Jangan pernah bandingkan akhir kesuksesan orang lain dengan pertengahan prosesmu.','Lakukan apa yang kamu bisa, dengan apa kamu miliki, dimanapun kamu berada.','Hidup memang bukan balapan, tetapi kamu memang perlu untuk terus bergerak maju.','NIKMATI HIDUPMU, LUPAKAN UMURMU.','Sebaik-baiknya permintaan maaf adalah membaiknya tingkah laku.','Belajarlah memahami bahwa tidak semua keinginan bisa terpenuhi, barangkali itu adalah obat yang terbaik untuk mencegah kecewa dan sakit hati.','Kamu akan menemukan yang terbaik, ketika kamu sudah berhenti membanding-bandingkan.','Jangan menilai orang dari masa lalunya karena kita semua sudah tidak hidup disana. Semua orang bisa berubah, biarkan mereka membuktikannya.','Jika dia tidak merasakan kehadiranmu, buat dia merasakan kepergianmu.','Orang pintar mampu memecahkan masalah. Orang bijak mampu menghindarinya.','Bersikap tidak lagi peduli lebih baik dari pada balas dendam.','Tegas akan diri sendiri, buang pikiran negatif dan lakukan yang baik. Kegelisahan hanya milik mereka yang putus asa.','Jangan pikirkan kegagalan kemarin, hari ini sudah lain, sukses pasti diraih selama semangat masih menyengat.','Memaafkanmu bukan berarti memberimu kesempatan sekali lagi.','Berubah menjadi lebih baik adalah pilihan. Tapi, merasa paling baik adalah kesalahan.','Jangan pernah bandingkan dirimu dengan orang lain, tapi bandingkanlah dengan dirimu yang lalu, apakah hari ini sudah lebih baik?','Ketahuilah orang yang paling sering memberi nasihat kepadamu, itulah orang yang paling mencintai kamu.','Jangan pernah berhenti belajar, karena hidup tidak pernah berhenti mengajarkan.','Salah satu tanda dirimu tidak berakhlak adalah main HP ketika ada orang yang berbicara.','Raihlah kesuksesan yang tidak seseorangpun berfikir kamu bisa meraihnya. Buktikan pada mereka kalau kamu bisa!','Kesalahan adalah bukti nyata kalau kamu pernah mencoba. Jangan takut salah. Takutlah untuk melakukan kesalahan-kesalahan yang sama dua kalinya.','Cepat atau lambat bukan masalah. Selama kamu tetap bergerak maju, tidak ada akhirnya kamu akan tetap sampai tidak ada tujuan.','Jika kamu tidak bisa membahagiakan orang lain, Setidaknya janganlah kamu tambah dukanya.','Teruslah berusaha sampai temanmu berkata kepadamu "Sombong iya sekarang."','Ketika kamu melakukan sebuah kesalahan, Akuilah dan jangan ragu untuk meminta maaf. Tidak pernah ada satupun orang dalam sejarah yang mati tersedak karena menelan gengsinya sendiri.','Syukuri yang menyayangimu, Maafkan yang menyakitimu.','Tunjukkan keburukanmu, lalu lihat siapa yang bertahan.','Kamu boleh lelah, tetapi tidak boleh menyerah untuk selamanya.','Jangan pernah lupa bilang "Terima Kasih." Jangan pernah gengsi bilang "Maaf." Jangan pernah jadi terlalu sombong untuk bilang "Tolong."','Masa lalu tidak bisa berubah, diubah, dilupakan, ataupun di hapus. Masa lalu hanya bisa di terima','Kita ini.. sangat pintar menghakimi, Namun bodoh dalam memperbaiki diri.','Tidak peduli seberapa baiknya kamu, Kebaikan tidak akan berarti apa-apa jika kamu memberikan kepada orang yang salah.','Orang sabar selalu menang, Orang tamak selalu rugi, Orang marah selalu kalah, Orang baik selalu diuji.','Carilah tempat dimana kamu bisa dihargai, Bukan dibutuhkan. Karena banyak orang mencarimu hanya saat butuh saja, Hingga lupa bagaimana cara menghargaimu.','Melupakan orang yang melukaimu adalah hadiahmu untuk mereka. Memaafkan orang yang melukaimu adalah hadiahmu untuk dirimu sendiri.','Maafkan orang yang menyakitimu... Bukan karena mereka pantas di maafkan, Tapi karena kamu harus berbahagia.','Tetaplah kuat, Tetaplah positif, Buatlah mereka bertanya-tanya bagaimana kamu masih tetap bisa tersenyum.','Jangan meninggalkan yang pasti demi yang mungkin. Sebab semua kemungkinan, belum tentu menjadi kepastian.','Seseorang pernah berkata padaku, Merelakan bukan berarti menyerah, Tapi tidak bisa dipaksakan.','Ikuti alurnya, Nikmati prosesnya, Tuhan tau kapan kita harus bahagia.','Usia hanyalah angka, Hanya mereka yang terus berusaha yang berhasil.','Jangan pernah meremehkan siapapun! Karena sukses adalah balas dendam Terbaik.','Pria sejati.. Harus menyelesaikan apa yang sudah dimulai.','Jika kau ingin terbang, Kau harus melepaskan hal-hal yang membuatmu berat.','Siapapun yang meremehkan mu hari ini, Suatu saat harus kamu lewati.','Jangan Mencintai terlalu mudah, Jangan Percaya terlalu cepat, Jangan Berhenti terlalu dini, Jangan Berharap terlalu tinggi, Jangan Bicara terlalu banyak.','Jadilah orang baik tapi jangan biarkan orang lain mengambil keuntungan dari mu. Ketahuilah kapan kamu harus bilang tidak.','Sahabat sejati adalah mereka tau semua kelemahan mu, Tapi tidak menggunakan nya untuk menjatuhkan mu.','Ada tiga hal yang harus dimiliki dalam hidup yaitu : Perubahan, Pilihan dan Prinsip.','Orang bodoh mengira dirinya bijak. orang bijak tau dirinya bodoh.','Jatuh cintalah seperlunya.. Kemudian patah hatilah secukupnya. Karena semua ada porsinya, Karena semua ada masanya.','Kita tidak pernah tau jalan hidup seseorang.. Maka ada baiknya jika kita tidak menghakiminya atas keputusan dalam hidupnya.','Jangan pernah menyesal mengenal seseorang dalam hidupmu, Orang baik akan memberi mu Kebahagiaan, Orang jahat akan memberi mu Pengalaman, Bahkan seburuk-buruk manusia akan memberi mu Pelajaran.','Jangan menilai kedewasaan dari usia seseorang, Karena itu bukan jaminan.']
					const nsh = nasehat[Math.floor(Math.random() * nasehat.length)]
					buffer = await getBuffer(`https://i.ibb.co/bspYPtC/IMG-20210125-WA0018.jpg`)
					nuy.sendMessage(from, buffer, image, { quoted: ftroli, caption: '*Quotes Nasehat*\n\n'+ nsh })
					break	
				case 'gantengcek':
			   case 'cekganteng':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					ganteng = body.slice(12)
					const gan =['10%','30%','20%','40%','50%','60%','70%','62%','74%','83%','97%','100%','29%','94%','75%','82%','41%','39%']
					const teng = gan[Math.floor(Math.random() * gan.length)]
					nuy.sendMessage(from, 'Pertanyaan : Cek Ganteng Bang *'+ganteng+'*\n\nJawaban : '+ teng +'', text, { quoted: caa })
					break
				case 'cantikcek':
				case 'cekcantik':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					cantik = body.slice(11)
					if (args.length < 1) return replyca('Yg Mau dicek Siapa Kak??')
					const can =['10% banyak" perawatan ya kak:v\nCanda Perawatan:v','30% Semangat Kaka Merawat Dirinya><','20% Semangat Ya KakaðŸ‘','40% Wahh Kaka><','50% kaka cantik deh><','60% Hai CantikðŸŠ','70% Hai UkhtyðŸŠ','62% Kakak Cantik><','74% Kakak ni cantik deh><','83% Love You Kakak><','97% Assalamualaikum UkhtyðŸŠ','100% Kakak Pake Susuk ya??:v','29% Semangat Kakak:)','94% Hai Cantik><','75% Hai Kakak Cantik','82% wihh Kakak Pasti Sering Perawatan kan??','41% Semangat:)','39% Lebih SemangatðŸŠ']
					const tik = can[Math.floor(Math.random() * can.length)]
					nuy.sendMessage(from, 'Pertanyaan : Cantik Cek Kakak *'+cantik+'*\n\nPersen Kecantikan : '+ tik +'', text, { quoted: caa })
					break
			   case 'ownergrup':
				case 'ownergroup':
               nuy.updatePresence(from, Presence.composing) 
               options = {
               text: `Pemilik Group ini adalah : wa.me/${from.split("-")[0]}`,
               contextInfo: { mentionedJid: [from] }
               }
               nuy.sendMessage(from, options, text, { quoted: caa } )
				   break
				case 'leave':
				case 'outgc':
				   if (!isGroup) return grupinv(mess.only.group)
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
			    	anu = await nuy.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
	            break
				case 'setname':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
               if (!isGroup) return grupinv(mess.only.group)
			      if (!isGroupAdmins) return replyca(mess.only.admin)
			   	if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
               nuy.groupUpdateSubject(from, `${body.slice(9)}`)
               replyca(`Sukses Nama Grup Menjadi : *${body.slice(9)}*`)
               break
            case 'setdesc':
               if (isBanned) return replyca(mess.only.benned)    
               if (!isUser) return replyca(mess.only.userXie)
               if (!isGroup) return grupinv(mess.only.group)
			      if (!isGroupAdmins) return replyca(mess.only.admin)
				   if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
               nuy.groupUpdateDescription(from, `${body.slice(9)}`)
               replyca(`Sukse Set Deskripsi Menjadi : *${body.slice(9)}*`)
               break
				case 'tts':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
					if (args.length < 1) return nuy.sendMessage(from, `Kode bahasanya mana Kak?\n Kalo Gatau Kode Bahasanya Apa Aja Ketik : *${prefix}bahasa*`, text, {quoted: caa})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return replyca('Textnya Mana?')
					dtt = body.slice(5)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? replyca('Textnya kebanyakan gan')
					: gtts.save(ranm, dtt, function() {
					exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
					fs.unlinkSync(ranm)
					buff = fs.readFileSync(rano)
					if (err) return replyca('Gagal')
					nuy.sendMessage(from, buff, audio, {quoted: caa, ptt:true})
					fs.unlinkSync(rano)
					})
					})
					await limitAdd(sender) 
					break  
				case 'translate':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca(`Example: ${prefix + command} Lu Jelek`)
               kode_negara = args[0]
               args.shift()
               ini_txt = args.join(" ")
               get_result = await fetchJson(`https://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=${LolApi}&text=${ini_txt}`)
               get_result = get_result.result
               init_txt = `From : ${get_result.from}\n`
               init_txt += `To : ${get_result.to}\n`
               init_txt += `Original : ${get_result.original}\n`
               init_txt += `Translated : ${get_result.translated}\n`
               init_txt += `Pronunciation : ${get_result.pronunciation}\n`
               replyca(init_txt)
               break
				case 'setpp':
	            if (isBanned) return replyca(mess.only.benned)    
	            if (!isUser) return replyca(mess.only.userXie)
               if (!isGroup) return grupinv(mess.only.group)
               if (!isGroupAdmins) return replyca(mess.only.admin)
               if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
               media = await nuy.downloadAndSaveMediaMessage(caa)
               await nuy.updateProfilePicture (from, media)
               replyca(`Sukses Ganti Foto Grup *${groupMetadata.subject}*`)
               break
            case 'apakah':
               if (isBanned) return replyca(mess.only.benned)    
               if (!isUser) return replyca(mess.only.userXie)
					apakah = body.slice(1)
					const apakahh = ["Ya","Tidak","Ga tau"]
					const kah = apakahh[Math.floor(Math.random() * apakahh.length)]
					nuy.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: caa })
					break 
				case 'rate':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					rate = body.slice(1)
					ratee = ["100%","95%","90%","85%","80%","75%","70%","65%","60%","55%","50%","45%","40%","35%","30%","25%","20%","15%","10%","5%"]
					const te = ratee[Math.floor(Math.random() * ratee.length)]
					nuy.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'', text, { quoted: caa })
					break 
				case 'watak':
				   if (isBanned) return replyca(mess.only.benned)    
			   	if (!isUser) return replyca(mess.only.userXie)
					watak = body.slice(1)
					wa =["penyayang","pemurah","Pemarah","Pemaaf","Penurut","Baik","baperan","Baik Hati","penyabar","Uwu","top deh, pokoknya","Suka Membantu"]
					const tak = wa[Math.floor(Math.random() * wa.length)]
					nuy.sendMessage(from, 'Pertanyaan : *'+watak+'*\n\nJawaban : '+ tak, text, { quoted: caa })
					break 
				case 'hobby':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					hobby = body.slice(1)
					hob =["Memasak","Membantu Atok","Mabar","Nobar","Sosmed an","Membantu Orang lain","Nonton Anime","Nonton Drakor","Naik Motor","Nyanyi","Menari","Bertumbuk","Menggambar","Foto fotoan Ga jelas","Maen Game","Berbicara Sendiri"]
					const by = hob[Math.floor(Math.random() * hob.length)]
					nuy.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: caa })
					break 
				case 'bisakah':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					bisakah = body.slice(1)
					const bisakahh = ["Bisa","Tidak Bisa","Ga tau"]
					const keh = bisakahh[Math.floor(Math.random() * bisakahh.length)]
					nuy.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: caa })
					break 
				case 'kapankah':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					kapankah = body.slice(1)
					const kapankahh = ["1 Minggu lagi","1 Bulan lagi","1 Tahun lagi","100 tahun lagi","gatau","2030","1 Jam lagi","1 Menit lagi"]
					const koh = kapankahh[Math.floor(Math.random() * kapankahh.length)]
					nuy.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: caa })
					break 
				case 'truth':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
					anu = await fetchJson(`https://xptnbotapinew.herokuapp.com/?truth&apikey=xptn`, {method: 'get'})
					ttrth = `${anu.Dare}`
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					nuy.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: caa })
					await limitAdd(sender) 
					break 
				case 'dare':
				   if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
					anu = await fetchJson(`https://xptnbotapinew.herokuapp.com/?dare&apikey=xptn`, {method: 'get'})
					der = `${anu.Dare}`
					totd = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					nuy.sendMessage(from, totd, image, { quoted: caa, caption: '*Dare*\n\n'+ der })
					await limitAdd(sender) 
					break
            case 'afk':
               if (isBanned) return replyca(mess.only.benned)
				   if (!isUser) return replyca(mess.only.userXie)
				   if (args.length == 0) return replyca('Teksnya Mana Kak?')
               alasan = args.join(" ")
               afk[sender.split('@')[0]] = alasan.toLowerCase()
               fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
               ini_txt = "Anda Telah Afk\n"
               if (alasan != "") {
               ini_txt += "Dengan alasan " + alasan
               }
               replyca(ini_txt)
               break
            case 'speed':
            case 'ping':
               var times = speed();
               const latensi = speed() - times 
               nuy.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, text, {quoted: ftroli})
               break
            case 'tagme':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
					var nom = caa.participant
					const tag = {
					text: `@${nom.split("@s.whatsapp.net")[0]} tag!`,
					contextInfo: { mentionedJid: [nom] }
					}
					nuy.sendMessage(from, tag, text, {quoted: caa})
					break
            case 'report':
               if (isBanned) return replyca(mess.only.benned)    
               if (!isUser) return replyca(mess.only.userXie)
               if (args.length < 1) return replyca(`Yang mau direport kak?`)
               const pesan = body.slice(8)
               if (pesan.length > 300) return replyca('Maaf Teks Terlalu Panjang, Maksimal 300 Teks')
               var nomor = caa.participant
               const tekst1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`
               var options = {
               text: tekst1,
               contextInfo: {mentionedJid: [nomor]},
               }
               nuy.sendMessage('6283815956151@s.whatsapp.net', options, text, {quoted: caa})
               replyca('Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.')
               break
            case 'request':
               if (isBanned) return replyca(mess.only.benned)    
               if (!isUser) return replyca(mess.only.userXie)
               if (args.length < 1) return replyca(`Mau request apa? Contoh: #request fitur anime`)
               const cfrr = body.slice(8)
               if (cfrr.length > 300) return replyca('Maaf Teks Terlalu Panjang, Maksimal 300 Teks')
               var nomor = caa.participant
               const ress = `*[REQUEST VITUR]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${cfrr}`
               var options = {
               text: ress,
               contextInfo: {mentionedJid: [nomor]},
               }
               nuy.sendMessage('6283815956151@s.whatsapp.net', options, text, {quoted: caa})
               replyca('REQUEST ANDA TELAH SAMPAI OWNER BOT, Requests palsu/main2 tidak akan ditanggapi.')
               break
				case 'meme':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
					memein = await fetchJson(`https://api.zeks.xyz/api/memeindo?apikey=${ZeksApi}`)
					buffer = await getBuffer(memein.result)
               imgnya = await nuy.prepareMessage(from, buffer, image, {thumbnail: buffer})
               gbutsan = [
                 {buttonId: `${prefix}memee`, buttonText: {displayText: 'Meme'}, type: 1}
               ]
               gbuttonan = {
                 imageMessage: imgnya.message.imageMessage,
                 contentText: `Lucu Ga?`,
                 footerText: `Silahkan Klik Di Bawah Jika Ingin Meme Lagi!\n\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥`,
                 buttons: gbutsan,
                 headerType: 4
               }
               await nuy.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: caa})
					await limitAdd(sender)
					break
            case 'memee':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
					memein = await fetchJson(`https://api.zeks.xyz/api/memeindo?apikey=${ZeksApi}`)
					buffer = await getBuffer(memein.result)
               imgnya = await nuy.prepareMessage(from, buffer, image, {thumbnail: buffer})
               gbutsan = [
                 {buttonId: `${prefix}meme`, buttonText: {displayText: 'Meme'}, type: 1}
               ]
               gbuttonan = {
                 imageMessage: imgnya.message.imageMessage,
                 contentText: `Lucu Ga?`,
                 footerText: `Silahkan Klik Di Bawah Jika Ingin Meme Lagi!\n\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥`,
                 buttons: gbutsan,
                 headerType: 4
               }
               await nuy.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: caa})
					await limitAdd(sender)
					break
				case 'hilih':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
			   	replyca(mess.wait)
					if (args.length < 1) return replyca('Teksnya mana gan?')
					anu = await fetchJson(`https://api.i-tech.id/tools/hilih?key=${TechApi}&kata=${body.slice(7)}`, {method: 'get'})
					nuy.sendMessage(from, `${anu.result}`, text, {quoted: caa})
					await limitAdd(sender) 
					break
            case 'resepmasakan':
               if (isBanned) return replyca(mess.only.benned)    
               if (!isUser) return replyca(mess.only.userXie)
               if (isLimit(sender)) return replyca(limitend(pushname))
               replyca(mess.wait)
               anu = await fetchJson(`https://masak-apa.tomorisakura.vercel.app/api/search?q=${body.slice(14)}`, {method: 'get'})
               masak = '==============================\n'
               for (let msk of anu.results){
               masak += `• *Title:* ${msk.title}\n• *• *Durasi Masak Sekitar:* ${msk.times}\n• *Porsi:* ${msk.serving}\n• *Tingkat Kesulitan:* ${msk.difficulty}\n• *Link:* https://www.masakapahariini.com/?s=${msk.key}\n==============================\n`
               }
               replyca(masak.trim())
               await limitAdd(sender) 
               break
				case 'bass':             
					encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await nuy.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
					fs.unlinkSync(media)
					if (err) return replyca('Error!')
					hah = fs.readFileSync(ran)
					nuy.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: caa})
					fs.unlinkSync(ran)
					})
				   break
			   case 'hekerbucin':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
			    	hasil = hekerbucin[Math.floor(Math.random() * (hekerbucin.length))]
				   nuy.sendMessage(from, '*'+hasil+'*', text, {quoted: caa})
				   break
			   case 'infonomor':
			      if (isBanned) return replyca(mess.only.benned)    
			      if (!isUser) return replyca(mess.only.userXie)
			      if (isLimit(sender)) return replyca(limitend(pushname))
			      replyca(mess.wait)
               anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=${body.slice(10)}`)
			      infonomor = `*nomor* \n${anu.nomor} *international* \n${anu.international}`
			      replyca(infonomor)
			      await limitAdd(sender) 
			      break 
            case 'igstalk':
					if (isBanned) return replyca(mess.only.benned)    
			      if (!isUser) return replyca(mess.only.userXie)
					get_result = await fetchJson(`http://lolhuman.herokuapp.com/api/stalkig/${body.slice(9)}?apikey=${LolApi}`, {method: 'get'})
					get_result = get_result.result
					txt = `Link : https://www.instagram.com/${get_result.username}\n`
					txt += `Full : ${get_result.fullname}\n`
					txt += `Post : ${get_result.posts}\n`
					txt += `Followers : ${get_result.followers}\n`
					txt += `Following : ${get_result.following}\n`
					txt += `Bio : ${get_result.bio}\n`
					buffer = await getBuffer(get_result.photo_profile)
					nuy.sendMessage(from, buffer, image, {quoted: ftroli, caption: txt})
					break
			   case 'mimpi':
			      if (isBanned) return replyca(mess.only.benned)
			      if (isLimit(sender)) return replyca(limitend(pushname))
			      if (!isUser) return replyca(mess.only.userXie)
			      replyca(mess.wait)
			      anu = await fetchJson(`https://api.arugaz.my.id/api/primbon/tafsirmimpi?mimpi=${body.slice(7)}`, {method: 'get'})
			      mimpi = `Arti Mimpi *${body.slice(7)}* Adalah:\n${anu.result.hasil}`
			      nuy.sendMessage(from, mimpi, text, {quoted: caa})
			      await limitAdd(sender) 
			    	break 
				case 'quotes':
				   nuy.updatePresence(from, Presence.composing) 
				   if (isBanned) return replyca(mess.only.benned)    
				   if (isLimit(sender)) return replyca(limitend(pushname))
				   if (!isUser) return replyca(mess.only.userXie)
				   data = fs.readFileSync('./Faa/quotes.js');
               jsonData = JSON.parse(data);
               randIndex = Math.floor(Math.random() * jsonData.length);
               randKey = jsonData[randIndex];
               randQuote = 'Author: *'+randKey.author+'*\n\n*'+randKey.quotes+'*'
               nuy.sendMessage(from, randQuote, text, {quoted: caa})
				   await limitAdd(sender) 
					break
			   case 'closetime':
			      nuy.updatePresence(from, Presence.composing)
					if (isBanned) return replyca(mess.only.benned)    
					if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
               if (args[1]=="detik") {var timer = args[0]+"000"
				   } else if (args[1]=="menit") {var timer = args[0]+"0000"
				   } else if (args[1]=="jam") {var timer = args[0]+"00000"
				   } else {return replyca("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
				   setTimeout( () => {
					var nomor = caa.participant
					const close = {
					text: `*Tepat Waktu* Group Ditutup Oleh Admin @${nomor.split("@s.whatsapp.net")[0]}\nꜱᴇᴋᴀʀᴀɴɢ *ʜᴀɴʏᴀ ᴀᴅᴍɪɴ* ʏᴀɴɢ ᴅᴀᴘᴀᴛ ᴍᴇɴɢɪʀɪᴍ ᴘᴇꜱᴀɴ`,
					contextInfo: { mentionedJid: [nomor] }
					}
					nuy.groupSettingChange(from, GroupSettingChange.messageSend, true);
					replyca(close)
				   }, timer)
				   break
				case 'opentime': 
					if (isBanned) return replyca(mess.only.benned)    
					if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
               nuy.updatePresence(from, Presence.composing) 
               if (args[1]=="detik") {var timer = args[0]+"000"
				   } else if (args[1]=="menit") {var timer = args[0]+"0000"
				   } else if (args[1]=="jam") {var timer = args[0]+"00000"
				   } else {return replyca("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
				   setTimeout( () => {
					var nomor = caa.participant
					const open = {
					text: `*Tepat Waktu* Group Dibuka Oleh Admin @${nomor.split("@s.whatsapp.net")[0]}\nꜱᴇᴋᴀʀᴀɴɢ *ᴍᴇᴍʙᴇʀ* ᴅᴀᴘᴀᴛ ᴍᴇɴɢɪʀɪᴍ ᴘᴇꜱᴀɴ`,
					contextInfo: { mentionedJid: [nomor] }
					}
					nuy.groupSettingChange(from, GroupSettingChange.messageSend, false);
					replyca(open)
				   }, timer)
				   break
				case 'darkjokes':
				   nuy.updatePresence(from, Presence.composing) 
				   if (isBanned) return replyca(mess.only.benned)    
				   if (isLimit(sender)) return replyca(limitend(pushname))
				   if (!isUser) return replyca(mess.only.userXie)
				   replyca(mess.wait)
				   data = fs.readFileSync('./Faa/drak.js');
               jsonData = JSON.parse(data);
               randIndex = Math.floor(Math.random() * jsonData.length);
               randKey = jsonData[randIndex];
               darkjokes = await getBuffer(randKey.result)
               nuy.sendMessage(from, darkjokes, image, {quoted: caa, caption: '\`\`\`DARK JOKES\`\`\`'})
				   await limitAdd(sender) 
				   break  
			   case 'katailham':
				   if (isBanned) return replyca(mess.only.benned)    
			   	if (!isUser) return replyca(mess.only.userXie)
				   hasil = katailham[Math.floor(Math.random() * (katailham.length))]
				   nuy.sendMessage(from, '*'+hasil+'*', text, {quoted: caa})
				   break
            case 'katacinta':	
               if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					gatauda = body.slice(8)
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/katacinta`, {method: 'get'})
					replyca(anu.result)
					break
			   case 'persengay':
			   case 'gaypersen':
			   	if (!isUser) return replyca(mess.only.userXie)
			   	if (isLimit(sender)) return replyca(limitend(pushname))
				   if (args.length < 1) return replyca('tag temanmu!')
		   		rate = body.slice(11)
			   	persengayy = ["*4%*\n\n*Tobat Ngegay Gan:v*","*9%*\n\n*OTW Tobat Gan:v*","*17%*\n\n*Kang Coli*","*28%*\n\n*Buset Dah GayðŸ¤¦*","*34%*\n\n *Korban Tusbol*","*48%*\n\n*Kang Hunter Bool:v*","*59%*\n\n *Bahaya Ni Orang Gan*","*62%*\n\n*HatiÂ² Sama Ni Orang Beneran Dah*","*74%*\n\n*Astagfirullah Kabur GanðŸƒðŸŒ¬ï¸*","83%\n\n Yaallah NakðŸ¤¦","97%\n\nAstagfirullahðŸ¤¦","100%\n\nKabur ae Gan Daripada Ditusbol Bool luðŸƒ","29%\n\n amann:v","94%\n\n YaallahðŸƒ","75%\n\nHadehh GayðŸ¤¦","82%\n\nMending Lu Tobat DahðŸƒ","41%\n\nSering Cari Bool Diperempatan","39%\n\nSering Tusbol Bool TopanðŸƒ"]
   				const kl = persengayy[Math.floor(Math.random() * persengayy.length)]
	    			nuy.sendMessage(from, 'Persen Gay: *'+rate+'*\n\nJawaban : '+kl+'', text, { quoted: caa })
	   			await limitAdd(sender) 
   				break
			   case 'pbucin':
    			case 'persenbucin':
    			case 'bucinpersen':
	   			if (!isUser) return replyca(mess.only.userXie)
	    			if (isLimit(sender)) return replyca(limitend(pushname))
	   			if (args.length < 1) return replyca('Mana Nama?')
		   		rate = body.slice(8)
   				persenbucin = ["4%\n\nHadehhðŸ¤¦","9%\n\nMasih Kecil Dah Bucin Ae","17%\n\nNakk Masih Kecil","28%\n\nYoalahh hmm","34%\n\nMayan Lah","48%\n\nGatau","59%\n\nBiasa Kang Bucin","62%\n\n HadehhhðŸƒ","74%\n\n bucen Teroosss","83%\n\n SekaliÂ² kek Ga bucin Gitu","97%\n\nHadehh PakboiÂ²","100%\n\nHadehhh Ini Bukan Bucin Tapi Pakboi","29%\n\nKasian Mana Masih Muda","94%\n\n Dasar Pakboi","75%\n\n Ya Ampun"]
	   			const pbucin = persenbucin[Math.floor(Math.random() * persenbucin.length)]
	   			nuy.sendMessage(from, 'Persen Bucin Kak: *'+rate+'*\n\nJawaban : '+ pbucin +'', text, { quoted: caa })
   				await limitAdd(sender) 
     				break 
		      case 'map':
               if (isBanned) return replyca(mess.only.benned)    
			   	if (!isUser) return replyca(mess.only.userXie)
               if (args.length < 1) return replyca('Masukan nama daerah')
               daerah = body.slice(5)
               try {
               data = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${daerah}`)
               replyca(mess.wait)
               hasil = await getBuffer(data.gambar)
               nuy.sendMessage(from, hasil, image, {
               quoted: caa, caption: `Hasil Dari *${daerah}*`
               })
               } catch {
               replyca(mess.wait)
               }
               break
			   case 'tagall':
			      if (isBanned) return replyca(mess.only.benned)    
			      if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n'
					for (let mem of groupMembers) {
					teks += `╠➥ @${mem.jid.split('@')[0]}\n`
					members_id.push(mem.jid)
					}
					mentions(`╔═══✪ Tag By *${pushname}* ✪══`+ teks +'╚═══〘 *MANCA BOT* 〙═══', members_id, true)
					break
			   case 'mentionall':
	   		   if (isBanned) return replyca(mess.only.benned)    
			      if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					members_id = []
					teks = '\n'
					for (let mem of groupMembers) {
					teks += `╠➥ @${mem.jid.split('@')[0]}\n`
					members_id.push(mem.jid)
					}
					mentions(`╔══〘  *${body.slice(12)}*  〙✪══`+teks+'╚═〘 *MANCA BOT* 〙', members_id, true)
					break
			   case 'kbbi':
			      if (isBanned) return replyca(mess.only.benned)    
			      if (!isUser) return replyca(mess.only.userXie)
			      if (isLimit(sender)) return replyca(limitend(pushname))
			      replyca(mess.wait)
					if (args.length < 1) return replyca('Apa yang mau dicari gan?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
					replyca('Menurut Kbbi:\n\n'+anu.result)
					await limitAdd(sender)
					break 
				case 'grup':
				case 'gc':
				case 'group':
					if (isBanned) return replyca(mess.only.benned)    
					if (!isUser) return replyca(mess.only.userXie)	
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
					if (args[0] === 'buka') {
					replyca('「 *SUKSES* 」')
					nuy.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
					replyca('「 *SUKSES* 」')
					nuy.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
				case 'artinama':
				   if (isBanned) return replyca(mess.only.benned)    
			   	if (!isUser) return replyca(mess.only.userXie)
			   	if (isLimit(sender)) return replyca(limitend(pushname))
					if (args.length < 1) return replyca('Apa yang mau dicari gan?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(6)}`, {method: 'get'})
					nuy.sendMessage(from, anu.result, text, {quoted: caa})
					await limitAdd(sender) 
					break 
				case 'clearall':
					if (!isOwner) return replyca('Kamu siapa?')
					anu = await nuy.chats.all()
					nuy.setMaxListeners(25)
					for (let _ of anu) {
					nuy.deleteChat(_.jid)
					}
					replyca('「 *SUKSES* 」')
					break
            case 'bcgc':
					nuy.updatePresence(from, Presence.composing) 
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					if (args.length < 1) return replyca('Textnya Mana?')
					if (isMedia && !caa.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
					bcgc = await nuy.downloadMediaMessage(encmedia)
					for (let _ of groupMembers) {
					nuy.sendMessage(_.jid, bcgc, image, {quoted: ftroli, caption: `「 *BC GROUP* 」\n*Group* : ${groupName}\n\n${body.slice(6)}`})
					}
					replyca('Sukses Broadcast')
					} else {
					for (let _ of groupMembers) {
					sendMess(_.jid, `「 *BC GROUP* 」\n*Group* : ${groupName}\n\n${body.slice(6)}`)
					}
					replyca('Sukses Broadcast')
					}
					break
				case 'bc':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					if (args.length < 1) return replyca('Textnya Mana?')
					anu = await nuy.chats.all()
					if (isMedia && !caa.message.videoMessage || isQuotedImage) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
					bc = await nuy.downloadMediaMessage(encmedia)
					for (let _ of anu) {
					nuy.sendMessage(_.jid, bc, image, {quoted: ftroli, caption: `「 *BROADCAST* 」\n\n${body.slice(4)}`})
					}
					replyca('Suksess broadcast')
					} else {
					for (let _ of anu) {
					sendMess(_.jid, `「 *BROADCAST* 」\n\n${body.slice(4)}`)
					}
					replyca('Suksess broadcast')
					}
					break
            case 'bcs':
            case 'bcstik':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					if (!isQuotedSticker) return replyca('Reply stickernya kak')
					anu = await nuy.chats.all()
					if (isMedia && !caa.message.videoMessage || isQuotedSticker) {
					const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
					bcs = await nuy.downloadMediaMessage(encmedia)
					for (let _ of anu) {
					nuy.sendMessage(_.jid, bcs, sticker, {quoted: ftroli})
					}
					replyca('Suksess broadcast')
					}
					break
           case 'bcgcs':
           case 'bcgcstik':
               nuy.updatePresence(from, Presence.composing) 
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					if (!isQuotedSticker) return replyca('Reply stickernya kak')
					if (isMedia && !caa.message.videoMessage || isQuotedSticker) {
					const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
					bcgcs = await nuy.downloadMediaMessage(encmedia)
					for (let _ of groupMembers) {
					nuy.sendMessage(_.jid, bcgcs, sticker, {quoted: ftroli})
					}
					replyca('Suksess broadcast')
					}
					break
			   case 'add':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
					if (args.length < 1) return replyca('Yang mau di add siapa??')
					if (args[0].startsWith('08')) return replyca('Gunakan kode negara Gan')
					try {
					num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
					nuy.groupAdd(from, [num])
					} catch (e) {
					console.log('Error :', e)
					replyca('Gagal')
					}
					break
            case 'kick':
					if (isBanned) return replyca(mess.only.benned)    
			      if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
					if (caa.message.extendedTextMessage === undefined || caa.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = caa.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
					nuy.groupRemove(from, mentioned)
					}
					break
				case 'kicktime':
					if (isBanned) return replyca(mess.only.benned)
					if (!isUser) return replyca(mess.only.userXie)	
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
					if (caa.message.extendedTextMessage === undefined || caa.message.extendedTextMessage === null) return replyca('Tag target yang ingin di tendang!')
					mentioned = caa.message.extendedTextMessage.contextInfo.mentionedJid
					setTimeout( () => {
					replyca('Yok Sama" Al-fatihah')
					}, 8000)
					setTimeout( () => {
					replyca('sukses min:D')
					}, 7000)
					setTimeout( () => {
					nuy.groupRemove(from, mentioned)
					}, 6000)
					setTimeout( () => {
					replyca(`Bismilah Kick @${mentioned[0].split('@')[0]}`)
					}, 5000)
					setTimeout( () => {
					replyca('Asikkk Dapet Makanan nihh:D')
					}, 2500)
					setTimeout( () => {
					replyca('Perintah Diterima min:D')
					}, 0)
					break
				case 'promote':
				case 'pm':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
					if (caa.message.extendedTextMessage === undefined || caa.message.extendedTextMessage === null) return replyca('Tag target yang ingin di jadi admin!')
					mentioned = caa.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
					teks = 'Perintah di terima, anda menjdi admin :\n'
					for (let _ of mentioned) {
					teks += `@${_.split('@')[0]}\n`
					}
					mentions(teks, mentioned, true)
					nuy.groupMakeAdmin(from, mentioned)
					} else {
					mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} Kamu Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
					nuy.groupMakeAdmin(from, mentioned)
					}
					break
				case 'delete':
				case 'del':
				case 'd':
					if (!isGroup)return replyca(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					nuy.deleteMessage(from, { id: caa.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
				case 'delow':
				   if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					nuy.deleteMessage(from, { id: caa.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
			   case 'demote':
			      if (isBanned) return replyca(mess.only.benned)    
			      if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
					if (caa.message.extendedTextMessage === undefined || caa.message.extendedTextMessage === null) return replyca('Tag target yang ingin di tidak jadi admin!')
					mentioned = caa.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
					teks = 'Perintah di terima, anda tidak menjadi admin :\n'
					for (let _ of mentioned) {
					teks += `@${_.split('@')[0]}\n`
					}
					mentions(teks, mentioned, true)
					nuy.groupDemoteAdmin(from, mentioned)
					} else {
					mentions(`Perintah di terima, Menurunkan : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
					nuy.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'listadmins':
				case 'listadmin':
				case 'adminlist':
				case 'adminslist':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
					no += 1
					teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
			   case 'nsfw':
			      if (isBanned) return replyca(mess.only.benned)    
			      if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (args.length < 1) return replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					if ((args[0]) === 'on') {
						if (isNsfw) return replyca('Nafsu Sudah On')
						nsfw.push(from)
						fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
						replyca('「 *SUKSES* 」')
					} else if ((args[0]) === 'off') {
					    if (isNsfw) return replyca('Nafsu Sudah Off')
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
						replyca('「 *SUKSES* 」')
					} else {
						replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					}
					break
				case 'modeanime':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (args.length < 1) return replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					if ((args[0]) === 'on') {
						if (isAnime) return replyca('Anime Sudah On')
						anime.push(from)
						fs.writeFileSync('./database/anime.json', JSON.stringify(anime))
						replyca('「 *SUKSES* 」')
					} else if ((args[0]) === 'off') {
				    	if (isAnime) return replyca('Anime Sudah Off')
						anime.splice(from, 1)
						fs.writeFileSync('./database/anime.json', JSON.stringify(anime))
						replyca('「 *SUKSES* 」')
					} else {
						replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					}
					break
				case 'welcome':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (args.length < 1) return replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					if ((args[0]) === 'on') {
						if (isWelkom) return replyca('Welcome Sudah On')
						welkom.push(from)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						replyca('「 *SUKSES* 」')
					} else if ((args[0]) === 'off') {
					    if (isWelkom) return replyca('Welcome Sudah Off')
						welkom.splice(from, 1)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						replyca('「 *SUKSES* 」')
					} else {
						replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					}
					break 
			   case 'welcomeow':
				   if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					if (!isGroup) return grupinv(mess.only.group)
					if (args.length < 1) return replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					if ((args[0]) === 'on') {
						if (isWelkom) return replyca('Welcome Sudah On')
						welkom.push(from)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						replyca('「 *SUKSES* 」')
					} else if ((args[0]) === 'off') {
					    if (isWelkom) return replyca('Welcome Sudah Off')
						welkom.splice(from, 1)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						replyca('「 *SUKSES* 」')
					} else {
						replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					}
					break 
				case 'antilink':
				   if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (!isBotGroupAdmins) return replyca(mess.only.Badmin)
					if (args.length < 1) return replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					if ((args[0]) === 'on') {
						if (isAntiLink) return replyca('Anti Link Sudah On')
						antilink.push(from)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						replyca('「 *SUKSES* 」')
					} else if ((args[0]) === 'off') {
						if (!isAntiLink) return replyca('Anti Link Sudah Off')
						antilink.splice(from, 1)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						replyca('「 *SUKSES* 」')
					} else {
						replyca('on untuk mengaktifkan, off untuk menonaktifkan')
					}
					break
				case 'antibadword':
               if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
               if (args.length < 1) return replyca('on untuk mengaktifkan, off untuk menonaktifkan')
               if (args[0] === 'on') {
                  if (isBadWord) return replyca('Anti Badword Sudah On')
                  badword.push(from)
                  fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
                 	replyca('「 *SUKSES* 」')
               } else if (args[0] === 'off') {
                  if (!isBadWord) return replyca('Anti Badword Sudah Off')
                  badword.splice(from, 1)
                 	fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
                 	replyca('「 *SUKSES* 」')
               } else {
                 	replyca('on untuk mengaktifkan, off untuk menonaktifkan')
               }
               break
            case 'fxsxfdlx':
               if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					nuy.deleteMessage(from, { id: caa.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
            case 'addbadword':
               if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
               if (args.length < 1) return replyca( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
               const bw = body.slice(12)
               bad.push(bw)
               fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
               replyca('「 *SUKSES* 」')
               break
            case 'delbadword':
               if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
               if (args.length < 1) return replyca( `Kirim perintah ${prefix}delbadword [kata kasar]. contoh ${prefix}delbadword bego`)
               let dbw = body.slice(12)
               bad.splice(dbw)
               fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
               replyca('「 *SUKSES* 」')
               break 
            case 'listbadword':
               let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
               for (let i of bad) {
                    lbw += `➸ ${i.replace(bad)}\n`
               }
               await replyca(lbw)
               break
				case 'tebakgambar':
               if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
					anu = await fetchJson(`https://videfikri.com/api/tebakgambar`, {method: 'get'})
					bufferkkk = await getBuffer(anu.result.soal_gbr)
					setTimeout( () => {
					nuy.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: caa})
					}, 30000)
					setTimeout( () => {
					nuy.sendMessage(from, '_10 Detik lagi…_', text)
					}, 20000)
					setTimeout( () => {
					nuy.sendMessage(from, '_20 Detik lagi_…', text)
					}, 10000)
					setTimeout( () => {
					nuy.sendMessage(from, '_30 Detik lagi_…', text)
					}, 2500)
					setTimeout( () => {
					nuy.sendMessage(from, bufferkkk, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: caa })
					}, 0)
					await limitAdd(sender) 
					break
				case 'randombokep':
				   nuy.updatePresence(from, Presence.composing) 
			      if (isBanned) return replyca(mess.only.benned)    
				   if (isLimit(sender)) return replyca(limitend(pushname))
				   if (!isNsfw) return replyca(' *NSFW OF* ')
			   	if (!isUser) return replyca(mess.only.userXie)
				   data = fs.readFileSync('./Faa/18.js');
               jsonData = JSON.parse(data);
               randIndex = Math.floor(Math.random() * jsonData.length);
               randKey = jsonData[randIndex];
               randBokep = await getBuffer(randKey.image)
               randTeks = randKey.teks
               nuy.sendMessage(from, randBokep, image, {quoted: caa, caption: randTeks})
				   await limitAdd(sender) 
				   break
            case 'asupan':
               nuy.updatePresence(from, Presence.composing)
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
               data = fs.readFileSync('./Faa/asupan.js')
               jsonData = JSON.parse(data)
               randIndex = Math.floor(Math.random() * jsonData.length);
               randKey = jsonData[randIndex];
               asupan = await getBuffer(randKey.result)
               nuy.sendMessage(from, asupan, video, {quoted: caa, mimetype: 'video/mp4'})
               textnya =`Hai ${pushname}\nVideo Asupan Done`
               buttons = [{buttonId: `${prefix}asupann`, buttonText: {displayText: 'VIDEO ASUPAN'}, type: 1}]
               buttonsMessage = {
               contentText: `${textnya}`,
               footerText: "𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥",
               buttons: buttons,
               headerType: 1
               }
               prep = await nuy.prepareMessageFromContent(from,{buttonsMessage},{})
               nuy.relayWAMessage(prep)
               break
            case 'asupann':
               nuy.updatePresence(from, Presence.composing)
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
               data = fs.readFileSync('./Faa/asupan.js')
               jsonData = JSON.parse(data)
               randIndex = Math.floor(Math.random() * jsonData.length);
               randKey = jsonData[randIndex];
               asupan = await getBuffer(randKey.result)
               nuy.sendMessage(from, asupan, video, {quoted: caa, mimetype: 'video/mp4'})
               textnya =`Hai ${pushname}\nVideo Asupan Done`
               buttons = [{buttonId: `${prefix}asupan`, buttonText: {displayText: 'VIDEO ASUPAN'}, type: 1}]
               buttonsMessage = {
               contentText: `${textnya}`,
               footerText: "𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥",
               buttons: buttons,
               headerType: 1
               }
               prep = await nuy.prepareMessageFromContent(from,{buttonsMessage},{})
               nuy.relayWAMessage(prep)
               break
				case 'clone':
				   if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					if (!isGroup) return grupinv(mess.only.group)
					if (!isGroupAdmins) return replyca(mess.only.admin)
					if (args.length < 1) return replyca('Tag target yang ingin di clone')
					if (caa.message.extendedTextMessage === undefined || caa.message.extendedTextMessage === null) return replyca('Tag gan')
					mentioned = caa.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await nuy.getProfilePicture(id)
						buffer = await getBuffer(pp)
						nuy.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						replyca('Gagal')
					}
					break
//setting bot
				case 'setprefix':
				case 'setpref':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					prefix = args.join(" ")
					replyca(`Prefix Menjadi : ${prefix}`)
					break
				case 'setfx':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					fx = args.join(" ")
					replyca(`Hias Menjadi : ${fx}`)
					break
				case 'setlimit':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					limitt = args.join(" ")
					replyca(`Limit Menjadi : ${limitt}`)
					break 
				case 'setmemlimit':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					memberLimit = args.join(" ")
					replyca(`Limit Member Menjadi : ${memberLimit}`)
					break 
				case 'setwms':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					ini_nama = args.join(" ").split("/")
					namo = ini_nama[0].trim()
					ator = ini_nama[1].trim()
				   replyca(`Wm Sticker Menjadi : ${namo} • ${ator}`)
					break 
				case 'setnamebot':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					name = args.join(" ")
					replyca(`Name Bot Menjadi : ${name}`)
					break
            case 'setlol':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					LolApi = args.join(" ")
					replyca(`Apikey Lolhuman Menjadi : ${LolApi}`)
					break
            case 'settech':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					TechApi = args.join(" ")
					replyca(`Apikey Tech Menjadi : ${TechApi}`)
					break
            case 'setzeks':
					if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
					ZeksApi = args.join(" ")
					replyca(`Apikey Zeks Menjadi : ${ZeksApi}`)
					break
            case 'setthumb':
            case 'setffoto':
		         if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
				   encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
			   	media = await nuy.downloadMediaMessage(encmedia)
				   fs.writeFileSync('pinky.jpg', media)
				   replyca('Sukses Beb😉')
				   break
            case 'fxcmd': 
            case 'scmd':
               if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
               if (isQuotedSticker) {
               if (!jri) return replyca(`Penggunaan : ${prefix}${command} cmdnya dan tag stickernya`)
               var kodenya = caa.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
               sCmd(kodenya, jri)
               replyca("Done!")
               } else {
               replyca('Reply Stickernya')
               }
               break
            case 'delcmd':
               if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
               if (!isQuotedSticker) return replyca(`Penggunaan : ${prefix}${command} tagsticker`)
               var kodenya = caa.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
               _stikcmd.splice(getCommandPosition(kodenya), 1)
               fs.writeFileSync('./database/nuycmd.json', JSON.stringify(_stikcmd))
               replyca("Sukses")
               break
            case 'listscmd':
               let teksnyee = `「 LIST CMD STICKER 」`
               let cemde = [];
               for (let i of _stikcmd) {
               cemde.push(i.id)
               teksnyee += `\n\n*${fx} ID :* ${i.id}\n*${fx} Cmd :* ${i.chats}`
               }
               replyca(teksnyee)
               break
////////////
				case 'wait':
				   if (isBanned) return replyca(mess.only.benned)    
				   if (!isUser) return replyca(mess.only.userXie)
				   if (isLimit(sender)) return replyca(limitend(pushname))
					if ((isMedia && !caa.message.videoMessage || isQuotedImage) && args.length == 0) {
					replyca(mess.wait)
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo : caa
					media = await nuy.downloadMediaMessage(encmedia)
					await wait(media).then(res => {
					nuy.sendMessage(from, res.video, video, {quoted: caa, caption: res.teks.trim()})
					}).catch(err => {
						replyca(err)
					})
					} else {
						replyca('Foto Aja')
					}
					break 
			   case 'quran':
			      if (isBanned) return replyca(mess.only.benned)    
               if (!isUser) return replyca(mess.only.userXie)
               if (isLimit(sender)) return replyca(limitend(pushname))
					anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
					quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
					nuy.sendMessage(from, quran, text, {quoted: caa})
					await limitAdd(sender) 
					break
            case 'jadwaltvnow':
               if (isBanned) return replyca(mess.only.benned)    
               if (!isUser) return replyca(mess.only.userXie)
               nuy.updatePresence(from, Presence.composing)
               replyca(mess.wait)
               try {
               anu = await fetchJson(`http://api-melodicxt-2.herokuapp.com/api/jadwaltvnow?&apiKey=administrator`, {
               method: 'get'
               })
                 replyca(anu.result.jadwalTV)
               } catch {
                 replyca(mess.wait)
               }
               break
            case 'join':
               if (!isOwner && !caa.key.fromMe) return replyca(mess.only.ownerB)
               setTimeout( () => {
               nuy.query({json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]})
               replyca('Sukses Beb')
               }, 20000)
               setTimeout( () => {
               replyca('Oke Beb')
               }, 0)
               break
// premium user
            case 'ytdl':
			   case 'play':
               if (!jri) return replyca('Namanya Kak?')
			      res = await yts(jri)
			      let thumbInfo = ` 
╭𖧹「 *YOUTUBE DOWNLOAD* 」
┴𖧹
${fx} Judul: ${res.all[0].title}
${fx} ID Video: ${res.all[0].videoId}
${fx} Diupload Pada: ${res.all[0].ago}
${fx} Views: ${res.all[0].views}
${fx} Durasi: ${res.all[0].timestamp}
${fx} Channel: ${res.all[0].author.name}
${fx} Link Channel: ${res.all[0].author.url}
┬𖧹
╰──────𖧹
`
               buttons = [
                  {buttonId:`${prefix}play3 ${jri}`,buttonText:{displayText:'AUDIO'},type:1},
                  {buttonId:`${prefix}ytmp4 ${jri}`,buttonText:{displayText:'VIDEO'},type:1}
               ]
               imgnya = (await nuy.prepareMessageMedia({url:res.all[0].image},'locationMessage',{thumbnail:Buffer.alloc(0)})).locationMessage
               buttonsMessage = {
                  locationMessage: imgnya.message.locationMessage,
                  contentText: thumbInfo,
                  footerText: "Silahkan Pilih Dibawah\n\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥",
                  buttons: buttons,
                  headerType: 6
               }
               prep = await nuy.prepareMessageFromContent(from,{buttonsMessage},{})
               nuy.relayWAMessage(prep)
               break
            case 'play2':
               if (!isPrem) return replyca(mess.only.premium)
				   if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca(`Contoh: ${prefix + command} Melukis Senja`)
               query = args.join(" ")
               get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytplay?apikey=${LolApi}&query=${query}`)
               get_result = get_result.result
               get_info = get_result.info
               ini_txt = `Judul : ${get_info.title}\n`
               ini_txt += `Upload : ${get_info.uploader}\n`
               ini_txt += `Durasi : ${get_info.duration}\n`
               ini_txt += `Viewers : ${get_info.view}\n`
               ini_txt += `Like : ${get_info.like}\n`
               ini_txt += `Dislike : ${get_info.dislike}\n`
               ini_txt += `Description :\n ${get_info.description}\n`
               buffer = await getBuffer(get_info.thumbnail)
               nuy.sendMessage(from, buffer, image, {quoted: ftroli, caption: ini_txt})
               get_audio = await getBuffer(get_result.audio[3].link)
               nuy.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_info.title}.mp3`, quoted: ftroli })
               break
            case 'play3':
               if (isLimit(sender)) return replyca(limitend(pushname))
				   if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return await replyca(`Example: ${prefix + command} melukis senja`)
               query = args.join(" ")
               await fetchJson(`https://api.lolhuman.xyz/api/ytsearch?apikey=${LolApi}&query=${query}`)
               .then(async(result) => {
               await fetchJson(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${LolApi}&url=https://www.youtube.com/watch?v=${result.result[0].videoId}`)
               .then(async(result) => {
               result = result.result
               caption = `${fx} Title    : *${result.title}*\n`
               caption += `${fx} Size     : *${result.size}*`
               ini_buffer = await getBuffer(result.thumbnail)
               await nuy.sendMessage(from, ini_buffer, image, { quoted: caa, caption: caption })
               get_audio = await getBuffer(result.link)
               await nuy.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${result.title}.mp3`, quoted: caa })
               })
               })
               await limitAdd(sender) 
               break
            case 'ytmp3':
               if (isLimit(sender)) return replyca(limitend(pushname))
				   if (!isUser) return replyca(mess.only.userXie)
			    	if (args.length < 1) return replyca(`Urlnya mana kak?`)
               replyca(mess.wait)
               play = body.slice(7)
               if(!isUrl(args[0]) && !args[0].includes('youtu')) return replyca('Format link salah, gunakan link youtube')
               try {
               anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3/2?url=${play}&apikey=${ZeksApi}`)
               infomp3 = `*Audio Ditemukan*\n‣ Judul : ${anu.result.title}\n‣ Source : ${anu.result.source}\n‣ Ukuran : ${anu.result.size}\n\n_Mengirim file silahkan tunggu_\n\n_Jika audio tidak muncul download sendiri menggunakan link dibawah_\n‣ *link* : ${anu.result.link}`
               buffer = await getBuffer(anu.result.thumb)
               lagu = await getBuffer(anu.result.link)
               nuy.sendMessage(from, buffer, image, {quoted: caa, caption: infomp3})
               nuy.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: caa})
               } catch {
                 replyca(mess.error.Iv)
               }
               await limitAdd(sender) 
               break
            case 'ytmp4':
               if (isLimit(sender)) return replyca(limitend(pushname))
				   if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca(`Example: ${prefix + command} https://www.youtube.com/`)
               ini_link = args[0]
               get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${LolApi}&url=${ini_link}`)
               get_result = get_result.result
               ini_txt = `${get_result.title} - ${get_result.size}`
               buffer = await getBuffer(get_result.thumbnail)
               await nuy.sendMessage(from, buffer, image, { quoted: caa, caption: ini_txt })
               get_audio = await getBuffer(get_result.link)
               await nuy.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_result.title}.mp4`, quoted: caa })
               await limitAdd(sender) 
               break
            case 'yts':
            case 'ytsearch':
              if (!jri) return replyca(mess.error.stick)
              replyca(mess.wait)
              try {
              res = await yts(jri)
              a = `
「 *YOUTUBE SEARCH* 」

*Data Berhasil Ditemukan*\n`
for (let i of res.all) {
a += `
Title : ${i.title}
Views : ${i.views}
Upload : ${i.ago}
Durasi : ${i.timestamp}
Channel : ${i.author.name}
Link : ${i.url}`
}
               b = a.trim()
               sendFileFromUrl(res.all[0].image, image, {quoted: caa, caption: b})
               } catch (e) {
               console.log(e)
               reply(`${e}`)
               }
               break
            case 'smule':
               if (isLimit(sender)) return replyca(limitend(pushname))
			     	if (!isUser) return replyca(mess.only.userXie)
					if (args.length < 1) return replyca('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('c-ash.smule')) return replyca(mess.error.Iv)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/smule?link=${args[0]}`, {method: 'get'})
					if (anu.error) return replyca(anu.error)
					teks = `*Title* : ${anu.title}\n\n Tunggu Sebentar 1 menit Mungkun Agak Lama Karna Mendownload Video`
					thumb = await getBuffer(anu.thumb)
					nuy.sendMessage(from, thumb, image, {quoted: caa, caption: teks})
					buffer = await getBuffer(anu.result)
					nuy.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: caa, caption: 'Nih Gan'})
					await limitAdd(sender) 
					break
            case 'joox':
               if (isLimit(sender)) return replyca(limitend(pushname))
			     	if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca(`Example: ${prefix + command} Melukis Senja`)
               query = args.join(" ")
               get_result = await fetchJson(`https://api.lolhuman.xyz/api/jooxplay?apikey=${LolApi}&query=${query}`)
               get_result = get_result.result
               ini_txt = `Title : ${get_result.info.song}\n`
               ini_txt += `Artists : ${get_result.info.singer}\n`
               ini_txt += `Duration : ${get_result.info.duration}\n`
               ini_txt += `Album : ${get_result.info.album}\n`
               ini_txt += `Uploaded : ${get_result.info.date}\n`
               ini_txt += `Lirik :\n ${get_result.lirik}\n`
               thumbnail = await getBuffer(get_result.image)
               await nuy.sendMessage(from, thumbnail, image, { quoted: caa, caption: ini_txt })
               get_audio = await getBuffer(get_result.audio[0].link)
               await nuy.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.info.song}.mp3`, quoted: caa })
               await limitAdd(sender) 
               break
            case 'tiktok':
               if (isLimit(sender)) return replyca(limitend(pushname))
			     	if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca(`Example: ${prefix + command} https://vt.tiktok.com/`)
               ini_url = args[0]
               ini_url = `https://api.lolhuman.xyz/api/tiktok?apikey=${LolApi}&url=${ini_url}`
               get_result = await fetchJson(ini_url)
               ini_buffer = await getBuffer(get_result.result.link)
               nuy.sendMessage(from, ini_buffer, video, {quoted: caa})
               await limitAdd(sender) 
               break
            case 'tiktokaudio':
               if (isLimit(sender)) return replyca(limitend(pushname))
			     	if (!isUser) return replyca(mess.only.userXie)
               if (args.length == 0) return replyca(`Example: ${prefix + command} https://vt.tiktok.com/`)
               ini_link = args[0]
               get_audio = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${LolApi}&url=${ini_link}`)
               nuy.sendMessage(from, get_audio, audio, {quoted: caa, mimetype: 'audio/mp4', ptt:true})
               await limitAdd(sender) 
               break
// Akhir Fitur Premium 
		      case 'bpfont':
			      if (isBanned) return replyca(mess.only.benned)
			      if (isLimit(sender)) return replyca(limitend(pushname))
			      if (!isUser) return replyca(mess.only.userXie)
		      	bp = `${body.slice(8)}`
			      anu = await fetchJson(`https://api.terhambar.com/bpk?kata=${bp}`, {method: 'get'})
			      replyca (anu.text)
			      await limitAdd(sender) 
			      break
		      case 'quransurah':
			      if (isBanned) return replyca(mess.only.benned)
			      if (!isUser) return replyca(mess.only.userXie)
			      if (isLimit(sender)) return replyca(limitend(pushname))
			      replyca(mess.wait)
			      surah = `${body.slice(12)}`
		       	anu = await fetchJson(`https://api.zeks.xyz/api/quran?no=${surah}&apikey=${ZeksApi}`)
			      quran = `Surah Al-Qur\`an Nomer: *${surah}*\nSurah: *${anu.surah}*\nDiturunkan Dikota: *${anu.type}*\nJumlah Ayat: *${anu.jumlah_ayat}*\n\n*${anu.ket}\n=============================\n`
			      for (let surah of anu.quran) {
			      quran += `${surah.number}\n${surah.text}\n${surah.translation_id}\n=====================\n`
		        	}
			      replyca(quran.trim())
		       	await limitAdd(sender) 
			      break
            case 'asmaulhusna':
               if (isBanned) return replyca(mess.only.benned)    
					if (!isUser) return replyca(mess.only.userXie)
					if (isLimit(sender)) return replyca(limitend(pushname))
               get_result = await fetchJson(`http://api.lolhuman.xyz/api/asmaulhusna?apikey=${LolApi}`)
               get_result = get_result.result
               ini_txt = `No : ${get_result.index}\n`
               ini_txt += `Latin: ${get_result.latin}\n`
               ini_txt += `Arab : ${get_result.ar}\n`
               ini_txt += `Indonesia : ${get_result.id}\n`
               ini_txt += `English : ${get_result.en}`
               replyca(ini_txt)
               await limitAdd(sender) 
               break
		      case 'pantun':
       			if (isBanned) return replyca(mess.only.benned)    
      			if (!isUser) return replyca(mess.only.userXie)
      			gatauda = body.slice(8)					
      			anu = await fetchJson(`https://api.zeks.xyz/api/pantun?apikey=${ZeksApi}`, {method: 'get'})
      			replyca(anu.result.pantun)
	       		break
		      case 'jamdunia':
		         if (isLimit(sender)) return replyca(limitend(pushname))
			      if (isBanned) return replyca(mess.only.benned)
			      if (!isUser) return replyca(mess.only.userXie)
		      	replyca(mess.wait)
		         jamdunia = `${body.slice(10)}`
			      anu = await fetchJson(`https://api.i-tech.id/tools/jam?key=${TechApi}&kota=${jamdunia}`, {method: 'get'})
        			wtime = `*${anu.timezone}*\n*${anu.date}*\n*${anu.time}*`
      			nuy.sendMessage(from, wtime, text, {quoted: caa})
        			await limitAdd(sender) 
       			break
            case 'infocovid':  
               if (isLimit(sender)) return replyca(limitend(pushname))
			      if (isBanned) return replyca(mess.only.benned)
			      if (!isUser) return replyca(mess.only.userXie)
               anu = await fetchJson(`https://videfikri.com/api/covidindo/`)
               anu1 = `${fx} *NEGARA* : ${anu.result.country}\n`
               anu1 += `${fx} *POSITIF* : ${anu.result.positif}\n`
               anu1 += `${fx} *SEMBUH* : ${anu.result.sembuh}\n`
               anu1 += `${fx} *MENINGGAL* : ${anu.result.meninggal}\n`
               anu1 += `${fx} *RAWAT* : ${anu.result.dalam_perawatan}\n`
               replyca(anu1)
               await limitAdd(sender)	
               break
            case 'infogempa':  
               if (isLimit(sender)) return replyca(limitend(pushname))
			      if (isBanned) return replyca(mess.only.benned)
			      if (!isUser) return replyca(mess.only.userXie)           
               anu = await fetchJson(`https://videfikri.com/api/infogempa/`)
               anu1 = `${fx} *WILAYAH* : ${anu.result.wilayah}\n`
               anu1 += `${fx} *BUJUR* : ${anu.result.bujur}\n`
               anu1 += `${fx} *LINTANG* : ${anu.result.lintang}\n`
               anu1 += `${fx} *WAKTU* : ${anu.result.waktu}\n` 
               anu1 += `${fx} *MAGNITUDO* : ${anu.result.magnitudo}\n` 
               anu1 += `${fx} *KEDALAMAN* : ${anu.result.kedalaman}\n` 
               anu1 += `${fx} *MAP* : ${anu.result.map}\n`
               nuy.sendMessage(from, anu1, text,{quoted: ftroli})
               await limitAdd(sender)
               break
     		   case 'tomp3':
               if (isBanned) return replyca(mess.only.benned)    
               if (isLimit(sender)) return replyca(limitend(pushname))
			   	if (!isUser) return replyca(mess.only.userXie)
              	nuy.updatePresence(from, Presence.composing) 
					if (!isQuotedVideo) return replyca('*Reply Video Nya Kak*')
					encmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await nuy.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return replyca('Gagal, pada saat mengkonversi video ke mp3')
					bufferlkj = fs.readFileSync(ran)
					nuy.sendMessage(from, bufferlkj, audio, {mimetype: 'audio/mp4', quoted: caa})
					fs.unlinkSync(ran)
					})
					await limitAdd(sender) 
					break
				case 'setppbot':
					if (!isOwner) return replyca(mess.only.owner)
				   nuy.updatePresence(from, Presence.composing) 
					if (!isQuotedImage) return replyca(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(caa).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await nuy.downloadAndSaveMediaMessage(enmedia)
					await nuy.updateProfilePicture(botNumber, media)
					replyca('Makasih profil barunya☺️')
					break
			   case 'google':
               const googleQuery = body.slice(8)
               if (isBanned) return replyca(mess.only.benned)    
			   	if (!isUser) return replyca(mess.only.userXie)
		   		if (isLimit(sender)) return replyca(limitend(pushname))
               if (googleQuery == undefined || googleQuery == ' ') return replyca(`*Hasil Pencarian : ${googleQuery}* tidak ditemukan`)
               google({ 'query': googleQuery }).then(results => {
               let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
               for (let i = 0; i < results.length; i++) {
                   vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
               }
                   replyca(vars)
               }).catch(e => {
                   console.log(e)
               nuy.sendMessage(from, 'Google Error : ' + e);
               })
               await limitAdd(sender) 
               break
            case 'addbucin':
               if (!isOwner) return replyca(mess.only.owner)
				   huu = body.slice(10)
					bucinrandom.push(huu)
					fs.writeFileSync('./database/bucin.json', JSON.stringify(bucinrandom))
					replyca(`Sukses, Kata \n*${huu}*\n Telah Ditambahkan ke database`)
					break
            case 'bucin':
            case 'quotebucin':
               if (isBanned) return replyca(mess.only.benned)    
               if (!isUser) return replyca(mess.only.userXie)
               hasil = bucinrandom[Math.floor(Math.random() * (bucinrandom.length))]
               nuy.sendMessage(from, '*'+hasil+'*', text, {quoted: caa})
               await limitAdd(sender)
               break
            case 'beritahoax':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userXie)
               nuy.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infohoax`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Gambar* : ${i.image}\n*Title* : ${i.title}\n*link* : ${i.link}\n*tag* : ${i.tag}\n=================\n`
					}
					replyca(teks.trim())
					await limitAdd(sender)
					break
            case 'spamsw':
               if (!isOwner && !mek.key.fromMe) return replyca(mess.only.ownerB)
               if (!args) return replyca(`Penggunaan ${prefix}spamsw teks/jumlah`)
				   argzi = args.split("/")
			      if (!argzi) return replyca(`Penggunaan ${prefix}spam teks|jumlah`)
				   if (Number(argzi[1]) >= 10000000) return replyca('Kebanyakan!')
				   if (isNaN(argzi[1])) return replyca(`harus berupa angka`)
				   for (let i = 0; i < argzi[1]; i++){
			      nuy.sendMessage('status@broadcast', argzi[0], MessageType.text)
               }
               break	
            case 'addsticker':
            case 'adds':
            case 'addstic':
            case 'addstick':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					if (!isQuotedSticker) return replyca('Reply stiker')
					nm = body.slice(12)
					if (!nm) return replyca('Nama sticker nya apa?')
					boij = JSON.parse(JSON.stringify(caa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await nuy.downloadMediaMessage(boij)
					stick.push(`${nm}`)
					fs.writeFileSync(`./database/stik/${nm}.webp`, delb)
					fs.writeFileSync('./database/stick.json', JSON.stringify(stick))
					textnya = `「 *SUKSES* 」\nSilahkan Klik Dibawah Jika Ingin Melihat Nama Sticker`
					buttons = [{buttonId: `${prefix}stickerlist`,buttonText:{displayText: 'List Sticker'},type:1}]
               buttonsMessage = {
               contentText: `${textnya}`,
               footerText: '\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥',
               buttons: buttons,
               headerType: 1
               }
               prep = await nuy.prepareMessageFromContent(from,{buttonsMessage},{})
               nuy.relayWAMessage(prep)
               break
            case 'stickerlist':
				case 'liststicker':
				   if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					teks = '*Sticker List :*\n\n'
					for (let awokwkwk of stick) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${stick.length}*\n\n*Untuk mengambil sticker silahkan reply pesan ini dengan caption nama sticker*`
					nuy.sendMessage(from, teks.trim(), extendedText, { quoted: caa, contextInfo: { "mentionedJid": stick } })
					break
				case 'delsticker':
				   if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					try {
					 nmm = body.slice(12)
					 wanu = stick.indexOf(nmm)
					 stick.splice(wanu, 1)
					 fs.unlinkSync(`./database/stik/${nmm}.webp`)
					 replyca('「 *SUKSES* 」')
					} catch (err){
					console.log(err)
					replyca(mess.error.stick)
					}
					break
            case 'addvn':
					if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					if (!isQuotedAudio) return replyca('Reply audio')
					nm = body.slice(7)
					if (!nm) return replyca('Nama vn nya apa?')
					boij = JSON.parse(JSON.stringify(caa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await nuy.downloadMediaMessage(boij)
					vien.push(`${nm}`)
					fs.writeFileSync(`./database/vn/${nm}.mp3`, delb)
					fs.writeFileSync('./database/vien.json', JSON.stringify(vien))
					textnya = `「 *SUKSES* 」\nSilahkan Klik Dibawah Jika Ingin Melihat Nama Audio`
					buttons = [{buttonId: `${prefix}vnlist`,buttonText:{displayText: 'List Audio'},type:1}]
               buttonsMessage = {
               contentText: `${textnya}`,
               footerText: '\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥',
               buttons: buttons,
               headerType: 1
               }
               prep = await nuy.prepareMessageFromContent(from,{buttonsMessage},{})
               nuy.relayWAMessage(prep)
               break
            case 'vnlist':
				case 'listvn':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					teks = '*VN List :*\n\n'
					for (let awokwkwk of vien) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${vien.length}*\n\n_Untuk mengambil vn silahkan reply pesan ini dengan caption nama vn_`
					nuy.sendMessage(from, teks.trim(), extendedText, { quoted: caa, contextInfo: { "mentionedJid": vien } })
					break
			   case 'delvn':
					if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					try {
					 nmm = body.slice(7)
					 wanu = vien.indexOf(nmm)
					 vien.splice(wanu, 1)
					 fs.unlinkSync(`./database/vn/${nmm}.mp3`)
					 replyca('「 *SUKSES* 」')
					} catch (err){
					console.log(err)
					replyca(mess.error.stick)
					}
					break
            case 'addimage':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					if (!isQuotedImage) return replyca('Reply image')
					nm = body.slice(10)
					if (!nm) return replyca('Nama image nya apa?')
					boij = JSON.parse(JSON.stringify(caa).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await nuy.downloadMediaMessage(boij)
					image.push(`${nm}`)
					fs.writeFileSync(`./database/img/${nm}.jpg`, delb)
					fs.writeFileSync('./database/image.json', JSON.stringify(image))
					textnya = `「 *SUKSES* 」\nSilahkan Klik Dibawah Jika Ingin Melihat Nama Image`
					buttons = [{buttonId: `${prefix}imagelist`,buttonText:{displayText: 'List Image'},type:1}]
               buttonsMessage = {
               contentText: `${textnya}`,
               footerText: '\n𝐴𝑢𝑡ℎ𝑜𝑟 𝐹𝑥𝑆𝑥',
               buttons: buttons,
               headerType: 1
               }
               prep = await nuy.prepareMessageFromContent(from,{buttonsMessage},{})
               nuy.relayWAMessage(prep)
               break
            case 'imagelist':
				case 'listimage':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					teks = '*Image List :*\n\n'
					for (let awokwkwk of image) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${image.length}*\n\n*Untuk mengambil image silahkan reply pesan ini dengan caption nama image*`
					nuy.sendMessage(from, teks.trim(), extendedText, { quoted: caa, contextInfo: { "mentionedJid": image } })
					break
				case 'delimage':
               if (isBanned) return replyca(mess.only.benned)
               if (!isUser) return replyca(mess.only.userB)
					try {
					 nmm = body.slice(10)
					 wanu = image.indexOf(nmm)
					 image.splice(wanu, 1)
					 fs.unlinkSync(`./database/img/${nmm}.jpg`)
					 replyca('「 *SUKSES* 」')
					} catch (err){
					console.log(err)
				   replyca(mess.error.stick)
					}
					break
          case 'fake1':
            menunya = `Done Owner`
            ppbotnya = 'https://i.ibb.co/xM9j6sZ/xieee.jpg' 
            imagi['jpegThumbnail'] = await getBuffer(ppbotnya);
            imagi.fileLength = 5000000000;
            const frreply =     {
					"productMessage": {
						"product": {
							"productImage": imagi,
							"productId": "4361485153945698",
							"title": `XIE BOT`,
							"description" : `${menunya}`,
	                  "productImageCount": 1,
	                  "currencyCode": "IDR",
	                  "url": "https://wa.me/6283815956151" ,
	                  "priceAmount1000": "50000000"
						 },
					  "businessOwnerJid": "6283815956151@s.whatsapp.net"
				   }
			   }
            emsce = await nuy.prepareMessageFromContent(from, frreply, {quoted: ftroli, sendEphemeral: true})
            nuy.relayWAMessage(emsce)
            break
				default:
                  if (isGroup && budy != undefined) {
					} else {
						console.log(color('[PINKY]','aqua'), 'Command Tidak Ada', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'white'))
		}
	})
}
starts()

/*
* Base By FxSx & FdlX
* Remake By NuyFaa
* Scriptnya Jangan Di Jual Mau Pun Ngaku² Ini Script Lu
* Gua Dah Bikin Capek² Malah Ga Di Hargai
*/

/*
* Thanks Banget Rest Apinya
* Fitur Kebanyakan Rest Api Lolhuman Thanks 👋
* Thanks Juga Buat Rest Api ZeksApi 👋
* Thanks Juga Buat Rest Api TechApi 👋
*/

/*
* Note 
* Kalo Ada Fitur Ga Work Benerin! Jangan Mau Enak Nya Aja
* Utss Jangan Lupa [ Niat ] Remake Yg Bener Biar Work
* Jangan Asal-Asalan
*/


