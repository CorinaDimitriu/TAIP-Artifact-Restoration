package com.taip.FillTheVoid.user;

import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.painting.Painting;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Owner extends User {

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Painting> paintings;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)  // corectat mappedBy la "owner"
    private List<Gallery> galleries;

    public Owner() {
        super();
    }

    public Owner(String firstName, String lastName, String email, String password, Role role, List<Painting> paintings, List<Gallery> galleries) {
        super(firstName, lastName, email, password, role);
        this.paintings = paintings;
        this.galleries = galleries;
    }

    public List<Painting> getPaintings() {
        return paintings;
    }

    public void setPaintings(List<Painting> paintings) {
        this.paintings = paintings;
    }

    public List<Gallery> getGalleries() {
        return galleries;
    }

    public void setGalleries(List<Gallery> galleries) {
        this.galleries = galleries;
    }
}