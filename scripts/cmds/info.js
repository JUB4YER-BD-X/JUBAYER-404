const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "info",
		version: "1.0",
		author: "ArYan",
		countDown: 20,
		role: 0,
		shortDescription: { vi: "", en: "" },
		longDescription: { vi: "", en: "" },
		category: "owner",
		guide: { en: "" },
		envConfig: {}
	},
	onStart: async function ({ message }) {
		const botName = "ᴀʀʏᴀɴ ʀᴀᴊ";
		const botPrefix = "/";
		const authorName = "ᴅᴀᴠɪᴅ ᴀʀʏᴀɴ";
		const ownAge = "18";
		const teamName = "ᴛɪᴍᴇ";
		const authorFB = "https://www.facebook.com/ArYan.com.404";
		const authorInsta = "ɴᴏ";
		const tikTok = "ɴᴏ";
		const st = "ᴀᴄᴛɪᴠᴇ";
		const urls = JSON.parse(fs.readFileSync('maybe.json'));
		const link = urls[Math.floor(Math.random() * urls.length)];
		const now = moment().tz('Asia/Jakarta');
		const date = now.format('MMMM Do YYYY');
		const time = now.format('h:mm:ss A');
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

		message.reply({
			body: `  🍒𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃 𝐉𝐔𝐁𝐀𝐘𝐄𝐑ツ🍒  \n
🤖 Bot Name: $𝗝𝗨𝗕𝗔𝗬𝗘𝗥
🚀 Prefix: $/
👤 Owner: $𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃 𝐉𝐔𝐁𝐀𝐘𝐄𝐑
🔆 Age: $18+
☢️ Team: $AVAILABLE
🍒 authorFb: $https://www.facebook.com/www.xnxx.chrome?mibextid=ZbWKwL}
📱 insta: $not available
🏠 TikTok: $available
🖊️ stutes: $student
⏱️ seconds: $
🕰️ minutes: $
🛸 hours: $
🌒 days: $
🌧️ date: $
☔ Time: $
⏰ uptime: $
 `,
			attachment: await global.utils.getStreamFromURL(link)
		});
	},
	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "info") {
			this.onStart({ message });
		}
	}
};
