module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        const discord = require("discord.js")
        const Discord = require("discord.js")
        const config = require("../config/config.json")
        let num = 0000;

        if (!interaction.isButton) return;

        if (interaction.customId == "generale") {

            if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
                var canale = client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id);
                return interaction.reply({
                    content: `Hai già un ticket aperto! <#${canale.id}>`,
                    ephemeral: true
                })
            }

            num++;

            interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                topic: interaction.user.id,
                parent: config.categoria,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ["ViewChannel", "SendMessages"]
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: "ViewChannel"
                    },
                    {
                        id: config.ruoli.staff,
                        allow: ["ViewChannel", "SendMessages"]
                    }
                ]
            }).then(async c => {
                interaction.reply({
                    content: `Ticket Aperto! <#${c.id}>`,
                    ephemeral: true
                })
                const embedSelector = new Discord.EmbedBuilder()
                    .setColor(Discord.Colors.Blue)
                    .setAuthor({ name: `✅ Come possiamo aiutarti?`, iconURL: interaction.user.avatarURL() })
                    .setDescription(`Ciao, <@${interaction.user.id}>!
Un membro dello staff ti assisterà il prima possibile. 
Consigliamo per aggevolare lo staff, di descrivere qui i problemi riscontrati.

**I tempi di risposta variano quindi chiediamo di attendere la risposta senza menzionare continuamente lo staff. Il mancato rispetto della regola verrà seguita da sanzioni.**`)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                const selector = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.SelectMenuBuilder()
                            .setCustomId("selector")
                            .setPlaceholder("Seleziona il problema")
                            .addOptions(
                                {
                                    label: "Assistenza Generale",
                                    description: "Se hai bisogno di supporto generale",
                                    emoji: "🧍",
                                    value: "supporto"
                                },
                                {
                                    label: "Segnala un bug",
                                    description: "Se devi segnalare un bug",
                                    emoji: "🆘",
                                    value: "sgn"
                                },
                                {
                                    label: "Developing",
                                    description: "Categoria sviluppo",
                                    emoji: "💻",
                                    value: "dev"
                                },
                                {
                                    label: "Partnership",
                                    description: "Se vuoi richedere una partnership",
                                    emoji: "🤝",
                                    value: "partner"
                                },
                                {
                                    label: "Segnalazione Utente",
                                    description: "Se devi segnalare un utente",
                                    emoji: "🆘",
                                    value: "utente"
                                },
                            )
                    )


                msg = await c.send({
                    content: `<@${interaction.user.id}>`,
                    embeds: [embedSelector],
                    components: [selector]
                })


                const collector = msg.createMessageComponentCollector({
                    componentType: discord.ComponentType.SelectMenu,
                    time: 99999999
                });


                collector.on('collect', i => {
                    if (i.user.id == interaction.user.id) {
                        if (msg.deletable) {
                            msg.delete().then(async () => { })
                        }

                        switch (i.values[0]) {

                            case "supporto": {
                                const embed = new Discord.EmbedBuilder()
                                    .setColor(Discord.Colors.Blue)
                                    .setTitle("Assistenza Generale")
                                    .setDescription(`Attendi pazientemente che uno staff ti assista, ricorda di non pingare i membri dello staff!
Ti consigliamo di descrivere nel miglior modo possibile il tuo problema.

Se non rispondi a un ticket entro 12 ore, il tuo ticket potrebbe essere chiuso!
                                    
Sniffer Administration`)
                                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })


                                c.send({
                                    content: `<@${interaction.user.id}>, <@&${config.ruoli.staff}>`,
                                    embeds: [embed]
                                })
                                c.edit({
                                    name: `assistenza-${interaction.user.username}`
                                 })
                                break
                            }

                            case "sgn": {
                                const embed = new Discord.EmbedBuilder()
                                    .setColor(Discord.Colors.Blue)
                                    .setTitle("Segnalazione")
                                    .setDescription(`Attendi pazientemente che uno staff ti assista, ricorda di non pingare i membri dello staff!
Ti consigliamo di descrivere nel miglior modo possibile il tuo problema.

Se non rispondi a un ticket entro 12 ore, il tuo ticket potrebbe essere chiuso!
                                    
Sniffer Administration`)
                                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })


                                c.send({
                                    content: `<@${interaction.user.id}>, <@&${config.ruoli.staff}>`,
                                    embeds: [embed]
                                })
                                c.edit({
                                    name: `bug-${interaction.user.username}`
                                 })
                                break
                            }

                            case "dev": {
                                const embed = new Discord.EmbedBuilder()
                                    .setColor(Discord.Colors.Blue)
                                    .setTitle("Assistenza Developer")
                                    .setDescription(`Attendi pazientemente che uno staff ti assista, ricorda di non pingare i membri dello staff!
Ti consigliamo di descrivere nel miglior modo possibile il tuo problema.

Se non rispondi a un ticket entro 12 ore, il tuo ticket potrebbe essere chiuso!
                                    
Sniffer Administration`)
                                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })


                                c.send({
                                    content: `<@${interaction.user.id}>, <@&${config.ruoli.staff}>`,
                                    embeds: [embed]
                                })
                                c.edit({
                                    name: `dev-${interaction.user.username}`
                                 })
                                break
                            }
                            case "partner": {
                                const embed = new Discord.EmbedBuilder()
                                    .setColor(Discord.Colors.Blue)
                                    .setTitle("Partner")
                                    .setDescription(`Attendi pazientemente che uno staff ti assista, ricorda di non pingare i membri dello staff!
Ti consigliamo di descrivere nel miglior modo possibile il tuo problema.

Se non rispondi a un ticket entro 12 ore, il tuo ticket potrebbe essere chiuso!
                                    
Sniffer Administration`)
                                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

                                c.edit({
                                    name: `partner-${interaction.user.username}`
                                })
                                c.send({
                                    content: `<@${interaction.user.id}>, <@&${config.ruoli.staff}>`,
                                    embeds: [embed]

                                })
                                break
                            }

                            case "utente": {
                                const embed = new Discord.EmbedBuilder()
                                    .setColor(Discord.Colors.Blue)
                                    .setTitle("Segnalazione utente")
                                    .setDescription(`Attendi pazientemente che uno staff ti assista, ricorda di non pingare i membri dello staff!
Ti consigliamo di descrivere nel miglior modo possibile il tuo problema.

Se non rispondi a un ticket entro 12 ore, il tuo ticket potrebbe essere chiuso!
                                    
Sniffer Administration`)
                                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })


                                c.send({
                                    content: `<@${interaction.user.id}>, <@&${config.ruoli.staff}>`,
                                    embeds: [embed]
                                })
                                c.edit({
                                    name: `segnalazione-${interaction.user.username}`
                                 })
                                break
                            }
                        }
                    }
                })
            })




        }
    }
}
