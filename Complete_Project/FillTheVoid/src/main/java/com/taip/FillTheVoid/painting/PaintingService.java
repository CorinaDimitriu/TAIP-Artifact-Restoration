package com.taip.FillTheVoid.painting;


import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.gallery.GalleryProjection;
import com.taip.FillTheVoid.gallery.GalleryService;
import com.taip.FillTheVoid.user.Owner.Owner;
import com.taip.FillTheVoid.user.User;
import com.taip.FillTheVoid.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PaintingService {


    private final PaintingRepository paintingRepository;
    private final UserService userService;
    private final GalleryService galleryService;

    public String addPainting(String userEmail, String galleryName, String paintingName, String description, String author, String imageType, byte[] image) {


        User user = userService.getUserByEmail(userEmail);
        Owner owner = (Owner) user;

        LocalDateTime currentDateTime = LocalDateTime.now();

        Painting painting;

        if (Objects.equals(galleryName, "None")) {

            painting = new Painting(owner, null, paintingName, description, author, 0, currentDateTime, imageType, image, new ArrayList<>());
        }
        else {

            Gallery gallery = galleryService.getGalleryByNameAndOwner(galleryName, owner);
            painting = new Painting(owner, gallery, paintingName, description, author, 0, currentDateTime, imageType, image, new ArrayList<>());
        }

//        TODO unique name and owner

        paintingRepository.save(painting);

        return paintingName;
    }

    public Painting getPainting(String paintingName, String userEmail) {

        User user = userService.getUserByEmail(userEmail);
        Owner owner = (Owner) user;

        Optional<Painting> painting =  paintingRepository.findByNameAndOwner(paintingName, owner);

        if (painting.isEmpty()) {
            throw new IllegalStateException("There is no painting having this name");
        }

        return painting.get();
    }

    public Integer editPainting(String emailUser, String paintingName, String newPaintingName, String newDescription, String newAuthor) {

        User user = userService.getUserByEmail(emailUser);
        Owner owner = (Owner) user;

        Optional<Painting> painting =  paintingRepository.findByNameAndOwner(paintingName, owner);

        if (painting.isEmpty()) {
            throw new IllegalStateException("Pictura nu există cu acest nume");
        }

        return paintingRepository.updatePaintingNameAndDescriptionAndAuthor(painting.get(), newPaintingName, newDescription, newAuthor);


    }

    public Integer updatePaintingGallery(String emailUser, String paintingName, String galleryName) {

        User user = userService.getUserByEmail(emailUser);
        Owner owner = (Owner) user;

        Optional<Painting> painting =  paintingRepository.findByNameAndOwner(paintingName, owner);

        if (painting.isEmpty()) {
            throw new IllegalStateException("Pictura nu există cu acest nume");
        }

        Gallery gallery = galleryService.getGalleryByNameAndOwner(galleryName, owner);

        return paintingRepository.updatePaintingGallery(painting.get(), gallery);
    }

    public Integer deletePainting(String emailUser, String paintingName) {

        User user = userService.getUserByEmail(emailUser);
        Owner owner = (Owner) user;

        Optional<Painting> painting =  paintingRepository.findByNameAndOwner(paintingName, owner);

        if (painting.isEmpty()) {
            throw new IllegalStateException("Pictura nu există cu acest nume");
        }

        return paintingRepository.deletePainting(painting.get());
    }

    public List<PaintingProjection> findAllByOwnerAndGallery(String emailUser, String galleryName) {

        User user = userService.getUserByEmail(emailUser);
        Owner owner = (Owner) user;

        Gallery gallery = galleryService.getGalleryByNameAndOwner(galleryName, owner);

        List<PaintingProjection> allPaintings = paintingRepository.findAllByOwnerAndGallery(owner, gallery);

        if (allPaintings == null) {
            throw new IllegalStateException("Picturile nu au fost gasite corespunzator");
        }

        return allPaintings;

    }

    public List<PaintingProjection> findAllByOwner(String emailUser) {

        User user = userService.getUserByEmail(emailUser);
        Owner owner = (Owner) user;

        List<PaintingProjection> allPaintings = paintingRepository.findAllByOwner(owner);

        if (allPaintings == null) {
            throw new IllegalStateException("Picturile nu au fost gasite corespunzator");
        }

        return allPaintings;
    }
}
