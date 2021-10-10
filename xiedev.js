// Scpirt By Xie Dev Team
// Jangan Di Jual!
// Recode Sewajarnya Aja
// Nama Author Jangan Dihapus!!
// All Fitur Work!
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
const ig = require('insta-fetcher');
const hx = require("hxz-api")
const ffmpeg = require('fluent-ffmpeg')
const yts = require( 'yt-search')
const { removeBackgroundFromImageFile } = require('remove.bg')
const cd = 4.32e+7
const lolis = require('lolis.life')
const loli = new lolis()

const { fetchJson } = require('./lib/fetcher')
const { color, bgcolor } = require('./lib/color')
const { antiSpam } = require('./lib/antispam')
const { mediafireDl } = require('./lib/mediafire.js')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { getBuffer, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')

const user = JSON.parse(fs.readFileSync('./database/user.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const _stikcmd = JSON.parse(fs.readFileSync('./database/scmd.json'))
const ban = JSON.parse(fs.readFileSync('./database/ban.json'))
const blocked = JSON.parse(fs.readFileSync('./database/blocked.json'))
const afk = JSON.parse(fs.readFileSync('./database/afk.json'))
const bancht = JSON.parse(fs.readFileSync('./database/banchat.json'))

const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Owner\n'
            + 'ORG:Xie Bot;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6283815956151:+62 838-1595-6151\n'
            + 'END:VCARD'

public = false
prefix = "#"
fx = "❏"
authorbot = "Author FxSx"
namabot = "Xie Bot"

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
		console.log(color('[ SCAN ]','aqua'), color('Waktu 30 Detik', 'yellow'))
	})

	fs.existsSync('./xiedevteam.json') && xiedev.loadAuthInfo('./xiedevteam.json')
	xiedev.on('connecting', () => {
		start('2', 'Proses...')
	})
	xiedev.on('open', () => {
		success('2', 'Done!')
	})
	await xiedev.connect({timeoutMs: 30*1000})
   fs.writeFileSync('./xiedevteam.json', JSON.stringify(xiedev.base64EncodedAuthInfo(), null, '\t'))
   

	xiedev.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
			try {
            mem = anu.participants[0]
			   console.log(anu)
            try {
            pp_user = await xiedev.getProfilePicture(mem)
            } catch (e) {
            pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            try {
            pp_grup = await xiedev.getProfilePicture(anu.jid)
            } catch (e) {
            pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
       if (anu.action == 'add') {
            mdata = await xiedev.groupMetadata(anu.jid)
            member = mdata.participants.length
        	   num = anu.participants[0]
            anu_user = xiedev.contacts[mem]
            halo = await fs.readFileSync('./mp3/halo.mp3')
            teks = `*Welcome* @${num.split('@')[0]}`
	         buffer = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome2?nama=${encodeURIComponent(anu_user.notify)}&descriminator=${member}&memcount=${member}&gcname=${encodeURIComponent(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=${pp_grup}`)
            xiedev.sendMessage(mdata.id, buffer, MessageType.image, {thumbnail: buffer, quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]}`, orderTitle: `Welcome @${num.split('@')[0]}`, thumbnail: fs.readFileSync('./src/fotobot.jpg'), sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, caption: teks})
            xiedev.sendMessage(mdata.id, halo, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]}`, orderTitle: `Welcome @${num.split('@')[0]}`, thumbnail: fs.readFileSync('./src/fotobot.jpg'), sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true, seconds: 99999999})
            }
            if (anu.action == 'remove') {
                mdata = await xiedev.groupMetadata(anu.jid)
              	 num = anu.participants[0]
                anu_user = xiedev.contacts[mem]
                member = mdata.participants.length
                halo = await fs.readFileSync('./mp3/jamet.mp3')
                teks = `*Sayonara* @${num.split('@')[0]} Jamet:v`
                buffer = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye2?nama=${encodeURIComponent(anu_user.notify)}&descriminator=${member}&memcount=${member}&gcname=${encodeURIComponent(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=${pp_grup}`)
                xiedev.sendMessage(mdata.id, buffer, MessageType.image, {thumbnail: buffer, quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Sayonara @${num.split('@')[0]}`, orderTitle: `Sayonara @${num.split('@')[0]}`, thumbnail: fs.readFileSync('./src/fotobot.jpg'), sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, caption: teks})
                xiedev.sendMessage(mdata.id, halo, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Sayonara @${num.split('@')[0]}`, orderTitle: `Sayonara @${num.split('@')[0]}`, thumbnail: fs.readFileSync('./src/fotobot.jpg'), sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true, seconds: 99999999})
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
      }

   })
	
	xiedev.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	xiedev.on('chat-update', async (team) => {
		   try {
			if (!team.hasNewMessage) return
			team = team.messages.all()[0]
			if (!team.message) return
			if (team.key && team.key.remoteJid == 'status@broadcast') return
			if (team.key.id.startsWith('3EB0') && team.key.id.length === 12) return
			global.prefix
			global.blocked
			team.message = (Object.keys(team.message)[0] === 'ephemeralMessage') ? team.message.ephemeralMessage.message : team.message
			const content = JSON.stringify(team.message)
			const from = team.key.remoteJid
			const type = Object.keys(team.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')
         const cmd = (type === 'conversation' && team.message.conversation) ? team.message.conversation : (type == 'imageMessage') && team.message.imageMessage.caption ? team.message.imageMessage.caption : (type == 'videoMessage') && team.message.videoMessage.caption ? team.message.videoMessage.caption : (type == 'extendedTextMessage') && team.message.extendedTextMessage.text ? team.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(team.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(team.message.stickerMessage.fileSha256.toString('hex')) !== undefined) ? getCmd(team.message.stickerMessage.fileSha256.toString('hex')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
			body = (type === 'listResponseMessage' && team.message.listResponseMessage.title) ? team.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && team.message.buttonsResponseMessage.selectedButtonId) ? team.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && team.message.conversation.startsWith(prefix)) ? team.message.conversation : (type == 'imageMessage') && team.message.imageMessage.caption.startsWith(prefix) ? team.message.imageMessage.caption : (type == 'videoMessage') && team.message.videoMessage.caption.startsWith(prefix) ? team.message.videoMessage.caption : (type == 'extendedTextMessage') && team.message.extendedTextMessage.text.startsWith(prefix) ? team.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(team.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(team.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(team.message.stickerMessage.fileSha256.toString('base64')) : ""
			budy = (type === 'conversation') ? team.message.conversation : (type === 'extendedTextMessage') ? team.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const arg = body.substring(body.indexOf(' ') + 1)
			const args = body.trim().split(/ +/).slice(1)
			const ar = args.map((v) => v.toLowerCase())
			chats = (type === 'conversation') ? team.message.conversation : (type === 'extendedTextMessage') ? team.message.extendedTextMessage.text : ''
			const argss = chats.slice(command.length + 2, chats.length)
			const q = args.join(' ')
			const isCmd = body.startsWith(prefix)

			const botNumber = xiedev.user.jid
			const ownerNumber = ["6283873517269@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? team.participant : team.key.remoteJid
			const groupMetadata = isGroup ? await xiedev.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const itsMe = sender == botNumber ? true : false
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isBanchat = isGroup ? bancht.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUser = user.includes(sender)
			const isBanned = ban.includes(sender)
			const conts = team.key.fromMe ? xiedev.user.jid : xiedev.contacts[sender] || { notify: jid.replace(/@.+/, '') }
         const pushname = team.key.fromMe ? xiedev.user.name : conts.notify || conts.vname || conts.name || '-'
			const mentionByTag = type == "extendedTextMessage" && team.message.extendedTextMessage.contextInfo != null ? team.message.extendedTextMessage.contextInfo.mentionedJid : []
			const mentionByReply = type == "extendedTextMessage" && team.message.extendedTextMessage.contextInfo != null ? team.message.extendedTextMessage.contextInfo.participant || "" : ""
			const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
			mention != undefined ? mention.push(mentionByReply) : []
			const mentionUser = mention != undefined ? mention.filter(n => n) : []
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				xiedev.sendMessage(from, teks, text, {quoted: team})
			}
			const sendMess = (hehe, teks) => {
				xiedev.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? xiedev.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : xiedev.sendMessage(from, teks.trim(), extendedText, {quoted: team, contextInfo: {"mentionedJid": memberr}})
			}
			const fakethumb = (teks, yes) => {
            xiedev.sendMessage(from, teks, image, {thumbnail: fs.readFileSync('./src/fotobot.jpg'), quoted: team, caption: yes})
         }
         function monospace(string) {
         return '```' + string + '```'
         }
         function jsonformat(string) {
         return JSON.stringify(string, null, 2)
         }
         
         const ftroli = {key: {fromMe:false, participant:`6283815956151@s.whatsapp.net`, ...(from ? {remoteJid :"status@broadcast" }: {}) },message:{"orderMessage":{"orderId":"174238614569481","thumbnail": fs.readFileSync('./src/fotobot.jpg'),"itemCount":29,"status":"INQUIRY","surface":"CATALOG","message": namabot,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}}
         
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
          xiedev.sendMessage(from, media, type, { quoted: team, mimetype: mime, caption: text, contextInfo: {"mentionedJid": mids}})
                    
          fs.unlinkSync(filename)
          });
         }
         
			const sendFileFromUrl = async(link, type, options) => {
             hasil = await getBuffer(link)
	          xiedev.sendMessage(from, hasil, type, options).catch(e => {
	      fetch(link).then((hasil) => {
	          xiedev.sendMessage(from, hasil, type, options).catch(e => {
	          xiedev.sendMessage(from, { url : link }, type, options).catch(e => {
	          reply('Maaf Eror, Saat Mendownload Dan Kirim File')
	          console.log(e)
             })
            })
           })
          })
         }
         
         mess = {
				wait: '*Sedang Diproses*',
				sukses: '*Sukses*',
				error: {
					eror: '*Eror*',
					link: '*Link Invalid*'
				},
				only: {
					group: '*Khusus Group*',
					benned: '*Maaf Nomer Kamu Tidak Bisa Gunakan Xie Bot*',
					ownerG: '*Khusus Owner Group*',
					ownerB: '*Khusus Owner Xie*',
					premium: '*Khusus Premium Xie*',
					userB: `Hai ${pushname}\nKamu Belum Terdaftar\nSilahkan Ketik : ${prefix}daftar`,
					admin: '*Khusus Admin Group*',
					Badmin: '*Jadikan Xie Bot Admin Dulu*'
				}
			}
         
         const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
             try {
		       ppUser = await xiedev.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
		       } catch {
		       ppUser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
		       }
	        	 buffer = await getBuffer(ppUser)
             imgnya = await xiedev.prepareMessage(from, buffer, location, {thumbnail: buffer})
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
             data = fs.readFileSync('./lib/image.js');
             jsonData = JSON.parse(data);
             randXiedev = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randXiedev];
             buffer = await getBuffer(randKey.image)
             imgnya = await xiedev.prepareMessage(from, buffer, location, {thumbnail: buffer})
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
         const daftar2 = `${authorbot}`
         const daftar3 = [
         {
            buttonId: `${prefix}daftar`,
            buttonText: {
              displayText: `DAFTAR USER`,
            },
            type: 1,
         },]
         
         const banned1 = `Hai ${pushname}\nNomer Kamu Sudah Terbanned\nJika Ingin Dibuka Banned Nya Silahkan Hubungi Owner!`
         const banned2 = `${authorbot}`
         const banned3 = [
         {
            buttonId: `${prefix}owner`,
            buttonText: {
              displayText: `OWNER BOT`,
            },
            type: 1,
         },]
			
			// Antispam 6 Detik
         if (isCmd && antiSpam.isFiltered(from) && !isGroup) {
         console.log(color('[ SPAM ]', 'aqua'), color(time, 'red'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'))
         return reply('Mohon Jangan Spam\nKasih Waktu 6 Detik!')
         }
        
         if (isCmd && antiSpam.isFiltered(from) && isGroup) {
         console.log(color('[ SPAM ]', 'aqua'), color(time, 'red'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'), 'in', color(groupName, 'green'))
         return reply('Mohon Jangan Spam\nKasih Waktu 6 Detik!')
         }
			
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
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
         
         if (budy.startsWith('+')){
         try {
     	   if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
         return xiedev.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: ftroli})
         } catch(err) {
         e = String(err)
         reply(e)
         }
         }
         
         if (budy.startsWith('x')){
         try {
         if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
         return xiedev.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: team})
         } catch(err) {
         e = String(err)
         reply(monospace(e))
         }
         }
         
         if (budy.startsWith('>')){
		   if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
			console.log(color('[ EVAL ]'), color(moment(team.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Xie Eval V1 :~`))
			try{
			reply(require('util').format(await eval(`;(async () => { ${chats.slice(2)} })()`)))
         }catch(err){
	      e = String(err)
       	reply(monospace(e))
	      }
         }
         
         if (budy.startsWith('<')){
         if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
         console.log(color('[ EVAL ]'), color(moment(team.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Xie Eval V2 :~`))
         ras = budy.slice(1)
         function _(rem) {
         ren = JSON.stringify(rem,null,2)
         pes = util.format(ren)
         reply(monospace(pes))
         }
         try{
         reply(require('util').format(eval(`(async () => { ${ras} })()`)))
         } catch(err) {
         e = String(err)
         reply(monospace(e))
         }
         }
         
         if (itsMe){
         if (chats.toLowerCase() == `${prefix}self`){
         public = false
         reply(`Success`, `Status : Self`)
         }
         if (chats.toLowerCase() == 'status'){
         reply(`STATUS : ${public ? 'Public' : 'Self'}`)
         }
         }
         if (!public){
         if (!team.key.fromMe) return
         }
         
			if (isCmd && !isGroup) console.log(color('[CMD PRIVAT]', 'aqua'), color(time, 'green'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'blue'))
         if (isCmd && isGroup) console.log(color('[CMD GROUP]', 'aqua'), color(time, 'green'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'blue'), 'in', color(groupName, 'aqua'))
			
			if (isCmd && !isOwner) antiSpam.addFilter(from)
			
			switch(command) {
			case 'menu':
			case 'help':
			     if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
			     if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
			     menunya = `
╭${fx}「 INFO 」
├ Author: FxSx
├ Owner: ${isOwner ? "🤗":"🤔"}
└ Prefix: ${prefix}

╭${fx}「 ABOUT 」
├ ${prefix}owner
├ ${prefix}status
├ ${prefix}info
├ ${prefix}rules
├ ${prefix}bahasa
├ ${prefix}banlist
├ ${prefix}blocklist
└ ${prefix}listscmd

╭${fx}「 GROUP 」
├ ${prefix}welcome on/off
├ ${prefix}grup buka/tutup
├ ${prefix}linkgrup
├ ${prefix}resetlinkgc
├ ${prefix}infogrup
├ ${prefix}add
├ ${prefix}kick
├ ${prefix}tagall
├ ${prefix}hidetag
├ ${prefix}listadmin
├ ${prefix}liston
└ ${prefix}pemilikgrup

╭${fx}「 FUNNY 」
├ ${prefix}afk
├ ${prefix}sticker
├ ${prefix}toimg
└ ${prefix}tts

╭${fx}「 DOWNLOAD 」
├ ${prefix}play
├ ${prefix}ytsearch
├ ${prefix}ytmp3
├ ${prefix}ytmp4
├ ${prefix}ig
├ ${prefix}igstalk
├ ${prefix}igstory
├ ${prefix}tiktok
├ ${prefix}mediafire
├ ${prefix}pinterest
└ ${prefix}asupan

╭${fx}「 OWNER 」
├ ${prefix}public
├ ${prefix}self
├ ${prefix}mute
├ ${prefix}unmute
├ ${prefix}setprefix
├ ${prefix}sethias
├ ${prefix}setauthor
├ ${prefix}setnamabot
├ ${prefix}setthumb
├ ${prefix}ban
├ ${prefix}unban
├ ${prefix}block
├ ${prefix}unblock
├ ${prefix}scmd
├ ${prefix}delcmd
├ ${prefix}clearall
├ ${prefix}bc
├ ${prefix}clone
├ ${prefix}join
├ ${prefix}leave
├ > [code]
├ < [code]
├ + [code]
└ x [code]
`
              sendButtLocation(from, `${menunya}`, `${authorbot}`, {jpegThumbnail: fs.readFileSync('./src/fotobot.jpg')}, 
              [
                 {buttonId:`${prefix}owner`,buttonText:{displayText:'OWNER'},type:1},

                 {buttonId:`${prefix}info`,buttonText:{displayText:'INFO BOT'},type:1}

              ], {quoted: team, contextInfo: {"mentionedJid": [sender]}})
			     break
//>>>>>>>>>[ KHUSUS INFO BOT ]<<<<<<<<<<\\
         case 'owner':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
			     if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
			     xiedev.sendMessage(from, {displayName: "xiiee", vcard: vcard}, contact, {quoted: team})
              break
         case 'status':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
			     if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
			     const status = public ? "PUBLIC":"SELF"
			     return reply(`STATUS : ${status}`)
			     break
         case 'info':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              me = xiedev.user
				  uptime = process.uptime()
              teksnya = `╭${fx}「 INFO BOT 」\n├ Nama bot : ${me.name}\n├ Nomor Bot : @${me.jid.split('@')[0]}\n├ Prefix : ${prefix}\n├ Total Block : ${blocked.length}\n└ Aktif Bot : ${kyun(uptime)}`
              data = fs.readFileSync('./lib/image.js');
              jsonData = JSON.parse(data);
              randXiedev = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randXiedev];
              buffer = await getBuffer(randKey.image)
              xiedev.sendMessage(from, buffer, image, {thumbnail: buffer, quoted: team, caption: teksnya})
              break
         case 'rules':
         case 'rulesbot':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              teksnya = `「 RULES BOT 」\n1. Teks dan nama pengguna WhatsApp anda kami simpan di dalam server selama bot aktif.\n2. Data anda akan di hapus ketika bot offline.\n3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim.\n4. Kami tidak pernah meminta anda untuk memberikan informasi pribadi.\n5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot.\n6. Cukup perintah 1x jika bot tidak merespon harap ulangi kembali, Jika di ulangi kembali tidak merespon, Bot tidak aktif\n7. Dilarang spam, Share virus virtex, Telpon, Video call, Bot Akan Blocks Otomatis.\n8. Apapun yang anda perintah pada bot ini, OWNER TIDAK BERTANGGUNG JAWAB!\n\n*TERIMA KASIH*`
              const fduc2 = {
					"productMessage": {
						"product": {
							"productImage": {
								"url": "https://mmg.whatsapp.net/d/f/Ahn1QvxbhABRggFOJXoaohrfnXE5MGvQbg9--aFolZ_Y.enc",
								"mimetype": "image/jpeg",
								"fileSha256": "ViRNzid9QeEsJCaZcseZCjzx+DMZo2tD+fGWKjuSNyg=",
								"fileLength": "5000000",
								"height": 450,
								"width": 845,
								"mediaKey": "UAG49T+qficzxxf1mw0S2Q6HXgbNpwVOaon5Gf3W2nM=",
								"fileEncSha256": "PQ3NUWG1y8b9qVmrnel1iA2Ca5G145QxtAJnveLr7Cc=",
								"directPath": "/v/t62.7118-24/40999194_223465573147244_6081626207846738390_n.enc?ccb=11-4&oh=1343f6895dcc4e6b28a8e35e2aefe599&oe=617BF69C",
								"mediaKeyTimestamp": "1632884125",
								"jpegThumbnail": fs.readFileSync('./src/fotobot.jpg')
							},
							"productId": "4559966904061216",
							"title": "RULES XIE",
							"description": `${teksnya}`,
							"currencyCode": "IDR",
							"priceAmount1000": "30000",
							"productImageCount": 1,
							"salePriceAmount1000": "0"
						 },
						"businessOwnerJid": "6283818221226@s.whatsapp.net"
					  }
				  },
			  	  ress = await xiedev.prepareMessageFromContent(from, fduc2, {quoted: ftroli, contextInfo: {"mentionedJid": [sender]}})
              xiedev.relayWAMessage(ress)
              break
         case 'bahasa':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              xiedev.sendMessage(from, bahasa(fx), text)
              break
         case 'banlist':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
				  ben = 'LIST BANNED :\n'
				  for (let banned of ban) {
					   ben += `~> @${banned.split('@')[0]}\n`
				  }
				  ben += `Total : ${ban.length}`
				  xiedev.sendMessage(from, ben.trim(), extendedText, {quoted: team, contextInfo: {"mentionedJid": ban}})
				  break
         case 'blocklist':
         case 'listblock':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              teks = 'Daftar Block :\n'
              for (let block of blocked) {
              teks += `~> @${block.split('@')[0]}\n`
              }
              teks += `Total : ${blocked.length}`
              xiedev.sendMessage(from, teks.trim(), extendedText, {quoted: team, contextInfo: {"mentionedJid": blocked}})
              break
         case 'listscmd':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              let teksnyee = `「 LIST CMD STICKER 」`
              let cemde = [];
              for (let i of _stikcmd) {
              cemde.push(i.id)
              teksnyee += `\n\n*${fx} ID :* ${i.id}\n*${fx} Cmd :* ${i.chats}`
              }
              reply(teksnyee)
              break
         case 'fotobot':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              captionnya = `*Owner:* ${isOwner ? "🤗":"🤔"}`
              data = fs.readFileSync('./lib/image.js');
              jsonData = JSON.parse(data);
              randXiedev = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randXiedev];
              buffer = await getBuffer(randKey.image)
              xiedev.sendMessage(from, buffer, image, {thumbnail: buffer, quoted: team, caption: captionnya})
              break
         case 'daftar':
              xiedev.updatePresence(from, Presence.composing)
              if (isUser) return reply('*Kamu Sudah Jadi User Pinky*')
              user.push(sender)
              fs.writeFileSync('./database/user.json', JSON.stringify(user))
              captionnya = `╭${fx}「 PENDAFTARAN 」\n├ Pada ${date} ${time}\n├ Nama : ${pushname}\n├ Nomer : wa.me/${sender.split('@')[0]}\n└ Total User : ${user.length}`
              sendButLocation(from, `${captionnya}`, `${authorbot}`, {jpegThumbnail: fs.readFileSync('./src/fotobot.jpg')}, 
              [
                 {buttonId:`${prefix}menu`,buttonText:{displayText:'ALL CMD'},type:1},

                 {buttonId:`${prefix}rules`,buttonText:{displayText:'RULES BOT'},type:1}

              ], {quoted: team, contextInfo: {"mentionedJid": [sender]}})
              break
//>>>>>>>>>[ END INFO BOT ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS FUNNY ]<<<<<<<<<<\\
         case 'stiker':
         case 'sticker':
         case 'stik':
         case 'stick':
         case 's':
         case 'sgif':
         case 'stickergif':
              if ((isMedia && !team.message.videoMessage || isQuotedImage) && args.length == 0) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo : team
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
              xiedev.sendMessage(from, buff, sticker, {quoted: team})
              fs.unlinkSync(media)
              fs.unlinkSync(ran)
              })
              .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(ran)
              } else if ((isMedia && team.message.videoMessage.seconds < 11 || isQuotedVideo && team.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
              const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo : team
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
              xiedev.sendMessage(from, buff, sticker, {quoted: team})
              fs.unlinkSync(media)
              fs.unlinkSync(ran)
              })
              .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(ran)
              } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo : team
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
              xiedev.sendMessage(from, buff, sticker, {quoted: team})
              })
              })
              } else {
              reply(`Kirim Gambar Caption ${prefix}sticker Atau Tag Gambar Yang Sudah Dikirim`)
              }
              break
         case 'toimg':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isQuotedSticker) return reply('Reply Stickernya')
              encmedia = JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await xiedev.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(mess.error.eror)
              buffer = fs.readFileSync(ran)
              xiedev.sendMessage(from, buffer, image, {thumbnail: buffer, quoted: team})
              fs.unlinkSync(ran)
              })
              break
         case 'tts':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply(`Kode Bahasanya Mana\nSilahkan Ketik : ${prefix}bahasa`)
              const gtts = require('./lib/gtts')(args[0])
              if (args.length < 0) return reply('Textnya Mana')
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
              xiedev.sendMessage(from, buff, audio, {quoted: team, ptt:true})
              fs.unlinkSync(rano)
              })
              })
              break
         case 'afk':
				  if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
				  if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
				  if (args.length == 0) return reply('Teksnya Mana?')
              alasan = args.join(" ")
              afk[sender.split('@')[0]] = alasan.toLowerCase()
              fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
              ini_txt = "Anda Telah Afk\n"
              if (alasan != "") {
              ini_txt += "Dengan Alasan " + alasan
              }
              reply(ini_txt)
              break
         case 'd':
			case 'del':
			case 'delete':
				  xiedev.deleteMessage(from, { id: team.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
				  break
//>>>>>>>>>[ END FUNNY ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS GROUP ]<<<<<<<<<<\\
         case 'liston':
         case 'listonline':
         case 'here':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              try {
              let pinky = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
              let online = [...Object.keys(xiedev.chats.get(pinky).presences), xiedev.user.jid]
              xiedev.sendMessage(from, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, {quoted: ftroli, contextInfo: {"mentionedJid": online}})
              } catch (e) {
              reply(`${e}`)
              }
              break
         case 'tagall':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              members_id = []
              teks = (args.length > 1) ? body.slice(8).trim() : ''
              teks += '\n\n'
              for (let mem of groupMembers) {
              teks += `${fx} @${mem.jid.split('@')[0]}\n`
              members_id.push(mem.jid)
              }
              mentions(teks, members_id, true)
              break
         case 'hidetag':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
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
              contextInfo: {"mentionedJid": mem},
              quoted: team
              }
              xiedev.sendMessage(from, options, text)
              break
         case 'linkgroup':
         case 'linkgrup':
         case 'linkgc':
         case 'gruplink':
         case 'grouplink':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              linkgc = await xiedev.groupInviteCode (from)
              linknya = `https://chat.whatsapp.com/${linkgc}\n\nLink Group *${groupName}*`
              xiedev.sendMessage(from, linknya, text, {quoted: team})
              break
         case 'resetlinkgc':
         case 'risetlink':
         case 'resetlinkgroup':
         case 'revoke':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              json = ['action', 'inviteReset', from]
              xiedev.query({json, expect200: true})
              reply(mess.sukses)
              break
         case 'add':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
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
				  if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
			     if (team.message.extendedTextMessage === undefined || team.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
				  mentioned = team.message.extendedTextMessage.contextInfo.mentionedJid
				  if (mentioned.length > 1) {
				  xiedev.groupRemove(from, mentioned)
			     }
				  break
         case 'listadmins':
         case 'listadmin':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
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
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              team.updatePresence(from, Presence.composing) 
              options = {
              text: `Pemilik Group : wa.me/${from.split("-")[0]}`,
              contextInfo: {"mentionedJid": [from] }
              }
              xiedev.sendMessage(from, options, text, {quoted: team})
              break
         case 'infogc':
			case 'groupinfo':
		   case 'infogrup':
			case 'grupinfo':
			     if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              try {
				  ppGc = await xiedev.getProfilePicture(from)
			     } catch {
				  ppGc = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				  }
			     buffer = await getBuffer(ppGc)
		        captionnya = `╭${fx}「 INFO GRUP 」\n├ Name: ${groupName}\n├ Admin: ${groupAdmins.length}\n├ Member: ${groupMembers.length}\n└ Desk: ${groupDesc}`
              xiedev.sendMessage(from, buffer, image, {thumbnail: buffer, caption: captionnya})
              break
         case 'grup':
         case 'gc':
         case 'group':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              if (args[0] === 'buka') {
              reply(mess.sukses)
              xiedev.groupSettingChange(from, GroupSettingChange.messageSend, false)
              } else if (args[0] === 'tutup') {
              reply(mess.sukses)
              xiedev.groupSettingChange(from, GroupSettingChange.messageSend, true)
              }
              break
         case 'welcome':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (args.length < 1) return reply('On Mengaktifkan\nOff Menonaktifkan')
              if ((args[0]) === 'on') {
              if (isWelkom) return reply('Welcome Sudah On')
              welkom.push(from)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              reply(mess.sukses)
              } else if ((args[0]) === 'off') {
              if (isWelkom) return reply('Welcome Sudah Off')
              welkom.splice(from, 1)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              reply(mess.sukses)
              } else {
              reply('On Mengaktifkan\nOff Menonaktifkan')
              }
              break
//>>>>>>>>>[ END GROUP ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS DOWNLOAD ]<<<<<<<<<<\\
         case 'play':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length === 0) return reply(`Silahkan Ketik : ${prefix}play Nama Lagunya`)
              reply(mess.wait)
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
         case 'ytsearch': // Done By FxSx
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply("Judulnya Apa")
              reply(mess.wait)
              var search = args.join('')
              try {
              var find = await yts(search)
              } catch {
              return await reply(mess.error.eror)
              }
              result = find.all
              var tbuff = await getBuffer(result[0].image)
              var ytres = `*[ YT SEARCH ]*\n*————————————————————*\n\n`
              find.all.map((video) => {
              ytres += `${fx} Title:` + video.title + '\n'
              ytres += `${fx} Link:` + video.url + '\n'
              ytres += `${fx} Durasi:` + video.timestamp + '\n'
              ytres += `${fx} Upload:` + video.ago +`\n*————————————————————*\n\n`
              })
              await fakethumb(tbuff, ytres)
              break
         case 'ytmp3':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('youtu.be') && args.length < 1) return reply("Linknya Mana")
              try {
              reply(mess.wait)
              yta(args[0])
              .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
              if (Number(filesize) >= 40000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
              const caption = `*YTMP3*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
              sendMediaURL(thumb, caption)
              sendMediaURL(dl_link).catch(() => reply("File Eror"))
              })
              })
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'ytmp4':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('youtu.be') && args.length < 1) return reply("Linknya Mana")
              try {
              reply(mess.wait)
              ytv(args[0])
              .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
              if (Number(filesize) >= 40000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
              const caption = `*YTMP4*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
              sendMediaURL(thumb, caption)
              sendMediaURL(dl_link).catch(() => reply('*File Eror*'))
              })
              })
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'ig': // Done By FxSx
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('instagram.com') && args.length < 1) return reply("Linknya Mana")
              reply(mess.wait)
              hx.igdl(args[0])
              .then(async (res) => {
              for (let i of res.medias) {
              if (i.url.includes("mp4")){
              let bufff = await getBuffer(i.url)
              xiedev.sendMessage(from, bufff, video, {quoted: team, caption: `Type : ${i.type}`})
              } else {
              let buffer = await getBuffer(i.url)
              xiedev.sendMessage(from, buffer, image, {thumbnail: buffer, quoted: team, caption: `Type : ${i.type}`})
              }
              }
              })
              break
         case 'igstalk':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply("Masukan Nama IG Nya")
              ig.fetchUser(args[0])
              .then(user => {
              thum = `${user.profile_pic_url_hd}`
              desc = `*ID* : ${user.profile_id}\n*Username* : ${args.join('')}\n*Full Name* : ${user.full_name}\n*Bio* : ${user.biography}\n*Followers* : ${user.followers}\n*Following* : ${user.following}\n*Private* : ${user.is_private}\n*Verified* : ${user.is_verified}\n\n*Link* : https://instagram.com/${args.join('')}`
              sendMediaURL(thum, desc)
              })
              break
         case 'igstory':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!q) return reply('Masukan Nama IG Nya')
              hx.igstory(q)
              .then(async result => {
              for(let i of result.medias){
              if(i.url.includes('mp4')){
              let bufff = await getBuffer(i.url)
              xiedev.sendMessage(from, bufff, video, {quoted: team, caption: `Type : ${i.type}`})
              } else {
              let buffer = await getBuffer(i.url)
              xiedev.sendMessage(from, buffer, image, {thumbnail: buffer, quoted: team, caption: `Type : ${i.type}`})                  
              }
              }
              });
              break
         case 'tiktok': // Done By FxSx
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('tiktok.com') && !q) return reply("Linknya Mana")
              reply(mess.wait)
              hx.ttdownloader(args[0])
              .then(res => {
              const {
              nowm
              } = res;
              axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
              .then(async (a) => {
              me = `link: ${a.data}`
              xiedev.sendMessage(from,{url:`${nowm}`},video,{mimetype:'video/mp4', quoted: team, caption: me})
              })
              })
              .catch( e => console.log(e))
              break
         case 'mediafire':
         case 'mdf':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('Link Nya Mana')
              if (!isUrl(args[0]) && !args[0].includes('mediafire')) return reply(mess.error.eror)
              if (Number(filesize) >= 30000) return reply(`╭${fx}「 MEDIAFIRE EROR 」\n├ Nama: ${res[0].nama}\n├ Ukuran: ${res[0].size}\n└ Link: ${res[0].link}`)
              reply(mess.wait)
              teks = args.join(' ')
              res = await mediafireDl(teks)
              result = `╭${fx}「 MEDIAFIRE 」\n├ Nama : ${res[0].nama}\n├ Ukuran : ${res[0].size}\n└ Link: ${res[0].link}`
              reply(result)
              sendFileFromUrl(res[0].link, document, {mimetype: res[0].mime, filename: res[0].nama, quoted: ftroli, contextInfo: {"forwardingScore": 99999,"isForwarded": true,"sendEphemeral": true, "externalAdReply": {"title": `${namabot}`,"body": `${authorbot}`,"mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/xM9j6sZ/xieee.jpg","mediaUrl": "https://www.instagram.com/xiecaa_","thumbnail": "https://i.ibb.co/xM9j6sZ/xieee.jpg"}}})
              break
         case 'pinterest':
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply(`Contoh : ${prefix + command} Bunga`)
              reply(mess.wait)
              teks = args.join(' ')
              res = await axios.get(`https://fdciabdul.tech/api/pinterest?keyword=${teks}`)
              var string = JSON.parse(JSON.stringify(res.data))
              var random =  string[Math.floor(Math.random() * string.length)]
              sendFileFromUrl(random, image, {quoted: team, caption: `*Hasil Pencarian Dari : ${teks}*`})
              break
         case 'penyegar':
         case 'asupan': // Done By FxSx
              if (!isUser) return sendButMessage(from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage(from, banned1, banned2, banned3, {quoted: ftroli})
              xiedev.updatePresence(from, Presence.composing)
              data = fs.readFileSync('./lib/asupan.js')
              jsonData = JSON.parse(data)
              randXiedev = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randXiedev];
              asupan = await getBuffer(randKey.result)
              vidnya = await xiedev.prepareMessage(from, asupan, video)
              const butt = [
                    {buttonId:`${prefix + command}`,buttonText:{displayText:'More'},type:1}
              ]
              const buttonMessages = {
              videoMessage: vidnya.message.videoMessage,
              contentText: `Video Asupan Done Kak\nJika Ingin Lagi Silahkan Klik Dibawah`,
              footerText: `${authorbot}`,
              buttons: butt,
              headerType: 5
              }
              await xiedev.sendMessage(from, buttonMessages, MessageType.buttonsMessage, {mimetype: 'video/mp4', contextInfo: {"mentionedJid": [sender]}})
              break
//>>>>>>>>>[ END DOWNLOAD ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS OWNER ]<<<<<<<<<<\\
         case 'self':
              if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
              public = false
              return reply('*MODE : SELF*')
              break
			case 'public':
              if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
              public = true
              return reply('*MODE : PUBLIC*')
              break
         case 'banchat':
         case 'mute':
              if (!itsMe && !isOwner) return
              if (isBanchat) return reply(`Sudah Mute Grup`)
              bancht.push(from)
              fs.writeFileSync('./database/banchat.json', JSON.stringify(bancht))
              reply(mess.sukses)
              break
         case 'unbanchat':
         case 'unmute':
              if (isBanchat){
              if (!itsMe && !isOwner) return
              if (!isBanchat) return reply(`Sudah Unmute Grup`)
              let anu = bancht.indexOf(from)
              bancht.splice(anu, 1)
              fs.writeFileSync('./database/banchat.json', JSON.stringify(bancht))
              reply(mess.sukses)
              }
              break
         case 'setprefix':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              prefix = args[0]
              reply(`Menjadi : ${prefix}`)
              break
         case 'sethias':
         case 'sethiasan':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              fx = args[0]
              reply(`Menjadi : ${fx}`)
              break
         case 'setauthor':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              authorbot = args[0]
              reply(`Menjadi : ${authorbot}`)
              break
         case 'setnamabot':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              namabot = args[0]
              reply(`Menjadi : ${namabot}`)
              break
         case 'setthumb':
         case 'setffoto':
              if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
              encmedia = JSON.parse(JSON.stringify(team).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xiedev.downloadMediaMessage(encmedia)
              fs.writeFileSync('./src/fotobot.jpg', media)
              reply(mess.sukses)
              break
         case 'join':
              if (!isOwner) return reply(mess.only.ownerB)
              setTimeout( () => {
              xiedev.query({json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]})
              reply(mess.sukses)
              }, 10000)
              break
         case 'leave':
         case 'outgc':
              if (!isGroup) return grupinv(mess.only.group)
              if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
              anu = await xiedev.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
              break
         case 'clearall':
              if (!isOwner) return reply(mess.only.ownerB)
              anu = await xiedev.chats.all()
              xiedev.setMaxListeners(25)
              for (let _ of anu) {
              xiedev.deleteChat(_.jid)
              }
              reply(mess.sukses)
              break
         case 'clone':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Tag target yang ingin di clone')
              if (team.message.extendedTextMessage === undefined || team.message.extendedTextMessage === null) return reply('Tag cvk')
              mentioned = team.message.extendedTextMessage.contextInfo.mentionedJid[0]
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
         case 'ban':
				  xiedev.updatePresence(from, Presence.composing) 
				  if (args.length < 1) return
				  if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
				  mentioned = team.message.extendedTextMessage.contextInfo.mentionedJid
			     ban = mentioned
			     reply(`Berhasil Banned : ${ban}`)
				  break
         case 'unban':
				  if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
				  bnnd = body.slice(8)
				  ban.splice(`${bnnd}@s.whatsapp.net`, 1)
			     reply(`Nomor wa.me/${bnnd} telah di unban!`)
				  break
         case 'block':
				  xiedev.updatePresence(from, Presence.composing) 
				  if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
				  xiedev.blocked (`${body.slice(7)}@c.us`, "add")
				  reply(`Perintah Diterima, Memblokir ${body.slice(7)}@c.us`)
				  break
         case 'unblock':
				  if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
				  xiedev.blocked (`${body.slice(9)}@c.us`, "remove")
				  reply(`perintah Diterima, Membuka Blokir ${body.slice(9)}@c.us`)
				  break 
         case 'scmd':
              if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
              if (isQuotedSticker) {
              if (!q) return reply(`Penggunaan : ${prefix + command} cmdnya dan tag stickernya`)
              var kodenya = team.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              sCmd(kodenya, q)
              reply(mess.sukses)
              } else {
              reply('Reply Stickernya')
              }
              break
         case 'delcmd':
              if (!isOwner && !team.key.fromMe) return reply(mess.only.ownerB)
              if (!isQuotedSticker) return reply(`Penggunaan : ${prefix + command} tagsticker`)
              var kodenya = team.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              _stikcmd.splice(getCommandPosition(kodenya), 1)
              fs.writeFileSync('./database/scmd.json', JSON.stringify(_stikcmd))
              reply(mess.sukses)
              break
         case 'bc':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              anu = await xiedev.chats.all()
              if (isMedia && !team.message.videoMessage || isQuotedImage) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo : team
              buff = await xiedev.downloadMediaMessage(encmedia)
              for (let _ of anu) {
              xiedev.sendMessage(_.jid, buff, image, {caption: `[ BROADCAST ]\n\n${body.slice(4)}`})
              }
              reply(mess.sukses)
              } else {
              for (let _ of anu) {
              sendMess(_.jid, `[ BROADCAST ]\n\n${body.slice(4)}`)
              }
              reply(mess.sukses)
              }
              break
         case 'bc2':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              anu = await xiedev.chats.all()
              if (isMedia && !team.message.videoMessage || isQuotedImage) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo : team
              buff = await xiedev.downloadMediaMessage(encmedia)
              for (let _ of anu) {
              const fduc2 = {
					"productMessage": {
						"product": {
							"productImage": {
								"url": "https://mmg.whatsapp.net/d/f/Ahn1QvxbhABRggFOJXoaohrfnXE5MGvQbg9--aFolZ_Y.enc",
								"mimetype": "image/jpeg",
								"fileSha256": "ViRNzid9QeEsJCaZcseZCjzx+DMZo2tD+fGWKjuSNyg=",
								"fileLength": "32993",
								"height": 450,
								"width": 845,
								"mediaKey": "UAG49T+qficzxxf1mw0S2Q6HXgbNpwVOaon5Gf3W2nM=",
								"fileEncSha256": "PQ3NUWG1y8b9qVmrnel1iA2Ca5G145QxtAJnveLr7Cc=",
								"directPath": "/v/t62.7118-24/40999194_223465573147244_6081626207846738390_n.enc?ccb=11-4&oh=1343f6895dcc4e6b28a8e35e2aefe599&oe=617BF69C",
								"mediaKeyTimestamp": "1632884125",
								"jpegThumbnail": buff
							},
							"productId": "4559966904061216",
							"title": "BROADCAST",
							"description": `${body.slice(4)}`,
							"currencyCode": "IDR",
							"priceAmount1000": "1000",
							"productImageCount": 1,
							"salePriceAmount1000": "0"
						 },
						"businessOwnerJid": "0@s.whatsapp.net"
					  }
				  },
			  	  ress = await xiedev.prepareMessageFromContent(_.jid, fduc2, {quoted: ftroli, contextInfo: {"mentionedJid": [sender]}})
              xiedev.relayWAMessage(ress)
              }
              reply(mess.sukses)
              } else {
              for (let _ of anu) {
              sendMess(_.jid, `[ BROADCAST ]\n\n${body.slice(4)}`)
              }
              reply(mess.sukses)
              }
              break
         case 'v1':
              if (!isOwner) return reply(mess.only.ownerB)
              teksnya = `> Dev : ©FXSX\n\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔`
              const fduc1 = {
					"productMessage": {
						"product": {
							"productImage": {
								"url": "https://mmg.whatsapp.net/d/f/Ahn1QvxbhABRggFOJXoaohrfnXE5MGvQbg9--aFolZ_Y.enc",
								"mimetype": "image/jpeg",
								"fileSha256": "ViRNzid9QeEsJCaZcseZCjzx+DMZo2tD+fGWKjuSNyg=",
								"fileLength": "5000000",
								"height": 450,
								"width": 845,
								"mediaKey": "UAG49T+qficzxxf1mw0S2Q6HXgbNpwVOaon5Gf3W2nM=",
								"fileEncSha256": "PQ3NUWG1y8b9qVmrnel1iA2Ca5G145QxtAJnveLr7Cc=",
								"directPath": "/v/t62.7118-24/40999194_223465573147244_6081626207846738390_n.enc?ccb=11-4&oh=1343f6895dcc4e6b28a8e35e2aefe599&oe=617BF69C",
								"mediaKeyTimestamp": "1632884125",
								"jpegThumbnail": fs.readFileSync('./src/fotobot.jpg')
							},
							"productId": "4559966904061216",
							"title": "XIE DEV TEAM",
							"description": `${teksnya}`,
							"currencyCode": "IDR",
							"priceAmount1000": "30000",
							"productImageCount": 1,
							"salePriceAmount1000": "0"
						 },
						"businessOwnerJid": "0@s.whatsapp.net"
					  }
				  },
			  	  resss = await xiedev.prepareMessageFromContent(from, fduc1, {quoted: ftroli, contextInfo: {"mentionedJid": [sender]}})
              xiedev.relayWAMessage(resss)
              break
         case 'v2':
              if (!isOwner) return reply(mess.only.ownerB)
              teksnya = `KGK LAG KOK BANG\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔`
              const fduc3 = {
					"productMessage": {
						"product": {
							"productImage": {
								"url": "https://mmg.whatsapp.net/d/f/Ahn1QvxbhABRggFOJXoaohrfnXE5MGvQbg9--aFolZ_Y.enc",
								"mimetype": "image/jpeg",
								"fileSha256": "ViRNzid9QeEsJCaZcseZCjzx+DMZo2tD+fGWKjuSNyg=",
								"fileLength": "32993",
								"height": 450,
								"width": 845,
								"mediaKey": "UAG49T+qficzxxf1mw0S2Q6HXgbNpwVOaon5Gf3W2nM=",
								"fileEncSha256": "PQ3NUWG1y8b9qVmrnel1iA2Ca5G145QxtAJnveLr7Cc=",
								"directPath": "/v/t62.7118-24/40999194_223465573147244_6081626207846738390_n.enc?ccb=11-4&oh=1343f6895dcc4e6b28a8e35e2aefe599&oe=617BF69C",
								"mediaKeyTimestamp": "1632884125",
								"jpegThumbnail": fs.readFileSync('./src/fotobot.jpg')
							},
							"productId": "4559966904061216",
							"title": "🌹XIE🌹",
							"description": `${teksnya}`,
							"currencyCode": "IDR",
							"priceAmount1000": "30000",
							"productImageCount": 1,
							"salePriceAmount1000": "0"
						 },
						"businessOwnerJid": "0@s.whatsapp.net"
					  }
				  },
			  	  resxie = await xiedev.prepareMessageFromContent(from, fduc3, {quoted: ftroli, contextInfo: {"mentionedJid": [sender]}})
              xiedev.relayWAMessage(resxie)
              break
case 'payment':
case 'pay':
      list = await xiedev.prepareMessageFromContent(from, {
      "listMessage": {
      "title": "XIE BOT",
      "description": "Jika Minat Hubungi Owner",
      "buttonText": "",
      "listType": "PRODUCT_LIST",
      "productListInfo": {
        "productSections": [
          {
            "title": "List Payment",
            "products": [
              {
                "productId": "4559966904061216"
              }
            ]
          }
        ],
        "headerImage": {
          "productId": "4559966904061216",
          "jpegThumbnail": fs.readFileSync('./src/fotobot.jpg')
        },
        "businessOwnerJid": `0@s.whatsapp.net`
      },
      "footerText": "Author FxSx"
    }
  }, {quoted: team})
  xiedev.relayWAMessage(list, {waitForAck: true})
  break
//>>>>>>>>>[ END OWNER ]<<<<<<<<<<\\
         default:
              if (isGroup && budy != undefined) {
              } else {
              console.log(color('[XDT]','red'), 'Tidak Ada Perintah', color(sender.split('@')[0]))
              }
              }
		        } catch (e) {
			     console.log('Error : %s', color(e, 'red'))
         }
	 })
}
starts()
