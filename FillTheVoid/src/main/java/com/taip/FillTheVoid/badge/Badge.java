package com.taip.FillTheVoid.badge;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Badge {

    @Id
    @GeneratedValue
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    private String type;
    private Integer value;



    public Badge() {}

    public Badge(String name, String description, String imageUrl, String type, Integer value) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.type = type;
        this.value = value;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public void collectBadge() {
        System.out.println("Badge with ID " + id + " collected!");
    }
}
