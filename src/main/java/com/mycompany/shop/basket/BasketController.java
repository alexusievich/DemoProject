package com.mycompany.shop.basket;

import com.mycompany.shop.item.Item;
import com.mycompany.shop.item.ItemRepository;
import com.mycompany.shop.product.Product;
import com.mycompany.shop.product.ProductNotFoundException;
import com.mycompany.shop.product.ProductRepository;
import com.mycompany.shop.user.User;
import com.mycompany.shop.user.UserNotFoundException;
import com.mycompany.shop.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/public/basket")
public class BasketController {

    @Autowired
    UserRepository userRepository;

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

        Long userId;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }

    @GetMapping
    public ResponseEntity<Basket> getUserBasket(@RequestParam("userId") Long userId) {
        Basket basket;
        if (userId != null) {
            if (basketRepository.findBasketByUserId(userId).isPresent()) {
                basket = basketRepository.findBasketByUserId(userId).get();
                sessionBean.setBasket(basket);
            } else {
                sessionBean.setBasket(null);
            }
        }
        return ResponseEntity.ok(sessionBean.getBasket());
    }

    @GetMapping("/unregistered")
    public ResponseEntity<Basket> getBasket() {
        return ResponseEntity.ok(sessionBean.getBasket());
    }

    @PostMapping
    public ResponseEntity<Basket> addToUserBasket(@RequestBody CreateBasketRequest createBasketRequest) {
        Long userId = createBasketRequest.getUserId();
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Optional<Product> existingProduct = productRepository.findById(createBasketRequest.getId());
            if (existingProduct.isPresent()) {
                Basket basket;
                if (basketRepository.findBasketByUserId(userId).isEmpty()) {
                    basket = new Basket();
                    basket.setUserId(userId);
                } else {
                    basket = basketRepository.findBasketByUserId(userId).get();
                }
                Item item = new Item();
                item.setProduct(existingProduct.get());
                itemRepository.save(item);
                basket.getItems().add(item);
                basket.recalculateTotalPrice();
                basket = basketRepository.save(basket);
                sessionBean.setBasket(basket);
                return ResponseEntity.ok(basket);
            } else {
                throw new ProductNotFoundException("The product with id: " + createBasketRequest.getId() + " is not found");
            }
        } else {
            throw new UserNotFoundException("The user with id: " + createBasketRequest.getUserId() + " is not found");
        }
    }

    @PostMapping("/unregistered")
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
            basket.recalculateTotalPrice();
            basket = basketRepository.save(basket);
            sessionBean.setBasket(basket);
            return ResponseEntity.ok(basket);
        } else {
            throw new ProductNotFoundException("The product with id: " + createBasketRequest.getId() + " is not found");
        }
    }

    @DeleteMapping("/logout")
    public void clearBasketFromSession() {
        Basket basket = sessionBean.getBasket();
        if (basket != null) {
            sessionBean.setBasket(null);
        }
    }


    @DeleteMapping("/clear")
    public void clearBasket() {
        Basket basket = sessionBean.getBasket();
        if (basket != null) {
            basketRepository.delete(basket);
            sessionBean.setBasket(null);
        }
    }

    @DeleteMapping("/removeitem/{id}")
    public ResponseEntity<Basket> removeItem(@PathVariable long id) {
        Basket basket = sessionBean.getBasket();
        List<Item> items = basket.getItems();
        items = items.stream().filter(item1 -> item1.getId() != id).collect(Collectors.toList());
        if (items.size() == 0) {
            basketRepository.delete(basket);
            sessionBean.setBasket(null);
        } else {
            basket.setItems(items);
            basket.recalculateTotalPrice();
            basketRepository.save(basket);
        }
        return ResponseEntity.ok(sessionBean.getBasket());
    }

}
