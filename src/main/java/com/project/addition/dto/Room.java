package com.project.addition.dto;

import lombok.Data;

import java.util.Map;
@Data
public class Room {

    private String id;
    private String chatId;
    private String userOneId;
    private String userTwoId;


    public Room(String chatId, String userOneId, String userTwoId) {
        this.chatId = chatId;
        this.userOneId = userOneId;
        this.userTwoId = userTwoId;
    }
}
