/*
* If you want to change the name with the owner
* Please go to the file xiedev.js
* I just want to remind you that if you want more features, please add your own
* If this bot is broken, please fix it yourself!
*/
const {
  WAConnection: _WAConnection,
  MessageType
} = require("@adiwajshing/baileys")
const simple = require('./lib/simple')
let WAConnection = simple.WAConnection(_WAConnection)
let xiedev = new WAConnection()
const fs = require("fs")
const figlet = require('figlet')
const { banner, color, start, success } = require('./lib/function')
spc1 = '         '

require("./xiedev.js")
nocache("./xiedev.js", (module) => console.log(color(`xiedev.js is now updated!`)))

const starts = async (xiedev = new WAConnection()) => {
  xiedev.version = [2, 2123, 8]
  xiedev.browserDescription = [ 'X D T', 'ubuntu', '3.0' ]
  xiedev.logger.level = 'warn'
  console.log(color(figlet.textSync(`${spc1}Xie Dev Team`, {
  font: 'Standard',
  horizontalLayout: 'default',
  vertivalLayout: 'default',
  width: 80,
  whitespaceBreak: false
  }), 'cyan'))
  console.log(color('<=========================>', 'cyan'))
  console.log(color('•', 'aqua'), color('Dev : FxSx', 'white'))
  console.log(color('•', 'aqua'), color('Bot : XieCaa', 'white'))
  console.log(color('•', 'aqua'), color('Version : 8.0.0', 'white'))
  console.log(color('<=========================>', 'cyan'))
  console.log(banner.string)
  xiedev.on('qr', qr => {
  console.log(color("[SCAN]", "aqua"), color("Time Only 30 Seconds", "purple"))
  })
  
  fs.existsSync('./xiedevteam.json') && xiedev.loadAuthInfo('./xiedevteam.json')
  xiedev.on('connecting', () => {
  start('2', 'Connecting...')
  })
  
  xiedev.on('open', (key) => {
  success('2', 'Connecting Succeed')
  })
  
  await xiedev.connect({timeoutMs: 30*1000})
  fs.writeFileSync('./xiedevteam.json', JSON.stringify(xiedev.base64EncodedAuthInfo(), null, '\t'))

  xiedev.on('chat-update', async (message) => {
  require('./xiedev.js')(xiedev, message)
})
}

function nocache(module, cb = () => {}) {
  console.log("Module", `'${module}'`, "is now being watched for changes")
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module))
    cb(module)
  })
}

function uncache(module = ".") {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)]
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

starts()