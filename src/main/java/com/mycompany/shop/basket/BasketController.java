package com.mycompany.shop.basket;

import com.mycompany.shop.item.Item;
import com.mycompany.shop.item.ItemRepository;
import com.mycompany.shop.product.Product;
import com.mycompany.shop.product.ProductNotFoundException;
import com.mycompany.shop.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/basket")
public class BasketController {

    @Autowired
    BasketRepository basketRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    BasketSessionBean sessionBean;

    static class CreateBasketRequest {
        Long id;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }
    }

    @GetMapping
    public ResponseEntity<Basket> getBasket() {
        return ResponseEntity.ok(sessionBean.getBasket());
    }

    @PostMapping
    public ResponseEntity<Basket> addToBasket(@RequestBody CreateBasketRequest createBasketRequest) {
        Optional<Product> existingProduct = productRepository.findById(createBasketRequest.getId());
        if (existingProduct.isPresent()) {
            Basket basket;
            if (sessionBean.getBasket() == null) {
                basket = new Basket();
            } else {
                basket = sessionBean.getBasket();
            }
            Item item = new Item();
            item.setProduct(existingProduct.get());
            itemRepository.save(item);
            basket.getItems().add(item);
            basket = basketRepository.save(basket);
            sessionBean.setBasket(basket);
            return ResponseEntity.ok(basket);
        } else {
            throw new ProductNotFoundException("");
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Basket> clearBasket() {
        sessionBean.setBasket(null);
        return ResponseEntity.ok(sessionBean.getBasket());
    }

    @DeleteMapping("/removeitem/{index}")
    public ResponseEntity<Basket> removeItem(@PathVariable int index) {
        List<Item> items = sessionBean.getBasket().getItems();
        if (items.size() > 0) {
            items.remove(index);
        }
        return ResponseEntity.ok(sessionBean.getBasket());
    }

}
