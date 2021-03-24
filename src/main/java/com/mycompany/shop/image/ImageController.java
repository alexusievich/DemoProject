package com.mycompany.shop.image;

import com.mycompany.shop.product.Product;
import com.mycompany.shop.product.ProductNotFoundException;
import com.mycompany.shop.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private ProductRepository productRepository;
    private ImageRepository imageRepository;

    @Autowired
    public ImageController(ProductRepository productRepository, ImageRepository imageRepository) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Image>> retrieveAllImages() {

        return ResponseEntity.ok(imageRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Image> retrieveImage(@PathVariable long id) {

        Optional<Image> optionalImage = imageRepository.findById(id);

        if (optionalImage.isEmpty()) {
            throw new ImageNotFoundException("The image with id: " + id + " is not found");
        }

        return ResponseEntity.ok(optionalImage.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Image>> deleteImage(@PathVariable long id) {

        Optional<Image> optionalImage = imageRepository.findById(id);

        if (optionalImage.isEmpty()) {
            throw new ImageNotFoundException("The image with id: " + id + " is not found");
        }

        imageRepository.delete(optionalImage.get());

        return ResponseEntity.ok(imageRepository.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<Image> createImage(@RequestBody Image image) {

        Optional<Product> optionalProduct = productRepository.findById(image.getProduct().getId());

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + image.getProduct().getId() + " is not found");
        }

        image.setProduct(optionalProduct.get());

        Image savedImage = imageRepository.save(image);

        return ResponseEntity.status(201).body(savedImage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Image> updateImage(@RequestBody Image image, @PathVariable long id) {

        Optional<Product> optionalProduct = productRepository.findById(image.getProduct().getId());

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + image.getProduct().getId() + " is not found");
        }

        Optional<Image> optionalImage = imageRepository.findById(id);

        if (optionalImage.isEmpty()) {
            throw new ImageNotFoundException("The image with id: " + id + " is not found");
        }

        image.setProduct(optionalProduct.get());
        image.setId(optionalImage.get().getId());
        image.setImageLink(optionalImage.get().getImageLink());
        imageRepository.save(image);

        return ResponseEntity.ok(image);
    }
}
