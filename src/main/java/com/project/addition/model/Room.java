package com.project.addition.model;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@RedisHash("Room")
@Data
public class Room implements Serializable {
    private String id;
    private String message;
}
