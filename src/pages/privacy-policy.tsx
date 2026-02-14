export default function PrivacyPolicy() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-[900px] mx-auto">
        <header className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Politique de confidentialité</h1>
        </header>

        <main className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mt-0 text-xl font-semibold tracking-tight">Qui sommes-nous ?</h2>
          <p className="mt-2">Equipe et contacts :</p>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>jodiaz-a : jodiaz-a@student.42mulhouse.fr</li>
            <li>mgovinda : mgovinda@student.42mulhouse.fr</li>
            <li>jpeter : jpeter@student.42mulhouse.fr</li>
            <li>qhauuy : qhauuy@student.42mulhouse.fr</li>
            <li>jteste : jteste@student.42mulhouse.fr</li>
          </ul>
          <p className="mt-2">Nous faisons partie de l&#x27;école 42 Mulhouse.</p>
          <p className="mt-2">
            Vous pouvez nous contacter par mail, nous répondons généralement sous 30 jours.
          </p>
          <p className="mt-2">
            Le service fr_transcendence est un site web permettant de jouer à des jeux (Bomberman et
            Pong) avec des fonctionnalités sociales (compte, amis, chat, classement).
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Données que nous collectons</h2>
          <p className="mt-2">Compte : adresse e-mail, pseudo, mot de passe haché.</p>
          <p className="mt-2">Profil : préférences de profil</p>
          <p className="mt-2">Jeu : scores, historique de parties, statistiques, classement</p>
          <p className="mt-2">Social : liste d&apos;amis, demandes d&apos;amis</p>
          <p className="mt-2">
            Données techniques : journaux de connexion et de sécurité (ex. adresse IP, informations
            du navigateur, horodatage), logs d&apos;erreur
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">
            Pourquoi nous collectons ces données
          </h2>
          <p className="mt-2">
            Fournir le service : création et gestion du compte, connexion, parties, classement
          </p>
          <p className="mt-2">Fonctionnalités sociales : amis, profil</p>
          <p className="mt-2">Sécurité : prévention des abus, triche, accès non autorisés</p>
          <p className="mt-2">Maintenance : diagnostic des bugs, amélioration des performances</p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">
            Base légale (RGPD / Union européenne)
          </h2>
          <p className="mt-2">
            Exécution du service : fourniture du service (compte/jeu/fonctionnalités)
          </p>
          <p className="mt-2">
            Intérêt légitime : sécurité, prévention des abus/triche, logs et diagnostic
          </p>
          <p className="mt-2">Nous n&apos;utilisons pas de cookies non essentiels.</p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Age minimum</h2>
          <p className="mt-2">Le service n&apos;est pas destiné aux enfants de moins de 13 ans.</p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Durée de conservation</h2>
          <p className="mt-2">
            Données de compte et de profil : tant que le compte est actif (ou jusqu&apos;à
            suppression)
          </p>
          <p className="mt-2">Données de jeu (scores/parties) : tant que le compte existe</p>
          <p className="mt-2">Logs techniques/sécurité : 30 jours</p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Partage des données</h2>
          <p className="mt-2">
            Les données sont stockées sur l&apos;infrastructure utilisée pour exécuter le service
            dans le cadre du projet pédagogique. Nous ne vendons pas vos données et nous ne les
            partageons pas avec des tiers.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Sécurité</h2>
          <p className="mt-2">Mots de passe stockés sous forme hachée.</p>
          <p className="mt-2">Connexions chiffrées via HTTPS.</p>
          <p className="mt-2">Accès restreint aux données et limitation des logs.</p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Vos droits</h2>
          <p className="mt-2">
            Vous pouvez demander l&apos;accès, la rectification, la suppression, ou vous opposer à
            certains traitements.
          </p>
          <p className="mt-2">Contact : jodiaz-a@student.42mulhouse.fr</p>
          <p className="mt-2">
            Merci d&apos;indiquer votre pseudo et l&apos;adresse e-mail du compte.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">
            Entrée en vigueur et mise à jour
          </h2>
          <p className="mt-2">
            Date d&apos;entrée en vigueur : 11/02/2026 — Dernière mise à jour : 11/02/2026
          </p>

          <hr className="my-6 opacity-30" />

          <p className="text-sm opacity-70">
            © ft_transcendence — Ce document est fourni à titre informatif.
          </p>
        </main>
      </div>
    </div>
  );
}
