const { 
  WAConnection,
  MessageType,
  Mimetype
} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require("fs")

listjadibot = []

const jadibot = async (reply, xiedev, id) => {
  conn = new WAConnection()
  conn.logger.level = 'warn'
  conn.version = [2, 2123, 8]
  conn.browserDescription = [ 'Jadi Bot Xie', 'ubuntu', '3.0' ]
  conn.on('qr', async qr =>{
    let bot = await qrcode.toDataURL(qr, { scale: 8 })
    let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
    bot = await xiedev.sendMessage(id,buffer,MessageType.image,{caption:'Scan Qr Nya Kak\n\n*Note:*Qr Akan Berganti Selama 30 Dtk!'})
    setTimeout(() => {
     	xiedev.deleteMessage(id, bot.key)
    },30000)
  })
  conn.on('connecting', () => {
    xiedev.sendMessage(id, "*[ XDT ]* connecting...", MessageType.text)
  })
  conn.on('open', () => {
    reply("*[ XDT ]* connected")
    reply("Ingat Ini Hanya Numpang Jika Bot Utama Mati Akan Hilang Otomatis")
  })
  await conn.connect({timeoutMs: 30 * 1000})
  listjadibot.push(conn.user)
  require('../index.js')(conn)
}

const stopjadibot = (reply) => {
	conn = new WAConnection()
	conn.close()
	reply('Sukses Stop Jadi Bot')
}

module.exports = { jadibot, stopjadibot, listjadibot }