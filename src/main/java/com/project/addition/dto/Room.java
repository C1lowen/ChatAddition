package com.project.addition.dto;

import lombok.Data;

import java.util.Map;
@Data
public class Room {

    private String id;
    private String chatId;
    private String senderId;
    private String recipientId;


    public Room(String chatId, String senderId, String recipientId) {
        this.chatId = chatId;
        this.senderId = senderId;
        this.recipientId = recipientId;
    }
}
