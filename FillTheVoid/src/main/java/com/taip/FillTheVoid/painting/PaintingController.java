package com.taip.FillTheVoid.painting;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/painting")
@RequiredArgsConstructor
public class PaintingController {

    private final PaintingService paintingService;

    @PostMapping("/add")
    public ResponseEntity<String> addGallery(
            @RequestParam("email-user") String emailUser,
            @RequestParam("gallery-name") String galleryName,
            @RequestParam("painting-name") String paintingName,
            @RequestParam("painting-description") String description,
            @RequestParam("author") String author) {

        return ResponseEntity.ok(paintingService.addPainting(emailUser, galleryName, paintingName, description, author, null));
    }

}
