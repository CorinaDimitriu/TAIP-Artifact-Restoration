package com.taip.FillTheVoid.user.Visitor;

import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.gallery.GalleryRepository;
import com.taip.FillTheVoid.painting.Painting;
import com.taip.FillTheVoid.painting.PaintingRepository;
import com.taip.FillTheVoid.user.Owner.Owner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitorService {
    private final GalleryRepository galleryRepository;
    private final PaintingRepository paintingRepository;

    @Autowired
    public VisitorService(GalleryRepository galleryRepository, PaintingRepository paintingRepository) {
        this.galleryRepository = galleryRepository;
        this.paintingRepository = paintingRepository;
    }

    public void visitGallery(int galleryId) {
        Gallery gallery = galleryRepository.findById(galleryId)
                .orElseThrow(() -> new IllegalStateException("Gallery not found"));
    }

    public void visitPainting(int paintingId) {
        Painting painting = paintingRepository.findById(paintingId)
                .orElseThrow(() -> new IllegalStateException("Painting not found"));
        painting.updateNoVisualizations();
    }

    public void addComment(Owner owner, String paintingName, String comment) {
        if (comment == null || comment.trim().isEmpty()) {
            throw new IllegalStateException("Comment cannot be empty!");
        }

        Painting painting = paintingRepository.findByNameAndOwner(paintingName, owner)
                .orElseThrow(() -> new IllegalStateException("Painting not found"));
        painting.addComment(comment);
    }
}
