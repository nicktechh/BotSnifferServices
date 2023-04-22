const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const discord = require("discord.js")
const config = require("../config/config.json")
const client = require("../index.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Aggiungi un utente al ticket")
        .addMentionableOption(option => 
            option.setName('utente')
            .setDescription('Inserisci l\'utente')
            .setRequired(true)
        ),
    async execute(interaction) {
        const utente = interaction.options.getMentionable('utente')

        interaction.channel.permissionOverwrites.edit(utente, {
            "SendMessages": true,
            "ViewChannel": true
        });

        interaction.reply({
            content: "Utente aggiunto nel ticket",
            ephemeral: true
        })
    }
}