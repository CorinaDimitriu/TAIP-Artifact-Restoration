# JwtServiceAspect (AOP)

[JwtServiceAspect.java](FillTheVoid/src/main/java/com/taip/FillTheVoid/config/JwtServiceAspect.java)

**JwtServiceAspect** este o implementare a programării orientate pe aspecte (AOP) în Spring, care adaugă funcționalitate \
suplimentară metodelor din cadrul clasei **JwtServiceProxy** [Proxy](../FillTheVoid/src/main/java/com/taip/FillTheVoid/config/proxy/). 

## Metodele Aspectului

## **1. logBefore(JoinPoint joinPoint)** 
Funcție: Este executată înainte de a rula orice metodă din JwtServiceProxy (definită prin pointcut).
### Rol:
Înregistrează numele metodei care este pe cale să fie executată. \
Înregistrează argumentele care sunt transmise metodei. \
Utilitate: Ajută la urmărirea comportamentului aplicației și la diagnosticarea problemelor prin logarea detaliilor apelurilor de metodă.

## **2. validateParameters(ProceedingJoinPoint joinPoint, String jwt, UserDetails userDetails)** 

Funcție: Este un aspect de tip "**around**" care se aplică în jurul metodei **isTokenValid**.
### Rol:
Verifică dacă parametrii (jwt și userDetails) sunt validați (nu sunt null).
Dacă parametrii nu sunt valizi, înregistrează un avertisment și returnează false, prevenind execuția metodei originale.
Dacă parametrii sunt validați, apelează metoda originală folosind **joinPoint.proceed()**.
Utilitate: Asigură integritatea datelor înainte de a permite execuția logicii de business a metodei **isTokenValid**, protejând astfel aplicația de erori.

## **3. logAfter(JoinPoint joinPoint, Object result)**
Funcție: Este executată după ce o metodă din **JwtServiceProxy** a fost executată cu succes.
### Rol:
Înregistrează rezultatul returnat de metodă.
Utilitate: Oferă un feedback despre ceea ce a returnat metoda, facilitând astfel analiza rezultatelor și comportamentului aplicației.

## Beneficii

Aspectul **JwtServiceAspect** îmbunătățește **JwtServiceProxy** prin adăugarea de logica transversală, cum ar fi logarea și validarea parametrilor, 
fără a modifica codul original al serviciului. Această abordare permite o mai bună organizare a codului și facilitează întreținerea și extinderea aplicației în viitor.
