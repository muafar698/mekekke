import { useState, useCallback } from "react";

const QS = [
  {b:"Domstolens beslut var",a:"och lämnade inget utrymme för vidare överklaganden.",o:["oåterkalleligt","orubbligt","definitiv","bindande"],c:"oåterkalleligt",e:"Oåterkalleligt (irrevocable) innebär att beslutet inte kan tas tillbaka — perfekt i juridisk kontext. Orubbligt handlar om fast karaktär. Definitiv är fel ordform. Bindande avser skyldigheten att följa, inte att det inte kan överklagas."},
  {b:"Forskarens hypotes om klimatets påverkan visade sig vara",a:"– ingenting i materialet stödde antagandet.",o:["grundlös","irrelevant","obevisad","spekulativ"],c:"grundlös",e:"Grundlös anger att hypotesen saknar varje underlag, vilket stärks av att 'ingenting' stödde den. Irrelevant handlar om relevans. Obevisad antyder att bevis kanske finns men saknas nu. Spekulativ innebär gissningar men utesluter inte viss grund."},
  {b:"Styrelseledamöternas",a:"inför bolagsstämman väckte stor uppmärksamhet i medierna.",o:["avsägelse","avgång","demission","abdikation"],c:"avsägelse",e:"Avsägelse är den korrekta termen för när ledamöter formellt avsäger sig uppdrag. Avgång är mer informellt och vanligare för politiker. Demission syftar på en regerings avgång i sin helhet. Abdikation avser en monarks avsägelse av tronen."},
  {b:"Den nye ledarens retorik var genomgående",a:"– han lovade allt till alla utan att precisera hur det skulle finansieras.",o:["populistisk","demagogisk","opportunistisk","polemisk"],c:"populistisk",e:"Populistisk beskriver retorik som lovar allt utan substans. Demagogisk handlar om att manipulera med känslor och rädslor. Opportunistisk syftar på att handla utifrån lämpliga tillfällen. Polemisk innebär aggressiv argumentation mot en motpart."},
  {b:"Arkeologernas fynd var",a:"– det handlade om en civilisation som historiker inte kände till.",o:["banbrytande","remarkabelt","sensationellt","epokgörande"],c:"epokgörande",e:"Epokgörande innebär att något markerar en ny era i förståelsen — rätt för ett fynd som avslöjar en okänd civilisation. Banbrytande handlar om att bana väg inom ett fält. Remarkabelt och sensationellt är mer deskriptiva av reaktionen snarare än fyndets historiska tyngd."},
  {b:"Hennes kritik av kollegans arbete var korrekt i sak, men formuleringarna var onödigt",a:"och skapade konflikt i gruppen.",o:["sårande","hård","skarp","elak"],c:"sårande",e:"Sårande betonar den emotionella effekten på mottagaren — passar 'skapade konflikt'. Hård antyder stränghet utan emotionell skada. Skarp kan vara positivt (skarp analys). Elak antyder illvillig avsikt, men kritiken var korrekt i sak."},
  {b:"Lagstiftarnas oförmåga att nå konsensus ledde till ett politiskt",a:"som förlamade hela den parlamentariska processen.",o:["dödläge","stillestånd","vakuum","kaos"],c:"dödläge",e:"Dödläge är den exakta politiska termen för låsta positioner som hindrar framsteg — passar 'förlamade processen'. Stillestånd innebär att aktiviteten upphör. Vakuum syftar på frånvaro av makt. Kaos antyder oordning snarare än låsning."},
  {b:"Den ekonomiska analysen var",a:"och tog hänsyn till samtliga faktorer som påverkar marknadens funktionssätt.",o:["heltäckande","uttömmande","komprehensiv","grundlig"],c:"uttömmande",e:"Uttömmande innebär att man gått igenom varje aspekt utan att lämna något obehandlat — stöds av 'samtliga faktorer'. Heltäckande betonar bredd. Komprehensiv används mer om system. Grundlig betonar noggrannhet, inte fullständighet."},
  {b:"Hans påstående om ekonomins återhämtning byggde på",a:"data och kunde inte anses vetenskapligt tillförlitligt.",o:["anekdotiska","selektiva","tendentiösa","vilseledande"],c:"anekdotiska",e:"Anekdotiska data bygger på enstaka berättelser snarare än systematisk insamling — förklarar varför det inte är vetenskapligt. Selektiva handlar om att välja gynnsamt urval. Tendentiösa antyder vinkling. Vilseledande är ett värdeomdöme om avsikten."},
  {b:"Filosofen argumenterade att verklighetens",a:"natur gör det omöjligt att med säkerhet skilja perception från verklighet.",o:["subjektiva","immateriella","fenomenologiska","ontologiska"],c:"subjektiva",e:"Subjektiv natur innebär att verkligheten beror på percipienten — förklarar direkt varför perception och verklighet inte kan separeras. Immateriell handlar om att sakna fysisk form. Fenomenologisk är en metodterm. Ontologisk handlar om varats natur generellt."},
  {b:"Reformerna genomfördes på ett",a:"sätt som tog hänsyn till alla berörda parters intressen och minimerade negativa konsekvenser.",o:["pragmatiskt","inkluderande","konsensusinriktat","hänsynsfullt"],c:"pragmatiskt",e:"Pragmatiskt innebär fokus på vad som faktiskt fungerar med praktiska hänsyn — stöds av 'minimerade negativa konsekvenser'. Inkluderande betonar deltagandet. Konsensusinriktat handlar om att nå enighet, inte metoden. Hänsynsfullt saknar reformers systematiska dimension."},
  {b:"Vetenskapliga rön som",a:"rådande paradigm brukar mötas av initialt motstånd inom forskarsamhället.",o:["utmanar","ifrågasätter","kullkastar","destabiliserar"],c:"kullkastar",e:"Kullkastar innebär att man helt omvälver ett paradigm — starkaste åtgärden och möter störst motstånd. Utmanar testar gränserna men vinner inte. Ifrågasätter antyder tvivel. Destabiliserar skapar instabilitet men ersätter inte paradigmet."},
  {b:"Journalistens avslöjande av korruptionen var ett",a:"exempel på hur oberoende press fyller en viktig demokratisk funktion.",o:["talande","slående","flagrant","illustrativt"],c:"illustrativt",e:"Illustrativt innebär att något tjänar som ett tydligt pedagogiskt exempel på en princip. Talande är mer vardagligt. Slående betonar det imponerande intrycket. Flagrant används nästan uteslutande om uppenbara överträdelser."},
  {b:"Läkarens diagnos var",a:"; patienten led av ett tillstånd som krävde omedelbar behandling.",o:["allvarlig","kritisk","akut","alarmerande"],c:"akut",e:"Akut innebär att tillståndet kräver omedelbar åtgärd — direkt kopplat till 'krävde omedelbar behandling'. Allvarlig anger svårighetsgrad men inte tidskrav. Kritisk innebär nära livshotande. Alarmerande beskriver reaktionen snarare än medicinsk status."},
  {b:"Rapporten beskrev landets ekonomiska situation som",a:"och varnade för att ytterligare nedskärningar kunde få katastrofala följder.",o:["prekär","instabil","sårbar","kritisk"],c:"prekär",e:"Prekär innebär en ytterst osäker och bräcklig situation där en liten förändring kan orsaka kollaps. Instabil handlar om snabb förändring. Sårbar innebär att något kan skadas men är inte nära kollaps. Kritisk saknar prekärs specifika bräcklighetsnyans."},
  {b:"Professorns föreläsning om kognitiv dissonans var",a:"– studenterna förstod äntligen kopplingen mellan teori och vardagliga erfarenheter.",o:["upplysande","klargörande","belysande","didaktisk"],c:"belysande",e:"Belysande betonar att något kastar ljus och skapar förståelse — stöds av 'förstod äntligen kopplingen'. Upplysande har filosofiska konnotationer. Klargörande är mer administrativt. Didaktisk är ett tekniskt pedagogikbegrepp om metod, inte effekt."},
  {b:"Hans inställning till kritik var anmärkningsvärt",a:"– han välkomnade alltid motargument och förändrade gärna sin uppfattning om skälen var goda.",o:["receptiv","ödmjuk","flexibel","öppensinnad"],c:"receptiv",e:"Receptiv innebär att man aktivt tar emot och bearbetar input — 'välkomnade motargument'. Ödmjuk handlar om att inte överskatta sig. Flexibel betonar anpassning men inte specifikt till argument. Öppensinnad är mer vardagligt."},
  {b:"Litteraturkritikern menade att verkets",a:"struktur speglade den mänskliga erfarenhetens icke-linjära karaktär.",o:["fragmentariska","diskontinuerliga","eklektiska","associativa"],c:"fragmentariska",e:"Fragmentarisk struktur innebär att helheten består av brottstycken utan tydlig kontinuitet — speglar livets icke-linjära karaktär. Diskontinuerlig handlar om avbrott men inte fragment. Eklektisk handlar om att blanda stilar. Associativ syftar på tankekedjeliknande kopplingar."},
  {b:"Statsministern argumenterade att skatteökningen var",a:"med tanke på landets ekonomiska situation och behovet av välfärdsreformer.",o:["motiverad","befogad","nödvändig","rimlig"],c:"befogad",e:"Befogad innebär att det finns tillräckliga skäl som rättfärdigar åtgärden — formell-juridisk klang som passar politisk argumentation. Motiverad är mer psykologiskt. Nödvändig är starkare och innebär att alternativ saknas. Rimlig är svagare."},
  {b:"Diskussionen om rättssystemets brister fördes på ett",a:"sätt som undvek emotionella utspel och fokuserade på strukturella problem.",o:["sakligt","analytiskt","nyanserat","distanserat"],c:"sakligt",e:"Sakligt innebär att man håller sig till fakta och undviker känslor — exakt 'undvek emotionella utspel'. Analytiskt betonar djupgranskning. Nyanserat handlar om komplexitet. Distanserat antyder problematisk känslomässig frånkoppling."},
  {b:"Konstnärens verk var genomsyrat av en",a:"melankoli som reflekterade samhällets kollektiva sorg efter kriget.",o:["genomträngande","diffus","subtil","djupliggande"],c:"subtil",e:"Subtil melankoli är underliggande och kräver tolkning — kontrasterar mot ett genomsyrande verk. Genomträngande är för stark. Diffus antyder vag och odefinierad. Djupliggande passar mer om källan till melankolins karaktär."},
  {b:"Rapporten konstaterade att myndighetens hantering av krisen var",a:"och att flera av de beslut som fattades saknade rättsligt stöd.",o:["bristfällig","inkompetent","otillräcklig","misslyckad"],c:"bristfällig",e:"Bristfällig är ett precist administrativt-juridiskt ord för konkreta brister — passar 'saknade rättsligt stöd'. Inkompetent riktar sig mot personerna. Otillräcklig antyder för liten insats. Misslyckad är ett omdöme om slutresultatet."},
  {b:"Utredningens slutsatser var",a:"och ifrågasatte de antaganden som legat till grund för hela projektet.",o:["kontroversiella","kontraintuitiva","provocerande","radikala"],c:"kontraintuitiva",e:"Kontraintuitiva slutsatser går mot det vi spontant förväntar oss — 'ifrågasätter antaganden' man tar för givna. Kontroversiella skapar debatt. Provocerande betonar reaktionen. Radikala vill ha grundläggande förändring, ifrågasätter inte antaganden."},
  {b:"Debattören använde",a:"argument som skenbart verkade logiska men i grunden var felaktiga.",o:["sofistikerade","sofistiska","vilseledande","retoriska"],c:"sofistiska",e:"Sofistiska argument verkar logiska men bygger på felslut — precis vad meningen beskriver. Sofistikerade innebär avancerade och förfinade, vilket är positivt. Vilseledande betonar avsikten att lura. Retoriska argument är inte nödvändigtvis felaktiga."},
  {b:"Hennes förmåga att",a:"komplexa vetenskapliga teorier för en bredare publik var imponerande.",o:["popularisera","förmedla","förenkla","kommunicera"],c:"popularisera",e:"Popularisera innebär specifikt att göra avancerat material tillgängligt för en icke-specialistpublik. Förmedla är neutralt. Förenkla kan ha negativa konnotationer om att ta bort nyanser. Kommunicera är för brett och säger inget om publiken."},
  {b:"Den politiska situationen var så",a:"att varje uttalande riskerade att tolkas som en partsinlaga.",o:["känslig","laddad","polariserad","spänd"],c:"laddad",e:"Laddad innebär att situationen är fylld med underliggande spänningar — förklarar tolkningsrisken. Känslig är mer allmänt. Polariserad beskriver en uppdelning i läger. Spänd antyder öppen konfliktyta snarare än underliggande laddning."},
  {b:"Texten utgjorde ett",a:"mot tidens rådande moraluppfattning och ifrågasatte institutionernas legitimitet.",o:["uppror","angrepp","frontalangrepp","manifest"],c:"manifest",e:"Manifest är en formell skriftlig förklaring av principer som utmanar det rådande — passar text som systematiskt ifrågasätter institutioner. Uppror antyder fysisk revolt. Angrepp saknar textens programmatiska karaktär. Frontalangrepp är militärt."},
  {b:"Bolagets finansiella ställning var",a:", vilket tvingade styrelsen att omedelbart kalla till extra bolagsstämma.",o:["ohållbar","prekär","katastrofal","illikvid"],c:"illikvid",e:"Illikvid är den exakta ekonomisk-juridiska termen för ett bolag som inte kan möta kortfristiga betalningsförpliktelser. Ohållbar är för allmänt. Prekär handlar om bräcklighet, inte kassaflöde. Katastrofal är ett värdeomdöme."},
  {b:"Forskarens metodologiska val utsattes för",a:"granskning av kollegor, vilket resulterade i en reviderad version av studien.",o:["kritisk","ingående","skeptisk","rigorös"],c:"rigorös",e:"Rigorös granskning kontrollerar mot strikta vetenskapliga standarder — leder till faktiska revisioner. Kritisk betonar att man hittar brister. Ingående är nära men saknar normativ dimension. Skeptisk handlar om grundinställningen."},
  {b:"Det var en",a:"sammansättning av faktorer som bidrog till finanskrisens utbrott – ingen enskild orsak var avgörande.",o:["mångfacetterad","komplex","diffus","konvergent"],c:"konvergent",e:"Konvergent innebär att separata faktorer rörde sig mot samma punkt och förstärkte varandra — förklarar varför ingen enskild orsak var avgörande. Mångfacetterad betonar mångfald. Komplex är för allmänt. Diffus antyder utspridda och otydliga faktorer."},
  {b:"Myndighetens beslut att hemligstämpla rapporten var",a:"med grundlagens krav på offentlighetsprincipen.",o:["oförenligt","motstridigt","inkonsekvent","stridande"],c:"oförenligt",e:"Oförenligt är den juridisk-formella termen för att två saker inte kan existera parallellt — perfekt för konflikt med grundlagen. Motstridigt antyder intern logisk konflikt. Inkonsekvent handlar om bristande konsekvens över tid. Stridande är mer vardagligt."},
  {b:"I sin essä argumenterade hon",a:"att det moderna samhällets syn på lycka är djupt problematisk.",o:["övertygande","träffsäkert","stringent","övertygat"],c:"stringent",e:"Stringent argumentation innebär att varje led hänger logiskt ihop utan luckor — ett precist akademiskt begrepp. Övertygande handlar om effekten på läsaren. Träffsäkert betonar att man hittar rätt. Övertygat är ett adverbium om talarens inställning."},
  {b:"Det geopolitiska läget skapade en",a:"situation där nationella intressen och humanitära hänsyn direkt motverkade varandra.",o:["paradoxal","dilemmatisk","aporisk","kontradiktorisk"],c:"dilemmatisk",e:"Dilemmatisk situation kräver val mellan alternativ som båda medför negativa konsekvenser. Paradoxal handlar om skenbara motsägelser som kan förenas. Aporisk är filosofisk term för att köra fast utan lösning. Kontradiktorisk innebär logisk motsägelse."},
  {b:"Läkemedelskompaniet utsattes för",a:"anklagelser om att ha dolt biverkningsdata för myndigheterna.",o:["allvarliga","graverande","besvärande","tyngande"],c:"graverande",e:"Graverande anklagelser talar starkt för skuld — ett juridiskt-formellt ord. Allvarliga är för allmänt. Besvärande antyder problem men pekar inte mot skuld. Tyngande handlar om psykologisk börda, inte juridisk."},
  {b:"Filosofen beskrev döden som det",a:"okända – det enda vi vet om den är att vi inget vet.",o:["absoluta","yttersta","definitiva","ultimata"],c:"yttersta",e:"Det yttersta okända innebär gränsen bortom vilken ingen kunskap är möjlig — med existentiell och filosofisk klang på svenska. Absoluta handlar om totalitet. Definitiva passar dåligt semantiskt. Ultimata är anglicism-klingande och saknar djupklangen."},
  {b:"Studenternas",a:"inför examen var fullt förståelig med tanke på ämnets komplexitet.",o:["nervositet","ängslan","tvekan","apprehension"],c:"apprehension",e:"Apprehension är ett precist psykologiskt begrepp för oro inför osäker utgång — med akademisk klang. Nervositet är mer vardagligt. Ängslan antyder djupare generell ångest. Tvekan handlar om beslutsosäkerhet, inte situationsoro."},
  {b:"Organisationens interna konflikter hade nått en punkt där de var",a:"synliga för utomstående och riskerade att skada varumärket.",o:["pinsamt","påtagligt","tydligt","uppenbara"],c:"påtagligt",e:"Påtagligt innebär att något är märkbart och konkret upplevbart — en stark grad som motiverar varumärkesrisken. Pinsamt är ett värdeomdöme. Tydligt är mer kognitivt. Uppenbara stämmer grammatiskt men är svagare i styrka."},
  {b:"Avtalet betraktades av juridiska experter som",a:"från ett internationell-rättsligt perspektiv.",o:["problematiskt","tvivelaktigt","kontroversiellt","anmärkningsvärt"],c:"tvivelaktigt",e:"Tvivelaktigt innebär att legitimiteten kan ifrågasättas — passar ett juridiskt perspektiv. Problematiskt är för allmänt. Kontroversiellt betonar att det skapar debatt. Anmärkningsvärt kan vara positivt eller negativt."},
  {b:"Beslutsfattarnas ovilja att agera trots tydliga varningssignaler vittnar om en",a:"inställning till framtida risker.",o:["kortsiktig","negligent","naiv","cynisk"],c:"negligent",e:"Negligent innebär ansvarslös brist på uppmärksamhet trots att man borde ha handlat — passar 'trots tydliga varningssignaler'. Kortsiktig handlar om tidshorisont. Naiv antyder välmening. Cynisk antyder medvetenhet om problemet."},
  {b:"Domstolen fann att kontraktet innehöll",a:"klausuler som ensidigt gynnade en av parterna.",o:["oskäliga","orättvisa","ensidiga","orimliga"],c:"oskäliga",e:"Oskäliga är det exakta juridiska begreppet för kontraktsvillkor som strider mot god sed. Orättvisa är moraliskt laddad utan juridisk precision. Ensidiga är deskriptivt men inte normativt. Orimliga är för allmänt."},
  {b:"Den sociologiska studien avslöjade ett",a:"mönster av diskriminering som genomsyrade hela antagningsprocessen.",o:["systematiskt","strukturellt","djupgående","utbrett"],c:"strukturellt",e:"Strukturellt mönster innebär att diskrimineringen är inbyggd i systemets uppbyggnad — ett precist sociologiskt begrepp. Systematiskt antyder avsiktlig organisation. Djupgående betonar allvarlighetsgraden. Utbrett handlar om spridning, inte karaktär."},
  {b:"Hans sätt att presentera sin forskning var",a:"; han förenade vetenskaplig precision med en förmåga att engagera.",o:["exemplariskt","föredömligt","mästerligt","pedagogiskt"],c:"exemplariskt",e:"Exemplariskt innebär att något är så bra att det tjänar som föredöme — formell och uppskattande ton. Föredömligt är mer vardagligt. Mästerligt betonar konstnärlig behärskning. Pedagogiskt betonar lärande men inte helheten."},
  {b:"Åtgärden kritiserades för att vara",a:"och inte ta itu med de bakomliggande orsakerna till problemet.",o:["symptomatisk","ytlig","palliativ","kosmetisk"],c:"palliativ",e:"Palliativ åtgärd lindrar symptom utan att angripa grundorsaken — precis 'inte ta itu med bakomliggande orsaker'. Kosmetisk betonar att man bara ändrar ytan. Ytlig är för allmänt. Symptomatisk beskriver av symptom, inte åtgärdens otillräcklighet."},
  {b:"De geopolitiska förändringarna hade",a:"konsekvenser för regionens länder, vars ekonomier var starkt beroende av handel med varandra.",o:["vittgående","genomgripande","långtgående","omvälvande"],c:"vittgående",e:"Vittgående konsekvenser sträcker sig brett och påverkar många aspekter. Genomgripande innebär påverkan på djupet. Långtgående betonar tidsaspekten. Omvälvande betonar dramatiken snarare än konsekvensernas räckvidd."},
  {b:"Debatten om AI-reglering har blivit alltmer",a:"i takt med att teknologins kapaciteter expanderar bortom det vi tidigare ansåg möjligt.",o:["brådskande","akut","imperativ","angelägen"],c:"imperativ",e:"Imperativ innebär absolut nödvändigt och inte kan fördröjas — formell-normativ ton för politisk diskurs. Brådskande handlar om tidsbrist. Akut har medicinsk konnotation. Angelägen är mer vardagligt utan absolut nödvändighet."},
  {b:"Hans självkritik efter misstaget var",a:"– han betraktade sig som ensam skyldig för ett kollektivt misslyckande.",o:["oproportionerlig","överdriven","självdestruktiv","irrationell"],c:"oproportionerlig",e:"Oproportionerlig är det precisa begreppet för en reaktion som inte är i proportion till det faktiska ansvaret. Överdriven är nära men vardagligare. Självdestruktiv betonar skadan för personen. Irrationell handlar om logik, inte proportioner."},
  {b:"Hennes arbete med flyktingfrågor bottnade i ett",a:"engagemang för mänsklig värdighet som sträckte sig bortom professionella åtaganden.",o:["genuint","djupt","autentiskt","personligt"],c:"autentiskt",e:"Autentiskt engagemang emanerar från personens innersta värderingar — 'bortom professionella åtaganden' understryker detta. Genuint är nära men vardagligare. Djupt betonar intensiteten. Personligt betonar individuell karaktär men inte äkthet."},
  {b:"Rapporten identifierade ett antal",a:"faktorer som riskerade att underminera genomförandet av reformen.",o:["kritiska","avgörande","försvårande","hämmande"],c:"försvårande",e:"Försvårande faktorer gör genomförandet svårare och ökar risken för misslyckande. Kritiska faktorer är de nödvändiga delarna — inte de som skapar problem. Avgörande har liknande problem. Hämmande bromsar men försvårar inte aktivt."},
  {b:"Det finansiella systemets",a:"natur innebär att en kris i ett land snabbt kan sprida sig till hela den globala ekonomin.",o:["sammanlänkade","integrerade","systemiska","interdependenta"],c:"interdependenta",e:"Interdependent natur innebär ömsesidigt beroende — krisens spridning beror på att varje del påverkar de andra. Sammanlänkade är mer strukturellt. Integrerade innebär sammanvävda men inte ömsesidig dynamisk påverkan. Systemiska syftar på krisers art."},
  {b:"Undersökningen visade att mätresultaten var",a:"av en systematisk experimentell bias som påverkat datainsamlingen.",o:["kontaminerade","snedvridna","påverkade","komprometterade"],c:"komprometterade",e:"Komprometterade innebär att resultatens tillförlitlighet är allvarligt undergrävd — ett starkt akademiskt begrepp. Kontaminerade används om fysisk förorening. Snedvridna betonar riktningsbias. Påverkade är för svagt och neutralt."},
  {b:"Den humanistiska traditionen betonar att kunskap inte kan vara helt",a:"utan alltid är inbäddad i en historisk och kulturell kontext.",o:["objektiv","neutral","värdefri","kontextoberoende"],c:"kontextoberoende",e:"Kontextoberoende är det precisa motsatsbegreppet till 'inbäddad i historisk och kulturell kontext'. Objektiv handlar om frihet från subjektiva bias. Neutral handlar om att inte ta ställning. Värdefri syftar på frihet från värderingar — ett relaterat men distinkt begrepp."},
];

function shuffle(a) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

const LETTERS = ["A", "B", "C", "D"];
const GOLD = "#b8802a";
const GREEN = "#1f6b48";
const GREEN_BG = "#cde8da";
const RED = "#7a2218";
const RED_BG = "#edd4d0";

export default function MEKQuiz() {
  const [qs] = useState(() => shuffle(QS));
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hist, setHist] = useState([]);
  const [done, setDone] = useState(false);
  const [opts] = useState(() => qs.map(q => shuffle(q.o)));

  const q = qs[idx];
  const isCorrect = chosen === q?.c;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const progress = Math.round((idx / qs.length) * 100);

  const handleAnswer = useCallback((opt) => {
    if (answered) return;
    setAnswered(true);
    setChosen(opt);
    const ok = opt === q.c;
    setTotal(t => t + 1);
    setCorrect(c => ok ? c + 1 : c);
    setStreak(s => ok ? s + 1 : 0);
    setHist(h => [...h, ok ? "c" : "w"]);
  }, [answered, q]);

  const handleNext = () => {
    if (idx + 1 >= qs.length) { setDone(true); return; }
    setIdx(i => i + 1);
    setAnswered(false);
    setChosen(null);
  };

  if (done) {
    const finalPct = Math.round((correct / total) * 100);
    let msg = "Mer träning behövs. Fokusera på konnotationer och register — det är kärnan i MEK.";
    if (finalPct >= 90) msg = "Utmärkt! Du presterar på mycket hög nivå — typisk poäng för HP:s toppskikt.";
    else if (finalPct >= 75) msg = "Bra jobbat! Du behärskar de flesta nyanser på högskoleprovsnivå.";
    else if (finalPct >= 60) msg = "Godkänd nivå. Fortsätt träna på nyanser mellan synonymer i akademisk kontext.";
    return (
      <div style={{fontFamily:"system-ui,sans-serif",maxWidth:640,margin:"0 auto",padding:"40px 16px",textAlign:"center"}}>
        <div style={{fontSize:72,fontWeight:700,color:GOLD,lineHeight:1}}>{finalPct}%</div>
        <div style={{fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:".12em",margin:"8px 0 16px"}}>Slutresultat</div>
        <div style={{fontSize:16,color:"#222",maxWidth:400,margin:"0 auto 28px",lineHeight:1.6}}>{msg}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:28}}>
          {[["Rätt",correct],["Fel",total-correct],["Totalt",total]].map(([l,v])=>(
            <div key={l} style={{background:"#f5f2ec",borderRadius:10,padding:"16px 8px"}}>
              <div style={{fontSize:26,fontWeight:700,color:"#1a1714"}}>{v}</div>
              <div style={{fontSize:10,color:"#888",textTransform:"uppercase",letterSpacing:".08em",marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>window.location.reload()} style={{background:GOLD,color:"#fff",border:"none",borderRadius:50,padding:"13px 36px",fontSize:14,fontWeight:600,cursor:"pointer"}}>
          Kör om — ny ordning ↺
        </button>
      </div>
    );
  }

  return (
    <div style={{fontFamily:"system-ui,sans-serif",maxWidth:640,margin:"0 auto",padding:"16px 16px 60px"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <div style={{fontWeight:700,fontSize:15,color:"#1a1714"}}>MEK <span style={{color:GOLD}}>·</span> Högskoleprovet</div>
        <div style={{display:"flex",gap:16}}>
          {[["Frågor",total],["Rätt",total>0?pct+"%":"—"],["Streak",streak+"🔥"]].map(([l,v])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:700,color:l==="Rätt"?GOLD:"#1a1714",lineHeight:1}}>{v}</div>
              <div style={{fontSize:9,color:"#999",textTransform:"uppercase",letterSpacing:".1em",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div style={{height:3,background:"#e8e1d6",borderRadius:2,marginBottom:14,overflow:"hidden"}}>
        <div style={{height:"100%",background:GOLD,borderRadius:2,width:progress+"%",transition:"width .5s ease"}} />
      </div>

      {/* Counter */}
      <div style={{fontSize:12,color:"#999",marginBottom:10}}>
        Fråga <strong style={{color:GOLD}}>{idx+1}</strong> av {qs.length}
      </div>

      {/* Sentence card */}
      <div style={{background:"#fffcf7",border:"1px solid #e0d8cc",borderRadius:14,padding:"28px 28px 24px",marginBottom:14,minHeight:110,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{fontSize:10,fontWeight:600,letterSpacing:".14em",textTransform:"uppercase",color:"#aaa",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
          Välj det ord som passar bäst i luckan
          <span style={{flex:1,height:1,background:"#e0d8cc",display:"inline-block"}} />
        </div>
        <p style={{fontSize:19,lineHeight:1.8,color:"#1a1714",textAlign:"center",margin:0}}>
          {q.b}&nbsp;
          <span style={{display:"inline-block",width:72,height:2,background:"#1a1714",verticalAlign:"middle",margin:"0 2px",position:"relative",top:-4}} />
          &nbsp;{q.a}
        </p>
      </div>

      {/* Options */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {opts[idx].map((opt, i) => {
          let bg = "#fffcf7", border = "#cec6b8", lBg = "#f0ebe2", lColor = "#888";
          let opacity = 1;
          if (answered) {
            if (opt === q.c) { bg = GREEN_BG; border = GREEN; lBg = GREEN; lColor = "#fff"; }
            else if (opt === chosen) { bg = RED_BG; border = RED; lBg = RED; lColor = "#fff"; opacity = 0.75; }
            else { opacity = 0.3; }
          }
          return (
            <button key={opt} onClick={() => handleAnswer(opt)} disabled={answered}
              style={{background:bg,border:`1.5px solid ${border}`,borderRadius:12,padding:"12px 14px",cursor:answered?"default":"pointer",
                fontSize:14,fontWeight:500,color:"#1a1714",display:"flex",alignItems:"center",gap:10,textAlign:"left",
                opacity,transition:"all .15s",width:"100%"}}>
              <span style={{width:24,height:24,borderRadius:6,background:lBg,color:lColor,fontSize:11,fontWeight:700,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {LETTERS[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div style={{background:isCorrect?GREEN_BG:RED_BG,border:`1px solid ${isCorrect?GREEN:RED}`,borderRadius:12,
          padding:"16px 20px",fontSize:13,lineHeight:1.65,marginBottom:14}}>
          <div style={{fontWeight:600,fontSize:14,color:isCorrect?GREEN:RED,marginBottom:6}}>
            {isCorrect ? "✓ Rätt!" : `✗ Fel — rätt svar: ${q.c}`}
          </div>
          <div style={{color:"#1a1714",opacity:.88}}>{q.e}</div>
        </div>
      )}

      {/* Bottom row */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",maxWidth:260}}>
          {hist.slice(-30).map((h,i) => (
            <div key={i} style={{width:8,height:8,borderRadius:"50%",background:h==="c"?GREEN:RED}} />
          ))}
        </div>
        {answered && (
          <button onClick={handleNext} style={{background:"#1a1714",color:"#f2ede4",border:"none",borderRadius:50,
            padding:"11px 28px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
            {idx+1>=qs.length ? "Se resultat →" : "Nästa →"}
          </button>
        )}
      </div>
    </div>
  );
}
