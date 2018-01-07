zip: background.js manifest.json icon-48.png icon-96.png
	zip -9 tab_move.zip background.js manifest.json icon-48.png icon-96.png

clean:
	rm -v tab_move.zip || true
