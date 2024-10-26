package com.taip.FillTheVoid.gallery;

import com.taip.FillTheVoid.painting.Painting;
import com.taip.FillTheVoid.user.Owner.Owner;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String galleryName;
    private String description;

    @NotNull(message = "Owner cannot be null")
    @ManyToOne(optional = false)
    @JoinColumn(name = "owner_id", nullable = false)  // Creează relația cu Owner
    private Owner owner;


    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Painting> paintings = new ArrayList<>();

    public Gallery() {}

    public Gallery(Owner owner, String galleryName, String description) {
        this.owner = owner;
        this.galleryName = galleryName;
        this.description = description;
    }

}
