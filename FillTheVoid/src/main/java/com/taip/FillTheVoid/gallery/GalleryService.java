package com.taip.FillTheVoid.gallery;


import com.taip.FillTheVoid.user.Owner.Owner;
import com.taip.FillTheVoid.user.User;
import com.taip.FillTheVoid.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GalleryService {


    private final GalleryRepository galleryRepository;
    private final UserService userService;

    public String addGallery(String userEmail, String galleryName, String description) {


        User user = userService.getUserByEmail(userEmail);
        Owner owner = (Owner) user;

        Gallery gallery = new Gallery(owner, galleryName, description);

        galleryRepository.save(gallery);

        return galleryName;
    }

    public Gallery getGalleryByNameAndOwner(String galleryName, Owner owner) {

        Optional<Gallery> gallery = galleryRepository.findByNameAndOwner(galleryName, owner);

        if (gallery.isEmpty()) {
            throw new IllegalStateException("Galeria nu există cu acest nume");
        }

        return gallery.get();
    }

    public List<GalleryProjection> findAllByOwner(String userEmail) {

        User user = userService.getUserByEmail(userEmail);
        Owner owner = (Owner) user;

        List<GalleryProjection> allGalleries = galleryRepository.findAllByOwner(owner);


        if (allGalleries == null) {
            throw new IllegalStateException("Galeriile nu au fost gasite corespunzator");
        }

        return allGalleries;
    }

    public int editGallery(String userEmail, String galleryName, String newGalleryName, String newDescription) {

        User user = userService.getUserByEmail(userEmail);
        Owner owner = (Owner) user;

        Gallery gallery = getGalleryByNameAndOwner(galleryName, owner);

        return galleryRepository.updateGalleryNameAndDescription(gallery, newGalleryName, newDescription);
    }

    public int deleteGallery(String userEmail, String galleryName) {

        User user = userService.getUserByEmail(userEmail);
        Owner owner = (Owner) user;

        Gallery gallery = getGalleryByNameAndOwner(galleryName, owner);

        return galleryRepository.deleteGallery(gallery);
    }

}
