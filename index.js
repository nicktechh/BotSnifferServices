const discord = require("discord.js")
const Discord = require("discord.js")
const client = new discord.Client({
    intents: 131071
})
const config = require("./config/config.json")
const fs = require("node:fs");
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

module.exports = client;

client.commands = new discord.Collection();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}


const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        const data = await rest.put(
            Routes.applicationCommands(config.ClientID),
            { body: commands },
        );
    } catch (error) {
        console.error(error);
    }
})();


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

const ticketFiles = fs.readdirSync('./systems').filter(file => file.endsWith('.js'));

for (const file of ticketFiles) {
    const event = require(`./systems/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(config.token)

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Il comando ${interaction.commandName} non esiste.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Errore durante l\'esecuzione del comando!', ephemeral: true });
    }
});