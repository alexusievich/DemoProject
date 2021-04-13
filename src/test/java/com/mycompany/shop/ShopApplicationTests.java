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
    public void getByIdTest() throws Exception {

        long id = createTestProduct("Samsung", 4 , 3, "Android mobile phone",
                20000, "href", "description", "Samsung").getId();

        mockMvc.perform(
                get("/api/products/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value("Samsung"))
                .andExpect(jsonPath("$.rating").value(4))
                .andExpect(jsonPath("$.popularity").value(3))
                .andExpect(jsonPath("$.config").value("Android mobile phone"))
                .andExpect(jsonPath("$.price").value(20000))
                .andExpect(jsonPath("$.img").value("href"))
                .andExpect(jsonPath("$.description").value("description"))
                .andExpect(jsonPath("$.brand").value("Samsung"));
    }

    private Product createTestProduct(String name, Integer rating, Integer popularity,
                                      String config, Integer price, String img, String description, String brand) {
        Product product = new Product(name, rating, popularity, config, price, img, description, brand);
        return repository.save(product);
    }


}
