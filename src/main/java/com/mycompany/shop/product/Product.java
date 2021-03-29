package com.mycompany.shop.product;

import com.mycompany.shop.image.Image;
import com.mycompany.shop.techspec.TechSpec;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private Integer rating;

    private Integer popularity;

    private String config;

    private Integer price;

    private String img;

    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private Set<Image> images = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private Set<TechSpec> techSpec = new HashSet<>();



    public Product(String name, Integer rating, Integer popularity, String config, Integer price,
                   String img, String description) {
        this.name = name;
        this.rating = rating;
        this.popularity = popularity;
        this.config = config;
        this.price = price;
        this.img = img;
        this.description = description;
    }

    public Product(Long id, String name, Integer rating, Integer popularity, String config, Integer price, String img,
                   String description) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.popularity = popularity;
        this.config = config;
        this.price = price;
        this.img = img;
        this.description = description;
    }

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getPopularity() {
        return popularity;
    }

    public void setPopularity(Integer popularity) {
        this.popularity = popularity;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String description) {
        this.config = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Set<Image> getImages() {
        return images;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImages(Set<Image> images) {
        this.images = images;

        for (Image image: images) {
            image.setProduct(this);
        }
    }

    public Set<TechSpec> getTechSpec() {
        return techSpec;
    }

    public void setTechSpec(Set<TechSpec> techSpecs) {
        this.techSpec = techSpecs;

        for (TechSpec techSpec: techSpecs) {
            techSpec.setProduct(this);
        }
    }
}
