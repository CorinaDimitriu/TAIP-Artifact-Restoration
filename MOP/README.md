# PaintingServiceMonitor (MOP)

[PaintingServiceMonitor.java](../FillTheVoid/src/main/java/com/taip/FillTheVoid/painting/PaintingServiceMonitor.java)

**PaintingServiceMonitor** este o implementare MOP (Monitoring-Oriented Programming) \
MOP este un model de programare conceput pentru a introduce mecanisme de observare, validare și logare în cadrul aplicațiilor, fără a afecta logica de bază.

## Ce face PaintingServiceMonitor?
În cazul de față, **PaintingServiceMonitor**:

### Validează și corectează datele
Asigură că author și description primesc valori implicite dacă sunt null sau goale. 
### Generează nume unice
Creează automat un nume unic pentru picturile care sunt adăugate cu același nume, prevenind conflictele. \
Astfel, monitorul ajută la menținerea consistenței datelor și la evitarea erorilor, intervenind acolo unde este necesar pentru a îmbunătăți robustețea aplicației.

## Metodele

## **1. logAddPaintingDetails** 

Funcție: Este executată înainte de rularea metodei addPainting din PaintingService. \
Reprezintă mecanismul de **observare**.

**Rol**: \
Înregistrează detalii despre apelul metodei addPainting, inclusiv utilizatorul, galeria, numele picturii, descrierea, autorul și alte detalii. \
Înregistrează argumentele transmise metodei, evidențiind valorile null sau goale pentru description și author. 

**Utilitate**: \
Ajută la urmărirea apelurilor metodei și la diagnosticarea problemelor prin logarea datelor de intrare.

## **2. validateAndCorrect**

Funcție: Este un aspect de tip "**around**" care se aplică în jurul metodei **addPainting**. \
Reprezintă mecanismul de **verificare** și **corectare**.

**Rol**: \
Verifică și corectează descrierea și autorul, dacă sunt nule sau goale. \
Generează un nume unic pentru pictură, dacă numele original există deja. 

**Utilitate**: \
Crește robustețea aplicației prin asigurarea consistenței datelor. \
Evită conflictele prin atribuirea unui nume unic picturilor.

## **3. logAfterMethod(JoinPoint joinPoint, Object result)**
Funcție: Este executată după ce o metodă din PaintingService a fost executată cu succes.

**Rol**: \
Raportare: Înregistrează rezultatul returnat de metodă și confirmă execuția acesteia. 

**Utilitate**: \
Facilitează analiza comportamentului metodei și rezultatelor generate.

## **4. logExceptions(JoinPoint joinPoint, Throwable exception)**
Funcție: Este executată când o metodă din PaintingService aruncă o excepție.

**Rol**: \
Observare: Înregistrează detalii despre excepțiile apărute. \
Raportare: Afișează mesajele de eroare și sursa problemei.

**Utilitate**: \
Simplifică depanarea prin furnizarea de informații detaliate despre erori.

## Beneficii
**Creșterea consistenței datelor**: Prin atribuirea valorilor implicite și generarea numelor unice, datele devin mai fiabile. \
**Monitorizare detaliată**: Logurile detaliate oferă o imagine clară a comportamentului metodei și a datelor procesate. \
**Depanare eficientă**: Logarea excepțiilor și a parametrilor permite identificarea rapidă a problemelor. \
**Extensibilitate**: Codul principal rămâne curat, iar funcționalitățile transversale pot fi extinse fără efort suplimentar. 







