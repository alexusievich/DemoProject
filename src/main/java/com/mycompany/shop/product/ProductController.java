package com.mycompany.shop.product;

import com.mycompany.shop.image.ImageRepository;
import com.mycompany.shop.techspec.TechSpecRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductRepository productRepository;
    private ImageRepository imageRepository;
    private TechSpecRepository techSpecRepository;

    @Autowired
    public ProductController(ProductRepository productRepository, ImageRepository imageRepository,
                             TechSpecRepository techSpecRepository) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
        this.techSpecRepository = techSpecRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> retrieveAllProducts() {

        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> retrieveProduct(@PathVariable long id) {

        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + id + " is not found");
        }

        return  ResponseEntity.ok(optionalProduct.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable long id) {

        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + id + " is not found");
        }

        productRepository.delete(optionalProduct.get());

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {

        productRepository.save(product);

        return ResponseEntity.status(201).body(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable long id) {

        Optional<Product> pr = productRepository.findById(id);

        if (pr.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + id + " is not found");
        }

        Product newProduct = pr.get();
        newProduct.setName(product.getName());
        newProduct.setRating(product.getRating());
        newProduct.setPopularity(product.getPopularity());
        newProduct.setDescription(product.getDescription());
        newProduct.setPrice(product.getPrice());
        newProduct.setImg(product.getImg());
        newProduct.setImages(product.getImages());
        newProduct.setTechSpec(product.getTechSpec());
        productRepository.save(newProduct);

        return ResponseEntity.ok().body(newProduct);
    }
}
