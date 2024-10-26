package com.taip.FillTheVoid.gallery;

import com.taip.FillTheVoid.auth.AuthenticationResponse;
import com.taip.FillTheVoid.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gallery")
@RequiredArgsConstructor
public class GalleryController {


    private final GalleryService galleryService;

    @PostMapping("/add")
    public ResponseEntity<String> addGallery(
            @RequestParam("email-user") String emailUser,
            @RequestParam("gallery-name") String galleryName,
            @RequestParam("gallery-description") String description) {

        return ResponseEntity.ok(galleryService.addGallery(emailUser, galleryName, description));
    }


}
