# qvdd
Klasse Quote Van De Dag ontsloten

#howto

De site lokaal draaien kan je doen met light-server via bvb `light-server -s . -p 7000` (of `node_modules/light-server/bin/light-server  -s . -p 7000`), de site zal dan bereikbaar zijn op localhost:7000

Requirements moeten geïnstalleerd worden met `npm install` (cfr package.json).

CSS wordt gebouwd vanuit LESS en kan gegenereerd worden met `gulp dev`

Om foto's en quotes te tonen, zijn API keys nodig van resp. Google Sheets en 500px. Die moet je in de url na het hekje meegeven, gescheiden door een komma. Indien niet meegegeven, krijg je een prompt om de keys in te vullen.

Voorbeeld van url met keys:

`http://localhost:7000/#[googlekey],[500pxkey]`

