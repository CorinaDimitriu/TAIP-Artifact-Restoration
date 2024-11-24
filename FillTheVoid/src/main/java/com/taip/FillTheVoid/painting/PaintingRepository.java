package com.taip.FillTheVoid.painting;

import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.user.Owner.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PaintingRepository extends JpaRepository<Painting, Integer> {

    @Query("SELECT p FROM Painting p WHERE p.paintingName = :paintingName AND p.owner = :owner")
    Optional<Painting> findByNameAndOwner(String paintingName, Owner owner);

    @Query("SELECT p.paintingName AS paintingName, p.description AS description, p.imageType AS imageType, p.image AS image FROM Painting p WHERE p.owner = :owner AND p.gallery = :gallery")
    List<PaintingProjection> findAllByOwnerAndGallery(Owner owner, Gallery gallery);

    @Query("SELECT p.paintingName AS paintingName, p.description AS description, p.imageType AS imageType, p.image AS image FROM Painting p WHERE p.owner = :owner")
    List<PaintingProjection> findAllByOwner(Owner owner);

    @Transactional
    @Modifying
    @Query("UPDATE Painting p SET p.paintingName = :newName, p.description = :newDescription, p.author = :newAuthor WHERE p = :painting")
    int updatePaintingNameAndDescriptionAndAuthor(Painting painting, String newName, String newDescription, String newAuthor);

    @Transactional
    @Modifying
    @Query("DELETE FROM Painting p WHERE p = :painting")
    int deletePainting(Painting painting);


}