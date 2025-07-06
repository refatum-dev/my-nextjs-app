# Współtworzenie (Contributing)

Dziękujemy za zainteresowanie projektem **my-nextjs-app**! Poniżej znajdziesz kilka wskazówek, jak skutecznie wnosić swój wkład.

## Zgłaszanie błędów
1. Sprawdź, czy błąd nie został już zgłoszony w Issues.
2. Jeśli nie, [utwórz nowe zgłoszenie](https://github.com/USER/my-nextjs-app/issues/new/choose) wybierając odpowiedni szablon.
3. Podaj jak najwięcej szczegółów (kroki reprodukcji, oczekiwany wynik, zrzuty ekranu, logi).

## Propozycje funkcji
1. Zweryfikuj, czy podobna funkcja nie została już zaproponowana.
2. Użyj szablonu `Feature request` w Issues, opisując problem i proponowane rozwiązanie.

## Pull Request (PR)
1. Fork repozytorium i utwórz nową gałąź z opisową nazwą (`feature/nowa-funkcja` lub `bugfix/naprawa-błędu`).
2. Upewnij się, że projekt się buduje (`npm run build`) i przechodzi testy (`npm test`).
3. Zaktualizuj dokumentację, jeśli to konieczne.
4. Otwórz PR na `main`, opisując zmiany i powiązane Issue.
5. PR musi przejść pipeline CI i wymaga co najmniej jednej recenzji.

## Konwencja commitów
Stosujemy konwencję [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
```
type(scope): krótki opis

opcjonalny dłuższy opis
```
Przykład:
```
feat(button): dodaj nowy wariant kolorystyczny
```

## Styl kodu
- JavaScript/TypeScript: ESLint + Prettier
- Komponenty React: funkcjonalne + Hooks
- Write small, composable functions.

## Kontakt
W razie pytań otwórz Issue lub skontaktuj się z maintainerem projektu.
