package com.mycompany.shop.product;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Integer rating;
    private Integer popularity;
    private String description;
    private Integer price;


    public Product(String name, Integer rating, Integer popularity, String description, Integer price) {
        this.name = name;
        this.rating = rating;
        this.popularity = popularity;
        this.description = description;
        this.price = price;
    }

    public Product(Long id, String name, Integer rating, Integer popularity, String description, Integer price) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.popularity = popularity;
        this.description = description;
        this.price = price;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
