package com.mycompany.shop.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@RequestBody Product product, @PathVariable long id) {

        if (productRepository.findById(id).isEmpty())
           throw new ProductNotFoundException("The product with id: " + id + " is not found");

        Product newProduct = productRepository.findById(id).get();
        newProduct.setName(product.getName());
        newProduct.setDescription(product.getDescription());

        return productRepository.save(newProduct);
    }
}
