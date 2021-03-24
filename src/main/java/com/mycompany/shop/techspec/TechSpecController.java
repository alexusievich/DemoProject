package com.mycompany.shop.techspec;

import com.mycompany.shop.product.Product;
import com.mycompany.shop.product.ProductNotFoundException;
import com.mycompany.shop.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/techspecs")
public class TechSpecController {

    private ProductRepository productRepository;
    private TechSpecRepository techSpecRepository;

    @Autowired
    public TechSpecController(ProductRepository productRepository, TechSpecRepository techSpecRepository) {
        this.productRepository = productRepository;
        this.techSpecRepository = techSpecRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<TechSpec>> retrieveAllTechSpecs() {

        return ResponseEntity.ok(techSpecRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TechSpec> retrieveTechSpec(@PathVariable long id) {

        Optional<TechSpec> optionalTechSpec = techSpecRepository.findById(id);

        if (optionalTechSpec.isEmpty()) {
            throw new TechSpecNotFoundException("The techspec with id: " + id + " is not found");
        }

        return ResponseEntity.ok(optionalTechSpec.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<TechSpec>> deleteTechSpec(@PathVariable long id) {

        Optional<TechSpec> optionalTechSpec = techSpecRepository.findById(id);

        if (optionalTechSpec.isEmpty()) {
            throw new TechSpecNotFoundException("The techspec with id: " + id + " is not found");
        }

        techSpecRepository.delete(optionalTechSpec.get());

        return ResponseEntity.ok(techSpecRepository.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<TechSpec> createTechSpec(@RequestBody TechSpec techSpec) {

        Optional<Product> optionalProduct = productRepository.findById(techSpec.getProduct().getId());

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + techSpec.getProduct().getId() + " is not found");
        }

        techSpec.setProduct(optionalProduct.get());

        TechSpec savedTechSpec = techSpecRepository.save(techSpec);

        return ResponseEntity.status(201).body(savedTechSpec);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TechSpec> updateImage(@RequestBody TechSpec techSpec, @PathVariable long id) {

        Optional<Product> optionalProduct = productRepository.findById(techSpec.getProduct().getId());

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + techSpec.getProduct().getId() + " is not found");
        }

        Optional<TechSpec> optionalTechSpec = techSpecRepository.findById(id);

        if (optionalTechSpec.isEmpty()) {
            throw new TechSpecNotFoundException("The image with id: " + id + " is not found");
        }

        techSpec.setProduct(optionalProduct.get());
        techSpec.setId(optionalTechSpec.get().getId());
        techSpec.setName(optionalTechSpec.get().getName());
        techSpec.setValue(optionalTechSpec.get().getValue());
        techSpecRepository.save(techSpec);

        return ResponseEntity.ok(techSpec);
    }
}
