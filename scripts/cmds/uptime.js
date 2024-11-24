const moment = require('moment-timezone');

const fs = require('fs');

const path = require('path');

const os = require('os');

const si = require('systeminformation');

const { performance } = require('perf_hooks');



// Assuming config.json is in the same directory as info.js

const configPath = path.resolve(__dirname, '../config.json'); // Adjust the path based on your project structure



// Read and parse config.json

let config = {};

try {

    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

} catch (error) {

    console.error("Error reading config.json:", error.message);

    // Handle the error, maybe exit or provide default config values

}



module.exports = {

    config: {

        name: "uptime",

        aliases: ["uptime1"],

        version: "1.5", 

        author: "Itz Aryan",

        countDown: 5,

        role: 0, 

        shortDescription: {

            vi: "Cung cấp thông tin bot và hệ thống",

            en: "Provides bot and system information"

        },

        longDescription: {

            vi: "Lệnh này cung cấp thông tin chi tiết về bot và hệ thống bao gồm thời gian hoạt động, thông tin hệ điều hành, CPU, bộ nhớ, đĩa, mạng và các thông tin bổ sung khác.",

            en: "This command provides detailed information about the bot and system including uptime, OS details, CPU, memory, disk, network, and additional settings."

        },

        category: "owner",

        guide: {

            vi: "Sử dụng lệnh này để nhận thông tin chi tiết về bot và hệ thống của bạn.",

            en: "Use this command to get detailed information about your bot and system."

        },

        envConfig: config 

    },

    onStart: async function ({ api, event, usersData, threadsData }) {

        const botName = config.nickNameBot || "☞︎︎︎✍︎ 𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃 𝐉𝐔𝐁𝐀𝐘𝐄𝐑 ✿︎𝙱☺︎︎𝚃 ♕︎"; // Fetching from config

        const botPrefix = config.prefix || "/";

        const botVersion = "1.5"; 

        const botDescription = "This bot can help you with various tasks including managing the server, providing information, and more."; // Manually set bot description



        const now = moment().tz(config.timeZone || 'Asia/Jakarta'); // Fetching from config

        const date = now.format('MMMM Do YYYY');

        const time = now.format('h:mm:ss A');



        // Manually set image links

        const links = [

            "https://i.imgur.com/7N0MkIU.jpeg"

        ];

        const link = links[Math.floor(Math.random() * links.length)];



        // System uptime calculation

        const systemUptime = os.uptime();

        const systemUptimeString = formatUptime(systemUptime);



        // Process uptime (since bot started)

        const processUptime = process.uptime();

        const processUptimeString = formatUptime(processUptime);



        // OS information

        const osInfo = await si.osInfo();

        const osArchitecture = os.arch();

        const osHostname = os.hostname();

        const osHomeDir = os.homedir();



        // CPU information

        let cpuCurrentSpeed = {};

        let cpuLoad = {};

        let cpuUsage = 'CPU information not available';

        try {

            cpuCurrentSpeed = await si.cpuCurrentspeed();

            cpuLoad = await si.currentLoad();

            cpuUsage = `User ${cpuLoad.currentload_user ? cpuLoad.currentload_user.toFixed(2) : 'N/A'}%, System ${cpuLoad.currentload_system ? cpuLoad.currentload_system.toFixed(2) : 'N/A'}%`;

        } catch (error) {

            console.error("Error fetching CPU information:", error.message);

        }

        const cpuManufacturer = cpuCurrentSpeed.manufacturer || "Unknown";



        // CPU Temperature

        const cpuTemp = await si.cpuTemperature();

        const cpuTempString = `${cpuTemp.main} °C`; // Adjust according to your preferred formatting



        // GPU information

        let gpuInfo = '';

        try {

            const graphics = await si.graphics();

            gpuInfo = `GPU: ${graphics.controllers[0].model}, VRAM: ${graphics.controllers[0].vram} GB`;

        } catch (error) {

            console.error("Error fetching GPU information:", error.message);

            gpuInfo = 'GPU information not available';

        }



        // Memory information

        const memInfo = await si.mem();

        const totalMemory = (memInfo.total / (1024 ** 3)).toFixed(2);

        const freeMemory = (memInfo.free / (1024 ** 3)).toFixed(2);

        const usedMemory = (memInfo.used / (1024 ** 3)).toFixed(2);



        // Disk information

        const diskInfo = await si.fsSize();

        const diskType = diskInfo[0].type;

        const diskSpace = `Total ${diskInfo[0].size}, Used ${diskInfo[0].used}, Available ${diskInfo[0].available}`;



        // Network interfaces

        const networkInterfaces = os.networkInterfaces();

        const networkInfo = Object.keys(networkInterfaces).map(name => `${name}: ${networkInterfaces[name][0].address} (IPv${networkInterfaces[name][0].family}, ${networkInterfaces[name][0].internal ? 'internal' : 'external'})`).join('\n');



        // System load

        const load = os.loadavg();

        const loadAverage = `Load Average: ${load[0].toFixed(2)}, ${load[1].toFixed(2)}, ${load[2].toFixed(2)}`;



        // Ping test

        const start = performance.now();

        await new Promise(resolve => setTimeout(resolve, 100));

        const end = performance.now();

        const ping = (end - start).toFixed(2);



        const allUsers = await usersData.getAll();

      const allThreads = await threadsData.getAll();



    // Check if anti-inbox is enabled

        const antiInboxStatus = config.antiInbox ? "Enabled" : "Disabled";



        // Language settings

        const language = config.language || "en";



        // Admin-only mode

        let adminOnlyStatus = "Disabled";

        if (config.adminOnly && config.adminOnly.enable) {

            adminOnlyStatus = "Enabled";

        }



        // Admin bots list

        let adminBotsList = 'N/A';

        if (config.adminBot && Array.isArray(config.adminBot)) {

            adminBotsList = config.adminBot.join(", ");

        }



        // Whitelist mode

        let whitelistStatus = "Disabled";

        let whitelistIds = "";

        if (config.whiteListMode && config.whiteListMode.enable) {

            whitelistStatus = "Enabled";

            whitelistIds = config.whiteListMode.whiteListIds.join(", ");

        }



        const replyMessage = `

╭─✦ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 ✦─

├‣ 🤖 Bot Name: ${botName}

├‣ ⏰ Bot Prefix: ${botPrefix}

├‣ 📌 Bot Version: ${botVersion}

├‣ 📄 Bot Description: ${botDescription}

╰───────────⧕

╭─✦ 𝗨𝗣𝗧𝗜𝗠𝗘 𝗜𝗡𝗙𝗢 ✦─

├‣ 🕒 System Uptime: ${systemUptimeString}

├‣ ⏱ Process Uptime: ${processUptimeString}

╰───────────⧕

╭─✦ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢✦─

├‣ 📡 OS: ${osInfo.platform} ${osInfo.release}

├‣ 🖥 CPU: ${cpuCurrentSpeed.max ? cpuCurrentSpeed.max.toFixed(2) : 'N/A'} GHz (${cpuCurrentSpeed.cores || 'N/A'} cores)

├‣ 🌡 CPU Temperature: ${cpuTempString}

├‣ 📈 Total Memory: ${totalMemory} GB

├‣ 📉 Free Memory: ${freeMemory} GB

├‣ 📊 RAM Usage: ${usedMemory} GB

├‣ 👥 Total Users: ${allUsers.length} members

├‣ 📂 Total Threads: ${allThreads.length} Groups

├‣ 🔄 Ping: ${ping} ms

├‣ 🔧 Load Average: ${loadAverage}

├‣ ${gpuInfo}

├‣ 💽 Disk Type: ${diskType}

├‣ 💾 Disk Space: ${diskSpace}

├‣ 🔹 Hostname: ${osHostname}

├‣ 🏠 Home Directory: ${osHomeDir}

╰‣ 🌐 Network Interfaces:\n${networkInfo}

╭─✦ 𝗢𝗧𝗛𝗘𝗥 𝗜𝗡𝗙𝗢✦─

├‣ 📥 Anti-Inbox: ${antiInboxStatus}

├‣ 🌐 Language: ${language}

├‣ 🔒 Admin-Only Mode: ${adminOnlyStatus}

├‣ 🤖 Admin Bots: ${adminBotsList}

├‣ ⚪ Whitelist Mode: ${whitelistStatus}

├‣ ⚪ Whitelist IDs: ${whitelistIds}

├‣ ⚙ Architecture: ${osArchitecture}

├‣ 💻 CPU Model: ${cpuCurrentSpeed.model || 'N/A'}

├‣ 🛠 CPU Load: ${cpuUsage}

├‣ ⚙ CPU Manufacturer: ${cpuManufacturer}

╰─────────────⧕`;



        await api.sendMessage({

            body: replyMessage,

        }, event.threadID);



        // Sending image attachment

        await api.sendMessage({

            attachment: await global.utils.getStreamFromURL(link),

        }, event.threadID);

    },

    onChat: async function ({ event, message, getLang }) {

        if (event.body && event.body.toLowerCase() === "uptime") {

            this.onStart({ message });

        }

    }

};



function formatUptime(seconds) {

    const days = Math.floor(seconds / (3600 * 24));

    const hours = Math.floor((seconds % (3600 * 24)) / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const secondsLeft = Math.floor(seconds % 60);



    const uptimeStringParts = [];

    if (days > 0) uptimeStringParts.push(`${days} days`);

    if (hours > 0) uptimeStringParts.push(`${hours} hours`);

    if (minutes > 0) uptimeStringParts.push(`${minutes} minutes`);

    if (secondsLeft > 0) uptimeStringParts.push(`${secondsLeft} seconds`);



    return uptimeStringParts.join(', ');

                            }
