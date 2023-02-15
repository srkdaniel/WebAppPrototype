import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

const KBeaCoachData = {
  companyName: "KBeaCoach", //3*
  aboutKBeaCoach: "Komáromy Beáta vagyok és a KBeaCoach a life coach brandem. Évek óta foglalkozom a táplálkozási területtel, egészséges és tápláló ételekkel. 2013 óta  számos kurzust és tanfolyamot végeztem el a nyugati divatdiéták mellett a több ezer éves indiai hagyomány az ayurveda tudománya felé fordulva mely a test a lélek és szellem egységében az egészséges és hosszú élet tudománya. Elkötelezett híve vagyok a vegan életmódnak, és szeretek másoknak segíteni megismerni az előnyöket és örömöket, amelyeket ez az életmód nyújt. Saját pékségem van, ahol korszerű táplálkozási igényeket figyelembe véve készítünk termékeket, beleértve a laktózmentes, gluténmentes, vegan süteményeket és kenyereket, amelyek mindenki számára elérhetőek. Fitnesz instruktorként reformer pilatest oktatok résztvevőimnek és segítek elérni a fizikai és mentális jóllétet.Meditációs óráimon melyek főként hangtálak és egyéb hangszerek bevonásával történik csoportosan vagy privát formában, segítek elérni a belső nyugalmat és harmóniát, áramlást. Rendelkezem vendéglátóipari szakács és cukrász képesítéssel, ami lehetővé teszi számomra, hogy szakmailag megbízható vegan recepteket készítsek és tanítsak másoknak is. 2022-ben vegan életmód tanácsadói kurzussal bővítettem a tudásomat és  tanácsadóként is dolgozom. Ha szeretne változtatni az életmódján, és segítséget szeretne kérni a vegan táplálkozásban, yogában, vagy hangtál meditációban, csak lépjen kapcsolatba Beátával. Emellett vegan főző kurzusokat is indítok online vagy csoportosan. KBea Coach a Reformer Pilates és hangtál meditációs órák tanításával foglalkozom. Reformer Pilates óráimon a test és lélek egyensúlyát segítem elérni, miközben erősítjük az izmokat és javítjuk a mozgáskészséget, a testtudatosságot. A hangtál óráimon a hangterápia segítségével nyugtatjuk el az elmét, oldjuk a stresszt és javítjuk az általános jóllétet,harmóniát, folytonosságot és áramlást teremtve. A KBea Coach vegán életmód tanácsadással is foglalkozom. Ha úgy érzed, hogy szeretnél áttérni a növényalapú étrendre, de nem tudod, hogyan kezdj bele, a KBea Coach personal brand segít eligazodni a vegán életmód világában. A tanácsadásom segítségével megismerkedhetsz a vegán étkezés alapjaival, ételkészítési eljárásokkal és megtanulhatod, hogyan állíthatsz össze tápláló és ízletes étrendet, hol szerezd be az alapanyagokat és megtanulhatod.",
  servicesKBea: "Mint KBeaCoach, a Pilates, a hangtál meditáció és a vegán életmód tanácsadás szolgáltatásaink által nyújtunk segítséget a klienseinknek. KBeaCoachként a Pilates gyakorlatokat speciális gépeken vagy matracokon végezzük, figyelmet és koncentrációt igénylő, kontrollált, lassú mozdulatokból állnak. KBeaCoachként a hangtál meditáció egy olyan technika, amely segít elérni a belső békét és nyugalmat. KBeaCoachként a hangtál meditációt kristályszóló tálak segítségével végezzük, amelyek hangja nyugtató hatású. KBeaCoachként a hangtál meditáció során a tálakat a testre és körülötte helyezzük el, és különböző technikákkal mozgatjuk, hogy elérjük a mélyebb figyelmet és lazítást, ami csökkenti a stresszt és javítja az általános jólétet. Mint KBeaCoach, a vegán étrend biztosítja minden szervezet számára a szükséges tápanyagokat, ha változatosan összeállítjuk, nem kell lemondanunk semmilyen táplálkozási értékről. KBeaCoachként fontos, hogy a növényi eredetű fehérjék, zsírok, szénhidrátok, vitaminok és ásványi anyagok változatosságát biztosítsuk a vegán étrendben. ",
  hollistic: "KBeaCoach-ként, a holisztikus gondolkodás az egyik alapelvem a szolgáltatásaimnak. Ennek az alapján figyelembe veszem az egyén testét, lelkét és szellemét, és egyensúlyt teremtek a mentális, emocionális és fizikai szükségletek között. A testápolás, a táplálkozás, a mozgás, a gyógynövények használata és az aromaterápia is része a holisztikus gondolkodásnak, és ezeket használom, hogy segítsek az egyéneknek egészséges és harmonikus életmódban élni. Az életmód tanácsadásom során egyénre szabottan megtervezzük az optimális életmód kialakítását, figyelembe véve az egyén általános testi és egészségi állapotát, valamint az érzelmi és lelki állapotát is. Az elismert holisztikus módszerek, mint például a reformer pilates, a hangtál meditáció és a vegán életmód tanácsadás, is részei az életmód tanácsadásnak, hogy elérjük a testi, lelki és szellemi egyensúlyt.",
  //servicePilates: "A Reformer Pilates-el biztonságosan fejleszthetjük az izmokat és reflexeiket rugós ellenállás segítségével. A gyakorlatok végzése során harmonikusan dolgoztathatjuk az izmokat hirtelen mozdulatok nélkül, így elkerülve a felesleges izomtömeg-növekedést és az ízületek túlterhelését. A pilates minden korú és erőnléti szintű személy számára ajánlott, és hatékonyan erősíti és formálja a testet, visszaállítja a gerincoszlop és az ízületek ideális állapotát, valamint növeli a testtudatot és a testi-lelki egyensúlyt. Precízen kivitelezett mozdulatokkal érhetjük el ezeket az eredményeket. Minden héten számos Pilates órát kínálok, amelyek kis létszámú csoportokban  zajlanak. Ezen kívül privát órákat is tartok, amik lehetővé teszik a személyre szabott figyelmet és a koncentráltabb edzésképességet. Ha az állóképességi erősítést, a stressz csökkentését, vagy egyszerűen csak a testét egészségesen és tónusosan szeretné tartani, van egy Pilates óránk, amely megfelel Önnek.",
  //serviceSoundBowl: "A hangtál meditáció egy egyedi formája a meditációnak, amely a hangtálak,gongok, dobok,csengők nyugtató rezgéseit használja ahhoz, hogy segítse a lelki nyugalmat és a lazítást, valamint a belső békét. Meditációkon  vezetem a résztvevőket, különböző technikák és gyakorlatok segítségével, a természeti elemek bevonásával elérjük az ember egyensúlyának helyreállítását, a feszültségek kiemelését, tudatosság fejlesztését, a saját forráshoz kapcsolódást, finom energia rendszerben áramlást, megtanít lelassulni és elfogadni azt ami VAN. Minden héten tartok hangtál meditációs órákat, csoportos és magán formában is. A meditációnak a gyermektől az idősekig mindenkinek alkalmas, kezdőktől a tapasztalt meditálókig. Ha stresszcsökkentést, alvásjavítást, vagy egyszerűen csak belső nyugalom és egyensúly megtalálását keresed, a hangtál meditációk segíthetnek elérni céljaidat. ",
  //serviceVegan: "Receptek elkészítését, főzőtanfolyamokat és személyre szabott étrendterveket kínálok az embereknek, hogy segítsem őket egészséges és tiszta vegán életmódban élni és kiteljesedni. Receptjeim egészségesek, ízletesek és könnyen elkészíthetők. Főzőtanfolyamaim tökéletesek azok számára, akik kezdők a vegánizmusban, vagy egyszerűen csak szeretnének bővíteni gasztronómiai készségeiket. Személyre szabott étrendterveket is kínálok, hogy segítsem Önt a szükséges tápanyagok megszerzésében, hogy egészséges vegán életmódot élhessen. ",
};

//other part

const getResponse = () => {
  let response = "";
  // retrieve relevant information from the data
  const companyName = KBeaCoachData.companyName;
  const about = KBeaCoachData.abouttexTailor;
  const services = KBeaCoachData.servicesKBea;
  const gondolkodás = KBeaCoachData.hollistic;
  //const serviceP = KBeaCoachData.servicePilates;
  //const serviceS = KBeaCoachData.serviceSoundBowl;
  //const serviceV = KBeaCoachData.serviceVegan;

  // use the relevant information to generate the response
  response += `${companyName}. `;
  response += `${about}. `;
  response += `${services}.`;
  response += `${gondolkodás}.`;
  //response += `${serviceP}.`;
  //response += `${serviceS}.`;
  //response += `${serviceV}.`;

  return response;
}

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      suffix: " (könnyed, informális, hozzáférhető, lelkes hangnemben és stílusban, 1/1 személyben, KBeaCoach-ként)",
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))