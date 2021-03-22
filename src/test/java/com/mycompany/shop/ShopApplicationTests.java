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

        Product product = new Product("Samsung", 4 , 3, "Android mobile phone",20000, "href");

        mockMvc.perform(
                post("/api/products")
                        .content(objectMapper.writeValueAsString(product))
                        .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.name").value("Samsung"))
                .andExpect(jsonPath("$.rating").value(4))
                .andExpect(jsonPath("$.popularity").value(3))
                .andExpect(jsonPath("$.description").value("Android mobile phone"))
                .andExpect(jsonPath("$.price").value(20000))
                .andExpect(jsonPath("$.img").value("href"));
    }


    @Test
    public void getByIdTest() throws Exception {

        long id = createTestProduct("Samsung", 4 , 3, "Android mobile phone", 20000, "href").getId();

        mockMvc.perform(
                get("/api/products/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value("Samsung"))
                .andExpect(jsonPath("$.rating").value(4))
                .andExpect(jsonPath("$.popularity").value(3))
                .andExpect(jsonPath("$.description").value("Android mobile phone"))
                .andExpect(jsonPath("$.price").value(20000))
                .andExpect(jsonPath("$.img").value("href"));
    }

    @Test
    public void deleteProductTest() throws Exception {

        Product product = createTestProduct("Samsung", 4 , 3, "Android mobile phone", 20000, "href");

        mockMvc.perform(
                delete("/api/products/{id}", product.getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void updateProductTest() throws Exception {

        long id = createTestProduct("Samsung", 4 , 3, "Android mobile phone", 20000,"href").getId();
        Product newProduct = new Product("iPhone 12", 5, 4, "Apple iPhone 12 128GB", 30000, "href1");

        mockMvc.perform(
                put("/api/products/{id}", id)
                        .content(objectMapper.writeValueAsString(newProduct))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value("iPhone 12"))
                .andExpect(jsonPath("$.rating").value(5))
                .andExpect(jsonPath("$.popularity").value(4))
                .andExpect(jsonPath("$.description").value("Apple iPhone 12 128GB"))
                .andExpect(jsonPath("$.price").value(30000))
                .andExpect(jsonPath("$.img").value("href1"));
    }


    private Product createTestProduct(String name, Integer rating, Integer popularity, String description, Integer price, String img) {
        Product product = new Product(name, rating, popularity, description, price, img);
        return repository.save(product);
    }


}
