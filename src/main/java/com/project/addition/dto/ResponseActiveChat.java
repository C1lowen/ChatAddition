package com.project.addition.dto;

import lombok.Data;

@Data
public class ResponseActiveChat {
    private Boolean active;
    private String nameChat;
    private Boolean isAllUser;

    public ResponseActiveChat(Boolean active, String nameChat, Boolean isAllUser) {
        this.active = active;
        this.nameChat = nameChat;
        this.isAllUser = isAllUser;
    }
}
