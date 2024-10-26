package com.taip.FillTheVoid.gallery;

import com.taip.FillTheVoid.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GalleryRepository extends JpaRepository<Gallery, Integer> {

    @Query("SELECT g FROM Gallery g WHERE g.galleryName = :galleryName")
    Optional<Gallery> findByName(String galleryName);
}
