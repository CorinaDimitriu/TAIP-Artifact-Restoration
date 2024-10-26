package com.taip.FillTheVoid.gallery;


import com.taip.FillTheVoid.user.Owner.Owner;
import com.taip.FillTheVoid.user.User;
import com.taip.FillTheVoid.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

    public Gallery getGalleryByName(String galleryName) {

        Optional<Gallery> gallery = galleryRepository.findByName(galleryName);

        if (gallery.isEmpty()) {
            throw new IllegalStateException("Galeria nu există cu acest nume");
        }

        return gallery.get();
    }

}
