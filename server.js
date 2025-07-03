const axios = require("axios");

app.get("/gamepasses/:username", async (req, res) => {
  const username = req.params.username;

  try {
    // Étape 1 : obtenir l'ID du joueur à partir de son nom
    const userRes = await axios.get(`https://users.roblox.com/v1/usernames/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { usernames: [username] }
    });

    const userId = userRes.data.data[0]?.id;
    if (!userId) return res.status(404).json({ error: "Utilisateur non trouvé" });

    // Étape 2 : chercher les gamepasses du joueur
    const gamepassRes = await axios.get(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50`);
    const games = gamepassRes.data.data;

    const gamepasses = [];

    // Pour chaque jeu, on récupère les gamepasses associés
    for (const game of games) {
      const passesRes = await axios.get(`https://games.roblox.com/v1/games/${game.id}/game-passes?limit=100`);
      gamepasses.push(...passesRes.data.data);
    }

    res.json(gamepasses);

  } catch (err) {
    console.error("Erreur API:", err.message);
    res.status(500).json({ error: "Failed to fetch gamepasses" });
  }
});
