package com.taip.FillTheVoid.painting;

import org.springframework.core.io.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/api/v1/painting")
@RequiredArgsConstructor
public class PaintingController {

    private final PaintingService paintingService;

    @PostMapping("/add")
    public ResponseEntity<String> addPainting(
            @RequestParam("email-user") String emailUser,
            @RequestParam("gallery-name") String galleryName,
            @RequestParam("painting-name") String paintingName,
            @RequestParam("painting-description") String description,
            @RequestParam("author") String author,
            MultipartFile image)  throws Exception{


        return ResponseEntity.ok(paintingService.addPainting(emailUser, galleryName, paintingName, description, author, image.getContentType(), image.getBytes()));
    }

    @GetMapping("/get/{fileName}")
    public ResponseEntity<Resource> getPainting(@RequestParam("email-user") String emailUser, @PathVariable String fileName) {

            Painting painting = paintingService.getPainting(fileName, emailUser);
            var image = new ByteArrayResource(painting.getImage());

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, painting.getImageType())
                .cacheControl(CacheControl.noStore().cachePrivate().mustRevalidate())
                .body(image);
    }

    @GetMapping("/findAllByOwnerAndGallery")
    public ResponseEntity<List<PaintingProjection>> getAllPaintingsFromGallery(
            @RequestParam("email-user") String emailUser,
            @RequestParam("gallery-name") String galleryName) {

        return ResponseEntity.ok(paintingService.findAllByOwnerAndGallery(emailUser, galleryName));

    }

    @PutMapping("/edit/{fileName}")
    public ResponseEntity<Integer> editPainting(
            @RequestParam("email-user") String emailUser,
            @RequestParam("painting-name") String paintingName,
            @RequestParam("new-painting-name") String newPaintingName,
            @RequestParam("new-painting-description") String newDescription,
            @RequestParam("new-author") String newAuthor) {

        return ResponseEntity.ok(paintingService.editPainting(emailUser, paintingName, newPaintingName, newDescription, newAuthor));

    }

    @DeleteMapping("/delete")
    public ResponseEntity<Integer> deletePainting(

            @RequestParam("email-user") String emailUser,
            @RequestParam("painting-name") String paintingName) {

        return ResponseEntity.ok(paintingService.deletePainting(emailUser, paintingName));
    }

}
