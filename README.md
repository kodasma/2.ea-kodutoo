# 2. kodutöö – kirjutamise mängu täiendamine

Kevin Kodasma ja Kalmer Roopa

## Funktsionaalsused
1. Eraldi ühe lehe app'ina mängu tutvustav leht, kus saab nime sisestada ja mängu käivitada. [Kevin]
2. Toimiv skoorisüsteem koos levelitega. [Kevin]
3. Skoori arvutus on lahendatud keerulisemalt, kui olemasolevate sõnade loetlemine. [Kevin]
4. Edetabel skoori kuvamiseks. [Kalmer]
5. Tähe valesti trükkimisel kaotab mängija punkte.[Kevin]
* Skeem rakenduse tööprotsessist. [Kalmer]


# Skoori moodustamine ja lisatud funktsionaalsuste tekstipõhine kirjeldus
1. Skoori lisamine:
	* Deklareerisin faili algul this.score = 0. Lisasin keyPressed funktsiooni
	score+ = 1 ja score-=1 laused ehk kui kasutaja vajutab õiget tähte,
	mis on vasakult esimene, lisatakse skoorile +1. Juhul kui vajutatakse
	valet tähte võetakse skoorist 1 punkt maha (else). Järgmisena joonistasin
	Draw funktsioonis skoori välja, sama meetodiga nagu ilmuvad trükitavad
	sõnad.
	* Tahtsin ka välja kuvada arvatud sõnade arvu. Selleks deklareerisin faili
	algul this.guessedWords = 0 ja lisasin keyPressed funktsiooni lause
	guessedWords += 1. Lause läks tingimuse sisse, mida täidetakse juhul kui
	sõna tähtede arv on võrdne nulliga ehk sõna on läbi kirjutatud. Draw
	funktsioonis kuvasin arvatud sõnad välja samamoodi nagu skoori.
	* Lisaks tekitasin leveli. Selleks faili alguses deklareerisin muutuja
	this.level = 1. Oli vaja ka välja mõelda, mis juhul level tõuseb.
	Soovisin, et level tõuseks iga 5 sõna tagant ehk iga kord kui hakatakse
	kuvama ühe tähe võrra pikemaid sõnu. Andsin generateWord funktsioonis 
	muutujale level väärtuse (parseInt(window.typer.guessedWords / 5) + 1),
	mis tekitas soovitud tulemuse. Jällegi Draw funktsioonis joonistasin 
	leveli välja samal viisil nagu eelnevad.
2. Ühe-lehe-rakenduse lisamine:
	* Typer funktsioonis deklareerisin routes ja currentRoute muutujad. Tegin
	routeChange funktsiooni. Deklareerisin route-id TYPER.routes 'na -
	home-view ja app-view. Tegin updateMenu funktsiooni. Lisasin init
	funktsiooni eventlisteneri hashchange ja tingimuse default hashi jaoks.
	Üks leht avaleht, teine app ise.




Mängu eesmärk on võimalikult kiiresti ekraanile tekkivaid sõnu ära trükkida. Sõnad on võetud [Eesti Keele Instituudi lehelt](http://www.eki.ee/tarkvara/wordlist/) – [lemmad2013](http://www.eki.ee/tarkvara/wordlist/lemmad2013.txt). Aluseks tuleb võtta kood **[eesrakenduste-arendamine-2018k/klahvimine](https://github.com/eesrakenduste-arendamine-2018k/klahvimine)**. 

### Tähtpäev 26.03.2018 23:59

## Nõuded

1. Töö tuleb teha vähemalt kahekesi, eelnevalt kokkuleppel on lubatud ka kolm liiget. GitHub'is peab eristuma, kes mida tegi!
1. README.md fail sisaldab:
    * autorite nimesid;
    * repositooriumisse lisatud pilti/skeemi rakenduse tööprotsessidest (sh skoori moodustamine); 
    * skoori moodustamise ja lisatud funktsionaalsuste tekstipõhist kirjeldust.
1. Mängu on lisatud täiendavad funktsionaalsused:  
    * eraldi on mängu tutvustav leht, kus kirjeldatakse mängu, saab sisestada mängija nime ning alustada mängu (ühe-lehe-rakenduse stiilis); 
    * mängijate kohta hoitakse meeles ja salvestakse skoor, nt kasutades [localStorage](https://www.w3schools.com/html/html5_webstorage.asp)'it; 
    * skoori arvutus on lahendatud keerulisemalt kui seda on juba olemasolev arvatud sõnade loetlemine; 
    * eraldi näidatakse välja 10 parima mängija skoori (brauseri põhjal kui kasutate localStorage'it); 
    * mängule on lisatud mõni lisafunktsioon, nt:
        * valesti tähe trükkimisel on tagajärg (nt mõjutab skoori, ekraan vilgub, vms)
        * kasutaja saab ise valida raskusastme või teda huvitavad sõnad (sõnapikkuse vms järgi)
        * eraldi on öörežiim (ingl *dark mode*)
        * mängus on animatsioonid (nt tähed lendavad ära pärast trükkimist)
        * ...
    * [EI OLE KOHUSTUSLIK] eraldi on statistika leht, kus näidatakse ära arvatud sõnade ja kasutajate kohta statistikat (nt eksimuste arv, kirjutamise kiirus vms)
    * [EI OLE KOHUSTUSLIK] juba mängitud sõnu enam ei loosita
    * [EI OLE KOHUSTUSLIK] skoori ja kõiki muid andmeid hoitakse serveris 
    * [EI OLE KOHUSTUSLIK] mängu loogika on serveris ja kasutatakse mängus petmist ennetatakse – *cheat*'imine on kõvasti keerulisem

## Abimaterjal
* Lintimiseks on ühe võimalusena vaja paigaldada [Node.js](https://nodejs.org/en/), [VSCode](https://code.visualstudio.com/) ja VSCode plugin [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Loe lähemalt kursuse [3.loangu materjalist](https://github.com/eesrakenduste-arendamine-2018k/kursus#3-loeng). Abiks Vajalike asjade paigaldamiseks projektis: `npm install`
* Sündmuste loetelu [HTML DOM Events](http://www.w3schools.com/jsref/dom_obj_event.asp)
* Ajal põhinevad sündmused [JavaScript Timing Events](http://www.w3schools.com/js/js_timing.asp)
* Canvas retina ekraani jaoks [High DPI Canvas](https://www.html5rocks.com/en/tutorials/canvas/hidpi/)
* Mäng 60fps [requestAnimationFrame](http://creativejs.com/resources/requestanimationframe/) ja näide 60fps töötavast mängust [Typer60fps](eesrakenduste-arendamine-2017k/https://github.com/eesrakenduste-arendamine-2017k/Typer60fps) 
