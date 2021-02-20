package com.mycompany.shop.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
public class ProductResource {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public List<Product> retrieveAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/products/{id}")
    public Product retrieveProduct(@PathVariable long id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isEmpty()) {
            throw new ProductNotFoundException("id: " + id);
        }
        return  product.get();
    }

    @DeleteMapping("/products/{id}")
    public void deleteStudent(@PathVariable long id) {
        productRepository.deleteById(id);
    }

    @PostMapping("/products")
    public ResponseEntity<Object> createProduct(@RequestBody Product product) {
        Product savedProduct = productRepository.save(product);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedProduct.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Object> updateProduct(@RequestBody Product product, @PathVariable long id) {

        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isEmpty())
            return ResponseEntity.notFound().build();

        product.setId(id);

        productRepository.save(product);

        return ResponseEntity.noContent().build();
    }


}
