package com.taip.FillTheVoid.painting;

import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.user.Owner;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Painting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paintingName;
    private String description;
    private String author;
    private int noVisualizations;
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ElementCollection
    private List<String> comments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "gallery_id")
    private Gallery gallery;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    public Painting() {}

    public Painting(Owner owner, String paintingName, String description, String author, int noVisualizations, LocalDateTime createdAt) {
        this.owner = owner;
        this.paintingName = paintingName;
        this.description = description;
        this.author = author;
        this.noVisualizations = noVisualizations;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPaintingName() {
        return paintingName;
    }

    public void setPaintingName(String paintingName) {
        this.paintingName = paintingName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getNoVisualizations() {
        return noVisualizations;
    }

    public void setNoVisualizations(int noVisualizations) {
        this.noVisualizations = noVisualizations;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public void updatePaintingName(String paintingName) {
        this.paintingName = paintingName;
    }

    public void updateDescription(String description) {
        this.description = description;
    }

    public void automaticallyGenerateDescription() {
        this.description = "This painting was created by " + this.author;
    }

    public void updateAuthor(String author) {
        this.author = author;
    }

    public void updateNoVisualizations() {
        this.noVisualizations += 1;
    }

    public void addComment(String comment) {
        this.comments.add(comment);
    }

    public void deleteComment(String comment) {
        this.comments.remove(comment);
    }

    public Gallery getGallery() {
        return gallery;
    }

    public void setGallery(Gallery gallery) {
        this.gallery = gallery;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
