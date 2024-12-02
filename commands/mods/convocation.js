const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "conv",
    description: "Créer une convocation pour un utilisateur.",
    execute(message, args) {
        // Vérifier la mention de l'utilisateur
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply("❌ Vous devez mentionner un utilisateur à convoquer !");
        }

        // Vérifier si suffisamment d'arguments sont fournis
        if (args.length < 4) {
            return message.reply(
                "❌ Usage incorrect ! Veuillez utiliser la commande comme suit : `+conv @utilisateur date heure salle`."
            );
        }

        // Récupération des arguments
        const date = args[1]; // Date
        const heure = args[2]; // Heure
        const salle = args.slice(3).join(" "); // Salle (peut contenir plusieurs mots)

        // Création de l'embed
        const convocationEmbed = new MessageEmbed()
            .setColor("#FFD700") // Couleur dorée
            .setTitle("✨ - Convocation")
            .setDescription(
                `Bonjour ${user}, tu as été convoqué par ${message.author}. Voici les informations te concernant :`
            )
            .addFields(
                { name: "Raison :", value: ".", inline: false },
                { name: "Date :", value: date, inline: true },
                { name: "Heure :", value: heure, inline: true },
                { name: "Salon :", value: salle, inline: true }
            )
            .setFooter({ text: "Fly away in style!" });

        // Envoi de l'embed
        message.channel.send({ content: `${user}`, embeds: [convocationEmbed] });

        // Suppression du message de commande pour garder le chat propre (facultatif)
        message.delete().catch((err) => {
            console.error("Impossible de supprimer le message :", err);
        });
    },
};
