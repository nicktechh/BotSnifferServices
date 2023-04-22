const { SlashCommandBuilder, PermissionFlagsBits, ButtonStyle } = require("discord.js")
const discord = require("discord.js")
const config = require("../config/config.json")
const client = require("../index.js")
const discordTranscripts = require('discord-html-transcripts');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("close")
        .setDescription("Chiudi un ticket"),
    async execute(interaction) {

        if (interaction.channel.parent == config.categoria || interaction.channel.parent == "1093951814535233610" || interaction.channel.parent == "1093951931807969321") {
            const getAllMessages = async (channel) => {
                let allMessages = []
                let lastMessage

                while (true) {
                    const options = { limit: 100 }
                    if (lastMessage) options.before = lastMessage

                    let messages = await channel.messages.fetch(options)

                    allMessages = allMessages.concat(Array.from(messages.values()))

                    lastMessage = messages.last().id

                    if (messages.size != 100) {
                        break
                    }
                }

                return allMessages
            }

            let chatLog = `Transcript-#${interaction.channel.name}`

            const guild = client.guilds.cache.get(interaction.guildId);
            const chan = guild.channels.cache.get(interaction.channelId);

            let messages = await getAllMessages(interaction.channel)
            messages.reverse().forEach(msg => {
                chatLog += `Data: ${msg.createdAt.toLocaleString()}, Autore: @${msg.author.tag} >> `

                if (msg.content) chatLog += `${msg.content}\n`

                if (msg.embeds[0]) {
                    chatLog += `\n`
                }

                if (msg.attachments.size > 0)
                    chatLog += `Files » ${msg.attachments.map(x => `${x.name} (${x.url})`).join(", ")}\n`

                if (msg.stickers.size > 0)
                    chatLog += `Stickers » ${msg.stickers.map(x => `${x.name} (${x.url})`).join(", ")}\n`

            })

            let attachmentss = new discord.AttachmentBuilder(Buffer.from(chatLog, "utf-8"), { name: `transcript-${interaction.channel.name}.txt` })

            const embed = new discord.EmbedBuilder()
                .setAuthor({ name: 'Ticket Transcript', iconUrl: client.user.displayAvatarURL() })
                .addFields({ name: "Ticket aperto da", value: "<@" + chan.topic + ">", inline: true })
                .addFields({ name: "Ticket chiuso da", value: "<@" + interaction.member.id + ">", inline: true })
                .setColor("Blue")
                .setTimestamp();

            const valutazione = new discord.EmbedBuilder()
                .setTitle("Valuta l'assistenza")
                .setColor("Blue")
                .setDescription(`Ciao! Ti chiediamo di valutare l'assistenza per vedere se è stata efficace o bisogna migliorare qualcosa. Ti chiediamo di valutare da 1 a 5 stelle.`)
            const bttt = new discord.ActionRowBuilder()
                .setComponents(
                    new discord.ButtonBuilder()
                        .setCustomId("uno")
                        .setLabel("1")
                        .setEmoji("⭐")
                        .setStyle(ButtonStyle.Primary),
                        new discord.ButtonBuilder()
                        .setCustomId("due")
                        .setLabel("2")
                        .setEmoji("⭐")
                        .setStyle(ButtonStyle.Primary),
                        new discord.ButtonBuilder()
                        .setCustomId("tre")
                        .setLabel("3")
                        .setEmoji("⭐")
                        .setStyle(ButtonStyle.Primary),
                        new discord.ButtonBuilder()
                        .setCustomId("quattro")
                        .setLabel("4")
                        .setEmoji("⭐")
                        .setStyle(ButtonStyle.Primary),
                        new discord.ButtonBuilder()
                        .setCustomId("cinque")
                        .setLabel("5")
                        .setEmoji("⭐")
                        .setStyle(ButtonStyle.Primary),
                        
                )

            var transcript = client.channels.cache.get(config.transcript)

            transcript.send({ embeds: [embed], files: [attachmentss] })

            client.users.cache.get(interaction.channel.topic).send({ embeds: [embed], files: [attachmentss] })
                .catch(() => { })
            setTimeout(function () {
                client.users.cache.get(interaction.channel.topic).send({ embeds: [valutazione], components: [bttt] })
                    .catch(() => { })
            }, 2000)
                
            setTimeout(function () {
                chan.delete()
            }, 5000);

            interaction.reply({
                content: "Questo canale verrà chiuso entro 5 secondi"
            })
        } else {
            return interaction.reply({ephemeral: true, content: "Non puoi eseguire qui questo comando."})
        }




    }
}