/**
 * Test RÉEL de l'envoi Resend, à lancer une fois les clés obtenues :
 *
 *   npm run test:resend
 *
 * Lit .env.local (RESEND_API_KEY, RESEND_FROM_EMAIL, ADMIN_EMAIL) et envoie
 * un e-mail de test à ADMIN_EMAIL. Aucune clé n'est stockée dans le code.
 * Tant que ce test n'a pas réussi, on ne peut pas affirmer que l'envoi fonctionne.
 */

const required = ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "ADMIN_EMAIL"];
const missing = required.filter((k) => !process.env[k]?.trim());

if (missing.length > 0) {
  console.error(`✗ Variables manquantes dans .env.local : ${missing.join(", ")}`);
  console.error("  Copiez .env.example en .env.local et renseignez-les (voir README › Formulaires).");
  process.exit(1);
}

const to = process.env.ADMIN_EMAIL.split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const now = new Date().toLocaleString("fr-FR", { timeZone: "Africa/Bamako" });

const res = await fetch(process.env.RESEND_API_URL?.trim() || "https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: process.env.RESEND_FROM_EMAIL.trim(),
    to,
    subject: "Test de configuration — site Madina Trans",
    text: `E-mail de test envoyé le ${now} (heure de Bamako).\nSi vous le recevez, l'envoi des demandes de devis par Resend est opérationnel.`,
  }),
});

const body = await res.text();
if (res.ok) {
  console.log(`✓ Resend a accepté l'e-mail (HTTP ${res.status}) : ${body}`);
  console.log(`  Vérifiez maintenant la réception dans la boîte : ${to.join(", ")} (et les indésirables).`);
} else {
  console.error(`✗ Échec Resend (HTTP ${res.status}) : ${body}`);
  console.error("  Causes fréquentes : clé invalide, domaine expéditeur non vérifié dans Resend.");
  process.exit(1);
}
