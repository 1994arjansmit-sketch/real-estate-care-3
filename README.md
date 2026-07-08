[README.md](https://github.com/user-attachments/files/29797719/README.md)
# RealEstateCare - Prototype

Een mobiele webapplicatie (SPA) voor inspecteurs van RealEstateCare, gebouwd met Vue 3, Vuetify 3, vue-router en Pinia.

## Installatie en gebruik

```bash
npm install
npm run dev
```

Demo-inloggegevens:
- Gebruikersnaam: `arjan` of `lotte`
- Wachtwoord: `rec2025`
- 2FA-verificatiecode: `123456`

Productie-build:
```bash
npm run build
```

## Projectstructuur

```
src/
  components/       Herbruikbare componenten (AppHeader, AppTabBar, DashboardCard, InspectionList, InspectionDetail)
  models/           Datamodellen (Inspection, inspectionDetailFields)
  router/           Vue Router configuratie met navigatiebewaker
  services/         InspectionService (async API-calls via fetch)
  stores/           Pinia stores (authStore, inspectionStore)
  views/            Pagina-componenten (Login, Dashboard, Assigned, Completed, Knowledge, Settings)
```

## Frameworkkeuze

Gekozen framework: **Vue 3** (applicatielaag) in combinatie met **Vuetify 3** (touch UI-bibliotheek).

### Ecosysteem

Vue 3 beschikt over een uitgebreid ecosysteem met officieel ondersteunde bibliotheken: vue-router voor routing, Pinia voor state management en Vite als build-tool. Vuetify 3 levert een complete set Material Design-componenten die touch-interactie op iOS en Android ondersteunen. De community is groot en actief, met uitgebreide documentatie en regelmatige updates.

### Schaalbaarheid

De componentgebaseerde architectuur van Vue 3 maakt het eenvoudig om nieuwe schermen en functionaliteit toe te voegen zonder bestaande code te hoeven aanpassen. Pinia-stores kunnen per domein worden uitgesplitst (auth, inspecties, instellingen) waardoor de datalaag meeschaalt met de applicatie. Lazy-loaded routes via dynamische `import()` zorgen ervoor dat de initiële laadtijd beperkt blijft, ook als de applicatie groeit.

### Onderhoudbaarheid

Vue 3 stimuleert een strikte scheiding van verantwoordelijkheden: business logic in stores en services, presentatielogica in componenten. De officiële Vue Style Guide schrijft naamconventies voor (multi-word componentnamen, expliciete `emits`-declaraties, typed props) die in dit project zijn opgevolgd. Dit maakt de code leesbaar en consistent voor toekomstige ontwikkelaars.

### Performance

Vite biedt razendsnel HMR (Hot Module Replacement) tijdens ontwikkeling en produceert geoptimaliseerde, gesplitste bundles voor productie. Vue 3's reactief systeem is herschreven ten opzichte van Vue 2 en is significant sneller door gebruik van JavaScript Proxy in plaats van Object.defineProperty. Vuetify-componenten worden tree-shaken zodat alleen gebruikte componenten in de build terechtkomen.

### Veiligheid

Vue 3 escapet alle template-uitvoer automatisch, waardoor XSS via gebruikersinvoer wordt voorkomen. De navigatiebewaker in vue-router blokkeert toegang tot beveiligde routes zonder geldige sessie. Authenticatiedata wordt opgeslagen in `localStorage` conform de technische beschrijving van de case; in productie verdient een `httpOnly`-cookie de voorkeur. Externe links worden geopend met `noopener,noreferrer` om tab-napping te voorkomen.

## Proces

Het prototype is iteratief opgebouwd in drie fasen:
1. **Opdracht 1 (Tooling):** Vue 3 + Vuetify 3 projectopzet, branding, header, tabbar en dashboardkaarten.
2. **Opdracht 2 (Datamodellen):** JSON-structuur conform de case, datamodel, service, lijst- en detailcomponent.
3. **Eindopdracht:** Vue Router, Pinia state management, loginscherm met 2FA-simulatie, vier volwaardige views, en de verantwoording die je nu leest.

## Verantwoording

### Security (OWASP)

- **Authenticatie:** het loginscherm simuleert two-factor authenticatie. In productie zou dit vervangen worden door een echte authenticatiedienst (OAuth 2.0 / OpenID Connect).
- **Sessie-opslag:** de authenticatiestatus wordt opgeslagen in `localStorage`. Dit is conform de technische beschrijving in de case ("In de demo-applicatie moet dit gesimuleerd worden met de local storage"). In productie verdient een `httpOnly`-cookie de voorkeur omdat deze niet toegankelijk is via JavaScript (bescherming tegen XSS).
- **Navigatiebewaker:** elke beveiligde route wordt bewaakt door een `router.beforeEach`-guard die verifieert of de gebruiker ingelogd is voordat de route geladen wordt.
- **Invoervalidatie:** formuliervelden op het loginscherm werken met `v-model` en worden nooit direct als HTML gerenderd, wat XSS via gebruikersinvoer voorkomt.
- **Externe links:** links naar documenten in de Kennisbase worden geopend met `noopener,noreferrer` om tab-napping te voorkomen.

### Usability (10 heuristieken van Jacob Nielsen)

1. **Zichtbaarheid van de systeemstatus:** laadspinners bij het ophalen van data, foutmeldingen bij mislukte API-calls, actieve tab gemarkeerd in de navigatiebalk.
2. **Overeenkomst met de echte wereld:** Nederlandse taal door de hele applicatie, herkenbare icoontjes (klembord voor inspecties, tandwiel voor instellingen).
3. **Gebruikerscontrole en vrijheid:** logo brengt altijd terug naar het dashboard, sluitknop in het detailblok, "Terug naar inloggen"-knop bij de 2FA-stap.
4. **Consistentie en standaarden:** Vuetify Material Design-componenten voor consistente interactiepatronen; vaste kleur- en typografiestandaarden via het Vuetify-thema.
5. **Foutpreventie:** lege formuliervelden worden niet verstuurd (disabled-logica), API-fouten worden opgevangen in de store met een leesbare foutmelding.
6. **Herkennen boven herinneren:** actieve navigatieitems zijn visueel gemarkeerd; rapportagetypen worden weergegeven als leesbare Nederlandse labels, niet als codes.
7. **Flexibiliteit en efficiëntie:** het detailblok klapt open op dezelfde pagina zodat de inspecteur niet steeds van scherm hoeft te wisselen.
8. **Esthetisch en minimalistisch ontwerp:** per scherm alleen de informatie die relevant is voor de taak; statistieken op het dashboard geven directe context.
9. **Help bij het herkennen en herstellen van fouten:** foutmeldingen zijn in duidelijke taal geformuleerd en bevatten geen technische codes.
10. **Hulp en documentatie:** de Kennisbase-sectie bevat normbladen en testprocedures die de inspecteur op locatie kan raadplegen.

### Accessibility (WCAG 2.1, niveau A)

**Wat is toegepast:**
- Semantische HTML-elementen via Vuetify-componenten (`<button>`, `<nav>`, `<main>`).
- `aria-label` op het logo-element ("Terug naar dashboard") omdat het geen zichtbare tekstinhoud heeft.
- `role="button"` en `tabindex="0"` op het klikbare logo, zodat het ook met toetsenbord bereikbaar is.
- Kleurcontrast: primaire tekst `#141B1F` op `#F5F7FA` achtergrond voldoet aan 4.5:1 contrastverhouding.
- Accentkleur `#00AAA2` op witte achtergrond voldoet aan 3:1 contrastverhouding voor grote tekst en UI-elementen (niveau A).
- Focus-indicator op het logo-element via `focus-visible`.

**Wat nog ontbreekt (niveau AA en hoger):**
- Formuliervelden op het loginscherm hebben geen expliciete `<label>`-koppeling via `for`/`id`; Vuetify regelt dit intern maar dit is niet volledig gegarandeerd voor alle schermlezers.
- Kleurcontrast van subtekst (`#8A9BAA` op donkere achtergrond) is niet getoetst op niveau AA (4.5:1).
- Skip-navigatie-link ontbreekt.
- Geen ARIA live-regions voor dynamische meldingen (laadstatus, foutmeldingen).

### Style guides en best practices Vue 3

- Componentnamen zijn multi-word (`AppHeader`, `DashboardCard`) conform de officiële Vue Style Guide.
- Props worden gedeclareerd met type-validatie.
- Emits zijn expliciet gedeclareerd via de `emits`-optie.
- Data die niet muteert staat in `computed`, niet in `data`.
- Business logic zit in stores en services, niet in componenten (separation of concerns).
- Lazy-loaded routes via dynamische `import()` voor betere initiële laadtijd.

## Bekende beperkingen

- **Formulieren voor toegewezen rapportages:** de case beschrijft een stap-voor-stap invulworkflow per rapportagetype. In dit prototype worden toegewezen rapportages weergegeven met hun detail, maar het invullen en opslaan van nieuwe rapportages is niet geïmplementeerd. Dit valt buiten de scope van dit prototype.
- **Offline caching:** de case noemt caching bij geen netwerk. Dit is niet geïmplementeerd. In productie zou een Service Worker (PWA) hiervoor ingezet worden.
- **Foto-upload:** het toevoegen van foto's als bewijsmateriaal is beschreven in de case maar niet gerealiseerd in dit prototype.
- **Dark mode:** de toggle in Instellingen is aanwezig maar schakelt de Vuetify-thema nog niet daadwerkelijk om. Dit vereist koppeling aan `useTheme()` van Vuetify.
