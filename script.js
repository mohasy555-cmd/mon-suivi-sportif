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
  profileResult.hidden = false;

  weeklyPlan.replaceChildren();
  plans[goal].forEach((entry) => weeklyPlan.append(makePlanCard(...entry)));
  renderExerciseLibrary(goal);
  document.querySelector("#planning-section").scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    localStorage.setItem("sportProfile", JSON.stringify({ age, weight, height, bodyType, goal }));
  } catch {
    // Le site continue de fonctionner si le stockage local est indisponible.
  }
});

// Permet d'effacer les informations du profil sauvegardées sur cet appareil.
if (deleteProfileButton) {
  deleteProfileButton.addEventListener("click", () => {
    if (!window.confirm("Supprimer le profil enregistré (âge, poids, taille, morphologie et objectif) ainsi que le planning affiché ?")) return;
    try {
      localStorage.removeItem("sportProfile");
    } catch {
      // Le formulaire peut quand même être réinitialisé si le stockage est bloqué.
    }
    profileForm.reset();
    profileResult.replaceChildren();
    profileResult.hidden = true;
    weeklyPlan.replaceChildren();
    weeklyPlan.innerHTML = '<div class="empty-state"><span class="empty-icon">＋</span><strong>Ton planning apparaîtra ici</strong><p>Complète ton profil et choisis « Générer mon planning » pour afficher ta semaine type.</p><a href="#profile-title">Renseigner mon profil ↗</a></div>';
    if (exerciseList) exerciseList.innerHTML = '<div class="empty-state">Génère ton planning pour afficher les exercices adaptés à ton objectif.</div>';
    document.querySelector("#profile-title").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Restaure le profil sur cet appareil, si le navigateur autorise le stockage local.
try {
  const savedProfile = JSON.parse(localStorage.getItem("sportProfile") || "null");
  if (savedProfile && typeof savedProfile === "object") {
    for (const [id, key] of [["age", "age"], ["weight", "weight"], ["height", "height"], ["body-type", "bodyType"], ["goal", "goal"]]) {
      const input = document.getElementById(id);
      if (input && savedProfile[key] !== undefined) input.value = String(savedProfile[key]);
    }
    if (profileForm.checkValidity()) {
      profileForm.requestSubmit();
    }
  }
} catch {
  // Ignore les données locales invalides.
}

let workouts;
try {
  workouts = JSON.parse(localStorage.getItem("workouts") || "[]");
  if (!Array.isArray(workouts)) workouts = [];
} catch {
  workouts = [];
}

function saveWorkouts() {
  try {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  } catch {
    // L'historique reste visible pendant cette session même si le stockage échoue.
  }
}

function displayWorkouts() {
  workoutList.replaceChildren();

  if (workouts.length === 0) {
    const message = document.createElement("li");
    message.textContent = "Aucune séance enregistrée pour le moment.";
    workoutList.append(message);
    return;
  }

  workouts.forEach((workout, index) => {
    const item = document.createElement("li");
    item.className = "workout-item";
    const sport = typeof workout.sport === "string" ? workout.sport : "Séance à supprimer";
    const duration = Number(workout.duration);
    const unit = ["s", "min", "h"].includes(workout.unit) ? workout.unit : "min";
    const date = typeof workout.date === "string" ? `${workout.date} — ` : "";
    const details = document.createElement("span");
    details.textContent = `${date}${sport} — ${Number.isFinite(duration) ? duration : "?"} ${unit}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Supprimer";
    deleteButton.setAttribute("aria-label", `Supprimer la séance : ${sport}`);
    deleteButton.addEventListener("click", () => {
      if (!window.confirm(`Supprimer définitivement la séance « ${sport} » ?`)) return;
      workouts.splice(index, 1);
      saveWorkouts();
      displayWorkouts();
    });

    item.append(details, deleteButton);
    workoutList.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const sport = sportInput.value.trim();
  const duration = Number(durationInput.value);
  const unit = durationUnitInput.value;

  if (!sport || !Number.isFinite(duration) || duration < 1 ||
      !["s", "min", "h"].includes(unit)) return;

  workouts.push({ sport, duration, unit, date: new Date().toLocaleDateString("fr-FR") });
  saveWorkouts();
  form.reset();
  displayWorkouts();
});

displayWorkouts();
