// Scpirt By Xie Dev Team
// Jangan Di Jual!
// Recode Sewajarnya Aja
// Nama Yg Punya Scpirtnya Jangan Dihapus!!
// Bot Xie Sudah Dilengkapi Dengan
// Cmd Sticker + Cmd Button + Anti Spam
// Jika Ingin Yang Banyak Add Sendiri!
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
const fs = require('fs')
const util = require('util')
const axios = require("axios")
const moment = require('moment-timezone')
const { spawn, exec, execSync } = require('child_process')
const fetch = require('node-fetch')
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI()
const FormData = require('form-data')
const ig = require('insta-fetcher');
const hx = require("hxz-api")
const ffmpeg = require('fluent-ffmpeg')
const yts = require( 'yt-search')
const googleImage = require('g-i-s')
const ms = require('parse-ms')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const cd = 4.32e+7
const lolis = require('lolis.life')
const loli = new lolis()

// Lib
const { bahasa } = require('./lib/bahasa')
const { fetchJson } = require('./lib/fetcher')
const { antiSpam } = require('./lib/antispam')
const { color, bgcolor } = require('./lib/color')
const { mediafireDl } = require('./lib/mediafire.js')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { addCommands, checkCommands, deleteCommands } = require('./lib/commands')
const { getBuffer, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
// End Lib

// Database
const userXie = JSON.parse(fs.readFileSync('./database/userXie.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const _stikcmd = JSON.parse(fs.readFileSync('./database/scmd.json'))
const blocked = JSON.parse(fs.readFileSync('./database/blocked.json'))
const bancht = JSON.parse(fs.readFileSync('./database/banchat.json'))
const commandsDB = JSON.parse(fs.readFileSync('./database/commands.json'))
const afk = JSON.parse(fs.readFileSync('./database/afk.json'))
// End Database

// Kontak
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:FxSx\n'
            + 'ORG:Xie-Dev-Team;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6283815956151:+62 838-1595-6151\n'
            + 'END:VCARD'
// End Kontak

// Settings
public = false
prefix = "#"
fx = "▢"
namabot = "Xie Bot"
zeks = "apivinz"
ban = []
// End Settings

// Sticker Cmd
const sCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _stikcmd.push(obj)
    fs.writeFileSync('./database/scmd.json', JSON.stringify(_stikcmd))
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
// End Sticker Cmd

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Tanggal
	function tanggal(){
   myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
	myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu'];
	var tgl = new Date();
	var day = tgl.getDate();
	bulan = tgl.getMonth();
	var thissDay = tgl.getDay(),
	thisDay = myDays[thissDay];
	var yy = tgl.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
   }
// End Tanggal

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
	const xiedev = new WAConnection()
	xiedev.logger.level = 'warn'
	console.log(banner.string)
	xiedev.version = [2, 2119, 6]
	xiedev.on('qr', () => {
		console.log(color('[','aqua'), color('SCAN','aqua'), color(']','aqua'), color('Scpit Xie Dev Team', 'yellow'))
	})

	fs.existsSync('./XieDev.json') && xiedev.loadAuthInfo('./XieDev.json')
	xiedev.on('connecting', () => {
		start('2', 'Proses...')
	})
	xiedev.on('open', () => {
		success('2', 'Done!')
	})
	await xiedev.connect({timeoutMs: 30*1000})
   fs.writeFileSync('./XieDev.json', JSON.stringify(xiedev.base64EncodedAuthInfo(), null, '\t'))


// Time Ucapan Waktu
	const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
   if (time2 < "24:59:00") {
      var ucapanWaktu = "Selamat Malam"
   }
   if (time2 < "19:00:00") {
      var ucapanWaktu = "Selamat Senja"
   }
   if (time2 < "18:00:00") {
      var ucapanWaktu = "Selamat Sore"
   }
   if (time2 < "15:00:00") {
      var ucapanWaktu = "Selamat Siang"
   }
   if (time2 < "11:00:00") {
      var ucapanWaktu = "Selamat Pagi"
   }
   if (time2 < "05:00:00") {
      var ucapanWaktu = "Selamat Malam"
   }
// End Time Ucapan Waktu

// Welcome
   xiedev.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await xiedev.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await xiedev.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*Welcome* @${num.split('@')[0]}`
				halo = await fs.readFileSync('./mp3/halo.mp3')
				let buff = await getBuffer(ppimg)
			   xiedev.sendMessage(mdata.id, halo, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]}`, orderTitle: `Welcome @${num.split('@')[0]}`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true, seconds: 1000000000})
			   const fduct = {
					"productMessage": {
						"product": {
							"productImage": buff,
							"productId": "6017724624966444",
							"title": `${teks}`,
							"description": "Mohon Patuhi Peraturan Di Group Ini!",
							"currencyCode": "IDR",
							"priceAmount1000": "20000",
							"productImageCount": 1,
							"salePriceAmount1000": "0"
						},
						"businessOwnerJid": "6283818221226@s.whatsapp.net"
					}
				}
            emsce = await xiedev.prepareMessageFromContent(mdata.id, fduct, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]}`, orderTitle: `Welcome @${num.split('@')[0]}`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}})
            xiedev.relayWAMessage(emsce)
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await xiedev.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara @${num.split('@')[0]}👋`
				jamet = await fs.readFileSync('./mp3/jamet.mp3')
				let buff = await getBuffer(ppimg)
				xiedev.sendMessage(mdata.id, buff, MessageType.image, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Sayonara @${num.split('@')[0]}`, orderTitle: `Sayonara @${num.split('@')[0]}`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }caption: teks, contextInfo: {"mentionedJid": [num]}})
			   xiedev.sendMessage(mdata.id, jamet, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Sayonara @${num.split('@')[0]}`, orderTitle: `Sayonara @${num.split('@')[0]}`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true, seconds: 1000000000})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
// End Welcome

// Block User Tlpn/Vc
	xiedev.on('CB:Blocklist', json => {
		if (blocked.length > 1) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
// End Block User Tlpn/Vc

	xiedev.on('message-new', async (xie) => {
		   try {
		   if (!xie.hasNewMessage) return
		   xie = xie.messages.all()[0]
			if (!xie.message) return
			if (xie.key && xie.key.remoteJid == 'status@broadcast') return
			if (xie.key.id.startsWith('3EB0') && xie.key.id.length === 12) return
			global.prefix
			global.blocked
			xie.message = (Object.keys(xie.message)[0] === 'ephemeralMessage') ? xie.message.ephemeralMessage.message : xie.message
			const content = JSON.stringify(xie.message)
			const from = xie.key.remoteJid
			const type = Object.keys(xie.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')
         const cmd = (type === 'conversation' && xie.message.conversation) ? xie.message.conversation : (type == 'imageMessage') && xie.message.imageMessage.caption ? xie.message.imageMessage.caption : (type == 'videoMessage') && xie.message.videoMessage.caption ? xie.message.videoMessage.caption : (type == 'extendedTextMessage') && xie.message.extendedTextMessage.text ? xie.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(xie.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(xie.message.stickerMessage.fileSha256.toString('hex')) !== undefined) ? getCmd(xie.message.stickerMessage.fileSha256.toString('hex')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
			body = (type === 'listResponseMessage' && xie.message.listResponseMessage.title) ? xie.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && xie.message.buttonsResponseMessage.selectedButtonId) ? xie.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && xie.message.conversation.startsWith(prefix)) ? xie.message.conversation : (type == 'imageMessage') && xie.message.imageMessage.caption.startsWith(prefix) ? xie.message.imageMessage.caption : (type == 'videoMessage') && xie.message.videoMessage.caption.startsWith(prefix) ? xie.message.videoMessage.caption : (type == 'extendedTextMessage') && xie.message.extendedTextMessage.text.startsWith(prefix) ? xie.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(xie.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(xie.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(xie.message.stickerMessage.fileSha256.toString('base64')) : ""
			budy = (type === 'conversation') ? xie.message.conversation : (type === 'extendedTextMessage') ? xie.message.extendedTextMessage.text : ''
			listbut = (type == 'listResponseMessage') ? xie.message.listResponseMessage.title : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const arg = body.substring(body.indexOf(' ') + 1)
			const args = body.trim().split(/ +/).slice(1)
			const ar = args.map((v) => v.toLowerCase())
			chats = (type === 'conversation') ? xie.message.conversation : (type === 'extendedTextMessage') ? xie.message.extendedTextMessage.text : ''
		   const argss = chats.slice(command.length + 2, chats.length)
			const q = args.join(' ')
			const isCmd = body.startsWith(prefix)

			const botNumber = xiedev.user.jid
			const ownerNumber = ["6283873517269@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? xie.participant : xie.key.remoteJid
			const groupMetadata = isGroup ? await xiedev.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const itsMe = sender == botNumber ? true : false
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
         const isBanchat = isGroup ? bancht.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUserXie = userXie.includes(sender)
			const isBanned = ban.includes(sender)
			const conts = xie.key.fromMe ? xiedev.user.jid : xiedev.contacts[sender] || { notify: jid.replace(/@.+/, '') }
         const pushname = xie.key.fromMe ? xiedev.user.name : conts.notify || conts.vname || conts.name || '-'
			const mentionByTag = type == "extendedTextMessage" && xie.message.extendedTextMessage.contextInfo != null ? xie.message.extendedTextMessage.contextInfo.mentionedJid : []
			const mentionByReply = type == "extendedTextMessage" && xie.message.extendedTextMessage.contextInfo != null ? xie.message.extendedTextMessage.contextInfo.participant || "" : ""
			const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
			mention != undefined ? mention.push(mentionByReply) : []
			const mentionUser = mention != undefined ? mention.filter(n => n) : []
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				xiedev.sendMessage(from, teks, text, {quoted:xie})
			}
			const sendMess = (hehe, teks) => {
				xiedev.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? xiedev.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : xiedev.sendMessage(from, teks.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": memberr}})
			}
			const ftroli = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message:{"orderMessage":{"orderId":"174238614569481","thumbnail": fs.readFileSync('./eror/fxsxdev.jpg'),"itemCount": 1,"status":"INQUIRY","surface":"CATALOG","message": name,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}}
			
			const fakethumb = (teks, yes) => {
            xiedev.sendMessage(from, teks, image, {thumbnail: fs.readFileSync('./eror/asistenxie.jpg'), quoted: xie, caption: yes})
         }
         const grupinv = (teks) => {
        	    grup = xiedev.prepareMessageFromContent(from, { "groupInviteMessage": { "groupJid": '6283815956151-1616169743@g.us', "inviteCode": "", "groupName": "Xie Dev Team", "footerText": "Author FxSx", "jpegThumbnail": fs.readFileSync('./eror/asistenxie.jpg'), "caption": teks}}, {quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": "Xie Dev Team","mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg"}}})
             xiedev.relayWAMessage(grup)
         }
         async function faketoko(teks, url_image, title, code, price) {
                var punya_wa = "0@s.whatsapp.net"
                var ini_buffer = await getBuffer(url_image)
                const ini_cstoko = {
                    contextInfo: {
                        participant: punya_wa,
                        remoteJid: 'status@broadcast',
                        quotedMessage: {
                            productMessage: {
                                product: {
                                    currencyCode: code,
                                    title: title,
                                    priceAmount1000: price,
                                    productImageCount: 1,
                                    productImage: {
                                        jpegThumbnail: ini_buffer
                                    }
                                },
                                businessOwnerJid: "0@s.whatsapp.net"
                            }
                        }
                    }
                }
             await xiedev.sendMessage(from, teks, text, ini_cstoko)
         }
         const sendMesss = async (hehe, teks, desc, gam, but = [], options = {}) => {
				data = fs.readFileSync('./lib/imagexie.js');
            jsonData = JSON.parse(data);
            randXiedev = Math.floor(Math.random() * jsonData.length);
            randKey = jsonData[randXiedev];
            buff = await getBuffer(randKey.image)
				imgnya = await xiedev.prepareMessage(from, buff, location, {thumbnail: buff})
         const buttonMessages = {
            locationMessage: imgnya.message.locationMessage,
            contentText: teks,
            footerText: desc,
            buttons: but,
            headerType: 6
         }
         xiedev.sendMessage(hehe, buttonMessages, MessageType.buttonsMessage, options)
         }
         
         const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
             buff = await getBuffer('https://i.ibb.co/vhygq40/xie.jpg')
             imgnya = await xiedev.prepareMessage(from, buff, location, {thumbnail: buff, quoted: ftroli})
         const buttonMessages = {
             locationMessage: imgnya.message.locationMessage,
             contentText: text1,
             footerText: desc1,
             buttons: but,
             headerType: 6
         }
         xiedev.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
         }

         const sendButtLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
             data = fs.readFileSync('./lib/imagexie.js');
             jsonData = JSON.parse(data);
             randXiedev = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randXiedev];
             buff = await getBuffer(randKey.image)
             imgnya = await xiedev.prepareMessage(from, buff, location, {thumbnail: buff, quoted: ftroli})
         const buttonMessages = {
             locationMessage: imgnya.message.locationMessage,
             contentText: text1,
             footerText: desc1,
             buttons: but,
             headerType: 6
         }
         xiedev.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
         }
         
         const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
         const buttonMessage = {
           contentText: text1,
           footerText: desc1,
           buttons: but,
           headerType: 1,
         };
         xiedev.sendMessage(
           id,
           buttonMessage,
           MessageType.buttonsMessage,
           options
         );
         };
         
         const daftar1 = `Hai ${pushname}\nKamu Belum Terdaftar Silahkan Klik Dibawah`
         const daftar2 = 'Author FxSx'
         const daftar3 = [
         {
            buttonId: `${prefix}daftar`,
            buttonText: {
              displayText: `*DAFTAR USER*`,
            },
            type: 1,
         },]
         
         const banned1 = `Maaf ${pushname}\nNomer Kamu Sudah Dibanned Oleh Owner`
         const banned2 = 'Jika Ingin Dibuka Banned Nya Silahkan Hubungi Owner!\n\nAuthor FxSx'
         const banned3 = [
         {
            buttonId: `${prefix}owner`,
            buttonText: {
              displayText: `*OWNER XIE*`,
            },
            type: 1,
         },]
			
			const adminG1 = `Maaf ${pushname}\nCmd Ini Khusus Admin Grup`
			const adminG2 = 'Jika Ingin Jadi Admin Hubungi Owner Grup:v'
			const adminG3 = [
			{
			   buttonId: `${prefix}pemilikgc`,
			   buttonText: {
			     displayText: `PEMILIK GRUP`,
			   },
			   type: 1,
			},]
			
			function monospace(string) {
         return '```' + string + '```'
         }   
			
			const sendMediaURL = async(url, text="", mids=[]) =>{
         if(mids.length > 0){
          text = normalizeMention(to, text, mids)
         }
         const fn = Date.now() / 10000;
         const filename = fn.toString()
         let mime = ""
         var download = function (uri, filename, callback) {
           request.head(uri, function (err, res, body) {
             mime = res.headers['content-type']
             request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
         };
         download(url, filename, async function () {
           console.log('done');
           let media = fs.readFileSync(filename)
           let type = mime.split("/")[0]+"Message"
           if(mime === "image/gif"){
            type = MessageType.video
            mime = Mimetype.gif
          }
          if(mime.split("/")[0] === "audio"){
            mime = Mimetype.mp4Audio
          }
          xiedev.sendMessage(from, media, type, { quoted: xie, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
          fs.unlinkSync(filename)
         });
         }
         const sendFileFromUrl = async(link, type, options) => {
                hasil = await getBuffer(link)
                 xiedev.sendMessage(from, hasil, type, options).catch(e => {
                  fetch(link).then((hasil) => {
                    xiedev.sendMessage(from, hasil, type, options).catch(e => {
                    xiedev.sendMessage(from, { url : link }, type, options).catch(e => {
                  console.log(e)
                })
              })
            })
          })
         }
			const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './stik' + names + '.png', async function () {
                    console.log('selesai');
                    let filess = './stik' + names + '.png'
                    let asw = './stik' + names + '.webp'
                    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                        let media = fs.readFileSync(asw)
                        xiedev.sendMessage(to, media, MessageType.sticker, {quoted: xie})
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                    });
              });
         }

			mess = {
				wait: '*Sedang Diproses*',
				sucess: '*Sukses*',
				error: {
					eror: '*Eror*',
					link: '*Link Invalid*'
				},
				only: {
					group: '*Khusus Group*',
					benned: '*Maaf Nomer Kamu Tidak Bisa Gunakan Xie Bot*',
					ownerG: '*Khusus Owner Group*',
					ownerXie: '*Khusus Owner Xie*',
					premium: '*Khusus Premium Xie*',
					userXiee: `Hai ${pushname}\nKamu Belum Terdaftar\nSilahkan Ketik : ${prefix}daftar`,
					admin: '*Khusus Admin Group*',
					Badmin: '*Jadikan Xie Bot Admin Dulu*'
				}
			}
         
         if (itsMe){
         if(chats.toLowerCase() == `${prefix}self`){
         public = false
         reply(`Success`, `Status : Self`)
         }
         if (chats.toLowerCase() == 'status'){
         reply(`STATUS : ${public ? 'Public' : 'Self'}`)
         }
         }
         if (!public){
         if (!xie.key.fromMe) return
         }
         
         for (let i = 0; i < commandsDB.length ; i++) {
         if (budy == commandsDB[i].pesan) {
         xiedev.sendMessage(from, commandsDB[i].balasan, text, {quoted: xie})
         }
         }
         
         if (isCmd && antiSpam.isFiltered(from) && !isGroup) {
         console.log(color('[SPAM]', 'aqua'), color(time, 'blue'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'))
         return reply('Mohon Jangan Spam\nKasih Waktu 8 Detik!')
         }
        
         if (isCmd && antiSpam.isFiltered(from) && isGroup) {
         console.log(color('[SPAM]', 'aqua'), color(time, 'blue'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'blue'), 'in', color(groupName, 'aqua'))
         return reply('Mohon Jangan Spam\nKasih Waktu 8 Detik!')
         }
         
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
         const isImage = (type === 'imageMessage')
         const isVideo = (type === 'videoMessage')
         const isStickers = (type == 'stickerMessage')
         const isListMsg = (type == 'listResponseMessage')
         const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
         const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
         const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
         const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
         const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
         const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
         const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
         const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')
         const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')

         // Mode Afk Simpel
         for (let x of mentionUser) {
                if (afk.hasOwnProperty(x.split('@')[0])) {
                    ini_txt = "User Yang Anda Tag/Reply Sedang Afk"
                    if (afk[x.split('@')[0]] != "") {
                        ini_txt += "Dengan Alasan : " + afk[x.split('@')[0]]
                    }
                    reply(ini_txt)
                }
            }
         if (afk.hasOwnProperty(sender.split('@')[0])) {
            reply(`Anda Telah Keluar Dari Mode Afk\n\nSaat Nya Mulu Yak ${pushname}`)
              delete afk[sender.split('@')[0]]
          fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
         }

         if (budy.startsWith('>')){
         try {
     	   if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
         return xiedev.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: xie})
         } catch(err) {
         e = String(err)
         reply(e)
         }
         }
         
         if (budy.startsWith('=>')){
         if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
         console.log(color('[EVAL]'), color(moment(xie.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Eval V2 :~`))
         ras = budy.slice(1)
         function _(rem) {
         ren = JSON.stringify(rem,null,2)
         pes = util.format(ren)
         reply(monospace(pes))
         }
         try{q
         reply(require('util').format(eval(`(async () => { ${ras} })()`)))
         } catch(err) {
         e = String(err)
         reply(monospace(e))
         }
         }
         
         if (isCmd && !isGroup) console.log(color('[ CMD PRIVAT ]'), color(time, 'aqua'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'))
         if (isCmd && isGroup) console.log(color('[ CMD GROUP ]'), color(time, 'aqua'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'), 'in', color(groupName, 'yellow'))
			if (listbut) console.log("[",color("CMD BUTTON","lime"),"]",time2,color(listbut,"lime"),"from",color(sender.split("@")[0],"cyan"))
			
			if (isCmd && !isOwner) antiSpam.addFilter(from)
			
			if (listbut == "Menu About") {
			     if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              const menunya = `
╭𖧹「 *INFO BOT* 」
${fx} Author: FxSx
${fx} Nama Bot: ${namabot}
${fx} Prefix: ${prefix}
╰─────𖧹

╭𖧹「 *ABOUT* 」
${fx} ${prefix}author
${fx} ${prefix}owner
${fx} ${prefix}status
${fx} ${prefix}info
${fx} ${prefix}speed
${fx} ${prefix}listmute
${fx} ${prefix}blocklist
${fx} ${prefix}banlist
${fx} ${prefix}listscmd
${fx} ${prefix}listrespon
${fx} ${prefix}chatlist
${fx} ${prefix}listgrup
${fx} ${prefix}bahasa
╰─────𖧹`
         xiedev.sendMessage(from, menunya, text, {quoted: xie, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": "Xie Dev Team","mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg"}}})
         } else if (listbut == "Menu Group") {
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              const menunya = `
╭𖧹「 *INFO BOT* 」
${fx} Author: FxSx
${fx} Nama Bot: ${namabot}
${fx} Prefix: ${prefix}
╰─────𖧹

╭𖧹「 *GROUP* 」
${fx} ${prefix}welcome on/off
${fx} ${prefix}grup buka/tutup
${fx} ${prefix}add
${fx} ${prefix}linkgc
${fx} ${prefix}resetlinkgc
${fx} ${prefix}kick
${fx} ${prefix}tagall
${fx} ${prefix}hidetag
${fx} ${prefix}infogrup
${fx} ${prefix}listadmin
${fx} ${prefix}pemilikgrup
${fx} ${prefix}here
${fx} ${prefix}delete
╰─────𖧹`
         xiedev.sendMessage(from, menunya, text, {quoted: xie, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": "Xie Dev Team","mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg"}}})
         } else if (listbut == "Menu Funn") {
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              const menunya = `
╭𖧹「 *INFO BOT* 」
${fx} Author: FxSx
${fx} Nama Bot: ${namabot}
${fx} Prefix: ${prefix}
╰─────𖧹

╭𖧹「 *FUNNY* 」
${fx} ${prefix}afk
${fx} ${prefix}quotesmotivasi
${fx} ${prefix}quotesislami
${fx} ${prefix}quotesnasehat
${fx} ${prefix}sticker
${fx} ${prefix}semoji
${fx} ${prefix}toimg
${fx} ${prefix}tts
${fx} ${prefix}tomp3
${fx} ${prefix}darkjokes
${fx} ${prefix}jadian
${fx} ${prefix}cantik
${fx} ${prefix}ganteng
${fx} ${prefix}beban
${fx} ${prefix}apakah
╰─────𖧹`
         xiedev.sendMessage(from, menunya, text, {quoted: xie, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": "Xie Dev Team","mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg"}}})
         } else if (listbut == "Menu Download") {
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              const menunya = `
╭𖧹「 *INFO BOT* 」
${fx} Author: FxSx
${fx} Nama Bot: ${namabot}
${fx} Prefix: ${prefix}
╰─────𖧹

╭𖧹「 *DOWNLOAD* 」
${fx} ${prefix}play
${fx} ${prefix}ytsearch
${fx} ${prefix}ytmp3
${fx} ${prefix}ytmp4
${fx} ${prefix}carimusik
${fx} ${prefix}fb
${fx} ${prefix}ig
${fx} ${prefix}igstalk
${fx} ${prefix}igstory
${fx} ${prefix}tiktok
${fx} ${prefix}tiktokaudio
${fx} ${prefix}twitter
${fx} ${prefix}mediafire
${fx} ${prefix}lirik
${fx} ${prefix}pinterest
${fx} ${prefix}ggimg
${fx} ${prefix}asupan
╰─────𖧹`
         xiedev.sendMessage(from, menunya, text, {quoted: xie, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": "Xie Dev Team","mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg"}}})
         } else if (listbut == "Menu Owner") {
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              const menunya = `
╭𖧹「 *INFO BOT* 」
${fx} Author: FxSx
${fx} Nama Bot: ${namabot}
${fx} Prefix: ${prefix}
╰─────𖧹

╭𖧹「 *OWNER* 」
${fx} ${prefix}self
${fx} ${prefix}public
${fx} ${prefix}mute
${fx} ${prefix}unmute
${fx} ${prefix}setprefix
${fx} ${prefix}sethias
${fx} ${prefix}setzeks
${fx} ${prefix}setnamabot
${fx} ${prefix}setthumb
${fx} ${prefix}scmd
${fx} ${prefix}delcmd
${fx} ${prefix}addrespon
${fx} ${prefix}delrespon
${fx} ${prefix}clearall
${fx} ${prefix}bc
${fx} ${prefix}clone
${fx} ${prefix}join
${fx} ${prefix}leave
╰─────𖧹`
         xiedev.sendMessage(from, menunya, text, {quoted: xie, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": "Xie Dev Team","mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg"}}})
         }
			switch(command) {
			case 'menu':
			case 'help':
			     if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     menunya = `Hallo ${pushname}\nSenang Bertemu Dengan Anda Ada Yang Bisa Saya Bantu?`
			     sendButLocation(from, `${menunya}`, "Jika Ingin Sewa & Beli Scpirt Bot\nSilahkan Hubungi Owner\n\nAuthor FxSx", {jpegThumbnail: fs.readFileSync('./eror/asistenxie.jpg')}, 
              [
                {buttonId:`${prefix}daftarmenu`,buttonText:{displayText:'Daftar Menu'},type:1},

                {buttonId:`${prefix}allmenu`,buttonText:{displayText:'All Cmd'},type:1},

                {buttonId:`${prefix}info`,buttonText:{displayText:'Info Bot'},type:1}

              ], {contextInfo: { mentionedJid: [sender]}})
              break
			case 'allmenu':
			     if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     menunya = `
╭𖧹「 *INFO BOT* 」
${fx} Author: FxSx
${fx} Nama Bot: ${namabot}
${fx} Prefix: ${prefix}
╰─────𖧹

╭𖧹「 *ABOUT* 」
${fx} ${prefix}author
${fx} ${prefix}owner
${fx} ${prefix}status
${fx} ${prefix}info
${fx} ${prefix}speed
${fx} ${prefix}listmute
${fx} ${prefix}blocklist
${fx} ${prefix}banlist
${fx} ${prefix}listscmd
${fx} ${prefix}listrespon
${fx} ${prefix}chatlist
${fx} ${prefix}bahasa
╰─────𖧹

╭𖧹「 *GROUP* 」
${fx} ${prefix}welcome on/off
${fx} ${prefix}grup buka/tutup
${fx} ${prefix}add
${fx} ${prefix}linkgc
${fx} ${prefix}resetlinkgc
${fx} ${prefix}kick
${fx} ${prefix}tagall
${fx} ${prefix}hidetag
${fx} ${prefix}infogrup
${fx} ${prefix}listadmin
${fx} ${prefix}pemilikgrup
${fx} ${prefix}here
${fx} ${prefix}delete
╰─────𖧹

╭𖧹「 *FUNNY* 」
${fx} ${prefix}afk
${fx} ${prefix}quotesmotivasi
${fx} ${prefix}quotesislami
${fx} ${prefix}quotesnasehat
${fx} ${prefix}sticker
${fx} ${prefix}semoji
${fx} ${prefix}toimg
${fx} ${prefix}tts
${fx} ${prefix}tomp3
${fx} ${prefix}darkjokes
${fx} ${prefix}jadian
${fx} ${prefix}cantik
${fx} ${prefix}ganteng
${fx} ${prefix}beban
${fx} ${prefix}apakah
╰─────𖧹

╭𖧹「 *DOWNLOAD* 」
${fx} ${prefix}play
${fx} ${prefix}ytsearch
${fx} ${prefix}ytmp3
${fx} ${prefix}ytmp4
${fx} ${prefix}cariaudio
${fx} ${prefix}fb
${fx} ${prefix}ig
${fx} ${prefix}igstalk
${fx} ${prefix}igstory
${fx} ${prefix}tiktok
${fx} ${prefix}tiktokaudio
${fx} ${prefix}twitter
${fx} ${prefix}mediafire
${fx} ${prefix}lirik
${fx} ${prefix}pinterest
${fx} ${prefix}ggimg
${fx} ${prefix}asupan
╰─────𖧹

╭𖧹「 *OWNER* 」
${fx} ${prefix}self
${fx} ${prefix}public
${fx} ${prefix}mute
${fx} ${prefix}unmute
${fx} ${prefix}setprefix
${fx} ${prefix}sethias
${fx} ${prefix}setzeks
${fx} ${prefix}setnamabot
${fx} ${prefix}setthumb
${fx} ${prefix}scmd
${fx} ${prefix}delcmd
${fx} ${prefix}addrespon
${fx} ${prefix}delrespon
${fx} ${prefix}clearall
${fx} ${prefix}ban
${fx} ${prefix}unban
${fx} ${prefix}block
${fx} ${prefix}unblock
${fx} ${prefix}bc
${fx} ${prefix}clone
${fx} ${prefix}join
${fx} ${prefix}leave
╰─────𖧹`
              data = fs.readFileSync('./lib/imagexie.js');
              jsonData = JSON.parse(data);
              randXiedev = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randXiedev];
              randImg = await getBuffer(randKey.image)
              imgnya = await xiedev.prepareMessage(from, randImg, location, {thumbnail: randImg})
              gbutsan = [
                 {buttonId:`${prefix}speed`,buttonText:{displayText:'Speed Bot'},type:1}
              ]
              const buttonMessages = {
                locationMessage: imgnya.message.locationMessage,
                contentText: `${menunya}`,
                footerText: `Author FxSx`,
                buttons: gbutsan,
                headerType: 6
              }
              await xiedev.sendMessage(from, buttonMessages, MessageType.buttonsMessage, {caption: menunya, contextInfo: {"mentionedJid": [sender]}, quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": "XIE DEV TEAM","mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg"}}})
              break
         case 'daftarmenu':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              var daftarmenu = xiedev.prepareMessageFromContent(from, {
               "listMessage" :{
               "title": `Xie Bot`,
               "description": `${ucapanWaktu}\n${pushname}\nGunakan Xie Bot Dengan Bijak`,
               "buttonText": "Klik Disini",
               "footerText": "Bot Ini Dilengkapi Anti Spam\nJadi Jangan Spam Yah\n\nAuthor FxSx"
               "listType": "SINGLE_SELECT",
               "sections": [{
                 "title": `${tanggal()}`,
                 "rows": [{
                    "title": "Menu About",
                    "rowId": "0",
                    "description": ""
                  },{
                    "title": "Menu Group",
                    "rowId": "1",
                    "description": ""
                  },{
                    "title": "Menu Funn",
                    "rowId": "2",
                    "description": ""
                  },{
                    "title": "Menu Download",
                    "rowId": "3",
                    "description": ""
                  },{
                    "title": "Menu Owner",
                    "rowId": "4",
                    "description": ""
                  }]
                }]
              }
              }, {})
              xiedev.relayWAMessage(daftarmenu, {waitForAck: false})
              break
         case 'daftar':
				  xiedev.updatePresence(from, Presence.composing)
				  if (isUserXie) return reply('*Kamu Sudah Jadi User Pinky*')
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     userXie.push(sender)
				  fs.writeFileSync('./database/userXie.json', JSON.stringify(userXie))
				  try {
				  ppimg = await xiedev.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
				  } catch {
				  ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
			 	  }
				  captionnya = `╭─𖧹「 *PENDAFTARAN* 」\n┴𖧹\n${fx} Pada ${date} ${time}\n${fx} Nama : ${pushname}\n${fx} Nomer : wa.me/${sender.split('@')[0]}\n${fx} Total User : ${userXie.length} Orang\n┬𖧹\n╰───────𖧹`
              daftarimg = await getBuffer(ppimg)
				  imgnya = await xiedev.prepareMessage(from, daftarimg, image, {thumbnail: daftarimg})
				  gbutsan = [
                {buttonId: `${prefix}daftarmenu`, buttonText: {displayText: 'Daftar Menu'}, type: 1},
                {buttonId: `${prefix}info`, buttonText: {displayText: 'Info Bot'}, type: 1}
              ]
              gbuttonan = {
                imageMessage: imgnya.message.imageMessage,
                contentText: `${captionnya}`,
                footerText: `Note :\nGunakan Bot Xie Dengan Bijak Jangan Spam!\n\nAuthor FxSx`,
                buttons: gbutsan,
                headerType: 4
              }
              await xiedev.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('./eror/fxsxdev.jpg'),caption: captionnya,"contextInfo": {mentionedJid: [sender]}, quoted: ftrolii, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}\nSukses Daftar`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": "https://wa.me/c/994409919080"}}})
              break
//>>>>>>>>>[ KHUSUS INFO BOT ]<<<<<<<<<<\\
         case 'owner':  
         case 'creator':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              members_ids = []
              for (let mem of groupMembers) {
              members_ids.push(mem.jid)
              }
              ini_ownerNumber = ["6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net","6283815956151@s.whatsapp.net"]
              let ini_list = []
              for (let i of ini_ownerNumber) {
              const vname_ = xiedev.contacts[i] != undefined ? xiedev.contacts[i].vname || xiedev.contacts[i].notify : undefined
              ini_list.push({
              "displayName": 'Owner Xie Bot',
              "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${vname_ ? `${vname_}` : `${xiedev.user.name}`}\nORG: `Hai ${pushname}`;\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
              })
              }
              xiedev.sendMessage(from, { "displayName": `${ini_list.length} kontak`,"contacts": ini_list }, 'contactsArrayMessage', {quoted: ftrolii, contextInfo: {"mentionedJid": members_ids}})
              break
         case 'author':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              await sleep(3000)
              xiedev.sendMessage(from, {displayName: "FxSx", contacts: [{displayName: "FxSx", vcard: vcard}]}, MessageType.contact, {quoted: xie})
              break
         case 'status':
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     const status = public ? 'Public': 'Self'
			     return reply(`「 Status Bot 」\n\n ${status}`)
			     break
         case 'info':
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              me = xiedev.user
              uptime = process.uptime()
              infonya = `*Nama bot* : ${me.name}\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*Online Bot* : ${kyun(uptime)}`
              sendButtLocation(from, `${infonya}`, "Bot Ini Tersedia Anti Spam\nJika Spam Cmd Yang Kamu Kirim Tidak Akan Dibalas\n\nAuthor FxSx", {jpegThumbnail: fs.readFileSync('./eror/asistenxie.jpg')}, 
              [
                {buttonId:`${prefix}chatlist`,buttonText:{displayText:'Chat List'},type:1},

                {buttonId:`${prefix}listgrup`,buttonText:{displayText:'Grup List'},type:1},

                {buttonId:`${prefix}blocklist`,buttonText:{displayText:'Block List'},type:1}

              ], {quoted: xie, contextInfo: {mentionedJid: [me.jid]}})
              break
         case 'speed':
         case 'ping':
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              var times = speed();
              const latensi = speed() - times 
              sendButMessage(from, `Speed: ${latensi.toFixed(4)} *Second*`, `Author FxSx`, [
              {
                buttonId: `!ok`,
                buttonText: {
                displayText: `Lumayan Cepet`,
              },
                type: 1,
              },])
              break
         case 'listbanchat':
         case 'listmute':
              teks = `*List Banchat Group!*\n_Total : ${bancht.length}_\n\n`
              for(let i of bancht){
              met = await xiedev.groupMetadata(i)
              teks += 'Id : ' + i + '\n'
              teks += 'Group Name : ' + met.subject + '\n\n'
              }
              reply(teks)
              break
         case 'blocklist':
         case 'listblock':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              teks = 'Daftar Block :\n'
              for (let block of blocked) {
              teks += `~> @${block.split('@')[0]}\n`
              }
              teks += `Total : ${blocked.length}`
              xiedev.sendMessage(from, teks.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": blocked}})
              break
         case 'banlist':
				  ben = '```List Banned``` :\n'
				  for (let banned of ban) {
				   	ben += `~> @${banned.split('@')[0]}\n`
				  }
				  ben += `Total : ${ban.length}`
			     xiedev.sendMessage(from, ben.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": ban}})
				  break
         case 'listscmd':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              let teksnyee = `「 LIST CMD STICKER 」`
              let cemde = [];
              for (let i of _stikcmd) {
              cemde.push(i.id)
              teksnyee += `\n\n*${fx} ID :* ${i.id}\n*${fx} Cmd :* ${i.chats}`
              }
              reply(teksnyee)
              break
         case 'listrespon':{
              let txt = `List Respon\nTotal : ${commandsDB.length}\n\n`
              for (let i = 0; i < commandsDB.length; i++){
              txt += `${fx} Key : ${commandsDB[i].pesan}\n`
              }
              reply(txt)
              }
              break
         case 'chatlist':
         case 'listchat':
		   case 'cekchat':
		        if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
		        if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
		        teks = `Total : ${totalchat.length}`
              reply(teks)
              break
         case 'listgrup':
         case 'listgrop':
         case 'gruplist':
         case 'groplist':
         case 'grouplist':
              const txs = xiedev.chats.all().filter(v => v.jid.endsWith('g.us')).map(v =>`- ${xiedev.getName(v.jid)}\n${v.jid}\n[${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`
              reply(txs)
              break
         case 'bahasa':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              xiedev.sendMessage(from, bahasa(), text)
              break
//>>>>>>>>>[ END INFO BOT ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS FUNNY ]<<<<<<<<<<\\
         case 'afk':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length == 0) return reply('Teksnya Mana')
              alasan = args.join(" ")
              afk[sender.split('@')[0]] = alasan.toLowerCase()
              fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
              ini_txt = "Anda Telah Afk\n"
              if (alasan != "") {
              ini_txt += "Dengan alasan : " + alasan
              }
              sendButMessage(from, ini_txt, `Klik Dibawah Kalo Mau Berhenti Afk`, [
              {
                buttonId: `#ok`,
                buttonText: {
                displayText: `Berhenti Afk`,
              },
                type: 1,
              },])
              break
         case 'stiker':
         case 'sticker':
         case 'stik':
         case 'stick':
         case 's':
         case 'sgif':
         case 'stickergif':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if ((isMedia && !xie.message.videoMessage || isQuotedImage) && args.length == 0) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              const media = await xiedev.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.webp')
              await ffmpeg(`./${media}`)
              .input(media)
              .on('start', function (cmd) {
              console.log(`Started : ${cmd}`)
              })
              .on('error', function (err) {
              console.log(`Error : ${err}`)
              fs.unlinkSync(media)
              reply(mess.error.eror)
              })
              .on('end', function () {
              console.log('Finish')
              buff = fs.readFileSync(ran)
              xiedev.sendMessage(from, buff, sticker, {quoted: xie})
              fs.unlinkSync(media)
              fs.unlinkSync(ran)
              })
              .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(ran)
              } else if ((isMedia && xie.message.videoMessage.seconds < 11 || isQuotedVideo && xie.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
              const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              const media = await xiedev.downloadAndSaveMediaMessage(encmedia)
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
              reply(`Eror Mengkonversi ${tipe} Ke Sticker`)
              })
              .on('end', function () {
              console.log('Finish')
              buff = fs.readFileSync(ran)
              xiedev.sendMessage(from, buff, sticker, {quoted: xie})
              fs.unlinkSync(media)
              fs.unlinkSync(ran)
              })
              .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(ran)
              } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              const media = await xiedev.downloadAndSaveMediaMessage(encmedia)
              ranw = getRandom('.webp')
              ranp = getRandom('.png')
              keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
              await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
              fs.unlinkSync(media)
              let buffer = Buffer.from(res.base64img, 'base64')
              fs.writeFileSync(ranp, buffer, (err) => {
              if (err) return reply(mess.error.eror)
              })
              exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
              fs.unlinkSync(ranp)
              if (err) return reply(mess.error.eror)
              buff = fs.readFileSync(ranw)
              xiedev.sendMessage(from, buff, sticker, {quoted: xie})
              })
              })
              } else {
              reply(`Kirim Gambar Caption ${prefix}sticker Atau Tag Gambar Yang Sudah Dikirim`)
              }
              break
         case 'emoji':
         case 'semoji':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!q) return reply('Emojinya?')
              qes = args.join(' ')
              emoji.get(`${qes}`).then(emoji => {
              teks = `${emoji.images[4].url}`
              sendStickerFromUrl(from,`${teks}`)	
              console.log(teks)
              })
              break
         case 'toimg':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isQuotedSticker) return reply('Reply Stickernya')
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await xiedev.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(mess.error.eror)
              buffer = fs.readFileSync(ran)
              xiedev.sendMessage(from, buffer, image, {quoted: xie, caption: '>//<'})
              fs.unlinkSync(ran)
              })
              break
         case 'tts':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply(`Kode Bahasanya Mana\nSilahkan Ketik : ${prefix}bahasa`)
              const gtts = require('./lib/gtts')(args[0])
              if (args.length < 2) return reply('Textnya Mana')
              dtt = body.slice(9)
              ranm = getRandom('.mp3')
              rano = getRandom('.ogg')
              dtt.length > 600
              ? reply('Textnya Kebanyakan')
              : gtts.save(ranm, dtt, function() {
              exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
              fs.unlinkSync(ranm)
              buff = fs.readFileSync(rano)
              if (err) return reply(mess.error.eror)
              xiedev.sendMessage(from, buff, audio, {quoted: xie, ptt:true})
              fs.unlinkSync(rano)
              })
              })
              break
         case 'tomp3':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isQuotedVideo) return reply('Reply Videonya')
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xiedev.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.mp4')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(`Err: ${err}`)
              buf = fs.readFileSync(ran)
              xiedev.sendMessage(from, buf, audio, {mimetype: 'audio/mp4', quoted: xie})
              fs.unlinkSync(ran)
              })
              break
         case 'darkjoke':
         case 'darkjokes':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
				  if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
				  data = fs.readFileSync('./lib/drak.js');
              jsonData = JSON.parse(data);
              randIndex = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randIndex];
              darkjokes = await getBuffer(randKey.result)
				  imgnya = await xiedev.prepareMessage(from, darkjokes, image, {thumbnail: darkjokes})
				  ucapnya = `Dark Jokes Done!`
              gbutsan = [
                {buttonId: `${prefix + command}`, buttonText: {displayText: 'Dark Jokes'}, type: 1}
              ]
              gbuttonan = {
                imageMessage: imgnya.message.imageMessage,
                contentText: `${ucapnya}`,
                footerText: `Jika Ingin Lagi Silahkan Klik Dibawah!`,
                buttons: gbutsan,
                headerType: 4
              }
              await xiedev.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('fxsxdev.jpg'),caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: xie})
              break
         case 'quotesmotivasi':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
				  if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
				  const motiv =['Nilai sebuah tindakan terletak dalam usaha menyelesaikan sampai tuntas','Kebaikan adalah seorang yang matanya penuh perhatian, serta tangannya yang penuh manfaat','Hiduplah seperti kamu akan mati besok, dan berbahagialah seperti kamu akan hidup selamanya','Kita tidak usah saling menyalahkan, agar dimasa depan tak ada yang menuntut akan kesalahan','Ketika semua hal tidak sejalan dengan anda, ingatlah bahwa sebuah pesawat terbang melawan angin, bukan dengan mengikuti angin','Belajarlah menikmati apa yang kamu miliki, itu akan membuat hidupmu lebih bernilai','Selalu ada kegelapan yang tergelap sebelum terbitnya fajar','Sahabat itu seperti bintang, tak selalu Nampak tetapi selalu ada dihati','Sibuk bukanlah jaminan karir karena hasil jauh lebih didengar orang','semua kemajuan tidak akan ada tanpa kesalahan, kesalahan adalah bagian dari kemajuan selama diakui dan diperbaiki','Sukses meninggalkan jejak, gagal meninggalkan pelajaran, diam meninggalkan penyesalan','Keraguan bersahabat dekat dengan kegagalan','uang tidak merusak seseorang, keserakahan lah yang merusak manusia','Kepercayaan tidak bisa dibeli, tapi kepercayaan bisa dipelihara','Impian, target, kemauan dan tujuan semuanya sia-sia tanpa tindakan','usia bisa berbohong tapi kedewasaan tidak','Ada yang lebih berharga dari uang dan emas yaitu waktu','Tidak ada yang gagal mereka hanya berhenti terlalu cepat','Terasa sakit selalu hampir tidak ada rasanya setelah apa yang kita perjuangkan tercapai','Seseorang tidak bisa sukses seringkali karena kurangnya keberanian untuk mencobaterasa sakit selalu hampir tidak ada rasanya setelah apa yang kita perjuangkan tercapai','Bicaralah secukupnya, lakukanlah semampunya. Jangan melakukan sebaliknya','Ada saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','jangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','Kadang cara terbaik untuk Memanfaatkan peluang adalah dengan mengatakan tidak pada peluang baru dan fokus mengembangkan apa yang sudah ada di tanganjangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','atasan hanya memberikan tugas berat pada karyawan terbaik, Allah hanya memberikan ujian pada pada manusia terbaikKadang cara terbaik untuk Memanfaatkan peluang adalah dengan mengatakan tidak pada peluang baru dan fokus mengembangkan apa yang sudah ada di tanganjangan takut karena masalah yang anda hadapi tidak lebih besar dari jalan keluarnya, Allah siapkan bagi andaAda saatnya penundaan memberikan keuntungan terutama saat terlalu emosi untuk mengambil keputusan','berusaha dan gagal Ternyata jauh lebih melegakan daripada pasrah melihat ke kanan dengan tangan terlipat','lewat kesulitan lah manusia belajar, lewatnya kenyamanan lah manusia Terlena','Saat kita merasa hebat kita baru saja kehilangan separuh pangkat kita karena lengah untuk terus belajar','hidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Orang pintar itu biasa orang hebat itu luar biasa tapi orang berani lah pemenangnyahidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Orang hebat membicarakan ide, orang menengah membicarakan pengalaman, orang lemah membicarakan orang lainOrang pintar itu biasa orang hebat itu luar biasa tapi orang berani lah pemenangnyahidup seseorang telah ditebak, tapi Nasib orang malas mudah untuk ditebak','Anda tidak akan mengubah kehidupan sampai anda mengubah Apa yang anda lakukan setiap hari','bertahan saja tidak cukup anda perlu bereaksi terhadap tekanan dan merubah keadaan','masa depan kita tergantung pada apa yang kita lakukan pada saat ini. Maka jangan sia-siakan waktumu sekarang','Nilai manusia ditentukan bukan dari apa yang diperoleh melainkan apa yang telah diberikan','Malas adalah kemenangan saat ini dan kekalahan di masa nanti','sebuah masalah merupakan kesempatan bagi anda untuk mengeluarkan kemampuan terbaik anda','Kematian tidak dapat mengubur perbuatan baik seseorang','Asal percaya dengan sungguh-sungguh apapun keyakinan Anda dapat menjadi kenyataan','Jika ada hari buruk maka pasti akan hari ada hari baik tugas kita adalah terus bergerak majuAsal percaya dengan sungguh-sungguh apapun keyakinan Anda dapat menjadi kenyataan','Mengeluh adalah cara paling buruk dalam menyelesaikan masalah','Tetap Bertahan dan setia pada tujuan saat menghadapi Hambatan adalah kunci kesuksesan','Tidak perlu keahlian khusus untuk mencari musuh, tapi perlu kesetiaan untuk mempertahankan teman','Orang tua bukan hanya punya kekuatan untuk menatap juga untuk mengalah','Keuletan adalah tanda jadi kesuksesan','cepat atau lambat mereka yang menang adalah mereka yang berfikir dan yakin bahwa mereka bisa','Jaga terus Api Harapan Anda seperti menjaga hidup anda sendiri','Saat semua jalan tertutup. Buatlah jalan dan berserahlah kepada Allah','lari dari masalah bukanlah penyelesaian masalah, hadapi dan Belajarlah dari masalah itu','Rezeki itu ditangan Allah yang kita lakukan hanya berusaha semaksimal mungkin dan menyerahkan hasilnya kepada yang kuasa','Sukses dimulai dengan melakukan apa yang harus dilakukan','rasa syukur membuat kita tidak pernah merasa kekurangan','goal hanya sekedar goal kalau kita tidak mempunyai alasan yang kuat Mengapa kita harus mencapainya','Apapun yang terjadi Yakinlah bahwa Allah menginginkan kita akan jadi lebih baik karena Kejadian ini','orang yang paling Bahagia bukanlah orang yang punya hal-hal terbaik tapi orang yang bisa menjadikan hal-hal yang ia punya menjadi yang terbaikApapun yang terjadi Yakinlah bahwa Allah menginginkan kita akan jadi lebih baik karena Kejadian ini','Respon kita terhadap masalah menentukan kualitas berita fokus pada solusi','Semua yang terlalu sedikit dan terlalu banyak tidak akan membawa kebaikan','Tidak semua usaha kita dibayar oleh manusia, tapi Allah akan membayarnya kelak','Tidak ada harga untuk waktu, tetapi waktu sangat berharga','Sukses seringkali datang pada mereka yang berani bertindak dan jarang menghampiri pada mereka yang dikalahkan ketakutan','Katakan bisa pasti bisa dengan penuh keyakinan otak kita akan segera mencari solusi','Orang yang tidak belajar dari kegagalan adalah orang yang gagal sesungguhnya','Segala sesuatu masalah yang menimpa Anda tidak akan pernah melatih kekuatan anda untuk menyelesaikannya','Saat orang lain melakukan impianmu itu berarti mereka belum mampu melihat sejauh anda melihat','Allah tidak pernah terlambat ia akan menunjukkan kuasanya, pada detik terakhir sekalipun','Bukan banyaknya panah yang menentukan kemenangan tapi tajam panah dan tujuannya yang menentukan','Mengeluh itu sisi lain dari pemborosan, pemborosan waktu dan energy','Pikiran negatif sangat berkuasa bila diberi kesempatan, jadi jangan memberinya kesempatan','Cinta akan membuat kita menjadi orang terkaya di dunia, oleh karena itu mulailah mencintai','Cemas yang berlebihan tidak akan mengubah apapun kecuali merusak diri sendiri','Hidup ini sederhana terkadang pikiran manusia yang membuatnya rumit','Siapa yang bisa menerima kelemahannya sesungguhnya baru saja menambah satu kelebihan pada dirinya','Ada saatnya dimana kekalahan rasa manis yaitu Saat anda sudah melakukan yang terbaik','Menabung itu hanya untuk mempertahankan kekayaan, untuk meningkatkannya berinvestasilah','Jika selamanya anda bermain aman, selamanya juga Anda di tempat yang sama','Lari dari masalah akan membuat masalah menjadi lebih besar, menghadapinya akan membuat anda menjadi lebih besar','Yang menyedihkan bukanlah bidikan yang meleset tapi bidikan tanpa target','Hati yang sedang panas menumpulkan logika dinginkan terlebih dahulu sebelum mengambil keputusan','bila ingin hasil yang besar jangan kerjakan hal yang mudah saja','Jangan biarkan impianmu dijajah oleh pendapat orang lain','Mulailah dengan yang kecil, Kerjakanlah dengan cara yang besar adalah dengan cara yang benar','Pengaruh perkataan orang kepada anda 100% adalah atas izin anda sendiri','Bekerjalah dengan ikhlas karena bekerja tanpa paksaan akan memberi hasil maksimal','Suka belajar, suka jualan, hidup hemat, beli aset suka, sedekah adalah 5 resep Makmur','Lebih baik menjadi raja tikus daripada ekor naga','Kerja keras dan kerja cerdas dapat memastikan keberhasilan dan sedekah dapat memudahkannya','Sakit dalam perjuangan itu hanya berlangsung sementara, namun jika anda menyerah rasa sakit itu akan terasa selamanya','Kegagalan terbesar adalah ketika tidak berani mencoba','Langkah pertama yang diperlukan untuk mendapatkan hal yang anda inginkan adalah memutuskan apa yang anda inginkan','Jangan takut menghadapi masa depan, hadapi dan perjuangkanlah','Dahulukan Allah dalam setiap langkah hidupmu maka semuanya akan ditambahkan kepadamu','Kesulitan adalah hujan terbaik untuk menunjukkan kualitas diri yang sebenarnya','Kesalahan dan kegagalan adalah guru terbaik jika kita mau jujur mengakui dan belajar darinya','Diam belum tentu menyelesaikan masalah tapi setidaknya tidak membesarkan masalah','Pemenang sejati selalu memberikan 100% upayanya, bahkan ketika tidak seorang pun melihatnya','Memaafkan orang lain bagai Menyiram air Bara dendam di hati baik untuk kesehatan kita','Jenius adalah 1 inspirasi dan 99 keringat tidak ada yang dapat menggantikan kerja keras','Disiplin memang tidak mudah tapi tanpa kedisiplinan hidup anda akan jauh lebih sulit','Orang yang berhenti belajar akan menjadi pemilik masa lalu, orang yang terus belajar akan menjadi pemilik masa depan','Hujan tidak hanya datang sendirian Ia datang bersama kesejukan, hal buruk tidak datang sendirian ia datang bersama pembelajaran','Menang atau kalah lakukanlah dengan jujur','Lihatlah tantangan sebagai ujian dan lihatlah masalah Sebagai teguran','Lihat ke atas agar terinspirasi lihat ke bawah agar bersyukur','Untuk meraih apa yang benar-benar anda inginkan fokus saja tidak cukup. Anda harus memiliki rasa lapar untuk meraihnya','90% dari kegagalan berasal dari orang-orang yang memiliki kebiasaan membuat alasan-alasan','Allah tidak membenci orang malas, tapi Allah mengizinkan orang rajin mengambil rezeki orang malas','Keajaiban itu nyata bagi mereka yang yakin berserah diri dan bekerja keras','Orang optimis dapat melihat peluang dalam masalah, orang pesimis akan melihat masalah dalam peluangKeajaiban itu nyata bagi mereka yang yakin berserah diri dan bekerja keras','Kualitas pikiran anda menentukan kualitas kehidupan anda','Bersyukur adalah cara ampuh untuk meraih energi yang dahsyat, Sudahkah anda bersyukur hari ini','Jangan mengharapkan sesuatu yang luar biasa jika anda hanya mau melakukan hal yang biasa saja','Kebahagiaan dimulai dengan ketulusan','1000 perkataan dan pengetahuan tidak berarti tanpa adanya satu tindakan yang nyata','Tangkap peluang, kerjakan, selesaikan','Ketika situasi di sekolah Anda tidak menyenangkan. Di saat itulah sebenarnya karakter anda sedang dibentuk','Seorang pemberani bukan orang yang tidak mempunyai rasa takut. Tapi orang yang mampu berjalan diatas rasa takutnya','dalam takut yang tampak adalah hambatan, dalam yakin yang tampak adalah kesempatan','Tidak ada kata gagal yang ada hanya sukses atau perlu belajar lagi sampai berhasil','Menjadi tua itu pasti menjadi dewasa itu pilihan','Kehidupan yang besar dimulai dari mimpi yang besar','Tragedi dalam kehidupan ini bukanlah yang berakhir terlalu cepat, tetapi kita menunggu terlalu lama untuk memulainya','Takut akan kegagalan seharusnya tidak menjadi alasan untuk tidak mencoba sesuatu','Hari ini adalah hari pertama dalam hidup anda. Buatlah hari ini menjadi hari yang terbaik sepanjang hidup anda dan semoga hari esok matahari bersinar dengan terang','Saya berpikir bahwa ada suatu hal yang lebih penting daripada sekedar percaya, tindakan Dunia ini penuh dengan pemimpi ,tidaklah banyak orang yang berani maju ke depan dan Mulai mengambil langkah pasti untuk mewujudkan visi mereka','Anda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Allah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Pergilah sejauh mungkin dan ketika anda tiba di sana anda akan melihat lebih jauh lagiAllah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Menangis dapat melepaskan tambahan hormon stress, itulah mengapa kita sehabis menangis merasa lebih baikPergilah sejauh mungkin dan ketika anda tiba di sana anda akan melihat lebih jauh lagiAllah, aku tahu bahwa saat aku kehilangan sesuatu engkau sedang mempersiapkan hal yang lebih baik untukkuAnda tidak dapat mengubah masa lalu anda dan janganlah terlalu khawatir dengan hari esok .Hari ini adalah hari yang dapat mengubah masa depan Anda','Ketika cinta itu dipertahankan kamu akan tau siapa yang lebih menghargai tentang sebuah hubungan','Dalam hidup ini banyak orang tahu apa yang harus dilakukan, tetapi hanya sedikit yang melakukan apa yang ia ketahui. Mengetahui tidaklah cukup, Anda harus mengambil tindakan','Berilah perhatian lebih ke orang yang kamu sayangi, itu yang mereka butuhkan','Satu ons tindakan sama berharganya dengan satu ton teori','Kita mungkin terpisah sejak lama ketika tak mampu belajar untuk lebih dewasa','Sayangilah dia walau tidak sesempurna seperti yang kau inginkan','Kecantikan akan mengundang perhatian sikap santun memikat Kalbu','Mengetahui tidaklah cukup kita harus melakukannya, keinginan tak cukup hanya dengan berangan kita harus melakukannya','Kesalahan adalah bukti bahwa kamu sedang mencoba','Betapapun jauhnya air mengalir ia takkan pernah lupa hulunya','Lebih baik sendiri daripada bersama dengan orang yang salahBetapapun jauhnya air mengalir ia takkan pernah lupa hulunya','Lakukan sesuatu hari ini yang akan membuat dirimu berterima kasih di hari-hari mendatang','Waktu yang memutuskan Dengan siapa kamu akan berjumpa','Hati yang memutuskan siapa yang kamu inginkan dalam hidup ini','Dengan sikap yang akan menentukan siapa yang akan bertahan dalam hidupmu','Menjadi dewasa dan bijak diawali dengan menjadi muda dan bodoh','Lakukanlah apa yang paling kamu takutkan dalam hidupmu','Bekerjalah seolah kamu tak butuh uang, Cintailah seolah Kamu takkan Tersakiti dan menarilah seakan tak ada yang melihatmu','Jika hari ini sudah sempurna maka Apalah arti hari esok','Bintang pun tak kan bersinar tanpa kegelapan','Suatu saat aku akan menjadi tempat yang akan selalu kau rindu','Guru terbaik kamu adalah kesalahan terakhir yang kamu lakukan','Diam adalah respon terbaik untuk orang bodoh','Jangan pernah membuat keputusan yang permanen untuk perasaan yang sementara','Jika Allah yang menjadi alasan anda untuk hidup maka takkan pernah ada alasan untuk menyerah','Kegagalan ada bukan untuk ditakuti tetapi untuk dipelajari','Anda saat ini adalah hasil dari pengalaman anda','Keberuntungan adalah saat kesempatan datang, anda telah matang dengan segala persiapan','Jangan Menunggu hari yang terbaik untuk melangkah karena setiap hari sangatlah berharga','Keputusan yang baik diperoleh dari pengalaman, dan pengalaman didapat dari keputusan yang buruk','Setiap waktu yang anda lewati dengan sia-sia hanya menjauhkan anda dan semakin jauh dari kata sukses','Realitas kehidupan Anda adalah deskripsi dari jiwa dan pikiran anda','Berani mengambil keputusan maka anda telah melangkah 10 kali lebih cepat untuk sukses','Allah masih mencintai anda jika masih banyak cobaan dan tantangan hidup yang datang menghampiri anda. Allah percaya bahwa anda mampu melaluinya, maka jagalah kepercayaan itu','Ketika orang mengatakan anda sudah berubah sebenarnya itu hanya karena anda berhenti melakukan apa yang mereka ingin anda lakukan','Jangan menukar apa yang sangat anda inginkan untuk apa yang Anda ingin untuk saat ini','Orang-orang yang mengikuti keramaian biasanya tersesat di dalamnya','Orang tua saya bekerja terlalu keras untuk saya bukan supaya saya tidak hanya menjadi orang biasa tetapi menjadi orang luar biasa','Anda menghalangi impian anda ketika anda mengizinkan ketakutan Anda tumbuh lebih besar dari keyakinan anda','Sang juara percaya kepada dirinya sendiri bahkan ketika orang lain tidak percaya','Hanya mereka yang berani mengambil resiko yang jauh pasti dapat menemukan Seberapa jauh seseorang dapat pergi','Tunjukkan teman Anda, saya akan menunjukkan masa depan Anda','Beberapa orang ingin sesuatu terjadi, beberapa orang berharap itu akan terjadi, yang lain mewujudkannya jadi kenyataan','Jika anda menghabiskan waktu untuk mencoba menjadi baik dalam segala hal, Anda tidak akan pernah menjadi hebat dalam apapun','Sebuah perjalanan ribuan mil dimulai dari langkah kecil','Apa yang akan Anda kerjakan, Ketika anda tahu anda tidak mungkin gagal','Ketika kita memiliki satu sama lain, kita Memiliki segalanya','Kebesaran sebenarnya dapat ditemukan dalam hal hal kecil yang terkadang kita lewatkan','Bekerja keraslah, Bermimpilah lebih besar dan jadilah yang terbaik','Apa yang kita pikirkan menentukan apa yang akan terjadi pada kita. Jadi jika kita ingin mengubah hidup kita, kita perlu sedikit mengubah pikiran kita.','Seseorang yang berani membuang satu jam waktunya tidak mengetahui nilai dari kehidupan.','Saya memiliki filosofi yang sederhana: isi apa yang kosong, kosongkan apa yang terlalu penuh.','Hidup adalah cermin dan akan merefleksikan kembali kepada para pemikir mengenai apa yang mereka pikirkan.','Anda di sini hanya untuk persinggahan yang singkat. Jangan terburu, jangan khawatir. Yakinlah bahwa Anda menghirup wangi bunga sepanjang perjalanan.Hidup adalah cermin dan akan merefleksikan kembali kepada para pemikir mengenai apa yang mereka pikirkan.','Hidup adalah serangkaian perubahan yang alami dan spontan. Jangan tolak mereka karena itu hanya membuat penyesalan dan duka. Biarkan realita menjadi realita. Biarkan sesuatu mengalir dengan alami ke manapun mereka suka.','Hidup yang baik adalah hidup yang diinspirasi oleh cinta dan dipandu oleh ilmu pengetahuan.','Kenyataannya, Anda tidak tahu apa yang akan terjadi besok. Hidup adalah pengendaraan yang gila dan tidak ada yang menjaminnya.','Hidup adalah mimpi bagi mereka yang bijaksana, permainan bagi mereka yang bodoh, komedi bagi mereka yang kaya, dan tragedi bagi mereka yang miskin','Hidup itu bukan soal menemukan diri Anda sendiri, hidup itu membuat diri Anda sendiri.','Hal yang paling penting adalah menikmati hidupmu, menjadi bahagia, apapun yang terjadi.','Hidup itu sederhana, kita yang membuatnya sulit.']
				  const vasi = motiv[Math.floor(Math.random() * motiv.length)]
				  sendButMessage(from, vasi, `Jika Mau Lagi Silahkan Klik Dibawah`, [
              {
                buttonId: `${prefix + command}`,
                buttonText: {
                displayText: `Quotes Motivasi`,
              },
                type: 1,
              },])
				  break
         case 'quotesislami':
         case 'quotesislam':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
				  if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
				  const islami =['Hal yang paling manis adalah ketika seseorang menyebutkan nama kamu di tahajjud mereka.','Ya Allah panggillah diriku dan orang tuaku ke baitullah dalam keadaan sehat walafiat.','Ya Allah semoga seseorang yang engkau jodohkan denganku adalah seseorang yang saat ini sedang aku perjuangkan.','Allah tidak pernah tidur. Semua pasti akan di balas kelak. Orang-orang jahat yang sekarang bisa tertawa karena banyak uang, berkuasa, tapi besok-besok mereka semua di balas seadil-adilnya.','Jangan putus asa, Allah tidak akan mengecewakan hambanya yang ingin memperbaiki diri.','Percayalah orang yang menasehatimu untuk sholat adalah dia yang paling mencintaimu.','Bukannya Allah tidak tahu sedihmu, Tapi Allah tahu kalau kamu itu kuat.','Bacalah Al-Quran, Ia akan menenangkan hatimu meskipun engkau tidak memahami artinya.','Saat kita sakit hati sama omongan orang, saat itu juga sebenarnya Allah ngajarin kita buat jaga omongan kita ke orang lain. Sederhana bukan?','Di dunia ini orang paling baik pun bisa dicela, dan bahkan orang paling jahat sekalipun bisa di bela.','Al-Quran adalah teman yang tidak akan mengecewakan kamu di dunia dan akhirat.','Cara Allah menjawab doa hambanya : Iyaa.. aku beri untukmu sekarang. Tunggu, aku ingin melihat dulu perjuanganmu. Tidak, aku punya yang lebih baik untukmu.','Dan Allah tidak akan mengadzab mereka selama mereka mau Memohon ampun kepada-Nya. [Al-Anfaal, 8:33]','Kesabaran itu ada dua macam : Sabar atas sesuatu yang tidak kamu ingin. Sabar menahan diri dari sesuatu yang kamu ingini. -Ali bin Abi Thalib','Ambillah kebenaran, jika kamu telah mendengarnya. Karena sungguh di atas kebenaran ada cahaya. (HR. Abu Daud)','Sholatlah agar hatimu tenang, Istighfarlah agar kecewamu hilang, Berdoalah agar bahagiamu segera datang.','Surga itu mahal.. Akan tetapi orang miskin tetap mampu membelinya, Karena harganya bukan pada Harta melainkan Taqwa.','Ya Allah... Perbaikilah lisanku, Perbaikilah hatiku, Perbaikilah akhlakku, Perbaikilah hidupku, Aamiin..','Semoga hari ini Allah memudahkan setiap urusan kita, melapangkan hati kita serta meringankan langkah kita, dalam kebaikan kita Aamiin.','Peganglah aku, bacalah aku setiap hari, karena aku akan menjadi penerang didalam kuburmu nanti. #Al-Quran','Kematian..Kamu terlalu banyak bercanda. Hingga sampai kamu lupa, kematian mungkin tidak menunggumu selesai tertawa.','Jangan khawatirkan rizkimu, karena Allah telah menjaminnya untukmu, namun khawatirkanlah amalanmu, karena Allah tidak menjamin surga-Nya untukmu..','Wahai orang-orang yang beriman! Ingatlah kepada Allah, Dengan mengingat (nama-Nya) sebanyak-banyaknya dan bertasbihlah kepada-nya pada waktu pagi dan petang.','Aku sangat ingin menjadi pemburu surga. Namun aku lupa bahwa aku juga buronan neraka.','Karena aku percaya apapun yang menjadi milikku akan tetap menjadi milikku. Sejauh apapun dia (mencoba) pergi. Sejauh apapun usaha orang lain ingin merebutnya dariku. Aku hanya perlu percaya pada Allah bahwa yang menjadi milikku tidak akan pernah menjadi milik orang lain.','Andai hidayah itu seperti buah yang bisa kubeli, maka akan kubeli berkeranjang-keranjang untuk aku bagikan kepada orang-orang yang aku cintai.','Bila kamu tidak melihatku di syurga. Tolong tanya kepada Allah dimana aku, Tolonglah aku ketika itu..','Hanya Allah yang mengerti bagaimana sulitnya menahan sabar tanpa harus bercerita panjang lebar.','Letakkan hpmu lalu ambil air wudhu, shalatlah kamu, Allah menunggu curhatan darimu.','Maafin aku Ya Allah Gara gara aku mencintai dia tapi tidak pasti, sampai aku lupa mencintai mu juga.','Akan ada saatnya setelah salam dari sholatku, tanganmu yang pertama kali kusentuh.','Mungkin maksud Tuhan mempertemukan kamu dengannya adalah, sekedar mengingatkan bahwa tidak semua yang kamu inginkan bisa kamu dapatkan.','Percayalah Seorang wanita yang mencintai Allah. Allah akan berikan lelaki terbaik untuk menjaganya.','Berterimakasihlah kepada tuhan, Yang memberimu hidup dan kehidupan.','Mungkin kamu hanya harus sedikit peka untuk menyadari petunjuk dari Tuhan atas doa-doamu.']
				  const isl = islami[Math.floor(Math.random() * islami.length)]
				  sendButMessage(from, isl, `Jika Mau Lagi Silahkan Klik Dibawah`, [
              {
                buttonId: `${prefix + command}`,
                buttonText: {
                displayText: `Quotes Islami`,
              },
                type: 1,
              },])
              break	
		   case 'quotesnasehat':
		        if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
				  if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
				  const nasehat =['Jangan pernah mengabaikan apapun yang terjadi, suatu saat akan sadar dan menyesal, ingat tuhan akan selalu memberikan penyesalan terakhir ...','Ingat iya.. Perilaku mu bisa mengubah perasaan seseorang.','Setia itu bukan yang selalu ada, namun saat tak bersama dia tahu hatinya milik siapa.','Kamu perlu belajar satu hal : "Menghargai seriusnya seseorang."','Jangan cari yang sempurna, Sempurnakan saja yang ada.','Ketika seseorang menghina kamu, itu adalah sebuah pujian bahwa selama ini mereka menghabiskan banyak waktu untuk memikirkan kamu, bahkan ketika kamu tidak memikirkan mereka.','Yang terbaik tidak akan hilang. Jika dia hilang maka dia bukanlah yang terbaik.','Percayalah. Suatu hari nanti pasti akan ada seseorang yang bangga memilikimu.','Tidak ada karya yang pernah dibuat oleh seorang seniman yang malas.','Jika seseorang memberimu perhatian jangan pernah mengabaikannya karena suatu saat perhatian sekecil itu kamu rindukan saat kamu kesepian.','Bersyukurlah.. Untuk segala apapun yang engkau miliki saat ini, sebab nikmat itu akan bertambah ketika kamu dapat mensyukuri apa yang telah diberi saat ini. #Buat diri ini jangan banyak mengeluh yah.','Ada perbedaan antara menyerah dan tau kapan kamu merasa cukup dalam berusaha.','Jangan sampai kesenanganmu menyusahkan orang lain. Jangan pula kesusahanmu menyenangkan orang lain.','Semakin banyak kamu memberi, semakin banyak pula yang akan kembali padamu.','Jangan pernah bandingkan akhir kesuksesan orang lain dengan pertengahan prosesmu.','Lakukan apa yang kamu bisa, dengan apa kamu miliki, dimanapun kamu berada.','Hidup memang bukan balapan, tetapi kamu memang perlu untuk terus bergerak maju.','NIKMATI HIDUPMU, LUPAKAN UMURMU.','Sebaik-baiknya permintaan maaf adalah membaiknya tingkah laku.','Belajarlah memahami bahwa tidak semua keinginan bisa terpenuhi, barangkali itu adalah obat yang terbaik untuk mencegah kecewa dan sakit hati.','Kamu akan menemukan yang terbaik, ketika kamu sudah berhenti membanding-bandingkan.','Jangan menilai orang dari masa lalunya karena kita semua sudah tidak hidup disana. Semua orang bisa berubah, biarkan mereka membuktikannya.','Jika dia tidak merasakan kehadiranmu, buat dia merasakan kepergianmu.','Orang pintar mampu memecahkan masalah. Orang bijak mampu menghindarinya.','Bersikap tidak lagi peduli lebih baik dari pada balas dendam.','Tegas akan diri sendiri, buang pikiran negatif dan lakukan yang baik. Kegelisahan hanya milik mereka yang putus asa.','Jangan pikirkan kegagalan kemarin, hari ini sudah lain, sukses pasti diraih selama semangat masih menyengat.','Memaafkanmu bukan berarti memberimu kesempatan sekali lagi.','Berubah menjadi lebih baik adalah pilihan. Tapi, merasa paling baik adalah kesalahan.','Jangan pernah bandingkan dirimu dengan orang lain, tapi bandingkanlah dengan dirimu yang lalu, apakah hari ini sudah lebih baik?','Ketahuilah orang yang paling sering memberi nasihat kepadamu, itulah orang yang paling mencintai kamu.','Jangan pernah berhenti belajar, karena hidup tidak pernah berhenti mengajarkan.','Salah satu tanda dirimu tidak berakhlak adalah main HP ketika ada orang yang berbicara.','Raihlah kesuksesan yang tidak seseorangpun berfikir kamu bisa meraihnya. Buktikan pada mereka kalau kamu bisa!','Kesalahan adalah bukti nyata kalau kamu pernah mencoba. Jangan takut salah. Takutlah untuk melakukan kesalahan-kesalahan yang sama dua kalinya.','Cepat atau lambat bukan masalah. Selama kamu tetap bergerak maju, tidak ada akhirnya kamu akan tetap sampai tidak ada tujuan.','Jika kamu tidak bisa membahagiakan orang lain, Setidaknya janganlah kamu tambah dukanya.','Teruslah berusaha sampai temanmu berkata kepadamu "Sombong iya sekarang."','Ketika kamu melakukan sebuah kesalahan, Akuilah dan jangan ragu untuk meminta maaf. Tidak pernah ada satupun orang dalam sejarah yang mati tersedak karena menelan gengsinya sendiri.','Syukuri yang menyayangimu, Maafkan yang menyakitimu.','Tunjukkan keburukanmu, lalu lihat siapa yang bertahan.','Kamu boleh lelah, tetapi tidak boleh menyerah untuk selamanya.','Jangan pernah lupa bilang "Terima Kasih." Jangan pernah gengsi bilang "Maaf." Jangan pernah jadi terlalu sombong untuk bilang "Tolong."','Masa lalu tidak bisa berubah, diubah, dilupakan, ataupun di hapus. Masa lalu hanya bisa di terima','Kita ini.. sangat pintar menghakimi, Namun bodoh dalam memperbaiki diri.','Tidak peduli seberapa baiknya kamu, Kebaikan tidak akan berarti apa-apa jika kamu memberikan kepada orang yang salah.','Orang sabar selalu menang, Orang tamak selalu rugi, Orang marah selalu kalah, Orang baik selalu diuji.','Carilah tempat dimana kamu bisa dihargai, Bukan dibutuhkan. Karena banyak orang mencarimu hanya saat butuh saja, Hingga lupa bagaimana cara menghargaimu.','Melupakan orang yang melukaimu adalah hadiahmu untuk mereka. Memaafkan orang yang melukaimu adalah hadiahmu untuk dirimu sendiri.','Maafkan orang yang menyakitimu... Bukan karena mereka pantas di maafkan, Tapi karena kamu harus berbahagia.','Tetaplah kuat, Tetaplah positif, Buatlah mereka bertanya-tanya bagaimana kamu masih tetap bisa tersenyum.','Jangan meninggalkan yang pasti demi yang mungkin. Sebab semua kemungkinan, belum tentu menjadi kepastian.','Seseorang pernah berkata padaku, Merelakan bukan berarti menyerah, Tapi tidak bisa dipaksakan.','Ikuti alurnya, Nikmati prosesnya, Tuhan tau kapan kita harus bahagia.','Usia hanyalah angka, Hanya mereka yang terus berusaha yang berhasil.','Jangan pernah meremehkan siapapun! Karena sukses adalah balas dendam Terbaik.','Pria sejati.. Harus menyelesaikan apa yang sudah dimulai.','Jika kau ingin terbang, Kau harus melepaskan hal-hal yang membuatmu berat.','Siapapun yang meremehkan mu hari ini, Suatu saat harus kamu lewati.','Jangan Mencintai terlalu mudah, Jangan Percaya terlalu cepat, Jangan Berhenti terlalu dini, Jangan Berharap terlalu tinggi, Jangan Bicara terlalu banyak.','Jadilah orang baik tapi jangan biarkan orang lain mengambil keuntungan dari mu. Ketahuilah kapan kamu harus bilang tidak.','Sahabat sejati adalah mereka tau semua kelemahan mu, Tapi tidak menggunakan nya untuk menjatuhkan mu.','Ada tiga hal yang harus dimiliki dalam hidup yaitu : Perubahan, Pilihan dan Prinsip.','Orang bodoh mengira dirinya bijak. orang bijak tau dirinya bodoh.','Jatuh cintalah seperlunya.. Kemudian patah hatilah secukupnya. Karena semua ada porsinya, Karena semua ada masanya.','Kita tidak pernah tau jalan hidup seseorang.. Maka ada baiknya jika kita tidak menghakiminya atas keputusan dalam hidupnya.','Jangan pernah menyesal mengenal seseorang dalam hidupmu, Orang baik akan memberi mu Kebahagiaan, Orang jahat akan memberi mu Pengalaman, Bahkan seburuk-buruk manusia akan memberi mu Pelajaran.','Jangan menilai kedewasaan dari usia seseorang, Karena itu bukan jaminan.']
				  const nsh = nasehat[Math.floor(Math.random() * nasehat.length)]
				  sendButMessage(from, nsh, `Jika Mau Lagi Silahkan Klik Dibawah`, [
              {
                buttonId: `${prefix + command}`,
                buttonText: {
                displayText: `Quotes Nasehat`,
              },
                type: 1,
              },])
				  break	
         case 'ganteng':
              if (!isGroup) return grupinv(mess.only.group)
				  membr = []
				  const mes = groupMembers
			     const msk = groupMembers
				  const siaps = mes[Math.floor(Math.random() * mes.length)]
				  const sips = pushname[Math.floor(Math.random() * msk.length)]
				  teks = `*Yang Paling Ganteng Disini Adalah :* @${siaps.jid.split('@')[0]}`
				  membr.push(siaps.jid)
				  mentions(teks, membr, true)
				  break
         case 'cantik':
              if (!isGroup) return grupinv(mess.only.group)
				  membr = []
				  const mes = groupMembers
			     const msk = groupMembers
				  const siaps = mes[Math.floor(Math.random() * mes.length)]
				  const sips = pushname[Math.floor(Math.random() * msk.length)]
				  teks = `*Yang Paling Cantik Disini Adalah :* @${siaps.jid.split('@')[0]}`
				  membr.push(siaps.jid)
				  mentions(teks, membr, true)
				  break
         case 'jadian':
              if (!isGroup) return grupinv(mess.only.group)
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
         case 'beban':
              if (!isGroup) return grupinv(mess.only.group)
				  membr = []
				  const mes = groupMembers
			     const msk = groupMembers
				  const siaps = mes[Math.floor(Math.random() * mes.length)]
				  const sips = pushname[Math.floor(Math.random() * msk.length)]
				  teks = `*Yang Paling Beban Disini Adalah :* @${siaps.jid.split('@')[0]}`
				  membr.push(siaps.jid)
				  mentions(teks, membr, true)
				  break
         case 'apakah':
              if (!isGroup) return grupinv(mess.only.group)
				  apakah = body.slice(1)
				  const apakahh = ["Ya","Tidak","Ga tau"]
				  const kah = apakahh[Math.floor(Math.random() * apakahh.length)]
				  xiedev.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, {quoted: xie})
				  break 
//>>>>>>>>>[ END FUNNY ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS GROUP ]<<<<<<<<<<\\
         case 'tagall':
              if (!isGroup) return grupinv(mess.only.group)
              if (!isGroupAdmins) return sendButMessage (from, adminG1, adminG2, adminG3, {quoted: ftroli})
              members_id = []
              teks = (args.length > 1) ? body.slice(8).trim() : ''
              teks += '\n\n'
              for (let mem of groupMembers) {
              teks += `*#* @${mem.jid.split('@')[0]}\n`
              members_id.push(mem.jid)
              }
              mentions(teks, members_id, true)
              break
         case 'hidetag':
              if (!isGroup) return grupinv(mess.only.group)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              var value = body.slice(9)
              var group = await xiedev.groupMetadata(from)
              var member = group['participants']
              var mem = []
              member.map( async adm => {
              mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
              })
              var options = {
              text: value,
              contextInfo: { mentionedJid: mem },
              quoted: xie
              }
              xiedev.sendMessage(from, options, text)
              break
         case 'liston':
         case 'listonline':
         case 'here':                
              if (!isGroup) return grupinv(mess.only.group)
              try {
              let fxsxdev = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
              let online = [...Object.keys(xiedev.chats.get(fxsxdev).presences), xiedev.user.jid]
              xiedev.sendMessage(from, 'List Nyimak:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, {quoted: xie, contextInfo: {mentionedJid: online}})
              } catch (e) {
              reply(`${e}`)
              }
              break
         case 'delete':
         case 'del':
         case 'd':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (!isGroup)return grupinv(mess.only.group)
              if (!isGroupAdmins) return sendButMessage (from, adminG1, adminG2, adminG3, {quoted: ftroli})
              xiedev.deleteMessage(from, { id: xie.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
              break
         case 'add':
              if (!isGroup) return grupinv(mess.only.group)
              if (!isGroupAdmins) return sendButMessage (from, adminG1, adminG2, adminG3, {quoted: ftroli})
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              if (args.length < 1) return reply('Mau Add Siapa')
              if (args[0].startsWith('08')) return reply('Gunakan Kode Negara')
              try {
              num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
              xiedev.groupAdd(from, [num])
              } catch (e) {
              console.log('Error :', e)
              reply(mess.error.eror)
              }
              break
         case 'kick':
              if (!isGroup) return grupinv(mess.only.group)
              if (!isGroupAdmins) return sendButMessage (from, adminG1, adminG2, adminG3, {quoted: ftroli})
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              if (xie.message.extendedTextMessage === undefined || xie.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
              mentioned = xie.message.extendedTextMessage.contextInfo.mentionedJid
              if (mentioned.length > 1) {
              teks = 'Perintah di terima, mengeluarkan :\n'
              for (let _ of mentioned) {
              teks += `@${_.split('@')[0]}\n`
              }
              mentions(teks, mentioned, true)
              xiedev.groupRemove(from, mentioned)
              } else {
              mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
              xiedev.groupRemove(from, mentioned)
              }
              break
         case 'infogc':
         case 'groupinfo':
         case 'infogrup':
         case 'grupinfo':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return grupinv(mess.only.group)
              try {
              ppUrl = await xiedev.getProfilePicture(from)
              } catch {
              ppUrl = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
              }
			     buffer = await getBuffer(ppUrl)
		        captionnya = `╭「 *INFO GRUP* 」\n${fx} *Nama*: ${groupName}\n${fx} *Member*: ${groupMembers.length}\n${fx} *Admin*: ${groupAdmins.length}\n${fx} *Desk*: ${groupDesc}\n${fx} *Welcome*: ${isWelkom ? 'On':'Off'}\n${fx} *BanChat*: ${isBanchat ? 'On':'Off'}\n╰─────`
              imgnya = await xiedev.prepareMessage(from, buffer, location, {thumbnail: buffer})
              gbutsan = [
                {buttonId:`${prefix}pemilikgrup`,buttonText:{displayText:'Pemilik Group'},type:1},
                {buttonId:`${prefix}listadmin`,buttonText:{displayText:'List Admin'},type:1}
              ]
              const buttonMessages = {
                locationMessage: imgnya.message.locationMessage,
                contentText: `${captionnya}`,
                footerText: `Mohon Patuhi Peraturan Grup Ini\n\nAuthor FxSx`,
                buttons: gbutsan,
                headerType: 6
              }
              await xiedev.sendMessage(from, buttonMessages, MessageType.buttonsMessage, {contextInfo: {mentionedJid: [sender]}})
              break
         case 'listadmins':
         case 'listadmin':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return grupinv(mess.only.group)
              teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
              no = 0
              for (let admon of groupAdmins) {
              no += 1
              teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
              }
              mentions(teks, groupAdmins, true)
              break
         case 'ownergrup':
         case 'pemilikgrup':
         case 'pemilikgc':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return grupinv(mess.only.group)
              xie.updatePresence(from, Presence.composing) 
              options = {
              text: `Pemilik Group : wa.me/${from.split("-")[0]}`,
              contextInfo: { mentionedJid: [from] }
              }
              xiedev.sendMessage(from, options, text, {quoted: xie})
              break
         case 'linkgroup':
         case 'linkgrup':
         case 'linkgc':
         case 'gruplink':
         case 'grouplink':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return grupinv(mess.only.group)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              linkgc = await xiedev.groupInviteCode (from)
              linknya = `https://chat.whatsapp.com/${linkgc}\n\nLink Group *${groupName}*`
              xiedev.sendMessage(from, linknya, text, {quoted: xie})
              break
         case 'resetlinkgc':
         case 'resetlinkgroup':
         case 'revoke':
              if (!isGroup) return grupinv(mess.only.group)
              if (!isGroupAdmins) return sendButMessage (from, adminG1, adminG2, adminG3, {quoted: ftroli})
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              json = ['action', 'inviteReset', from]
              xiedev.query({json, expect200: true})
              reply(mess.sucess)
              break
         case 'grup':
         case 'gc':
         case 'group':	
              if (!isGroup) return grupinv(mess.only.group)
              if (!isGroupAdmins) return sendButMessage (from, adminG1, adminG2, adminG3, {quoted: ftroli})
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              if (args[0] === 'buka') {
              reply(mess.sucess)
              xiedev.groupSettingChange(from, GroupSettingChange.messageSend, false)
              } else if (args[0] === 'tutup') {
              reply(mess.sucess)
              xiedev.groupSettingChange(from, GroupSettingChange.messageSend, true)
              }
              break
         case 'welcome':
              if (!isGroup) return grupinv(mess.only.group)
              if (!isGroupAdmins) return sendButMessage (from, adminG1, adminG2, adminG3, {quoted: ftroli})
              if (args.length < 1) return reply('On Mengaktifkan\nOff Menonaktifkan')
              if ((args[0]) === 'on') {
              if (isWelkom) return reply('Welcome Sudah On')
              welkom.push(from)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              reply(mess.sucess)
              } else if ((args[0]) === 'off') {
              if (isWelkom) return reply('Welcome Sudah Off')
              welkom.splice(from, 1)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              reply(mess.sucess)
              } else {
              reply('On Mengaktifkan\nOff Menonaktifkan')
              }
              break
//>>>>>>>>>[ END GROUP ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS DOWNLOAD ]<<<<<<<<<<\\
         case 'play':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length === 0) return reply(`Silahkan Ketik : ${prefix}play Nama Lagunya`)
              var srch = args.join('')
              find = await yts(srch)
              res = find.all
              var reslink = res[0].url;
              try {
              yta(reslink)
              .then((res) => {
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then(async (a) => {
              if (Number(filesize) >= 100000) return sendMediaURL(thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
              sendMediaURL(thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`)
              await sendMediaURL(dl_link).catch(() => reply(mess.error.eror))
              })
              })
              l} catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'ytsearch':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply("masukan judul video")
              var search = args.join('')
              try {
              var find = await yts(search)
              } catch {
              return await reply(mess.error.eror)
              }
              result = find.all
              var tbuff = await getBuffer(result[0].image)
              var ytres = `*[ YT SEARCH ]*\n*━━━━━━━*\n\n`
              find.all.map((video) => {
              ytres += `${fx} Title:` + video.title + '\n'
              ytres += `${fx} Link:` + video.url + '\n'
              ytres += `${fx} Durasi:` + video.timestamp + '\n'
              ytres += `${fx} Upload:` + video.ago +`\n*━━━━━━━*\n\n`
              })
              await fakethumb(tbuff, ytres)
              break
         case 'ytmp3':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('masukan link youtube yang mau di download')
              var link = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
              if (!link) return reply(mess.error.eror)
              try {
              reply(mess.wait)
              yta(args[0])
              .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
              if (Number(filesize) >= 30000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\nDurasi Terlalu Panjang, Saya Kasih Link Aja`)
              const caption = `*[ YT MP3 ]*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Size* : ${filesizeF}\n\n*Silahkan Tunggu Audio Sedang Dikirim*`
              sendMediaURL(thumb, caption)
              sendMediaURL(dl_link).catch(() => reply("File Eror"))
              })
              })
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'ytmp4':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('masukan link youtube yang mau di download')
              var link = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
              if (!link) return reply(mess.error.link)
              try {
              reply(mess.wait)
              ytv(args[0])
              .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
              if (Number(filesize) >= 30000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Filesize* : ${filesizeF}\n${fx} *Link* : ${a.data}\n\nDurasi Terlalu Panjang, Saya Kasih Link Aja`)
              const caption = `*[ YT MP4 ]*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
              sendMediaURL(thumb, caption)
              sendMediaURL(dl_link).catch(() => reply("file error"))
              })
              })
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'carimusik':
         case 'cariaudio':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return grupinv(mess.only.group)
              if (isQuotedAudio){
              const dlfile = await xiedev.downloadMediaMessage(JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo)
              const bodyForm = new FormData()
              bodyForm.append('audio', dlfile, 'music.mp3')
              bodyForm.append('apikey', `${zeks}`)
              axios('https://api.zeks.xyz/api/searchmusic', {
              method: 'POST',
              headers: {
              "Content-Type": "multipart/form-data",
              ...bodyForm.getHeaders()
              },
              data: bodyForm
              })
              .then(({data}) =>{
              if (data.status){
              reply(`*「 CARI MUSIK 」*\n\n${fx}*Title*: ${data.data.title}\n${fx} *Artists*: ${data.data.artists}\n${fx} *Genre*: ${data.data.genre}\n${fx} *Album*: ${data.data.album}\n${fx} *Release date*: ${data.data.release_date}`)
              } else reply(data.message)
              }).catch(() => reply(mees.error.eror))
              } else {
              reply('Gunakan Audio')
              }
              break
         case 'fb':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('facebook.com') && args.length < 1) return reply("Link Eror")
              reply(mess.wait)
              hx.fbdown(args[0])
              .then(res => {
              link = `${res.HD}`
              sendMediaURL(link, `*Link video_normal* : ${re.Normal_video}`)
              })
              break
         case 'ig':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('instagram.com') && args.length < 1) return reply("coba check link nya")
              reply(mess.wait)
              hx.igdl(args[0])
              .then(async (res) => {
              for (let i of res.medias) {
              if (i.url.includes("mp4")){
              let bufff = await getBuffer(i.url)
              xiedev.sendMessage(from, bufff, video, {quoted: xie, caption: `Type : ${i.type}`})
              } else {
              let buff = await getBuffer(i.url)
              xiedev.sendMessage(from, buff, image, {quoted: xie, caption: `Type : ${i.type}`})
              }
              }
              })
              break
         case 'igstalk':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply("Masukan Nama IG Nya")
              ig.fetchUser(args[0])
              .then(user => {
              thum = `${user.profile_pic_url_hd}`
              desc = `*ID* : ${user.profile_id}\n*Username* : ${args.join('')}\n*Full Name* : ${user.full_name}\n*Bio* : ${user.biography}\n*Followers* : ${user.followers}\n*Following* : ${user.following}\n*Private* : ${user.is_private}\n*Verified* : ${user.is_verified}\n\n*Link* : https://instagram.com/${args.join('')}`
              sendMediaURL(thum, desc)
              })
              break
         case 'igstory':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Masukan Nama IG Nya')
              hx.igstory(q)
              .then(async result => {
              for(let i of result.medias){
              if(i.url.includes('mp4')){
              let bufff = await getBuffer(i.url)
              xiedev.sendMessage(from, bufff, video, {quoted: xie, caption: `Type : ${i.type}`})
              } else {
              let buff = await getBuffer(i.url)
              xiedev.sendMessage(from, buff, image, {quoted: xie, caption: `Type : ${i.type}`})
              }
              }
              });
              break
         case 'tiktok':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('tiktok.com') && !q) return reply("Linknya Mana")
              sek = await reply(mess.wait)
              hx.ttdownloader(args[0])
              .then(res => {
              const {
              nowm
              } = res;
              axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
              .then(async (a) => {
              me = `link: ${a.data}`
              xiedev.sendMessage(from,{url:`${nowm}`},video,{mimetype:'video/mp4', quoted: xie, caption:me})
              setTimeout(() => {
              xiedev.deleteMessage(from, sek.key)
              }, 10000)
              })
              })
              .catch( e => console.log(e))
              break
         case 'tiktokaudio':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.eror)
              if (!q) return ('Linknya Mana')
              hx.ttdownloader(`${args[0]}`)
              .then(result => {
              const { audio} = result
              sendMediaURL(from,audio,'')
              })
              .catch(e => console.log(e))
              break
         case 'twitter':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('twitter.com') && !q) return reply("Linknya Mana")
              var res = await hx.twitter(args[0])
              sendMediaURL(res.HD, "Done!")
              break
         case 'mediafire':
         case 'mdf':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('Linknya Mana')
              if(!isUrl(args[0]) && !args[0].includes('mediafire')) return reply(mess.error.eror)
              if (Number(filesize) >= 30000) return reply(`${fx} *Nama :* ${res[0].nama}\n${fx} *Ukuran :* ${res[0].size}\n${fx} *Link :* ${res[0].link}\n\n*Maaf Size Melebihi Batas Maksimal, Silahkan Klik Link Diatas*`)
              reply(mess.wait)
              teks = args.join(' ')
              res = await mediafireDl(teks)
              result = `${fx} *Nama :* ${res[0].nama}
${fx} *Ukuran :* ${res[0].size}

*File Sedang Dikirim*`
              reply(result)
              sendFileFromUrl(res[0].link, document, {mimetype: res[0].mime, filename: res[0].nama, quoted: xie})
              break
         case 'lirik':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Judul Lagunya Apa')
              let song = await hx.lirik(q);
              sendMediaURL(song.thumb, song.lirik)
              break
         case 'pinterest':
         case 'img':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Mau Cari Gambar Apa')
              let pin = await hx.pinterest(q)
              let ac = pin[Math.floor(Math.random() * pin.length)]
              let buff = await getBuffer(ac)
              ucapnya = `Pinterest : ${q}`
              imgnya = await xiedev.prepareMessage(from, buff, image, {thumbnail: buff})
              gbutsan = [
                {buttonId: `${prefix + command}${q}`, buttonText: {displayText: `${q}`}, type: 1}
              ]
              gbuttonan = {
                imageMessage: imgnya.message.imageMessage,
                contentText: `${ucapnya}`,
                footerText: `Jika Mau Lagi Klik Dibawah!`,
                buttons: gbutsan,
                headerType: 4
              }
              await xiedev.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('fxsxdev.jpg'),caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: xie})
              break
         case 'image':
         case 'ggimg':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('Mau Cari Gambar Apa')
              teks = args.join(' ')
              res = await googleImage(teks, google)
              function google(error, result){
              if (error) return reply(mess.error.eror)
              else {
              var gugIm = result
              var random =  gugIm[Math.floor(Math.random() * gugIm.length)].url
              sendFileFromUrl(random, image, {quoted: xie, caption: `*Hasil Pencarian Dari :* ${teks}`})
              }
              }
              break
         case 'penyegar':
         case 'asupan':
              if (!isUserXie) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              xiedev.updatePresence(from, Presence.composing)
              data = fs.readFileSync('./lib/asupan.js')
              jsonData = JSON.parse(data)
              randXiedev = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randXiedev];
              asupan = await getBuffer(randKey.result)
              vidnya = await xiedev.prepareMessage(from, asupan, video)
              const butt = [
                    {buttonId:`${prefix + command}`,buttonText:{displayText:'Asupan'},type:1}
              ]
              const buttonMessages = {
              videoMessage: vidnya.message.videoMessage,
              contentText: `Video Asupan Done Kak`,
              footerText: "Jika Ingin Lagi Silahkan Klik Dibawah",
              buttons: butt,
              headerType: 5
              }
              await xiedev.sendMessage(from, buttonMessages, MessageType.buttonsMessage, {mimetype: 'video/mp4', contextInfo: {mentionedJid: [sender]}})
              break
//>>>>>>>>>[ END DOWNLOAD ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS OWNER ]<<<<<<<<<<\\
         case 'self':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              public = false
              return reply(`*MODE : SELF*`)
              break
			case 'public':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              public = true
              return reply(`*MODE : PUBLIC*`)
              break
         case 'banchat':
         case 'mute':
              if (!itsMe && !isOwner) return
              if (isBanchat) return reply(`_Already Ban Chat In This Group!_`)
              bancht.push(from)
              fs.writeFileSync('./database/banchat.json', JSON.stringify(bancht))
              reply(mess.sucess)
              break
         case 'unbanchat':
         case 'unmute':
              if (isBanchat){
              if (!itsMe && !isOwner) return
              if (!isBanchat) return reply(`_Already Unban Chat In This Group!_`)
              let anu = bancht.indexOf(from)
              bancht.splice(anu, 1)
              fs.writeFileSync('./database/banchat.json', JSON.stringify(bancht))
              reply(mess.sucess)
              }
              break
         case 'setprefix':
              if (!isOwner) return reply(mess.only.ownerXie)
              if (args.length < 1) return reply('Textnya Mana')
              prefix = args[0]
              reply(`Sukses Set Menjadi : ${prefix}`)
              break
         case 'sethias':
         case 'sethiasan':
              if (!isOwner) return reply(mess.only.ownerXie)
              if (args.length < 1) return reply('Textnya Mana')
              fx = args[0]
              reply(`Sukses Set Menjadi : ${fx}`)
              break
         case 'setzeks':
              if (!isOwner) return reply(mess.only.ownerXie)
              if (args.length < 1) return reply('Textnya Mana')
              zeks = args[0]
              reply(`Sukses Set Menjadi : ${zeks}`)
              break
         case 'setnamabot':
              if (!isOwner) return reply(mess.only.ownerXie)
              if (args.length < 1) return reply('Textnya Mana')
              namabot = args[0]
              reply(`Sukses Set Menjadi : ${namabot}`)
              break
         case 'clearall':
              if (!isOwner) return reply(mess.only.ownerXie)
              anu = await xiedev.chats.all()
              xiedev.setMaxListeners(25)
              for (let _ of anu) {
              xiedev.deleteChat(_.jid)
              }
              reply(mess.sucess)
              break
         case 'delow':
         case 'dow':
              if (!isOwner) return reply(mess.only.ownerXie)
              xiedev.deleteMessage(from, { id: xie.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
              break
         case 'ban':
				  xiedev.updatePresence(from, Presence.composing) 
				  if (args.length < 1) return
				  if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
				  mentioned = xie.message.extendedTextMessage.contextInfo.mentionedJid
			     ban = mentioned
				  reply(`Berhasil Banned : ${ban}`)
				  break
         case 'unban':
				  if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
				  bnnd = body.slice(8)
				  ban.splice(`${bnnd}@s.whatsapp.net`, 1)
			     reply(`Nomor wa.me/${bnnd} telah di unban!`)
				  break
         case 'block':
				  xiedev.updatePresence(from, Presence.composing) 
				  if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
				  xiedev.blocked (`${body.slice(7)}@c.us`, "add")
				  reply(`Perintah Diterima, Memblokir ${body.slice(7)}@c.us`)
				  break
         case 'unblock':
				  if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
				  xiedev.blocked (`${body.slice(9)}@c.us`, "remove")
				  reply(`perintah Diterima, Membuka Blokir ${body.slice(9)}@c.us`)
				  break 
         case 'bc':
              if (!isOwner) return reply(mess.only.ownerXie)
              if (args.length < 1) return reply('Textnya Mana')
              anu = await xiedev.chats.all()
              if (isMedia && !xie.message.videoMessage || isQuotedImage) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              buff = await xiedev.downloadMediaMessage(encmedia)
              for (let _ of anu) {
              xiedev.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
              }
              reply(mess.sucess)
              } else {
              for (let _ of anu) {
              sendMess(_.jid, `[ Ini Broadcast ]\n\n${body.slice(4)}`)
              }
              reply(mess.sucess)
              }
              break
         case 'bc2':
              if (!isOwner) return reply(mess.only.ownerXie)
              if (args.length < 1) return reply('Textnya Mana')
              anu = await xiedev.chats.all()
              if (isMedia && !xie.message.videoMessage || isQuotedImage) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              buff = await xiedev.downloadMediaMessage(encmedia)
              for (let _ of anu) {
              xiedev.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
              }
              reply(mess.sucess)
              } else {
              for (let _ of anu) {
              sendMesss(_.jid, `${body.slice(4)}`, "*_Broadcast FxSx_*", {jpegThumbnail: fs.readFileSync('./eror/asistenxie.jpg')}, 
              [
                {buttonId:`${prefix}daftarmenu`,buttonText:{displayText:'DAFTAR MENU'},type:1},
                {buttonId:`${prefix}info`,buttonText:{displayText:'INFO BOT'},type:1}

              ], {contextInfo: {mentionedJid: [anu]}})
              }
              reply(mess.sucess)
              }
              break
         case 'clone':
              if (!isOwner) return reply(mess.only.ownerXie)
              if (args.length < 1) return reply('Tag target yang ingin di clone')
              if (xie.message.extendedTextMessage === undefined || xie.message.extendedTextMessage === null) return reply('Tag cvk')
              mentioned = xie.message.extendedTextMessage.contextInfo.mentionedJid[0]
              let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
              try {
              pp = await xiedev.getProfilePicture(id)
              buffer = await getBuffer(pp)
              xiedev.updateProfilePicture(botNumber, buffer)
              mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'scmd':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              if (isQuotedSticker) {
              if (!q) return reply(`Penggunaan : ${prefix + command} cmdnya dan tag stickernya`)
              var kodenya = xie.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              sCmd(kodenya, q)
              reply(mess.sucess)
              } else {
              reply('Reply Stickernya')
              }
              break
          case 'delcmd':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              if (!isQuotedSticker) return reply(`Penggunaan : ${prefix + command} tagsticker`)
              var kodenya = xie.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              _stikcmd.splice(getCommandPosition(kodenya), 1)
              fs.writeFileSync('./database/scmd.json', JSON.stringify(_stikcmd))
              reply(mess.sucess)
              break
         case 'addrespon':{
              if (!isOwner && !xie.key.fromMe) return reply(mess.owner)
              if (args.length < 1) return reply(`Contoh : ${prefix}addrespon Hai|Tayo`)
              let input1 = body.slice(11)
              if (!input1.includes('|')) return reply(`Contoh : ${prefix}addrespon Hai|Tayo`)
              let input = input1.split("|")
              if (checkCommands(input[0], commandsDB) === true) return reply(`Command tersebut sudah ada`)
              addCommands(input[0], input[1], sender, commandsDB) 
              reply(`Key : ${input[0]}\nRespon : ${input[1]}\n\nRespon Berhasil Di Set`)
              }
              break
         case 'dellrespon':
         case 'delrespon':{
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              if (args.length < 1) return reply(`Contoh : ${prefix}delrespon Key`)
              if (!checkCommands(body.slice(11), commandsDB)) return reply(`Key Tidak Ada Di Database`)
              deleteCommands(body.slice(11), commandsDB)
              reply(`Berhasil Menghapus Respon Dengan Key : ${body.slice(11)}`)
              }
              break
         case 'join':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              setTimeout( () => {
              xiedev.query({json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]})
              reply('Sukses Beb')
              }, 10000)
              setTimeout( () => {
              reply('Oke Beb')
              }, 0)
              break
         case 'leave':
         case 'outgc':
              if (!isGroup) return grupinv(mess.only.group)
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              anu = await xiedev.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
              break
         case 'setthumb':
         case 'setffoto':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xiedev.downloadMediaMessage(encmedia)
              fs.writeFileSync('./eror/fxsxdev.jpg', media)
              reply('Sukses Beb😉')
              break
         case 'setthumb2':
         case 'setffoto2':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xiedev.downloadMediaMessage(encmedia)
              fs.writeFileSync('./eror/asistenxie.jpg', media)
              reply('Sukses Beb😉')
              break
         case 'welcomow':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              if (!isGroup) return grupinv(mess.only.group)
              if (args.length < 1) return reply('On Mengaktifkan\nOff Menonaktifkan')
              if ((args[0]) === 'on') {
              if (isWelkom) return reply('Welcome Sudah On')
              welkom.push(from)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              } else if ((args[0]) === 'off') {
              if (isWelkom) return reply('Welcome Sudah Off')
              welkom.splice(from, 1)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              } else {
              reply('On Mengaktifkan\nOff Menonaktifkan')
              }
              break
         case 'rdmppbot':
		    	  random = Math.floor(Math.random() * 6) + 1
		        ppbott = fs.readFileSync(`./src/${random}.jpg`)
		     	  xiedev.sendMessage(from, ppbott, image, {quoted: ftroli})
		        break
         case 'viewonce':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerXie)
              ress = await xiedev.prepareMessageFromContent(from,{
              "viewOnceMessage": {
              "message": {
              "imageMessage": {
              "mimetype": 'image/jpeg',
              "jpegThumbnail": fs.readFileSync('./eror/asistenxie.jpg'),
              "viewOnce": true
              }
              }
              }
              }, {}) 
              xiedev.relayWAMessage(ress)
              break
         case 'tes1':
              if (!isOwner) return reply(mess.only.ownerXie)
              var butproduct = xiedev.prepareMessageFromContent(from, {
                  "listMessage": {
						"title": "Xie Dev Team",
						"description": `Hallo Owner Ku\nSenang Bertemu Dengan Anda,
						"buttonText": "",
						"listType": "PRODUCT_LIST",
						"productListInfo": {
						"productSections": [
								{
									"title": "Scpirt By Xie Dev Team",
									"products": [
									 {
									   "productId": "4559966904061216",
									 }
								  ]
								}
							],
							"headerImage": {
								"productId": "Author FxSx",
								"jpegThumbnail": fs.readFileSync('./eror/asistenxie.jpg')
							},
							"businessOwnerJid": "0@s.whatsapp.net"
						},
						"footerText": "\nAuthor FxSx"
					}
				}, {quoted: xie})
				xiedev.relayWAMessage(butproduct, {waitForAck: false})
            break
       case 'tes2':
            if (!isOwner) return reply(mess.only.ownerXie)
            listp = await xiedev.prepareMessageFromContent(from, {
					"productMessage": {
						"product": {
							"productImage": {
								"mimetype": "image/jpeg",
								"jpegThumbnail": fs.readFileSync('./eror/asistenxie.jpg')
							},
							"title": "XIE DEV TEAM",
							"description": "Done Fake Product!",
							"currencyCode": "IDR",
							"priceAmount1000": "10000",
							"productImageCount": 1,
							"salePriceAmount1000": "0"
						},
						"businessOwnerJid": "6283818221226@s.whatsapp.net"
					}
				}, {quoted: xie})
            xiedev.relayWAMessage(listp, {waitForAck: true})
            break
       case 'tes7': // Fake Product By Yt : ZEROBOT
            if (!isOwner) return reply(mess.only.ownerXie)
            menunya = `Done Owner`
            ppbotnya = 'https://i.ibb.co/xM9j6sZ/xieee.jpg' 
            imagi = await xiedev.toMSG({ url: ppbotnya }, 'imageMessage')
            imagi['jpegThumbnail'] = await getBuffer(ppbotnya);
            imagi.fileLength = 5000000000;
            const frreply = {
					"productMessage": {
						"product": {
							"productImage": imagi,
							"productId": "4559966904061216",
							"title": `XIE BOT`,
							"description" : `${menunya}`,
	                  "productImageCount": 1,
	                  "currencyCode": "IDR",
	                  "url": "https://wa.me/6283815956151" ,
	                  "priceAmount1000": "50000000"
						  },
                  "businessOwnerJid": "6283818221226@s.whatsapp.net"
               }
            }
            emsce = await xiedev.prepareMessageFromContent(from, frreply, {quoted: ftroli, sendEphemeral: true})
            xiedev.relayWAMessage(emsce)
            break
       case 'about2':
	         ucapnya = `
╭𖧹「 *INFO BOT* 」
${fx} Author: FxSx
${fx} Nama Bot: ${namabot}
${fx} Prefix: ${prefix}
╰─────𖧹

╭𖧹「 *ABOUT* 」
${fx} ${prefix}author
${fx} ${prefix}owner
${fx} ${prefix}status
${fx} ${prefix}info
${fx} ${prefix}speed
${fx} ${prefix}listmute
${fx} ${prefix}blocklist
${fx} ${prefix}banlist
${fx} ${prefix}listscmd
${fx} ${prefix}listrespon
${fx} ${prefix}chatlist
${fx} ${prefix}listgrup
${fx} ${prefix}bahasa
╰─────𖧹`
              data = fs.readFileSync('./lib/imagexie.js');
              jsonData = JSON.parse(data);
              randXiedev = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randXiedev];
              randImg = await getBuffer(randKey.image)
              imgnya = await xiedev.prepareMessage(from, randImg, image, {thumbnail: randImg})
	           const fduct = {
					"productMessage": {
						"product": {
							"productImage": imgnya,
							"productId": "6017724624966444",
							"title": "XieBot",
							"description": `${ucapnya}`,
							"currencyCode": "IDR",
							"priceAmount1000": "20000",
							"productImageCount": 1,
							"salePriceAmount1000": "0"
						},
						"businessOwnerJid": "6283818221226@s.whatsapp.net"
					}
				}
            emsce = await xiedev.prepareMessageFromContent(from, fduct, {quoted: ftroli})
            xiedev.relayWAMessage(emsce)
            break
       case 'tes4':
            await faketoko(teks = "Ada Apa Owner?", url_image = "https://i.ibb.co/xM9j6sZ/xieee.jpg", title = "Xie Dev Team", code = "IDR", price = 10000)
            break
//>>>>>>>>>[ END OWNER ]<<<<<<<<<<\\
         default:
              if (isGroup && budy != undefined) {
              } else {
              console.log(color('[XIE-BOT]','red'), 'Tidak Ada Perintah', color(sender.split('@')[0], 'aqua'))
              }
              }
		        } catch (e) {
			     console.log('Error : %s', color(e, 'red'))
         }
	 })
}
starts()

// Maaf Bang Fiturnya Dikit
// Insya Allah Pasti Work Semua
// Awa Aja Lu Ngaku Ini Esce Lu Anjeng!
