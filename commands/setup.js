const { SlashCommandBuilder, PermissionFlagsBits, ButtonStyle } = require("discord.js")
const discord = require("discord.js")
const config = require("../config/config.json")
const client = require("../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("setup")
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Inserisci il campo')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('canale')
                .setDescription('Inserisci il canale')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {

        const args = interaction.options.getString('type')
        const canale = interaction.options.getChannel('canale')

        const embedTicket = new discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle("Sniffer • Ticket System")
            .setDescription(`Questo è il posto per aprire un ticket per l'assistenza. Si prega di **non menzionare lo staff** nei ticket a meno che non avete ottenuto una risposta **entro 24 ore**. Fare clic sul pulsante qui sotto che meglio descrive la vostra richiesta. \n\n*Si chiede la collaborazione dell'utenza in caso di malfunzionamento del servizio di non spammare messaggi in privato o in chat pubblica. Per problemi contattare **Tendyyx#5317**.*`)
            .setThumbnail(client.user.avatarURL())


        const row2 = new discord.ActionRowBuilder()
            .setComponents(
                new discord.ButtonBuilder()
                    .setCustomId("generale")
                    .setLabel("✅ Apri Un Ticket")
                    .setStyle(discord.ButtonStyle.Success),

            )

        


        switch (args) {
            case "ticket": {
                const verifica = client.channels.cache.get(canale.id)

                if (!verifica) return interaction.reply({ content: "canale non fornito", ephemeral: true });
                verifica.send({
                    embeds: [embedTicket],
                    components: [row2]
                })
                interaction.reply({
                    content: `Setup ${args} eseguito correttamente!`,
                    ephemeral: true
                })
                break
            }

            case "ruoli": {
                const verifica = client.channels.cache.get(canale.id)

                if (!verifica) return interaction.reply({ content: "canale non fornito", ephemeral: true });
                verifica.send({
                    embeds: [embedRoles],
                    components: [rowRoles]
                })
                interaction.reply({
                    content: `Setup ${args} eseguito correttamente!`,
                    ephemeral: true
                })
                break
            }

            case "commissioni": {
                const verifica = client.channels.cache.get(canale.id)

                if (!verifica) return interaction.reply({ content: "canale non fornito", ephemeral: true });
                verifica.send({
                    embeds: [embedCommissione],
                    components: [rowCom]
                })
                interaction.reply({
                    content: `Setup ${args} eseguito correttamente!`,
                    ephemeral: true
                })
                break
            }

            case "verifica": {
                const verifica = client.channels.cache.get(canale.id)

                if (!verifica) return interaction.reply({ content: "canale non fornito", ephemeral: true });
                verifica.send({
                    embeds: [embedVerifica],
                    components: [rowVerifica]
                })
                interaction.reply({
                    content: `Setup ${args} eseguito correttamente!`,
                    ephemeral: true
                })
                break
            }

            case "candidature": {
                const verifica = client.channels.cache.get(canale.id)

                if (!verifica) return interaction.reply({ content: "canale non fornito", ephemeral: true });
                verifica.send({
                    embeds: [embedCandidature],
                    components: [rowCandidatura]
                })
                interaction.reply({
                    content: `Setup ${args} eseguito correttamente!`,
                    ephemeral: true
                })
                break
            }

        }

    }
}