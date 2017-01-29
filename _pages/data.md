---
layout: page
title: Data
permalink: /data/
custom-css: about.css
custom-js:
  - data.js
---
* TOC
{:toc}

## Prologo
Il web è il luogo al quale stiamo progressivamente demandando l'immagine del nostro tempo: notizie interazioni sociali, documenti ufficiali e non, sono oggi codificati digitalmente.
Nei campi delle scienze sociali e dei _new media studies_ è possibile notare un crescente approccio allo studio di fenomeni sociali in cui il web è visto come uno spazio di discussione dove sedimentano nel tempo le _tracce digitali_. Tramite la loro raccolta e analisi è possibile creare un punto di accesso al fenomeno analizzato.

## Cosa
Il nostro fenomeno preso in considerazione è la metropoli e tutti i complessi fenomeni urbano-sociali ad essa collegata. In particolare ci siamo soffermanti sugli spazi che _costruiscono_ fisicamente la metropoli, sulla loro storia e sulla loro evoluzione.

Come punto di partenza per la raccolta delle nostre tracce digitali, abbiamo pensato che le immagini di **Goolge Street View** potevano essere un buono spunto. Infatti tramite una funzione chiamata _Timemachine_ è possibile vedere le vecchie immagini scattate a partire dal 2008 e quindi **ricostruire l'evoluzione** di un luogo o di uno spazio. Come facciamo a recuperarle? Saranno significative?
Andiamo con ordine :)

## Processo
La scintilla di questa prima parte della nostra ricerca è partita da un [articolo di un quotidiano](http://milano.repubblica.it/cronaca/2016/03/29/news/milano_degrado-136507525/) dove venivano descritti 180 luoghi _del degrado e dell'abbandono_ a Milano. La lista è stata [pubblicata](http://www.comune.milano.it/wps/portal/ist/it/servizi/territorio/monitoraggio_edifici_aree_stato_di_degrado) dal Comune di Milano su una pagina apposita e non nel loro portale degli [OpenData](http://dati.comune.milano.it/dato.html).

***

Il primo passo quindi è stato quello di _liberare_ questi dati. Andando direttamente sulla [mappa](https://www.google.com/maps/d/viewer?mid=1C0T8HDi9z4I1UEFoLI9VGRXOAS8) creata in Google Maps abbiamo scaricato i dati in formato _.kml_

![liberare]({{'/media/'| append:'liberare.gif' | prepend: site.baseurl}})

***

Successivamente abbiamo [convertito](https://ogre.adc4gis.com/) i dati da _.kml_ in _.geojson_, un altro formato per dati geografici molto più diffuso e riutlizzabile con altri software.
Abbiamo caricato i dati su [Carto](http://carto.com) che ci ha permesso di esplorare, modificare e visualizzare i dati in modo più flessibile.

{% include carto.html url='https://offtopic.carto.com/viz/72c57522-0fd4-11e6-a9af-0ecfd53eb7d3/embed_map' %}

***

Abbiamo quindi iniziato a ri-categorizzare i luoghi a seguito di alcuni ragionamenti fatti durante il laboratorio e cominciato a scriverere dei testi di approfondiento per alcuni spazi interessanti da un un punto di vista di critica politica.

{% include drive.html url='https://docs.google.com/spreadsheets/d/1w8jxeAb4z4ETmHd7nQglHTgTgTnoOKZM3958Fj5-Vws/pubhtml?gid=833443303&amp;single=true&amp;widget=true&amp;headers=false' %}

***

Consolidato a piccoli passi il nostro dataset abbiamo cominciato ad esplorare manualmente su Google Street view i singoli spazi ed ad andare a ritroso nel tempo tramite _Timemachine_...e alcune storie interessanti emergevano:

![timemachine]({{'/media/'| append:'timemachine.gif' | prepend: site.baseurl}})

Mettendo insieme i singoli screenshot dell'[ex Cinema Maestoso](https://www.google.it/maps/place/Maestoso/@45.4477289,9.2102211,3a,75y,327.55h,97.05t/data=!3m8!1e1!3m6!1sJ6xiHZJxMssb5gBctak_lg!2e0!5s20160701T000000!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3DJ6xiHZJxMssb5gBctak_lg%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D353.68683%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656!4m5!3m4!1s0x4786c424c3183ba1:0x2db2b0fc2af79da7!8m2!3d45.4480017!4d9.2094727?hl=en) abbiamo cerato la copertina del progetto!

![copertina]({{'/media/'| append:'copertina.gif' | prepend: site.baseurl}})

***

Il passo successivo era creare uno strumento online che ti permettesse di esplorare nel tempo tutti gli spazi aggiungendoci le informazioni e diversi approfondimenti che stavamo scrivendo. Ma ripetere l'operazione di prendere le immagini a mano per tutti i luoghi è altamente alienante. Abbiamo quindi provato ad aggirare questo problema utilizzando il metodo _ufficiale_ per recuperare dati da Google Street View ovvero le sue [API](https://it.wikipedia.org/wiki/Application_programming_interface)  ma purtroppo le vecchie immagini di _Timemachine_ [non erano disponibili](https://developers.google.com/maps/documentation/streetview/intro).
Non ci siamo persi d'animo e abbiamo adottato un metodo _non ufficiale_.

Abbiamo scritto un software (in gergo nerd è chiamato _scraper_) che simulasse tutte le singole azioni necessarie per scaricare le informazioni che ci interessavano e l'abbiamo eseguito automaticamente su circa 80 spazi.

![scraper]({{'/media/'| append:'scraper.gif' | prepend: site.baseurl}})

***

Ora che anche ultimi dati mancanti erano stati _liberati_ avevamo a disposizione tutti gli ingredienti per costruire il sito che state navigando adesso :)

![infornare](http://i.giphy.com/13rDkCufm6BhHq.gif)


## Dati e codice
Potete trovare i dati in formato aperto/modificabile/riutilizzabile qui:

>[places.json](https://raw.githubusercontent.com/scandaglio/molo/master/_data/places.json)

Il codice del sito qui:

>[scandaglio](https://github.com/scandaglio/molo)

Il codice delle scraper qui:

>[coming soon]()

## Disclaimer
Questa ricerca non è perfetta e non è terminata, è l'inizio di un laboratorio politico che verrà [portato avanti](/molo/about/) presso PianoTerra. Ogni consiglio e critica costruttiva è benvenuta!
