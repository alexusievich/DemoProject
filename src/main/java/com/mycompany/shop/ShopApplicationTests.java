package com.mycompany.shop;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.shop.product.Product;
import com.mycompany.shop.product.ProductRepository;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ShopApplicationTests {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ProductRepository repository;
    @Autowired
    private MockMvc mockMvc;

    @AfterEach
    public void resetDb() {
        repository.deleteAll();
    }

    @Test
    public void addNewProductTest() throws Exception {

        Product product = new Product("Headphones", "Device for listening to music");

        mockMvc.perform(
                post("/products")
                        .content(objectMapper.writeValueAsString(product))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.name").value("Headphones"))
                .andExpect(jsonPath("$.description").value("Device for listening to music"));
    }


    @Test
    public void getByIdTest() throws Exception {

        long id = createTestProduct("Headphones", "Device for listening to music").getId();

        mockMvc.perform(
                get("/products/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value("Headphones"))
                .andExpect(jsonPath("$.description").value("Device for listening to music"));
    }

    @Test
    public void deleteProductTest() throws Exception {

        Product product = createTestProduct("Headphones", "Device for listening to music");

        mockMvc.perform(
                delete("/products/{id}", product.getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void updateProductTest() throws Exception {

        long id = createTestProduct("Headphones", "Device for listening to music").getId();

        mockMvc.perform(
                put("/products/{id}", id)
                        .content(objectMapper.writeValueAsString(new Product(id,"PC", "Personal Computer")))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value("PC"))
                .andExpect(jsonPath("$.description").value("Personal Computer"));
    }


    private Product createTestProduct(String name, String description) {
        Product product = new Product(name, description);
        return repository.save(product);
    }


}
