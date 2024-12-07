# Unit testing pentru Componenta Gallery

Componenta Gallery reprezintă o entitate a unei galerii într-un sistem de artă, unde galeriile pot conține picturi \
și sunt deținute de un anumit utilizator (Owner). Este legată de entitățile Painting și Owner printr-o structură de \
baze de date relaționale.

## Verificarea repository-ului (gestionarea accesului la date) asociat cu entitatea Gallery

Clasa testată: [GalleryRepository.java](../../../../FillTheVoid/src/main/java/com/taip/FillTheVoid/gallery/GalleryRepository.java)

Testul creat: [GalleryRepositoryTests.java](../../FillTheVoid/src/test/java/com/taip/FillTheVoid/gallery/GalleryRepositoryTests.java)

Ele acoperă operațiuni de bază cum ar fi salvarea, gestionarea erorilor și căutarea, \
asigurându-se că interacțiunile cu baza de date sunt conforme cu așteptările. Prin testarea acestor \
metode, se garantează că aplicația se comportă corect la nivelul cel mai apropiat cu baza de date.

## Verificarea serviciului asociat cu entitatea Gallery

Clasa testată: [GalleryService.java](../../../FillTheVoid/src/main/java/com/taip/FillTheVoid/gallery/GalleryService.java)

Testul creat: [GalleryServiceTests.java](../../../FillTheVoid/src/test/java/com/taip/FillTheVoid/gallery/GalleryServiceTests.java)

Aceste teste acoperă operațiuni esențiale ale serviciului GalleryService, cum ar fi adăugarea, obținerea, actualizarea și \
ștergerea galeriilor, asigurându-se că interacțiunile cu serviciile și componentele aplicației se realizează conform așteptărilor. \
Verificarea comportamentului serviciilor garantează că aplicația funcționează corect la nivelul logicii de business și al manipulării entităților.

## Verificarea monitorului asociat cu entitatea Gallery

Clasa testată: [GalleryServiceMonitor.java](../../FillTheVoid/src/main/java/com/taip/FillTheVoid/gallery/GalleryServiceMonitor.java)

Testul creat: [GalleryServiceMonitorTests.java](../../FillTheVoid/src/test/java/com/taip/FillTheVoid/gallery/GalleryServiceMonitorTests.java)

Aceste teste acoperă mai multe stări ale comportamentului monitorului **GalleryServiceMonitor**. Mai precis, ele verifică funcționalitatea 
și corectitudinea diverselor metode din acest monitor, inclusiv logarea, validarea datelor și tratarea excepțiilor.

## Verificarea controller-ului asociat cu entitatea Gallery (folosind AI)

Clasa testată: [GalleryController.java](../../FillTheVoid/src/main/java/com/taip/FillTheVoid/gallery/GalleryController.java)

Testul creat: [GalleryControllerTests.java](../../FillTheVoid/src/test/java/com/taip/FillTheVoid/gallery/GalleryControllerTests.java)

Aceste teste acoperă principalele metode ale controller-ului GalleryController, care interacționează cu serviciul GalleryService. 
Mai exact, testele sunt axate pe verificarea integrării dintre controller și serviciul care gestionează galeriile.

### Utilizarea AI-ului

Aceste teste au fost generate cu ajutorul pluginului **Codeium**, instalat în IntelliJ. **Codeium** este un plugin bazat pe **inteligență artificială** care ajută dezvoltatorii să scrie cod mai rapid și mai eficient, generând automat teste și fragmente de cod pe baza unui context dat.

Utilizând acest plugin, am putut crea teste pentru GalleryController într-un timp foarte scurt, economisind resurse și reducând timpul de dezvoltare necesar pentru crearea manuală a acestora. Codeium analizează codul existent și sugerează sau generează complet teste de integrare, având în vedere logica aplicației și comportamentul așteptat al componentelor.

## Avantajele 
1. Viteză și eficiență: Generarea automată a testelor economisește timp, deoarece AI-ul poate analiza rapid codul sursă și poate genera teste corespunzătoare fără a necesita o înțelegere detaliată manuală a fiecărui flux de lucru.
2. Reducerea erorilor umane: Testele generate automat sunt mai puțin predispuse la greșeli de sintaxă sau logică care pot apărea în timpul scrierii manuale.
3. Îmbunătățirea acoperirii testelor: AI-ul poate ajuta la generarea de teste care acoperă toate cazurile posibile, inclusiv cele de succes și cele de eroare, și poate identifica scenarii de testare care ar putea fi omise.
4. Început rapid pentru testare: Generarea automată a testelor permite echipei de dezvoltare să înceapă testarea rapid, fără a petrece prea mult timp creând teste de la zero.

## Dezavantajele 
1. Lipsa personalizării în detaliu: AI-ul poate genera teste care sunt corecte, dar pot să nu reflecte întotdeauna logica de business sau nu sunt optimizate pentru cazuri particulare care ar putea necesita ajustări manuale.
2. Dependența de un model predefinit: Testele generate automat sunt limitate de capacitățile și înțelegerea modelului AI. În cazuri complexe, poate fi necesar să fie ajustate manual pentru a acoperi corect toate scenariile.
3. Posibilitatea de a omite cazuri de testare: AI-ul uneori nu poate anticipa toate posibilitățile de utilizare ale aplicației sau ale utilizatorilor, așa că unele cazuri de testare specifice ar putea fi omise.
4. Posibilitatea de a crea teste redundante sau inutile: AI-ul ar putea genera teste care sunt prea detaliate sau nu aduc valoare reală în verificarea funcționalității, ducând la un volum mare de teste care ar putea să nu fie relevante sau necesare.

## Exemplu de utilizare

https://github.com/user-attachments/assets/14c3e49a-ad4b-449b-bd5c-f4aa631839ef

# Code Coverage

![image](https://github.com/user-attachments/assets/bc1f4b8c-23c8-4433-9304-6e418f9fecd0)



