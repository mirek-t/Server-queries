# Server-req

## CRUD - create, read, update, delete

| ---  | Create | Read   | Update    | Delete |
| ---- | ------ | ------ | --------- | ------ |
| REST | POST   | GET    | PUT/PATCH | DELETE |
| SQL  | INSERT | SELECT | UPDATE    | DELETE |

## ENDPOINT

```
https://www.gmail.google.com/messages?title=elo&author=noname
```

1. https:// - comunication protocol
2. www - rodzaj zasobu ( pdf )
3. gmail - subdomena
4. google - domena
5. com - część domenty określająca jej typ, typ domeny
6. /messages - endpoint
7. po pytajniku -> zmienne -> title=elo&author=noname ->jeśli chcemy więcej niż jedną zmienną używamy &

---

- GET /books (pobierz wszytskie książki)
- GET /books/id (/books/2) (pobierz konkretną książkę)
- POST /books (stworzy nową książkę)
- PUT /books/id (aktualizujemy cały obiekt)
- PATCH /books/id (aktualizujemy konkretny obiekt częściowo)
- DELETE /books/id
- HEAD /books & /books/id (zwraca nagłównki)
- OPTIONS - działa na wszystkich endpointach, zwraca dostępne metody http dla danego endpointu
