package com.mycompany.shop.basket;

import com.mycompany.shop.item.Item;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Basket {

    @Id
    @GeneratedValue
    private Long id;

    private Integer totalPrice = 0;

    private Integer numberItems = 0;

    @OneToMany
    private List<Item> items = new ArrayList<>();

    public Basket() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void addItemPrice(Integer price) {
        this.totalPrice += price;
    }

    public void removeItemPrice(Integer price) {
        this.totalPrice -= price;
    }

    public Integer getNumberItems() {
        return numberItems;
    }

    public void setNumberItems(Integer numberItems) {
        this.numberItems = numberItems;
    }

    public void addItem() {
        this.numberItems ++;
    }

    public void removeItem() {
        this.numberItems --;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
