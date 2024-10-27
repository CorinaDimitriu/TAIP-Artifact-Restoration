# Verificarea repository-ului (gestionarea accesului la date) asociat cu entitatea Gallery

Ele acoperă operațiuni de bază cum ar fi salvarea, gestionarea erorilor și căutarea, \
asigurându-se că interacțiunile cu baza de date sunt conforme cu așteptările. Prin testarea acestor \
metode, se garantează că aplicația se comportă corect la nivelul cel mai apropiat cu baza de date.

## Iterația 1

În această iterație vom crea teste care să verifice dacă o galerie poate fi salvată corespunzător și \
dacă o galerie poate fi găsită în baza de date pe baza numelui și a proprietarului.



### Teste create

1. Pentru salvarea unei galerii cu detalii valide

![image](https://github.com/user-attachments/assets/8bda7081-8d7a-4414-b0d6-feefc911217d)

2. Pentru salvarea galeriei atunci când se încearcă salvarea unei galerii fără un proprietar.

![image](https://github.com/user-attachments/assets/b812ed37-4c92-4cf0-a6c9-3372fa321762)

3. Verificarea dacă o galerie poate fi găsită în baza de date pe baza numelui și a proprietarului.

![image](https://github.com/user-attachments/assets/3af13f40-88a5-4996-beb3-9159aba23631)

### Poza 1: rulăm toate testele și ne așteptăm să eșueze

![image](https://github.com/user-attachments/assets/ea67271a-6f15-482c-ac46-50acf049e946)


### Scrierea de cod functional pentru aceste metode de test 

Fișierele funcționale relevante pentru a trece testele sunt:

[Gallery.java](FillTheVoid/src/main/java/com/taip/FillTheVoid/gallery/Gallery.java)

Fișierul care definește clasa de entitate Gallery. Aici este definită structura entității, 
cu toate atributele, constrângerile și relațiile necesare (de exemplu, relația cu Owner).

[GalleryRepository.java](FillTheVoid/src/main/java/com/taip/FillTheVoid/gallery/GalleryRepository.java)

Interfața de tip Repository care extinde JpaRepository. Aici ar trebui să fie definite metodele utilizate în teste, inclusiv save și findByNameAndOwner.

[Owner.java](FillTheVoid/src/main/java/com/taip/FillTheVoid/user/Owner/Owner.java)

[OwnerRepository.java](FillTheVoid/src/main/java/com/taip/FillTheVoid/user/Owner/OwnerRepository.java)

Entitatea Owner, care este asociată cu galeria. Această clasă ar trebui să definească structura proprietarului galeriei.

### Poza 2: rulăm toate testele din nou și verificăm dacă acum trec
![image](https://github.com/user-attachments/assets/a784c0f8-3b7f-48e8-8ee1-ff7d7da6f3b9)

## Iterația 2

În această iteratie, sunt verificate mai multe metode din GalleryRepository pentru a asigura funcționalitatea \
corectă a operațiilor de citire, actualizare și ștergere pentru entitățile Gallery din baza de date.

### Teste create

1. Verificarea dacă metoda findAllByOwner returnează toate galeriile asociate unui anumit proprietar.

![image](https://github.com/user-attachments/assets/b13956f2-3cb0-4794-87f0-f9c5bf7f1846)

2. Testarea metodei updateGalleryNameAndDescription, care actualizează numele și descrierea unei galerii existente.

![image](https://github.com/user-attachments/assets/99491f1b-5082-4f09-ade4-204673766166)

3. Verificarea dacă metoda deleteGallery poate șterge o galerie specificată din baza de date.

![image](https://github.com/user-attachments/assets/a12f5581-bac9-4e26-b2e9-d0069a767238)

### Poza 3: rulăm testele noi create și ne așteptăm să eșueze

![image](https://github.com/user-attachments/assets/a2db63fc-296e-4254-a7c8-68e1d3b1c6f0)

### Scrierea de cod functional pentru aceste metode de test 

Fișierele funcționale relevante pentru a trece testele sunt:

[GalleryProjection.java](FillTheVoid/src/main/java/com/taip/FillTheVoid/gallery/GalleryProjection.java)

Aceasta este o interfață folosită pentru a defini proiecții asupra entităților JPA, permițând extragerea 
doar a câmpurilor galleryName și description.

[GalleryRepository.java](FillTheVoid/src/main/java/com/taip/FillTheVoid/gallery/GalleryRepository.java)

Aici sunt adăugate noi metode personalizate de acces la baza de date pentru entitatea Gallery, mai exact findAllByOwner(Owner owner), \
updateGalleryNameAndDescription(Gallery gallery, String newName, String newDescription), deleteGallery(Gallery gallery)

### Poza 4: rulăm toate testele din nou și verificăm dacă acum trec
![image](https://github.com/user-attachments/assets/5d556eef-f85f-4d02-ae58-ce57717311b3)
