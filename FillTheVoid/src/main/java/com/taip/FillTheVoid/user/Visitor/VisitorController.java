package com.taip.FillTheVoid.user.Visitor;

import com.taip.FillTheVoid.user.Owner.Owner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VisitorController {
    private final VisitorService visitorService;

    @Autowired
    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    @PostMapping("/visitGallery/{galleryId}")
    public ResponseEntity<String> visitGallery(@PathVariable int galleryId) {
        try {
            visitorService.visitGallery(galleryId);
            return ResponseEntity.ok("Gallery visited successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/visitPainting/{paintingId}")
    public ResponseEntity<String> visitPainting(@PathVariable int paintingId) {
        try {
            visitorService.visitPainting(paintingId);
            return ResponseEntity.ok("Painting visited successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/addComment/{paintingName}?owner={owner}")
    public ResponseEntity<String> addComment(@PathVariable String paintingName, @PathVariable Owner owner, @RequestBody String comment) {
        try {
            visitorService.addComment(owner, paintingName, comment);
            return ResponseEntity.ok("Comment added successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
