package com.taip.FillTheVoid.repository;

import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.gallery.GalleryRepository;
import com.taip.FillTheVoid.user.Owner.Owner;
import com.taip.FillTheVoid.user.Owner.OwnerRepository;
import com.taip.FillTheVoid.user.Role;
import com.taip.FillTheVoid.user.User;
import com.taip.FillTheVoid.user.UserRepository;
import com.taip.FillTheVoid.user.UserService;
import jakarta.validation.ConstraintViolationException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@ExtendWith(SpringExtension.class)
public class GalleryRepositoryTests {


    @Autowired
    private GalleryRepository galleryRepository;
    @Autowired
    private OwnerRepository ownerRepository;

    private Owner owner;

    @BeforeEach
    public void setUp() {
        owner = new Owner();
        owner.setFirstName("John");
        owner.setLastName("Doe");
        owner.setEmail("example@gmail.com");
        owner.setPassword("1234");
        owner.setRole(Role.USER);
        owner.setPaintings(new ArrayList<>());
        owner.setGalleries(new ArrayList<>());

        ownerRepository.save(owner);
    }

    @Test
    public void GalleryRepository_SaveAll_ReturnSavedGallery() {

        // Arrange
        Gallery gallery = Gallery.builder()
                .galleryName("Classic paintings")
                .description("Old paintings from 1800s")
                .owner(owner)
                .paintings(new ArrayList<>())
                .build();

        // Act
        Gallery savedGallery = galleryRepository.save(gallery);

        // Assert
        Assertions.assertThat(savedGallery).isNotNull();
        Assertions.assertThat(savedGallery.getId()).isGreaterThan(0);

    }

    @Test
    public void testFindGalleryByName() {

        // Arrange
        Gallery gallery = Gallery.builder()
                .galleryName("Classic paintings")
                .description("Old paintings from 1800s")
                .owner(owner)
                .paintings(new ArrayList<>())
                .build();

        galleryRepository.save(gallery);

        // Act
        Gallery foundGallery = galleryRepository.findByName("Classic paintings").orElse(null);

        // Assert
        Assertions.assertThat(foundGallery).isNotNull();
        Assertions.assertThat(foundGallery.getGalleryName()).isEqualTo("Classic paintings");
    }

    @Test
    public void testSaveGalleryWithNullOwner() {
        // Arrange
        Gallery gallery = Gallery.builder()
                .galleryName("Classic paintings")
                .description("Old paintings from 1800s")
                .owner(null)
                .paintings(new ArrayList<>())
                .build();

        // Act & Assert
        Assertions.assertThatThrownBy(() -> galleryRepository.save(gallery))
                .isInstanceOf(ConstraintViolationException.class)
                .hasMessageContaining("Owner cannot be null");
    }
}
