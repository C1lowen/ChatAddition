package com.project.addition.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RoomThematic {
    private String chatId;
    private List<String> users;
    private String chatName;
    private TypeRoom typeRoom;
    private LocalDateTime dateTime = LocalDateTime.now();
}
