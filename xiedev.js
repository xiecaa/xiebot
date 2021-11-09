/*
* Script By : XieDevTeam
* This Script is Free For You
* So Don't Sell Bot Scripts
* And also the price that makes the script
* Remake Naturally
*/
const {
   WAConnection: _WAConnection,
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
	processTime,
	Browsers,
   prepareMessageFromContent, 
   relayWAMessage
} = require("@adiwajshing/baileys")
const simple = require('./lib/simple.js')
const fs = require("fs")
const axios = require("axios")
const { spawn, exec, execSync } = require("child_process")
const speed = require('performance-now')
const ig = require('insta-fetcher')
const hx = require("hxz-api")
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const yts = require( 'yt-search')
const request = require('request')
const moment = require("moment-timezone")
const lolis = require('lolis.life')
const loli = new lolis()

// Files From Lib
const { smsg } = require('./lib/simple')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { jadibot, stopjadibot, listjadibot } = require('./lib/jadibot')
const { getBuffer, color, getGroupAdmins, createExif, getRandom, modStick, fetchJson, fetchText } = require("./lib/function.js")

// Files From Database
const user = JSON.parse(fs.readFileSync('./database/user.json'))
const blocked = JSON.parse(fs.readFileSync('./database/blocked.json'))
const ban = JSON.parse(fs.readFileSync('./database/ban.json'))
const roomttt = JSON.parse(fs.readFileSync('./database/roomttt.json'))
const _stikcmd = JSON.parse(fs.readFileSync('./database/scmd.json'))
const antivo = JSON.parse(fs.readFileSync("./database/antivo.json"))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))

// Settings
prefix = "#"
authorbot = "Author FxSx"
namabot = "Xie Bot"
fx = "❏"
battery = {
  persen: "" || "Tidak Terdeteksi",
  charger: "" || false
}
defttt = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
antideleted = true
public = false

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

// Year / Day / Date
function tanggal(){
  myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
	myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu']
	var tgl = new Date()
	var day = tgl.getDate()
	bulan = tgl.getMonth()
	var thissDay = tgl.getDay(),
	thisDay = myDays[thissDay]
	var yy = tgl.getYear()
	var year = (yy < 1000) ? yy + 1900 : yy
	return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}
// Speed 
const runtime = function (seconds) {
  seconds = Number(seconds)
  var d = Math.floor(seconds / (3600 * 24))
  var h = Math.floor((seconds % (3600 * 24)) / 3600)
  var m = Math.floor((seconds % 3600) / 60)
  var s = Math.floor(seconds % 60)
  var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " Hari, ") : ""
  var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " Jam, ") : ""
  var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " Menit, ") : ""
  var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " Detik") : ""
  return dDisplay + hDisplay + mDisplay + sDisplay
}
// Time Reminder
const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss")
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

  // Welcome To Group
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
            buff = await getBuffer(pp_user)
	         buffer = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome2?nama=${encodeURIComponent(anu_user.notify)}&descriminator=${member}&memcount=${member}&gcname=${encodeURIComponent(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=${pp_grup}`)
            xiedev.sendMessage(mdata.id, halo, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]}`, orderTitle: `Welcome @${num.split('@')[0]}`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true, duration:999999999999})
            const imgg2 = await xiedev.prepareMessage("0@s.whatsapp.net", buffer, MessageType.location,{thumbnail: buffer})
			   const imgg = imgg2.message["ephemeralMessage"] ? imgg2.message.ephemeralMessage : imgg2
            welcomeBut = [{buttonId:`${prefix}infogc`,buttonText:{displayText:'INFO GRUP'},type:1}, {buttonId:`${prefix}daftar`,buttonText:{displayText:'DAFTAR USER'},type:1}]
            welcomeButt = { contentText: `${teks} `, footerText: `${authorbot}`, buttons: welcomeBut, headerType: 6, locationMessage: imgg.message.locationMessage}
            xiedev.sendMessage(mdata.id, welcomeButt, MessageType.buttonsMessage, {contextInfo: {"mentionedJid": [num]}})
            }
       if (anu.action == 'remove') {
            mdata = await xiedev.groupMetadata(anu.jid)
            num = anu.participants[0]
            anu_user = xiedev.contacts[mem]
            member = mdata.participants.length
            halo = await fs.readFileSync('./mp3/jamet.mp3')
            teks = `*Sayonara* @${num.split('@')[0]} Jamet:v`
            buff = await getBuffer(pp_user)
            buffer = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye2?nama=${encodeURIComponent(anu_user.notify)}&descriminator=${member}&memcount=${member}&gcname=${encodeURIComponent(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=${pp_grup}`)
            xiedev.sendMessage(mdata.id, halo, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Sayonara @${num.split('@')[0]}`, orderTitle: `Sayonara @${num.split('@')[0]}`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true, duration:999999999999})
            const imggg2 = await xiedev.prepareMessage("0@s.whatsapp.net", buffer, MessageType.location,{thumbnail: buffer})
			   const imggg = imggg2.message["ephemeralMessage"] ? imggg2.message.ephemeralMessage : imggg2
            welcomBut = [{buttonId:`${prefix}beyy`,buttonText:{displayText:'BYEE 👋'},type:1}]
            welcomButt = { contentText: `${teks} `, footerText: `${authorbot}`, buttons: welcomBut, headerType: 6, locationMessage: imggg.message.locationMessage}
            xiedev.sendMessage(mdata.id, welcomButt, MessageType.buttonsMessage, {contextInfo: {"mentionedJid": [num]}})
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
      }

   })
  // Block
  xiedev.on("CB:Blocklist", (json) => {
    if (blocked.length > 2) return
    for (let i of json[1].blocklist){
      blocked.push(i.replace("c.us","s.whatsapp.net"))
    }
  })
  // Block Call
  xiedev.on("CB:Call", (num) => {
    let nomer
    calling = JSON.parse(JSON.stringify(num))
    nomer = calling[1].from
    xiedev.sendMessage(nomer, `Sorry ${xiedev.user.name} Saya Akan Block Kamu, Karena Anda Call Me!`, MessageType.text)
    .then(() => {
      return xiedev.blockUser(nomer, 'add')
    })
  })
  // Low Battery Reminder
  xiedev.on("CB:action,,battery", (json) => {
    const batteryLevelStr = json[2][0][1].value
    const batteryLevel = parseInt(batteryLevelStr)
    battery.persen = `${batteryLevel}%`
    battery.charger = json[2][0][1].live
  })
  // Delete Group Chat
  xiedev.on("message-delete",async(team) => {
    if (team.key.remoteJid == "status@broadcast") return
    if (!team.key.fromMe && team.key.fromMe) return
    if (antideleted === false) return
    team.message = (Object.keys(team.message)[0] === 'ephemeralMessage') ? team.message.ephemeralMessage.message : team.message
    let date = new Date()
    let region = 'id'
    let getTime = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(((newdate * 1) + getTime) / 84600000) % 5]
    let localweek = newdate.toLocaleDateString(region, {
      weekday: 'long'
    })
    let localday = newdate.toLocaleDateString(region, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    const type = Object.keys(team.message)[0]
    xiedev.sendMessage(team.key.remoteJid, `╭${fx}「 ANTI DELETE 」\n├ Nama : @${team.participant.split("@")[0]}\n├ Jam : ${moment.localweek.localday}\n└ Type : ${type}`, MessageType.text, {quoted:team.message, contextInfo: { "mentionedJid": [team.participant]}})
  })
  
  module.exports = xiedev = async (xiedev, team) => {
    try {
      if (!team.hasNewMessage) return
      team = team.messages.all()[0]
      if (!team.message) return
      if (team.key && team.key.remoteJid == "status@broadcast") return
      team.message = (Object.keys(team.message)[0] === 'ephemeralMessage') ? team.message.ephemeralMessage.message : team.message
      global.prefix 
      global.blocked
      m = smsg(xiedev, team)
		const antibot = m.isBaileys
      const content = JSON.stringify(team.message)
      const from = team.key.remoteJid
      const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product, buttonsMessage } = MessageType
      const type = Object.keys(team.message)[0]
      const cmd = (type === 'conversation' && team.message.conversation) ? team.message.conversation : (type == 'imageMessage') && team.message.imageMessage.caption ? team.message.imageMessage.caption : (type == 'videoMessage') && team.message.videoMessage.caption ? team.message.videoMessage.caption : (type == 'extendedTextMessage') && team.message.extendedTextMessage.text ? team.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(team.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(team.message.stickerMessage.fileSha256.toString('hex')) !== undefined) ? getCmd(team.message.stickerMessage.fileSha256.toString('hex')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
      body = (type === 'listResponseMessage' && team.message.listResponseMessage.title) ? team.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && team.message.buttonsResponseMessage.selectedButtonId) ? team.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && team.message.conversation.startsWith(prefix)) ? team.message.conversation : (type == 'imageMessage') && team.message.imageMessage.caption.startsWith(prefix) ? team.message.imageMessage.caption : (type == 'videoMessage') && team.message.videoMessage.caption.startsWith(prefix) ? team.message.videoMessage.caption : (type == 'extendedTextMessage') && team.message.extendedTextMessage.text.startsWith(prefix) ? team.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(team.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(team.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(team.message.stickerMessage.fileSha256.toString('base64')) : ""
      budy = (type === 'conversation') ? team.message.conversation : (type === 'extendedTextMessage') ? team.message.extendedTextMessage.text : ''
      const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
      const args = body.trim().split(/ +/).slice(1)
      chats = (type === 'conversation') ? team.message.conversation : (type === 'extendedTextMessage') ? team.message.extendedTextMessage.text : ''
      const argss = chats.slice(command.length + 2, chats.length)
      const isCmd = body.startsWith(prefix)
      const q = args.join(' ')
      
      const botNumber = xiedev.user.jid
      const ownerNumber = ["6283899137143@s.whatsapp.net"]
      const isGroup = from.endsWith("@g.us")
      const sender = team.key.fromMe ? xiedev.user.jid : isGroup ? team.participant : team.key.remoteJid
      const totalchat = xiedev.chats.all()
      const groupMetadata = isGroup ? await xiedev.groupMetadata(from) : ''
      const groupName = isGroup ? groupMetadata.subject : ''
      const groupId = isGroup ? groupMetadata.jid : ''
      const groupMembers = isGroup ? groupMetadata.participants : ''
      const groupDesc = isGroup ? groupMetadata.desc : ''
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
      const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
      const isGroupAdmins = groupAdmins.includes(sender) || false
      const isWelkom = isGroup ? welkom.includes(from) : false
      const isAntiviewonce = isGroup ? antivo.includes(from) : false
      const itsMe = sender == botNumber ? true : false
      const isOwner = ownerNumber.includes(sender)
      const isUser = user.includes(sender)
      const isBanned = ban.includes(sender)
      const conts = team.key.fromMe ? xiedev.user.jid : xiedev.contacts[sender] || { notify: jid.replace(/@.+/, '') }
      const pushname = team.key.fromMe ? xiedev.user.name : conts.notify || conts.vname || conts.name || '-'
      const more = String.fromCharCode(8206)
      const readMore = more.repeat(4001)
      const isUrl = (url) => {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
      }
      if (antibot === true) return
      const reply = (teks) => {
        xiedev.sendMessage(from, teks, text, {quoted: team, contextInfo: {forwardingScore: 1000, isForwarded: true}})
      }
      idttt = []
      players1 = []
      players2 = []
      turn = []
      for (let i of roomttt) {
        idttt.push(i.id)
        players1.push(i.player1)
        players2.push(i.player2)
        turn.push(i.turn)
      }
      const isTTT = isGroup ? idttt.includes(from) : false
	   const isPlayer1 = isGroup ? players1.includes(sender) : false
      const isPlayer2 = isGroup ? players2.includes(sender) : false

      const fgif = {key: {fromMe: false, participant: `6283815956151@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message: { "videoMessage": {"title": `${authorbot}`,'seconds': '99999', 'gifPlayback': 'true', 'caption': `${namabot}`,'jpegThumbnail': fs.readFileSync('./src/fotobot.jpg')}}}
      
      // Button Location Take User's Photo
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
      // Button Lokasi Link Foto Imgbb
      const sendButtLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
           buff = await getBuffer('https://i.ibb.co/xM9j6sZ/xieee.jpg')
           imgnya = await xiedev.prepareMessage(from, buff, location, {thumbnail: buff})
      const buttonMessages = {
           locationMessage: imgnya.message.locationMessage,
           contentText: text1,
           footerText: desc1,
           buttons: but,
           headerType: 6
      }
      xiedev.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
      }
      // Button Location Download From Src
      const sendButLoc = async (id, text1, desc1, gam1, but = [], options = {}) => {
           buff = fs.readFileSync('./src/wmgame.jpg')
           imgnya = await xiedev.prepareMessage(from, buff, location, {thumbnail: buff})
      const buttonMessages = {
           locationMessage: imgnya.message.locationMessage,
           contentText: text1,
           footerText: desc1,
           buttons: but,
           headerType: 6
      }
      xiedev.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
      }
      // Button Text Create User List
      const sendButtonMsg = (id, text1, desc1, but = [], options = {}) => {
      const buttonMessage = {
           contentText: text1,
           footerText: desc1,
           buttons: but,
           headerType: 1
      }
      xiedev.sendMessage(
           id,
           buttonMessage,
           MessageType.buttonsMessage,
           options
        )
      }
      
      const daftar1 = `Hai @${sender.split("@")[0]}\nKamu Belum Terdaftar\nSilahkan Klik Dibawah`
      const daftar2 = `${authorbot}`
      const daftar3 = [
      {
           buttonId: `${prefix}daftar`,
           buttonText: {
           displayText: `DAFTAR USER`,
         },
         type: 1,
      },]
      
      const banned1 = `Hai @${sender.split("@")[0]}\nNomer Kamu Sudah Terbanned\nSilahkan Hubungi Owner\nJika Ingin Dibuka Bannednya!`
      const banned2 = `${authorbot}`
      const banned3 = [
      {
           buttonId: `${prefix}owner`,
           buttonText: {
           displayText: `OWNER`,
         },
         type: 1,
      },]

      const sendMediaURL = async(url, text="", mids=[]) =>{
        if(mids.length > 0){
          text = normalizeMention(to, text, mids)
        }
        const fn = Date.now() / 10000
        const filename = fn.toString()
        let mime = ""
        var download = function (uri, filename, callback) {
          request.head(uri, function (err, res, body) {
            mime = res.headers['content-type']
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
          })
        }
        download(url, filename, async function () {
          console.log('done')
          let media = fs.readFileSync(filename)
          let type = mime.split("/")[0]+"Message"
          if(mime === "image/gif"){
            type = MessageType.video
            mime = Mimetype.gif
          }
          if(mime.split("/")[0] === "audio"){
            mime = Mimetype.mp4Audio
          }
          xiedev.sendMessage(from, media, type, {quoted: fgif, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
          fs.unlinkSync(filename)
        })
      }
      
      mess = {
				wait: '*Sedang Diproses*',
				sukses: '*Sukses*',
				error: {
					eror: '*Eror*',
					salah: '*Link Invalid*'
				},
				khusus: {
				   link: 'Linknya Mana?',
					group: '*Khusus Group*',
					benned: '*Maaf Nomer Kamu Tidak Bisa Gunakan Xie Bot*',
					ownerG: '*Khusus Owner Group*',
					ownerB: '*Khusus Owner Bot*',
					premium: '*Khusus Premium*',
					userB: `Hai ${pushname}\nKamu Belum Terdaftar\nSilahkan Klik Dibawah\nAtau Ketik : ${prefix}daftar`,
					admin: '*Khusus Admin Group*',
					Badmin: '*Jadikan Xie Bot Admin Dulu*'
          }
      }
      // Anti Trolley Chat
      if (m.message && !m.key.fromMe && m.isBaileys && m.quoted && m.quoted.mtype === 'orderMessage' && !(m.quoted.token && m.quoted.orderId)) {
      m.reply('Troli Detected\n\n' + require('util').format(m.key))
      await xiedev.modifyChat(m.chat, 'delete', {
      includeStarred: false
      })
      }
      // Anti ViewOnce Photos And Videos
      if (isGroup && isAntiviewonce && m.mtype == "viewOnceMessage") {
      reply(
        `@${sender.split("@")[0]} Terdeteksi mengirim gambar/video viewonce!`
      );
      var msg = { ...team };
      msg.team = team.message.viewOnceMessage.message;
      msg.team[Object.keys(msg.team)[0]].viewOnce = false;
      xiedev.copyNForward(m.chat, msg);
      }
      
      // Text to Color in Termux
      colors = ['red','white','black','blue','yellow','green']
      const isMedia = (type === 'imageMessage' || type === 'videoMessage')
      const isImage = (type === 'imageMessage')
      const isVideo = (type === 'videoMessage')
      const isStickers = (type == 'stickerMessage')
      const isListMsg = (type == 'listResponseMessage')
      const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message')
      const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
      const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
      const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
      const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
      const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
      const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
      const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')
      const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
      
      if (itsMe){
      if(chats.toLowerCase() == `${prefix}self`){
      public = false
      reply(`Success`, `STATUS : Self`)
      }
      if (chats.toLowerCase() == 'status'){
      reply(`STATUS : ${public ? "Public" : "Self"}`)
      }
      }
      if (!public){
      if (!team.key.fromMe) return
      }
      
      if (isCmd && !isGroup) console.log("[",color("CMD PRIVATE","lime"),"]",time2,color(command,"lime"),"from",color(sender.split("@")[0],"cyan"))
      if (isCmd && isGroup) console.log("[",color("CMD GROUP","lime"),"]",time2,color(command,"lime"),"from",color(sender.split("@")[0],"cyan"),"in",color(groupName,"yellow"))
      switch (command) {
      case 'menu':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          menunya = `
${ucapanWaktu} kak @${sender.split("@")[0]}

╭${fx}「 ABOUT USER 」
├ Name : ${pushname}
├ Owner : ${isOwner ? "Yes":"No"}
└ Nomer : ${sender.split("@")[0]}
${readMore}
╭${fx}「 INFO 」
├ ${prefix}infobot
├ ${prefix}owner
├ ${prefix}listjadibot
└ ${prefix}listscmd

╭${fx}「 GROUP 」
├ ${prefix}welcome on/off
├ ${prefix}setdescgc
└ ${prefix}linkgc

╭${fx}「 FUNNY 」
├ ${prefix}slot
├ ${prefix}suit
├ ${prefix}ttt
├ ${prefix}delttt
└ ${prefix}sticker

╭${fx}「 EXPERIMENT 」
├ ${prefix}jadibot
└ ${prefix}stopjadibot

╭${fx}「 DOWNLOAD 」
├ ${prefix}igstalk
├ ${prefix}ig
├ ${prefix}fb
├ ${prefix}igstory
├ ${prefix}twitter
├ ${prefix}tiktok
├ ${prefix}play
├ ${prefix}ytsearch
├ ${prefix}ytmp3
├ ${prefix}ytmp4
├ ${prefix}video
├ ${prefix}asupan
├ ${prefix}lirik
└ ${prefix}brainly

╭${fx}「 OWNER 」
├ ${prefix}mode
├ ${prefix}baileys
├ ${prefix}q
├ ${prefix}setprefix
├ ${prefix}setauthor
├ ${prefix}setnamabot
├ ${prefix}sethias
├ ${prefix}setthumb
├ ${prefix}join
├ ${prefix}leave
├ ${prefix}scmd
├ ${prefix}delscmd
└ ${prefix}listscmd
`
          sendButtLocation(from, `${menunya}`, `Jika Ingin Sewa & Beli Scpirt Bot\nSilahkan Hubungi Owner\n\n${authorbot}`, {jpegThumbnail: fs.readFileSync('./src/fotobot.jpg')}, 
          [
            {buttonId:`${prefix}infobot`,buttonText:{displayText:'INFO BOT'},type:1},
            {buttonId:`${prefix}owner`,buttonText:{displayText:'OWNER BOT'},type:1}
          ], {contextInfo: { mentionedJid: [sender]}})
          break
      case 'daftar':
          xiedev.updatePresence(from, Presence.composing)
          if (isUser) return reply('*Kamu Sudah Jadi User Pinky*')
          user.push(sender)
          fs.writeFileSync('./database/user.json', JSON.stringify(user))
          captionnya = `╭${fx}「 PENDAFTARAN 」\n├ *Waktu:* ${tanggal()}\n├ *Nama:* ${pushname}\n├ *Nomer:* wa.me/${sender.split('@')[0]}\n└ *User:* ${user.length}`
          sendButLocation(from, `${captionnya}`, `${authorbot}`, {jpegThumbnail: fs.readFileSync('./src/fotobot.jpg')},[{buttonId:`${prefix}menu`,buttonText:{displayText:'ALL CMD'},type:1},{buttonId:`${prefix}info`,buttonText:{displayText:'INFO BOT'},type:1}], {contextInfo: { mentionedJid: [sender]}})
          break
//===============[INFO]===============\\
      case 'info':
      case 'infobot':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          infonya = `
╭${fx}「 INFO 」
├ Name : ${xiedev.user.name}
├ Battery : ${battery.persen}
├ Charger : ${battery.charger == true ? "Yes" : "No"}
├ Mode : ${public ? "Public" : "Self"}
├ Phone : ${xiedev.user.phone.device_manufacturer}
├ Server Name : ${xiedev.browserDescription[0]}
├ Server : ${xiedev.browserDescription[1]}
├ Version : ${xiedev.browserDescription[2]}
├ Model : ${xiedev.user.phone.device_model}
├ Version Wa : ${xiedev.user.phone.wa_version}
├ Prefix : ${prefix}
├ Block : ${blocked.length}
└ Bot On : ${runtime(process.uptime())}
`
          sendButtLocation(from, `${infonya}`, `${authorbot}`, {jpegThumbnail: fs.readFileSync('./src/fotobot.jpg')}, 
          [
            {buttonId:`${prefix}allcmd`,buttonText:{displayText:'BACK MENU'},type:1},
            {buttonId:`${prefix}listscmd`,buttonText:{displayText:'LIST STIK CMD'},type:1},
            {buttonId:`${prefix}listjadibot`,buttonText:{displayText:'LIST JADI BOT'},type:1}
          ], {contextInfo: {mentionedJid: [sender]}})
          break
      case 'owner':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          const vacrd = `BEGIN:VCARD\n`+`VERSION:3.0\n`+
                        `FN:Owner Xie\n`+
                        `ORG:Developer ${xiedev.user.name}\n`+
                        'TEL;type=CELL;type=VOICE;waid=6283899137143' +
                        ':+6283899137143\n' + 
                        'END:VCARD'
          xiedev.sendMessage(from, {display: "owner Bot", vcard: vacrd}, contact, {quoted: fgif, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": `${namabot}`,"mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/xM9j6sZ/xieee.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/xM9j6sZ/xieee.jpg"}}})
          break
      case 'listscmd':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          let teksnyee = `「 LIST CMD STICKER 」`
          let cemde = [];
          for (let i of _stikcmd) {
          cemde.push(i.id)
          teksnyee += `\n\n*${fx} ID :* ${i.id}\n*${fx} Cmd :* ${i.chats}`
          }
          reply(teksnyee)
          break
      case 'listjadibot':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          let teks = "*[ LIST JADI BOT ]*"
          for(let i of listjadibot) {
          teks += `*Nomor* : ${i.jid.split('@')[0]}*Nama* : ${i.name}\n*Device* : ${i.phone.device_manufacturer}\n*Model* : ${i.phone.device_model}\n\n`
          }
          reply(teks)
          break
//===============[END INFO]===============\\

//===============[GROUP]===============\\
      case 'linkgc':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isGroup) return reply(mess.khusus.group)
          if (!isBotGroupAdmins) return reply(mess.khusus.Badmin)
          try {
            const linkgece = await xiedev.groupInviteCode(from)
            reply(`link group ${groupName}\nlink: http://whatsapp.com/${linkgece}`)
          } catch (e) {
            reply(mess.error.salah)
          }
          break
      case 'setdescgc':
      case 'setdesc':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isGroup) return reply(mess.khusus.group)
          if (!isBotGroupAdmins) return reply(mess.khusus.Badmin)
          const newdesc = body.slice(11)
          const olddesc = groupDesc
          try {
          xiedev.groupUpdateDescription(from, newdesc)
          reply(`berhasil mengganti description group\ndari: ${olddesc}\n\nmenjadi: ${newdesc}`)
          } catch (e) {
            reply(e)
          }
          break
      case 'welcome':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isGroup) return reply(mess.khusus.group)
          if (args.length < 1) return reply('On Mengaktifkan\nOff Menonaktifkan')
          if ((args[0]) === 'on') {
          if (isWelkom) return reply('Sudah On')
          welkom.push(from)
          fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
          reply(mess.sukses)
          } else if ((args[0]) === 'off') {
          if (isWelkom) return reply('Sudah Off')
          welkom.splice(from, 1)
          fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
          reply(mess.sukses)
          } else {
          reply('On Mengaktifkan\nOff Menonaktifkan')
          }
          break
      case "antiviewonce":
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isGroup) return reply(mess.khusus.group)
          if ((args[0]) === 'on') {
          if (isAntiviewonce) return reply('Sudah On')
          antivo.push(from)
          fs.writeFileSync('./database/antivo.json', JSON.stringify(antivo))
          reply(mess.sukses)
          } else if ((args[0]) === 'off') {
          if (isAntiviewonce) return reply('Sudah Off')
          antivo.splice(from, 1)
          fs.writeFileSync('./database/antivo.json', JSON.stringify(antivo))
          reply(mess.sukses)
          } else if (!q) {
          sendButtonMsg(
            from,
            `MODE ANTIVIEWONCE`,
            `Silahkan pilih salah satu`,
            [
              {
                buttonId: `${prefix}antiviewonce on`,
                buttonText: {
                  displayText: `on`,
                },
                type: 1,
              },
              {
                buttonId: `${prefix}antiviewonce off`,
                buttonText: {
                  displayText: `off`,
                },
                  type: 1,
                },
              ]
            );
          }
          break
//===============[END GROUP]===============\\

//===============[DOWNLOAD]===============\\
      case 'play':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (args.length === 0) return reply(`parameter salah\nsilahkan ketik *${prefix}play* _lagu yang ingin di cari_`)
          var srch = args.join('')
          find = await yts(srch)
          res = find.all
          var reslink = res[0].url
          try {
            yta(reslink)
            .then((res) => {
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then(async (a) => {
                if (Number(filesize) >= 100000) return sendMediaURL(thumb, `╭${fx}「 PLAY 」\n├ Title : ${title}\n├ Ext : Mp3\n├ Size : ${filesizeF}\n└ Link : ${a.data}\n\nMaaf @${sender.split('@')[0]}\nFile Terlalu Besar Melebihi Batas`)
                sendMediaURL(thumb, `╭${fx}「 PLAY 」\n├ Title : ${title}\n├ Ext : Mp3\n├ Size : ${filesizeF}\n└ Link : ${a.data}`)
                await sendMediaURL(dl_link).catch(() => reply('error'))
              })
            })
          } catch (e) {
            reply(`server error`)
          }
          break
      case 'video':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (args.length === 0) return reply(`Kirim perintah *${prefix}video* _Judul lagu yang akan dicari_`)
          var srch = args.join('')
          find = await yts(srch)
          res = find.all 
          var reslink = res[0].url
          try {
            ytv(reslink)
            .then((res) => {
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then(async (a) => {
                if (Number(filesize) >= 100000) return sendMediaURL(thumb, `*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                const captions = `*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                sendMediaURL(thumb, captions)
                await URL(dl_link).catch(() => reply('error'))
              })                
            })
          } catch (e) {
            reply('server error')
          }                         
          break
      case 'ytsearch':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (args.length < 1) return reply("masukan judul video")
          var search = args.join('')
          try {
            var find = await yts(search)
          } catch {
            return await reply(mess.error.eror)
          }
          result = find.all
          var tbuff = await getBuffer(result[0].image)
          var ytres = `*[ YT Result ]*\n*————————————————————*\n\n`
          find.all.map((video) => {
            ytres += `${fx} Title: ` + video.title + '\n'
            ytres += `${fx} Link: ` + video.url + '\n'
            ytres += `${fx} Durasi: ` + video.timestamp + '\n'
            ytres += `${fx} Upload: ` + video.ago +`\n*————————————————————*\n\n`
          })
          await xiedev.sendMessage(from, tbuff, image, {quoted: team, caption: ytres})
          break
      case 'igstalk':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (args.length < 1) return reply("masukan username")
          ig.fetchUser(args[0])
          .then(user => {
            thum = `${user.profile_pic_url_hd}`
            desc = `*ID* : ${user.profile_id}\n*Username* : ${args.join('')}\n*Full Name* : ${user.full_name}\n*Bio* : ${user.biography}\n*Followers* : ${user.followers}\n*Following* : ${user.following}\n*Private* : ${user.is_private}\n*Verified* : ${user.is_verified}\n\n*Link* : https://instagram.com/${args.join('')}`
            sendMediaURL(thum, desc)
          })
          break
      case 'ytmp3':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (args.length < 1) return reply(mess.khusus.link)
          var link = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
          if (!link) return reply(mess.error.salah)
          try {
            reply(mess.wait)
            yta(args[0])
            .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
                if (Number(filesize) >= 30000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                const caption = `*YTMP3*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                sendMediaURL(thumb, caption)
                sendMediaURL(dl_link).catch(() => reply(mess.error.eror))
              })
            })
          } catch (e) {
            reply(mess.error.eror)
          }
          break
      case 'ytmp4':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (args.length < 1) return reply(mess.khusus.link)
          var link = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
          if (!link) return reply(mess.error.salah)
          try {
            reply(mess.wait)
            ytv(args[0])
            .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
                if (Number(filesize) >= 30000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                const caption = `*YTMP4*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                sendMediaURL(thumb, caption)
                sendMediaURL(dl_link).catch(() => reply("file error"))
              })
            })
          } catch (e) {
            reply(mess.error.eror)
          }
          break
      case 'ig':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isUrl(args[0]) && !args[0].includes('instagram.com') && args.length < 1) return reply(mess.error.salah)
          reply(mess.wait)
          hx.igdl(args[0])
          .then(async (res) => {
            for (let i of res.medias) {
              if (i.url.includes("mp4")){
                let link = await getBuffer(i.url)
                xiedev.sendMessage(from,link,video,{quoted: team,caption: `Type : ${i.type}`})
              } else {
                let link = await getBuffer(i.url)
                xiedev.sendMessage(from,link,image,{quoted: team,caption: `Type : ${i.type}`})
              }
            }
          })
          break
      case 'fb':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isUrl(args[0]) && !args[0].includes('facebook.com') && args.length < 1) return reply(mess.error.salah)
          reply(mess.wait)
          hx.fbdown(args[0])
          .then(res => {
            link = `${res.HD}`
            sendMediaURL(link, `*Link video_normal* : ${re.Normal_video}`)
          })
          break
      case 'igstory':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!q) return reply('Usernamenya?')
          hx.igstory(q)
          .then(async result => {
            for(let i of result.medias){
              if(i.url.includes('mp4')){
                let link = await getBuffer(i.url)
                xiedev.sendMessage(from,link,video,{quoted: team,caption: `Type : ${i.type}`})
              } else {
                let link = await getBuffer(i.url)
                xiedev.sendMessage(from,link,image,{quoted: team,caption: `Type : ${i.type}`})                  
              }
            }
          })
          break
      case 'twitter':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isUrl(args[0]) && !args[0].includes('twitter.com') && !q) return reply(mess.khusus.link)
          var res = await hx.twitter(args[0])
          sendMediaURL(res.HD, "Sukses")
          break
      case 'tiktok':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isUrl(args[0]) && !args[0].includes('tiktok.com') && !q) return reply(mess.khusus.link)
          sek = await reply(mess.wait)
          hx.ttdownloader(args[0])
          .then(res => {
            const {
              nowm
            } = res
            axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
            .then(async (a) => {
              me = `link: ${a.data}`
              salsa.sendMessage(from,{url:`${nowm}`},video,{mimetype:'video/mp4',quoted:team,caption:me})
              setTimeout(() => {
                xiedev.deleteMessage(from, sek.key)
              }, 10000)
            })
          })
          .catch( e => console.log(e))
          break
      case 'penyegar':
      case 'asupan':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          xiedev.updatePresence(from, Presence.composing)
          data = fs.readFileSync('./lib/asupan.js')
          jsonData = JSON.parse(data)
          randxiedev = Math.floor(Math.random() * jsonData.length);
          randKey = jsonData[randxiedev];
          asupan = await getBuffer(randKey.result)
          vidnya = await xiedev.prepareMessage(from, asupan, video)
          const butt = [
              {buttonId:`${prefix + command}`,buttonText:{displayText:'Asupan'},type:1},
              {buttonId:`${prefix}start`,buttonText:{displayText:'Back To Menu'},type:1}
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
      case 'brainly':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (args.length < 1) return reply('Pertanyaan apa?')
          soal = args.join(' ')
          brainly(`${soal}`)
          .then(res => {
            let teks = `<==========================>\n`
            for (let i of res.data) {
              teks += `*[ Brainly ]*\nsoal:${i.pertanyaan}\n\njawaban:${i.jawaban[0].text}\n<==========================>\n`
            }
            xiedev.sendMessage(from, teks, text, {quoted: fgif, detectLinks: false})
          })
          break
      case 'lirik':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!q) return reply('Lagu apa?')
          let song = await hx.lirik(q)
          sendMediaURL(song.thumb, song.lirik)
          break
//===============[EXPERIMENT]===============\\
      case 'jadibot':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (team.key.fromMe) return reply("Tidak Bisa Jadi Bot Didalam Bot")
          jadibot(reply, xiedev, from)
          break
      case 'stopjadibot':
          stopjadibot(reply)
          break
//===============[END EXPERIMENT]===============\\

//===============[FUNNY]===============\\
      case 'ttt':
      case 'tictactoe':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isGroup) return reply(mess.khusus.group)
          if (args.length < 1) return reply ("tag orang yang mau kamu aja main")
          if (isTTT) return reply("permainan sedang berlangsung di group ini")
          if (team.message.extendedTextMessage === undefined || team.message.extendedTextMessage === null) return reply('Tag salah satu orang untuk di ajak bermain')
          ment = team.message.extendedTextMessage.contextInfo.mentionedJid
          player1 = sender
          player2 = ment[0]
          number = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
          id = from
          turn = player2
          roomttt.push({player1,player2,id,number,turn})
          sendButLoc(from, `╭${fx}「 TICTACTOE 」\n├ @${player2.split("@")[0]}\n├ Anda Ditantang Bermain\n└ @${player1.split("@")[0]}`, `${authorbot}`, {jpegThumbnail: fs.readFileSync('./src/fotobot.jpg')}, 
          [
            {buttonId:`Y`,buttonText:{displayText:'MENERIMA'},type:1},
            {buttonId:`N`,buttonText:{displayText:'MENOLAK'},type:1},
            {buttonId:`${prefix}delttt`,buttonText:{displayText:'DEL TICTACTOE'},type:1}
          ], {contextInfo: {mentionedJid: player2}})
          break
      case 'delttt':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (!isGroup) return reply(mess.khusus.group)
          if (!isTTT) return reply("Tidak Ada Permainan Yang Sedang Berlangsung!")
          rooms = roomttt.filter(titid => titid.id.includes())
          roomttt = rooms
          reply(mess.sukses)
          break
      case 'suit':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          sendButtonMsg(from, `pilih salah satu`,``,[{
            buttonId:`${prefix}playsuit batu`,
            buttonText: {
              displayText: `batu (🗿)`
            },
            type: 1
          },{
            buttonId: `${prefix}playsuit gunting`,
            buttonText: {
              displayText: 'gunting (✂️)'
            },
            type: 1
          },{
            buttonId: `${prefix}playsuit kertas`,
            buttonText: {
              displayText: 'kertas (📄)'
            },
            type: 1
          }])
          break
      case 'playsuit':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          if (args.length < 1) return reply("Pilih Batu/Gunting/Kertas")
          if (args[0] === "gunting") {
            gunting = [
              "Kamu *Gunting*\nAku *Kertas*\nKamu Menang 😔",
              "Kamu *Gunting*\nAku *Batu*\nKamu Kalah 🙂",
              "Kamu *Gunting*\nAku *Gunting*\nKita Seri 😏"
              ]
            gun = gunting[Math.floor(Math.random() * gunting.length)]
            reply(gun)
          } else if (args[0] === 'kertas') {
            ker = [
              "Kamu *Kertas*\nAku *Batu*\nKamu Menang 😔",
              "Kamu *Kertas*\nAku *Gunting*\nKamu Kalah 🙂",
              "Kamu *Kertas*\nAku *Kertas*\nKita Seri 😏"
              ]
            kertas = ker[Math.floor(Math.random() * ker.length)]
          	reply(kertas)
          } else if (args[0] === 'batu') {
            bat = [
              "Kamu *Batu*\nAku *Gunting*\nKamu Menang ??",
              "Kamu *Batu*\nAku *Kertas*\nKamu Kalah 🙂",
              "Kamu *Batu*\nAku *Batu*\nKita Seri 😏"
              ]
            batu = bat[Math.floor(Math.random() * bat.length)]
            reply(batu)
          } else {
            reply('Pilih Batu/Gunting/Kertas')
          }
          break 
      case 'slot':
          if (!isUser) return sendButtonMsg(from, daftar1, daftar2, daftar3, {quoted: team})
          if (!isBanned) return sendButtonMsg(from banned1, banned2, banned3, {quoted: team})
          isiSlot = ["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍"]
          slotBoard = ["","","","","","","","",""]
          for (let i = 0 i < slotBoard.length i++) {
            itemSlot = isiSlot[Math.floor(Math.random() * isiSlot.length)]
            slotBoard[i] = itemSlot
          }
          if (slotBoard[1] == slotBoard[4] && slotBoard[4] == slotBoard[7] && slotBoard[7] == slotBoard[1]) {
            reply(`*[ MENANG ]*\n\n ${slotBoard[0]} : ${slotBoard[3]} : ${slotBoard[6]}\n ${slotBoard[1]} : ${slotBoard[4]} : ${slotBoard[7]} <===\n ${slotBoard[2]} : ${slotBoard[5]} : ${slotBoard[8]} \n\n*[ SLOT ]*\nketerangan: jika anda mendapatkan 3 baris buah yang sama maka anda menang\ncontoh: 🍒 : 🍒 : 🍒 <===`)
          } else {
          reply(`*[ KALAH ]*\n\n ${slotBoard[0]} : ${slotBoard[3]} : ${slotBoard[6]}\n ${slotBoard[1]} : ${slotBoard[4]} : ${slotBoard[7]} <===\n ${slotBoard[2]} : ${slotBoard[5]} : ${slotBoard[8]} \n\n*[ SLOT ]*\nketerangan: jika anda mendapatkan 3 baris buah yang sama maka anda menang\ncontoh: 🍒 : 🍒 : 🍒 <===`)
          }
          break
      case 'swm':
      case 'stickerwm':
      case 'sticker':
      case 's':
      case 'stik':
      case 'stick':
          var a = "Xie Bot"
          var b = "By XieDevTeam"
          if (isMedia && !team.message.videoMessage || isQuotedImage ) {
          const encmedia = isQuotedImage   ? JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo : team
           media = await xiedev.downloadAndSaveMediaMessage(encmedia)
          await createExif(a,b)
          out = getRandom('.webp')
          ffmpeg(media)
          .on('error', (e) => {
          console.log(e)
          xiedev.sendMessage(from, 'Terjadi kesalahan', 'conversation', {quoted: team})
          fs.unlinkSync(media)
          })
          .on('end', () => {
          _out = getRandom('.webp')
          spawn('webpmux', ['-set','exif','./stick/data.exif', out, '-o', _out])
          .on('exit', () => {
          xiedev.sendMessage(from, fs.readFileSync(_out),'stickerMessage', {quoted: team})
          fs.unlinkSync(out)
          fs.unlinkSync(_out)
          fs.unlinkSync(media)
          })
          })
          .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
          .toFormat('webp')
          .save(out) 
          } else if ((isMedia && team.message.videoMessage.seconds < 11 || isQuotedVideo && team.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
          const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo : team
          const media = await xiedev.downloadAndSaveMediaMessage(encmedia)
          await createExif(a,b)
          out = getRandom('.webp')
          ffmpeg(media)
          .on('error', (e) => {
          console.log(e)
          xiedev.sendMessage(from, 'Terjadi kesalahan', 'conversation', {quoted: team})
          fs.unlinkSync(media)
          })
          .on('end', () => {
          _out = getRandom('.webp')
          spawn('webpmux', ['-set','exif','./stick/data.exif', out, '-o', _out])
          .on('exit', () => {
          xiedev.sendMessage(from, fs.readFileSync(_out),'stickerMessage', {quoted: team})
          fs.unlinkSync(out)
          fs.unlinkSync(_out)
          fs.unlinkSync(media)
          })
          })
          .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
          .toFormat('webp')
          .save(out)       
          } else if (isQuotedSticker){
            const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(team).replace('quotedM','m')).message.extendedTextMessage.contextInfo : team
            media = await xiedev.downloadAndSaveMediaMessage(encmedia)
            createExif(a, b)
            modStick(media, xiedev, team, from)
          } else {
          reply(`Kirim gambar dengan caption ${prefix}swm atau tag gambar yang sudah dikirim`)
          }
          break
//===============[END FUNNY]===============\\

//===============[OWNER]===============\\
      case 'mode':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          sendButtonMsg(from, `${ucapanWaktu} Owner Ku\nSilahkan Pilih Modenya Yah`,`${tanggal()}`,[{
            buttonId:`${prefix}public`,
            buttonText: {
              displayText: 'PUBLIC'
            },
            type: 1
          },{
            buttonId: `${prefix}self`,
            buttonText: {
              displayText: 'SELF'
            },
            type: 1
          }])
          break
      case 'self':
			 if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
			 public = false
			 return reply(`MODE : SELF`)
			 break
      case 'public':
			 if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
	       public = true
			 return reply(`MODE : PUBLIC`)
			 break
      case 'isbaileys': 
      case 'bail': 
      case 'baileys':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          reply(`${team.quoted.isBaileys}`)
          break
      case 'q':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          if (!m.quoted) return reply('reply pesan!')
          let qse = xiedev.serializeM(await m.getQuotedObj())
          if (!qse.quoted) return reply('pesan yang anda reply tidak mengandung reply!')
          await qse.quoted.copyNForward(m.chat, true)
          break
      case 'setprefix':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          if (args.length < 1) return reply('Textnya Mana?')
          prefix = args[0]
          reply(`Menjadi ${prefix}`)
          break
      case 'setauthor':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          if (args.length < 1) return reply('Textnya Mana?')
          authorbot = args[0]
          reply(`Menjadi ${authorbot}`)
          break
      case 'setnamabot':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          if (args.length < 1) return reply('Textnya Mana?')
          namabot = args[0]
          reply(`Menjadi ${namabot}`)
          break
      case 'sethias':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          if (args.length < 1) return reply('Textnya Mana?')
          fx = args[0]
          reply(`Menjadi ${fx}`)
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
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          if (args.length === 0 ) return reply(`please input params\n${prefix}join _link gc wa_`)
          var link = body.slice(6)
          res = link.replace("https://chat.whatsapp.com/", "")
          done = await xiedev.acceptInvite(res)
          reply(`berhasil bergabung di ${done.gid}`)
          break
      case 'leave':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          xiedev.groupLeave(from)
          .then((res) => {
            xiedev.sendMessage(sender, "Sukses Owner", text)
          })
          break
      case 'scmd':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          if (isQuotedSticker) {
          if (!q) return reply(`Penggunaan : ${prefix + command} cmdnya dan tag stickernya`)
          var kodenya = team.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
          sCmd(kodenya, q)
          reply(mess.sucess)
          } else {
          reply('Reply Stickernya')
          }
          break
      case 'delcmd':
      case 'delscmd':
          if (!isOwner && !team.key.fromMe) return reply(mess.khusus.ownerB)
          if (!isQuotedSticker) return reply(`Penggunaan : ${prefix + command} tagsticker`)
          var kodenya = team.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
          _stikcmd.splice(getCommandPosition(kodenya), 1)
          fs.writeFileSync('./database/scmd.json', JSON.stringify(_stikcmd))
          reply(mess.sucess)
          break
//===============[END OWNER]===============\\
        default:
          // Tictactoe Game
          if (isTTT && isPlayer2) {
            if (budy.startsWith("Y")){
              tto = roomttt.filter(gang => gang.id.includes(from))
              tty = tto[0]
              number = tto[0].number
              teksboard = `*[ TIC TAC TOE GAME ]*

Player1 @${tty.player1.split('@')[0]}=❌
Player2 @${tty.player2.split('@')[0]}=⭕

${number[1]}${number[2]}${number[3]}
${number[4]}${number[5]}${number[6]}
${number[7]}${number[8]}${number[9]}

giliran = @${tty.player1.split('@')[0]}`
              xiedev.sendMessage(from, teksboard, text, {quoted: team, contextInfo:{mentionedJid: [tty.player1,tty.player2]}})
            }
            if (budy.startsWith('N')) {
              tto = roomttt.filter(gang => gang.id.includes(from))
              tty = tto[0]
              rooms = roomttt.filter(tokek => !tokek.id.includes(from))
              roomttt = rooms
              xiedev.sendMessage(from, `Yahh @${tty.player2.split('@')[0]} Menolak:(`,text,{quoted:team,contextInfo:{mentionedJid:[tty.player2]}})
            }
          }
          if (isTTT && isPlayer1) {
            noober = parseInt(budy)
            if (isNaN(noober)) return 
            if (noober < 1 || noober > 9) return reply("Masukan Nomer Dengan Benar")
            main = roomttt.filter(gang => gang.id.includes(from))
            if (!defttt.includes(main[0].number[noober])) return reply("Nomer Terlah Terisi\nSilahkan Yg Blm Terisi")
            if (main[0].turn.includes(sender)) return reply("Tunggu Giliran Mu Yah")
            s = '❎'
            main[0].number[noober] = s
            main[0].turn = main[0].player1
            rooms = roomttt.filter(bang => !bang.id.includes(from))
            roomttt = rooms
            pop = main[0]
            roomttt.push(pop)
            tto = roomttt.filter(hgh => hgh.id.includes(from))
            tty = tto[0]
            number = tto[0].number
            ttt = `${number[1]}${number[2]}${number[3]}\n${number[4]}${number[5]}${number[6]}\n${number[7]}${number[8]}${number[9]}`
            
            winningspeech = () => {
              ucapan1 = `*[ HASIL TICTACTOE ]*\n\nyeyyy permainan di menangkan oleh *@${tty.player1.split('@')[0]}*\n`
              ucapan2 = `*[ HASIL AKHIR ]*\n\n${ttt}`
              xiedev.sendMessage(from, ucapan1, text, {quoted:team, contextInfo:{mentionedJid: [tty.player2]}}) 
              rooms = roomttt.filter(hhg => !hhg.id.includes(from))
              return roomttt = rooms 
            }
            if (number[1] == s && number[2] == s && number[3] == s) return winningspeech()
            
            if (number[1] == s && number[4] == s && number[7] == s) return winningspeech()
            
            if (number[1] == s && number[5] == s && number[9] == s) return winningspeech()
            
            if (number[2] == s && number[5] == s && number[8] == s) return winningspeech()
            
            if (number[4] == s && number[5] == s && number[6] == s) return winningspeech()
            
            if (number[7] == s && number[8] == s && number[9] == s) return winningspeech()
            
            if (number[3] == s && number[5] == s && number[7] == s) return winningspeech()
            
            if (number[3] == s && number[6] == s && number[9] == s) return winningspeech()
            
            if (!ttt.includes('1️⃣') && !ttt.includes('2️⃣') && !ttt.includes('3️⃣') && ! ttt.includes('4️⃣') && !ttt.includes('5️⃣') && !ttt.includes('6️⃣') && !ttt.includes('7️⃣') && !ttt.includes('8️⃣') && !ttt.includes('9️⃣')){
              ucapan1 = `*[ HASIL TICTACTOE ]*\n\npermainan seri Good Game\n`
              ucapan2 = `*[ HASIL AKHIR ]*\n\n${ttt}`
              reply(ucapan1)
              naa = roomttt.filter(hhg => !hhg.id.includes(from))
              return roomttt= naa
            }
            ucapan = `*[ GAME TICTACTOE ]*\n\nPlayer1 @${tty.player1.split('@')[0]}=❌\nPlayer2 @${tty.player2.split('@')[0]}=⭕\n\n${ttt}\n\ngiliran = @${tty.player2.split('@')[0]}`
            xiedev.sendMessage(from, ucapan, text, {quoted: team, contextInfo:{mentionedJid: [tty.player1,tty.player2]}})
          }
          if (isTTT && isPlayer2) {
            noober = parseInt(budy)
            if (isNaN(noober)) return 
            if (noober < 1 || noober > 9) return reply("masukan number dengan benar")
            main = roomttt.filter(gang => gang.id.includes(from))
            if (!defttt.includes(main[0].number[noober])) return reply("number sudah di isi, pilih number lain nya")
            if (main[0].turn.includes(sender)) return reply("tunggu giliran mu dulu ya")
            s = '🅾️'
            main[0].number[noober] = s
            main[0].turn = main[0].player2
            rooms = roomttt.filter(bang => !bang.id.includes(from))
            roomttt = rooms
            pop = main[0]
            roomttt.push(pop)
            tto = roomttt.filter(hgh => hgh.id.includes(from))
            tty = tto[0]
            number = tto[0].number
            ttt = `${number[1]}${number[2]}${number[3]}\n${number[4]}${number[5]}${number[6]}\n${number[7]}${number[8]}${number[9]}`
            
            winningspeech = () => {
              ucapan1 = `*[ HASIL TICTACTOE ]*\n\nyeyyy permainan di menangkan oleh *@${tty.player2.split('@')[0]}*\n`
              ucapan2 = `*[ HASIL AKHIR ]*\n\n${ttt}`
              xiedev.sendMessage(from, ucapan1, text, {quoted:team, contextInfo:{mentionedJid: [tty.player1]}}) 
              rooms = roomttt.filter(hhg => !hhg.id.includes(from))
              return roomttt = rooms 
            }
            if (number[1] == s && number[2] == s && number[3] == s) return winningspeech()
            
            if (number[1] == s && number[4] == s && number[7] == s) return winningspeech()
            
            if (number[1] == s && number[5] == s && number[9] == s) return winningspeech()
            
            if (number[2] == s && number[5] == s && number[8] == s) return winningspeech()
            
            if (number[4] == s && number[5] == s && number[6] == s) return winningspeech()
            
            if (number[7] == s && number[8] == s && number[9] == s) return winningspeech()
            
            if (number[3] == s && number[5] == s && number[7] == s) return winningspeech()
            
            if (number[3] == s && number[6] == s && number[9] == s) return winningspeech()
            
            if (!ttt.includes('1️⃣') && !ttt.includes('2️⃣') && !ttt.includes('3️⃣') && ! ttt.includes('4️⃣') && !ttt.includes('5️⃣') && !ttt.includes('6️⃣') && !ttt.includes('7️⃣') && !ttt.includes('8️⃣') && !ttt.includes('9️⃣')){
              ucapan1 = `*[ HASIL TICTACTOE ]*\n\npermainan seri Good Game\n`
              ucapan2 = `*[ HASIL AKHIR ]*\n\n${ttt}`
              reply(ucapan1)
              naa = roomttt.filter(hhg => !hhg.id.includes(from))
              return roomttt= naa
            }
            ucapan = `*[ GAME TICTACTOE ]*\n\nPlayer1 @${tty.player1.split('@')[0]}=❌\nPlayer2 @${tty.player2.split('@')[0]}=⭕\n\n${ttt}\n\ngiliran = @${tty.player1.split('@')[0]}`
            xiedev.sendMessage(from, ucapan, text, {quoted: team, contextInfo:{mentionedJid: [tty.player1,tty.player2]}})
         }
     }
     if (isGroup && budy != undefined) {
	  } else {
	  console.log(color('[TEXT]', 'red'), 'PRIVAT-CHAT', color(sender.split('@')[0]))
	  }
	  } catch (e) {
     e = String(e)
     if (!e.includes("this.isZero") && !e.includes("undefined")){
	  console.log('Message : %s', color(e, 'red'))
     }
	}
}