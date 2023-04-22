const { SlashCommandBuilder, PermissionFlagsBits, ButtonStyle } = require("discord.js")
const discord = require("discord.js")
const config = require("../config/config.json")
const client = require("../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("staff")
        .setDescription("pex or depex")
        .addStringOption(option =>
            option.setName('type')
                .setDescription('pex or depex?')
                .setRequired(true)
        )
        .addMentionableOption(option =>
            option.setName('utente')
                .setDescription('utente')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('ruolo')
                .setDescription('Inserisci il ruolo')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('ruolo-precedente')
                .setDescription('Inserisci il ruolo precedente')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {

        const args = interaction.options.getString('type')
        const ruolo = interaction.options.getString('ruolo')
        const ruoloprecedente = interaction.options.getString('ruolo-precedente')
        const utente = interaction.options.getMentionable('utente')

        const embedPro = new discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Nuova Promozione!")
            .setDescription(`${utente} è stato __promosso__ a ${ruolo} su Sniffer Services!`)
            .addFields({ name: "Ruolo precedente della promozione", value: `${ruoloprecedente}`, inline: true})
            .addFields({ name: "Ruolo della promozione", value: `${ruolo}`, inline: true})
            .setThumbnail(utente.avatarURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL()})

        const embedDep = new discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("Nuovo Degrado!")
            .setDescription(`${utente} è stato __degradato__ a ${ruolo} su Sniffer Services!`)
            .addFields({ name: "Ruolo precedente del degrado", value: `${ruoloprecedente}`, inline: true})
            .addFields({ name: "Ruolo del degrado", value: `${ruolo}`, inline: true})
            .setThumbnail(utente.avatarURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL()})

    

        switch (args) {
            case "pex": {
                const stafflog = client.channels.cache.get(config.canali.stafflogs)

                if (!utente) return interaction.reply({ content: "utente non fornito", ephemeral: true });
                if (!ruolo) return interaction.reply({ content: "ruolo non fornito", ephemeral: true });
                stafflog.send({
                    embeds: [embedPro],
                    content: `${utente}`
                })
                interaction.reply({
                    content: `Promozione di ${utente} eseguita correttamente!`,
                    ephemeral: true
                })
                break
            }

            case "depex": {
                const stafflog = client.channels.cache.get(config.canali.stafflogs)

                if (!utente) return interaction.reply({ content: "utente non fornito", ephemeral: true });
                if (!ruolo) return interaction.reply({ content: "ruolo non fornito", ephemeral: true });
                stafflog.send({
                    embeds: [embedDep],
                    content: `${utente}`
                })
                interaction.reply({
                    content: `Degrado di ${utente} eseguito correttamente!`,
                    ephemeral: true
                })
                break
            }

            
        }

    }
}