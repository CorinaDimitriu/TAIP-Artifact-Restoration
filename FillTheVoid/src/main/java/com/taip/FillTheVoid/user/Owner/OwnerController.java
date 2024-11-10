package com.taip.FillTheVoid.user.Owner;

import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.painting.Painting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/owner")
public class OwnerController {

    private final OwnerService ownerService;

    @Autowired
    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping("/add")
    public ResponseEntity<Painting> addPainting(@RequestParam("email-user") String emailUser,
                                                         @RequestParam("gallery-name") String galleryName,
                                                         @RequestParam("painting-name") String paintingName,
                                                         @RequestParam("painting-description") String description,
                                                         @RequestParam("author") String author,
                                                         @RequestParam("image") MultipartFile image) throws Exception {

        Painting painting = ownerService.addPaintingToGallery(emailUser, galleryName, paintingName, description, author, image.getContentType(), image.getBytes());

        return ResponseEntity.ok(painting);
    }

    @DeleteMapping("/delete-painting")
    public ResponseEntity<String> deletePainting(@RequestParam("email-user") String emailUser,
                                                 @RequestParam("painting-name") String paintingName) {

        ownerService.deletePaintingFromGallery(emailUser, paintingName);

        return ResponseEntity.ok("Pictura a fost ștearsă cu succes.");
    }

    @PostMapping("/add-gallery")
    public ResponseEntity<Gallery> addGallery(@RequestParam("email-user") String emailUser,
                                              @RequestParam("gallery-name") String galleryName,
                                              @RequestParam("gallery-description") String description) {
        Gallery gallery = ownerService.addGallery(emailUser, galleryName, description);
        return ResponseEntity.ok(gallery);
    }

    @DeleteMapping("/delete-gallery")
    public ResponseEntity<String> deleteGallery(
            @RequestParam("email-user") String emailUser,
            @RequestParam("gallery-name") String galleryName,
            @RequestParam("gallery-description") String description) {

        try {
            ownerService.deleteGallery(emailUser, galleryName);
            return ResponseEntity.ok("Galeria a fost stearsa cu succes.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("A apărut o eroare: " + e.getMessage());
        }
    }
}