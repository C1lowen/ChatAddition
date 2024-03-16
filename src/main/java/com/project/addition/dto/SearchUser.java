package com.project.addition.dto;

import lombok.Data;

import java.util.List;
@Data
public class SearchUser {
    private List<String> searchGender;
    private List<String> searchAge;
    private String country;
    private String city;
}
