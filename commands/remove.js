const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const discord = require("discord.js")
const config = require("../config/config.json")
const client = require("../index.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Rimuovi un utente al ticket")
        .addMentionableOption(option => 
            option.setName('utente')
            .setDescription('Inserisci l\'utente')
            .setRequired(true)
        ),
    async execute(interaction) {
        const utente = interaction.options.getMentionable('utente')

        interaction.channel.permissionOverwrites.edit(utente, {
            "SendMessages": false,
            "ViewChannel": false
        });

        interaction.reply({
            content: "Utente rimosso dal ticket",
            ephemeral: true
        })
    }
}