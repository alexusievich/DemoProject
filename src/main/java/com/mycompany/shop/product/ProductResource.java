package com.mycompany.shop.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
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

        if (productRepository.findById(id).isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + id + " is not found");
        }
        return  productRepository.findById(id).get();
    }

    @DeleteMapping("/products/{id}")
    public void deleteStudent(@PathVariable long id) {
        productRepository.deleteById(id);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        productRepository.save(product);
        return ResponseEntity.status(201).body(product);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable long id) {

        Optional<Product> pr = productRepository.findById(id);

        if (pr.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + id + " is not found");
        }

        Product newProduct = pr.get();
        newProduct.setName(product.getName());
        newProduct.setDescription(product.getDescription());
        productRepository.save(newProduct);

        return ResponseEntity.ok().body(newProduct);
    }
}
