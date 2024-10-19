package com.taip.FillTheVoid.gallery;

import com.taip.FillTheVoid.painting.Painting;
import com.taip.FillTheVoid.user.Owner;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String galleryName;
    private String description;

    @ManyToOne
    @JoinColumn(name = "owner_id")  // Creează relația cu Owner
    private Owner owner;


    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Painting> paintings = new ArrayList<>();

    public Gallery() {}

    public Gallery(Owner owner, String galleryName, String description) {
        this.owner = owner;
        this.galleryName = galleryName;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public String getGalleryName() {
        return galleryName;
    }

    public void setGalleryName(String galleryName) {
        this.galleryName = galleryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Painting> getPaintings() {
        return paintings;
    }

    public void setPaintings(List<Painting> paintings) {
        this.paintings = paintings;
    }

    // Methods
    public void addPainting(Painting painting) {
        this.paintings.add(painting);
    }

    public void removePainting(Painting painting) {
        this.paintings.remove(painting);
    }

    public void updateName(String galleryName) {
        this.galleryName = galleryName;
    }

    public void updateDescription(String description) {
        this.description = description;
    }
}
