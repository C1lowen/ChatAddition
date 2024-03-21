package com.project.addition.dto;

import lombok.Data;

@Data
public class RoomDTO {

    private String id;
    private String chatId;
    private String userOneId;
    private String userTwoId;


    public RoomDTO(String chatId, String userOneId, String userTwoId) {
        this.chatId = chatId;
        this.userOneId = userOneId;
        this.userTwoId = userTwoId;
    }
}
