const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const discord = require("discord.js")
const config = require("../config/config.json");
const { options } = require("../index.js");
const client = require("../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Cancella dei messaggi da un canale")
        .addNumberOption(option => 
            option.setName('numero')
            .setDescription('Messaggi da cancellare')
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction, client) {
        try {
            count = interaction.options.getNumber('numero')
        } catch {
            return interaction.reply(`Usage: /clear [number]`)
        }

        if (!count || count < 1) {
            return interaction.reply(`Usage: /clear [number]`)
        }

        if (count < 100) {
            await interaction.channel.bulkDelete(count, true)
            interaction.reply({
                content: `Cancellati ${count} messaggi`
            })
        }
        else {
            await interaction.channel.bulkDelete(100, true)
            count = 100
        }
    },
};