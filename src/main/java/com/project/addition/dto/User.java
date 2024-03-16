package com.project.addition.dto;

import lombok.Data;

@Data
public class User {
    private String id;
    private String gender;
    private String age;
    private String recipientId;
    private Room room;
    private SearchUser infoUser;
}