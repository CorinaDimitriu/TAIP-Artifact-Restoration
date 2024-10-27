package com.taip.FillTheVoid.painting;

import com.taip.FillTheVoid.gallery.Gallery;
import com.taip.FillTheVoid.user.Owner.Owner;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Painting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String paintingName;
    private String description;
    private String author;
    private int noVisualizations;
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "image")
    private byte[] image;

    @ElementCollection
    private List<String> comments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "gallery_id")
    private Gallery gallery;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    public Painting() {}

    public Painting(Owner owner, Gallery gallery, String paintingName, String description, String author, int noVisualizations, LocalDateTime createdAt, byte[] image, List<String> comments) {

        this.owner = owner;
        this.gallery = gallery;
        this.paintingName = paintingName;
        this.description = description;
        this.author = author;
        this.noVisualizations = noVisualizations;
        this.createdAt = createdAt;
        this.image = image;
        this.comments = comments;
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

}
