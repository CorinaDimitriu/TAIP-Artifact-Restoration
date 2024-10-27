package com.taip.FillTheVoid.painting;


import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.gallery.GalleryService;
import com.taip.FillTheVoid.user.Owner.Owner;
import com.taip.FillTheVoid.user.User;
import com.taip.FillTheVoid.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Objects;

@Service
@AllArgsConstructor
public class PaintingService {


    private final PaintingRepository paintingRepository;
    private final UserService userService;
    private final GalleryService galleryService;

    public String addPainting(String userEmail, String galleryName, String paintingName, String description, String author, byte[] image) {


        User user = userService.getUserByEmail(userEmail);
        Owner owner = (Owner) user;

        LocalDateTime currentDateTime = LocalDateTime.now();

        Painting painting;

        if (Objects.equals(galleryName, "None")) {

            painting = new Painting(owner, null, paintingName, description, author, 0, currentDateTime, image, new ArrayList<>());
        }
        else {

            Gallery gallery = galleryService.getGalleryByNameAndOwner(galleryName, owner);
            painting = new Painting(owner, gallery, paintingName, description, author, 0, currentDateTime, image, new ArrayList<>());
        }

        paintingRepository.save(painting);

        return paintingName;
    }

}
