package com.taip.FillTheVoid.user.Owner;

import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.gallery.GalleryRepository;
import com.taip.FillTheVoid.painting.Painting;
import com.taip.FillTheVoid.painting.PaintingRepository;
import com.taip.FillTheVoid.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class OwnerService {
    private final OwnerRepository ownerRepository;
    private final GalleryRepository galleryRepository;
    private final PaintingRepository paintingRepository;
    private final UserService userService;

    @Autowired
    public OwnerService(OwnerRepository ownerRepository,
                        GalleryRepository galleryRepository,
                        PaintingRepository paintingRepository,
                        UserService userService) {
        this.ownerRepository = ownerRepository;
        this.galleryRepository = galleryRepository;
        this.paintingRepository = paintingRepository;
        this.userService = userService;
    }

    public Painting addPaintingToGallery(String emailUser, String galleryName, String paintingName, String description, String author, String imageType, byte[] image) {

        Owner owner = (Owner) userService.getUserByEmail(emailUser);

        Gallery gallery = galleryRepository.findByNameAndOwner(galleryName, owner)
                .orElseThrow(() -> new IllegalStateException("Galeria nu există!"));

        Painting painting = new Painting(owner, gallery, paintingName, description, author, 0, LocalDateTime.now(), imageType, image, new ArrayList<>());

        paintingRepository.save(painting);

        return painting;
    }

    public void deletePaintingFromGallery(String emailUser, String paintingName) {
        Owner owner = (Owner) userService.getUserByEmail(emailUser);

        Painting painting = paintingRepository.findByNameAndOwner(paintingName, owner)
                .orElseThrow(() -> new IllegalStateException("Pictura nu există!"));

        paintingRepository.delete(painting);
    }

    public Gallery addGallery(String emailUser, String galleryName, String description) {
        Owner owner = (Owner) userService.getUserByEmail(emailUser);

        Gallery existingGallery = galleryRepository.findByNameAndOwner(galleryName, owner)
                .orElseThrow(() -> new IllegalStateException("Galeria există deja!"));

        Gallery gallery = new Gallery(owner, galleryName, description);

        galleryRepository.save(gallery);

        return gallery;
    }

    public void deleteGallery(String emailUser, String galleryName) {
        Owner owner = (Owner) userService.getUserByEmail(emailUser);

        Gallery gallery = galleryRepository.findByNameAndOwner(galleryName, owner)
                .orElseThrow(() -> new IllegalStateException("Galeria nu există!"));

        paintingRepository.deleteAll(gallery.getPaintings());

        galleryRepository.delete(gallery);
    }

}
