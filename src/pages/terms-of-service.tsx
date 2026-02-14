export default function TermsOfService() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-[900px] mx-auto px-5 py-10">
        <header className="rounded-2xl border p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">
            Conditions Générales d’Utilisation (CGU)
          </h1>
        </header>

        <main className="mt-6 rounded-2xl border p-6">
          <h2 className="mt-0 text-xl font-semibold tracking-tight">Acceptation</h2>
          <p className="mt-2">
            En utilisant ft_transcendence ou en créant un compte, vous acceptez les présentes CGU.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Description du service</h2>
          <p className="mt-2">
            Site web permettant de jouer à des jeux (Bomberman, Pong) avec des fonctionnalités
            telles que compte utilisateur, classement, amis et chat (selon disponibilité).
          </p>
          <p className="mt-2">Le service n’est pas destiné aux enfants de moins de 13 ans.</p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Compte et sécurité</h2>
          <p className="mt-2">Pour créer un compte : adresse e-mail, pseudo, mot de passe.</p>
          <p className="mt-2">
            En cas d’oubli, une procédure de réinitialisation peut être proposée via l’adresse
            e-mail.
          </p>
          <p className="mt-2">
            Vous êtes responsable de la confidentialité de vos identifiants et de l’activité sur
            votre compte.
          </p>
          <p className="mt-2">
            Les pseudos offensants, illégaux ou usurpant une identité peuvent être modérés.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Règles d’utilisation</h2>
          <p className="mt-2">Il est interdit de :</p>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>tricher (bots, scripts, exploitation de failles), contourner les règles</li>
            <li>attaquer le service (scan, injection, DDoS, accès non autorisé)</li>
            <li>
              spammer, harceler, publier du contenu illégal ou offensant (notamment via le chat)
            </li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">
            Contenu utilisateur (pseudo, messages, etc.)
          </h2>
          <p className="mt-2">
            Vous restez propriétaire de votre contenu, mais vous autorisez son affichage dans le
            service.
          </p>
          <p className="mt-2">Nous pouvons modérer/supprimer tout contenu non conforme.</p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Propriété intellectuelle</h2>
          <p className="mt-2">
            Le service, son interface, ses éléments graphiques et tout contenu fourni par
            ft_transcendence sont protégés. Sauf indication contraire, ils appartiennent à l’équipe
            du projet. Toute reproduction ou réutilisation non autorisée est interdite.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Licence d’utilisation</h2>
          <p className="mt-2">
            Nous vous accordons un droit personnel, non exclusif et non transférable d’utiliser le
            service à des fins privées. Vous ne pouvez pas copier, distribuer, vendre, ou exploiter
            commercialement le service ou ses éléments sans autorisation.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">
            Disponibilité et modifications
          </h2>
          <p className="mt-2">
            Le service est fourni “en l’état” sans garantie de disponibilité continue.
          </p>
          <p className="mt-2">
            Nous pouvons modifier, suspendre ou interrompre des fonctionnalités.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Responsabilité</h2>
          <p className="mt-2">
            Dans les limites autorisées par la loi, nous ne sommes pas responsables des dommages
            indirects, pertes de données, bugs ou indisponibilités.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Résiliation / suspension</h2>
          <p className="mt-2">
            Vous pouvez demander la suppression de votre compte. Celle-ci entraîne la suppression
            des données associées, sauf obligations légales ou logs sécurité conservés 30 jours.
          </p>
          <p className="mt-2">
            Certains contenus (ex. messages) peuvent être conservés sous forme anonymisée pour
            préserver la cohérence des conversations.
          </p>
          <p className="mt-2">
            Nous pouvons suspendre ou bannir un compte en cas d’abus, triche ou tentative d’attaque.
          </p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Droit applicable</h2>
          <p className="mt-2">Droit français.</p>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Contact</h2>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>jodiaz-a : jodiaz-a@student.42mulhouse.fr</li>
            <li>mgovinda : mgovinda@student.42mulhouse.fr</li>
            <li>jpeter : jpeter@student.42mulhouse.fr</li>
            <li>qhauuy : qhauuy@student.42mulhouse.fr</li>
            <li>jteste : jteste@student.42mulhouse.fr</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold tracking-tight">
            Entrée en vigueur et mise à jour
          </h2>
          <p className="mt-2">
            Nous pouvons modifier les CGU ; la version à jour est publiée sur cette page avec sa
            date.
          </p>
          <p className="mt-2">
            Date d’entrée en vigueur : 02/02/2026 — Dernière mise à jour : 02/02/2026
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
