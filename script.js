const profileForm = document.querySelector("#profile-form");
const profileResult = document.querySelector("#profile-result");
const weeklyPlan = document.querySelector("#weekly-plan");
const bodyTypeInput = document.querySelector("#body-type");
const goalInput = document.querySelector("#goal");
const deleteProfileButton = document.querySelector("#delete-profile");

const form = document.querySelector("#workout-form");
const sportInput = document.querySelector("#sport");
const durationInput = document.querySelector("#duration");
const durationUnitInput = document.querySelector("#duration-unit");
const workoutList = document.querySelector("#workout-list");

const plans = {
  muscle: [
    ["Lundi", "Haut du corps", "Pompes ou développé, tirage, épaules, bras — 3 séries par exercice."],
    ["Mardi", "Bas du corps", "Squats, fentes, pont fessier, mollets — 2 à 3 séries."],
    ["Mercredi", "Récupération active", "Marche tranquille et mobilité pendant 20 à 30 min."],
    ["Jeudi", "Haut du corps", "Variante des exercices du lundi, en gardant une technique propre."],
    ["Vendredi", "Bas du corps et tronc", "Squats, charnière de hanches, gainage — sans aller jusqu’à la douleur."],
    ["Samedi", "Option légère", "Marche, vélo doux ou activité que tu apprécies."],
    ["Dimanche", "Repos", "Sommeil, hydratation et récupération."]
  ],
  "fat-loss": [
    ["Lundi", "Renforcement complet", "Squat adapté, pompes inclinées, tirage, gainage — 2 à 3 séries."],
    ["Mardi", "Cardio modéré", "Marche rapide, vélo ou danse pendant 25 à 40 min."],
    ["Mercredi", "Récupération", "Mobilité et marche légère pendant 15 à 25 min."],
    ["Jeudi", "Renforcement complet", "Travail de tout le corps, avec une intensité contrôlée."],
    ["Vendredi", "Cardio modéré", "Activité régulière à un rythme où tu peux encore parler."],
    ["Samedi", "Activité plaisir", "Promenade, sport collectif ou vélo selon tes préférences."],
    ["Dimanche", "Repos", "Récupération et préparation de la semaine."]
  ],
  fitness: [
    ["Lundi", "Renforcement complet", "Exercices de base pour les jambes, le haut du corps et le tronc."],
    ["Mardi", "Endurance", "Marche rapide, vélo ou jogging facile pendant 20 à 30 min."],
    ["Mercredi", "Mobilité", "Étirements doux et mouvements contrôlés pendant 15 à 20 min."],
    ["Jeudi", "Renforcement complet", "Répète les mouvements en privilégiant la qualité du geste."],
    ["Vendredi", "Cardio facile", "20 à 30 min à intensité modérée."],
    ["Samedi", "Activité libre", "Choisis une activité agréable et adapte sa durée à ton niveau."],
    ["Dimanche", "Repos", "Sommeil et récupération."]
  ],
  maintain: [
    ["Lundi", "Renforcement complet", "Séance équilibrée : jambes, poussée, tirage et tronc."],
    ["Mardi", "Cardio", "20 à 35 min d’activité modérée."],
    ["Mercredi", "Récupération active", "Marche et mobilité."],
    ["Jeudi", "Renforcement complet", "Deuxième séance de renforcement de la semaine."],
    ["Vendredi", "Cardio ou sport plaisir", "Choisis une activité adaptée à ton énergie."],
    ["Samedi", "Activité libre", "Promenade, vélo ou sport collectif."],
    ["Dimanche", "Repos", "Récupération."]
  ]
};

const bodyTypeAdvice = {
  ectomorphe: "Priorise une progression graduelle en renforcement et une récupération suffisante. Si ton objectif est la prise de muscle, mange suffisamment et régulièrement.",
  mesomorphe: "Cherche un programme équilibré, augmente progressivement la difficulté et suis tes progrès plutôt que de te fier uniquement à ta morphologie.",
  endomorphe: "Combine renforcement régulier et activité cardiovasculaire adaptée. Pour changer la composition corporelle, privilégie des habitudes durables plutôt que des restrictions extrêmes.",
  unknown: "Pas besoin de connaître ton morphotype pour progresser : choisis des exercices adaptés à ton niveau, progresse peu à peu et observe ta récupération."
};

const goalLabels = {
  muscle: "Prise de muscle",
  "fat-loss": "Réduction de la masse grasse",
  fitness: "Forme et endurance",
  maintain: "Maintien de la condition physique"
};

function makePlanCard(day, title, description) {
  const article = document.createElement("article");
  article.className = "plan-card";
  const dayHeading = document.createElement("p");
  dayHeading.className = "plan-day";
  dayHeading.textContent = day;
  const heading = document.createElement("h3");
  heading.textContent = title;
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  article.append(dayHeading, heading, paragraph);
  return article;
}


const exerciseList = document.querySelector("#exercise-list");

const exerciseLibrary = {
  muscle: [
    { name: "Pompes", group: "Haut du corps", sets: "3 séries de 6 à 12 répétitions", tip: "Garde le corps aligné, les mains sous les épaules et descends sans cambrer le dos.", search: "pompes exercice démonstration technique débutant" },
    { name: "Squats au poids du corps", group: "Jambes", sets: "3 séries de 8 à 12 répétitions", tip: "Pieds à largeur d’épaules, genoux dans l’axe des pieds et descente contrôlée.", search: "squat poids du corps démonstration bonne technique" },
    { name: "Fentes arrière", group: "Jambes et fessiers", sets: "2 séries de 8 répétitions par jambe", tip: "Fais un pas vers l’arrière, garde le buste stable et adapte l’amplitude à ton confort.", search: "fente arrière exercice démonstration débutant" },
    { name: "Gainage planche", group: "Tronc", sets: "3 séries de 20 à 40 secondes", tip: "Garde les coudes sous les épaules et le corps aligné, sans retenir ta respiration.", search: "gainage planche exercice démonstration technique" }
  ],
  "fat-loss": [
    { name: "Squats au poids du corps", group: "Renforcement", sets: "3 séries de 10 répétitions", tip: "Contrôle la descente et remonte sans rebondir.", search: "squat poids du corps démonstration bonne technique" },
    { name: "Pompes inclinées", group: "Renforcement", sets: "2 à 3 séries de 8 à 12 répétitions", tip: "Pose les mains sur un support stable, garde le corps aligné et contrôle chaque répétition.", search: "pompes inclinées exercice démonstration débutant" },
    { name: "Marche rapide", group: "Cardio", sets: "20 à 30 minutes", tip: "Choisis une allure qui accélère la respiration tout en te permettant de parler.", search: "marche rapide technique posture exercice" },
    { name: "Mountain climbers lents", group: "Cardio et tronc", sets: "3 séries de 20 à 30 secondes", tip: "Commence lentement en gardant les mains stables et le dos aligné ; ralentis si nécessaire.", search: "mountain climber débutant démonstration exercice" }
  ],
  fitness: [
    { name: "Squats au poids du corps", group: "Renforcement", sets: "2 à 3 séries de 10 répétitions", tip: "Garde les pieds stables, les genoux dans l’axe et le mouvement contrôlé.", search: "squat poids du corps démonstration bonne technique" },
    { name: "Pompes contre un mur", group: "Renforcement", sets: "2 séries de 10 répétitions", tip: "Place les mains au mur à hauteur de poitrine et garde le corps aligné.", search: "pompes contre un mur débutant démonstration" },
    { name: "Marche rapide ou vélo", group: "Endurance", sets: "20 à 30 minutes", tip: "Augmente progressivement la durée selon ton souffle et ton niveau.", search: "marche rapide technique posture exercice" },
    { name: "Bird-dog", group: "Stabilité", sets: "2 séries de 8 répétitions par côté", tip: "À quatre pattes, tends le bras et la jambe opposés sans faire tourner le bassin.", search: "bird dog exercice démonstration kinésithérapie" }
  ],
  maintain: [
    { name: "Squats au poids du corps", group: "Jambes", sets: "2 à 3 séries de 8 à 12 répétitions", tip: "Fais des répétitions fluides et contrôlées, adaptées à ton niveau.", search: "squat poids du corps démonstration bonne technique" },
    { name: "Pompes inclinées", group: "Haut du corps", sets: "2 séries de 8 à 12 répétitions", tip: "Utilise un support stable et garde les épaules confortables.", search: "pompes inclinées exercice démonstration débutant" },
    { name: "Marche active", group: "Cardio", sets: "20 à 30 minutes", tip: "Marche à une allure régulière, puis ralentis pour récupérer.", search: "marche rapide technique posture exercice" },
    { name: "Gainage planche", group: "Tronc", sets: "2 à 3 séries de 20 à 30 secondes", tip: "Garde le ventre engagé et le dos dans une position neutre.", search: "gainage planche exercice démonstration technique" }
  ]
};

function renderExerciseLibrary(goal) {
  if (!exerciseList) return;
  exerciseList.replaceChildren();
  const exercises = exerciseLibrary[goal] || exerciseLibrary.fitness;

  exercises.forEach((exercise, index) => {
    const card = document.createElement("article");
    card.className = "exercise-card";

    const top = document.createElement("div");
    top.className = "exercise-card-top";
    const number = document.createElement("span");
    number.className = "exercise-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const group = document.createElement("span");
    group.className = "exercise-group";
    group.textContent = exercise.group;
    top.append(number, group);

    const videoUrl = `https://www.youtube.com/@NassimSahili/search?query=${encodeURIComponent(exercise.name)}`;
    const titleLink = document.createElement("a");
    titleLink.className = "exercise-title-link";
    titleLink.href = videoUrl;
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    titleLink.title = `Ouvrir les démonstrations de ${exercise.name} sur la chaîne Nassim Sahili`;
    const title = document.createElement("h3");
    title.textContent = exercise.name;
    titleLink.append(title);
    const sets = document.createElement("p");
    sets.className = "exercise-sets";
    sets.textContent = exercise.sets;
    const tip = document.createElement("p");
    tip.className = "exercise-tip";
    tip.textContent = exercise.tip;

    const link = document.createElement("a");
    link.className = "button button-primary exercise-video-link";
    link.href = videoUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML = '<span aria-hidden="true">▶</span> Voir sur la chaîne Nassim Sahili';

    card.append(top, titleLink, sets, tip, link);
    exerciseList.append(card);
  });
}

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const age = Number(document.querySelector("#age").value);
  const weight = Number(document.querySelector("#weight").value);
  const height = Number(document.querySelector("#height").value);
  const bodyType = bodyTypeInput.value;
  const goal = goalInput.value;

  if (!Number.isFinite(age) || age < 13 || age > 100 ||
      !Number.isFinite(weight) || weight < 25 || weight > 350 ||
      !Number.isFinite(height) || height < 100 || height > 250 ||
      !plans[goal] || !bodyTypeAdvice[bodyType]) {
    profileResult.hidden = false;
    profileResult.textContent = "Vérifie les informations saisies puis réessaie.";
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  profileResult.replaceChildren();
  const summary = document.createElement("p");
  summary.className = "profile-summary";
  summary.textContent = `Profil : ${age} ans · ${weight} kg · ${height} cm · Objectif : ${goalLabels[goal]}.`;
  const advice = document.createElement("p");
  advice.textContent = bodyTypeAdvice[bodyType];
  const bmiNote = document.createElement("p");
  bmiNote.className = "small-note";
  bmiNote.textContent = "Le poids et la taille sont enregistrés pour personnaliser le suivi. L’IMC n’est pas utilisé pour classer ton morphotype et ne suffit pas, à lui seul, à évaluer la santé ou la composition corporelle.";
  profileResult.append(summary, advice, bmiNote);
  if (!currentUser && !isRestoring) {
    const guestNote = document.createElement("p");
    guestNote.className = "small-note guest-note";
    const loginLink = document.createElement("button");
    loginLink.type = "button";
    loginLink.className = "auth-link";
    loginLink.textContent = "Connecte-toi ou crée un compte";
    loginLink.addEventListener("click", () => openAuth("login"));
    guestNote.append("Ton profil n’est pas sauvegardé. ", loginLink, " pour le retrouver à chaque visite.");
    profileResult.append(guestNote);
  }
  profileResult.hidden = false;

  weeklyPlan.replaceChildren();
  plans[goal].forEach((entry) => weeklyPlan.append(makePlanCard(...entry)));
  renderExerciseLibrary(goal);
  if (!isRestoring) document.querySelector("#planning-section").scrollIntoView({ behavior: "smooth", block: "start" });

  saveProfile({ age, weight, height, bodyType, goal });
});

// Permet d'effacer les informations du profil sauvegardées sur cet appareil.
if (deleteProfileButton) {
  deleteProfileButton.addEventListener("click", async () => {
    if (!window.confirm("Supprimer le profil enregistré (âge, poids, taille, morphologie et objectif) ainsi que le planning affiché ?")) return;
    await removeProfile();
    resetPlanUI();
    document.querySelector("#profile-title").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ==================== Configuration Supabase ====================
// Colle ici l’URL du projet et la clé PUBLIABLE (sb_publishable_…, ou « anon public » sur un ancien projet).
// Ne mets JAMAIS une clé secrète (sb_secret_… ou « service_role ») dans ce fichier.
const SUPABASE_URL = "https://nahaneazkqqezvczmewq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MwF9C91lntKL2wFB_MTxXQ_pGWAfflb";

const isConfigured = !SUPABASE_URL.includes("VOTRE-PROJET") && !SUPABASE_ANON_KEY.startsWith("VOTRE_");
const sb = isConfigured && window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

let currentUser = null;
let isRestoring = false;
let workouts = [];
let recoveryPending = location.hash.includes("type=recovery");

// ==================== Petites notifications ====================
function notify(message) {
  let toast = document.querySelector("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 4500);
}

// ==================== Données de l’utilisateur (API Supabase) ====================
async function saveProfile(profile) {
  if (!sb || !currentUser || isRestoring) return;
  const { error } = await sb.from("profiles").upsert({
    user_id: currentUser.id,
    age: profile.age,
    weight: profile.weight,
    height: profile.height,
    body_type: profile.bodyType,
    goal: profile.goal,
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" });
  if (error) notify("Ton profil n’a pas pu être enregistré. Vérifie ta connexion et réessaie.");
}

async function removeProfile() {
  if (!sb || !currentUser) return;
  const { error } = await sb.from("profiles").delete().eq("user_id", currentUser.id);
  if (error) notify("Le profil n’a pas pu être supprimé du compte. Réessaie.");
}

function resetPlanUI() {
  profileForm.reset();
  profileResult.replaceChildren();
  profileResult.hidden = true;
  weeklyPlan.innerHTML = '<div class="empty-state"><span class="empty-icon">＋</span><strong>Ton planning apparaîtra ici</strong><p>Complète ton profil et choisis « Générer mon planning » pour afficher ta semaine type.</p><a href="#profile-title">Renseigner mon profil ↗</a></div>';
  if (exerciseList) exerciseList.innerHTML = '<div class="empty-state">Génère ton planning pour afficher les exercices adaptés à ton objectif.</div>';
}

async function restoreProfile(userId) {
  const { data, error } = await sb.from("profiles")
    .select("age, weight, height, body_type, goal")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) { notify("Impossible de charger ton profil pour le moment."); return; }
  if (!data || !currentUser || currentUser.id !== userId) return;

  const values = { age: data.age, weight: data.weight, height: data.height, "body-type": data.body_type, goal: data.goal };
  for (const [id, value] of Object.entries(values)) {
    const input = document.getElementById(id);
    if (input && value !== null && value !== undefined) input.value = String(value);
  }
  if (profileForm.checkValidity()) {
    isRestoring = true;
    profileForm.requestSubmit();
    isRestoring = false;
  }
}

async function loadWorkouts(userId) {
  const { data, error } = await sb.from("workouts")
    .select("id, sport, duration, unit, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });
  if (error) { notify("Impossible de charger tes séances pour le moment."); return []; }
  return data || [];
}

async function loadUserData() {
  const userId = currentUser.id;
  workoutList.replaceChildren();
  const loading = document.createElement("li");
  loading.textContent = "Chargement de tes séances…";
  workoutList.append(loading);

  const [loaded] = await Promise.all([loadWorkouts(userId), restoreProfile(userId)]);
  if (!currentUser || currentUser.id !== userId) return; // déconnecté pendant le chargement
  workouts = loaded;
  displayWorkouts();
}

function clearUserData() {
  resetPlanUI();
  form.reset();
  workouts = [];
  displayWorkouts();
}

function displayWorkouts() {
  workoutList.replaceChildren();

  if (workouts.length === 0) {
    const message = document.createElement("li");
    message.textContent = currentUser
      ? "Aucune séance enregistrée pour le moment."
      : "Connecte-toi pour enregistrer tes séances et retrouver ta progression.";
    workoutList.append(message);
    return;
  }

  workouts.forEach((workout) => {
    const item = document.createElement("li");
    item.className = "workout-item";
    const sport = typeof workout.sport === "string" ? workout.sport : "Séance à supprimer";
    const duration = Number(workout.duration);
    const unit = ["s", "min", "h"].includes(workout.unit) ? workout.unit : "min";
    const created = new Date(workout.created_at);
    const date = Number.isNaN(created.getTime()) ? "" : `${created.toLocaleDateString("fr-FR")} — `;
    const details = document.createElement("span");
    details.textContent = `${date}${sport} — ${Number.isFinite(duration) ? duration : "?"} ${unit}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Supprimer";
    deleteButton.setAttribute("aria-label", `Supprimer la séance : ${sport}`);
    deleteButton.addEventListener("click", async () => {
      if (!window.confirm(`Supprimer définitivement la séance « ${sport} » ?`)) return;
      deleteButton.disabled = true;
      const { error } = await sb.from("workouts").delete().eq("id", workout.id);
      if (error) {
        deleteButton.disabled = false;
        notify("La séance n’a pas pu être supprimée. Réessaie.");
        return;
      }
      workouts = workouts.filter((w) => w.id !== workout.id);
      displayWorkouts();
    });

    item.append(details, deleteButton);
    workoutList.append(item);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const sport = sportInput.value.trim();
  const duration = Number(durationInput.value);
  const unit = durationUnitInput.value;

  if (!sport || !Number.isFinite(duration) || duration < 1 || !["s", "min", "h"].includes(unit)) return;
  if (!currentUser) {
    openAuth("login", "Connecte-toi ou crée un compte pour enregistrer tes séances.");
    return;
  }
  if (!sb) return;

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  const { data, error } = await sb.from("workouts")
    .insert({ sport, duration, unit })
    .select("id, sport, duration, unit, created_at")
    .single();
  submitButton.disabled = false;

  if (error) {
    notify("La séance n’a pas pu être enregistrée. Vérifie ta connexion et réessaie.");
    return;
  }
  workouts.push(data);
  form.reset();
  displayWorkouts();
});

// ==================== Connexion ====================
const authOverlay = document.querySelector("#auth-overlay");
const authForm = document.querySelector("#auth-form");
const authError = document.querySelector("#auth-error");
const authInfo = document.querySelector("#auth-info");
const authSubmit = document.querySelector("#auth-submit");
const authIntro = document.querySelector("#auth-intro");
const authTitle = document.querySelector("#auth-title");
const authTabs = document.querySelector(".auth-tabs");
const tabLogin = document.querySelector("#tab-login");
const tabRegister = document.querySelector("#tab-register");
const nameFields = document.querySelector("#name-fields");
const firstNameInput = document.querySelector("#auth-firstname");
const lastNameInput = document.querySelector("#auth-lastname");
const emailField = document.querySelector("#email-field");
const confirmField = document.querySelector("#confirm-field");
const emailInput = document.querySelector("#auth-email");
const passwordInput = document.querySelector("#auth-password");
const passwordLabel = document.querySelector("#password-label");
const confirmInput = document.querySelector("#auth-confirm");
const forgotButton = document.querySelector("#forgot-button");
const userMenu = document.querySelector("#user-menu");
const userAvatar = document.querySelector("#user-avatar");
const userNameLabel = document.querySelector("#user-name");
const logoutButton = document.querySelector("#logout-button");
const loginButton = document.querySelector("#login-button");
const authClose = document.querySelector("#auth-close");
const lockedAreas = document.querySelectorAll("main, footer");
const NOT_CONFIGURED = "Supabase n’est pas encore configuré : renseigne SUPABASE_URL et SUPABASE_ANON_KEY au début de script.js.";

let authMode = "login"; // "login" | "register" | "recovery"

let lastFocused = null;

// Ouvre la fenêtre de connexion (mode : "login", "register" ou "recovery").
function openAuth(mode = "login", message = "") {
  if (authOverlay.hidden) lastFocused = document.activeElement;
  setAuthMode(mode);
  if (!sb) showAuthError(NOT_CONFIGURED);
  if (message) showAuthInfo(message);
  authOverlay.hidden = false;
  document.body.classList.add("auth-open");
  lockedAreas.forEach((area) => { area.inert = true; });
  (mode === "register" ? firstNameInput : mode === "recovery" ? passwordInput : emailInput).focus();
}

function hideAuth() {
  authOverlay.hidden = true;
  document.body.classList.remove("auth-open");
  lockedAreas.forEach((area) => { area.inert = false; });
}

// Fermeture volontaire (bouton ×, touche Échap, clic à l’extérieur). Impossible pendant le changement de mot de passe.
function closeAuth() {
  if (authMode === "recovery" || authOverlay.hidden) return;
  hideAuth();
  showAuthError("");
  showAuthInfo("");
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

function showAuthError(message) {
  authError.textContent = message;
  authError.hidden = !message;
}

function showAuthInfo(message) {
  authInfo.textContent = message;
  authInfo.hidden = !message;
}

function setAuthMode(mode) {
  authMode = mode;
  const isRegister = mode === "register";
  const isRecovery = mode === "recovery";
  tabLogin.classList.toggle("active", mode === "login");
  tabRegister.classList.toggle("active", isRegister);
  tabLogin.setAttribute("aria-selected", String(mode === "login"));
  tabRegister.setAttribute("aria-selected", String(isRegister));
  authTabs.hidden = isRecovery;
  nameFields.hidden = !isRegister;
  firstNameInput.required = isRegister;
  lastNameInput.required = isRegister;
  emailField.hidden = isRecovery;
  emailInput.required = !isRecovery;
  confirmField.hidden = !(isRegister || isRecovery);
  confirmInput.required = isRegister || isRecovery;
  forgotButton.hidden = mode !== "login";
  passwordInput.autocomplete = mode === "login" ? "current-password" : "new-password";
  passwordLabel.textContent = isRecovery ? "Nouveau mot de passe" : "Mot de passe";
  authTitle.textContent = isRecovery ? "Choisis un nouveau mot de passe." : "Retrouve ta progression.";
  authSubmit.firstChild.textContent = isRecovery ? "Enregistrer le mot de passe " : isRegister ? "Créer mon compte " : "Me connecter ";
  authIntro.textContent = isRecovery
    ? "Saisis le nouveau mot de passe de ton compte."
    : isRegister
      ? "Crée ton compte pour sauvegarder ton profil et tes séances."
      : "Connecte-toi pour retrouver ton profil et tes séances, où que tu sois.";
  showAuthError("");
  showAuthInfo("");
}

function friendlyAuthError(error) {
  const message = (error && error.message ? error.message : "").toLowerCase();
  if (message.includes("invalid login")) return "E-mail ou mot de passe incorrect.";
  if (message.includes("email not confirmed")) return "Confirme d’abord ton adresse e-mail : un message de confirmation t’a été envoyé.";
  if (message.includes("already registered")) return "Un compte existe déjà avec cet e-mail. Connecte-toi.";
  if (message.includes("rate limit") || (error && error.status === 429)) return "Trop de tentatives. Patiente quelques minutes avant de réessayer.";
  if (message.includes("password")) return "Ce mot de passe n’est pas accepté (6 caractères minimum).";
  if (message.includes("failed to fetch") || message.includes("network")) return "Connexion impossible. Vérifie ta connexion Internet.";
  return "Une erreur est survenue. Réessaie dans un instant.";
}

const appUrl = () => location.href.split("#")[0];

// Nettoie un prénom/nom : espaces superflus retirés, première lettre de chaque mot en majuscule.
const cleanName = (value) => value.trim().replace(/\s+/g, " ")
  .replace(/(^|[\s'’-])(\p{L})/gu, (match, sep, letter) => sep + letter.toLocaleUpperCase("fr-FR"));
const validName = (value) => /^[\p{L}][\p{L}\s'’.-]{0,48}[\p{L}.]$|^\p{L}$/u.test(value);

function enterApp(user) {
  if (currentUser && currentUser.id === user.id) return;
  currentUser = user;
  const meta = user.user_metadata || {};
  const fullName = [meta.first_name, meta.last_name].filter(Boolean).join(" ") || (user.email || "Moi").split("@")[0];
  const initials = meta.first_name && meta.last_name
    ? meta.first_name.charAt(0) + meta.last_name.charAt(0)
    : fullName.charAt(0);
  userNameLabel.textContent = fullName;
  userAvatar.textContent = initials.toUpperCase();
  userMenu.hidden = false;
  loginButton.hidden = true;
  authForm.reset();
  hideAuth();
  loadUserData();
}

function leaveApp() {
  currentUser = null;
  userMenu.hidden = true;
  loginButton.hidden = false;
  clearUserData();
  setAuthMode("login");
  hideAuth();
}

function showRecovery() {
  openAuth("recovery");
}

function handleAuthChange(event, session) {
  if (event === "PASSWORD_RECOVERY") recoveryPending = true;
  if (recoveryPending && session) { showRecovery(); return; }
  if (session && session.user) {
    enterApp(session.user);
  } else if (event === "SIGNED_OUT" || event === "INITIAL_SESSION") {
    leaveApp();
  }
}

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showAuthError("");
  showAuthInfo("");
  if (!sb) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const firstName = cleanName(firstNameInput.value);
  const lastName = cleanName(lastNameInput.value);

  if (authMode === "register" && (!validName(firstName) || !validName(lastName))) {
    showAuthError("Saisis ton prénom et ton nom (lettres uniquement, 50 caractères maximum).");
    (validName(firstName) ? lastNameInput : firstNameInput).focus();
    return;
  }
  if (authMode !== "recovery" && !emailInput.checkValidity()) {
    showAuthError("Saisis une adresse e-mail valide.");
    return;
  }
  if (password.length < 6) {
    showAuthError("Le mot de passe doit contenir au moins 6 caractères.");
    return;
  }
  if (authMode !== "login" && password !== confirmInput.value) {
    showAuthError("Les deux mots de passe ne correspondent pas.");
    return;
  }

  authSubmit.disabled = true;
  try {
    if (authMode === "register") {
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: appUrl(), data: { first_name: firstName, last_name: lastName } }
      });
      if (error) { showAuthError(friendlyAuthError(error)); return; }
      if (!data.session) {
        setAuthMode("login");
        showAuthInfo("Compte créé ! Vérifie ta boîte mail pour confirmer ton adresse, puis connecte-toi.");
      }
    } else if (authMode === "recovery") {
      const { error } = await sb.auth.updateUser({ password });
      if (error) { showAuthError(friendlyAuthError(error)); return; }
      recoveryPending = false;
      history.replaceState(null, "", appUrl());
      const { data } = await sb.auth.getSession();
      if (data.session) enterApp(data.session.user); else leaveApp();
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) showAuthError(friendlyAuthError(error));
      // En cas de succès, onAuthStateChange ouvre l’application.
    }
  } catch (error) {
    showAuthError(friendlyAuthError(error));
  } finally {
    authSubmit.disabled = false;
  }
});

forgotButton.addEventListener("click", async () => {
  showAuthError("");
  showAuthInfo("");
  if (!sb) return;
  if (!emailInput.checkValidity() || !emailInput.value.trim()) {
    showAuthError("Saisis d’abord ton adresse e-mail ci-dessus, puis clique sur « Mot de passe oublié ».");
    emailInput.focus();
    return;
  }
  const { error } = await sb.auth.resetPasswordForEmail(emailInput.value.trim(), { redirectTo: appUrl() });
  if (error) showAuthError(friendlyAuthError(error));
  else showAuthInfo("Si un compte existe avec cet e-mail, un lien de réinitialisation vient d’être envoyé.");
});

tabLogin.addEventListener("click", () => setAuthMode("login"));
tabRegister.addEventListener("click", () => setAuthMode("register"));

logoutButton.addEventListener("click", async () => {
  if (!sb) return;
  const { error } = await sb.auth.signOut();
  if (error) notify("La déconnexion a échoué. Réessaie.");
  window.scrollTo({ top: 0 });
});

// Démarrage : Supabase restaure automatiquement la session enregistrée.
loginButton.addEventListener("click", () => openAuth("login"));
authClose.addEventListener("click", closeAuth);
authOverlay.addEventListener("click", (event) => { if (event.target === authOverlay) closeAuth(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeAuth(); });

if (!sb) {
  loginButton.hidden = false;
  authSubmit.disabled = true;
  forgotButton.hidden = true;
} else {
  // Le traitement est différé pour éviter d’appeler l’API Supabase depuis le callback lui-même.
  sb.auth.onAuthStateChange((event, session) => {
    setTimeout(() => handleAuthChange(event, session), 0);
  });
}
